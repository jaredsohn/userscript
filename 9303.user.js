// ==UserScript==
// @name           [AnãoManco] Willmutt Trotes Download Links Replacement
// @namespace      AnaoManco.Willmutt
// @description    UserScript para substituir os links JS do site do Willmutt para links HTTP direto.
// @include        http://www.willmutt.com.br/
// ==/UserScript==

new function() {
	var a = document.getElementsByTagName("a");
	
	for (var iA = 0; iA < a.length; iA++) {
		if (a[iA].href.replace(/\s+/gi, " ").replace(/^\s+|\s+$/gi, "").indexOf("baixar('baixar.php?src=") > -1) {
			a[iA].href   = a[iA].href.replace(/\s+/gi, " ").replace(/^\s+|\s+$/gi, "").split("=")[1].replace("');", "");
			a[iA].target = "_blank";
		} else if (a[iA].href.replace(/\s+/gi, " ").replace(/^\s+|\s+$/gi, "").indexOf("baixar('http") > -1) {
			a[iA].href   = a[iA].href.replace(/\s+/gi, " ").replace(/^\s+|\s+$/gi, "").split("://")[1].replace("');", "");
			a[iA].target = "_blank";
		}
		
		a[iA].href = a[iA].href.replace("http://www.willmutt.com.br/s12.quicksharing.com", "http://s12.quicksharing.com");
	}
}