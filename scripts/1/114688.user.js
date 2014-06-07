// ==UserScript==
// @name           Hide Cosmo Trolls
// @namespace      net.mindsoup.gs
// @description    Hide posts by trolls on the cosmopolitan.co.uk forums
// @include        http://www.cosmopolitan.co.uk/community/forums/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.js
// @version        1.4
// ==/UserScript==

var myurl = document.URL;
var url_parts = myurl.split("?");
var main_url = url_parts[0]; 

var blocklist = readCookie();

// hide posts by users on blocklist
if(blocklist.length > 0)
	$('#useronline').append('<br />Hiding posts by: ');
	
for(key in blocklist) {
	if(blocklist[key] != '') {
		if(main_url.toLowerCase().indexOf("thread") != -1) {
			// hide posts:
			$('span:contains(' + blocklist[key]  + ')').parentsUntil(".forum_post").parent().hide();
		} else if(main_url.toLowerCase().indexOf("topic") != -1) {
			//here follows the code for hiding threads inside forums:
			var name = blocklist[key];
			
			if(name.length > 10)
				name = name.substring(0,10) + "...";
				
			$('td.author:contains(' + name  + ')').parent().hide();	
		}
		
		// add names to blocklist at the bottom of the page
		appendBlockUser(blocklist[key]);
	}
}

if(main_url.toLowerCase().indexOf("thread") != -1) {
	// add hide user link to each post
	$('.user_info').append('<br /><a href="#" class="link1 hidecosmolink">Hide user</a>');
} 


// bind block onclick function to link
$('.hidecosmolink').bind('click', function(e) { blockUser($(this)) });

// bind unblock onclick function to link
$('.unhidecosmolink').bind('click', function(e) { unblockUser($(this)) });

function appendBlockUser(name) {
	$('#useronline').append('<a href="#" class="link1 unhidecosmolink">' + name + '</a> ');
}

function blockUser(e) {
	var name = e.parent().parent().find('a.link2').html().trim()
	hideUser(name);
	appendBlockUser(name);
	blocklist.push(name);
	setCookie(blocklist);
}

function hideUser(name) {
	$('span:contains(' + name  + ')').parentsUntil(".forum_post").parent().hide();
}

function unblockUser(e) {
	var name = e.html().trim();
	unhideUser(name);
	removeUserFromBlocklist(name);
}

function unhideUser(name) {
	$('span:contains(' + name  + ')').parentsUntil(".forum_post").parent().show();
}

function removeUserFromBlocklist(name) {
	for(key in blocklist) {
		if(blocklist[key] == name) 
			blocklist[key] = '';
	}
	
	setCookie(blocklist);
}

function readCookie() {

	var all_cookies = document.cookie.split( ';' );
	
	for(key in all_cookies) {
		var kvp = all_cookies[key].split('=');
		for(i in kvp) {
			if(kvp[i] == "hidecosmocookie") {
				return kvp[1].split('#');
			}
		}
	}
	
	return new Array();
}

function setCookie(names) {
	var expires = new Date();
	expires.setDate(expires.getDate() + 9001);
	var namestring = "";
	for(key in names) {
		if(names[key] != '')
			namestring = namestring + names[key] + "#";
	}
	
	document.cookie = "hidecosmocookie" + "=" + namestring + ";expires=" + expires.toUTCString() + ";path=/community/forums;domain=cosmopolitan.co.uk";
}

