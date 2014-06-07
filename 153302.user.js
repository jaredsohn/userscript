// ==UserScript==
// @name			NeoGAF - Change AusGAF title
// @namespace		http://neogaf.com/forum
// @description		Change AusGAF title to something more appropriate
// @include			http://www.neogaf.com/forum/*
// @include			http://neogaf.com/forum/*
// @version			0.0.1
// ==/UserScript==
							
console.log("* NeoGAF - Change AusGAF title");

if ((document.title.indexOf('AusGAF') > -1) && (document.title.indexOf(' - ') > -1))
{
	var pageTitle = document.title;
	var titleStart = pageTitle.substring(0, pageTitle.indexOf(' - '));
	var titleEnd = pageTitle.substring(pageTitle.indexOf(' - Page '));
	console.log("  - NeoGAF - Change AusGAF title: Changing title to " + titleStart + titleEnd);
	document.title = titleStart + titleEnd;
}
else
{
	console.log("  - NeoGAF - Change AusGAF title: Not AusGAF or title doesn't need to change");
}

console.log("* NeoGAF - Change AusGAF title: Finished");