// ==UserScript==
// @name       Nga Skip Ad
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://bbs.ngacn.cc/misc/*
// @copyright  2012+, You
// ==/UserScript==

var adlink = window.location.href;
var separator = 'http://';
var arrayOfLinks = adlink.split(separator);
console.log(separator+arrayOfLinks[2]);
window.location.href = separator+arrayOfLinks[2];