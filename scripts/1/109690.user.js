// ==UserScript==
// @name           SICP better footnotes
// @namespace      http://kailasa.net/greasemonkey
// @description    Enable hover footnotes for SICP online book
// @include        http://mitpress.mit.edu/sicp/full-text/book/*
// @author	   pk-moz@kailasa.net
// ==/UserScript==

const DEBUG = false;
var debug = DEBUG ? function(s) {GM_log(s);} : function(s) {};

/*
 * Integrate jQuery first
 * (snippet from http://joanpiedra.com/jquery/greasemonkey/)
 */

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait,100);
    }
    else {
        $ = unsafeWindow.jQuery;
        setup_footnote_tooltips();
    }
}
GM_wait();

// All your GM code must be inside this function
function setup_footnote_tooltips() {
    $('a[name^="call_footnote"]')
        .each(
            function() {
                var fn_html = $('a[name="' + this.name.replace('call_', '') + '"]' ).parent().html();
                $(this)
                    .after($('<span/>')
                           .addClass('show-tooltip-text')
                           .html( fn_html )
                          )
                    .hover( show_tooltip, hide_tooltip );
            }
        );

    GM_addStyle('span.show-tooltip-text { display: none; position: absolute; font-size: 0.9em; padding: 6px; padding-left: 12px; padding-right: 12px; color: #f3f3f3; background-color: #303030; max-width: 500px; min-width: 200px; -moz-box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.15);');
    GM_addStyle('span.show-tooltip-text a { color: orange; }');
}

var show_tooltip = function(e) {
    $(this).next('.show-tooltip-text')
        .fadeIn()
        .css('top',  e.pageY)
        .css('left', e.pageX+10);
};

var hide_tooltip = function(e) {
    $(this).next('.show-tooltip-text').fadeOut();
};


