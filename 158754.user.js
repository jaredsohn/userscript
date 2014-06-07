// ==UserScript==
// @name           Da Stewie's troepen aanvrager
// @version        1.0
// @namespace      Da Stewie
// @homepage       https://userscripts.org/
// @delay 1000
// @include        *.tribalwars.nl/game.php*&screen=place*&mode=call*
// ==/UserScript==

var units = [
/* spear: */ -200,
/* sword: */ -200,
/* axe: */ 0,
/* archer: */ -200,
/* spy: */ 0,
/* light: */ 0,
/* marcher: */ 0,
/* heavy: */ 1e6,
/* ram: */ 0,
/* catapult: */ 0,
/* knight: */ 0
];

$(".call_button").click(function () {
  $(this).closest('tr').find("input").each(function (i, v) {
	  if (!/selecteren|Aanvragen/.test(this.value)) {
		var c = units[i], b = parseInt(this.value);
    	this.value = c < 0 ? Math.max(0, b + c) : Math.min(b, c);
	  }
  });
});