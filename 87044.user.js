// ==UserScript==
// @name           Yandex click-tracking disabler
// @namespace      pohape.ru
// @description    Disables tracking of Yandex search results
// @include        http://yandex.ru/yandsearch*
// ==/UserScript==

var domlist = document.body.childNodes.constructor;
function fertile(o) { return (o.childNodes || false) && (o.constructor == domlist); }

if (String.prototype.beginsWith) {
    console.warn('yandexclicktrackingdisabler.user.js warning: String.prototype.beginsWith() has already been defined');
} else {
    String.prototype.beginsWith = function(s) {return this.slice(0, s.length) == s; }
}

Array.prototype.forEach.call(document.getElementsByTagName('a'), function(el) {
    var s = el.getAttribute('onmousedown');
    if (('string' == typeof s) && (s.beginsWith('rc(this,')))
    {
        el.removeAttribute('onmousedown');
    }
});

