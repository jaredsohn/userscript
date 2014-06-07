// ==UserScript==

// @name          Funny Google

// @namespace     Compwizkid96

// @description   Turns Google funny

// @include       http://www.google.com

// @include       http://www.google.com/webhp*

// ==/UserScript==

var logo=document.getElementsByTagName("img") [0];
//logo.src="http://img.soaringrabbit.com/spengbab3.png";
logo.src="http://img.soaringrabbit.com/spengbab3.png";
logo.height="300";
logo.width="300";

document.title="Googler";
document.getElementsByTagName("input")[2].value="Redneck Googler Swerch";