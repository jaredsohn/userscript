// ==UserScript==
// @name           Giant Bomb Video Download
// @namespace      http://userscripts.org/users/29733
// @description    Replaces the HTML Theater link with a download link for Giant Bomb videos.
// @include        http://www.giantbomb.com/*
// ==/UserScript==

var big, reg1, result1, reg2, result2, text;
big = document.evaluate('.//@data-video', document, null, XPathResult.STRING_TYPE, null);
//alert(big.stringValue);
var text = big.stringValue;
reg1 = /"progressive_high": "http?:\/\/[A-Z0-9/%_.]*mp4/i;
result1 = reg1.exec(text);
reg2 = /http?:\/\/[A-Z0-9/%_.]*mp4/i;
result2 = reg2.exec(result1);
//alert(result2);

var orage = 'XXXXXXXX';

//var dl = document.createElement('li');
//var inject = document.createTextNode('ASASAS');
//dl.setAttribute ('class', 'share');
//dl.appendChild(inject);

var divembed = document.getElementsByClassName('embed');
var theater = divembed[0].firstChild.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
theater.innerHTML = '<a href="'+ result2 + '">Download</a>';



