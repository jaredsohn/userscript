// ==UserScript==
// @name n0i.net IRC logs uncensor
// @description	Removes n0i.net IRC logs censorship
// @namespace	http://people.n0i.net/altblue/mozilla/gm_scripts/irclogs.uncensor
// @author	Marius Feraru http://www.altblue.com/
// @include	http://irc.n0i.net/*
// @version	0.1
// ==/UserScript==

/*
	This is a ripp-off from "Geocaching Decrypt" by "Paul Downey"
*/
function rot13(src) {
	var dst = new String('');
	var b;
	var t = new String('');
	var clear = 0;
	for (var ctr = 0; ctr < src.length; ctr++) {
		b = src.charCodeAt(ctr);
		if (60 == b || 91 == b) { 
			clear  = 1;
		}
		if (!clear) {
			if (((b>64) && (b<78)) || ((b>96) && (b<110))) { 
				b = b + 13;
			} else { 
				if (((b>77) && (b<91)) || ((b>109) && (b<123))) {
					b = b - 13;
				}
			}
		}
		t = String.fromCharCode(b);
		dst = dst.concat(t);
		if (b == 62 || b == 93) {
			clear = 0;
		}
	}
	return dst;
};

(
	function() {
		var spans = document.body.getElementsByTagName('span');
		var hasClassName = /(?:^|\s)censored(?:\s|$)/;
		if (spans && spans.length > 0) {
			for (var j=0; j < spans.length; j++) {
				if (spans[j].className && spans[j].className.match(hasClassName)) {
					spans[j].innerHTML = rot13(spans[j].innerHTML);
					spans[j].className = spans[j].className.replace(hasClassName, ' ');
				}
			}
		}
	}
)();
