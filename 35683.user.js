// ==UserScript==
// @name			ukiwikiPath
// @namespace		http://daisukeyamanaka.blogspot.com/
// @description		create Wikipedia browsing history
// @include			http://*.wikipedia.org/wiki/*
// ==/UserScript==
//
// Auther	86
// version	0.6.1 2009-01-20
// 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "JUMPer", and click Uninstall.
//
// --------------------------------------------------------------------
//

//Get currentPage info.
var curTitle = window.document.title.slice(0, window.document.title.indexOf(" - ", 0));
var curUrl = window.document.URL;

//Save to GM Storage
if (!GM_getValue('preUrl')) {
	GM_setValue('preUrl', curUrl);
	GM_setValue('preLink', '<a href="' + curUrl + '">' + curTitle + '</a><span>></span>');
	GM_setValue('historyPath', '');
	var historyPath = GM_getValue('historyPath');
} else {
	var historyPath = GM_getValue('historyPath');
	//Compare previousURL to currentURL
	if (GM_getValue('preUrl') != curUrl) {
		historyPath += GM_getValue('preLink');
		GM_setValue('preUrl', curUrl);
		GM_setValue('preLink', '<a href="' + curUrl + '">' + curTitle + '</a><span>></span>');
		GM_setValue('historyPath', historyPath);
	}
}

//Create ukiwikipath Div
var bodyDiv, pathDiv, objBody;
bodyDiv = document.createElement("div");
bodyDiv.setAttribute('id', 'ukiwikipath');

//Create historypath Div
pathDiv = document.createElement("div");
pathDiv.setAttribute('id', 'historypath');
pathDiv.innerHTML = historyPath + "<span>" + curTitle + "</span>";

//Create Historypathremover Div
var objRemover = document.createElement("div");
objRemover.setAttribute('id', 'historypathremover');
var objA = document.createElement("a");
objA.innerHTML = " X ";
objA.href = '#';
var removeHistoryPath = function() {
	var element = document.getElementById('ukiwikipath');
	while (element.firstChild) {element.removeChild(element.firstChild);};
	GM_setValue('preUrl', '');
	GM_setValue('preLink', '');
	GM_setValue('historyPath', '');	
}
objA.addEventListener('click', removeHistoryPath, false);

//Append Divs
objBody = document.getElementsByTagName("body")[0];
objBody.appendChild(bodyDiv);
bodyDiv.appendChild(pathDiv);
bodyDiv.appendChild(objRemover);
objRemover.appendChild(objA);


//Create Clear history command
var clearHistory = function () {
	GM_setValue('preUrl', '');
	GM_setValue('preLink', '');
	GM_setValue('historyPath', '');
}
GM_registerMenuCommand('ukiwikiPath - Clear history', clearHistory);

//function Add Code header
function addCodeHeader(element, type, code) {
	var objHead, objElement;
	objHead = document.getElementsByTagName('head')[0];
	if (!objHead) { return; }
	objElement = document.createElement(element);
	objElement.type = type;
	objElement.innerHTML = code;
	objHead.appendChild(objElement);	
}

//Append CSS
addCodeHeader('style', 'text/css', 'div#ukiwikipath {margin:1px 2px;position: fixed;bottom: 0px;left: 0px;font-size: 11px;background: #CCCCCC;color: #000;border: 1px solid #fff;z-index: 256;text-align: left;font-weight: normal;line-height: 1.2em;font-family: verdana;}div#historypath {margin: 3px -21.5px 3px 3px;padding: 0px 22.5px 0px 0px;max-width:97%;float:left;}div#historypath a {padding: 0px 1px;}div#historypath span {padding: 0px 1px;}div#historypath a:link {color: #000;}div#historypath a:visited {color: #000;}div#historypath a:hover {color: 000;}div#historypath a:active {color: #000;}div#historypathremover {margin: 3px 3px 3px 1.5px;width: 21px;float:left;text-align: center;font-weight: bold;background: #dddddd;border: 1px solid #666666;}div#historypathremover a {padding: 1px 5px;}div#historypathremover a:link {color: #000;}div#historypathremover a:visited {color: #000;}div#historypathremover a:hover {color: 000;}div#historypathremover a:active {color: #000;}');