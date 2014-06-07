// ==UserScript==
// @name           XSPF Artists links at Last.fm
// @author         Jenny Bjorneberg <carmosin@gmail.com>
// @description    Adds XSPF links to Last.fm Artists pages
// @include        http://www.last.fm/music/*
// ==/UserScript==

var artist = getArtist();
var link = '<a href="http://ws.audioscrobbler.com/1.0/artist/'+artist+'/toptracks.xspf">XSPF for '+artist+'</a>';
var featurepanel = document.getElementById('SecondaryNav');
if (featurepanel) {
    var li = document.createElement('li');
    li.innerHTML = link;
    var ul = featurepanel.getElementsByTagName("ul")[0];
    ul.insertBefore(li, ul.firstChild)
}

function getArtist() {
    var artist;
    if (/http:\/\/.*?\/music\/([^?\/]+)/.test(location.href)) {
        artist = RegExp.$1;
    } else {

    }
    return artist;
}