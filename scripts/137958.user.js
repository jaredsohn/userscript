// ==UserScript==
// @name	NoJS NoCSS
// @include	*
// @version	0.01
// ==/UserScript==

(function () {
	var html = document.documentElement;
	var parents = html.childNodes;
	for (var i = 0; i < parents.length; i++){
		if (parents[i].nodeType == 1){
			var noscripts = parents[i].getElementsByTagName('noscript');
			var links = parents[i].getElementsByTagName('link');
			var styles = parents[i].getElementsByTagName('style');
			var scripts = parents[i].getElementsByTagName('script');
			for (var j = noscripts.length - 1; j >= 0; j--){
				noscripts[j].innerHTML = "";
			}
			for (var j = links.length - 1; j >= 0; j--){
				var ns = document.createElement('noscript');
				var pLn = links[j].parentNode;
				pLn.replaceChild(ns, links[j]);
			}
			for (var j = styles.length - 1; j >= 0; j--){
				var ns = document.createElement('noscript');
				var pSt = styles[j].parentNode;
				styles[j].innerHTML = "";
				pSt.replaceChild(ns, styles[j]);
			}
			for (var j = scripts.length - 1; j >= 0; j--){
				var ns = document.createElement('noscript');
				var pSc = scripts[j].parentNode;
				pSc.replaceChild(ns, scripts[j]);
			}
		}
		if (parents[i].childNodes){
			var childs = parents[i].childNodes;
			for (var j = 0; j < childs.length ; j++){
				if (childs[j].nodeType == 1){
					childs[j].setAttribute("style", "");
				}
			}
		}
	}
})();
