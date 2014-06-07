// ==UserScript==
// @name          Tabulas Edit Link
// @namespace     http://tabulas.com/~dodozhang21
// @description   Adds edit link next to the permlink. Must put in template a link to the edit i.e. <a href="<!--ENTRY['PERMALINK']-->#edit">edit</a>
// @include       http://*.tabulas.com/~dodozhang21
// ==/UserScript==

(function(){
	var l = document.getElementsByTagName("a");
	var uim = "";
	var cand = null;
	var i = 0;
	var results = null;
	var newUrl = "";
	for (i = 0; i<l.length; i++) {
		cand = l[i];
		if (uim = cand.getAttribute('href')) {
			if(uim.search("#edit") >= 0) {
				results = uim.match(/@([0-9]+)/);
				newUrl = results[0].substring(1);
				cand.setAttribute('href', "http://my.tabulas.com/index.php?edit="+newUrl);
			}
		}
	}
})();