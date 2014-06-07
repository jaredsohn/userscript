// ==UserScript==
// @name           	You have pig flu
// @namespace     	http://userscripts.org/users/71073
// @include		http://*.doihavepigflu.com/*
// @include		http://doihavepigflu.com/*
// ==/UserScript==

var allHeaders, thisHeader;
allHeaders = document.getElementsByTagName('h1');
for (var i = 0; i < allHeaders.length; i++) {
    thisHeader = allHeaders[i];
    thisHeader.innerHTML = '<a href="http://www.amazon.com/gp/product/B000QGGKQG?ie=UTF8&tag=jpdefillippo-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=B000QGGKQG">Yes</a>';
}

var allMaybes, thisMaybe;
allMaybes = document.getElementsByClassName('maybe');
for (var i = 0; i < allMaybes.length; i++) {
	thisMaybe = allMaybes[i];
	thisMaybe.innerHTML = '<a href="http://www.amazon.com/gp/product/B000QGGKQG?ie=UTF8&tag=jpdefillippo-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=B000QGGKQG">I&rsquo;m sorry that you are going to die.</a>';
}