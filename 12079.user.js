// LL auto - LTN Greasemonkey Script
// version 0.4.3
// 09/06/07
//
// ==UserScript==
// @name	  Lynx to Pic V. 0.4.3
// @description	  This script will help flesh out Lynx
// @include	  http://luelinks.net/*
// @include       http://*.luelinks.net/*
// @include	  https://luelinks.net/*
// @include	  https://*.luelinks.net/*
// ==/UserScript==

var allLinks, thisLink;
var url = window.location.href;
var topicnum, postdetail, posttime;
var messages = new Array();

// List of narc sayings. Feel free to add your own, although you'll get different sayings than everyone else.

messages[0] =  <img src="http://i4.luelinks.net/i/n/70ab8ad9bfd11b7102654c212339a20f/lynx.jpg" />;


// If you're on a page that you can read messages on...

if (url.match(/showmessages\.php/) || url.match(/message\.php/) || url.match(/linkme\.php/)) {

// Search through the page for all <a> tags and puts them in allLinks as an array

  allLinks = document.evaluate('//a[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

// Looks through the array of hyperlinks. Goes through backwards 'cause it can mess up if you do it the other way.

  for (var i = allLinks.snapshotLength - 1; i > -1 ; i--) {

// If one of the hyperlinks links to RMR's profile, then...

	thisLink = allLinks.snapshotItem(i);
	if((thisLink.href.match(/profile\.php/)) && (thisLink.href.match(/[0123456789]+/) == 4125)) {

// Process the page to find out the details of RadMR's post. Different pages need to be processed differently

	    if (url.match(/linkme\.php/)) {
		postdetail = thisLink.nextSibling.nextSibling.nextSibling.nextSibling.toString();
            } else if (url.match(/message\.php/)){
	    	postdetail = url;
	    } else {
	    	postdetail = thisLink.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.toString();
	    }

// Finds out the topic number and timestamp of the post; these are used to determine what RadMR post to use

	    posttime = postdetail.slice(postdetail.indexOf("time=") + 5, postdetail.indexOf("time=") + 15);
	    topicnum = postdetail.slice(postdetail.indexOf("topic=") + 6, postdetail.indexOf("topic=") + 12);


// Creates the two elements to insert into the page (RadMR's userbar and message)

	    var Uname = document.createElement("a");
	    var message = document.createElement("div");

// Sets RadMR's userbar and message

	    Uname.href = 'profile.php?user=4125';
	    Uname.innerHTML = 'Lynx';

	    message.className = 'message';
	    message.innerHTML = '<b>' + messages[topicnum * posttime % messages.length] + 
		'</b><br>---<br>Call me Lynxie.</b>';

// Replaces RMR's userbar and Message with RadMR's

	    thisLink.parentNode.parentNode.insertBefore(message, thisLink.parentNode.nextSibling.nextSibling);
	    thisLink.parentNode.parentNode.removeChild(thisLink.parentNode.nextSibling.nextSibling.nextSibling);
	
	    thisLink.parentNode.insertBefore(Uname, thisLink.nextSibling);
	    thisLink.parentNode.removeChild(thisLink);

	    }
	}
}