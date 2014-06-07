// ==UserScript==
// @name          Shoutbox Height
// @description	  Sets shoutbox height
//
// @include        http://www.thestudentroom.co.uk/forumdisplay.php?f=91
// ==/UserScript==

window.onload = setShoutBox;

function setShoutBox() {
 	
frm = document.getElementsByName("pigshoutbox")[0];
frm.height = 555;

}