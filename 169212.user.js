// ==UserScript==
// @name           Twitter
// @namespace      http://twitterchat.p.ht/
// @include        http://twitter.com/
// @include        https://twitter.com/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://twitter.com
// @include        https://twitter.com

// ==/UserScript==

var envoSn=118177;
var envProtoType = (("https:" == document.location.protocol) ? "https://" : "http://");
document.write(unescape("%3Cscript src='" + envProtoType + "d.envolve.com/env.nocache.js' type='text/javascript'%3E%3C/script%3E"));