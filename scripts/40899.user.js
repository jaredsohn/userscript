// ==UserScript== 
// @name           flickr block adult content 1
// @namespace      pratikpoddar@delicious
// @description    Want to monitor and restrict the pictures your child sees on Flickr (which is unmonitored) 
// @include        http://www.flickr.com/search/*
// ==/UserScript==

trlist = document.getElementsByTagName("tr");
trlen = trlist.length;
noofblocked=0;
for(i=0;i<trlen;i++)
{
 if (trlist[i].hasAttribute("valign") && (trlist[i].getAttribute("valign") == "top"))
 {
 tobematched = trlist[i].innerHTML.toLowerCase();
 if(tobematched.match("sexy") || tobematched.match("nude") || tobematched.match("porn") || tobematched.match("fuck"))
  {trlist[i].style.display = "none"; noofblocked++;}
 }
}
 if(noofblocked>=1)
 {
  tablelist = document.getElementsByTagName("table");
  tablelen = tablelist.length;

  for(i=0;i<tablelen;i++)
  {
   if (tablelist[i].hasAttribute("class") && (tablelist[i].getAttribute("class") == "DetailResults"))
   {
    tablelist[i].innerHTML +=  "<font size=\"1\">" + noofblocked + " IMAGES BLOCKED IN THE PAGE</font>";
   }
  } 


 }
