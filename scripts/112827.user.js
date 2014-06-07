// ==UserScript==
// @name           GM script for money donation
// @namespace      whatever
// @include        http://ww*.erepublik.com/**/donate-money/3417676*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


var url_for_accept = 'http://www.erepublik.com/en/economy/donate-money/3417676';

    $.ajax({
        type: 'POST',
        async: false,
        url: url_for_accept,
        dataType: 'html',
        data: { donate_form[amount]: 0.01, donate_form[currencyId]: 14, donate_form[_csrf_token]:'d259818a9de0f6e31c5ac653900b7560'  },

        beforeSend: function() {
        },
        success: function() {
        },
        error: function() {
        },
        complete: function() {
        }
    });