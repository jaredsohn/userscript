// ==UserScript==
// @name        USO - Enable disabled usocheckup require
// @namespace   http://userscripts.org/users/23652
// @description Enables the disabled @require of usocheckup when updating/uploading source code on Userscripts.org
// @include     http://userscripts.org/scripts/new?form=true
// @include     http://userscripts.org/scripts/edit_src/*
// @copyright   JoeSimmons
// @version     1.0.0
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require     http://usocheckup.dune.net/170563.js
// @grant       GM_getValue
// @grant       GM_log
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

(function() {

	var enableUpdater = function() {

		var regex = /\/\/@require(\s+http:\/\/usocheckup)/m, textarea = document.evaluate("//textarea[@id='script_src']", document, null, 9, null).singleNodeValue;

		if(regex.test(textarea.value)) {
			textarea.value = textarea.value.replace(regex, "// @require$1");
		}

	},
	button = document.evaluate("//input[@type='submit' and @name='commit' and @value]", document, null, 9, null).singleNodeValue;

	if(button !== null) {
		button.addEventListener("click", enableUpdater, false);
	}

}());