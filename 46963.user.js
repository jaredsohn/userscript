// ==UserScript==
// @name           Rapidshare Cleanup
// @namespace      freakz
// @description    Cleans Up rapidshares Collectors Zone Section
// @version        0.4
// @include        https://ssl.rapidshare.com/*
// @include        https://rapidshare.com/*
// @include        http://rapidshare.com/*
// @include        http://ssl.rapidshare.com/*
// @include        https://rs*.rapidshare.com/*
// @include        http://rs*.rapidshare.com/*
// ==/UserScript==

// User Options:
var security = 1; // 1 to enable - Removes the security lock from the display
var last_line = 0; // Removes the last line (leave if you use RS Account Manager)

// Global Variables!
var urlsplit = document.URL.split('?');
var prem = urlsplit[0].split('/');

// Removes Privacy Policy, RapidGames, and RapidshareAG stuff from the 
// top menu
var li1 = document.getElementsByClassName('navigation')[0].getElementsByTagName('li');
var i = 0;
while (i < li1.length){
	if (li1[i].getElementsByTagName('div').length != 1){
		switch (li1[i].getElementsByTagName('a')[0].innerHTML){
			case "Privacy Policy":
			case "RapidGames":
			//case "RapidShare AG":
			//case "Support":
			//case "RapidTools":
			//case "Free Zone":
			//case "Premium Zone":
			case "Rewards":
			case "Money":
			//case "News":
				li1[i].parentNode.removeChild(li1[i]);
				i = i - 1;
				break;
			default:
		}
	} else {
		var links = li1[i].getElementsByTagName('a');
		switch (links[links.length-1].innerHTML){
			case "RapidShare AG":
			case "Support":
				li1[i].parentNode.removeChild(li1[i]);
				i = i - 1;
				break;
			default:
		}
		
	}
	i = i+1;
}

//Removing the last border! [Top menu]
var meh = false;
var i3 = li1.length-1;
while (meh == false){
	if (li1[i3].getElementsByTagName('div').length != 1){
		switch (li1[i3].getElementsByTagName('a')[0].innerHTML){
			case "Privacy Policy":
			case "RapidGames":
			case "Support":
			case "Rewards":
			case "Money":
			case "News":
			case "Manage Accounts":
				meh = true;
				i3 = i3 + 1;
				break;
			default:
		}
	} else {
		var links = li1[i3].getElementsByTagName('a');
		switch (links[links.length-1].innerHTML){
			case "Free Zone":
			case "Premium Zone":
			case "RapidShare AG":
			case "Support":
			case "RapidTools":
				meh = true;
				i3 = i3 + 1;
				break;
			default:
		}
	
	}
	i3 = i3-1;
}

li1[i3].style.border = "0px"


// Premium Page Only
// Adds export to submenu
// Removes stuff from submenu (TrafficShare, Logs, New Prem Zone) also 
// places export before logout!!!
if (document.getElementsByClassName("submenue").length){
	var exporty = document.getElementsByClassName("submenue");
	var expo = ""
	var i = 0;
	while (i < exporty[0].getElementsByTagName('a').length){
		switch (exporty[0].getElementsByTagName('a')[i].innerHTML){
			case "View Logs":
			case "TrafficShare":
			case "<nobr>New Premium Zone</nobr>":
				exporty[0].removeChild(exporty[0].getElementsByTagName('a')[i]);
				i = i - 1;
				break;
			default:
		}
		i = i + 1;
	}
	i = 0;
	var lines = exporty[0].innerHTML.split('\n');
	while (i < lines.length){
		if (lines[i].indexOf('</a>') == -1){
			lines[i] = "";
		}
		i = i + 1;
	}
	i = 0;
	while (i < lines.length){
		if (lines[i].indexOf('Logout') != -1)
			expo = expo + "    <a href=\"https://ssl.rapidshare.com/cgi-bin/premiumzone.cgi?export=1\">Export</a> |\n";
		if (lines[i] != ""){
			expo = expo + lines[i] + "\n";
		}
		i = i + 1;
	}
	exporty[0].innerHTML = expo;
	
	if (security == 1){
		if (document.getElementById('schlossbereich')){
			var b = document.getElementById('schlossbereich');
			b.parentNode.removeChild(b);
		}
	}
}