// ==UserScript==
// @name        UserStyles - Installs This Week
// @namespace   www.vsysop.co.uk
// @include     http://userstyles.org/users/*
// @version     1
// ==/UserScript==

for (i=0;i<200;i++) {
var p = document.getElementsByTagName('tr')[i].childNodes[5].innerHTML;
var q = document.getElementsByTagName('tr')[i].childNodes[5];
if (p == 0)	{
  q.style.color="#313131";
} else if (p != null) {
  q.style.color="green";
}
}