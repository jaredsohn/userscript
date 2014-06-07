// ==UserScript==
// @name        YouTube - Auto View Videos on User Page
// @namespace   http://userscripts.org/users/23652
// @description Instead of showing a user's home page first, show their videos page
// @include     http://*.youtube.com/*
// @include     https://*.youtube.com/*
// @require     https://raw.github.com/joesimmons/jsl/master/versions/jsl-1.3.0.js
// @version     1.0.5
// @downloadURL http://userscripts.org/scripts/source/176270.user.js
// @updateURL   http://userscripts.org/scripts/source/176270.meta.js
// ==/UserScript==

/* CHANGELOG

1.0.5 (3/22/2014)
    - excluded "Playlists" link on channels from being affected

1.0.4 (3/19/2014)
    - after a YouTube update, made the script go to "Uploads" instead of "All Videos"

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



JSL.runAt('interactive', function () {
    var rChannel = /\/(user|channel)\/([\w-]+)/,
        rExtraQueries = /\?(\w+=\w+)/;

    function addVideoHref(link) {
        //                                                                      $1 and $2 just for clarity
        link.href = link.href.replace(rExtraQueries, '&$1').replace(rChannel, '/$1/$2/videos?view=0');
    }

    function modifyLinks() {
        var links = JSL('//a[ ( contains(@href, "/user/") or contains(@href, "/channel/") ) and not( contains(@href, "/videos") or contains(@href, "/playlists") or contains(@href, "/discussion") or contains(@href, "/about") )]');
        links.each(addVideoHref);
    }

    if (typeof JSL !== 'undefined') {
        JSL.setInterval(modifyLinks, 1000);
    }
});