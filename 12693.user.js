// ==UserScript==
// @name	  Kewl Monkey
// @description	  This script will change Spartan 117's name to Cool Monkey
// @include	  http://luelinks.net/*
// @include       http://*.luelinks.net/*
// @include	  https://luelinks.net/*
// @include	  https://*.luelinks.net/*
// ==/UserScript==

var allLinks, thisLink;
var url = window.location.href;
var topicnum, postdetail, posttime;
var messages = new Array();

if (url.match(/showmessages\.php/) || url.match(/message\.php/)) {

	topicnum = url.slice(url.indexOf("topic=") + 6, url.indexOf("topic=") + 12);

	allLinks = document.evaluate(
  	'//a[@href]',
	  document,
	  null,
	  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	  null);

	for (var i = allLinks.snapshotLength - 1; i > -1 ; i--) {
	  thisLink = allLinks.snapshotItem(i);
	  if(thisLink.href.match(/profile\.php/))
	  if(thisLink.href.match(/[0123456789]+/) == 10789)
	  {
	    var message = document.createElement("span");
	    var Uname = document.createElement("span");
	
	    Uname.innerHTML = '<a href="profile.php?user=10367">Cool Monkey</a>';
	
	    thisLink.parentNode.insertBefore(Uname, thisLink.nextSibling);
	    thisLink.parentNode.removeChild(thisLink);
	  }
	}
}