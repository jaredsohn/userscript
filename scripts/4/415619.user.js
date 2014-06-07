// ==UserScript==
// @name           Block ad at facebook
// @namespace      ad.facebook.com
// @description    facebook 광고 알람 영역 block
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @exclude       http://*.facebook.com/ajax/*
// @exclude       https://*.facebook.com/ajax/*
// @exclude       http://*.facebook.com/ai.php
// @exclude       https://*.facebook.com/ai.php
// @copyright      siva6
// @version        0.1
// ==/UserScript==

(function(window, undefined ) {

var w;
if (unsafeWindow != "undefined"){
    w = unsafeWindow
} else {
    w = window;    
}

//console.log('call:' + location.href);
if(w.location.href.indexOf('.php') > 0) return;

_removeElement(w);

w.onclick = function(e) {
    setTimeout(function() {
        _removeElement(w);
    }, 500);
}

})(window);

function _removeElement(w) {
    var c = w.document.getElementById('contentArea');
    var r = w.document.getElementById('rightCol');
    
    if(!c || !r || !c.offsetWidth || !r.offsetWidth) return;
       
    var width = c.offsetWidth + r.offsetWidth;
    r.remove();
    c.setAttribute('style', 'width:' + width + 'px');
};    