// ==UserScript==
// @name           {Weasyl} Title Tag Fixer
// @namespace      http://wolfey.sillydog.org/
// @description    Changes the default "<title>" tag of "Weasyl" to indicate what you are viewing.
// @include        https://www.weasyl.com/*
// @exclude        https://www.weasyl.com/
// @version        1.1.20121011
// ==/UserScript==

// [START] "Get Elements by Class Name"
// [ http://snipplr.com/view/1696/get-elements-by-class-name/ ]
function getElementsByClassName(classname, node) {

	"use strict";

	var a, re, els, i, j = "";

	if (!node) {

		node = document.getElementsByTagName("body")[0];

	}

	a = [];

	re = new RegExp('\\b' + classname + '\\b');

	els = node.getElementsByTagName("*");

	for (i = 0, j = els.length; i < j; i = i + 1) {

		if (re.test(els[i].className)) {

			a.push(els[i]);

		}

	}

	return a;

}
// [END] "Get Elements by Class Name"

var currentFolderElement, folderList, pageHref, pageTitle;

folderList = [];

pageHref = [];

pageHref = document.location.href.split("/")[3].split("?");

if (pageHref.length === 1) {

	pageHref[1] = "";
	pageHref[2] = "";

} else {

	pageHref[1] = document.location.href.split("/")[3].split("?")[1].split("=")[0];
	pageHref[2] = document.location.href.split("/")[3].split("?")[1].split("=")[1];

}

pageTitle = [];

pageTitle[0] = " | Weasyl";

pageTitle[1] = pageHref[0].substr(0, 1).toUpperCase() + pageHref[0].substr(1).toLowerCase();

if ((pageTitle[1] === "Characters") || (pageTitle[1] === "Collections") || (pageTitle[1] === "Favorites") || (pageTitle[1] === "Groups")
		|| (pageTitle[1] === "Journals") || (pageTitle[1] === "Profile") || (pageTitle[1] === "Shouts") || ((pageTitle[1] === "Submissions") && (pageHref[1] === ""))) {

	pageTitle = document.getElementById("user-info").getElementsByClassName("username")[0].firstChild.nodeValue + " [" + pageTitle[1] + "]" + pageTitle[0];

} else if ((pageTitle[1] === "Submissions") && (pageHref[1] !== "")) {

	currentFolderElement = document.getElementsByClassName("sectioned-sidebar")[0].getElementsByClassName("current")[0].parentNode;

	folderList.push(currentFolderElement.firstChild.firstChild.nodeValue);

	currentFolderElement = document.getElementsByClassName("sectioned-sidebar")[0].getElementsByClassName("current")[0].parentNode;

	while (currentFolderElement.getAttribute("style") !== null) {

		if (currentFolderElement.style.marginLeft !== currentFolderElement.previousSibling.previousSibling.style.marginLeft) {

			folderList.push(currentFolderElement.previousSibling.previousSibling.firstChild.firstChild.nodeValue);

		}

		currentFolderElement = currentFolderElement.previousSibling.previousSibling;

	}

	folderList = folderList.toString().replace(/,/g, " < ");

	pageTitle[2] = document.getElementById("user-info").getElementsByClassName("username")[0].firstChild.nodeValue;

	pageTitle = folderList + " (Folder List for " + pageTitle[2] + ")" + " [" + pageTitle[1] + "]" + pageTitle[0];

} else if (pageTitle[1] === "Help") {

	pageTitle = document.getElementsByClassName("page-title")[0].lastChild.nodeValue + " [" + pageTitle[1] + "]" + pageTitle[0];

} else if (pageTitle[1] === "Search" && ((pageHref[1] === "") || (pageHref[1] === "find"))) {

	pageTitle = "Browse Content" + pageTitle[0];

} else if (pageTitle[1] === "Search" && pageHref[1] === "searchid") {

	pageTitle = document.getElementById("search-q").value + " [" + pageTitle[1] + "]" + pageTitle[0];

} else {

	pageTitle[2] = document.getElementById("db-user").getElementsByClassName("username")[0].firstChild.nodeValue;

	pageTitle[3] = document.getElementById("detail-bar-title").firstChild.nodeValue;

	pageTitle = pageTitle[3] + " by " + pageTitle[2] + " [" + pageTitle[1] + "]" + pageTitle[0];

}

document.title = pageTitle;