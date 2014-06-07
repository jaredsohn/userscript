// ==UserScript==
// @name           FormatGaia v1
// @description    Do not download.
// @include        http://www.gaiaonline.com/*
// ==/UserScript==

// Define Function
function getID(idname) {
	return document.getElementById(idname);
}

// Define Elements
footer = document.getElementById('gaia_footer');

// Remove Elements
footer.parentNode.removeChild(footer);

// Resize Elements
resizetowidth = 960;
document.getElementById('guilds-topic-list-table').width = resizetowidth;

if (getID('content-padding') != null)
	elementname = 'content-padding';
else elementname = 'content';

tables = getID(elementname).getElementsByTagName('table');
for (i=0; i < tables.length; i++) {
	if ((tables[i].parentNode.id == elementname) || (tables[i].parentNode.tagname == 'form')) {
		tables[i].width = resizetowidth;
	}
}