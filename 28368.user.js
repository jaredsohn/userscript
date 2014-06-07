// ==UserScript==
// @name           customizeGoogle
// @namespace      blakeHymer,4-10-08
// @include        http://www.google.com/
// @include        http://images.google.com/imghp?hl=en&tab=wi
// @include        http://www.google.com/webhp?hl=en&tab=iw
// @include        http://images.google.com/
var name = "YESH"; //Your Name
var initial = "M"; //Your First Initial of your first name
var picLoc = "http://news.rinkiss.com/wp-content/uploads/2008/04/dasavatharam.jpg"; //src location of the picture that will replace the Google image
//lnk[4].href = "http://www.yahoo.com"; //see description for info on how to use this
var txt=document.getElementsByTagName("font");
if (document.title == "Google"){
	txt[2].innerHTML="©2008 " + name;
}
if (document.title == "Google Image Search"){
	txt[4].innerHTML="©2008 " + name;
}
 var lnk=document.getElementsByTagName("a");
lnk[18].innerHTML="i" + name;
lnk[4].innerHTML= initial + "mail";
var pic=document.getElementsByTagName("img");
pic[0].src = picLoc;
var btn=document.getElementsByTagName("input"); 
btn[3].value = "I'm Feeling " + name;
btn[2].value = name + " Search";
var gs = document.getElementsByTagName("input");
var sf = gs[1];
sf.spellcheck = true;
document.title= name;
for(i=0;i<27;i++)
{
	if(lnk[i].innerHTML==("About Google")) {
		lnk[i].innerHTML="About " + name;
	}
}
// ==/UserScript==