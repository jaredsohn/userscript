// ==UserScript==
// @name           New Twitter- Content Left, Sidebar Right
// @version        1.0
// @author         ArpitNext
// @namespace      http://blog.arpitnext.com/
// @description    Move the "Content" section to the left side. For New Twitter interface.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

(function() {
if (document.getElementsByClassName('dashboard').length > 0 && document.getElementsByClassName('content-main').length > 0) {
    document.getElementsByClassName('dashboard')[0].style.cssFloat = 'right';
    document.getElementsByClassName('content-main')[0].style.cssFloat = 'left';
}
}
)();

// Inspired by rvdveen's script: http://userscripts.org/scripts/show/119982