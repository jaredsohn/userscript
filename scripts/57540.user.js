// ==UserScript==
// @name           Remove Facebook Apps Notification
// @namespace
// @description    Removes notifications of the specified applications from Facebook feed
// @include        http://www.facebook.com/*
// @include        http://www.new.facebook.com/*
// @exclude        http://www.facebook.com/*.js
// @exclude        http://www.new.facebook.com/*.js
// @version        1.0 - 12th Sep 2009
// ==/UserScript==
 
// Written by Umar Mustafa
// Comments, suggestions welcome: umarmustafa@gmail.com


// List of app names to be blocked. These are the names that appear in the url in the notifications links. E.g. http://apps.facebook.com/onthefarm/
// There should be No Spaces. Only comma separated
var blackList = "onthefarm,poker,inthemafia";

var blackListArr = blackList.split(',');
var blockIt;
function cleanUpPage() {

	var nodes=document.getElementsByClassName('UIStory'); 
	
	for ( var i = 0; i < nodes.length; i++ ) {

		var sHTML = nodes[i].innerHTML;
		blockIt = false;

		for (var j = 0 ; j < blackListArr.length ; j++)
		{
			if ( sHTML.match("/"+blackListArr[j]) ) {
				blockIt = true;
			}
		}
		
		if(blockIt) {
			nodes[i].style.display = 'none';
		}
	}
}
 
window.addEventListener("load",
	function() {
		t = setInterval(cleanUpPage, 2000);
	}
	, false);
