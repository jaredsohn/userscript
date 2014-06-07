// ==UserScript==
// @name          RadioButtonCheck
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Checks radiobuttons on page
// @include       *
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==


window.setTimeout(function() { for(i=0;i<document.forms[1].elements.length;i++)
{
if(document.forms[1].elements[i].type=="radio")
		//alert(document.forms[1].elements[i].type);
		if(i%3==1)
			document.forms[1].elements[i].checked = true;
	} }, 10);