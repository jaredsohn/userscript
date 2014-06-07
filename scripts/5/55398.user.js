// ==UserScript==
// @name           Trac Line Numbers
// @namespace      http://xdissent.com
// @description    Adds a "Toggle Line Numbers" option to code in Trac.
// @include        *
// ==/UserScript==

function jQueryReady($) {
    var lines = $('table.code thead th.lineno, table.code tbody th');
    var toggle = $('<a />')
        .attr({
                href: '#',
                title: 'Toggle Line Numbers',
            })
        .text('Toggle Line Numbers')
        .toggle(function() {
                lines.hide();
                return false;
            }, function() {
                lines.show();
                return false;
            });
    $('table.code th.content').css({textAlign: 'left'}).append(toggle);
}

if (document.getElementById('tracpowered')) {
    if (typeof(unsafeWindow) === 'undefined') {
        unsafeWindow = window;
    }
    var script = document.createElement('script');
    script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
    script.type = 'text/javascript';
    script.addEventListener('load', function() {
        jQueryReady(unsafeWindow.jQuery);
    }, false);
    document.getElementsByTagName('head')[0].appendChild(script);
}