/* Bonequinhos em SVG. Cada um tem cabelo, cor de roupa e um objeto que conta algo da entrevista. */
(function () {
  var FACE = "#EFE9FF", INK = "#17171F", RED = "#EF001B", LILAC = "#A98BFF", WHITE = "#FFFFFF";

  var PROPS = {
    racket: '<ellipse cx="0" cy="-6" rx="8" ry="10" fill="none" stroke="#fff" stroke-width="2.4"/><path d="M-4-12 4 0M4-12-4 0M0-15V3" stroke="#fff" stroke-width="1" opacity=".7"/><path d="M0 4v10" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="11" cy="-13" r="3.4" fill="' + RED + '"/>',
    megaphone: '<path d="M-10-4 6-11V11L-10 4Z" fill="' + LILAC + '" stroke="#fff" stroke-width="2" stroke-linejoin="round"/><rect x="-14" y="-4" width="5" height="8" rx="1.5" fill="#fff"/><path d="M10-5Q15 0 10 5M13-9Q20 0 13 9" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="-3" cy="12" r="2.6" fill="' + RED + '"/>',
    chip: '<rect x="-9" y="-9" width="18" height="18" rx="3" fill="' + LILAC + '" stroke="#fff" stroke-width="2"/><rect x="-4" y="-4" width="8" height="8" rx="1" fill="#26068D"/><path d="M-5-13v4M0-13v4M5-13v4M-5 9v4M0 9v4M5 9v4M-13-5h4M-13 0h4M-13 5h4M9-5h4M9 0h4M9 5h4" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><circle cx="0" cy="0" r="1.8" fill="' + RED + '"/>',
    truck: '<rect x="-13" y="-8" width="16" height="13" rx="2" fill="' + LILAC + '" stroke="#fff" stroke-width="2"/><path d="M3-4h6l4 5v4H3Z" fill="#fff"/><circle cx="-6" cy="7" r="3.4" fill="' + INK + '" stroke="#fff" stroke-width="2"/><circle cx="8" cy="7" r="3.4" fill="' + INK + '" stroke="#fff" stroke-width="2"/><circle cx="7" cy="-0.5" r="1.8" fill="' + RED + '"/>',
    chart: '<rect x="-10" y="0" width="5.5" height="10" rx="1" fill="' + LILAC + '" stroke="#fff" stroke-width="1.6"/><rect x="-2.7" y="-6" width="5.5" height="16" rx="1" fill="' + LILAC + '" stroke="#fff" stroke-width="1.6"/><rect x="4.5" y="-12" width="5.5" height="22" rx="1" fill="' + LILAC + '" stroke="#fff" stroke-width="1.6"/><circle cx="7.3" cy="-15" r="2.8" fill="' + RED + '"/>',
    clipboard: '<rect x="-9" y="-10" width="18" height="23" rx="3" fill="#fff" stroke="' + LILAC + '" stroke-width="2"/><rect x="-4.5" y="-14" width="9" height="6" rx="2" fill="' + LILAC + '"/><path d="M-5-2h10M-5 3h10M-5 8h6" stroke="#26068D" stroke-width="1.8" stroke-linecap="round"/><circle cx="6" cy="8" r="2.4" fill="' + RED + '"/>',
    terminal: '<rect x="-13" y="-9" width="26" height="19" rx="3" fill="' + INK + '" stroke="#fff" stroke-width="2"/><path d="M-8-3l5 3.5-5 3.5" fill="none" stroke="' + LILAC + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M0 5h7" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="-5" r="1.8" fill="' + RED + '"/>',
    globe: '<circle cx="0" cy="0" r="11" fill="' + LILAC + '" stroke="#fff" stroke-width="2"/><ellipse cx="0" cy="0" rx="4.8" ry="11" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M-11 0H11M-9-6H9M-9 6H9" stroke="#fff" stroke-width="1.4"/><circle cx="7" cy="-6" r="2.6" fill="' + RED + '"/>',
    ball: '<circle cx="0" cy="0" r="11" fill="#fff" stroke="#fff" stroke-width="1"/><path d="M0-5 4.8-1.5 3 4H-3L-4.8-1.5Z" fill="' + INK + '"/><path d="M0-5V-11M4.8-1.5 11-3M3 4l4 5M-3 4l-4 5M-4.8-1.5-11-3" stroke="' + INK + '" stroke-width="1.5"/><circle cx="8" cy="7" r="2.4" fill="' + RED + '"/>',
    robot: '<rect x="-10" y="-8" width="20" height="16" rx="5" fill="' + LILAC + '" stroke="#fff" stroke-width="2"/><circle cx="-4" cy="-1" r="2.4" fill="' + INK + '"/><circle cx="4" cy="-1" r="2.4" fill="' + INK + '"/><path d="M-4 4.5H4" stroke="' + INK + '" stroke-width="1.8" stroke-linecap="round"/><path d="M0-8v-5" stroke="#fff" stroke-width="2"/><circle cx="0" cy="-15" r="2.8" fill="' + RED + '"/>',
    bag: '<path d="M-10-5H10L12 12H-12Z" fill="' + LILAC + '" stroke="#fff" stroke-width="2" stroke-linejoin="round"/><path d="M-5-5Q-5-13 0-13T5-5" fill="none" stroke="#fff" stroke-width="2"/><circle cx="0" cy="3.5" r="3" fill="' + RED + '"/>',
    palette: '<path d="M0-11C-9-11-14-5-14 1c0 7 6 11 11 11 3 0 3-3 1-4-2-2 0-4 3-4h5c3 0 5-2 5-5C11-6 7-11 0-11Z" fill="#fff" stroke="' + LILAC + '" stroke-width="2"/><circle cx="-6" cy="-3" r="2.2" fill="' + LILAC + '"/><circle cx="0" cy="-6" r="2.2" fill="#26068D"/><circle cx="6" cy="-3" r="2.2" fill="' + RED + '"/>',
    compass: '<circle cx="0" cy="0" r="11" fill="#fff" stroke="' + LILAC + '" stroke-width="2.4"/><path d="M0-8 3 0H-3Z" fill="' + RED + '"/><path d="M0 8 3 0H-3Z" fill="#26068D"/><circle cx="0" cy="0" r="1.4" fill="#fff"/>',
    nodes: '<path d="M-8 7 0-8 8 7ZM-8 7H8" fill="none" stroke="#fff" stroke-width="2"/><circle cx="-8" cy="7" r="3.4" fill="' + LILAC + '" stroke="#fff" stroke-width="1.6"/><circle cx="8" cy="7" r="3.4" fill="' + LILAC + '" stroke="#fff" stroke-width="1.6"/><circle cx="0" cy="-8" r="3.4" fill="' + RED + '" stroke="#fff" stroke-width="1.6"/>',
    leaf: '<path d="M0-13 3-6 9-8 6-1 12 2 5 4 6 11 0 9-6 11-5 4-12 2-6-1-9-8-3-6Z" fill="' + RED + '" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/>',
    plane: '<path d="M-13-2 13-10 5 11 0 3Z" fill="#fff" stroke="' + LILAC + '" stroke-width="2" stroke-linejoin="round"/><path d="M0 3 13-10" stroke="' + LILAC + '" stroke-width="1.6"/><circle cx="-11" cy="8" r="2.6" fill="' + RED + '"/>',
    flow: '<rect x="-13" y="-11" width="9" height="7" rx="2" fill="' + LILAC + '" stroke="#fff" stroke-width="1.6"/><rect x="4" y="-11" width="9" height="7" rx="2" fill="' + LILAC + '" stroke="#fff" stroke-width="1.6"/><rect x="-4.5" y="5" width="9" height="7" rx="2" fill="' + RED + '" stroke="#fff" stroke-width="1.6"/><path d="M-8.5-4V0H0V5M8.5-4V0H0" fill="none" stroke="#fff" stroke-width="1.8"/>',
    briefcase: '<rect x="-12" y="-5" width="24" height="16" rx="3" fill="' + LILAC + '" stroke="#fff" stroke-width="2"/><path d="M-4-5v-4h8v4M-12 2H12" fill="none" stroke="#fff" stroke-width="2"/><rect x="-2" y="-0.5" width="4" height="5.5" rx="1" fill="' + RED + '"/>'
  };

  function hairBack(style, c, outfit) {
    switch (style) {
      case "long":
        return '<path d="M35 42C31 12 89 12 85 42L89 86Q78 93 74 80H46Q42 93 31 86Z" fill="' + c + '"/>';
      case "bun":
        return '<circle cx="60" cy="11" r="9.5" fill="' + c + '"/>';
      case "curly":
        return '<g fill="' + c + '"><circle cx="40" cy="22" r="9"/><circle cx="51" cy="15" r="9"/><circle cx="64" cy="14" r="9"/><circle cx="77" cy="20" r="9"/><circle cx="36" cy="34" r="8"/><circle cx="84" cy="34" r="8"/></g>';
      case "pony":
        return '<path d="M80 26C104 24 108 54 94 70 98 52 92 40 82 38Z" fill="' + c + '"/>';
      default:
        return "";
    }
  }
  function hairFront(style, c, outfit) {
    switch (style) {
      case "short": case "bun": case "pony":
        return '<path d="M36.5 40C35 20 48 13 60 13S85 20 83.5 40C79 31 70 27 60 27S41 31 36.5 40Z" fill="' + c + '"/>';
      case "long":
        return '<path d="M36.5 38C40 23 52 21 60 26 68 21 80 23 83.5 38 75 31 66 30 60 32 54 30 45 31 36.5 38Z" fill="' + c + '"/>';
      case "curly":
        return '<g fill="' + c + '"><circle cx="46" cy="27" r="7"/><circle cx="58" cy="24" r="7"/><circle cx="71" cy="26" r="7"/></g>';
      case "side":
        return '<path d="M36 42C31 16 70 7 85 30 86 36 84 40 83 42 78 30 62 26 48 34 42 36 38 40 36 42Z" fill="' + c + '"/>';
      case "buzz":
        return '<path d="M38 36C41 20 79 20 82 36 76 28 44 28 38 36Z" fill="' + c + '" opacity=".92"/>';
      case "cap":
        return '<path d="M35 36C35 11 85 11 85 36Z" fill="' + outfit + '" stroke="#fff" stroke-width="1.4"/><path d="M52 35H98Q101 41 92 42H52Z" fill="' + outfit + '" stroke="#fff" stroke-width="1.4"/><circle cx="60" cy="14" r="2" fill="' + RED + '"/>';
      default:
        return "";
    }
  }

  function inner(c, withProp) {
    var l = c.look, outfit = l.outfit, hc = l.hairColor;
    var s = "";
    s += '<ellipse cx="60" cy="164" rx="30" ry="5" fill="rgba(0,0,0,.35)"/>';
    s += hairBack(l.hair, hc, outfit);
    // pernas e sapatos
    s += '<rect x="40" y="108" width="17" height="46" rx="8" fill="#2A2748"/><rect x="63" y="108" width="17" height="46" rx="8" fill="#2A2748"/>';
    s += '<ellipse cx="48.5" cy="155" rx="12" ry="6.5" fill="#fff"/><ellipse cx="71.5" cy="155" rx="12" ry="6.5" fill="#fff"/>';
    // braços e tronco
    s += '<path d="M38 74C28 86 26 98 30 110" fill="none" stroke="' + outfit + '" stroke-width="12" stroke-linecap="round"/>';
    s += '<path d="M82 74C93 80 99 90 98 102" fill="none" stroke="' + outfit + '" stroke-width="12" stroke-linecap="round"/>';
    s += '<rect x="34" y="62" width="52" height="54" rx="19" fill="' + outfit + '"/>';
    s += '<path d="M34 100Q60 108 86 100" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="2"/>';
    s += '<path d="M51 63Q60 74 69 63" fill="' + FACE + '"/>';
    s += '<circle cx="30" cy="112" r="6" fill="' + FACE + '"/><circle cx="98" cy="103" r="6" fill="' + FACE + '"/>';
    // cabeça
    s += '<circle cx="60" cy="40" r="23" fill="' + FACE + '"/>';
    s += hairFront(l.hair, hc, outfit);
    s += '<circle cx="51.5" cy="42" r="2.7" fill="' + INK + '"/><circle cx="68.5" cy="42" r="2.7" fill="' + INK + '"/>';
    s += '<path d="M52 50Q60 57 68 50" fill="none" stroke="' + INK + '" stroke-width="2.2" stroke-linecap="round"/>';
    s += '<circle cx="45.5" cy="49" r="3.4" fill="#C9B6FF" opacity=".6"/><circle cx="74.5" cy="49" r="3.4" fill="#C9B6FF" opacity=".6"/>';
    if (l.glasses) {
      s += '<g fill="none" stroke="' + INK + '" stroke-width="1.8"><circle cx="51.5" cy="42" r="6.6"/><circle cx="68.5" cy="42" r="6.6"/><path d="M58 42h4"/></g>';
    }
    if (withProp !== false && PROPS[l.prop]) {
      s += '<g transform="translate(98 100) scale(1.2)">' + PROPS[l.prop] + '</g>';
    }
    return s;
  }

  /*
    pose: "stand" (corpo inteiro), "sit" (da cabeça até a cintura, para ficar atrás da mesa)
          "head" (avatar pequeno)
  */
  window.dollSVG = function (c, pose, cls) {
    pose = pose || "stand";
    var vb = "-8 0 136 172", withProp = true;
    if (pose === "sit") vb = "-8 4 136 118";
    if (pose === "head") { vb = "20 6 80 76"; withProp = false; }
    return '<svg class="doll ' + (cls || "") + '" viewBox="' + vb + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bonequinho de ' + c.name + '" focusable="false">' + inner(c, withProp) + "</svg>";
  };

  window.chairSVG = function (kind) {
    // kind: "F" ou "M"
    var back = kind === "F" ? "#A98BFF" : "#4A1FC9";
    var edge = kind === "F" ? "#D9CBFF" : "#7F57FF";
    return '<svg class="chair" viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
      '<rect x="14" y="6" width="92" height="118" rx="24" fill="' + back + '"/>' +
      '<rect x="14" y="6" width="92" height="118" rx="24" fill="none" stroke="' + edge + '" stroke-width="3"/>' +
      '<rect x="26" y="18" width="68" height="96" rx="16" fill="rgba(255,255,255,.10)"/>' +
      '<rect x="30" y="118" width="60" height="14" rx="7" fill="' + back + '"/>' +
      "</svg>";
  };
})();
