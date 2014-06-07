// ==UserScript==
// @name        Facebook notification favicon
// @namespace   http://palid.pl
// @description Automatically changes facebook's favicon depending on all notifications.
// @include     https://facebook.com/*
// @include     http://facebook.com/*
// @include     https://www.facebook.com/*
// @include     http://www.facebook.com/*
// @require     http://palid.pl/scripts/libs/tinycon.min.js
// @require		http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @downloadURL http://palid.pl/scripts/greasemonkey/fb_favico.js
// @version     0.2101
// ==/UserScript==

Tinycon.setOptions({
  width: 8,
  height: 8,
  font: '10px arial',
  colour: '#ffffff',
  background: '#DC0D17',
  fallback: true
});

var updateFavicon = function(){

    var requestsCountValue =  parseInt($('#requestsCountValue').text()); 
    var mercurymessagesCountValue =  parseInt($('#mercurymessagesCountValue').text());  
    var notificationsCountValue = parseInt($('#notificationsCountValue').text());

  var notifiCounts = requestsCountValue + mercurymessagesCountValue + notificationsCountValue;

    Tinycon.setBubble(notifiCounts);
  };

  setInterval(updateFavicon, 1000);
  updateFavicon();
 