// ==UserScript==
// @name           Facebook Show Age (PRO)
// @description    Adds age next to birthdate.
// @include        http://*.facebook.com/*
// @copyright      Tony White
// @version        1.0.0
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

function c() {
x++;
var bday = document.evaluate("//div[@id='info_section_info_basic']/dl/div/dt[.='Birthday:']/following-sibling::dd",document,null,9,null).singleNodeValue;
if(bday==null && x<100) setTimeout(c, 100);
	else if(x<100) {
	var bYear=parseInt(bday.textContent.match(/([a-zA-Z]+) (\d{1,2}), (\d{4})/)[3]),
		cYear=new Date().getFullYear();
		bday.previousSibling.textContent = "Age:";
		bday.textContent=(cYear-bYear).toString();
	}
}

var x=0;
setTimeout(c, 100);

