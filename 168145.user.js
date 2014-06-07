// ==UserScript==
// @name        Inject jQuery
// @namespace   Inject
// @author      Ziqiang Li
// @description Inject jQuery
// @include     *
// @version     1.05
// ==/UserScript==
function LoadScript(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
    console.log('============= Loaded latest jQuery~ =============');
}

if (unsafeWindow.jQuery === undefined) {
    LoadScript('http://code.jquery.com/jquery-latest.min.js');
}