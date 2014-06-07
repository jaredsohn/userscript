// ==UserScript==
// @name           Facebook Refresh
// @description    Reloads Walls, News Feeds, Alerts, and Your Inbox Automatically. Now with auto-poke and message alerts!
// @include        https://apps.facebook.com/*
// @include        https://www.*.facebook.com/*
// @include        https://www.facebook.com/*
// @include        https://www.facebook.com/
// ==/UserScript==

// Refresh Settings
var reload = GM_getValue("reload", 30); // Amount of seconds between reloads
GM_registerMenuCommand("Set Refresh Time", function(){
var time = prompt("Seconds between refreshes:\n(must be greater than 20)", reload/1000);
window.location.reload();
if (time >= 20) {
GM_setValue("reload", time);
reload = GM_getValue("reload", 30);
} else if (time < 20) {
alert('The number must be greater than 20!');
} else {
alert('Must be a number!');
}
});

// Addon Menu Controls
unfuck = GM_getValue("unfuck", false);
if (unfuck == true) {
GM_registerMenuCommand("Turn UnFuck Off", function(){GM_setValue("unfuck", false);window.location.reload();});
unfuck = GM_getValue("unfuck", false);
} else {
GM_registerMenuCommand("Turn UnFuck On", function(){GM_setValue("unfuck", true);});
unfuck = GM_getValue("unfuck", false);
}
highlight = GM_getValue("highlight", false);
if (highlight == false) {
GM_registerMenuCommand("Highlight Inbox", function(){GM_setValue("highlight", true);window.location.reload();});
highlight = GM_getValue("highlight", false);
} else {
GM_registerMenuCommand("Don't Highlight Inbox", function(){GM_setValue("highlight", false);window.location.reload();});
highlight = GM_getValue("highlight", false);
}


// name          Facebook Highlight Inbox Link
// description   Highlights the inbox link if you have new messages.
// Version 0.2 - September 8, 2007
// script        http://userscripts.org/scripts/show/11241
// By Jordon Kalilich - www.theworldofstuff.com

function highlightInbox() {
var inboxLink = document.getElementById('myframe').contentDocument.getElementById('nav_inbox');
    if (inboxLink) {
       if (/\d/.test(inboxLink.innerHTML) == true) {
          inboxLink.style.backgroundColor = 'red';
       }
    }
 }

var title_ch = 0;
function update_title(title) {
// Updates in title so you can just keep the page in tab
// Somebody requested it a long time ago and I finally got around to it
// I was tired of having to check the page

// Messages
navbox = document.getElementById('nav_inbox');
store = parseFloat(GM_getValue("messages", 0));
count = 0;
messages = document.getElementById('messages');
if (messages != null) {
divs = messages.getElementsByTagName("div");
for (var i=0; i<divs.length; i++) {
if (divs[i].className == "message clearfix unread") {
count++;
}
}
}
if ( (navbox.innerHTML.indexOf('(') != -1) || (store != 0) || (count != 0) ) {

if (navbox.innerHTML.indexOf('(') != -1) {
number = navbox.innerHTML.split('(')[1].split(')')[0];
} else {
number = 0;
}

var url = window.location.href;
updated = store + number;

// Make sure that new message alert stays
if (url.match(/readmessage/) != null) {
updated = updated + count;
GM_setValue("messages", updated);
window.addEventListener('focus',function () {
GM_setValue("messages", number);
},false)
}

// Update Title
if (updated == 1) {
document.title = "1 New Message!";
} else if (updated > 1) {
document.title = number+" New Messages!";
}
title_ch = 1;
} else if (title_ch == 1) {
document.title = title;
title_ch = 0;
} else {}

}

// This is a shortened version of my UnFuck Facebook script
// It only cleans the parts of the page that are replaced, which means you will need to install the real deal if you want full functionality
function UnFuck() {
// Make Javascript act more like php in_array
function oc(a)
{
  var o = {};
  for(var i=0;i<a.length;i++)
  {
    o[a[i]]='';
  }
  return o;
}

divs = document.getElementById('myframe').contentDocument.getElementsByTagName("div");
for (var i=0; i<divs.length; i++) {
// Removes a bunch of pointless shit
var class = divs[i].className;
if (class in oc([ 'feed_item clearfix ad_capsule', 'feed_item clearfix social_ad', 'feed_item clearfix gifts_received', 'sidebar_item nextstep']) ) {
divs[i].style.display = "none";
}

if (class == "no_birthdays") {
divs[i].parentNode.parentNode.style.display = "none";
}
}



// Remove apps in the News Feed
if (url.match(/home/i) != null) {
var feed = document.getElementById('myframe').contentDocument.getElementById('page_body');
var links = feed.getElementsByTagName("a");
for (var i=0; i<links.length; i++) {
if(links[i].href.indexOf('app_id') != -1) {
links[i].parentNode.parentNode.style.display = "none";
}
if(links[i].href.indexOf('stories.php?filter=29') != -1) {
links[i].parentNode.parentNode.style.display = "none";
}
}
}

var sidebar = document.getElementById("sidebar");
sidebar.style.height = document.defaultView.getComputedStyle(document.getElementById("widebar"),null).getPropertyValue("height").split('px')[0] - 115 + 'px';
document.getElementById("sidebar_content").style.height = "100%";

}
function auto_poke() {
// name          Facebook Poke O' Matic
// version       1.5
// author	 John Watson
// url           http://userscripts.org/scripts/show/10177

//Facebook Auto Poke is Copyright (C) 2007. John Watson <wizputer@wizputer.net>
//This is a modified version to work with Facebook Refresh
//Permission for use of this code has been granted by John Watson

// Enable this to get some console messages
var DEBUG = 0;

/******** GLOBALS ********/
// Values aren't based on any fact, suggestions would be appreciated
var MAX_POKES = GM_getValue("fb_max_pokes");
if (MAX_POKES == null) {
	MAX_POKES = 100;
	GM_setValue("fb_max_pokes",100);
}

// In seconds for accuracy
var MAX_TIME = GM_getValue("fb_max_time");
if (MAX_TIME == null) {
	MAX_TIME = 60 * 60 * 24; //24 hours
	GM_setValue("fb_max_time", MAX_TIME);
}

var AUTO_POKE = GM_getValue("fb_auto_poke");
if (AUTO_POKE == null) {
	AUTO_POKE = 0; // Off
	GM_setValue("fb_auto_poke", 0);
}

	POKE_STATS = 0; // Disabled
	GM_setValue("fb_poke_stats",0);

// Holder for my FaceBook ID
if (document.getElementById('user') != null) {
var MY_ID = document.getElementById('user').value;
}

/******** FUNCTIONS ********/

// Retrieves pokers from sidebar and stores information into array, while adding the Poke All button and checkbox
// If there any pokers and either AUTO_POKE is on or user said to poke, pop up dialog stating number of people being poked and pass the array of info
// and update the number of pokes counter
// If at the set poke limit, show dialog asking if user wants to continue to poke or not

function getPokes(nomax,act){
	var pokeInfo;
	var date = new Date();
	// Get current time from 1/1/1970 in seconds
	var time = Math.floor(date.getTime()/1000);
	// Get current number of pokes if time period hasnt elapsed, if it has reset to 0
	var curNumPokes = (GM_getValue("fb_pokeEnd")>time)?GM_getValue("fb_numPokes"):0;
	pokeInfo = new Array();

	// Seperate document into divs
	var divs = document.getElementsByTagName("div");
	var pokesSection;
	// Go through each one
	for (var i = 0; i < divs.length; i++) {
		// Find the pokes sidebar item
		if (divs[i].getAttribute("class") == "sidebar_item pokes") {
			pokesSection = divs[i].getElementsByTagName("div");
			if (divs[i].getAttribute("id")!="pokes") {
				// Add an id to the Pokes section to easily hide it
				var idAttr = document.createAttribute("id");
				idAttr.nodeValue = "pokes";
				divs[i].setAttributeNode(idAttr);
			}
			break;
		}
	}

	if (pokesSection != undefined) {
		for (var i = 0; i < pokesSection.length; i++) {
			// Find the pokers
			if (pokesSection[i].getAttribute("class") == "ind_poke") {
				// Add them into an array
				pokeInfo.push(pokesSection[i]);
			// Find the body
			} else if (pokesSection[i].getAttribute("class") == "sidebar_item_body") {
				var pokesBody = pokesSection[i].getElementsByTagName("div");
				// Add the Poke All button and checkbox if they dont exist
				if (pokesSection[i].innerHTML.indexOf('Poke All') == -1) {
					pokesSection[i].innerHTML += '<form><table><tr>' +
						'<td><input class="inputsubmit" type="button" id="poke_all" value="Poke All" /></td>' +
						'<td><input id="auto_poke" type="checkbox" ' + ((AUTO_POKE)?'CHECKED':'') + '></td>' +
						'<td><label for="auto_poke">Auto Poke All</label></td></tr>' +
						'<tr><td id="poke_counter" colspan=3>Poke counter: ' + curNumPokes + '/' + MAX_POKES + ' pokes.</td></tr></table></form>';
				}
			// Find the header, and add the hide button if the pokes id doesnt exist (meaning it already hasnt been added)
			} else if (pokesSection[i].getAttribute("class") == "sidebar_item_header clearfix" && pokesSection[i].innerHTML.indexOf('hide_pokes') == -1) {
				pokesSection[i].innerHTML += '<div class="option"><a href="#" id="hide_pokes">hide</a></div>';
			}
		}

		// If we have someone to poke, and user said to or auto poke is enabled
		if (pokeInfo.length && (act || AUTO_POKE)) {
			var dialog = new unsafeWindow.pop_dialog();
			var newNumPokes = 0;
			// If we haven't reached our max pokes yet, or if user already said to disregard the limit
			if (((newNumPokes = (curNumPokes + pokeInfo.length)) < MAX_POKES) || nomax) {
				// Get the post form id from the hidden field
				var post_form_id = document.getElementById('post_form_id').value;
				var pokedPage = "";

				// Update the number of people poked for limit
				updatePokes(pokeInfo.length);

				// Start poking
				poke(post_form_id,pokeInfo,pokedPage,dialog);

				// Update counter
				updateCounter(newNumPokes,MAX_POKES);
			// Reached or going to reach limit by poking everyone
			} else {
				// Ask user to disregard the limit
				dialog.show_choice("Max pokes reached!","Disregard max and poke anyways?","Yes",function(){getPokes(1,1);},"No",function(){dialog.fade_out(500, 1100);},"","Reset Counter",function(){resetCounter(); dialog.fade_out(500, 1100);});
			}
		}
	} else {
		insertPokesSection();
	}

	return false;
}

// Go through the pokeInfo array and poke everyone
function poke(post_form_id,pokeInfo,pokedPage,dialog){
	// There are still people left to poke
	if (pokeInfo.length > 0) {
		// Get next person to poke
		var div = pokeInfo.pop();
		// Seperate into anchor tags
		var hrefs = div.getElementsByTagName("a");
		// Get the poker ID
		var pokeId = hrefs[1].href.match(/id=(\d*)/)[1];
		// Get the url to send poke to
		var postUrl = hrefs[1].href.match(/http:\/\/(.*\.)facebook\.com/)[0] + "/poke.php";
		// Create string to send to poke.php
		var pokepost = "post_form_id=" + post_form_id + "&id=" + pokeId + "&confirmed=1&pokeback=1";

		// Thanks to EZPoke (Lukas Fragodt & Mike Soh) for the onload and onerror functions
		GM_xmlhttpRequest(
			{
			method:'POST',
			url:postUrl,
			headers:
				{
				'User-Agent':window.navigator.userAgent,
				'Content-Type':'application/x-www-form-urlencoded',
				},
			data:pokepost,
			onload: function(res) {
				// OK
				if (res.status == 200) {
					if (res.responseText.indexOf('has not received your last poke yet') != -1) {
						// Remove Poke and Remove links and replace with "Poked before!"
						hrefs[1].removeAttribute('href');
						hrefs[1].innerHTML = 'Poked before!';
						hrefs[2].removeAttribute('href');
						hrefs[2].innerHTML = '';
						if (DEBUG) GM_log(hrefs[0].innerHTML + ' has not received your last poke');
					} else if (res.responseText.indexOf('You have poked') != -1) {
						// Remove the person we poked
						remove(div);
						// If Poke Stats logging is enabled, log the poke
						if (POKE_STATS) pokeStatsLog(pokeId);
						if (DEBUG) GM_log(hrefs[0].innerHTML + ' poked!');
					// Unkown response
					} else {
						// Remove Poke and Remove links and replace with "Poke failed!"
						hrefs[1].removeAttribute('href');
						hrefs[1].innerHTML = 'Poke failed!';
						hrefs[2].removeAttribute('href');
						hrefs[2].innerHTML = '';
						if (DEBUG) GM_log('Unkown reponse: ' + res.responseText);
					}
				// Received not OK status
				} else {
					// Remove Poke and Remove links and replace with "Poke failed!"
					hrefs[1].removeAttribute('href');
					hrefs[1].innerHTML = 'Poke failed!';
					hrefs[2].removeAttribute('href');
					hrefs[2].innerHTML = '';
					if (DEBUG) GM_log('Poke failed, not OK response - status received: ' + res.status);
				}
			},
			onerror: function(res) {
				// Remove Poke and Remove links and replace with "Poke failed!"
				hrefs[1].removeAttribute('href');
				hrefs[1].innerHTML = 'Poke failed!';
				hrefs[2].removeAttribute('href');
				hrefs[2].innerHTML = '';
				if (DEBUG) GM_log('Unkown error when poking. Status: ' + res.status + ' Text: ' + res.statusText);
			}
		});


		// Wait 100 milliseconds before doing next poke
		setTimeout(poke,100,post_form_id,pokeInfo,pokedPage,dialog);
	// No one left to poke
	}

	return false;
}

// Insert own poke section
function insertPokesSection() {
	var date = new Date();
	var time = Math.floor(date.getTime()/1000);
	// Get the current number of pokes
	var curNumPokes = (GM_getValue("fb_pokeEnd")>time)?GM_getValue("fb_numPokes"):0;
	// Our poke all button, check box and poke counter
	var pokeSidebar = '<form><table><tr><td><input class="inputsubmit" type="button" id="poke_all" value="Poke All" /></td><td><input id="auto_poke" type="checkbox" ' + ((AUTO_POKE)?'CHECKED':'') + '></td><td><label for="auto_poke">Auto Poke All</label></td></tr><tr><td id="poke_counter" colspan=3>Poke counter: ' + curNumPokes + '/' + MAX_POKES + ' pokes.</td></tr></table></form>';
	// Our own "pokes" section
	var pokeSection = '<div id="pokes" class="sidebar_item pokes"><div class="sidebar_item_header clearfix"><h2><span>Pokes</span></h2><div class="option"><a href="#" id="hide_pokes">hide</a></div></div><div class="sidebar_item_body">' + pokeSidebar + '</div></div>';

	// Find the alerts section and insert at the top
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++ ) {
		if (divs[i].getAttribute("class") == "alerts") {
			divs[i].innerHTML = pokeSection + divs[i].innerHTML;
			break;
		}
	}

	return false;
}

// Hide own poke section
function hidePokes() {
	remove(document.getElementById("pokes"));

	return false;
}

// Update our poke counter
function updatePokes(num) {
	var date = new Date();
	// Get current time since 1/1/1970 in seconds
	var time = Math.floor(date.getTime()/1000);
	// Get the current values
	fb_pokeEnd = GM_getValue("fb_pokeEnd");
	fb_numPokes = GM_getValue("fb_numPokes");
	// If none exist yet, create it
	if (fb_pokeEnd == null) {
		GM_setValue("fb_pokeEnd", (fb_pokeEnd=(time + MAX_TIME)));
	}
	if (fb_numPokes == null) {
		GM_setValue("fb_numPokes", (fb_numPokes=0));
	}

	// If we haven't reached the end of the time period
	if (fb_pokeEnd > time) {
		// Add the pokes to the counter
		GM_setValue("fb_numPokes", (fb_numPokes+num));
	// If time period has already elapsed
	} else {
		// Reset both values to current values
		GM_setValue("fb_numPokes", num);
		GM_setValue("fb_pokeEnd", (time + MAX_TIME));
	}
}

// Update the poke counter
function updateCounter(curPokes,maxPokes) {
	document.getElementById("poke_counter").innerHTML = 'Poke counter: ' + curPokes + '/' + maxPokes + ' pokes.';
}

// Reset the poke counter
function resetCounter() {
	GM_setValue("fb_numPokes",0);
	updateCounter(0,MAX_POKES);
}

// Toggle auto poking
function autoPoke() {
	var auto_poke = GM_getValue("fb_auto_poke");
	GM_setValue("fb_auto_poke",(auto_poke?0:1));
}

// http://wiki.greasespot.net/Code_snippets#Remove_DOM_node
function remove(element) {
	console.log("Removed:");
	console.log(element.parentNode);
	element.parentNode.removeChild(element);
}

// Event listener for Poke All button, check box and hide button
function listen_poke_click(e) {
	if (e.target) {
		if (e.target.id) {
			switch(e.target.id) {
				case "poke_all":
					getPokes(0,1);
					break;
				case "auto_poke":
					autoPoke();
					break;
				case "hide_pokes":
					hidePokes();
					break;
			}
		}
	}
}

// Change the poke limit settings
function changePokeLimit() {
	var max_time;
	// Do this until a number is entered
	do {
		max_time = prompt("Number of seconds before resetting poke counter:",MAX_TIME);
	} while (isNaN(max_time = parseInt(max_time)));

	var max_pokes;
	// Do this until a number is entered
	do {
		max_pokes = prompt("Max pokes per time period:",MAX_POKES);
	} while (isNaN(max_pokes = parseInt(max_pokes)));

	alert("Limit is now - " + max_pokes + " every " + (max_time/60/60) + " hours (" + max_time + " seconds)");

	GM_setValue("fb_max_time",max_time);
	GM_setValue("fb_max_pokes",max_pokes);
}

// Display current poke limit
function currentPokeLimit() {
	alert(MAX_POKES + " every " + (MAX_TIME/60/60) + " hours (" + MAX_TIME + " seconds)");
}

// Listen for clicks, send event into to listen_poke_click function
window.addEventListener('click',listen_poke_click, true);

// Start script
getPokes(0,0);
}

// Facebook Refresh
function refresh_page() {
var client = new XMLHttpRequest();
client.open("GET", url);
client.send(null);
client.onreadystatechange = function () { 
if (client.readyState==4)
  {
  if (client.status==200)
    {
myframe = document.getElementById('myframe');
document.getElementById('myframe').contentDocument.open();
// Get Body HTML
html = client.responseText.split(/<body[^>]*>((?:.|\n)*)<\/body>/i)[1];
/*
tag = "script";
regexp= new RegExp ("<" + tag + "[^.]*\/" + tag + ">", "gi");
html = html.replace(regexp,"");
*/
myframe.contentDocument.write(html);
// wtf did he just use document.write? yes I did, leave me alone.
if (unfuck == true) {
UnFuck();
}
if (highlight == true) {
highlightInbox();
}
if (myframe.contentDocument.getElementById('wall_posts')) {
document.getElementById('wall_posts').innerHTML = myframe.contentDocument.getElementById('wall_posts').innerHTML;}
if (document.getElementById('home_main')) {
document.getElementById('home_main').innerHTML = myframe.contentDocument.getElementById('home_main').innerHTML;}
if (document.getElementById('home_sidebar')) {
document.getElementById('home_sidebar').innerHTML = myframe.contentDocument.getElementById('home_sidebar').innerHTML;}
if (myframe.contentDocument.getElementById('navigator')) {
document.getElementById('nav_inbox').innerHTML = myframe.contentDocument.getElementById('nav_inbox').innerHTML;}
if (myframe.contentDocument.getElementById('megaboxx')) {
document.getElementById('megaboxx').innerHTML = myframe.contentDocument.getElementById('megaboxx').innerHTML;}
if (myframe.contentDocument.getElementById('messages')) {
document.getElementById('messages').innerHTML = myframe.contentDocument.getElementById('messages').innerHTML;}
if (myframe.contentDocument.getElementById('photocomment')) {
document.getElementById('photocomment').innerHTML = myframe.contentDocument.getElementById('photocomment').innerHTML;}
myframe.contentDocument.close();
myframe.src = "about:blank";
title = client.responseText.split(/<title[^>]*>((?:.|\n)*)<\/title>/i)[1];
update_title(title);
if (url.match(/home/i) != null) {
auto_poke();
}
  }
  }
};
setTimeout(function () { refresh_page(); }, reload);
}

function get_url() {
url = window.location.href;
if (window.location.hash != null) {
url = url.split('#')[0];
}
var url = url + "#refresh";
return url;
}

if (self.location == top.location) {
var url = get_url();
var myframe = document.createElement('iframe');
myframe.src = "about:blank";
myframe.width = "10";
myframe.height = "10";
myframe.id = "myframe";
myframe.style.display = "none";
document.body.appendChild(myframe);
reload = reload * 1000;
if (url.match(/home/i) != null) {
auto_poke();
}
setTimeout(function () { refresh_page(); }, reload);
}