// ==UserScript==
// @name        Twitter - Display User Name
// @namespace  
// @version     0.1
// @description Displays current user signed in on twitter's top bar, so you know what account you're using before sending a tweet.
// @match       https://twitter.com/*
// @copyright   2012+, You
// @require 	http://code.jquery.com/jquery-2.0.3.min.js
// ==/UserScript==




//Finding Profile Link's text:
var pLink = $('#global-actions a[data-nav="profile"]');
var pLinkText = pLink.find('span.text');

//Replacing text and deleting leading slash:
pLinkText.html(  pLink.attr('href').replace(/^./,"")  );

//Styling:
pLinkText.css({'font-weight': 'bold', 'color':'hsl(206, 82%, 63%)', 'font-size':'15px'});
