// ==UserScript==
// @name          last fm youtube link
// @description   
// @include       http://www.lastfm.com.tr/music/*
// @include       http://www.lastfm.com/music/*
// @include       http://lastfm.com.tr/music/*
// @include       http://lastfm.com/music/*

// ==/UserScript==

var linkler = document.getElementsByTagName( 'a' );
var sarki;
var bak=/<a href="\/music\/.*?\/\_\/.*?">/;

for ( var i = 0; i < linkler.length; i++ ) {

    sarki = linkler[ i ];

    if ( sarki.match(bak) {
document.write("1");
    }

else document.write("2");
}