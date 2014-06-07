// ==UserScript==
// @name	Local Load Extended
// @description	Provides bandwidth saving and faster page load functions to Firefox users
// @author	Miko Labalan (skycursor)
// @version	0.2.2
// @include	*
// ==/UserScript==

(function(code){
	return code;
})((function() {
	var scrp = document.getElementsByTagName("script");
	var change = function(ax,bx,cx,dx) {
		var new_scrp = document.createElement("script");
		new_scrp.setAttribute("src","resource://localload/"+bx+cx+dx);
		new_scrp.setAttribute("data-replaced","true");
		new_scrp.setAttribute("data-version",cx.replace(/\//g,''));
		new_scrp.setAttribute("data-script",bx);
		new_scrp.setAttribute("async","true");
		ax.parentNode.replaceChild(new_scrp,ax);
	};
	var fix = function(ax,bx) {
		var new_scrp = document.createElement("script");
		if (bx==true) { new_scrp.setAttribute("src",ax.getAttribute("src")); }
		else { new_scrp.innerHTML = ax.innerHTML; }
		new_scrp.setAttribute("type","text/javascript");
		ax.parentNode.replaceChild(new_scrp,ax);
	};
	if (/Firefox/i.test(navigator.userAgent)) {
		var ver = [[/1.1.1/, /1.2.0/, /1.2.3/, /1.3.0/, /1.3.1/, /1.3.2/, /1.4.0/, /1.4.1/, /1.4.3/, /1.5.0/, /1.5.1/, /1.6.0/],
			  [/3.0/, /3.1.0/],
			  [/1.2.3/, /1.2.6/, /1.3.0/, /1.3.1/, /1.3.2/, /1.4.0/, /1.4.1/, /1.4.2/, /1.4.3/, /1.4.4/, /1.5.0/, /1.5.1/, /1.5.2/, /1.6.0/, /1.6.1/],
			  [/1.5.2/, /1.5.3/, /1.6/, /1.7.0/, /1.7.1/, /1.7.2/, /1.7.3/, /1.8.0/, /1.8.1/, /1.8.2/, /1.8.4/, /1.8.5/, /1.8.6/, /1.8.7/, /1.8.8/, /1.8.9/, /1.8.10/, /1.8.11/, /1.8.12/, /1.8.13/],
			  [/1.1.1/, /1.1.2/, /1.2.1/, /1.2.2/, /1.2.3/, /1.2.4/, /1.2.5/, /1.3.0/, /1.3.1/, /1.3.2/],
			  [/1.6.0.2/, /1.6.0.3/, /1.6.1.0/, /1.7.0.0/],
			  [/1.8.1/, /1.8.2/, /1.8.3/],
			  [/2.1/, /2.2/],
			  [/2.6.0/, /2.7.0/, /2.8.0r4/, /2.8.1/, /2.8.2/, /3.3.0/],
			  [/1.0.0/, /1.0.1/, /1.0.2/, /1.0.3/, /1.0.4/, /1.0.5/, /1.0.6/, /1.0.9/, /1.0.10/, /1.0.11/, /1.0.12/, /1.0.13/, /1.0.14/, /1.0.15/, /1.0.16/, /1.0.17/, /1.0.18/, /1.0.19/]];
		for ( var i = 0; i < scrp.length; i++ ) {
			var src = scrp[i].getAttribute("src");
			var dat = [["dojo","dojo.xd.js.uncompressed.js",(/dojo.js/.test(src) || /dojo.xd.js/.test(src))],
				  ["ext-core","ext-core-debug.js",(/ext-core/.test(src))],
				  ["jquery","jquery.js",(/jquery/.test(src) && !(/jqueryui/.test(src) || /jquery-ui/.test(src)))],
				  ["jqueryui","jquery-ui.js",((/jqueryui/.test(src) || /jquery-ui/.test(src)) && !(/i18n/.test(src)))],
				  ["mootools","mootools.js",(/mootools/.test(src))],
				  ["prototype","prototype.js",(/prototype/.test(src))],
				  ["scriptaculous","scriptaculous.js",(/scriptaculous/.test(src))],
				  ["swfobject","swfobject_src.js",(/swfobject/.test(src))],
				  ["yui","yuiloader.js",(/yuiloader/.test(src))],
				  ["webfont","webfont_debug.js",(/webfont/.test(src))]];
			for ( var j = 0; j < dat.length; j++ ) {
				if (dat[j][2]) {
					for ( var k = 0; k < ver[j].length; k++ ) {
						if (ver[j][k].test(src)) {
							change(scrp[i],dat[j][0],ver[j][k].toString(),dat[j][1]);
							break;
						}
					}
				}
			}
			// imageshack fix
			if (/imageshack/.test(location.href) && /core-1.0.1.min.js/.test(src)) {
				fix(scrp[i], true);
			}
			// kaskus fix
			if (/kaskus/.test(location.href) && /jquery.cluetip.js/.test(src)) {
				fix(scrp[i], true);
				if (typeof scrp[i+1] != undefined) {
					fix(scrp[i+1], false);
				}
			}
		}
	}
}))();