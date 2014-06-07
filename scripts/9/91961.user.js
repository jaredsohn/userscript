// ==UserScript==
// @name          LockerzPlayzBotz
// @description   lockerz beta hack to skip watching videos-straight to captcha
// @include       *
// ==/UserScript==

var adSidebar = document.getElementById('playerDiv');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}