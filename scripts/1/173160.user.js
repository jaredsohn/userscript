// ==UserScript==
// @name        Twitter - Unfollow Users Silently
// @namespace   http://userscripts.org/users/23652
// @description Hides user(s)' tweets instead of unfollowing them. Doesn't hide their replies or convos
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// @copyright   JoeSimmons
// @version     1.0.0
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @downloadURL http://userscripts.org/scripts/source/173160.user.js
// @updateURL   http://userscripts.org/scripts/source/173160.meta.js
// @run-at      document-start
// @grant       GM_addStyle
// ==/UserScript==

/* CHANGELOG

1.0.0
    - created

*/

(function twitter_unfollow_users() {


    // NAMES GO HERE
    var names = [

        'LedTheZeppelin',
        'weedhunterr',
        'ix_Diggy_xi',

    ];



    // Make sure the page is not in a frame
    if(window.self !== window.top) return;

    // hide the list of named people's tweets
    GM_addStyle('#stream-items-id li[id^="stream-item-tweet-"] > div[data-screen-name="' +
                 names.join('"], #stream-items-id li[id^="stream-item-tweet-"] > div[data-screen-name="') +
                 '"] {\n\tdisplay: none !important;\n}');

}());