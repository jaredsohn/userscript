// ==UserScript==
// @name           GlosujacyBot Fotka.pl
// @namespace      http://www.fotka.pl/
// @include        http://www.fotka.pl/profil/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// ==/UserScript==


function randomFromTo(from, to){
       return Math.floor(Math.random() * (to - from + 1) + from);
}

var nastepny = $('html body div#strona div#content div#profile-grid div#profile-navi.profile-box div.profile-navi-container div.Box a.button').attr('href');

setTimeout("window.location.href = '"+nastepny+"'",randomFromTo(3000,8000));


var rating = $('.photo-rating').attr('id');
var rating = rating.split('rating_')
var rating = rating[1];
unsafeWindow.usuwanie_blokada = rating;

unsafeWindow.setTimeout("sendVote('10',"+rating+",'1')",1000);