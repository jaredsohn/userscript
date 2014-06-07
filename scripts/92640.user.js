// Invisibility Cloak
// version 0.1
// Gina Trapani
// 2006-01-03
// Released to the public domain.
//
// ==UserScript==
// @name          Modified Invisibility Cloak
// @description   Turns time-wasting web pages invisible until a specified time of day.
// @include       http://flickr.com/*
// @include       http://*.flickr.com/*
// @include       http://metafilter.com/*
// @include       http://*.metafilter.com/*
// @include	  http://*.facebook.com/*
// @include	  http://*.twitter.com/*

// ==/UserScript==
//
// ==RevisionHistory==
// Version 0.1:
// Released: 2006-01-03.
// Initial release.
//
// Version 0.2
// Released 2010-12-13
// by Dan Fishman
// allows surfing on "invisible" sights for one hour after each number in the 
// surfHours array 
// ==/RevisionHistory==



(function () {
// EDIT THE NEXT LINE TO SET THE HOUR AFTER WHICH SITES SHOULD APPEAR
// HOURS IN MILITARY TIME, SO 15 = 3PM
 
     var surfHours=[9,13,17];
     var tstamp = new Date();
     var hours=tstamp.getHours();
     var okToView=false;
	
     for(var x=0;x<surfHours.length;x++){
        //alert("hours=="+hours+" sh="+surfHours[x]);
	   if(hours-surfHours[x]==0){
            okToView=true;
        }
     }
     if (!okToView){
	var b = (document.getElementsByTagName("body")[0]);
	b.setAttribute('style', 'display:none!important');
	//The alert gets irritating on sites that link back to facebook 5 times.
        //alert("You can surf from 9-10, 1-2 and after 5");
	}

})();
