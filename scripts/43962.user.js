// ==UserScript==
// @name           yad2 Google Maps 
// @description    Replace the yad2 Atlas maps with the superior Google Maps.
// @namespace      http://steecky.com
// @include        http://*.yad2.co.il/*
// @include        http://*homeless.co.il/*
// ==/UserScript==

var city;
var street;
var hNum;
var a = document.getElementsByTagName("a");

for (var i = 0; i < a.length; i++) 
	if (a[i].href.indexOf("atlas") != -1) {
		street 		= gup("street", a[i].href);
		city 		= gup("city", a[i].href);
		hNum 		= gup("HouseNum", a[i].href);
		a[i].href 	= "http://maps.google.com/?hl=he&q=" + city + " , " + street + " " + hNum;
	}
	else if (a[i].href.indexOf("showmap.asp") != -1) {
		street 		= gup("Street", a[i].href);
		city 		= gup("City", a[i].href);
		a[i].href 	= "http://maps.google.com/?hl=he&q=" + city + " , " + street;
	}
		
	
	
function gup( name, url ){
  name 			= name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS 	= "[\\?&]"+name+"=([^&#]*)";
  var regex 	= new RegExp( regexS );
  var results 	= regex.exec( url );
  
  if( results == null ) return "";
  else return results[1];
}