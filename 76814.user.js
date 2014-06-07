// ==UserScript==
// @name           stadtplan wien - don't waste space
// @namespace      http://mereandor.soup.io
// @description    Removes copyright notice, the common menu and some other items that take vertical space
// @include        http://www.wien.gv.at/stadtplanbeta/
// @include        http://www.wien.gv.at/stadtplan/
// ==/UserScript==

function removeElement(elem) {
	elem.parentNode.removeChild(elem);
}

function unwrapFirstChild(elem) {
	elem.parentNode.replaceChild(elem.firstChild, elem);
}

function $(id) {
	return document.getElementById(id);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


(function() {
	removeElement($('vie_footer'));
	removeElement($('vie_loggedin'));
	removeElement($('vie_header'));
	removeElement($('gis_viebreadcrumbs'));
	unwrapFirstChild($('viennaGisBody').childNodes[1]);
	
	addGlobalStyle('\
		#vie_col3_content { padding:0px; }\
		.vie-page { padding-bottom:0px; }\
		.vie-page #vie_col3_content h1 { font-size:1em; line-height:100%; }\
		#viennaGisForm .gis-navigation { margin-top:0; }\
	');
})();