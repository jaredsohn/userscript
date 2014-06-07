// ==UserScript==
// @name           ABKiller
// @namespace      http://www.github.com/MichaelBlume/
// @description    Kill the action bar on OKCupid profiles
// @include        http://www.okcupid.com/profile/*
// @include        http://okcupid.com/profile/*
// ==/UserScript==

var action_bar = document.getElementById('action_bar');
action_bar.parentNode.removeChild(action_bar);
