// ==UserScript==
// @name           Old dAmn Tab Colours
// @namespace      testgrounds2206.freehostia.com
// @description    Restores the colour of dAmn tabs to the pre 0.9 state
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

oct = document.createElement('script')
oct.src = "http://testground2206.freehostia.com/damntcf.js?"+new Date().getDate()
document.getElementsByTagName('head')[0].appendChild(oct)
