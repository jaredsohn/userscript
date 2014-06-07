// ==UserScript==
// @name           Twitter Last Read Tweet Tweak
// @namespace      http://www.arthaey.com
// @description    Makes the "last read tweek" marker more obvious
// @include        http://www.twitter.com/*
// @include        http://twitter.com/*
// @include        https://www.twitter.com/*
// @include        https://twitter.com/*
// @version        1.1
// ==/UserScript==

GM_addStyle(
    ".stream-item.last-new-tweet { border-bottom: 5px solid #F5B0B8 !important; }"
);
