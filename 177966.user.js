// ==UserScript==
// @name       OSRC Scroller
// @namespace  https://github.com/zanata?tab=members
// @version    0.1
// @description  Cycle through team member profiles on osrc.
// @match      http://osrc.dfm.io/*
// @copyright  2013+, David Mason
// ==/UserScript==

var users = ['aeng', 'carlosmunoz', 'davidmason', 'definite', 'huangp', 'lukebrooker', 'seanf', 'djansen-redhat'],
    delayMS = 2500,
    scrollTickMS = 20;

var intervalId;

var goToNext = function () {
    var href = window.location.href,
		user = href.substring(href.lastIndexOf('/') + 1),
        currentIndex = users.indexOf(user),
        nextIndex = (currentIndex + 1) % users.length;

    window.location.href = "http://osrc.dfm.io/" + users[nextIndex];
};

var scroll = function scroll () {
    window.scrollBy(0,1);
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        clearInterval(intervalId);
        goToNext();
    }
};

setTimeout( function () { intervalId = setInterval(scroll, scrollTickMS); }, delayMS);