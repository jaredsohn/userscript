// ==UserScript==
// @name        Plug.dj PlugBot Enchanced Autoloader
// @namespace   http://userscripts.org/users/540048
// @description This loads Ebola777's PlugBot Enchanced automatically when on plug.dj!
// @include     http://www.plug.dj/*
// @include     https://www.plug.dj/*
// @include     http://plug.dj/*
// @include     https://plug.dj/*
// @version     1
// @grant       none
// ==/UserScript==
var jsCode = document.createElement('script');
jsCode.setAttribute('id', 'plugbot-js');
jsCode.setAttribute('src', 'https://raw.github.com/ebola777/Plugbot-Enhanced/master/js/release.min.js'); document.body.appendChild(jsCode);