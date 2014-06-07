// ==UserScript==
// @name           Interstitial Remover
// @namespace      http://userscripts.org/scripts/show/101849
// @description    Remove o Interstitial dos links em comunidades no Orkut. (links abrem direto)
// @author         Ravan (uid=15743442514574636747)
// @version        0.1
// @include        http*://*.orkut.*/CommMsgs?cmm=*
// @include        http*://*.orkut.*/Community?cmm=*
// ==/UserScript==

Array.filter((this.orkutFrame || window).document.getElementsByTagName("a"),
	function(h) { 
		return /orkut(.*)\/Interstitial/(h)
	}).forEach(function(a) { 
		return a.href = decodeURIComponent(a.href.match(/u=(.*)&t=/i)[1]);
	})
