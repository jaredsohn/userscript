// ==UserScript==
// @name           GroovesharkAdRemover
// @namespace      org.xfci.Grooveshark.Ad.Remover
// @description    Remove Grooveshark Ads/Remove os anúncios do Grooveshark
// @include        http://listen.grooveshark.com/*
// @author         Fernando X. F. Crespo
// @version        1.1
// @history        Changed setTimeout to setInterval function, added GM_registerMenuCommand for forced ad bar remove.
// ==/UserScript==

GM_registerMenuCommand( 'Remove Ad bar', fullScreen());

var myInterval = setInterval(fullScreen, 30000);

function fullScreen(){
	try {
		var c = document.getElementById("sidebar");
		if (c != null){
			var p = c.parentNode;
			p.removeChild(c);
		}
		var cw = document.getElementById("mainContentWrapper");
		if (cw != null)
		{
			cw.style.marginRight = '0px';
		}
	}
	catch(e) {
		clearInterval(myInterval);
		alert('Ocorreu um erro no script');
	}
}