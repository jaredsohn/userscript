// ==UserScript==
// @name           Userscripts.org - Easy "Add Script" for Groups
// @namespace      http://userscripts.org/users/23652
// @description    Paste a script link into the "Add Script" field, and it will get turned into that script's ID
// @include        http://userscripts.org/groups/*/scripts*
// @copyright   JoeSimmons
// @version     1.0.1
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require     http://usocheckup.dune.net/51812.js
// @grant       GM_getValue
// @grant       GM_log
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

function filter(elem) {

	var val, e = elem.currentTarget,
		_RegExp = /scripts\/show\/(\d+)/;

	val = (e.value.match(_RegExp) || ["", ""])[1];

	if(val !== "" && e.value !== val) {

		e.value = val;

	}

}

window.addEventListener("load", function() {

	var add = document.evaluate("//form//input[@type='text' and @name='script_id']", document, null, 9, null).singleNodeValue;
	if(add !== null) {

		add.addEventListener('input', filter, false);
		add.addEventListener('keyup', filter, false);
		add.addEventListener('paste', filter, false);
		add.addEventListener('change', filter, false);
		add.addEventListener('blur', filter, false);
		add.addEventListener('focus', filter, false);

	}

}, false);