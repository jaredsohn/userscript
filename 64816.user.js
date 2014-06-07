// ==UserScript==
// @name         Safe Login Form Indicator
// @namespace    http://agorf.gr/
// @description  Get a visual hint of whether a login form submits to HTTPS
// @require      http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==
//
// DISCLAIMER: This script merely provides a visual indication of whether it is
// safe to submit a login form. It does so by making the best possible guess.
// But it is still a guess. It does not, and it should not, replace inspection
// and vigilance from your part.
//
// Copyright (c) 2009, Aggelos Orfanakos
// Licensed under the terms of the MIT license.

var colorize = (function () {
    var colors = {
        'safe':    '0a0', // green
        'unsafe':  'f00', // red
        'unknown': 'f0f'  // fuchsia
    };

    return function (safety) {
        safety = safety || 'unknown';

        return colors[safety];
    };
})();

var log = function () {};

if ((unsafeWindow.console) && (unsafeWindow.console.log)) {
    var log = function (name, message, safety) {
        console.log('[' + safety + '] ' + name + ': form ' + message);
    };
}

$('input[type=password]').each(function () {
    var name = $(this).attr('name');
    var form = $(this).closest('form');
    var form_method, form_action;
    var safety;
    
    if (form) {
        form_method = form.attr('method');
        form_action = form.attr('action');

        if (form_method.toLowerCase() === 'post') {
            if (form_action && form_action !== '') {
                if (form_action.indexOf('https:') === 0) {
                    safety = 'safe';
                    log(name, 'submits to HTTPS', safety);
                }
                else if (location.protocol === 'https:' && form_action.indexOf('http:') !== 0) {
                    safety = 'safe';
                    log(name, 'under HTTPS and does *not* submit to HTTP', safety);
                }
                else if (form_action.indexOf('http:') === 0 ||
                        form_action.indexOf('/') === 0 ||
                        form_action.indexOf('./') === 0 ||
                        form_action.indexOf('../') === 0 ||
                        form_action.indexOf('?') === 0) {
                    safety = 'unsafe';
                    log(name, 'submits to HTTP', safety);
                }
            }
            else if (location.protocol === 'https:') {
                safety = 'safe';
                log(name, 'under HTTPS and submits to self', safety);
            }
        }
        else {
            safety = 'unsafe';
            log(name, 'submits as GET', safety);
        }
    }

    $(this).css('border', '2px solid #' + colorize(safety));
});
