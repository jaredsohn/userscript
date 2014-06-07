// ==UserScript==
// @name			Datpiff - no pop up
// @description		This script opens the datpiff mixtape player launched by pressing the "listen" button in a same window rather than a new popup.
// @namespace		http://eliasmartinezcohen.com/
// @match			http://www.datpiff.com/*-mixtape.*.html*
//
// @version			1.0
// 
// ==/UserScript==

console.log("Datpiff mixtape detected!");

//1. get mixtape ID
var social_links = document.getElementsByClassName('comments'),
	mixtape_id = "",
	i;

for (i = 0; i < social_links.length; i++) {
	if (social_links[i].getAttribute('href') === '#disqus_thread') {
		console.log("Found disqus thread link!");
		mixtape_id = social_links[i].getAttribute('data-disqus-identifier');
		break;
	}
}

//2. now get 'Listen' button
var buttons = document.getElementsByClassName('btnFloat'),
	listen;
	
for (i = 0; i < buttons.length; i++) {
	console.log("Button Attributes:", buttons[i].attributes);
	if(buttons[i].getAttribute('alt') === 'Listen') {
		console.log("Found Listen button!");
		listen = buttons[i];
		break;
	}
}

//3. if mixtape ID was found, change onclick funciton of listen button.
if (mixtape_id !== "") {
	console.log("Changing onclick function of Listen button");
	listen.onclick = function() {
		window.location.href="http://www.datpiff.com/pop-mixtape-player.php?id=" + mixtape_id;
	};
} else {
	console.log("No mixtape ID found :(");
}
