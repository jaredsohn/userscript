// ==UserScript==
// @name           De Standaard verantwoord interessant
// @namespace      DSInteressant
// @description    Geen discussies, geen zijbalk
// @include        http://standaard.be/*
// @include        http://www.standaard.be/*
// @include        http://destandaard.be/*
// @include        http://www.destandaard.be/*
// ==/UserScript==

var DSInteressant = {
	addStyle: function(styleContent) {
		var style = document.createElement('style');
		style.type = 'text/css';
		style.textContent = styleContent;
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	
	,clean: function() {
		// Commentaren
		var style = ".article-detail > .comments { display: none; } ";
		// Rechterzijbalk (artikels)
		style += "#content > .span-2.last { display: none; } ";
		// Rechterzijbalk (startpagina)
		style += "#content > .span-5 > .span-2.last { display: none; } ";
		// "Article actions"
		style += ".article-actions { display: none; } ";
		// "Niet te missen"
		style += "#ntm { display: none; } ";
		this.addStyle(style);
		
		// Hoofdtekst naar drie kolommen
		var articleText = document.getElementById('continued');
		if (articleText) {
			articleText.setAttribute('class', 'span-3 fill last');
		}
	}
}

DSInteressant.clean();