// ==UserScript==
// @name           XSPF Tag Links at Last.fm
// @author         Jenny Bjorneberg <carmosin@gmail.com>
// @description    Adds XSPF links to Last.fm tags pages
// @include        http://www.last.fm/tag/*
// ==/UserScript==

var tag = getTag();
var link = '<a href="http://ws.audioscrobbler.com/1.0/tag/'+tag+'/toptracks.xspf">XSPF for '+tag+'</a>';
var featurepanel = document.getElementById('SecondaryNav'); 
if (featurepanel) {
    var li = document.createElement('li');
    li.innerHTML = link;
    var ul = featurepanel.getElementsByTagName("ul")[0];
    ul.insertBefore(li, ul.firstChild)
}

function getTag() {
    var utag;
    if (/http:\/\/.*?\/tag\/([^?\/]+)/.test(location.href)) {
        utag = RegExp.$1;
    } else {
    }
    return utag;
}
