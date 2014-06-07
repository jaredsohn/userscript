// ==UserScript==
// @name        PlugBot Loader
// @namespace   http://plug.dj/
// @description Loads plugbot for use on plug.dj
// @include     http://plug.dj/*
// @version     1
// ==/UserScript==
var jsCode = document.createElement('script');
jsCode.setAttribute('id', 'plugbot-js');
jsCode.setAttribute('src', 'https://raw.github.com/connergdavis/Plugbot/master/plugbot.js'); document.body.appendChild(jsCode);
