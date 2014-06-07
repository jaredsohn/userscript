// ==UserScript== 
// @name           Last.fm: Show artist-library-link in recently-listened-list
// @namespace      http://solife.cc
// @description    Last.fm: Show artist-library-link in recently-listened-list
// @version	    1.0
// @include	    http*://*last.fm/user/*
// @include	    http*://*lastfm.de/user/*
// @include	    http*://*lastfm.es/user/*
// @include	    http*://*lastfm.fr/user/*
// @include	    http*://*lastfm.it/user/*
// @include	    http*://*lastfm.pl/user/*
// @include	    http*://*lastfm.se/user/*
// @include	    http*://*lastfm.ru/user/*
// @include	    http*://*lastfm.jp/user/*
// @include	    http*://*lastfm.com.tr/user/*
// @include	    http*://*lastfm.com.br/user/*
// ==/UserScript==

// language variables
$words            = new Array();
$language         = new Array();
$language['www.last.fm']    = new Array('Library');
$language['www.lastfm.de']  = new Array('Musiksammlung');

if(!$language[location.hostname]) { $words = $language['www.last.fm']; }
else { $words = $language[location.hostname]; }

if( document.getElementById('recentTracks') || document.getElementById('deletablert') ) {

    if(document.getElementById('deletablert')) {
        var recentlydiv = document.getElementById('deletablert').getElementsByTagName('tr');
        var username = document.getElementsByClassName('pagehead')[0].getElementsByTagName('p')[0].getElementsByTagName('a')[0].href;
        username = username.slice(username.indexOf('/user/') + 6);
    }
    else {
        var recentlydiv = document.getElementById('recentTracks').getElementsByTagName('tr');
        var username = document.getElementById('userBadge').getElementsByTagName('h1')[0].innerHTML;
    }

    var homeurl = document.getElementById('secondaryNavigation').getElementsByClassName('first')[0].getElementsByTagName('a')[0].href;
    var usernameindex = homeurl.indexOf(username);
    var lasturl = homeurl.slice(0, usernameindex-5);

    for(i=0; i<recentlydiv.length; i++) {
    
        var artistname = recentlydiv[i].getElementsByClassName('subjectCell')[0].getElementsByTagName('a')[0];
        var artislink = artistname.href.slice(lasturl.length+6);
        
        var newlink = document.createElement('a');
        newlink.href = lasturl + "user/" + username + "/library/music/" + artislink;
        newlink.innerHTML = '(' + $words[0] + ')';
        recentlydiv[i].getElementsByClassName('dateCell')[0].appendChild(newlink);
    
    }
 
};