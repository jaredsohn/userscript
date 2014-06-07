// ==UserScript==
// @name Google+ Uitnodiging
// @namespace http://dejimachan.org/b/ DNW
// @description Herlaad net zo lang totdat je je account kunt aanmaken
// @include https://plus.google.com/*
// ==/UserScript==
if (document.body.innerHTML.indexOf('Hou me op de hoogte') !== -1) {
    setTimeout(function() {
        document.location.href = 'https://plus.google.com/?tab=XX';
    }, 10000);
} else alert('We zijn binnen');
