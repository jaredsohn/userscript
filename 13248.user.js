// ==UserScript==
// @name           Netflix-ify HighDefDigest.com
// @namespace      http://www.khan.org/
// @version        1.0
// @description    Adds a link to search for the movie title at Netflix
// @include        http://*.highdefdigest.com/*
// ==/UserScript==
var n = '';
var t = document.title;
var m = t.substring(t.indexOf(':')+2,t.indexOf('|')-1);
    m = m.replace(/[()]/g,n);
var e = document.getElementById('r_inner_r');
var s = 'http://www.netflix.com/Search?v1='
var b = '<a target="_new" href="';
var a = '">Search for ' + m + ' at Netflix</a>';
var l = b + s + m + a;

e.childNodes[1].childNodes[3].childNodes[7].innerHTML = l;