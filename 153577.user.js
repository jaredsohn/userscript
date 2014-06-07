// ==UserScript==
// @name          Fix youtube home button
// @version       1.1.1		 		
// @description	  changes the youtube logo to link to http://www.youtube.com/feed/subscriptions
// @author        msevilgenius
// @include       http://youtube.com/*
// @include       https://youtube.com/*
// @include       http://*.youtube.com/*
// @include       https://*.youtube.com/*
// @include       http://www.youtube.com/html5*
// @include       http://www.youtube.com/feather_beta*
// @include       http://www.youtube.com/user*
// @include       http://www.youtube.com/feed/subscriptions
// ==/UserScript==

function win(){
   document.getElementById('logo-container').href='http://www.youtube.com/feed/subscriptions'}window.onLoad=win();