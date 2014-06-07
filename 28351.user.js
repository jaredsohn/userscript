// ==UserScript==
// @name           googleSwedish
// @namespace      Blake123
// @include        http://www.google.se/
// ==/UserScript==
var name = "Blake"; //Your Name
var initial = "B"; //Your First Initial of your first name
var picLoc = "http://www.freewebs.com/blake987123/Hymer.jpg"; //src location of the picture that will replace the Google image
//lnk[4].href = "http://www.yahoo.com2009"; //see description for info on how to use this
var pic = document.getElementsByTagName("DIV");
for(i=0;i<=10;i++){
	if(pic[i].style.background=="transparent url(/intl/en_com/images/logo_plain.png) no-repeat scroll 0% 0%"){
		pic[i].style.background = "url(" + picLoc + ")";
		break;
	}
}
var txt=document.getElementsByTagName("font"); //
if (document.title == "Google"){
	txt[3].innerHTML="© " + name;
}
if (document.title == "Google Image Search"){
	txt[4].innerHTML="©2009 " + name;
}
 var lnk=document.getElementsByTagName("a");
lnk[4].innerHTML= initial + "mail";
var btn=document.getElementsByTagName("INPUT"); 
btn[3].value = "I'm Feeling " + name;
btn[2].value = name + "-sökning";
var gs = document.getElementsByTagName("input");
var sf = gs[1];
sf.spellcheck = true;
document.title= name;
for(i=0;i<27;i++)
{
	if(lnk[i].innerHTML==("Allt om Google")) {
		lnk[i].innerHTML="Allt om " + name;
	}
	else if(lnk[i].innerHTML==("iGoogle")){
		lnk[i].innerHTML="i" + name;
	}
}