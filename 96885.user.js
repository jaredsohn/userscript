// ==UserScript==
// @name		ClearWhateverIWant
// @namespace	http://www.myyearbook.com/shrek99
// @description	Clears Whatever I Want Box
// @include		http://www.myyearbook.com/?mysession=cmVnaXN0cmF0aW9uX3doYXRldmVyaXdhbnQ=
// ==/UserScript==
//
// Code to disable Chatter on the homepage
textBox = document.getElementById("wiwText");
textBox.value = "";
