// ==UserScript==
// @name           Digg Filter
// @namespace      http://www.outshine.com/
// @description    On Digg, removes articles with keywords you dislike.
// @include        *digg.com/*
// ==/UserScript==

/*
Script by Tony Boyd, with thanks to dakyd.
Authored on 2007-10-14.
Updated on 2008-09-27.
Version: 1.0.3
*/
function handleSubmit(e) {
	GM_setValue('diggFilter', document.getElementById('filter').value);
	e.preventDefault();
	alert('Your filters have been saved.  Reload the page to see the effect.');
	return false;
}
divElement = document.createElement('div');
divElement.setAttribute('id', 'logo');
divElement.setAttribute('style', 'float: left; position: relative;');
formElement = document.createElement('form');
formElement.setAttribute('style', 'display: inline;');
formElement.method = 'GET';
formElement.action = '/';
formElement.id = 'diggFilter';
formInput = document.createElement('input');
formInput.type = 'text';
formInput.size = '15';
formInput.name = 'filter';
formInput.id = 'filter';
var tempFilter = GM_getValue('diggFilter');
if ((tempFilter !== "") && (tempFilter !== null) && (tempFilter !== false) && (typeof tempFilter != 'undefined')) {
	formInput.value = tempFilter;
}
else {
	formInput.value = '';
}
formSubmit = document.createElement('input');
formSubmit.type = 'submit';
formSubmit.value = 'filter';
formInput.setAttribute('style', 'margin-top: 10px; margin-left: 20px;');
formSubmit.setAttribute('style', 'margin-top: 10px;');
formElement.appendChild(formInput);
formElement.appendChild(formSubmit);
divElement.appendChild(document.getElementById('h').getElementsByTagName('h1')[0]);
divElement.appendChild(formElement);
divElement.getElementsByTagName('h1')[0].setAttribute('style', 'display: inline;');
headerLogo = document.getElementById('h');
headerLogo.insertBefore(divElement, headerLogo.childNodes[0]);
filterForm = document.getElementById('diggFilter');
filterForm.addEventListener('submit', handleSubmit, true);

var allDivs, thisDiv;
allDivs = document.evaluate(
	"//div[@class='news-summary']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	filterWords = GM_getValue('diggFilter');
	if ((filterWords !== "") && (filterWords !== null) && (filterWords !== false) && (typeof filterWords != 'undefined')) {
		var pattern1 = new RegExp('^ *$', 'i');
		if (!pattern1.test(filterWords)) {
			filterArray = filterWords.split(/, */);
			for (var x = 0; x < filterArray.length; x++) {
				var pattern2 = new RegExp(filterArray[x], 'i');
				if (pattern2.test(thisDiv.innerHTML)) {
					thisDiv.parentNode.removeChild(thisDiv);
					break;
				}
			}
		}
	}
}
var allDivs, thisDiv;
allDivs = document.evaluate(
	"//div[@class='news-summary v']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	filterWords = GM_getValue('diggFilter');
	if ((filterWords !== "") && (filterWords !== null) && (filterWords !== false) && (typeof filterWords != 'undefined')) {
		var pattern1 = new RegExp('^ *$', 'i');
		if (!pattern1.test(filterWords)) {
			filterArray = filterWords.split(/, */);
			for (var x = 0; x < filterArray.length; x++) {
				var pattern2 = new RegExp(filterArray[x], 'i');
				if (pattern2.test(thisDiv.innerHTML)) {
					thisDiv.parentNode.removeChild(thisDiv);
					break;
				}
			}
		}
	}
}
