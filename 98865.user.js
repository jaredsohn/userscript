// ==UserScript==
// @name           TreasuryDirect Login
// @namespace      http://jason.karns.name
// @include        https://www.treasurydirect.gov/RS/BPDLogin?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description    Make the password field editable so that you can use the keyboard to log in
// @author         Jason Karns
// @version        1.0
// @date           2011-01-14
// @change         initial release
// ==/UserScript==

$("input[type='password']").removeAttr("readonly");
