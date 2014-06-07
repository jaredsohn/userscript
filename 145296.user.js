// ==UserScript==
// @name           click INPUT/TEXTAREA to select all
// @version        1.0
// @include        *
// ==/UserScript==
	
var inputss = document.getElementsByTagName("input");
var textareaa = document.getElementsByTagName("textarea");
		
for (i = 0; i < inputss.length; i++)
	inputss[i].setAttribute("onclick", "select();");

for (j = 0; j < textareaa.length; j++)
	textareaa[j].setAttribute("onclick", "select();");