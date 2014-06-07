// ==UserScript==
// @name          OKcupid Bangathon 9000[FIXED]
// @namespace     http://copperclad.org
// @description   Visits profiles okc thinks you'd be interested in and it'll never visit the same profile twice. 
// @include       http://*.okcupid.com/*
// @include       https://*okcupid.com/*
// ==/UserScript==

/*
REMEMBER: THIS SCRIPT WILL RUN UNTIL YOU TURN IT OFF

Visits profiles at random time intervals (at least 4 per minute)
*/

function go_to_profile(){
	var new_profile = document.getElementById("section_matches");
	var match = new_profile.childNodes[3];
	var ref = match.childNodes[1];
	var almost = ref.childNodes[1];
	var go = almost.getAttribute("href");
	var link = "http://www.okcupid.com" + go;
	
	//New array for visited profiles
	var visited_profiles = new Array();
	
	//Check to see if any profiles have been visited before
	if (visited_profiles.length > 0){
	   //This for command takes the length of the array "visited_profiles" and counts down
	   //to zero while checking that the variable "go" is not equal to any of the entries
	   //in the array.
	   for(var array_length = visited_profiles.length;array_length >= 0;array_length--){
	       if(visited_profiles[array_length] == go){
	           location.reload();
	           break;
	       }
	       //If profile hasn't been viewed yet, put variable "go" into the
	       //visited profiles array
	       else {
	           visited_profiles.push(go);
	           break;
	       }
	   }
	}
	
	window.location.replace(link);
};


setTimeout(go_to_profile, Math.random()*15000);
