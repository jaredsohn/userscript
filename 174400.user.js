// ==UserScript==
// @name        WootBot
// @namespace   http://plug.dj/
// @description Auto-Woot bot for plugDj
// @include     http://plug.dj/*
// @version     1
// ==/UserScript==
var jsCode = document.createElement('script');
jsCode.setAttribute('id', 'plugbot-js');
jsCode.setAttribute('src', 'https://raw.github.com/vondoume/Plugbot/master/script1.js');
document.body.appendChild(jsCode);