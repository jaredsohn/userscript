// Google Redesign
// Version 0.3
// 2006-10-07
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html/
// See http://catinon.info/projets/redesign-google/
//
// new in 0.3 :
//
// * display problems fixed
//
// ==UserScript==
// @name          Google Redesign
// @namespace     http://catinon.info/
// @description   Make Google nicer ;)
// @include       http://www.google.*/
// @include       http://*.google.*/webhp*
// @include       http://*.google.*/search?*
// ==/UserScript==

var siteRoot = 'http://catinon.info/projets/redesign-google/resources/';
var head, style;
var address = document.location.toString();

if(/.+\.google\..+\/search\?.+/.test(address))
{
	//search result page
	result();
}
else if(/^.+\.google\..+\/$/.test(address) || /webhp/.test(address))
{
	//home page
	startPage();
}


function startPage()
{
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('link');
	style.rel = 'stylesheet';
	style.type = 'text/css';
	style.href = siteRoot+'/google-0.2.2.css';
	head.appendChild(style);
	
	var spacer  = document.createElement("div");
	spacer.className = 'spacer';
	
	var bottomDiv  = document.createElement("div");
	bottomDiv.id = "bottom";
	var bottomDivL  = document.createElement("div");
	bottomDivL.className = 'left';
	var bottomDivR  = document.createElement("div");
	bottomDivR.className = 'right';
	
	var pubLinks = document.evaluate('//center/font[last()]//a', document, null, XPathResult.ANY_TYPE, null);
	tmp = pubLinks.iterateNext();
	while (tmp) {
		bottomDivL.appendChild(document.importNode(tmp, true));
		tmp = pubLinks.iterateNext();
	}
	
	var topLinks = document.evaluate('//center/div//a', document, null, XPathResult.ANY_TYPE, null);
	tmp = topLinks.iterateNext();
	while (tmp) {
		bottomDivR.appendChild(document.importNode(tmp, true));
		tmp = topLinks.iterateNext();
	}
	
	
	var optionsP = document.createElement("p");
	optionsP.id = "options";
	
	var prefLinks = document.evaluate('//center//font[@size="-2"]/a', document, null, XPathResult.ANY_TYPE, null);
	tmp = prefLinks.iterateNext();
	while (tmp) {
		optionsP.appendChild(document.importNode(tmp, true));
		tmp = prefLinks.iterateNext();
	}
	
	
	var pBottom = document.evaluate('//center/p', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	var form = document.evaluate('//center/form', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	var center = document.getElementsByTagName('center')[0];
	
	
	bottomDiv.appendChild(bottomDivL);
	bottomDiv.appendChild(bottomDivR);
	bottomDiv.appendChild(spacer);
	
	
	center.insertBefore(bottomDiv, pBottom);
	center.insertBefore(optionsP, form.nextSibling);
	
	
	//replace Google head link table
	var font = document.evaluate('//center/form/table[1]//font', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	var newPlace = document.evaluate('//center/form/table[2]/tbody/tr[1]/td[2]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	var insBefore = document.evaluate('//center/form/table[2]/tbody/tr[1]/td[2]/input[1]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	var div = document.createElement('div');
	div.id = 'nav';
	div.appendChild(font);
	newPlace.insertBefore(div, insBefore);
	
	//remove unwanted elements
	var rem = document.evaluate('//center/form/table[1]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	rem.parentNode.removeChild(rem);
	var rem = document.evaluate('//center/font[last()]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	rem.parentNode.removeChild(rem);
	rem = document.evaluate('//center/div', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	rem.parentNode.removeChild(rem);
	rem = document.evaluate('//center//font[@size="-2"]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	rem.parentNode.removeChild(rem);
	rem = document.evaluate('//br', document, null, XPathResult.ANY_TYPE, null)
	tmp = rem.iterateNext();
	while (tmp) {
		tmp.parentNode.removeChild(tmp);
		rem = document.evaluate('//br', document, null, XPathResult.ANY_TYPE, null)
		tmp = rem.iterateNext();
	}
}

function result()
{
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('link');
	style.rel = 'stylesheet';
	style.type = 'text/css';
	style.href = siteRoot+'/google-results.css';
	head.appendChild(style);

	var head = document.evaluate('//body/table[1]//tr', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	head.id = 'head';

	var headLinks = document.evaluate('//body/table[1]//table[1]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	headLinks.id = 'headLinks';

	var searchInput = document.evaluate('//body/table[1]//table[1]//tr[2]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	searchInput.id = 'searchInput';

	var headTable = document.evaluate('//body/table[2]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	headTable.id = 'headTable';

	head.appendChild(td);
	
	td  = document.createElement("td");
	var inputs = document.evaluate('//tr[@id="searchInput"]//input', document, null, XPathResult.ANY_TYPE, null);
	tmp = inputs.iterateNext();
	while (tmp) {
		td.appendChild(document.importNode(tmp, true));
		tmp = inputs.iterateNext();
	}
	searchInput.replaceChild(td, searchInput.firstChild);

}
