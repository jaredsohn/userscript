// version 1.0.0 
// 13/10/2010
// ==UserScript==
// @name          Vendetta.PLUS.Piu-Meno
// @description	  sostituisce << e >> con - e +
// @author        Mozzicone[ITA]
// @include       http://www.vendetta-plus.com*
// ==/UserScript==
//

(function() {
		
		document.body.innerHTML = document.body.innerHTML.replace("«", "-");
		document.body.innerHTML = document.body.innerHTML.replace("»", "+");
})();