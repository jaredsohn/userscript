// ==UserScript==
// @name           Farmassi
// ==/UserScript==

document.onkeydown = function(event) {javascript:/*author: patricier, name: FA-Assistent, version:1.0.0*/(function (){$("a.farm_icon_c, a.farm_icon_b, a.farm_icon_a").click(function() {$(this).closest("tr").remove();});})();
  if (event.keyCode == 13) {
  }
}