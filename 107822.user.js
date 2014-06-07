// ==UserScript==
// @name           Mute in dabr
// @namespace      http://mattstow.com/dabr
// @description    Mutes various keywords, users and applications from dabr
// @include        http://*dabr.co.uk/*
// ==/UserScript==
// Version 1.0.4

// Edit your mute filters here. Separate entries with a |. Escape special characters, like "." with a "\" like so "\."

var mute = {
	
	users: /username1|username2|etc/gi,
	
	apps: /app1|app2|etc/gi,
	
	text: /text1|#text2|etc/gi
	
};


// Do not edit below this line

var tweets = document.getElementsByClassName('tweet');
var user, app, as, status;
var matches = [tweets.length];

var tags = /<b>.*<\/b>|<a.*?>.*?<\/a>|<br>|<small>.*<\/small>/gi;

var you = new RegExp(document.getElementsByClassName('menu')[0].getElementsByTagName('b')[0].getElementsByTagName('a')[0].innerHTML, 'gi');

for (var i=0; i<tweets.length; i++) {
	matches[i] = false;
	
	user = tweets[i].getElementsByTagName('b')[0];
	user = user.getElementsByTagName('a')[0].innerHTML;
	
	as = tweets[i].getElementsByTagName('a').length-1;
	app = tweets[i].getElementsByTagName('a')[as].innerHTML;
	
	if (app.indexOf('in reply to') >= 0)
		app = tweets[i].getElementsByTagName('a')[as-1].innerHTML;
	
	status = tweets[i].innerHTML;
	status.replace(tags, '');
	
	if (status.match(you))
		continue;
	
	if (user.match(mute.users)) {
		matches[i] = true;
		continue;
	}
	
	if (app.match(mute.apps)) {
		matches[i] = true;
		continue;
	}
	
	if (status.match(mute.text)) {
		matches[i] = true;
		continue;
	}
}

for (var y=0; y<tweets.length; y++) {
	if (matches[y] == true)
		tweets[y].style.display = 'none';
}