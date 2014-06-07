// ==UserScript==
// @name           Ikariam embassy retool
// @namespace      http://ikariam.com/
// @description    Replace the light bulbs in the embassy with the date of last login
// @include        http://*.ikariam.com/index.php?view=embassy*
// @include        http://*.ikariam.com/index.php?view=diplomacyAdvisor*
// ==/UserScript==

var allLogins, thisLogin, newLogin;
allLogins = document.evaluate(
	'//td[@class="offline"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (i = 0; i < allLogins.snapshotLength; i++) {
thisLogin = allLogins.snapshotItem(i);
newLogin = document.createElement("td")
newLogin.innerHTML =  thisLogin.title
thisLogin.parentNode.replaceChild(newLogin, thisLogin);
}
