// ==UserScript==
// @name           Yahoo click-tracking disabler
// @namespace      codebad.com
// @description    Disables performance- and privacy-impeding click tracking in Yahoo search results
// @include        http://search.yahoo.com/search*
// ==/UserScript==
(function(){

// A simple string test we'll be using
if (String.prototype.beginsWith) {
    console.warn('googleclicktrackingdisab.user.js warning: String.prototype.beginsWith() has already been defined');
} else {
    String.prototype.beginsWith = function(s) {return this.slice(0, s.length) == s; }
}

var r = new RegExp('%..'), 
    c = String.fromCharCode,
    f = function(s) {return c(parseInt(s.substr(1),16))}

Array.prototype.forEach.call(document.getElementsByTagName('a'), function(el) {
    var s = el.hostname;
    if (('string' == typeof s) && (s.beginsWith('rds.yahoo.'))) {
        var h = el.href;
        el.href = h.substr(h.search('\\*\\*')+2).replace(r,f);
    }
})

})()