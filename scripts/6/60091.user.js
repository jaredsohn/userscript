// ==UserScript==
// @name           Simplenote restyled
// @description    Restyles the Simplenote web application for a more polished look and feel.
// @version        1.x
// @namespace      http://lab.mightydream.com/simplenote-restyled/
// @include        https://simple-note.appspot.com/*
// @include        http://simple-note.appspot.com/*
// @copyright      2009, Mighty Dream (http://mightydream.com/)
// @contributor    Inspired by Helvetireader (http://helvetireader.com/) and Instapaper restyled (http://unttld.co.uk/labs/instapaper-restyled/)
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==

var jsNode = document.createElement('script');
jsNode.type = 'text/javascript';
jsNode.src = 'http://lab.mightydream.com/simplenote-restyled/js/simplenote.js';
document.getElementsByTagName('head')[0].appendChild(jsNode);