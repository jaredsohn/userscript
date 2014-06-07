// ==UserScript==
// @name           Google click-tracking disabler
// @namespace      codebad.com
// @description    Google monitors which search results you click -- protect your privacy!
// @include        http://www.google.com/search*
// ==/UserScript==

// A test for whether or not an object is a DOM node that can contain other DOM nodes
var domlist = document.body.childNodes.constructor;
function fertile(o) { return (o.childNodes || false) && (o.constructor == domlist); }

// A simple string test we'll be using
if (String.prototype.beginsWith) {
    console.warn('googleclicktrackingdisab.user.js warning: String.prototype.beginsWith() has already been defined');
} else {
    String.prototype.beginsWith = function(s) {return this.slice(0, s.length) == s; }
}

Array.prototype.forEach.call(document.getElementsByTagName('a'), function(el) {
    var s = el.getAttribute('onmousedown');
    if (('string' == typeof s) && (s.beginsWith('return rwt(this,')))
        el.removeAttribute('onmousedown');
});

