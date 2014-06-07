// ==UserScript==
// @name           meneame
// @namespace      meneame
// @include        http://www.meneame.net/*
// ==/UserScript==

var wrap = document.getElementById('wrap');
var header = document.getElementById('header');
var naviwrap = document.getElementById('naviwrap');

wrap.removeChild(header);
wrap.removeChild(naviwrap);

var allheader = document.createElement('div');
allheader.appendChild(header);
allheader.appendChild(naviwrap);
allheader.setAttribute('id', 'allheader');

wrap.insertBefore(allheader, document.getElementById('container'));
allheader.style.zIndex = '999999999999';
allheader.style.position = 'fixed';
allheader.style.top = '0px';
allheader.style.width = '98%';
allheader.style.maxWidth = '1300px';
document.getElementById('container').style.paddingTop = '82px';