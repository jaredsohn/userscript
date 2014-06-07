// ==UserScript==
// @name           Gmail Spam-count Hide
// @namespace      grease1 DOT daniboy AT antichef DOT com
// @description    Never see how much spam you have, since you don't care about it anyways :)
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// @date           2007-11-20
// @version        0.2.2
// ==/UserScript==

GM_addStyle('#ds_spam b,div[id$="^s"] span{visibility:hidden;}#ds_spam b::before,div[id$="^s"] span::before{content:"Spam";visibility:visible;font-weight:400;text-decoration:underline;}');
