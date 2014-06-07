// ==UserScript==
// @name Block t.co URL Copy on Twitter
// @desciption Blocks twitter's hijacking of the JS copy feature to spam the clipboard with a t.co link
// @include https://twitter.com/*
// @include http://twitter.com/*
// @version 1.1
// @copyright 2011, gregory tomlinson (http://github.com/gregory80)
// @namespace https://github.com/gregory80/javascript/blob/master/fix_twitter/block_tco_copy.user.js
// ==/UserScript==


setTimeout(function() {
    location.href = "javascript:void(window.twttr.tco.displayToTco =function(){})";
}, 400 );


