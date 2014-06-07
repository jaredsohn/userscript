// ==UserScript== 
// @name Nar.TV UTF-8 Fix
// @description Fix UTF-8 problem in TV Program names on Nar.TV aka Yildiz.TV
// @include http://*.nar.tv/*
// @include http://nar.tv/*
// @include http://*.yildiz.tv/*
// @include http://yildiz.tv/*
// @version     1.0
// @licence     GNU General Public License version 3 or any later version; https://www.gnu.org/licenses/gpl-3.0.html
// ==/UserScript==

div_elems = document.getElementsByTagName('div');
if (div_elems.length) {
	for (var i = 0; i < div_elems.length; i++) {
		if ( (div_elems[i].getAttribute('class') == 'progname') || (div_elems[i].getAttribute('class') == 'live_txt') ) {
			div_elems[i].innerHTML = utf8_decode(div_elems[i].innerHTML);
		}
	}
}

function utf8_decode (str_data) {
  // http://kevin.vanzonneveld.net
  // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // +      input by: Aman Gupta
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Norman "zEh" Fuchs
  // +   bugfixed by: hitwork
  // +   bugfixed by: Onno Marsman
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: utf8_decode('Kevin van Zonneveld');
  // *     returns 1: 'Kevin van Zonneveld'
  var tmp_arr = [],
    i = 0,
    ac = 0,
    c1 = 0,
    c2 = 0,
    c3 = 0;

  str_data += '';

  while (i < str_data.length) {
    c1 = str_data.charCodeAt(i);
    if (c1 <= 191) {
      tmp_arr[ac++] = String.fromCharCode(c1);
      i++;
    } else if (c1 >= 192 && c1 <= 223) {
      c2 = str_data.charCodeAt(i + 1);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
      i += 2;
    } else if (c1 >= 224 && c1 <= 239) { // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
      c2 = str_data.charCodeAt(i + 1);
      c3 = str_data.charCodeAt(i + 2);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    } else {
      tmp_arr[ac++] = String.fromCharCode(c1);
      i++;
	}
  }

  return tmp_arr.join('');
}
