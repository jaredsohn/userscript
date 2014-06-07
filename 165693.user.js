// ==UserScript==
// @name        Frame Tools
// @namespace   frame-tools
// @description Add extra page actions
// @include     localhost
// @include     127.0.0.1
// @include     *://localhost/*
// @include     http://localhost/*
// @include     http://127.0.0.1/*
// @include     localhost:*
// @include     127.0.0.1:*
// @include     *://localhost:*/*
// @include     http://localhost:*/*
// @include     http://127.0.0.1:*/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1.3
// @grant       all
// ==/UserScript==

(function() {
    var $, op = 0.4;

    // jQuery not loaded in page
    // Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
        }
    }

    if(typeof jQuery == 'undefined') {
        // Add jQuery
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    } else {
        // jQuery loaded in page.
        $ = jQuery;
    }




    $(document.body).append($('<div></div>')
                            .html('<button type="button" tabindex="-1">Tools</button>')
                            .css({
                                'position' : 'fixed',
                                'top' : '10px',
                                'right' : '10px',
                                'z-index' : 999999,
                                'opacity' : op,
                                'backgroud' : '#FFFFFF',
                                'border' : '1px solid #444444'
                            })
                            .hover(
                                function() {
                                    var c = $(this).css('opacity', 1);
                                    c.find('div:first').css('display', 'inline');
                                    c.find('button:first').hide();
                                },
                                function() {
                                    var c = $(this).css('opacity', op);
                                    c.find('div:first').hide();
                                    c.find('button:first').show();
                                }
                            )
                            .append($('<div></div>')
                                    .css('float', 'right')
                                    .hide()
                                    .append($('<button type="button" title="Remove" tabindex="-1">X</button>')
                                            .click(function() {
                                                if (confirm('Remove toolbar?')) {
                                                    $(this).parent().parent().remove();
                                                }
                                            })
                                           )
                                    .append($('<button type="button" title="Reload" tabindex="-1">Reload</button>')
                                            .click(function() {
                                                if (confirm('Reload Frame?')) {
                                                    location.reload(true);
                                                }
                                            })
                                           )
                                    .append($('<button type="button" title="URL" tabindex="-1">URL</button>')
                                            .click(function() {
                                                var url = location.href;
                                                console.log('URL', window.document, url);
                                                if (confirm(url + '\n\nOpen in new tab?')) {
                                                    window.open(url);
                                                }
                                            })
                                           )
                                   )
                           );
})();
