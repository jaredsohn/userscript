// ==UserScript==
// @name           Google - GWord Logo Replacement
// @namespace      com.google.www
// @description    Replaces the Google logo with a nice
// @include        http://www.google.com/
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { unsafeWindow.jQuery.noConflict(); withJQuery(unsafeWindow.jQuery); }
}
GM_wait();

// Librari of stuff
var LIB = [
    // '<b>PĂSĂRICĂ</b>', 
    '<b>PARANTEZĂ</b>',
    '<b>ÎMPINGE</b>',
    '<b>TRAGE</b>',
    '<b>ÎNMUIAT</b>',
    '<b>UMED</b>',
    '<b>ŢAPĂN</b>',
    '<b>CHETROS</b>',
    '<b>ŞASĂ CAI FRUMOŞ\'</b>',
    '<b>FЦТЦЯЗ ЯЦБЧ</b>',
    // '⟸⟰⟰⟰⟰⟰⟹',
    // 'بوليس سري', //dick
    // '迪克', //dick
    // 'سوگند', //dick
    // '☣',
    // '☠',
    '✂-----'
];

// Rest of the GM code
function withJQuery($) {
    var $spot = $('img#logo');
    var $a = null;
    if ($('img#logo').parent('a').size() > 0) {
        $a = $('img#logo').parent('a');
        $spot = $a;
        $a.append($('img#logo').attr('title'));
    }
    $spot
        .after(
            $('<h1></h1>')
                .html(LIB[Math.floor(Math.random()*LIB.length)])
                .css({ fontSize: 100, margin: 0, fontFamily: 'Lucida Sans Unicode', fontWeight: 'normal' })
        )
    ;
    $('img#logo')
        .remove()
    ;
    if ($a) {
        $('h1').after($a).css({ lineHeight: '100px' });
        $a.css({ display: 'block', marginBottom: 7, fontSize: 12 });
        $a.find('+ br').remove();
    }
}
