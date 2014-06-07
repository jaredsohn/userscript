// ==UserScript==
// @name           Call of Duty HQ Thread Highlighter
// @namespace      Kastro187420
// @description    Highlight's Locked Threads with a Red Background, and highlights threads started by JD_2020 or Vahn as Blue for easy recognition.
// @include        http://*callofduty.com/board/viewforum.php?f=*
// ==/UserScript==

var bg1 = document.getElementsByClassName("row bg1");
var bg2 = document.getElementsByClassName("row bg2");
 for (i=0;i<bg1.length;i++) {
	 if (bg1[i].innerHTML.indexOf("This thread is locked, you cannot edit posts or make further replies.") >= 1) {
		 bg1[i].style.backgroundColor = "#990000"; } else if (bg1[i].innerHTML.indexOf("<a href=\"../profile/2227533\">Vahn</a>") >=1 || bg1[i].innerHTML.indexOf("<a href=\"../profile/2194670\">JD_2020</a>") >= 1) {
			 bg1[i].style.backgroundColor = "#000099"; }
 }
 
  for (i2=0;i2<bg2.length;i2++) {
	 if (bg2[i2].innerHTML.indexOf("This thread is locked, you cannot edit posts or make further replies.") >= 1) {
		 bg2[i2].style.backgroundColor = "#990000"; } else if (bg2[i2].innerHTML.indexOf("<a href=\"../profile/2227533\">Vahn</a>") >=1 || bg2[i2].innerHTML.indexOf("<a href=\"../profile/2194670\">JD_2020</a>") >= 1) {
			 bg2[i2].style.backgroundColor = "#000099"; }
 }
 