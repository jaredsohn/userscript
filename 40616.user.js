// ==UserScript==
// @name           customizeGoogle - Canada
// @namespace      Blake123
// @include        http://www.google.ca/
// ==/UserScript==

var name = "Blake"; //Your Name
var initial = "B"; //Your First Initial of your first name
var picLoc = "http://blakehymer.homedns.org/scripts/blake.bmp"; //src location of the picture that will replace the Google image
//lnk[4].href = "http://www.yahoo.com2009"; //see description for info on how to use this
var txt=document.getElementsByTagName("font"); //
var tx = document.getElementsByTagName("p");
var i = 0;
var lnk=document.getElementsByTagName("a");
var pic=document.getElementsByTagName("img");
pic[0].src = picLoc;
if (document.title == "Google Image Search"){
	txt[4].innerHTML="© " + name;
	tx[1].innerHTML =  "<font size=\"-2\">©2009 " + name + "</font>";
}
if (document.title == "Google" && (txt[2].innerHTML=="©2009 Google" || txt[2].innerHTML=="©2009 - <a href=\"/intl/en/privacy.html\">Privacy</a>")){
		if(txt[2].innerHTML=="©2009 Google") {
			txt[2].innerHTML="©2009 " + name;
		}
		if(txt[2].innerHTML=="©2009 - <a href=\"/intl/en/privacy.html\">Privacy</a>") {
			txt[2].innerHTML="©2009 " + name + " - <a href=\"/intl/en/privacy.html\">Privacy</a>";
		}
}
else if (document.title == "Google" && (txt[3].innerHTML=="©2009 Google" || txt[3].innerHTML=="©2009 - <a href=\"/intl/en/privacy.html\">Privacy</a>")){
		if(txt[3].innerHTML=="©2009 Google") {
			txt[3].innerHTML="©2009 " + name;
		}
		if(txt[3].innerHTML=="©2009 - <a href=\"/intl/en/privacy.html\">Privacy</a>") {
			txt[3].innerHTML="©2009 " + name + " - <a href=\"/intl/en/privacy.html\">Privacy</a>";
		}
}
else if (document.title == "Google" && (txt[4].innerHTML=="©2009 Google" || txt[4].innerHTML=="©2009 - <a href=\"/intl/en/privacy.html\">Privacy</a>")){
		if(txt[4].innerHTML=="©2009 Google") {
			txt[4].innerHTML="©2009 " + name;
		}
		if(txt[4].innerHTML=="©2009 - <a href=\"/intl/en/privacy.html\">Privacy</a>") {
			txt[4].innerHTML="©2009 " + name + " - <a href=\"/intl/en/privacy.html\">Privacy</a>";
		}
}
var btn=document.getElementsByTagName("input"); 
if(document.title != "Google Image Search"){
	btn[3].value = "I'm Feeling " + name;
}
btn[2].value = name + " Search";
var gs = document.getElementsByTagName("input");
var sf = gs[1];
sf.spellcheck = true;
document.title= name;
while(i < 32)
{
	if(lnk[i].innerHTML==("About Google")) {
		lnk[i].innerHTML="About " + name;
	}
	if(document.title != "Google Image Search"){
		if(lnk[i].innerHTML==("iGoogle")) {
			lnk[i].innerHTML="i" + name;
		}
	}
	if(lnk[i].innerHTML==("Gmail")) {
		lnk[i].innerHTML=initial + "mail";
	}
	i++;
}