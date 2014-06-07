// ==UserScript==
// @name           Facebook Chat Logger
// @namespace      robwilliams.me
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @require		http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// ==/UserScript==

/////////////////////////////////////
/// CONFIGURE THESE OPTIONS ////////
////////////////////////////////////

var poll_rate = 60000; // in milliseconds, so 60000 = 60 seconds
var host = "http://speedy.rs/fb_chat/"; // this should be the path to where you uploaded the log_chat.php script to your web server. Make sure this ENDS IN A SLASH.
var hash = "destroyah"; // This can be any string. It must match in PHP script and GM script. It's just so there's a little bit of authentication.

/////////////////////////////////////
/// DON'T MODIFY BELOW HERE ////////
////////////////////////////////////

// timeout of 5 seconds allows page to load and chat window to come up
window.setTimeout(read_chat, 5000);

// global variable we use to cache user info and chat conversations
var table = new Object();

function read_chat() {	
	// regular expression used to extract numbers from strings
	re = /\d+/;

	// get collection of all chat windows that are open
	var snapChats = document.evaluate("//div[contains(@id,'tab_handle_')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	// loop through each chat window, handling them separately
	for (var i = snapChats.snapshotLength - 1; i >= 0; i--) {
	
		// extract ID number that FB uses to identify each person's chat window you have open
		var match = re.exec(snapChats.snapshotItem(i).id);
		var chatid = match[0];

			
		var name, oldcontent;
		// check to see if we already have info on this ID for the session
		if (table[chatid] != undefined) {
			name = table[chatid].name;
			oldcontent = table[chatid].content;
		} else {
			table[chatid] = new Object();
			// otherwise, we don't have user info yet, so use their ID number to get the person's name

alert(document.evaluate("a[@class='chat_header_link']", document.getElementById("tab_handle_" + chatid), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0));

			name = document.evaluate("div[@class='chat_header_name']//a", document.getElementById("tab_handle_" + chatid), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1).innerHTML;
			oldcontent = "";
		}

			
		// get the contents of the chat window (in HTML format)
		var content = document.getElementById("chat_conv_content_" + chatid).innerHTML;
		
		// see if the content (chat window) has changed since last check
		if (content != oldcontent) {
			//alert(name + "'s content changed.");
			process_chat(chatid, name, content);
		} else {
			//alert(name + "'s content the same.");
		}
		
		table[chatid].name = name;
		table[chatid].content = content;
	}
	window.setTimeout(read_chat, poll_rate);
}

function process_chat(chatid, name, content)
{
		GM_xmlhttpRequest({
		  method: "POST",
		  url: host + "log_chat.php",
		  data: "id=" + chatid + "&name=" + name + "&content=" + encodeURI(content) + "&hash=" + hash,
		  headers: {
		    "Content-Type": "application/x-www-form-urlencoded"
		  },
		  onload: function(response) {
			xmlResponse = response.responseText;
			if (/^Error:/.test(xmlResponse)) {
				alert(xmlResponse);
			}
			//alert(xmlResponse);
		  }
		});	
}