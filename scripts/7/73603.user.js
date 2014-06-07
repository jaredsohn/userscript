// ==UserScript==
// @name           customizeGoogle
// @namespace      blakeHymer,4-10-08
// @include        http://www.google.com/
// @include        http://images.google.com/imghp?hl=en&tab=wi
// @include        http://www.google.com/webhp?hl=en&tab=iw
// @include        http://images.google.com/
// @include        http://images.google.com/imghp?hl=en&*
// @include        http://www.google.co.id/
// @include        http://images.google.co.id/imghp?hl=en&tab=wi
// @include        http://www.google.co.id/webhp?hl=en&tab=iw
// @include        http://images.google.co.id/
// @include        http://images.google.co.id/imghp?hl=en&*
// @include        http://www.google.co.id/ig*
// @modification   NoLimitz
// ==/UserScript==
var name = "Andika261291"; //Your Name
var initial = "A"; //Your First Initial of your first name
var picLoc = "http://upload.kapanlagi.com/images/thumb/20100406161353_show.php_4bbafb511ca8b-t.gif"; //src location of the picture that will replace the Google image
//lnk[4].href = "http://www.google.com"; //see description for info on how to use this
var txt=document.getElementsByTagName("font"); //
var tx = document.getElementsByTagName("p");
var i = 0;
var lnk=document.getElementsByTagName("a");
var pic=document.getElementsByTagName("img");
oldTitle = document.title;
pic[0].src = picLoc;
var style = document.getElementsByTagName("style");
if(document.title == "iGoogle"){
	style[2].innerHTML = "#regular_logo{margin-right:5px;background-image:url(http://bsite.homedns.org/scripts/blak.bmp);background-position:0px -15px;width:300px;height:70px;}";
}
if (document.title == "Google Image Search"){
	txt[4].innerHTML="©2009 " + name;
	txt[1].innerHTML =  "<font size=\"-2\">©2009 " + name + "</font>";
}
if (document.title == "Google" && (txt[1].innerHTML=="©2009 Google" || txt[1].innerHTML=="©2009 - <a href=\"/intl/en/privacy.html\">Privacy</a>")){
		if(txt[1].innerHTML=="©2009 Google") {
			txt[1].innerHTML="©2009 " + name;
		}
		if(txt[1].innerHTML=="©2009 - <a href=\"/intl/en/privacy.html\">Privacy</a>") {
			txt[1].innerHTML="©2009 " + name + " - <a href=\"/intl/en/privacy.html\">Privacy</a>";
		}
}
else if (document.title == "Google" && (txt[2].innerHTML=="©2009 Google" || txt[2].innerHTML=="©2009 - <a href=\"/intl/en/privacy.html\">Privacy</a>")){
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
	if(document.title == "Google"){
		btn[3].value = "I'm Feeling " + name;
	}
	if(document.title == "iGoogle"){
		btn[6].value = "I'm Feeling " + name;
	}
}
if(1){
	if(document.title == "Google"){
		btn[2].value = name + " Search";
	}
	if(document.title == "iGoogle"){
		btn[5].value = name + " Search";
	}
}
if(document.title=="Google"){
	btn[1].spellcheck = true;
}
else if(document.title=="iGoogle"){
	btn[4].spellcheck = true;
}
document.title= name;
while(i < 150)
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
	if(lnk[i].innerHTML==("Go to Google.com")) {
		lnk[i].innerHTML= "Go to " + name + ".com";
	}
	i++;
}