// ==UserScript==
// @name           test
// @namespace      j2ck
// @include        http://ya.ru/
// ==/UserScript==

var scripts = [
    'http://ajax.googleapis.com/ajax/libs/mootools/1.2.3/mootools.js',
    'http://kload.googlecode.com/svn-history/r50/trunk/styles/default/javascript/mootools-more.js'
];
for (var i=0; i<scripts.length; i++) {
    var script = document.createElement('script');
    script.src = scripts[i];
    document.getElementsByTagName('head')[0].appendChild(script);
}
(function GM_WAIT() {
if (unsafeWindow['$$'] == undefined) {
	setTimeout(GM_WAIT, 100);
} else {
	GM_ONLOAD(unsafeWindow.$$);
}
})();

function GM_ONLOAD($$) {
 console.log($$);
}