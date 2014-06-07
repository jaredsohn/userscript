// ==UserScript==
// @id             c2892b32-c3e1-4cf1-a4f6-e9d278cfd897
// @name           Google++
// @version        1.0
// @namespace      
// @author         cakyus@gmail.com
// @description    Enhance Your Google Plus Experience
// @include        https://plus.google.com/*
// @run-at         document-end
// ==/UserScript==

// scroll to the top when you click "Google+" image

var a = document.getElementById('gbqlw');
a.onclick = function(){
    window.scrollTo(0,0);
    return false;
}
