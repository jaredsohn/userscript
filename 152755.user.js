// ==UserScript==
// @name           RSSTrackingQueryStripper
// @namespace      http://www.hugsmile.eu/
// @include        *
// @exclude        *.youtube.com/*
// @exclude        http://books.google.*
// @exclude        *?search*
// @exclude        *.php?*
// @exclude        *.belgacom.be*
// @exclude        *use_mirror*
// @exclude        *?vandalized*
// @exclude        *netacad.com*
// @exclude        *?token*
// @exclude        *?keyword*
// @exclude        *search?*
// @exclude        *?*submit*
// @exclude        *?*choice*
// @exclude        *?*id*
// @exclude        *?*page*
// @exclude        *?lang*
// @exlude         *kbc.be*
// @description    This script strips out the querystring of the address bar, which is used for tracking purposes. The query parameters get added if you read articles via RSS. This script makes the link shorter again by removing those parameters, which makes the link ideal for sharing or bookmarking.
// @grant          none
// @version        1.6.4
// @icon           data:image/png;base64,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
// ==/UserScript==

// Originally based on http://userscripts.org/scripts/show/63631 by http://userscripts.org/users/yager (http://creazy.net/). Version 1.5 and up are based on http://userscripts.org/scripts/show/76942
// This version was made by Geoffrey De Belie (http://www.hugsmile.eu) 

(function () {

if ( location.search) {
    // check canonical
    var links = document.getElementsByTagName('link');
    for ( var i=0; i<links.length; i++ ) {
        if ( links[i].getAttribute('rel') == 'canonical' && links[i].getAttribute('href') != location.href ) {
            location.replace( links[i].getAttribute('href') );
        }
    }

    // strip parameters
    var new_url = location.href;
    new_url = new_url.replace(
        /(\?ref=rss)$/
        ,''
    );
    new_url = new_url.replace(
        /(\?nb=.+)/ig
        ,''
    );
    new_url = new_url.replace(
        /([\?\&]utm_(source|medium|campaign|content)=.+)/ig
        ,''
    );
    if ( new_url != location.href ) {
        location.replace(new_url)
    }
}

})();