// ==UserScript==
// @name           customizeGoogleImage
// @namespace      hanns
// @include        http://www.google.*/
// @include	   http://images.google.*/imghp?hl=*&btnG=*
// @include        http://www.google.*/webhp?hl=*&tab=iw

// ==/UserScript==
var name = " "; //Your Name
var initial = " "; //Your First Initial of your first name
var picLoc = " "; //src location of the picture that will replace the Google image

//lnk[4].href = "http://www.yahoo.com"; //see description for info on how to use this
var txt=document.getElementsByTagName("font"); //
var tx = document.getElementsByTagName("p");
var i = 0;
var lnk=document.getElementsByTagName("a");
var pic=document.getElementsByTagName("img");
pic[0].src = picLoc;
if (document.title == "Google Bild Suche"){
	txt[4].innerHTML="©2008 Sony";
	tx[1].innerHTML =  "<font size=\"-2\">©2008 " + name + "</font>";
}
if (document.title == "Google" && (txt[2].innerHTML=="©2008 Google" || txt[2].innerHTML=="©2008 - <a href=\"/intl/de/privacy.html\">Datenschutz</a>")){
		if(txt[2].innerHTML=="©2008 Google") {
			txt[2].innerHTML="©2008 name;
		}
		if(txt[2].innerHTML=="©2008 - <a href=\"/intl/de/privacy.html\">Datenschutz</a>") {
			txt[2].innerHTML="©2008 name + " - <a href=\"/intl/de/privacy.html\">Datenschutz</a>";
		}
}
else if (document.title == "Google" && (txt[3].innerHTML=="©2008 Google" || txt[3].innerHTML=="©2008 - <a href=\"/intl/de/privacy.html\">Datenschutz</a>")){
		if(txt[3].innerHTML=="©2008 Google") {
			txt[3].innerHTML="©2008 name;
		}
		if(txt[3].innerHTML=="©2008 - <a href=\"/intl/de/privacy.html\">Datenschutz</a>") {
			txt[3].innerHTML="©2008 name + " - <a href=\"/intl/de/privacy.html\">Datenschutz</a>";
		}
}
else if (document.title == "Google" && (txt[4].innerHTML=="©2008 Google" || txt[4].innerHTML=="©2008 - <a href=\"/intl/en/privacy.html\">Datenschutz</a>")){
		if(txt[4].innerHTML=="©2008 Google") {
			txt[4].innerHTML="©2008 name;
		}
		if(txt[4].innerHTML=="©2008 - <a href=\"/intl/de/privacy.html\">Privacy</a>") {
			txt[4].innerHTML="©2008 name + " - <a href=\"/intl/de/privacy.html\">Datenschutz</a>";
		}
}
var btn=document.getElementsByTagName("input"); 
if(document.title != "Google Bild Suche"){
	btn[3].value = "b"name;
}
btn[2].value = name + " - Search";
var gs = document.getElementsByTagName("input");
var sf = gs[1];
sf.spellcheck = true;
document.title= name"image";
while(i < 32)
{
	if(lnk[i].innerHTML==("Über Google")) {
		lnk[i].innerHTML="About VAIO Search";
	}
	if(lnk[i].innerHTML==("Werben mit Google")) {
		lnk[i].innerHTML="Werben mit Sony";
	}
	
	
	if(document.title != "Google Bild Suche"){
		if(lnk[i].innerHTML==("iGoogle")) {
			lnk[i].innerHTML="i" + name;
		}
	}
	if(lnk[i].innerHTML==("Google Mail")) {
		lnk[i].innerHTML=initial + "mail";
	}
	i++;
}