// ==UserScript==
// @name           Herkku / Koodi default images off
// @namespace      it.org
// @description    Default to images off in Herkku / Koodi chats
// @include        http://chat.nuppi.net/*
// ==/UserScript==

var inputti = document.getElementsByName('kv');
inputti[0].checked=0;
