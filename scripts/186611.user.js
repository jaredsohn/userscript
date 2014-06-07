// ==UserScript==
// @name        Plug.BOT
// @description Script by ProdRG & ItsFRIX
// @include     http://www.plug.dj/*
// @include     https://www.plug.dj/*
// @include     http://plug.dj/*
// @include     https://plug.dj/*
// @version     2.1
// @grant       none
// ==/UserScript==

function load() {
var jsCode = document.createElement('script');
jsCode.setAttribute('id', 'plugbot');
jsCode.setAttribute('src', 'http://scriptplug.besaba.com/site/plugv2.js'); document.body.appendChild(jsCode);
}
setTimeout(load, 10000)
