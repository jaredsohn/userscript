// ==UserScript==
// @name           StumbleUponRemover
// @namespace      http://shallowsky.com
// @description    Remove the StumbleUpon toolbar and frames (e.g. from Twitter su.pr)
// @include        http://www.stumbleupon.com/s/*
// ==/UserScript==

var loc = String(window.location);
window.location.replace("http://" + loc.replace(/(?:http:\/\/)*www.stumbleupon.com\/s\/[^/]+\/+(?:http:\/\/)*/, ""));
