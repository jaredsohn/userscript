// ==UserScript==
// @name			WarBB - Warez-BB Links Checker
// @description		Automatically checks for dead links from various file hosting services.
// @details			Based on popular W.A.R. Links Checker, this script automatically checks links from 1000+ unique filehostings. For Firefox, Chrome, Safari. 
// @version			1.9.0
// @license			Please do not modify yourself, contact authors with any problems
// @author			iKickback & thecodingdude / Original by dkitty
// @include			*warez-bb.org*
// @include			*safelinking.net/p/*
// @include			*keeplinks.me/p/*
// @grant			GM_xmlhttpRequest
// @grant			GM_addStyle
// @grant			GM_registerMenuCommand
// @grant			GM_getResourceText
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @usoscript		153759
// ==/UserScript==

/* Notice:
 * This is a dummy script to update to WarBB 2.0 which is hosted at warbb.pw
 * This script is meant to be useless
*/

if (localStorage.getItem("WarBB_Autoupdate_Dummy_Script")) return;
alert("To ensure WarBB will be updated to v2.0 through our on site and to keep compatibility with its autoupdater, we have installed a dummy script to redirect you.\r\nIf everything goes right, 2.0 will just overwrite this script. This script will automatically disable itself and can be removed after the upgrade if it's still present.\r\nYou will now be redirected to the WarBB 2.0 install page. Thank you for updating.\r\n ~iKickback");
localStorage.setItem("WarBB_Autoupdate_Dummy_Script", true);
window.location = "http://warbb.pw/download";