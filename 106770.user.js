 // ==UserScript==
// @name          Backlog to Oldbacklog
// @author        Kimi
// @provided by   Kimi
// @description	  Muuttaa agilosta linkit osoittamaan vanhaan backlogiin
// @include       http://agilo2.samcom/*
// ==/UserScript==

var allLinks, thisLink, allForms, thisForm;

xpath = '//a[contains(@href, "agilo2.samcom")]';

allLinks = document.evaluate(xpath,document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	thisLink.href = thisLink.href.replace(/^backlog/,"oldbacklog");
	}

xpath = '//form[contains(@action,"agilo2.samcom")]';

allForms = document.evaluate(xpath,document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allForms.snapshotLength; i++) {
	thisForm = allForms.snapshotItem(i);
 	thisForm.action = thisForm.action.replace(/^backlog/,"oldbacklog");
	}