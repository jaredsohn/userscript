// ==UserScript==
// @name           customizeGoogle - Deutsch
// @namespace      Blake123
// @include        http://www.google.de/
// ==/UserScript==

// ==UserScript==
// @name           customizeGoogle
// @namespace      blakeHymer,4-10-08
// @include        http://www.google.com/
// @include        http://images.google.com/imghp?hl=en&tab=wi
// @include        http://www.google.com/webhp?hl=en&tab=iw
// @include        http://images.google.com/
// @include        http://images.google.com/imghp?hl=en&*
// ==/UserScript==
var name = "Blake"; //Your Name
var initial = "B"; //Your First Initial of your first name
var picLoc = "http://blakehymer.homedns.org/scripts/blake.bmp"; //src location of the picture that will replace the Google image
//lnk[4].href = "http://www.yahoo.com"; //see description for info on how to use this
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
if (document.title == "Google" && (txt[2].innerHTML=="<a href=\"/intl/de/ads/\">Werben mit Google</a> - <a href=\"/services/\">Unternehmensangebote</a> - <a href=\"/intl/de/about.html\">Über Google</a> - <a href=\"http://www.google.com/ncr\">Google.com in English</a>" || txt[2].innerHTML=="©2009 - <a href=\"/intl/en/privacy.html\">Privacy</a>")){
	txt[2].innerHTML="<a href=\"/intl/de/ads/\">Werben mit "+name+"</a> - <a href=\"/services/\">Unternehmensangebote</a> - <a href=\"/intl/de/about.html\">Über " + name + "</a> - <a href=\"http://www.google.com/ncr2009\">"+name +".com in English</a>";
}
if (document.title == "Google" && (txt[3].innerHTML=="©2009 Google" || txt[3].innerHTML=="©2009 - <a href=\"/intl/de/privacy.html\">Datenschutz</a>")){
		if(txt[3].innerHTML=="©2009 Google") {
			txt[3].innerHTML="©2009 " + name;
		}
		if(txt[3].innerHTML=="©2009 - <a href=\"/intl/de/privacy.html\">Datenschutz</a>") {
			txt[3].innerHTML="©2009 " + name + " - <a href=\"/intl/de/privacy.html\">Datenschutz</a>";
		}
}
else if (document.title == "Google" && (txt[4].innerHTML=="©2009 Google" || txt[4].innerHTML=="©2009 - <a href=\"/intl/de/privacy.html\">Datenschutz</a>")){
		if(txt[4].innerHTML=="©2009 Google") {
			txt[4].innerHTML="©2009 " + name;
		}
		if(txt[4].innerHTML=="©2009 - <a href=\"/intl/de/privacy.html\">Datenschutz</a>") {
			txt[4].innerHTML="©2009 " + name + " - <a href=\"/intl/de/privacy.html\">Datenschutz</a>";
		}
}
var btn=document.getElementsByTagName("input"); 
btn[2].value = name + "-Suche";
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
	if(lnk[i].innerHTML==("Google Mail")) {
		lnk[i].innerHTML=initial + "mail";
	}
	i++;
}