// ==UserScript==
// @name           Remove Recommened For You
// @namespace      neoroxon
// @description    Removes the "Recommended For You" box on the youtube homepage.
// @include        http://www.youtube.com/
// @include        http://www.youtube.com/index
// ==/UserScript==

var s = document.createElement('style');
s.type = 'text/css';
s.innerHTML = '\
 #feedmodule-REC,\
 #feed_recommended,\
 #feed_recommended-content {\
    display:none !important;\
 }\
';
document.getElementsByTagName('head')[0].appendChild(s);