// ==UserScript==
// @name           Testing - just causee
// @namespace      http://www.reddit.com/
// @description    Change the Reddit Experience
// @include        http://www.reddit.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @copyright	   Umaniac and the world
// ==/UserScript==

console.log ( "V 0.01" );

var type_of_page = null; // what kind of page are we on?

url = window.location.pathname;

// users page
if ( url.match ( 'reddit\.com\/u\/.+' ) {
	type_of_page = 1;
} 
// subreddit
if ( url.match ( 'reddit\.com\/r\/.+' ) {
	type_of_page = 2;
} 
// front page
else {
	type_of_page = 0;
}

var url_json = window.location.pathname+'.json'; // append the .json so we get the information we need

console.log ( url_json );

var data = $.get( { url: url_json } ) ;

console.log ( data );