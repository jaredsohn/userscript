// ==UserScript==
// @name           Merge Plesk's two login forms into one
// @description    Merge Plesk's two login forms into one which
//                 can then be auto-filled by the browser or
//                 recognized by add-ons like KeeFox (http://www.keefox.org)
// @license        Use it for what purpose you want. If redristibuted or changed,
//                 maintain a notice of the original author.
// @copyright      Copyright (C) 2010 by Lutz Issler
// @version        0.1
// @namespace      http://www.systemantics.net/gmscripts/plesk-merge-login-forms
// @include        https://*:8443/login_up.php3
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Merge the two login forms into one
$("#login form:eq(1) input[name=login_name]").remove();
$("#login form:eq(1) tbody").prepend($("#login form:eq(0) tr"));

// Make the Login button functional again (not required for KeeFox
// but provided here for usability reasons)
$("#bid-login").click(function() {
	$("#login form:eq(1)").submit();
	return false;
});
