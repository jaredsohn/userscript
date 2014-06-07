// ==UserScript==
// @name           customizeGoogle -Brunei
// @namespace      Blake123
// @include        http://www.google.com.bn/
// ==/UserScript==
var name = "Blake"; //Your Name
var initial = "B"; //Your First Initial of your first name
var picLoc = "http://www.freewebs.com/blake987123/Hymer.jpg"; //src location of the picture that will replace the Google image
//lnk[4].href = "http://www.yahoo.com"; //see description for info on how to use this
var pic = document.getElementsByTagName("DIV");
pic[3].style.background = "url(" + picLoc + ")";
var txt=document.getElementsByTagName("font"); //
if (document.title == "Google"){
	txt[3].innerHTML="©2009 " + name;
}
if (document.title == "Google Image Search"){
	txt[4].innerHTML="©2009 " + name;
}
 var lnk=document.getElementsByTagName("a");
lnk[3].innerHTML= initial + "mail";
var btn=document.getElementsByTagName("INPUT"); 
btn[2].value = "Carian " + name;
var gs = document.getElementsByTagName("input");
var sf = gs[1];
sf.spellcheck = true;
document.title= name;
for(i=0;i<27;i++)
{
	if(lnk[i].innerHTML==("Semua Mengenai Google")) {
		lnk[i].innerHTML="Semua Mengenai " + name;
	}
}
// ==/UserScript==