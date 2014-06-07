// ==UserScript==
// @name          bjauthorkill
// @namespace     http://hedonistlab.com/download/
// @description   Allows selective killfile depending on blog item author for balloon-juice.
// @include       http://www.balloon-juice.com/*
// @include       http://balloon-juice.com/*
// ==/UserScript==

var removeEntirePost = true; // change to false if you want to know he wrote something, but can't bear to read it
							 // if set to true, it will remove everything, including post box and title

var entries		= document.getElementsByTagName('td');

var postEntries	= [];

for(var i = 0; i < entries.length; ++i) {
	if(entries[i].className=="entry_subtitle") {
		if (entries[i].innerHTML.indexOf("By: Michael D.") >= 0) { // change this for the particular author you want to ignore
			postEntries.push(entries[i].parentNode.parentNode);  // creates links to TBODY Node of Michael's posts.
			}		
		}
}

for(var i = 0; i < postEntries.length; ++i) {
	if (removeEntirePost)
	{
		postEntries[i].parentNode.removeChild(postEntries[i]);
	}
	else
	{
	var msgbody = postEntries[i].getElementsByTagName('div');
	for (var j=0; j < msgbody.length; j++) {
		if (msgbody[j].className=="entry_body") {
			msgbody[j].innerHTML = "<p>I Like FairTax!</p>";
			}
		}	
	}
}
