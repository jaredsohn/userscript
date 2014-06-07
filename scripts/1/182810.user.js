// ==UserScript==
// @name          Substitutions That Make The News More Fun
// @description   http://xkcd.com/1288/
// @version       1.0
// ==/UserScript==

(function() {
  function htmlreplace(a, b, element) {
    var nodes = element.childNodes;
    for (var n = 0; n < nodes.length; n++) {
      if (nodes[n].nodeType == Node.TEXT_NODE) {
        var r = new RegExp(a, 'ig'), c = nodes[n].textContent;
        nodes[n].textContent = c.replace(r, c.toLowerCase() !== c 
          ? b.charAt(0).toUpperCase() + b.slice(1) : b);
      } else {
        htmlreplace(a, b, nodes[n]);
      }
    }
  }

  [
    ['witnesses', 'these dudes I know'],
    ['allegedly', 'kinda probably'],
    ['new study', 'tumblr post'],
    ['rebuild', 'avenge'],
    ['space', 'spaaace'],
    ['google glass', 'Virtual Boy'],
    ['smartphone', 'Pokedex'],
    ['electric', 'atomic'],
    ['senator', 'elf-lord'],
    ['car', 'cat'],
    ['election', 'eating contest'],
    ['congressional leaders', 'river spirits'],
    ['homeland security', 'homestar runner'],
    ['could not be reached for comment', 'is guilty and everyone knows it']
  ].forEach(function(r) {
    setTimeout(function() {
      htmlreplace(r[0], r[1], document.body)
    }, 1);
  });
})();
