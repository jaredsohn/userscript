// ==UserScript==
// @name        Springpad No Friends' Stuff
// @namespace   http://bcable.net/
// @version     1.1
// @description Removes "Friends' Stuff" notepad if you don't use it because
//              it's clearly in the way.
// @include     http://springpadit.com/springpad/*
// @copyright   2011, Brad Cable
// @license     Modified BSD: http://bcable.net/license.php
// ==/UserScript==

window.addEventListener("load", function(){
	// immediately remove notebook
	function remove_friendsstuff(){
		var notebooks = document.body.getElementsByTagName("li");
		notebooks[1].parentNode.removeChild(notebooks[1]);
	}

	// set interval to make sure it exists
	function remove_interval(){
		var interval = setInterval(function(){
			var notebooks = document.body.getElementsByTagName("li");
			if(notebooks.length >= 2){
				remove_friendsstuff();
				clearInterval(interval);
				console.log("CLEAR");
			}
			else console.log("NOT");
		}, 500);
	}

	// do remove now
	remove_interval();

	// set up home button to trigger removing notebook
	var interval = setInterval(function(){
		var button = document.getElementsByClassName("button-home");
		if(button.length > 0){
			button[0].addEventListener(
				"click", remove_friendsstuff, false
			);
		}
	}, 500);
}, false);
