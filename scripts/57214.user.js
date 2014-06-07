// ==UserScript==
// @name			Userscripts.org Click Your Name And Go To Your Profile
// @author			Erik Vold
// @namespace		userscriptsOrgClickNameGoToProfile
// @include			http*://*userscripts.org/*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-09-07
// @lastupdated		2009-09-07
// @description		This userscript updates the header so that when logged in users click their name they will go to their profile page, and not the current stale default page.
// ==/UserScript==

var userscriptsOrgClickNameGoToProfile = {};
userscriptsOrgClickNameGoToProfile.setup = function() {
	var userMenu = document.getElementById('user');
	if(!userMenu) return false;

	var homeLink = document.evaluate("a[@href='/home']", userMenu, null, 9, null).singleNodeValue;
	if(!homeLink) return false;

	var pubProfileLink = document.evaluate(".//a[text()='public profile']", userMenu, null, 9, null).singleNodeValue;
	if(!pubProfileLink) return false;

	homeLink.href = pubProfileLink.href;

	return true;
}
userscriptsOrgClickNameGoToProfile.setup();
