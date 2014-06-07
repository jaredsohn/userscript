// ==UserScript==
// @name          Facebook in HTTPS, not apps
// @author        Dell'Aiera Pol (d.paolino@gmail.com)
// @provided by   Dell'Aiera Pol
// @description	  Modify every links in Facebook from http to https to avoid proxy.
// @include       *
// ==/UserScript==

var allLinks, thisLink, allForms, thisForm, thatLink;

xpath = '//a[contains(@href, "facebook.com")]';

allLinks = document.evaluate(xpath,document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	if (thisLink.href == "http://www.facebook.com/") { thisLink.href="http://www.facebook.com/home.php";}
	thisLink.href = thisLink.href.replace(/^http:/,"https:");
              if (thatLink.href == "https://apps.facebook.com/")
	thisLink.href = thisLink.href.replace(/^https:/,"http:");
	}

xpath = '//form[contains(@action,"facebook.com")]';

allForms = document.evaluate(xpath,document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allForms.snapshotLength; i++) {
	thisForm = allForms.snapshotItem(i);
 	thisForm.action = thisForm.action.replace(/^http:/,"https:");
	}