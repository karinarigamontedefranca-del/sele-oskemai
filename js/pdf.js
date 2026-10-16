/* Gera o PDF com a lista de aprovados (jsPDF, tudo no navegador). */
(function () {
  var VIOLET = [96, 21, 245], DEEP = [38, 6, 141], INK = [23, 23, 31], MIST = [112, 108, 142], RED = [239, 0, 27], SOFT = [245, 242, 255], LINE = [221, 214, 245];

  function today() {
    var d = new Date();
    var p = function (n) { return (n < 10 ? "0" : "") + n; };
    return p(d.getDate()) + "/" + p(d.getMonth() + 1) + "/" + d.getFullYear();
  }
  function fmt(v) { return (Math.round(v * 10) / 10).toFixed(1).replace(".", ","); }

  window.exportPDF = function (o) {
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF({ unit: "mm", format: "a4" });
    var W = 210, H = 297, M = 16, CW = W - M * 2;
    var y = 0;

    function header(first) {
      doc.setFillColor(DEEP[0], DEEP[1], DEEP[2]); doc.rect(0, 0, W, first ? 36 : 18, "F");
      doc.setFillColor(VIOLET[0], VIOLET[1], VIOLET[2]); doc.rect(0, first ? 36 : 18, W, 1.6, "F");
      var lh = first ? 14 : 8, lw = lh * (window.LOGO_RATIO || 3.76);
      var bx = M, by = first ? 8 : 5, pad = first ? 3 : 2;
      doc.setFillColor(255, 255, 255); doc.roundedRect(bx, by, lw + pad * 2, lh + pad * 2, 3, 3, "F");
      doc.addImage(window.LOGO_DATA, "PNG", bx + pad, by + pad, lw, lh);
      doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(first ? 9 : 8);
      var label = "PROCESSO SELETIVO DO CLUBE DE IA", ty = first ? 16 : 10.5;
      doc.text(label, W - M, ty, { align: "right" });
      doc.setFillColor(RED[0], RED[1], RED[2]); doc.circle(W - M - doc.getTextWidth(label) - 3, ty - 1, 0.9, "F");
      doc.setFont("helvetica", "normal"); doc.setFontSize(8);
      doc.text(today(), W - M, first ? 21 : 14.5, { align: "right" });
      y = first ? 50 : 30;
    }
    function footer() {
      var n = doc.getNumberOfPages();
      for (var i = 1; i <= n; i++) {
        doc.setPage(i);
        doc.setDrawColor(LINE[0], LINE[1], LINE[2]); doc.line(M, H - 12, W - M, H - 12);
        doc.setTextColor(MIST[0], MIST[1], MIST[2]); doc.setFont("helvetica", "normal"); doc.setFontSize(7.5);
        doc.text("SKEM.AI  |  Pontuação gerada por IA a partir das entrevistas. A decisão final é do grupo.", M, H - 7);
        doc.text("Página " + i + " de " + n, W - M, H - 7, { align: "right" });
      }
    }
    function ensure(h) { if (y + h > H - 18) { doc.addPage(); header(false); } }

    header(true);

    // título
    doc.setTextColor(DEEP[0], DEEP[1], DEEP[2]); doc.setFont("helvetica", "bold"); doc.setFontSize(22);
    doc.text("Lista de aprovados", M, y);
    y += 7;
    doc.setTextColor(MIST[0], MIST[1], MIST[2]); doc.setFont("helvetica", "normal"); doc.setFontSize(10);
    doc.text("Clube SKEM.AI  |  gerada em " + today(), M, y);
    y += 9;

    // resumo
    var total = o.approved.length, f = o.counts.F, m = o.counts.M;
    var boxes = [
      { l: "APROVADOS", v: total + " de " + o.totalCandidates },
      { l: "MENINAS", v: f + "/" + o.config.F },
      { l: "MENINOS", v: m + "/" + o.config.M },
      { l: "NOTA MÉDIA", v: total ? Math.round(o.approved.reduce(function (s, c) { return s + c.total; }, 0) / total) + "" : "-" }
    ];
    var bw = (CW - 3 * 4) / 4;
    boxes.forEach(function (b, i) {
      var x = M + i * (bw + 4);
      doc.setFillColor(SOFT[0], SOFT[1], SOFT[2]); doc.setDrawColor(LINE[0], LINE[1], LINE[2]); doc.roundedRect(x, y, bw, 17, 3, 3, "FD");
      doc.setTextColor(MIST[0], MIST[1], MIST[2]); doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.text(b.l, x + 4, y + 6);
      doc.setTextColor(DEEP[0], DEEP[1], DEEP[2]); doc.setFontSize(14); doc.text(b.v, x + 4, y + 13.5);
    });
    y += 25;

    // tabela
    var cols = [
      { k: "i", t: "#", w: 9 }, { k: "n", t: "Nome", w: 52 }, { k: "g", t: "Cadeira", w: 20 },
      { k: "s", t: "Nota", w: 15, a: "c" }, { k: "p", t: "Pró", w: 16, a: "c" }, { k: "l", t: "Aprender", w: 20, a: "c" }, { k: "t", t: "Interesse", w: 20, a: "c" }, { k: "x", t: "", w: 26 }
    ];
    var sumW = cols.reduce(function (s, c) { return s + c.w; }, 0); var k = CW / sumW; cols.forEach(function (c) { c.w *= k; });
    function tableHead() {
      doc.setFillColor(VIOLET[0], VIOLET[1], VIOLET[2]); doc.roundedRect(M, y, CW, 9, 2, 2, "F");
      doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(8.5);
      var x = M;
      cols.forEach(function (c) { if (c.t) doc.text(c.t, c.a === "c" ? x + c.w / 2 : x + 3, y + 6, c.a === "c" ? { align: "center" } : {}); x += c.w; });
      y += 11;
    }
    tableHead();
    o.approved.forEach(function (c, idx) {
      if (y + 10 > H - 18) { doc.addPage(); header(false); tableHead(); }
      if (idx % 2 === 0) { doc.setFillColor(SOFT[0], SOFT[1], SOFT[2]); doc.roundedRect(M, y - 1.5, CW, 9, 1.5, 1.5, "F"); }
      doc.setTextColor(INK[0], INK[1], INK[2]);
      var x = M;
      doc.setFont("helvetica", "normal"); doc.setFontSize(9);
      doc.text(String(idx + 1), x + 3, y + 4.4); x += cols[0].w;
      doc.setFont("helvetica", "bold"); doc.text(c.name, x + 3, y + 4.4); x += cols[1].w;
      doc.setFont("helvetica", "normal"); doc.text(c.gender === "F" ? "Meninas" : "Meninos", x + 3, y + 4.4); x += cols[2].w;
      doc.setFont("helvetica", "bold"); doc.setTextColor(VIOLET[0], VIOLET[1], VIOLET[2]);
      doc.text(String(c.total), x + cols[3].w / 2, y + 4.4, { align: "center" }); x += cols[3].w;
      doc.setTextColor(INK[0], INK[1], INK[2]); doc.setFont("helvetica", "normal");
      [c.scores.pro, c.scores.learn, c.scores.interest].forEach(function (v, j) { doc.text(fmt(v), x + cols[4 + j].w / 2, y + 4.4, { align: "center" }); x += cols[4 + j].w; });
      y += 9;
    });
    y += 4;
    doc.setTextColor(MIST[0], MIST[1], MIST[2]); doc.setFont("helvetica", "normal"); doc.setFontSize(8);
    var note = "Nota de 0 a 100 = soma dos três critérios (cada um de 0 a 10): pró-atividade, vontade de aprender e interesse verdadeiro, avaliados pela IA a partir da transcrição de cada entrevista.";
    var nl = doc.splitTextToSize(note, CW); ensure(nl.length * 4 + 2); doc.text(nl, M, y); y += nl.length * 4 + 2;

    // fichas
    if (o.includeSummaries && total) {
      doc.addPage(); header(false);
      doc.setTextColor(DEEP[0], DEEP[1], DEEP[2]); doc.setFont("helvetica", "bold"); doc.setFontSize(16);
      doc.text("Resumo da entrevista de cada aprovado", M, y); y += 9;
      o.approved.forEach(function (c) {
        var lines = [];
        c.summary.forEach(function (s) { doc.setFontSize(9); lines.push({ t: doc.splitTextToSize(s, CW - 12) }); });
        var hh = 18 + lines.reduce(function (s, l) { return s + l.t.length * 4.3 + 1.2; }, 0) + (c.attention.length ? 8 : 0);
        ensure(hh);
        doc.setFillColor(SOFT[0], SOFT[1], SOFT[2]); doc.setDrawColor(LINE[0], LINE[1], LINE[2]); doc.roundedRect(M, y, CW, hh - 3, 3, 3, "FD");
        doc.setFillColor(VIOLET[0], VIOLET[1], VIOLET[2]); doc.roundedRect(M + CW - 22, y + 3, 19, 8, 2, 2, "F");
        doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.text(c.total + " pts", M + CW - 12.5, y + 8.6, { align: "center" });
        doc.setTextColor(DEEP[0], DEEP[1], DEEP[2]); doc.setFontSize(12); doc.text(c.name, M + 5, y + 8.5);
        doc.setTextColor(MIST[0], MIST[1], MIST[2]); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
        doc.text((c.gender === "F" ? "Cadeira das meninas" : "Cadeira dos meninos") + "  |  " + c.stage, M + 5, y + 13.5, { maxWidth: CW - 32 });
        var yy = y + 19;
        doc.setTextColor(INK[0], INK[1], INK[2]); doc.setFontSize(9);
        lines.forEach(function (l) {
          doc.setFillColor(VIOLET[0], VIOLET[1], VIOLET[2]); doc.circle(M + 6, yy - 1, 0.8, "F");
          doc.text(l.t, M + 9, yy);
          yy += l.t.length * 4.3 + 1.2;
        });
        if (c.attention.length) {
          doc.setTextColor(150, 90, 0); doc.setFontSize(8);
          doc.text("Atenção: " + c.attention.join("; "), M + 5, yy + 1, { maxWidth: CW - 10 });
        }
        y += hh;
      });
    }

    footer();
    doc.save("aprovados-clube-skem-ai.pdf");
  };
})();
