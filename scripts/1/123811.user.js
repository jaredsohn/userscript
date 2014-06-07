// ==UserScript==
// @name  Floating Search Feature
// @description   Makes the Wikipedia search feature float at a fixed position and not scroll with the rest of the page. The position can be customized with the "left:" and "top:" parameters (which define in pixels the distance to the left and top border, respectively). Works for any Mediawiki-powered wiki page.
// @include   http://*.wikipedia.org/*
// @include   https://*.wikipedia.org/*
// @include   http://rationalwiki.org/*
// ==/UserScript==
var rect = document.createElement('div');
	rect.style.position = 'fixed';
	rect.style.zIndex = '1'
	rect.style.width = '99%';
	rect.style.backgroundColor = 'white';
	rect.style.height = '37px';
	rect.style.bottom = '0px';
	rect.style.border = '5px outset green'
	document.documentElement.appendChild(rect);
var elem = document.getElementById("simpleSearch");
	elem.style.position = 'fixed';
	elem.style.bottom = '5px';
	elem.style.left = '5px';
	elem.style.display = 'block';
	elem.style.zIndex='2';
	elem.style.height = '35px';
	elem.style.width = '154px'
var styleEl = document.createElement('style');
	styleEl.type = 'text/css';
	styleEl.innerHTML = 'td.mbox-image {    display: none;}table.toc {    position: fixed;    z-index: 3;    bottom:5px;    left: 160px;    border: 0px; width: auto;    border-bottom: 1px SOLID #CCC;    border-left: 1px SOLID #CCC;}table.toc tbody tr td ul {    overflow-y: auto; overflow-x: auto; max-height: 500px;}body {    overflow-x: hidden;}div.suggestions-results { position:fixed; bottom:41px;}table.vertical-navbox.nowraplinks{position:fixed; bottom:41px; left:190px; display:none; zIndex:2; overflowY:auto;}';
	document.documentElement.appendChild(styleEl);
var sideBar = document.getElementById("mw-panel");
	sideBar.style.position = 'fixed';
function getElementsByClass(searchClass,tag,node) {
	var classElements = new Array();
	if ( node == null ) 
		node = document;
	if ( tag == null )
		tag = '*';
var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}
var sdTOC = getElementsByClass("vertical-navbox nowraplinks","table");
var sdTOC1 = sdTOC.slice(0,1);
function funExists(Exists)
{
	if (Exists.length = 1)
	{
		var sExists = document.createElement('a');
			sExists.style.position = 'fixed';
			sExists.style.bottom = '4px';
			sExists.style.left = '270px';
			sExists.style.display = 'block';
			sExists.style.zIndex='2';
			sExists.style.border = '1px solid black';
			sExists.href = 'javascript:sdShowHide()';
			sExists.style.height = '37px';
			sExists.style.textAlign = 'center';
			sExists.style.verticalAlign = 'middle';
			sExists.innerHTML = 'Show/Hide Series Contents';
			document.documentElement.appendChild(sExists);
	}
	else if (Exists.length = 2)
	{
		var sExists1 = document.createElement('a');
			sExists1.style.position = 'fixed';
			sExists1.style.bottom = '4px';
			sExists1.style.left = '270px';
			sExists1.style.display = 'block';
			sExists1.style.zIndex='2';
			sExists1.style.border = '1px solid black';
			sExists1.href = 'javascript:sdShowHide()';
			sExists1.style.height = '37px';
			sExists1.style.textAlign = 'center';
			sExists1.style.verticalAlign = 'middle';
			sExists1.innerHTML = 'Show/Hide Series Contents';
			document.documentElement.appendChild(sExists1);
		var sExists2 = document.createElement('a');
			sExists2.style.position = 'fixed';
			sExists2.style.bottom = '4px';
			sExists2.style.left = '270px';
			sExists2.style.display = 'block';
			sExists2.style.zIndex='2';
			sExists2.style.border = '1px solid black';
			sExists2.href = 'javascript:sdShowHide()';
			sExists2.style.height = '37px';
			sExists2.style.textAlign = 'center';
			sExists2.style.verticalAlign = 'middle';
			sExists2.innerHTML = 'Show/Hide Series Contents 2';
			document.documentElement.appendChild(sExists2);
	}
}
var sdExists = funExists(sdTOC)
function sdShowHide()
{

}