// ==UserScript==
// @name        LoL Home to Tribunal Redirect
// @namespace   JackZR
// @description It redirects you from LoL Home to Tribunal Page (do not install or just disable it if you want to visit LoL web site).
// @include     *.leagueoflegends.com/
// @version     2
// @grant       none
// ==/UserScript==

var TribURL = window.location.protocol + "//" + window.location.host + "/tribunal/en/review";

window.location = TribURL;