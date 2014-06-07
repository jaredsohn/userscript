// ==UserScript==
// @name                Rapidshare auto"Free"click
// @description Removes absolutely everything except for the captcha box from rapidshare.de and rapidshare.com pages, starts download automatically when timer runs out.
// @include       http://rapidshare.com/*
// @include       http://rapidshare.de/*
// @include       http://*.rapidshare.com/*
// @include       http://*.rapidshare.de/*
// ==/UserScript==
// Version 20080702

(function (){

timer=0;

// click on the "free" button
if (free=document.getElementById('ff')) {
    free.submit();
    return
}
else if ((free=document.getElementsByName('dl.start'))&&free[1]) {
    free[1].click();
    return;
}
})();
