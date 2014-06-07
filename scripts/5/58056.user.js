// ==UserScript==
// @name          Hi5 Photo Gallery Anti-Saving Fix
// @namespace     http://userscripts.org/users/userscriptfan2009      
// @description	  Fixes the Hi5 photo gallery so you can save photos
// @include       http://hi5.com/friend/photos/*
// @include       http://*.hi5.com/friend/photos/*		
// ==/UserScript==

function removejscssfile(filename, filetype){
 var targetelement=(filetype=="css")? "link" : "none" //determine element type to create nodelist from
 var targetattr=(filetype=="css")? "href" : "none" //determine corresponding attribute to test for
 var allsuspects=document.getElementsByTagName(targetelement)
 for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
  if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
   allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
 }
}

removejscssfile("photo_*.css", "css") //remove all occurences "photo_*.css" on page


