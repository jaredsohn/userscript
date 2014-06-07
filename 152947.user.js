// ==UserScript==
// @name        Torn
// @namespace   torn
// @description Automatically go to next attack detail screen by pressing 'space'.
// @version     1
// @grant none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


//Grab URL
var url = document.URL;

//Check if the URL has the torn string.. if not stop!
if(url.indexOf("torn.com/attacklogs.php?ID") == -1){
	return;
}

//Grab the second object, should be ID
var id = url.split('=')[1]

//Increment..
var newId = parseInt(id) + 1;

//Append new ID to url
var newString = "http://www.torn.com/attacklogs.php?ID=" + newId.toString();

//Capture all keypresses, and if spacebar go to the new window.
$(document).keypress(function(e){
    if(e.which == 32){
    	e.preventDefault();
    	window.location = newString;
    }
});