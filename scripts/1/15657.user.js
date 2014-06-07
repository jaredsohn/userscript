// ==UserScript==
// @name           Show More Scripts Per Page
// @namespace      localhost
// @description    Display up to 5 pages of scripts at a time on userscripts.org.  Hack to work with new pagination; bugfix. (Version 20071223.1)
// @include        http://userscripts.org/scripts
// @include        http://userscripts.org/scripts?page=*
// @exclude        http://userscripts.org/articles/*
// @exclude        http://userscripts.org/forums/*
// @exclude        http://userscripts.org/scripts/*
// @exclude        http://userscripts.org/users/*
// ==/UserScript==

// The more additional pages you display, the longer the load time
var addPages = GM_getValue('addPages',2);
addPages == 0 ? ps = " Page" : ps = " Pages";
GM_registerMenuCommand("Show " + (addPages+1) + ps, askPages);
addPages = GM_getValue('addPages',2);
if (!addPages) { return; }
var pages = addPages;
var scriptInfo = document.evaluate("//p[@class='subtitle']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var totalScripts;
for (i=0;i<scriptInfo.snapshotLength;i++) {
	if (scriptInfo.snapshotItem(i).textContent.match(/(\d+[,]\d+)/)) {
		totalScripts = scriptInfo.snapshotItem(i).textContent.match(/(\d+[,]\d+)/)[1];
		break;
	}
}
totalScripts = totalScripts.replace(/,/g, "");
var totalPages = Math.ceil(totalScripts/25);
var currentPage = 1;
var url = window.location.href;
if (!url.match(/\?page=/)) { url += "?page=1"; }
if (url.match(/\?page=(\d+)/)) { currentPage = url.match(/\?page=(\d+)/)[1]; }
if (totalPages - currentPage <= +addPages+1) { pages = (totalPages - currentPage -1); }
var nextPage = +currentPage + pages + 1;
var newPgLink = document.createElement('a');
newPgLink.href = url.replace(/\d+/, nextPage);
//newPgLink.innerHTML = "Next " + (pages+1) + " pages";
newPgLink.innerHTML = "Next »";
var endPages = totalPages - currentPage;
if (endPages < 2*(addPages+1)) {
	if (endPages <= addPages+1) {
		endPages == addPages+1 ? newPgLink.innerHTML = "Last page" : newPgLink.innerHTML = "";
	} else {
		newPgLink.innerHTML = "Last " + (totalPages-currentPage-addPages) + " pages";
	}
}

var pagination = document.evaluate("//div[@class='pagination']/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

//for (i=0;i<pagination.snapshotLength; i++) {
	var a = pagination.snapshotItem(pagination.snapshotLength-1);
	a.parentNode.replaceChild(newPgLink,a);
//}

var j = currentPage;
var scriptTable = document.evaluate("//table[@class='wide forums']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var newTable = document.createElement('table');
var currentTable;
var tbody = "<!-- REPLACED CONTENT -->\n";
for (i=0; i<pages+1; i++) {
	nextURL = window.location.href;
	if (!nextURL.match(/\?page=/)) { nextURL += "?page=1"; }
	nextURL = nextURL.replace(/\?page=\d+$/, "?page=" + j++);
	var request = new XMLHttpRequest();
// Must use synchronous http request
	try {
	request.open("GET", nextURL, false);
	request.send(null);
	if (request.status == 200) {
//		currentTable = request.responseText.match(/(<table.+"wide forums">)([\s\S]+)(<\/table>)/);
		currentTable = request.responseText.match(/(<table.+>)([\s\S]+)(<\/table>)/);
		if (i>0) {
			currentTable[2] = currentTable[2].replace(/<tr[\s\S]+<th[\s\S]+?\/tr>/, "");
		}
		tbody += currentTable[2];
	}
	} catch(e) {
		GM_log(e.description);
	}
}
newTable.innerHTML = currentTable[1] + tbody + currentTable[3];
scriptTable.parentNode.replaceChild(newTable, scriptTable);

function askPages() {
	var pp = prompt('How many pages (not more than 5)\nshould be displayed at once?',(addPages+1));
	if (pp) {
		--pp; pp<0 ? pp=0 : pp=pp; pp>4 ? pp=4 : pp=pp;
		GM_setValue('addPages', pp);
		document.location.reload();
	}
}
