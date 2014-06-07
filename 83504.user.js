// ==UserScript==
// @author         rikuo
// @name           Hide "Who to follow" (Twitter)
// @namespace      http://d.hatena.ne.jp/rikuo/
// @include        http://twitter.com/*
// @exclude        http://twitter.com/account/*
// @exclude        http://twitter.com/following*
// @exclude        http://twitter.com/followers*
// @exclude        http://twitter.com/*/following*
// @exclude        http://twitter.com/*/followers*
// @exclude        http://twitter.com/invitations/*
// @exclude        http://twitter.com/settings/*
// @exclude        http://twitter.com/*/lists*
// ==/UserScript==

var wtf = document.getElementById('recommended_users');
if(!wtf)return;
wtf.style.display = 'none';
document.getElementById('primary_nav').style.marginTop = '20px';

