// ==UserScript==
// @name           Flickr : Link to user's images in their groups
// @namespace      http://www.panix.com/~eli/
// @description    On profile pages, include links to find that user's images in each of their groups. Based on Flickr: Show all images by Stephen Fernandez aka Steeev.
// @author         Eli the Bearded 
// @include        http://www.flickr.com/people/*/
// ==/UserScript==


(function() {


  // Find first userid associated with a buddyicon
  tds=document.getElementsByTagName('td');
  for (i=0;i<tds.length;i++) {
   if (tds[i].getAttribute('class')=='Buddy') {
     if (!tds[i].innerHTML.match("buddyicon.jpg#"))
       userid=tds[i].innerHTML.split("/buddyicons/")[1].split('\.jpg')[0];
     else 
       userid=tds[i].innerHTML.split("buddyicon.jpg#")[1].split('"')[0];

     break;
   }
  }


lis=document.getElementsByTagName('li');

   // alert("li(s): " + lis.length);
// skip first few to avoid top menu group link
for (i=7;i<lis.length;i++) 
 if (lis[i].innerHTML.match(/groups/)) {
   // remove any NEW stuff before group name, then strip out close of anchor
   grouplink=lis[i].innerHTML.split("<a href=")[1].split('/">')[0];
   lis[i].innerHTML+= "<a href=" + grouplink + "/pool/" + userid + "/\">▣</a>";
 }



})();
