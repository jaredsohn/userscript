// ==UserScript==
// @name           Auto Check "PM me about dead links"
// @namespace      http://warez-bb.org
// @description    Auto Selects the option "PM me about dead links" on Warez-BB.org
// @include        http://*warez-bb.org/posting.php?mode=newtopic&f=*
// @author	       Daniel.Blaze
// ==/UserScript==


var check = document.getElementsByName("send_pm");
if (check.item(0).checked == false) {
	check.item(0).checked = true;
}