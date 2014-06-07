// ==UserScript==
// @name Google+ inviter
// @namespace http://dejimachan.org/b/ DNW
// @description Herlaad net zo lang totdat je je account kunt aanmaken
// @include https://plus.google.com/*
// ==/UserScript==
if (document.body.innerHTML.indexOf('Keep Me Posted') !== -1) {
    setTimeout(function() {
        document.location.href = 'https://plus.google.com/?tab=XX';
    }, 10000);
} else alert('STOP! Googletime');
