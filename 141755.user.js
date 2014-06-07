// ==UserScript==
// @name           Bitcointalk.org Spammer
// @namespace      http://bitcointalk.org/*
// @include      http://bitcointalk.org/*
// @description    Sends one message to every member on the forum with a delay of 45 seconds between messages
// ==/UserScript==




function post_message() {
	document.href('https://bitcointalk.org/index.php?action=pm;sa=send');
}

//

//Form ID: postmodify
//Messagebox ID: message
//

post_message();