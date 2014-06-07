// ==UserScript==
// @name           cleanGlobo
// @namespace      http://dbb.9hells.org
// @description    limpa pagina do globo
// @include        http://youtu.be/*
// @include        http://oglobo.globo.com/*
// ==/UserScript==

(function() {
	function hide(id) {
		e = document.getElementById(id);
		if (e) e.style.display = "none";
	}
	function hide2(texto) {
		l = document.evaluate("//a[contains(.,'"+texto+"')]/../..", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i=0; i<l.snapshotLength; i++) {
			e = l.snapshotItem(i);
			if (e) e.style.display = "none";
		}
	}
	function hide3(texto) {
		l = document.evaluate("//.[@class=\""+texto+"\"]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i=0; i<l.snapshotLength; i++) {
			e = l.snapshotItem(i);
			if (e) e.style.display = "none";
		}
	}
	hide("atual");
	hide("ident");
	hide("globocom");
	hide("top");
	hide("mn2");
	hide("lta");
	hide("ltb");
	hide("bottomsearch");
	hide("footer");
	hide("ltinta");
	hide("coment");
	hide("rdpm");
	hide("mn1");
	hide("srv");
	hide("dedos");
	hide("roddedo");
	hide("linksPatGoogle");
	hide("titulo");
	hide("rcm_st");

	
	hide2("Bieber");
	hide2("Britney Spears");
	hide2("Dolabella");
	hide2("Miriam Leitão");
	hide2("Míriam Leitão");
	hide2("BBB");
	hide2("Garota Melancia");
	hide2("Orkut");
	hide2("Big Brother");
	hide2("Nardoni");	
	hide2("Madeleine");	
	hide2("Naiá");	
	hide2("paredão");	
	hide2("Susan Boyle");	
	hide2("Sarney");	
	hide2("Michael Jackson");
	hide2("Gripe");
	hide2("No Limite");
	hide2("NO LIMITE");
	hide2("Twitter");
	hide2("Passione");
	
	hide3("assine");
	hide3("box-zap-anu2");
	hide3("box-zap-anu3");

})();
