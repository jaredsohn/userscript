// ==UserScript==
// @name           Twitter Auto Complete
// @namespace      TwitterAuto
// @description    Autocomplete your twitter contact mid-tweet
// @include        http://twitter.com
// @include        http://twitter.com/*
// ==/UserScript==


// as soon as the page loads, we need to fetch our friend's contact list

var friends=[];
var sniff=false;
var	twit="";

var lastlength = 1;

function $(x) { return document.getElementById(x); }

function getMoreFriends(page) {
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://twitter.com/statuses/friends.json?page=' + page,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        newfriends=eval(responseDetails.responseText);
		for(var x=0; x < newfriends.length; x++) {
			friends.push(newfriends[x]);
		}
		lastlength = newfriends.length;
		if (lastlength) {
		  console.log("So far, got " + friends.length + " friends");
			getMoreFriends(page+1);
		} else {
			console.log("Total friends is " + friends.length);
		}
	}
});
}

getMoreFriends(1);

function matchtwit (twit, friendlist){
	var names = [];
	var status = document.getElementById("status");
	for (var x = 0; x < friendlist.length; x ++){
		var sname = friendlist[x].screen_name.toLowerCase();
		// console.log("Comparing " + sname + " to " + twit);
		if (twit.length <= sname.length && sname.indexOf(twit)===0){
			console.log(friendlist[x].screen_name);
			names.push(friendlist[x].screen_name);
		}
	}
	if (names.length > 1) {
		$('home').appendChild(makeDropDown(names));
	} else if (names.length == 1) {
	  sniff = false;
	  status.value = status.value + names[0].substring(twit.length, names[0].length); 
	  twit = "";
	  purgeOldDiv();
  }
	// return false;
}

function purgeOldDiv() {
   if (document.getElementById("magic-dropdown")) {
    var oldDiv = document.getElementById("magic-dropdown");
    oldDiv.parentNode.removeChild(oldDiv);
    delete(oldDiv); 
  }
}

function makeDropDown(names) {
  purgeOldDiv();
	var newDiv = document.createElement("div");
	for (var x=0; x<names.length; x++) {
		var span = document.createElement("div");
		var spoo = document.createTextNode(names[x]);
		span.appendChild(spoo);
		newDiv.appendChild(span);
	}
	newDiv.setAttribute("style", "position: absolute; left: 20px; top: 100px;");
	newDiv.id = "magic-dropdown";
	return newDiv;
}

document.getElementById("status").addEventListener("keyup", function(event) {
    // event.target is the element that was clicked
	// check to see if it is registering a key stroke:	alert("got a key press");
	var pressed = String.fromCharCode(event.which).toLowerCase();
//	console.log("Event char seems to be: " + pressed);
//	console.log("Event has which of " + event.which);
//	console.log("Event has keyCode of " + event.keyCode);
//	console.log("Event has charCode of " + event.charCode);
//	console.log("Event has shiftKey of " + event.shiftKey);
	// '===' is a type-safe match equal to zero
	if(event.which===32 || event.which===13)  {
		console.log("Found a space, stop sniffing.")
		sniff=false;
		twit="";
		purgeOldDiv();
	}
	
	if(event.which===8){
		console.log("Found a backspace, trimming a character off twit");
		if (twit == "") {
		  sniff = false;
		  purgeOldDiv();
	  }
		twit=twit.substring(0,twit.length-1);
		
		return;
	}
	
	if (sniff==true && event.which > 0 && event.which != 16 && !event.shiftKey && !event.metaKey){
		twit+=pressed;
		console.log(twit);
		matchtwit(twit, friends);
	}	
	
	if ((event.which == 0 || event.which == 50) && event.shiftKey){
		console.log("Found an @, start sniffing.")
		sniff=true;
	}
	

}, false);