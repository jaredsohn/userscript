// ==UserScript==
// @name           Pageonce - Refresh All Accounts
// @description    Adds a link on the Pageonce Accounts page which refreshes all of your account data when clicked.
// @author         Anthony Whitaker
// @namespace      http://www.anthonywhitaker.net/greasemonkey
// @include        https://www.pageonce.com/web/accounts.*
// @include        https://www.pageonce.com/web/accountDetails.*
// @version        1.0
// @updateURL      http://userscripts.org/scripts/source/136092.user.js
// @copyright      2012 © Anthony Whitaker <awhitaker@gmail.com>
// ==/UserScript==
//
// Author:         Anthony Whitaker <awhitaker@gmail.com> 
// Changelog:      1.0       - Added support for Firefox

var pageonceRefreshAllExtension = {
	init: function() {
		GM_addStyle("a.refreshAllAccounts { float: right; font-size: 8pt; padding-right: 8px; color: #4ea6c4; }");

		var a = document.createElement("a");
		a.href = "#";
		a.addEventListener("click", pageonceRefreshAllExtension.refresh, true);
		a.className = "refreshAllAccounts";
		a.innerHTML = "Refresh All Accounts";

		document.getElementById("accountsTable").rows[0].cells[0].appendChild(a);
	},

	refresh: function(evt) {
		var refreshButtons = document.getElementsByClassName("small_refresh_image_out");
		var i = refreshButtons.length;

		while (i--)
			refreshButtons[i].click();
			
		evt.preventDefault();
		return false;
	}
};

window.addEventListener("load", pageonceRefreshAllExtension.init, false);