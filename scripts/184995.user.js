// ==UserScript==
// @name        Simple Plug Script
// @namespace   http://userscripts.org/users/540048
// @description This loads simpleplugscript automatically when on plug.dj!
// @include     http://www.plug.dj/*
// @include     https://www.plug.dj/*
// @include     http://plug.dj/*
// @include     https://plug.dj/*
// @version     1
// @grant       none
// ==/UserScript==
setTimeout(function() {var jsCode = document.createElement('script');
jsCode.setAttribute('id', 'simpleplug-js');
                       jsCode.setAttribute('src', 'http://plugdj.enyx.cu.cc/SimplePlugScript.js'); document.body.appendChild(jsCode);}, 2000);
