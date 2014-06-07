// ==UserScript== 
// @name           Last.fm: Show scrobbled and loved count in user-artist-library
// @namespace      http://solife.cc
// @description    Last.fm: Show scrobbled and loved count in user-artist-library
// @version	    1.0
// @include	    http*://*last.fm/user/*/library/music/*
// @include	    http*://*lastfm.de/user/*/library/music/*
// @include	    http*://*lastfm.es/user/*/library/music/*
// @include	    http*://*lastfm.fr/user/*/library/music/*
// @include	    http*://*lastfm.it/user/*/library/music/*
// @include	    http*://*lastfm.pl/user/*/library/music/*
// @include	    http*://*lastfm.se/user/*/library/music/*
// @include	    http*://*lastfm.ru/user/*/library/music/*
// @include	    http*://*lastfm.jp/user/*/library/music/*
// @include	    http*://*lastfm.com.tr/user/*/library/music/*
// @include	    http*://*lastfm.com.br/user/*/library/music/*
// ==/UserScript==

var librarylist   =  document.getElementById('libraryList').getElementsByTagName('tbody')[0];
var tdPlaycount   =  librarylist.getElementsByClassName('playcount');
var tdAlbum       =  librarylist.getElementsByClassName('album');
var lovedtracks   =  librarylist.getElementsByClassName('loved_indicator_icon');
var albumstrip    =  document.getElementById('albumstrip');
var whole_counter =  0;

// language variables
$words            = new Array();
$language         = new Array();
$language['www.last.fm']    = new Array('scrobbled Tracks', 'scrobbled Track', 'loved Tracks', 'loved Track', ',');
$language['www.lastfm.de']  = new Array('gescrobbelte Titel', 'gescrobbelter Titel', 'Lieblingslieder', 'Lieblingslied', '.');

if(!$language[location.hostname]) { $words = $language['www.last.fm']; }
else { $words = $language[location.hostname]; }

// search list and set variables 
for(i=0; i<tdPlaycount.length; i++) {
    var current_song = Number(tdPlaycount[i].getElementsByTagName('a')[0].innerHTML.replace(',', '').replace('.', ''));
    whole_counter = whole_counter + current_song;    
}

// set decimal point if number has more than three numbers
function checkOutput(checkThisNumber) {

    if(checkThisNumber.length > 3) {
        var whole_counter_length = checkThisNumber.length;
        var allPreNumbers = checkThisNumber.slice(0, checkThisNumber.length -3);
        var lastThreeNumbers = checkThisNumber.slice(-3);
        checkThisNumber = allPreNumbers + $words[4] + lastThreeNumbers;
    }
    return checkThisNumber;

}

// differences if the count is only one
if(Number(whole_counter) == 1) { $words_whole_counter = $words[1]; }
else { $words_whole_counter = $words[0]; }

var save_lovedtracks = Number(lovedtracks.length);
if(save_lovedtracks == 1) { $words_loved = $words[3]; }
else { $words_loved = $words[2]; }

whole_counter = checkOutput(String(whole_counter));
lovedtracks = checkOutput(String(lovedtracks.length));

// show whole-counter and loved tracks
var librarybreadcrumb = document.getElementById('libraryBreadcrumb').getElementsByTagName('h2')[0];

if(albumstrip.getElementsByClassName('selected').length > 0) {
    var selectedalbum = albumstrip.getElementsByClassName('selected')[0].getElementsByClassName('title')[0].innerHTML;
    innerHtmlString = librarybreadcrumb.innerHTML + ' - ' + selectedalbum + ' <a href="">(' + whole_counter + ' ' + $words_whole_counter;
    if(!save_lovedtracks == 0) {innerHtmlString += ', ' + lovedtracks + ' ' + $words_loved;}
    innerHtmlString += ')</a>';
    librarybreadcrumb.innerHTML = innerHtmlString;
}
else {
    innerHtmlString = librarybreadcrumb.innerHTML + ' <a href="">(' + whole_counter + ' ' + $words_whole_counter;
    if(!save_lovedtracks == 0) {innerHtmlString += ', ' + lovedtracks + ' ' + $words_loved;}
    innerHtmlString += ')</a>';
    librarybreadcrumb.innerHTML = innerHtmlString;
}