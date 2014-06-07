// ==UserScript==
// @name Twitter lefttweets
// @author         Roy van der Veen
// @description    Move the "Content" section to the left side. For New Twitter interface. With suggested changes from ArpitNext
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

(function() {
if (document.getElementsByClassName('dashboard').length > 0 && document.getElementsByClassName('content-main').length > 0) {
    document.getElementsByClassName('dashboard')[0].style.cssFloat = 'right';
    document.getElementsByClassName('content-main')[0].style.cssFloat = 'left';
}
})();