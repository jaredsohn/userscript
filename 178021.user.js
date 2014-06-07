// ==UserScript==
// @name       Remove outbrain.com redirects
// @namespace  http://danpuza.com/
// @version    0.1
// @description  Remove outbrain.com redirects
// @match      *://*/*
// @copyright  2013+, Dan Puza
// ==/UserScript==

[].slice.call(document.querySelectorAll('.OUTBRAIN, a[onmousedown*="outbrain.com"')).forEach(function(el){
    el.parentNode.removeChild(el);
    //el.innerHTML = "[outbrain.com] " + el.innerHTML;
});
