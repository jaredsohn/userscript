// ==UserScript==
// @name Spelling Cow all text fields
// @namespace     http://www.spellingcow.com
// @description Fix misspellings using spellingcow. Shamelessly adapted from spellingcow.com favelet.
// @include       *
// ==/UserScript==

(function(){
    if (window.spellingcow) {
    } else {
        var d = document;
        var h=d.getElementsByTagName('HEAD')[0];
        var p='http://buttercup.spellingcow.com/spell/';
        //window.spellingcow_favelet='spell-1.2.0';
        var j='text/javascript';
        var s=d.createElement('SCRIPT');
        s.src=p+'scayt';
        s.type=j;
        h.appendChild(s);
    }
})()