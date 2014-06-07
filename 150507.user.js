// ==UserScript==
// @name       Tf2outpost Extra Options
// @namespace   None?

// @version    0.1
// @description  Just the eyeball
// @include      *tf2outpost.com/trade/*
// @include      *tf2outpost.com/settings/general
// @copyright  Derongan
// ==/UserScript==
jQuery.noConflict();

(function ($) {
    $(function () {
        if (document.URL == "http://www.tf2outpost.com/settings/general") {
            opts = $('<br/><br/><br/><div class="heading"><span>Extra Options</span></div><input type="checkbox" id="enableAutoHide" style="margin:0 10px;"><span class="cream">Start hidden posts invisible.</span><br/>');
            $('form').children('label:last').after(opts);
            $('#enableAutoHide').attr("checked", GM_getValue('enableAutoHide') == true);
            $(':submit').click(function () {
                GM_setValue("enableAutoHide", $('#enableAutoHide').is(':checked'));
            });
        } else {
            var tools = $('<div class="tools"></div>').css("opacity", 0);
            var toggleHidden = $("<div id='toggle'></div>").css({
                width: "24px",
                height: "12px",
                background: '#695f57',
                'border-radius': '50%',
                '-o-transition': 'all 0.1s ease-in-out',
                'transition': 'all 0.1s ease-in-out'
            });
            var eyeball = $('<div></div>').css({
                background: '#3b342f',
                'border-radius': '50%',
                margin: 'auto',
                width: '10px',
                height: '10px',
            });
            toggleHidden.append(eyeball);
            toggleHidden.hover(function () {
                $(this).css('opacity', 1)
            }, function () {
                $(this).css('opacity', .6)
            });
            toggleHidden.click(function () {
                $('.post:contains("hid")').not(':has("img")').slideToggle('slow');
                if ($(this).css('height') == "4px") {
                    $(this).children('div').show();
                    $(this).animate({
                        height: "12px"
                    }, "slow");
                } else {
                    $(this).animate({
                        height: "4px"
                    }, "slow");
                }
            });
            tools.append(toggleHidden);
            $('.trade .post .box:eq(0)').append(tools);
            if (GM_getValue("enableAutoHide") == true) {
                toggleHidden.click();
            }
            console.log('d');
        }
    });

})(jQuery);