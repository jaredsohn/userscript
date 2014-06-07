// ==UserScript==
// @name           PUB
// @namespace      PUB
// @mail           graph-corp
// @description  pub pour nous
// @include        http://s*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==


//GM_addStyle('#city #container #reportInboxLeft .content {	background-image: url('+GM_getValue('logo','http://ups.imagup.com/06/1259993423.jpg')+'); background-position: center top; background-repeat: no-repeat; }');
//GM_addStyle('#city #container #reportInboxLeft .content img {	visibility:hidden; }');
if(document.getElementById('city')){if(document.getElementById('reportInboxLeft')){if(document.getElementById('reportInboxLeft').getElementsByTagName('img')[0]){document.getElementById('reportInboxLeft').getElementsByTagName('img')[0].src=GM_getValue('logo','http://ups.imagup.com/06/1259993423.jpg');}}}