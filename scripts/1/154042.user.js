// ==UserScript==
// @name         Yahoo! Mail Kill Ad
// @namespace    leoj3n@userscripts.org,2012-12-12:YahooKillAds
// @description	 Kills the right sky ad in Yahoo! Mail.
// @require      //ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @include      http://us.mg5.mail.yahoo.com/*
// @grant        none
// ==/UserScript==

var intervalID = setInterval( yahoo_kill_ad, 100 );

function yahoo_kill_ad() {
  $('body').removeClass( 'withsky' ).addClass( 'withoutad' );
}