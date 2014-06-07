// ==UserScript==
// @name           Category+
// @namespace      http://www.warez-bb.org
// @description    A simple script making listings nicer.
// @author         thecodingdude
// @version        1.0.4
// @license        Free to use. May not adapt or use this code to work on Warez-BB 3 without my permission.
// @include        http://www.warez-bb.org/
// @include        http://www.warez-bb.org/index.php* 
// ==/UserScript==

//User options

//Set to false to disable that forum's enhancements.
var listings = true;
var requests = true;
var forum_comments = true;
var offtopic = true;


//Listings forum:
if(listings == true) {
var llinks = document.querySelectorAll('[id="cat_id_5_f-2"] b'); 
for(var i=1; i<llinks.length; i++){ 
  llinks[i].style.display = 'inline-block'; 
  llinks[i].style.width = '48%'; 
  llinks[i].style.lineHeight = '1.2em';
  llinks[i].firstElementChild.style.fontSize = '11px'; 
}
//Disable "sub forums:" text
llinks[0].style.display = 'none';	
}

//Requests forum:
if(requests == true) {
var rlinks = document.querySelectorAll('[id="cat_id_5_f-3"] b'); 	
for(var i=1; i<rlinks.length; i++){ 
  rlinks[i].style.display = 'block'; 
  rlinks[i].style.lineHeight = '1.2em';
  rlinks[i].firstElementChild.style.fontSize = '11px'; 
}
//Disable "sub forums:" text
rlinks[0].style.display = 'none';
	
}

//forum comments forum:

if(forum_comments == true) {
var fclinks = document.querySelectorAll('[id="cat_id_5_f-4"] b'); 	
for(var i=1; i<fclinks.length; i++){ 
  fclinks[i].style.display = 'block'; 
  fclinks[i].style.lineHeight = '1.2em';
  fclinks[i].firstElementChild.style.fontSize = '11px'; 
}
//Disable "sub forums:" text
fclinks[0].style.display = 'none';
	
}

//Offtopic forum:

if(offtopic == true) {
var otlinks = document.querySelectorAll('[id="cat_id_5_f-6"] b'); 	
for(var i=1; i<otlinks.length; i++){ 
  otlinks[i].style.display = 'block'; 
  otlinks[i].style.lineHeight = '1.2em';
  otlinks[i].firstElementChild.style.fontSize = '11px'; 
}
//Disable "sub forums:" text
otlinks[1].style.display = 'none';
	
}

