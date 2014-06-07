// Facebook Join SoM script
// version 0.2 BETA!
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Facebook Join SoM
// @namespace     http://server.brabec.com/gm/
// @description   add Join SoM link above send a message on profile pages
// @include       http://facebook.com/*
// @include       http://www.facebook.com/*
// ==/UserScript==

// locate a tag like this
//    <a href="/gigaboxx/dialog/MessageComposer.php?id=1234567543" class=" profile_action actionspro_a" id="profile_action_send_message" rel="dialog">Send Ron a Message</a>
// parse the id= out
// after this tag, add a similar link to 
//    http://apps.facebook.com/schoolofmagic/join/#ID#

// Get element by id
function $(element) { return document.getElementById(element); }

function addJoinLink(e) {
    var sendatag = $('profile_action_send_message');
    if (!sendatag) { return; }
    // extract id number from message link
    var id=0;
    var matches = /id=(\d+)/.exec(sendatag.href);
    if (matches && matches[1]) {
        id=matches[1];
    }
    // create join link and insert it
    var linktext = document.createTextNode('Join House in SoM');
    var joinurl = 'http://apps.facebook.com/schoolofmagic/join/' + id;
    var joinlink = document.createElement('a');
    joinlink.href = joinurl;
    joinlink.setAttribute('class', ' profile_action actionspro_a');
    joinlink.setAttribute('id', 'profile_action_join_som');
    joinlink.appendChild(linktext);
    sendatag.parentNode.insertBefore(joinlink, sendatag);
    // create remove link and insert it
    linktext = document.createTextNode('Remove from Friends');
    joinurl = '/ajax/profile/removefriendconfirm.php?uid=' + id;
    joinlink = document.createElement('a');
    joinlink.href = joinurl;
    joinlink.setAttribute('class', ' profile_action actionspro_a');
    joinlink.setAttribute('id', 'profile_action_remove_friend');
    joinlink.setAttribute('rel', 'dialog-post');
    joinlink.appendChild(linktext);
    sendatag.parentNode.insertBefore(joinlink, sendatag);
    
    // muck the id so we won't ever insert more than one link
    sendatag.setAttribute('id', 'profile_action_send_mess');
}

// magic to make the load work on ajax replacements...

// Re-run my code when the page changes
function process() {
  $('content').removeEventListener('DOMNodeInserted', process, false);
  setTimeout(addJoinLink, 0);
  $('content').addEventListener("DOMNodeInserted", process, false);
}

// Wait for Facebook's content element to exist
if (self.location == top.location) var checker=setInterval(function(){
    if($('content')) {
      clearInterval(checker);
      process(); // Start the listener
    }
  }, 200);

