// ==UserScript==
// @name           Multi-column (digg)
// @namespace      yqbd.multicolumn
// @description    Multi-column view for digg.
// @include        http://*.digg.com/*
// ==/UserScript==


(function multicolumndigg() {

	//adding style - http://diveintogreasemonkey.org/patterns/add-css.html	
    var head, style;
	
	head = document.getElementsByTagName('head')[0];
	
	style = document.createElement('style');
	style.type = 'text/css';
	style.id = "divcolcss"
	style.innerHTML = "#divcol { -moz-column-width:30em; -moz-column-gap:1em; background-color: #ffffff; padding: 1em; text-align: left; margin-top: 1em; } ";
	//style.innerHTML = "#divcol { -moz-column-count:3; -moz-column-gap:1em; background-color: #ffffff; padding: 1em; text-align: left; margin-top: 1em; } ";
	head.appendChild(style);

	
	var diggdivcontainer = document.getElementById('container');
	
	var thebody, thediv;
	
	thebody = document.getElementsByTagName('body')[0];
	
	thediv = document.createElement('div');
	thediv.type = 'text/css';
	thediv.id = "divcol";
	
	var diggdivenclosures;
	var diggdivpages;
	
	for (var i=0; i<15; i++)
	{
		diggdivenclosures = document.getElementById('enclosure'+i);
		if (diggdivenclosures != null)
		{
			thediv.appendChild(diggdivenclosures.cloneNode(true));
			diggdivpages = diggdivenclosures.nextSibling;
		}
	}
	
	thediv.appendChild(diggdivpages.cloneNode(true));
	
	thebody.insertBefore(thediv, diggdivcontainer);

	
})();

