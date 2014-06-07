// ==UserScript==
// @name        MiniTroopersBot
// @namespace   DeathBySquirrel
// @include     http://*.minitroopers.com/hq
// @include     http://*.minitroopers.com/b/*
// @version     1
// ==/UserScript==

//----------------------UserSettings(EDIT THESE FOR YOUR PLAYER)---------------------------------------------
var yourName = ""; // Add your username here
var target = ""; // Find an easy to beat player (or a friend you want to attack a lot)

if(yourName == "" || target == ""){alert("Please enter your ID and your chosen target into the script")}

//----------------------ScriptSettings(Ignore these)-----------------------------------------------------------------------
var extra = yourName.length;
var address = window.location.href;
var section;
var s;

//-----------------Starts attacks, missions and raids-----------------------------------------------------------------------------------
if ( address == "http://" + yourName + ".minitroopers.com/hq") {
	for  (var i = 0; i < document.links.length; i++) {
		s = document.links[i].href;
		section = s.substr(27 + extra, 3);
		if (section == "mis"){
			window.location.href = s;
		}
		if (section == "rai"){
			window.location.href = s;
		}
		if (section == "opp"){
			window.location.href = s;
		}
	}
}

//-----------------Attacks selected target----------------------------------------------------------------------------------
if ( address == "http://" + yourName + ".minitroopers.com/b/opp") {
	var all = document.getElementsByTagName('input');
	for (var i = 0; i < all.length; i++) {
		var current = all[i];
		if (current.type == 'text') {
			current.value = target;
			current.form.submit()
		}
	}
}

//-----------------Back to HQ--------------------------------------------------------------------------------------------------
section = address.substr(27 + extra, 5);
if ( section == "fview") {
	window.location.href = "http://" + yourName + ".minitroopers.com/hq";
}
if ( address == "http://" + yourName + ".minitroopers.com/b/view/raid") {
	window.location = "http://" + yourName + ".minitroopers.com/hq";
}
if ( address  == "http://" + yourName + ".minitroopers.com/b/view/miss1") {
	window.location = "http://" + yourName + ".minitroopers.com/hq";
}
if ( address  == "http://" + yourName + ".minitroopers.com/b/view/miss2") {
	window.location = "http://" + yourName + ".minitroopers.com/hq";
}
if ( address  == "http://" + yourName + ".minitroopers.com/b/view/miss3") {
	window.location = "http://" + yourName + ".minitroopers.com/hq";
}

