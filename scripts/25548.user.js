// ==UserScript==
// @name           Twitter Blacklist
// @namespace      http://www.chimeric.de
// @description    Displays a banner on twitter profiles which are listed at http://twitterblacklist.com
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @exclude        http://twitter.com/home
// @exclude        https://twitter.com/home
// @exclude        http://twitter.com/replies
// @exclude        https://twitter.com/replies
// @exclude        http://twitter.com/archive
// @exclude        https://twitter.com/archive
// @exclude        http://twitter.com/public_timeline
// @exclude        https://twitter.com/public_timeline
// @exclude        http://twitter.com/invitations
// @exclude        https://twitter.com/invitations
// @exclude        http://twitter.com/account/*
// @exclude        http://twitter.com/friends
// @exclude        https://twitter.com/friends
// @exclude        http://twitter.com/followers
// @exclude        https://twitter.com/followers
// @exclude        http://twitter.com/direct_messages
// @exclude        https://twitter.com/direct_messages
// @exclude        http://twitter.com/devices
// @exclude        https://twitter.com/devices
// @exclude        http://twitter.com/badges
// @exclude        https://twitter.com/badges
// ==/UserScript==

var match, user, img, warn;

// we use the avatar of http://twitter.com/twitblacklist (hope that's ok)
img = 'http://s3.amazonaws.com/twitter_production/profile_images/53259817/aaagh_bigger.png';

// create our warning message
warn = document.createElement('div');
warn.innerHTML = '<div style="background:#ff0000 url(' + img + ') no-repeat 0.35em 0.35em; z-index:100; font-size:2.5em; color:#000000; padding: 1em; width: 100%; text-align:center; float:left;"><p><strong style="padding: 1.5em; clear: both; width: 100%">ARGH! This one is blacklisted at <a href="http://twitterblacklist.com" title="http://twitterblacklist.com" style="color:#ffffff;" target="_blank">The Twitter Blacklist</a>!!!</strong></p></div><div style="clear:both;"></div>';

// get the username
match = document.evaluate(
    "//h2[@class='thumb']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for(var i = 0; i < match.snapshotLength; i++) {
    user = match.snapshotItem(i).innerHTML.replace(new RegExp('.*>'), '');
}

if(user) {
    // lets see if he/she is blacklisted
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://twitterblacklist.com/api?' + user,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/plain',
        },
        onload: function(responseDetails) {
            if(responseDetails.responseText == 'yes') {
                document.body.insertBefore(warn, document.body.firstChild);
            }
        }
    });
}
