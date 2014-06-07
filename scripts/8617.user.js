// ==UserScript==
// @name           XSPF User Top 50 link at Last.fm
// @author         Jenny Bjorneberg <carmosin@gmail.com>
// @description    Adds XSPF links to Last.fm User pages
// @include        http://www.last.fm/user/*
// ==/UserScript==

var user = getUser();

var link = '<a href="http://ws.audioscrobbler.com/1.0/user/'+user+'/toptracks.xspf">Top 50 played - XSPF</a>';

var featurepanel = document.getElementById('sidebarAboutURL');
if (featurepanel) {
    var li = document.createElement('li');
    li.innerHTML = link;
    featurepanel.appendChild(li);
}

function getUser() {
    var user;
    if (/http:\/\/.*?\/user\/([^?\/]+)/.test(location.href)) {
        user = RegExp.$1;
    } else {

    }
    return user;
}