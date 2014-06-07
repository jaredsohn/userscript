// ==UserScript==
// @name			CC+ | ironSimplicity
// @namespace		CC+ theme packs
// @description		ironSimplicity theme for cc+ , created by masonga95
// @include			http://casualcollective.com/*
// @include			http://www.casualcollective.com/*
// @exclude			http://www.casualcollective.com/chat
// @exclude			http://www.casualcollective.com/radio
// @resource		headerImg http://img150.imageshack.us/img150/38/compiledheader3.png

// ==/UserScript==

GM_addStyle('#header, #logo a, #topmenu ul li a, #loginbox, #userbox, #loginbox .lb-content .lb-text, #radioinfo, .radio-listen { background-image: url(\''+GM_getResourceURL('headerImg')+'\'); }');