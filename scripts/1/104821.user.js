// ==UserScript==
// @name           MyGoogle
// @namespace      Ben, 04/11/2011
// @include        http://www.google.com/
// @include        http://images.google.com/imghp?hl=en&tab=wi
// @include        http://www.google.com/webhp?hl=en&tab=iw
// @include        http://images.google.com/
// @include        http://images.google.com/imghp?hl=en&*
// @include        http://www.google.co.uk/
// ==/UserScript==
var name = "Ben"; // Insert Name
// var picLoc = ""; //src location of the picture that will replace the Google image http://www.googlefont.com
//lnk[4].href = "http://www.yahoo.com"; //see description for info on how to use this
var txt=document.getElementsByTagName("font"); //
var tx = document.getElementsByTagName("p");
var i = 0;
var lnk=document.getElementsByTagName("a");
var pic=document.getElementsByTagName("img");
// pic[0].src = picLoc;
if (document.title == "Google Image Search"){
 txt[4].innerHTML="©2011 " + name;
 tx[1].innerHTML =  "<font size=\"-2\">©2011 " + name + "</font>";
}
if (document.title == "Google" && (txt[2].innerHTML=="©2011 Google" || txt[2].innerHTML=="©2011 - <a href=\"/intl/en/privacy.html\">Privacy</a>")){
  if(txt[2].innerHTML=="©2011 Google") {
   txt[2].innerHTML="©2011 " + name;
  }
  if(txt[2].innerHTML=="©2011 - <a href=\"/intl/en/privacy.html\">Privacy</a>") {
   txt[2].innerHTML="©2011 " + name + " - <a href=\"/intl/en/privacy.html\">Privacy</a>";
  }
}
else if (document.title == "Google" && (txt[3].innerHTML=="©2011 Google" || txt[3].innerHTML=="©2011 - <a href=\"/intl/en/privacy.html\">Privacy</a>")){
  if(txt[3].innerHTML=="©2011 Google") {
   txt[3].innerHTML="©2011 " + name;
  }
  if(txt[3].innerHTML=="©2011 - <a href=\"/intl/en/privacy.html\">Privacy</a>") {
   txt[3].innerHTML="©2011 " + name + " - <a href=\"/intl/en/privacy.html\">Privacy</a>";
  }
}
else if (document.title == "Google" && (txt[4].innerHTML=="©2011 Google" || txt[4].innerHTML=="©2011 - <a href=\"/intl/en/privacy.html\">Privacy</a>")){
  if(txt[4].innerHTML=="©2011 Google") {
   txt[4].innerHTML="©2011 " + name;
  }
  if(txt[4].innerHTML=="©2011 - <a href=\"/intl/en/privacy.html\">Privacy</a>") {
   txt[4].innerHTML="©2011 " + name + " - <a href=\"/intl/en/privacy.html\">Privacy</a>";
  }
}
var btn=document.getElementsByTagName("input");
if(document.title != "Google Image Search"){
 btn[3].value = "Space Weather";
}
btn[2].value = "Make Search Go Now";
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
   lnk[i].innerHTML= name + "'s Google";
  }
 }
 if(lnk[i].innerHTML==("Mail")) {
  lnk[i].innerHTML= name + "'s Mail";
 }
 i++;
}

