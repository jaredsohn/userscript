// ==UserScript==
// @name          /prog/ Reminder
// @version       1.0
// @namespace     Anonymous
// @description   Friendly reminder to complete your daily ritual after every post on /prog/.
// @include       http://dis.4chan.org/post
// @include       https://dis.4chan.org/post
// ==/UserScript==


//This script is based on/inspired by the ENTERPRISE quality script found here http://userscripts.org/scripts/show/30068
//If you currently have ENTERPRISE quality installed and enabled, please disable it. (assuming you want to use this script)

if ("That was VIP quality!" == document.getElementsByTagName("h1")[0].innerHTML) {
	document.getElementsByTagName("h1")[0].innerHTML = "Have you read your SICP today?";
	}
	
//This script is distributed with no liscense whatsoever.
//If you find a way to make money off of it, good for you.