// ==UserScript==
// @name           Ilość defów
// @namespace      http://shoxteam.net
// @description    Podliczanie ilości zagród deffa we wiosce
// @include        http://pl*.plemiona.pl/game.php?*village=*&screen=overview*
// ==/UserScript==
	
function GM_wait() {

  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
    $ = unsafeWindow.jQuery;
    letsJQuery();
  }

}
function letsJQuery()
{
  if (typeof unsafeWindow == 'undefined') {
    unsafeWindow = window;
  }
	$(document).ready(function()
	{
		var table = $("#show_units>.widget_content>.vis").get(0);
		var rows = table.getElementsByTagName('tr');
		unsafeWindow.console.log("a");
		var spaceSum = 0;
		for (var j = 0; j < rows.length; j++) {
			var tokens = rows[j].textContent.replace(/^\s\s*/, '').split(" ",2);unsafeWindow.console.log(tokens);
			if (tokens[1].indexOf("Pikinierów")>-1 || tokens[1].indexOf("Mieczników")>-1 || tokens[1].indexOf("Łuczników")>-1) {
				spaceSum += parseInt(tokens[0]);
			} else if (tokens[1] == "Ciężkich") {
				spaceSum += parseInt(tokens[0]) * 6;
			}
		}
		var squads = round((spaceSum / 10000), 1);
		squads = squads / 2;
		$("#show_units>.head").get(0).innerHTML += " (" + squads + " zagród)";
	});
}
GM_wait();

function round (value, precision, mode) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philip Peterson
  // +    revised by: Onno Marsman
  // +      input by: Greenseed
  // +    revised by: T.Wild
  // +      input by: meo
  // +      input by: William
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Josep Sanz (http://www.ws3.es/)
  // +    revised by: Rafał Kukawski (http://blog.kukawski.pl/)
  // %        note 1: Great work. Ideas for improvement:
  // %        note 1:  - code more compliant with developer guidelines
  // %        note 1:  - for implementing PHP constant arguments look at
  // %        note 1:  the pathinfo() function, it offers the greatest
  // %        note 1:  flexibility & compatibility possible
  // *     example 1: round(1241757, -3);
  // *     returns 1: 1242000
  // *     example 2: round(3.6);
  // *     returns 2: 4
  // *     example 3: round(2.835, 2);
  // *     returns 3: 2.84
  // *     example 4: round(1.1749999999999, 2);
  // *     returns 4: 1.17
  // *     example 5: round(58551.799999999996, 2);
  // *     returns 5: 58551.8
  var m, f, isHalf, sgn; // helper variables
  precision |= 0; // making sure precision is integer
  m = Math.pow(10, precision);
  value *= m;
  sgn = (value > 0) | -(value < 0); // sign of the number
  isHalf = value % 1 === 0.5 * sgn;
  f = Math.floor(value);

  if (isHalf) {
    switch (mode) {
    case 'PHP_ROUND_HALF_DOWN':
      value = f + (sgn < 0); // rounds .5 toward zero
      break;
    case 'PHP_ROUND_HALF_EVEN':
      value = f + (f % 2 * sgn); // rouds .5 towards the next even integer
      break;
    case 'PHP_ROUND_HALF_ODD':
      value = f + !(f % 2); // rounds .5 towards the next odd integer
      break;
    default:
      value = f + (sgn > 0); // rounds .5 away from zero
    }
  }

  return (isHalf ? value : Math.round(value)) / m;
}