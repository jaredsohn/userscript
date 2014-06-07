// ==UserScript==
// @name        (Hotfix)YouTube - Auto View Videos on User Page
// @namespace   http://userscripts.org/users/508161
// @description Instead of showing a user's home page first, show their videos page
// @include     http://*.youtube.com/*
// @include     https://*.youtube.com/*
// @require     https://raw.github.com/joesimmons/jsl/master/jsl.user.js
// @version     1.0.3.2
// ==/UserScript==

/* CHANGELOG
1.0.3.2 (2/28/2013)
    - Fixed issues with /playlists and /featured

1.0.3.1 (2/27/2013)
    - Introduced Hotfix Modification to script

1.0.3 (11/1/2013)
    - updated to use the new JSL

1.0.2 (9/18/2013)
    - fixed the regular expression to allow hyphens in channel IDs

1.0.1 (9/6/2013)
    - put this script on an interval so it keeps running and gets all the urls
    - fixed a problem with "/channel/" urls

1.0.0 (8/22/2013)
    - created

*/



(function () {

    var regex = /\/(user|channel)\/([\w-]+)/;

    function addVideoHref(link) {
        link.href = link.href.replace(regex, '/$1/$2/videos?view=0&flow=grid');
    }

    function modifyLinks() {
        var links = JSL('//a[ ( contains(@href, "/user/") or contains(@href, "/channel/") ) and not( contains(@href, "/videos") or contains(@href, "/discussion") or contains(@href, "/featured") or contains(@href, "/playlists") or contains(@href, "/about") )]');
        links.each(addVideoHref);
    }

    if (typeof JSL !== 'undefined') {
        JSL.setInterval(modifyLinks, 1000);
    }

}());