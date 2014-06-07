// ==UserScript==
// @name           Steam login autocomplete enabler
// @namespace      http://userscripts.org/users/274735
// @description    Enable's Firefox's autocomplete feature on steamcommunity.com, where it is normally disabled.
// @include        /^https://steamcommunity\.com/openid/login(\?.*)?$/
// @include        /^https://steamcommunity.com(/\?.*)?$/
// ==/UserScript==

{
	var password_element = document.getElementById('steamPassword');
	if (password_element !== null) {
		password_element.removeAttribute('autocomplete');
	}
}
