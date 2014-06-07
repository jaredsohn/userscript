// ==UserScript==
// @name           Margonem: Duel Chat
// @namespace      created by Arth
// @description    Czat w grze Margonem: Duel
// @include        http://duel.margonem.com/*
// @include        http://duelpl.margonem.com/*
// @version        0.0.1
// ==/UserScript==

var th = document.getElementsByTagName('head')[0];
var s = document.createElement('script');
s.setAttribute('type', 'text/javascript');
s.setAttribute('src', 'http://dl.dropbox.com/u/24869759/duel/chat-beta.js');
th.appendChild(s);