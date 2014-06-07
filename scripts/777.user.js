// ==UserScript==
// @name           DumbTxt
// @author         Michael Kennan
// @namespace      http://mushika.blogspot.com/
// @description    Kills 'Itellitxt' context ads
// @include        *.tomshardware.com/*
// @include        *.experts-exchange.com/*
// ==/UserScript==

/** licenced under a Creative Commons Attribution-NonCommercial-ShareAlike 2.0
 ** http://creativecommons.org/licenses/by-nc-sa/2.0/
 **
 **		Michael Kennan
 **		http://mushika.blogspot.com
 **
 ** This is a greasemonkey script, for use with the Firefox extension Greasemonkey.
 ** More info: http://greasemonkey.mozdev.org/
 **/

(function () {

	function zap() {
		s = document.getElementsByTagName("script");
		for (var i = 0; i < s.length; i++) {
			if ((s[i].src.indexOf("intellitxt") != -1) || (s[i].src.indexOf("vpptechnologies") != -1) || (s[i].src.indexOf("tribalfusion") != -1)) {
				s[i].parentNode.removeChild(s[i]);
			}
		}
		a = document.getElementsByTagName("a");
		for (var i = 0; i < a.length; i++) {
			if (a[i].className == "iAs") {
				a[i].href = null;
				a[i].onclick = null;
				a[i].onmouseover = null;
				a[i].onmouseout = null;
				a[i].onmousemove = null;
				a[i].oncontextmenu = null;
				a[i].style.cursor = "text";
			}
		}
	}

	function dt_addCSS(css) {
		style = document.createElement("style");
		style.type = "text/css";
		style.innerHTML = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	function kill_intellitxt() {
		zap();
		dt_addCSS("a.iAs { text-decoration: none !important; }");
		dt_addCSS("a.iAs { border: none !important; }");
		if (document.location.href.indexOf("experts") != -1) {
			dt_addCSS("a.iAs { color: #115e94 !important; }");
		}
		else {
			dt_addCSS("a.iAs { color: black !important; }");
		}
	}

	// they delay execution, I delay execution
	window.setTimeout(kill_intellitxt,500);
	window.setTimeout(kill_intellitxt,1000);
	window.setTimeout(kill_intellitxt,2000);
	window.setTimeout(kill_intellitxt,3000);
	window.setTimeout(kill_intellitxt,4000);
	window.setTimeout(kill_intellitxt,5000);
})();