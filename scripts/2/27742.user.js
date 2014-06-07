// ==UserScript==
// @name           Enturbulation - Breaking News
// @namespace      forums.enturbulation.org/murx
// @description    Adds a new Breaking News button - instead of the FAQ (who reads them anyways?) Ordered by "thread creation date"
// @include        http://forums.enturbulation.org/*
// ==/UserScript==

(function()
{
	var faq = document.evaluate("//td[contains(a, 'FAQ')]",
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null);

	a  = 'http://forums.enturbulation.org/';
    b  = '?sort=dateline&order=desc&daysprune=-1';
    
	
	faq.singleNodeValue.innerHTML = 'BN: '+
									'<a href="'+a+'15-media/'+b+'">Media</a> | ' + 
									'<a href="'+a+'123-leaks-legal/'+b+'">Leaks</a> | ' + 
									'<a href="'+a+'121-raids/'+b+'">Raids</a> | ' + 
									'<a href="'+a+'122-fair-game/'+b+'">Fairgame</a>'; 
		

})();
