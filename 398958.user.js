// ==UserScript==
// @name				arkJira
// @description   Jira Tuning
// @namespace		chooz
// @author			chooz
// @version			1.0.201401
// @updateURL		http://userscripts.org/scripts/source/398958.user.js
// @include			http://jira.intra.arkea.com:8080/jira/issues/*
// @icon				http://jira.intra.arkea.com:8080/jira/favicon.ico
// ==/UserScript==

var changeStyle = function () {
	GM_addStyle("tr.issuerow td {font-size:11px !important;}");
};
window.onload = changeStyle();


var sURL = window.location.toString();

//if (sURL.match(/issues/)) setTimeout(presentationBugs, 1800);

function presentationBugs() {

	var tBug = document.getElementById("issuetable");
	var sBuf = tBug.innerHTML;

	sBuf = sBuf.replace(/(assignee_[^>]*>)[^<]*<\/a>/g, '$1toto</a>');
//Priorité de traitement
// /html/body/div/section/div[3]/div[2]/div/div[2]/div/div[3]/table/thead/tr/th[7]/span

// <a id="assignee_x4945" class="user-hover" href="/jira/secure/ViewProfile.jspa?name=x4945" rel="x4945">LE BRAS SEBASTIEN</a>
// <a id="reporter_c2427" class="user-hover" href="/jira/secure/ViewProfile.jspa?name=c2427" rel="c2427">TIRILLY CHRISTOPHE</a>
// cf. arkMantis
// sBuf = sBuf.replace(/(.* )(\w)\w+/g, '$1 $2'); // initiale du prénom des acteurs

// <time datetime="2014-01-28T16:54+0100">28 janvier 2014</time>

// <a href="/jira/browse/FLXRECGAB-91">FLXRECGAB-91</a>

// class=issuerow font-size:10px !important
	tBug.innerHTML = sBuf;
	return;
}
if (sURL.match(/SetSelectedIssue.jspa/)) {
//alert('toto');
}