// ==UserScript==
// @name           10 minute mail forever
// @namespace      10minutemail
// @description    automatically clicks give me 10 more minutes
// @include        http://10minutemail.com/10MinuteMail/index.html
// ==/UserScript==


var give_me_minutes_regex = /mailQueue\.resetSessionLife/;

function refresh()
{
	var links = document.getElementsByTagName("a");
	for(var i in links)
	{
		if (links[i].href.match(give_me_minutes_regex))
		{
			links[i].click();
			console.log("clicked");
			return;
		}
	}
	console.log("unable to find link");
}


var refresh_period = 8 * 60; // 8 minutes
console.log("getting more time in " + refresh_period + " seconds");
window.setTimeout(refresh, refresh_period * 1000);


var updates = [0.25, 0.5, 0.75, 0.95];
for (var u in updates)
{
	var scale = updates[u]; 
	var message = (refresh_period - (refresh_period * scale)) + " seconds until refresh";
	window.setTimeout('console.log("' + message + '")', refresh_period * scale * 1000);
}
