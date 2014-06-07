// ==UserScript==
// @name        Facebook Chat with Online First
// @namespace   net.uoco.dev.facebook.fixes
// @include     http://www.facebook.com/*
// @include     https://www.facebook.com/*
// @require     http://code.jquery.com/jquery-2.1.0.min.js
// @grant       none
// ==/UserScript==

css = "<style>.fbSidebarGripper{display:none !important}\
.moreOnlineFriends{display:none !important}\
.fbChatOrderedList{padding-top:2px !important}\
.fbDockChatTabFlyout{height:400px !important}\
#ChatTabsPagelet .fbNub.opened{width:320px !important}</style>";
$("head").append(css);

var sort_name_after_status = function(a, b) {	
	return a.name > b.name;	
};

setInterval(function() {
	var contacts = $(".fbChatOrderedList ul li").detach();
	var online = [];
	var offline = [];	
	for (var i = 0; i < contacts.length; i++) {
		var contact = $(contacts[i]);
		var status_area = contact.find("a > div > div:nth-child(2)");
		var status_text = status_area.find(" > div > div:nth-child(2)");
		var status = $.trim(status_text.text().toLowerCase());
		var name_text = contact.find("a > div > div:nth-child(3)");
		var name = $.trim(name_text.text().toLowerCase());
		if (status === "web" || status === "mobile")
		     online.push({ name: name, contact: contact });
		else offline.push({ name: name, contact: contact });
	}	
	online.sort(sort_name_after_status);
	offline.sort(sort_name_after_status);	
	for (var i = 0; i < online.length; i++) 
		online[i] = online[i].contact;
	for (var i = 0; i < offline.length; i++) 
		offline[i] = offline[i].contact;
	var dest_list = $(".fbChatOrderedList ul:first-child");
	dest_list.append(online);
	dest_list.append(offline);	
}, 500);

// new messages popup doesn't work so take to page
$("#fbMessagesJewel").on("click", function() {
	window.location = "/messages/";
	return false;
});