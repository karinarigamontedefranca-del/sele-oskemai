/* Seleção do clube SKEM.AI: arrastar o bonequinho para a cadeira = aprovado. */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var GNAME = { F: "meninas", M: "meninos" };

  var C = window.CANDIDATES;
  var byId = {};
  C.forEach(function (c) { byId[c.id] = c; c.total = Math.round((c.scores.pro + c.scores.learn + c.scores.interest) / 30 * 100); });

  /* ---------------- estado ---------------- */
  var KEY = "skema-selecao-v1";
  var state = { seats: {}, out: {}, view: "in", config: { F: 4, M: 6 }, filter: "all", sort: "az", sound: true, selected: null };
  var LV = {
    T: { label: "Talvez fora", mood: 1, sub: "Ficou perto. Pode entrar se abrir vaga." },
    E: { label: "Meio fora", mood: 2, sub: "Faltou bastante para entrar agora." },
    U: { label: "Muito fora", mood: 3, sub: "Pouco alinhado com o que o clube pede." }
  };
  var LVS = ["T", "E", "U"];
  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || "null");
    if (saved && saved.config) {
      state.config = saved.config;
      state.seats = saved.seats || {};
      state.out = saved.out || {};
      state.sound = saved.sound !== false;
      state.selected = saved.selected || null;
    }
  } catch (e) {}
  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify({ seats: state.seats, out: state.out, config: state.config, sound: state.sound, selected: state.selected })); } catch (e) {}
  }

  function slotIds() {
    var out = [];
    ["F", "M"].forEach(function (g) { for (var i = 0; i < state.config[g]; i++) out.push(g + i); });
    return out;
  }
  function sanitizeSeats() {
    var valid = {}; slotIds().forEach(function (s) { valid[s] = true; });
    var used = {};
    Object.keys(state.seats).forEach(function (id) {
      var s = state.seats[id];
      if (!byId[id] || !valid[s] || used[s] || s[0] !== byId[id].gender) delete state.seats[id]; else used[s] = id;
    });
  }
  function isOut(slot) { return LVS.indexOf(slot[0]) >= 0; }
  function occupant(slot) {
    var m = isOut(slot) ? state.out : state.seats;
    for (var id in m) if (m[id] === slot) return id;
    return null;
  }
  /* sala de fora: cadeiras = candidatos - cadeiras do clube (4/3/3 para 10 de fora) */
  function outCfg() {
    var n = Math.max(0, C.length - totalChairs());
    var t = Math.ceil(n * 0.4), e = Math.floor(n * 0.3);
    return { T: t, E: e, U: n - t - e, total: n };
  }
  function outIds() {
    var cfg = outCfg(), out = [];
    LVS.forEach(function (l) { for (var i = 0; i < cfg[l]; i++) out.push(l + i); });
    return out;
  }
  function sanitizeOut() {
    var ids = outIds(), valid = {}; ids.forEach(function (s) { valid[s] = true; });
    var used = {}, lost = [];
    Object.keys(state.out).forEach(function (id) {
      var s = state.out[id];
      if (!byId[id] || state.seats[id]) { delete state.out[id]; return; }
      if (!valid[s] || used[s]) { delete state.out[id]; lost.push({ id: id, lv: s ? s[0] : "T" }); return; }
      used[s] = id;
    });
    lost.forEach(function (o) {
      var order = [o.lv].concat(LVS.filter(function (l) { return l !== o.lv; }));
      for (var k = 0; k < order.length; k++) {
        var free = ids.filter(function (s) { return s[0] === order[k] && !used[s]; })[0];
        if (free) { used[free] = o.id; state.out[o.id] = free; break; }
      }
    });
  }
  function outCount(l) { return Object.keys(state.out).filter(function (id) { return !l || state.out[id][0] === l; }).length; }
  function freeOut(l) { var n = outCfg()[l]; for (var i = 0; i < n; i++) if (!occupant(l + i)) return l + i; return null; }
  function isDecided(c) { return !!state.seats[c.id] || !!state.out[c.id]; }
  function seatedCount(g) {
    return Object.keys(state.seats).filter(function (id) { return !g || byId[id].gender === g; }).length;
  }
  function totalChairs() { return state.config.F + state.config.M; }
  function freeSlot(g) {
    for (var i = 0; i < state.config[g]; i++) if (!occupant(g + i)) return g + i;
    return null;
  }
  function slotLabel(slot) { if (isOut(slot)) return "Cadeira " + (parseInt(slot.slice(1), 10) + 1) + " (" + LV[slot[0]].label.toLowerCase() + ")"; return "Cadeira " + (parseInt(slot.slice(1), 10) + 1) + " das " + GNAME[slot[0]]; }

  function visibleList() {
    var list = C.filter(function (c) {
      if (state.filter === "wait") return !isDecided(c);
      if (state.filter === "in") return !!state.seats[c.id];
      if (state.filter === "out") return !!state.out[c.id];
      return true;
    });
    list.sort(function (a, b) {
      return state.sort === "score" ? (b.total - a.total) || a.name.localeCompare(b.name, "pt-BR") : a.name.localeCompare(b.name, "pt-BR");
    });
    return list;
  }

  /* ---------------- som ---------------- */
  var actx = null;
  function blip(kind) {
    if (!state.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      var t = actx.currentTime;
      var notes = kind === "sad" ? [330, 262, 196] : kind === "bad" ? [220, 165] : kind === "done" ? [523, 659, 784, 1046] : [392, 587];
      notes.forEach(function (f, i) {
        var o = actx.createOscillator(), g = actx.createGain();
        o.type = kind === "bad" ? "sawtooth" : kind === "sad" ? "sine" : "triangle"; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t + i * 0.09);
        g.gain.exponentialRampToValueAtTime(0.16, t + i * 0.09 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.09 + 0.22);
        o.connect(g); g.connect(actx.destination); o.start(t + i * 0.09); o.stop(t + i * 0.09 + 0.25);
      });
    } catch (e) {}
  }

  /* ---------------- avisos ---------------- */
  function toast(msg, kind) {
    var el = document.createElement("div");
    el.className = "toast " + (kind || ""); el.textContent = msg;
    var box = $("#toasts"); box.appendChild(el);
    while (box.children.length > 3) box.removeChild(box.firstChild);
    setTimeout(function () { el.classList.add("out"); setTimeout(function () { el.remove(); }, 320); }, 2600);
  }

  /* ---------------- confete ---------------- */
  var cvs = $("#confetti"), cx = cvs.getContext("2d"), parts = [], raf = null;
  function fitCanvas() { var d = Math.min(2, window.devicePixelRatio || 1); cvs.width = innerWidth * d; cvs.height = innerHeight * d; cx.setTransform(d, 0, 0, d, 0, 0); }
  fitCanvas(); window.addEventListener("resize", fitCanvas);
  function confetti(x, y, big) {
    if (reduce) return;
    var colors = ["#6015F5", "#8E5CFF", "#A98BFF", "#C9B6FF", "#FFFFFF", "#26068D", "#EF001B"];
    var n = big ? 150 : 44;
    for (var i = 0; i < n; i++) {
      var a = big ? Math.random() * Math.PI * 2 : -Math.PI / 2 + (Math.random() - .5) * 2.1;
      var v = (big ? 4 + Math.random() * 9 : 3 + Math.random() * 7);
      parts.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - (big ? 3 : 1), g: .22, w: 5 + Math.random() * 6, h: 3 + Math.random() * 4, r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: colors[(Math.random() * colors.length) | 0], life: 1, d: .008 + Math.random() * .01 });
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function tick() {
    cx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter(function (p) { return p.life > 0 && p.y < innerHeight + 40; });
    parts.forEach(function (p) {
      p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= .985; p.r += p.vr; p.life -= p.d;
      cx.save(); cx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.6)); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillStyle = p.c; cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); cx.restore();
    });
    raf = parts.length ? requestAnimationFrame(tick) : null;
    if (!raf) cx.clearRect(0, 0, innerWidth, innerHeight);
  }

  /* ---------------- ícones ---------------- */
  var ICO = {
    prev: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>',
    tick: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    on: '<svg viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
    off: '<svg viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M22 9l-6 6M16 9l6 6"/></svg>',
    chair: '<svg viewBox="0 0 24 24"><path d="M7 3h10a1 1 0 0 1 1 1v8H6V4a1 1 0 0 1 1-1ZM5 12h14v3H5zM8 15v6M16 15v6"/></svg>'
  };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (m) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]; }); }
  function ul(items) { return "<ul>" + items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>"; }

  /* ---------------- topo ---------------- */
  $("#logo").src = window.LOGO_DATA;
  function renderCounters() {
    var oc = outCfg();
    var groups = state.view === "out" ? [
      { label: "Talvez fora", n: outCount("T"), t: oc.T },
      { label: "Meio fora", n: outCount("E"), t: oc.E },
      { label: "Muito fora", n: outCount("U"), t: oc.U },
      { label: "Fora", n: outCount(), t: oc.total }
    ] : [
      { k: "F", label: "Meninas", n: seatedCount("F"), t: state.config.F },
      { k: "M", label: "Meninos", n: seatedCount("M"), t: state.config.M },
      { k: "T", label: "Turma", n: seatedCount(), t: totalChairs() }
    ];
    $("#counters").innerHTML = groups.map(function (g) {
      var pct = g.t ? Math.round(g.n / g.t * 100) : 0;
      return '<div class="cnt' + (g.n >= g.t && g.t > 0 ? " full" : "") + '"><div class="l"><span>' + g.label + '</span><span class="n">' + g.n + "/" + g.t + '</span></div><div class="bar"><i style="width:' + pct + '%"></i></div></div>';
    }).join("");
    var s = $("#btnSound"); s.innerHTML = state.sound ? ICO.on : ICO.off;
    s.setAttribute("aria-pressed", String(state.sound)); s.setAttribute("aria-label", state.sound ? "Som ligado" : "Som desligado");
    $("#btnPdf").disabled = seatedCount() === 0;
    var bo = $("#btnOut"), isOutV = state.view === "out";
    bo.setAttribute("aria-pressed", String(isOutV));
    bo.querySelector("span").textContent = isOutV ? "Voltar ao clube" : "Sala de fora do clube";
    document.body.classList.toggle("view-out", isOutV);
  }

  /* ---------------- fila ---------------- */
  function renderQueue() {
    var list = visibleList();
    $("#queue").innerHTML = list.length ? list.map(function (c) {
      var inn = !!state.seats[c.id], ot = state.out[c.id];
      return '<button type="button" class="qi' + (c.id === state.selected ? " sel" : "") + (inn ? " in" : "") + (ot ? " outc lv" + ot[0] : "") + '" data-id="' + c.id + '" title="' + esc(c.name) + ' - nota ' + c.total + '">' +
        '<span class="gdot">' + c.gender + '</span><span class="tick">' + ICO.tick + '</span><span class="xmark">×</span>' +
        '<span class="av">' + window.dollSVG(c, "head") + '</span><span class="nm">' + esc(c.name.split(" ")[0] + (c.name.split(" ")[1] && /^Matheus|^Arthur/.test(c.name) ? " " + c.name.split(" ")[1][0] + "." : "")) + '</span><span class="sc">' + c.total + "</span></button>";
    }).join("") : '<p style="color:var(--mist);font-size:.85rem;padding:14px">Nenhum candidato neste filtro.</p>';
    var sel = $(".qi.sel", $("#queue"));
    if (sel && sel.scrollIntoView) { var q = $("#queue"); q.scrollTo({ left: sel.offsetLeft - q.clientWidth / 2 + sel.clientWidth / 2, behavior: reduce ? "auto" : "smooth" }); }
    $$(".filters button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.filter === state.filter)); });
    $$(".sorts button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.sort === state.sort)); });
  }

  /* ---------------- painel ---------------- */
  function orderIndex(id) { var l = C.slice().sort(function (a, b) { return a.name.localeCompare(b.name, "pt-BR"); }); return l.findIndex(function (c) { return c.id === id; }); }
  function renderPanel(animate) {
    var c = byId[state.selected] || C[0]; state.selected = c.id;
    var list = visibleList(); var pos = list.findIndex(function (x) { return x.id === c.id; });
    var seat = state.seats[c.id], outS = state.out[c.id], outV = state.view === "out";
    var posTxt = pos >= 0 ? "Candidato " + (pos + 1) + " de " + list.length : "Candidato";
    var crit = window.CRITERIA.map(function (k) {
      var v = c.scores[k.key];
      return '<div class="cr"><div class="row"><span class="lb">' + k.label + '</span><span class="vl">' + v.toFixed(1) + '<small> / 10</small></span></div><div class="track"><i data-w="' + (v * 10) + '"></i></div><p>' + esc(c.why[k.key]) + "</p></div>";
    }).join("");
    var html =
      '<div class="pbar"><span class="pos">' + posTxt + '</span>' +
      '<button class="nav" type="button" data-nav="-1" aria-label="Candidato anterior">' + ICO.prev + '</button>' +
      '<button class="nav" type="button" data-nav="1" aria-label="Próximo candidato">' + ICO.next + '</button></div>' +
      '<div class="pscroll"><div class="pgrid' + (animate ? " swap" : "") + '">' +
      '<div class="dollcol">' +
        '<div class="stage' + (seat ? " seated" : "") + (outS ? " outd" : "") + '" ' + (seat ? "" : 'data-drag="stage" ') + 'data-id="' + c.id + '" aria-label="Bonequinho de ' + esc(c.name) + '">' +
          '<span class="grab">' + (seat ? "Já está dentro do clube" : outS ? LV[outS[0]].label : outV ? "Arraste até uma cadeira de fora" : "Arraste até uma cadeira") + "</span>" + window.dollSVG(c, "stand", "", outS ? { level: LV[outS[0]].mood } : null) + "</div>" +
        actionsHtml(c, seat, outS, outV) +
        '<div class="superpower"><b>O QUE TEM NA MÃO</b>' + esc(c.tagline) + "</div>" +
      "</div>" +
      '<div class="dossier">' +
        '<div class="idrow"><div><h2>' + esc(c.name) + '</h2><p class="sub">' + esc(c.stage) + '</p><span class="gtag">' + (c.gender === "F" ? "Cadeira das meninas" : "Cadeira dos meninos") + '</span>' + (seat ? ' <span class="gtag in">Dentro do clube</span>' : outS ? ' <span class="gtag outl lv' + outS[0] + '">' + LV[outS[0]].label + '</span>' : '') + '</div>' +
          '<div class="ring" aria-label="Pontuação ' + c.total + ' de 100"><svg viewBox="0 0 104 104"><circle class="bg" cx="52" cy="52" r="46"/><circle class="fg" cx="52" cy="52" r="46" data-p="' + c.total + '"/></svg><div class="v"><b data-n="' + c.total + '">0</b><small>de 100</small></div></div></div>' +
        '<div class="sec"><h3>Currículo da entrevista</h3><div class="cv">' +
          '<div class="cvb"><h4>Perfil</h4>' + ul(c.resume.perfil) + "</div>" +
          '<div class="cvb"><h4>Atividades</h4>' + ul(c.resume.atividades) + "</div>" +
          '<div class="cvb"><h4>IA hoje</h4>' + ul(c.resume.ia) + "</div>" +
          '<div class="cvb"><h4>Disponibilidade</h4><p>' + esc(c.resume.disp) + "</p></div>" +
        "</div></div>" +
        '<div class="sec"><h3>Pontuação da IA</h3><div class="crit">' + crit + "</div></div>" +
        '<div class="sec sum"><h3>Resumo da entrevista</h3>' + ul(c.summary) +
          '<div class="att">' + c.attention.map(function (a) { return "<span>" + esc(a) + "</span>"; }).join("") + "</div>" +
          '<p class="srcl">Fonte: ' + esc(c.src.join(" | ")) + "</p></div>" +
        '<p class="disc">Pontuação gerada por IA a partir do que foi dito na entrevista, de 0 a 10 em cada critério. Serve de apoio: a decisão é do grupo.</p>' +
      "</div></div></div>";
    $("#panel").innerHTML = html;
    var scrollBox = $(".pscroll", $("#panel")); if (scrollBox) scrollBox.scrollTop = 0;
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      $$(".cr .track i").forEach(function (i) { i.style.width = i.dataset.w + "%"; });
      var fg = $(".ring .fg"); if (fg) fg.style.strokeDashoffset = String(289 - 289 * (+fg.dataset.p) / 100);
      var n = $(".ring [data-n]"); if (n) countTo(n, +n.dataset.n);
    }); });
  }
  function actionsHtml(c, seat, outS, outV) {
    if (!outV) {
      return seat
        ? '<button class="btn" type="button" data-act="unseat">Tirar da cadeira</button><p class="legend">' + slotLabel(seat) + "</p>"
        : '<button class="btn primary" type="button" data-act="seat">' + ICO.chair.replace("<svg", '<svg width="17" height="17"') + 'Sentar na cadeira</button><p class="legend">Ou arraste o bonequinho com o mouse ou o dedo.' + (outS ? " Hoje está em: " + LV[outS[0]].label.toLowerCase() + "." : "") + "</p>";
    }
    if (seat) return '<p class="legend">Esta pessoa está sentada dentro do clube. A escolha original continua valendo; a sala de fora é só para quem não sentou.</p>';
    var btns = LVS.map(function (l) {
      var free = freeOut(l);
      return '<button class="btn lvb lv' + l + (outS && outS[0] === l ? " on" : "") + '" type="button" data-act="out" data-lv="' + l + '"' + (!free && !(outS && outS[0] === l) ? " disabled" : "") + ">" + LV[l].label + "</button>";
    }).join("");
    return '<div class="lvbtns">' + btns + "</div>" + (outS ? '<button class="btn" type="button" data-act="unout">Tirar da sala de fora</button>' : "") +
      '<p class="legend">' + (outS ? slotLabel(outS) : "Ou arraste o bonequinho para uma cadeira de fora.") + "</p>";
  }
  function countTo(el, to) {
    if (reduce) { el.textContent = to; return; }
    var t0 = null;
    function st(ts) { if (t0 === null) t0 = ts; var p = Math.min(1, (ts - t0) / 900); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(st); }
    requestAnimationFrame(st);
  }

  /* ---------------- sala ---------------- */
  function renderOutRoom() {
    var cfg = outCfg();
    var rows = LVS.map(function (l) {
      var n = cfg[l], slots = "";
      for (var i = 0; i < n; i++) {
        var id = l + i, occ = occupant(id), c = occ ? byId[occ] : null;
        slots += '<div class="slot ' + (c ? "full" : "empty") + ' outs lv' + l + '" data-slot="' + id + '" data-g="' + l + '" role="group" aria-label="' + slotLabel(id) + (c ? ", ocupada por " + esc(c.name) : ", livre") + '">' +
          '<div class="cw">' + window.chairSVG(l) + "</div>" +
          '<div class="sitter" ' + (c ? 'data-drag="sitter" data-id="' + c.id + '"' : "") + ">" + (c ? window.dollSVG(c, "sit", "", { level: LV[l].mood }) : "") + "</div>" +
          '<div class="tbl"></div>' +
          '<div class="plate">' + (c ? "<span>" + esc(c.name) + '</span><span class="sc">' + c.total + " pts</span>" : "<b>" + (i + 1) + "</b>livre") + "</div></div>";
      }
      return '<div class="rowg out lv' + l + (outCount(l) >= n && n > 0 ? " full" : "") + '"><h3>' + LV[l].label + ' <span class="pill">' + outCount(l) + "/" + n + '</span></h3><p class="rsub">' + LV[l].sub + '</p><div class="seats">' + slots + "</div></div>";
    }).join("");
    $("#room").innerHTML =
      '<div class="rhead"><div><h2>Sala de fora do clube</h2><p>' + cfg.total + " cadeiras de fora = " + C.length + " candidatos - " + totalChairs() + " cadeiras do clube. A escolha de dentro continua guardada.</p></div></div>" +
      '<div class="rbody">' + (cfg.total ? rows : '<p class="legend">Há cadeiras do clube para todos os candidatos, então ninguém fica de fora.</p>') + "</div>";
    fitRoom();
  }
  function renderRoom() {
    sanitizeSeats(); sanitizeOut();
    $("#room").classList.toggle("outroom", state.view === "out");
    if (state.view === "out") return renderOutRoom();
    var row = function (g) {
      var n = state.config[g], seated = seatedCount(g);
      var slots = "";
      for (var i = 0; i < n; i++) {
        var id = g + i, occ = occupant(id), c = occ ? byId[occ] : null;
        slots += '<div class="slot ' + (c ? "full" : "empty") + '" data-slot="' + id + '" data-g="' + g + '" role="group" aria-label="' + slotLabel(id) + (c ? ", ocupada por " + esc(c.name) : ", livre") + '">' +
          '<div class="cw">' + window.chairSVG(g) + "</div>" +
          '<div class="sitter" ' + (c ? 'data-drag="sitter" data-id="' + c.id + '"' : "") + ">" + (c ? window.dollSVG(c, "sit") : "") + "</div>" +
          '<div class="tbl"></div>' +
          '<div class="plate">' + (c ? "<span>" + esc(c.name) + '</span><span class="sc">' + c.total + " pts</span>" : "<b>" + (i + 1) + "</b>livre") + "</div></div>";
      }
      return '<div class="rowg ' + g + (seated >= n && n > 0 ? " full" : "") + '"><h3>Cadeiras das ' + GNAME[g] + ' <span class="pill">' + seated + "/" + n + '</span></h3><div class="seats">' + slots + "</div></div>";
    };
    $("#room").innerHTML =
      '<div class="rhead"><div><h2>Sala do clube</h2><p>Arraste o bonequinho para uma cadeira livre do grupo dele(a).</p></div></div>' +
      '<div class="rbody">' + row("F") + row("M") + "</div>";
    fitRoom();
  }
  function fitRoom() {
    // reduz a escala das cadeiras quando a linha é maior que a largura disponível
    var body = $(".rbody", $("#room")); if (!body) return;
    var avail = body.clientWidth - 24;
    $$(".seats", body).forEach(function (s) {
      var n = s.children.length, need = n * 118;
      var k = Math.min(1, Math.max(.55, avail / need));
      if (need <= avail) { s.style.zoom = ""; } else { s.style.zoom = k; }
    });
  }
  window.addEventListener("resize", function () { fitRoom(); });

  /* ---------------- ações ---------------- */
  function select(id, animate) {
    state.selected = id; persist(); renderQueue(); renderPanel(animate !== false);
  }
  function nextWaiting(fromId) {
    var list = visibleList(); var i = list.findIndex(function (c) { return c.id === fromId; });
    for (var k = 1; k <= list.length; k++) { var c = list[(i + k) % list.length]; if (c && !isDecided(c)) return c.id; }
    return null;
  }
  function slotCenter(slot) {
    var el = $('.slot[data-slot="' + slot + '"] .sitter'); if (!el) return null;
    var r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height };
  }
  function afterSeat(id, slot, confettiPos) {
    var c = byId[id];
    renderCounters(); renderRoom(); persist();
    var sit = $('.slot[data-slot="' + slot + '"] .sitter'); if (sit) sit.classList.add("new");
    var p = confettiPos || slotCenter(slot) || { x: innerWidth / 2, y: innerHeight / 2 };
    confetti(p.x, p.y - 20, false); blip("good");
    toast(c.name + " sentou na " + slotLabel(slot).toLowerCase(), "good");
    var full = seatedCount() >= totalChairs();
    var nxt = nextWaiting(id);
    if (state.selected === id) {
      if (full) { renderQueue(); renderPanel(false); setTimeout(showDone, 700); }
      else if (nxt) setTimeout(function () { select(nxt, true); }, 950);
      else { renderQueue(); renderPanel(false); }
    } else { renderQueue(); renderPanel(false); }
  }
  function seat(id, slot, from) {
    state.seats[id] = slot; delete state.out[id]; afterSeat(id, slot, from);
  }
  function placeOut(id, slot, from, moved) {
    var c = byId[id]; state.out[id] = slot; persist();
    renderCounters(); renderRoom();
    var sit = $('.slot[data-slot="' + slot + '"] .sitter'); if (sit) sit.classList.add("new");
    blip("sad"); toast(c.name.split(" ")[0] + (moved ? " mudou para: " : " foi para: ") + LV[slot[0]].label.toLowerCase(), "");
    var nxt = nextWaiting(id);
    if (state.selected === id && nxt && !moved) setTimeout(function () { select(nxt, true); }, 950);
    else { renderQueue(); renderPanel(false); }
  }
  function unout(id) {
    var c = byId[id]; delete state.out[id]; persist();
    renderCounters(); renderRoom(); renderQueue(); renderPanel(false);
    toast(c.name.split(" ")[0] + " saiu da sala de fora", "");
  }
  function setView(v) {
    state.view = v; renderCounters(); renderRoom(); renderQueue(); renderPanel(false);
  }
  function unseat(id, silent) {
    var c = byId[id]; delete state.seats[id]; persist();
    renderCounters(); renderRoom(); renderQueue(); renderPanel(false);
    if (!silent) toast(c.name + " voltou para a fila", "");
  }
  function showDone() {
    var f = seatedCount("F"), m = seatedCount("M");
    $("#doneP").textContent = "Todas as " + totalChairs() + " cadeiras estão ocupadas: " + f + " meninas e " + m + " meninos. Baixe a lista de aprovados em PDF.";
    $("#done").classList.add("show"); confetti(innerWidth / 2, innerHeight * .4, true); blip("done");
    $("#doneDl").focus();
  }

  /* ---------------- arrastar ---------------- */
  var drag = null;
  document.addEventListener("pointerdown", function (e) {
    if (e.button !== undefined && e.button !== 0) return;
    var h = e.target.closest && e.target.closest("[data-drag]"); if (!h) return;
    var id = h.dataset.id;
    drag = { id: id, kind: h.dataset.drag, el: h, sx: e.clientX, sy: e.clientY, started: false, pid: e.pointerId, hover: null, clone: null, last: e.clientX };
    try { h.setPointerCapture(e.pointerId); } catch (er) {}
    e.preventDefault();
  });
  document.addEventListener("pointermove", function (e) {
    if (!drag || e.pointerId !== drag.pid) return;
    if (!drag.started) {
      if (Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) < 6) return;
      startDrag();
    }
    var dx = e.clientX - drag.last; drag.last = e.clientX;
    drag.tilt = Math.max(-18, Math.min(18, (drag.tilt || 0) * .7 + dx * .9));
    moveClone(e.clientX, e.clientY);
    updateHover(e.clientX, e.clientY);
    autoScroll(e.clientY);
  });
  function endDrag(e, cancel) {
    if (!drag || (e && e.pointerId !== drag.pid)) return;
    var d = drag; drag = null;
    try { d.el.releasePointerCapture(d.pid); } catch (er) {}
    if (!d.started) {
      if (d.kind === "sitter") select(d.id, true);
      return;
    }
    var x = e ? e.clientX : d.sx, y = e ? e.clientY : d.sy;
    var target = cancel ? null : slotAt(x, y);
    finishDrag(d, target, x, y);
  }
  document.addEventListener("pointerup", function (e) { endDrag(e, false); });
  document.addEventListener("pointercancel", function (e) { endDrag(e, true); });

  function startDrag() {
    var c = byId[drag.id]; drag.started = true;
    document.body.classList.add("dragging");
    var el = document.createElement("div"); el.className = "dragclone"; el.innerHTML = window.dollSVG(c, "stand");
    document.body.appendChild(el); drag.clone = el;
    drag.el.classList.add("ghost");
    $$(".slot").forEach(function (s) {
      var g = s.dataset.g, free = !occupant(s.dataset.slot), outv = state.view === "out";
      s.classList.toggle("ok", (outv || g === c.gender) && free);
      s.classList.toggle("nope", !outv && g !== c.gender);
    });
    if (window.matchMedia("(max-width:980px)").matches) {
      var r = $("#room").getBoundingClientRect(); if (r.top > innerHeight * .6) window.scrollBy({ top: r.top - 80, behavior: "smooth" });
    }
  }
  function moveClone(x, y) {
    if (!drag.clone) return;
    drag.clone.style.transform = "translate(" + (x - 56) + "px," + (y - 50) + "px) rotate(" + (drag.tilt || 0) + "deg) scale(1.05)";
  }
  function slotAt(x, y) {
    var best = null, bd = 1e9;
    $$(".slot").forEach(function (s) {
      var r = s.getBoundingClientRect(), pad = 14;
      if (x >= r.left - pad && x <= r.right + pad && y >= r.top - pad && y <= r.bottom + pad) {
        var d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height * .45));
        if (d < bd) { bd = d; best = s; }
      }
    });
    return best;
  }
  function updateHover(x, y) {
    var s = slotAt(x, y);
    if (drag.hover && drag.hover !== s) drag.hover.classList.remove("hover");
    if (s) s.classList.add("hover");
    drag.hover = s;
  }
  var scrollRaf = null;
  function autoScroll(y) {
    if (!window.matchMedia("(max-width:980px)").matches) return;
    var dy = y < 70 ? -14 : (y > innerHeight - 70 ? 14 : 0);
    if (!dy) return;
    window.scrollBy(0, dy);
  }
  function cleanupDrag() {
    document.body.classList.remove("dragging");
    $$(".slot").forEach(function (s) { s.classList.remove("ok", "nope", "hover"); });
  }
  function flyTo(clone, from, to, scaleTo, done) {
    if (!clone) { done(); return; }
    if (reduce || !clone.animate) { done(); return; }
    var a = clone.animate([
      { transform: "translate(" + (from.x - 56) + "px," + (from.y - 50) + "px) scale(1.05)", opacity: 1 },
      { transform: "translate(" + (to.x - 56) + "px," + (to.y - 50) + "px) scale(" + scaleTo + ")", opacity: .9 }
    ], { duration: 340, easing: "cubic-bezier(.3,1.25,.5,1)", fill: "forwards" });
    a.onfinish = done; a.oncancel = done;
  }
  function finishDrag(d, target, x, y) {
    var c = byId[d.id], clone = d.clone;
    var restore = function () { if (clone) clone.remove(); d.el.classList.remove("ghost"); cleanupDrag(); };
    var back = function (msg) {
      if (msg) { toast(msg, "bad"); blip("bad"); }
      var home = d.el.getBoundingClientRect(); var hp = { x: home.left + home.width / 2, y: home.top + home.height / 2 };
      flyTo(clone, { x: x, y: y }, hp, 1, restore);
    };
    if (target && state.view === "out") {
      var oslot = target.dataset.slot, oocc = occupant(oslot);
      if (oocc && oocc !== d.id) return back("Essa cadeira já está ocupada por " + byId[oocc].name.split(" ")[0] + ".");
      if (oocc === d.id) return back();
      var oto = slotCenter(oslot) || { x: x, y: y };
      return flyTo(clone, { x: x, y: y }, oto, Math.max(.7, (oto.w || 96) / 104), function () {
        if (clone) clone.remove(); d.el.classList.remove("ghost"); cleanupDrag();
        placeOut(d.id, oslot, oto, d.kind === "sitter" || !!state.out[d.id]);
      });
    }
    if (target) {
      var g = target.dataset.g, slot = target.dataset.slot, occ = occupant(slot);
      if (g !== c.gender) {
        var who = c.gender === "F" ? "Esta é uma cadeira dos meninos. " + c.name.split(" ")[0] + " senta nas cadeiras das meninas." : "Esta é uma cadeira das meninas. " + c.name.split(" ")[0] + " senta nas cadeiras dos meninos.";
        return back(who);
      }
      if (occ && occ !== d.id) return back("Essa cadeira já está ocupada por " + byId[occ].name.split(" ")[0] + ".");
      if (occ === d.id) return back();
      var to = slotCenter(slot) || { x: x, y: y };
      var wasSeated = d.kind === "sitter";
      return flyTo(clone, { x: x, y: y }, to, Math.max(.7, (to.w || 96) / 104), function () {
        if (clone) clone.remove(); d.el.classList.remove("ghost"); cleanupDrag();
        if (wasSeated) { state.seats[d.id] = slot; persist(); renderCounters(); renderRoom(); var sit = $('.slot[data-slot="' + slot + '"] .sitter'); if (sit) sit.classList.add("new"); blip("good"); toast(c.name.split(" ")[0] + " mudou de cadeira", "good"); }
        else seat(d.id, slot, to);
      });
    }
    // soltou fora das cadeiras
    if (d.kind === "sitter") {
      var el = document.elementFromPoint(x, y);
      var inPanel = el && el.closest && (el.closest("#panel") || el.closest(".strip"));
      if (inPanel) { restore(); return state.view === "out" ? unout(d.id) : unseat(d.id); }
    }
    back();
  }

  /* ---------------- eventos da interface ---------------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("button"); if (!t) return;
    if (t.classList.contains("qi")) return select(t.dataset.id, true);
    if (t.dataset.nav) {
      var l = visibleList(); if (!l.length) return;
      var i = l.findIndex(function (c) { return c.id === state.selected; }); if (i < 0) i = 0;
      return select(l[(i + parseInt(t.dataset.nav, 10) + l.length) % l.length].id, true);
    }
    if (t.dataset.act === "seat") {
      var c = byId[state.selected], s = freeSlot(c.gender);
      if (!s) { toast("As cadeiras das " + GNAME[c.gender] + " já estão todas ocupadas.", "bad"); blip("bad"); return; }
      var st = $(".stage"); var r = st ? st.getBoundingClientRect() : null;
      if (r && !reduce && st.animate) {
        var clone = document.createElement("div"); clone.className = "dragclone"; clone.innerHTML = window.dollSVG(c, "stand"); document.body.appendChild(clone);
        var from = { x: r.left + r.width / 2, y: r.top + r.height / 2 }, to = slotCenter(s) || from;
        flyTo(clone, from, to, .8, function () { clone.remove(); seat(c.id, s, to); });
      } else seat(c.id, s);
      return;
    }
    if (t.dataset.act === "unseat") return unseat(state.selected);
    if (t.dataset.act === "unout") return unout(state.selected);
    if (t.dataset.act === "out") {
      var oc = byId[state.selected], lv = t.dataset.lv, cur = state.out[oc.id];
      if (cur && cur[0] === lv) return;
      var os = freeOut(lv);
      if (!os) { toast("Todas as cadeiras de " + LV[lv].label.toLowerCase() + " estão ocupadas.", "bad"); blip("bad"); return; }
      var stg = $(".stage"), rr = stg ? stg.getBoundingClientRect() : null;
      if (rr && !reduce && stg.animate) {
        var cl = document.createElement("div"); cl.className = "dragclone"; cl.innerHTML = window.dollSVG(oc, "stand"); document.body.appendChild(cl);
        var fr = { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2 }, tt = slotCenter(os) || fr;
        flyTo(cl, fr, tt, .8, function () { cl.remove(); placeOut(oc.id, os, tt, !!cur); });
      } else placeOut(oc.id, os, null, !!cur);
      return;
    }
    if (t.id === "btnOut") return setView(state.view === "out" ? "in" : "out");
    if (t.dataset.filter) { state.filter = t.dataset.filter; persist(); renderQueue(); renderPanel(false); return; }
    if (t.dataset.sort) { state.sort = t.dataset.sort; persist(); renderQueue(); renderPanel(false); return; }
  });
  document.addEventListener("keydown", function (e) {
    if (e.target.closest && e.target.closest("dialog,input,textarea")) return;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      var l = visibleList(); var i = l.findIndex(function (c) { return c.id === state.selected; });
      if (i < 0) i = 0; select(l[(i + (e.key === "ArrowRight" ? 1 : -1) + l.length) % l.length].id, true);
    }
  });

  $("#btnSound").addEventListener("click", function () { state.sound = !state.sound; persist(); renderCounters(); if (state.sound) blip("good"); });

  var resetArmed = null;
  $("#btnReset").addEventListener("click", function () {
    var b = $("#btnReset");
    if (!resetArmed) {
      b.classList.add("confirm"); b.querySelector("span").textContent = "Confirmar?";
      resetArmed = setTimeout(disarm, 3200); return;
    }
    clearTimeout(resetArmed); disarm();
    state.seats = {}; state.out = {}; state.view = "in"; persist(); renderCounters(); renderRoom(); renderQueue(); renderPanel(false); toast("Tudo limpo. Pode começar de novo.", "");
  });
  function disarm() { resetArmed = null; var b = $("#btnReset"); b.classList.remove("confirm"); b.querySelector("span").textContent = "Recomeçar"; }

  /* cadeiras */
  var dlgC = $("#dlgConfig");
  function cfgRender() { $("#cfgF").textContent = state.config.F; $("#cfgM").textContent = state.config.M; $("#cfgTotal").textContent = "Total: " + totalChairs() + " cadeiras."; }
  $("#btnConfig").addEventListener("click", function () { cfgRender(); dlgC.showModal(); });
  $$("[data-cfg]").forEach(function (b) {
    b.addEventListener("click", function () {
      var g = b.dataset.cfg, v = Math.max(1, Math.min(12, state.config[g] + parseInt(b.dataset.d, 10)));
      if (v < state.config[g]) {
        var last = g + (state.config[g] - 1), occ = occupant(last);
        if (occ) delete state.seats[occ];
      }
      state.config[g] = v; persist(); cfgRender(); renderCounters(); renderRoom(); renderQueue(); renderPanel(false);
    });
  });
  $("#cfgOk").addEventListener("click", function () { dlgC.close(); });

  /* pdf */
  var dlgP = $("#dlgPdf");
  function approved() {
    return Object.keys(state.seats).map(function (id) { return byId[id]; }).sort(function (a, b) { return b.total - a.total || a.name.localeCompare(b.name, "pt-BR"); });
  }
  function openPdf() {
    var f = seatedCount("F"), m = seatedCount("M"), tot = seatedCount();
    $("#pdfInfo").textContent = tot + " aprovado(s): " + f + " menina(s) e " + m + " menino(s).";
    var w = $("#pdfWarn"), miss = [];
    if (f < state.config.F) miss.push((state.config.F - f) + " cadeira(s) das meninas");
    if (m < state.config.M) miss.push((state.config.M - m) + " cadeira(s) dos meninos");
    w.hidden = !miss.length; w.textContent = miss.length ? "Ainda livre: " + miss.join(" e ") + ". O PDF sai com quem já está sentado." : "";
    $("#done").classList.remove("show");
    dlgP.showModal();
  }
  $("#btnPdf").addEventListener("click", openPdf);
  $("#doneDl").addEventListener("click", openPdf);
  $("#doneClose").addEventListener("click", function () { $("#done").classList.remove("show"); });
  $("#pdfCancel").addEventListener("click", function () { dlgP.close(); });
  $("#pdfGo").addEventListener("click", function () {
    try {
      window.exportPDF({ approved: approved(), config: state.config, counts: { F: seatedCount("F"), M: seatedCount("M") }, includeSummaries: $("#pdfSum").checked, criteria: window.CRITERIA, totalCandidates: C.length });
      toast("PDF gerado. Confira a pasta de downloads.", "good");
    } catch (er) { console.error(er); toast("Não consegui gerar o PDF neste navegador.", "bad"); }
    dlgP.close();
  });

  /* ---------------- início ---------------- */
  sanitizeSeats(); sanitizeOut();
  if (!state.selected || !byId[state.selected]) {
    var first = visibleList().filter(function (c) { return !state.seats[c.id]; })[0] || C[0]; state.selected = first.id;
  }
  renderCounters(); renderQueue(); renderPanel(true); renderRoom();
  // para testes e depuração
  window.__skema = { state: state, out: function (id, l) { var s = freeOut(l); if (s) { state.out[id] = s; persist(); renderCounters(); renderRoom(); renderQueue(); renderPanel(false); } }, setView: setView, seat: function (id) { var c = byId[id]; var s = freeSlot(c.gender); if (s) { state.seats[id] = s; persist(); renderCounters(); renderRoom(); renderQueue(); renderPanel(false); } }, approved: approved };
})();
