
// Zoom Google
// version 0.2 BETA!
// 2005-07-08
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that makes Google more
// accessible to low-vision users.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Zoom Google", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Zoom Google
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   make Google more accessible to low-vision users
// @include       http://www.google.*/*
// @include       http://images.google.*/*
// @include       http://froogle.google.*/
// @exclude       http://news.google.*/
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2005 Mark Pilgrim

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

function addGlobalStyle(css) {
    try {
        var elmHead, elmStyle;
        elmHead = document.getElementsByTagName('head')[0];
        elmStyle = document.createElement('style');
        elmStyle.type = 'text/css';
        elmHead.appendChild(elmStyle);
        elmStyle.innerHTML = css;
    } catch (e) {
        document.styleSheets[0].cssText += css;
    }
}

/* push method for IE5 (thanks to Dean Edwards) */
if (![].push) {
    Array.prototype.push = function() {
	for (var i=0; i<arguments.length; i++) {
	    this[this.length] = arguments[i];
	}
	return this.length;
    }
}

// innerText for Mozilla (thanks to Dean Edwards) */
if (typeof document.body.innerText == 'undefined') {
    HTMLElement.prototype.__defineGetter__("innerText", function() {
	return this.textContent;
    });
    HTMLElement.prototype.__defineSetter__("innerText", function (value) {
	this.textContent = value;
    });
}

function getElementsByClassName(sTag, sClassName) {
    sClassName = sClassName.toLowerCase() + ' ';
    if (sTag == '*') {
	var arElements = document.all ? document.all : document.getElementsByTagName('*');
    }
    else {
	var arElements = document.getElementsByTagName(sTag);
    }
    var iMax = arElements.length;
    var arResults = new Array();
    for (var i = 0; i < iMax; i++) {
	var elm = arElements[i];
	var sThisClassName = elm.className;
	if (!sThisClassName) { continue; }
	sThisClassName = sThisClassName.toLowerCase() + ' ';
	if (sThisClassName.indexOf(sClassName) != -1) {
	    arResults.push(elm);
	}
    }
    return arResults;
}

function removeFontTags() {
    // remove font tags
    var arFonts = document.getElementsByTagName('font');
    for (var i = arFonts.length - 1; i >= 0; i--) {
	var elmFont = arFonts[i];
	var elmSpan = document.createElement('span');
	elmSpan.innerHTML = elmFont.innerHTML;
	elmFont.parentNode.replaceChild(elmSpan, elmFont);
    }
}

function zoomStyle() {
    addGlobalStyle('body { margin: 30px; } \n' +
'body, td { font-size: large ! important; } \n' +
'html>body, html>body td { font-size: x-large ! important; } \n' +
'body, div, td { background: navy ! important; color: white ! important; } \n' +
'a:link { background: transparent ! important; color: yellow ! important; } \n' +
'a:visited { background: transparent ! important; color: lime ! important; } \n' +
'a.fl { background: transparent ! important; color: white ! important; } \n' +
'input { font-size: large ! important; } \n' +
'html>body input { font-size: x-large ! important; } \n' +
'.g { width: auto ! important; } \n' +
'.n a, .n .i { font-size: large ! important; } \n' +
'html>body .n a, html.body .n .i { font-size: x-large ! important; } \n' +
'.j { width: auto ! important; }');
}

function accHomePage() {
    // remove personalized header, if any
    var arTable = document.getElementsByTagName('table');
    for (var i = arTable.length - 1; i >= 0; i--) {
	var elmTable = arTable[i];
	var html = elmTable.innerHTML;
	if (/\/accounts\/Logout/.test(html)) {
	    elmTable.parentNode.removeChild(elmTable);
	}
    }

    // simplify logo
    var arImages = document.getElementsByTagName('img');
    for (var i = arImages.length - 1; i >= 0; i--) {
	var elmLogo = arImages[i];
	if (elmLogo.alt) {
	    var elmTextLogo = document.createElement('h1');
	    elmTextLogo.style.fontSize = '400%';
	    elmTextLogo.appendChild(document.createTextNode(/Firefox/.test(elmLogo.alt) ? '' : elmLogo.alt));
	    elmLogo.parentNode.replaceChild(elmTextLogo, elmLogo);
	    var elmLink = elmTextLogo.parentNode;
	    while (elmLink.nodeName != 'BODY' && elmLink.nodeName != 'HTML' && elmLink.nodeName != 'A') {
		elmLink = elmLink.parentNode;
	    }
	    elmLink.style.textDecoration = 'none';
	} else {
	    elmLogo.parentNode.removeChild(elmLogo);
	}
    }

    // simplify search form
    if (document.forms.length) {
	var arTD = document.getElementsByTagName('td');
	for (var i = arTD.length - 1; i >= 0; i--) {
	    var elmTD = arTD[i];
	    if (/Advanced/.test(elmTD.innerHTML)) {
		elmTD.innerHTML = '';
	    }
	}
    }
}

function accSearchResults() {
    // simplify logo
    var elmLogo = document.getElementsByTagName('img')[0];
    var elmTextLogo = document.createElement('h1');
    elmTextLogo.appendChild(document.createTextNode('Google'));
    elmTextLogo.style.marginTop = '0.2em';
    elmTextLogo.style.marginRight = '0.3em';
    elmLogo.parentNode.replaceChild(elmTextLogo, elmLogo);
    elmTextLogo.parentNode.style.textDecoration = 'none';

    // simplify top form
    var elmAdvanced = document.getElementsByTagName('table')[3].getElementsByTagName('td')[1];
    elmAdvanced.parentNode.removeChild(elmAdvanced);

    // remove "tip" if present
    var elmTip = document.getElementsByTagName('table')[7];
    if (/Tip/.test(elmTip.innerHTML)) {
	elmTip.parentNode.removeChild(elmTip);
    }

    // simplify results count
    var elmDivider = document.getElementsByTagName('table')[5];
    elmDivider.parentNode.removeChild(elmDivider);
    var elmResultsContainer = document.getElementsByTagName('table')[5];
    var arTD = elmResultsContainer.getElementsByTagName('td');
    if (arTD.length > 1) {
	var sResults = arTD[1].innerText;
	var iParen = sResults.indexOf('(');
	if (iParen != -1) {
	    sResults = sResults.substring(0, iParen);
	}
	var iDef = sResults.indexOf('[');
	if (iDef != -1) {
	    sResults = sResults.substring(0, iDef);
	}
	var elmResults = document.createElement('h2');
	elmResults.appendChild(document.createTextNode(sResults));
	elmResultsContainer.parentNode.replaceChild(elmResults, elmResultsContainer);
    } else {
	elmResultsContainer.parentNode.removeChild(elmResultsContainer);
    }

    // remove ads, if any
    var aw1 = document.getElementById('aw1');
    while (aw1) {
	var table = aw1.parentNode;
	while (table.nodeName != 'TABLE') {
	    table = table.parentNode;
	}
	table.parentNode.removeChild(table);
	aw1 = document.getElementById('aw1');
    }
    var tpa1 = document.getElementById('tpa1');
    if (tpa1) {
	while (tpa1.nodeName != 'DIV' && tpa1.nodeName != 'P') {
	    tpa1 = tpa1.parentNode;
	}
	tpa1.parentNode.removeChild(tpa1);
    }
    var tpa2 = document.getElementById('tpa2');
    if (tpa2) {
	while (tpa2.nodeName != 'DIV' && tpa2.nodeName != 'P') {
	    tpa2 = tpa2.parentNode;
	}
	tpa2.parentNode.removeChild(tpa2);
    }
    addGlobalStyle('iframe[name="google_ads_frame"] { display: none ! important }');

    // make search results use real headers
    var arResults = getElementsByClassName('p', 'g');
    for (var i = arResults.length - 1; i >= 0; i--) {
	var elmResult = arResults[i];
	var arLink = elmResult.getElementsByTagName('a');
	if (!arLink.length) { continue; }
	var elmLink = arLink[0];
	var elmWrapper = document.createElement('div');
	var elmHeader = document.createElement('h3');
	elmHeader.style.margin = elmHeader.style.padding = 0;
	elmHeader.innerHTML = '<a href="' + elmLink.href + '">' + elmLink.innerHTML + '</a>';
	var elmContent = elmResult.cloneNode(true);
	elmContent.innerHTML = elmContent.innerHTML.replace(/<nobr>/g, '');
	arLink = elmContent.getElementsByTagName('a');
	if (!arLink.length) { continue; }
	elmLink = arLink[0];
	elmContent.removeChild(elmLink);
	elmContent.style.marginTop = 0;
	elmWrapper.appendChild(elmHeader);
	elmWrapper.appendChild(elmContent);
	elmResult.parentNode.replaceChild(elmWrapper, elmResult);
    }

    // simplify next page link
    var arFont = document.getElementsByTagName('font');
    for (var i = arFont.length - 1; i >= 0; i--) {
	var elmFont = arFont[i];
	var html = elmFont.innerHTML;
	if (/Result\&nbsp\;Page\:/.test(html)) {
	    var elmTable = elmFont.parentNode;
	    while (elmTable.nodeName != 'TABLE') {
		elmTable = elmTable.parentNode;
	    }
	    var arTD = elmTable.getElementsByTagName('td');
	    if (arTD.length) {
		var elmTD = arTD[arTD.length - 1];
		var arNext = elmTD.getElementsByTagName('a');
		if (arNext.length) {
		    var elmNext = arNext[0];
		    var elmTextNext = document.createElement('center');
		    elmTextNext.innerHTML = '<p style="font-size: xx-large; margin-bottom: 4em;"><b><a href="' + elmNext.href + '">More Results&nbsp;&nbsp;&rarr;</a></b></p>';
		    elmTable.parentNode.replaceChild(elmTextNext, elmTable);
		}
	    }
	    break;
	}
    }

    // remove bottom ads
    var arCenter = document.getElementsByTagName('center');
    if (arCenter.length > 1) {
	var elmCenter = arCenter[1];
	elmCenter.parentNode.removeChild(elmCenter);
	elmCenter = arCenter[0];
	for (var i = 0; i < 4; i++) {
	    elmCenter.innerHTML = elmCenter.innerHTML.replace(/<br>/, '');
	}
    }

}

document.forms['f'] && accHomePage();
document.forms['gs'] && accSearchResults();
removeFontTags();
zoomStyle();

//
// ChangeeLog
// 2005-07-08 - 0.2 - MAP - added license block
// 2005-06-21 - 0.1 - MAP - initial release
