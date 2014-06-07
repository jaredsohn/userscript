// ==UserScript==
// @name           Australian news site comment remover
// @namespace      Australian news site comment remover
// @description    Hide comments on Australian news sites, you really dont want to read these
// @author         Chad Paynter
// @include     http://www.news.com.au/*
// @include     http://www.smh.com.au/*
// @include     http://www.theage.com.au/*
// @include     http://www.watoday.com.au/*
// @include     http://www.brisbanetimes.com.au/*
// @include     http://www.couriermail.com.au/*
// @include     http://www.dailytelegraph.com.au/*
// @include     http://www.perthnow.com.au/*
// @include     http://www.theaustralian.com.au/*
// @include     http://www.adelaidenow.com.au/*
// @include     http://www.heraldsun.com.au/*
// @include     http://au.news.yahoo.com/*
// ==/UserScript==

function addStyle(content) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = content;
  head.appendChild(style);
}

// Fairfax au
addStyle('#comments, .cT-comments { display:none ! important; }');
// newscorp au
addStyle('.module comment-list-module { display:none ! important; }');
// yahoo au
addStyle('#comments, .mod modcomments modcmtv2 clearfix { display:none ! important; }');
addStyle('.mod modcomments { display:none ! important; }');