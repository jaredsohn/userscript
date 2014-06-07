// ==UserScript==
// @name           Steam Community login focus fixer
// @namespace      http://userscripts.org/users/274735
// @description    Focuses the username textbox on steamcommunity.com's login pages as soon as the page is ready, instead of waiting for all the images on the page to load
// @include        /^https://steamcommunity\.com/openid/login(\?.*)?$/
// @include        /^https://steamcommunity.com(/\?.*)?$/
// ==/UserScript==
{
	var username_element = document.getElementById('steamAccountName');
	if (username_element !== null) {
		username_element.removeAttribute('id');
		username_element.focus();
	}
}
