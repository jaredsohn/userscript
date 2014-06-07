// ==UserScript==
// @name           EPFL Moodle autologin
// @namespace      http://userscripts.org/scripts/show/162748
// @description    Automatically click on login when you are not logged in on Moodle from EPFL.
// @include        http://moodle.epfl.ch/*
// @include        https://moodle.epfl.ch/*
// @version        0.1
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @grant          none
// @run-at         document-end
// ==/UserScript==


if (document.URL.indexOf('https://moodle.epfl.ch/') === 0
 || document.URL.indexOf('http://moodle.epfl.ch/') === 0)
{
	var not_logged_text = "You are not logged in";
	var guest_text = "You are currently using guest access";

	var logininfos = document.getElementsByClassName('logininfo');
	if (logininfos.length > 0) {
		var logininfo = logininfos[0];

		if (logininfo.innerHTML.indexOf(guest_text) > -1
		 || logininfo.innerHTML.indexOf(not_logged_text) > -1) {
			logininfo.getElementsByTagName('a')[0].click();
		}
	}
}

