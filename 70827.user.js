// ==UserScript==
// @name           Redmine
// @namespace      http://userscripts.org/users/125102
// @description    Some utilities for redmine
// @include        *
// @require        http://code.jquery.com/jquery-1.4.1.min.js
// ==/UserScript==

GM_registerMenuCommand("New issue", newIssue, "n", "control shift alt", "n");

function newIssue() {
	window.location = "/redmine/projects/issues/new";
}

function sortSelectByID(id1) {
	if (document.getElementById(id1) != undefined) {
		SortListBox(document.getElementById(id1));
	}
}

function compareText (opt1, opt2) {
	// not case sensitive
	return opt1.text.toLowerCase() < opt2.text.toLowerCase() ? -1 :
	opt1.text.toLowerCase() > opt2.text.toLowerCase() ? 1 : 0;
}

function compareTextCaseSensitive (opt1, opt2) {
	// case sensitive
	return opt1.text < opt2.text ? -1 :
	opt1.text > opt2.text ? 1 : 0;
}

function SortListBox (pListBox, compareFunction) {
	if (!compareFunction)
		compareFunction = compareText;
	var options = new Array (pListBox.options.length);
	for (var i = 0; i < options.length; i++)
	options[i] = new Option (
		pListBox.options[i].text,
		pListBox.options[i].value,
		pListBox.options[i].defaultSelected,
		pListBox.options[i].selected
	);
	
	options.sort(compareFunction);
	pListBox.options.length = 0;
	for (var i = 0; i < options.length; i++) {
		pListBox.options[i] = options[i];
	}
} 


(function() {
	alert(1);
	// Sort select list "Fixed in version", "values_fixed_version_id"
	var FixInVersionSelectListID = ["issue_fixed_version_id", "values_fixed_version_id"];
	
	for (var i = 0; i < FixInVersionSelectListID.length;i++){
		sortSelectByID(FixInVersionSelectListID[i]);
	}
	
	// Highlight issue has priority High
	var IssueListSelector = "table";//[class='list issues']";
	//document.write("<script>alert(1)</script>");
	alert(IssueListSelector);
	alert($(IssueListSelector).html());
	alert($(IssueListSelector).text());
}());