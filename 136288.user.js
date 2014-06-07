// ==UserScript==
// @name        Installs - Total
// @namespace   www.vsysop.co.uk
// @include     http://userstyles.org/users/14310
// @version     1
// ==/UserScript==

for (i=0;i<200;i++) {
var p = document.getElementsByTagName('tr')[i].childNodes[7].innerHTML;
var q = document.getElementsByTagName('tr')[i].childNodes[7];
if (p == 0) {
  q.style.color="#313131";
} else if (p != null) {
  q.style.color="green";
}
}