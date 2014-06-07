// ==UserScript==
// @name          Twitter Mention Link 
// @namespace     http://skagedal.wordpress.com/twitter/
// @description   On a Twitter user page, add a link to a search for mentions of that users. You stalker. 
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// ==/UserScript==

// This code is ugly but works.

function add_action(li_element) {
	var prof = document.getElementById("profile_actions");
	var id = /sidebar_actions_for_user_[\d]+/.exec(prof.innerHTML)[0];
	var ul = document.getElementById(id);

	ul.appendChild(li_element);
}

function create_mention_element() {
	var twitname = /\/\/twitter.com\/([A-Za-z0-9_]+)/.exec(location.href)[1];
	var li = document.createElement('li');
	var a = document.createElement('a');
	a.setAttribute('href', 'http://search.twitter.com/search?q=%40' + twitname);
	var text = document.createTextNode('mentions');
	a.appendChild(text);
	li.appendChild(a);
	li.appendChild(document.createTextNode(' of ' + twitname));
	
	return (li);
}

add_action(create_mention_element());
