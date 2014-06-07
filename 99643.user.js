// ==UserScript==
// @name           DuckDuckGo Voice Search
// @namespace      http://egd.im/
// @description    Adds an x-webkit-speech attribute to DuckDuckGo's search bar
// @version        0.1
// @author         Eric Danielson
// @license        MIT License
// @include        http://duckduckgo.com/*
// @include        https://duckduckgo.com/*
// ==/UserScript==
if(document.getElementById('hfih')) {document.getElementById('hfih').setAttribute('x-webkit-speech','');}
if(document.getElementById('hfi')) {document.getElementById('hfi').setAttribute('x-webkit-speech','');}