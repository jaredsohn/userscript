// ==UserScript==
// @name           Sandbox Facebook
// @namespace      sandbox_facebook
// @description    Prevents third party sites from accessing facebook api
// @include        http://*
// @exclude        http://*.facebook.com/*
// ==/UserScript==

unsafeWindow.FB = false;
unsafeWindow.fbAsyncInit = false;
unsafeWindow.Member = false // for CNN

allscripts = document.getElementsByTagName('script');
for (var i = 0; i < allscripts.length; i++) {
    s = allscripts[i];
    if (s.src.indexOf('facebook') >= 0){
        s.parentNode.removeChild(s);
    } else if (s.src.indexOf('fbcdn') >= 0){
        s.parentNode.removeChild(s);
    } else if (s.text.indexOf('facebook') >= 0){
        s.parentNode.removeChild(s);
    }
}
