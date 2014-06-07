// ==UserScript==
// @name           customizeGoogle - Schweiz
// @namespace      Blake123
// @include        http://www.google.ch/
// ==/UserScript==
var name = "Blake"; //Your Name
var initial = "B"; //Your First Initial of your first name
var picLoc = "http://www.freewebs.com/blake987123/Hymer.jpg"; //src location of the picture that will replace the Google image
//lnk[4].href = "http://www.yahoo.com"; //see description for info on how to use this
var pic = document.getElementsByTagName("DIV");
for(i=0;i<=10;i++){
	if(pic[i].style.background=="transparent url(/intl/en_com/images/logo_plain.png) no-repeat scroll 0% 0%"){
		pic[i].style.background = "url(" + picLoc + ")";
		break;
	}
}
var txt=document.getElementsByTagName("font"); //
if (document.title == "Google"){
	txt[4].innerHTML="©2009 " + name;
}
var lnk=document.getElementsByTagName("a");
for(i = 0; i < 33; i++){
	if(lnk[i].innerHTML == "iGoogle"){
		lnk[i].innerHTML = "i"+name;
		break;
	}
}
lnk[4].innerHTML= initial + "mail";
var btn=document.getElementsByTagName("INPUT"); 
btn[2].value = name + "-Suche";
var gs = document.getElementsByTagName("input");
var sf = gs[1];
sf.spellcheck = true;
document.title= name;
for(i=0;i<27;i++)
{
	if(lnk[i].innerHTML==("Über Google")) {
		lnk[i].innerHTML="Über " + name;
	}
}