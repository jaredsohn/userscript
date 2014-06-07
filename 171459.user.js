// ==UserScript==
// @name        GOG.com Forum: Batch favourite/unfavourite threads
// @namespace   https://userscripts.org/users/500392
// @description Allows you to favourite/unfavourite multiple threads at once on the GOG.com forum
// @include     *://www.gog.com/forum/*
// @match       *://www.gog.com/forum/*
// @updateURL       https://userscripts.org/scripts/source/171459.meta.js
// @downloadURL     https://userscripts.org/scripts/source/171459.user.js
// @version     1.01
// @date        2013-06-21
// @grant       none
// ==/UserScript==

(function() {
    $('div.favorite div').each(function() {
        var nr = $(this).attr('class').substr(10, 1);
        var onclick = $(this).attr('onclick');

        $(this).data('thread_id', onclick.match(/\('(.*)',.*,.*\)/)[1]);
        $(this).data('dirty', false);
        $(this).data('originally_on', $(this).hasClass('n_b_b_chb_' + nr + '_checked'));
        $(this).removeAttr('onclick');
        $(this).click(function() {
            var nr = $(this).attr('class').substr(10, 1);
            $(this).toggleClass('n_b_b_chb_' + nr + '_checked');
            $(this).data('dirty', !$(this).data('dirty'));
        })
    })

    function get_dfd() {
        var dfd = [];

        $('div.favorite div').each(function() {
            if ($(this).data('dirty')) {
                dfd.push(
                    $.post(forumAjax, {
                        a: "favourite",
                        f: $("#f").val(),
                        w: $(this).data('thread_id'),
                        act: $(this).data('originally_on') ? 'off' : 'on'
                    })
                )
            }
        })
        
        return dfd;    
    }

    $('div.favorite_top').css('cursor','pointer').click(function() {
        $(this).addClass('show_more spin').css('background-position','100% 50%');

        var dfd = get_dfd();

        $.when.apply(null, dfd).done(function() {
            window.top.location.reload(true);
        });
    })
})();