// ==UserScript==
// @name           Facebook likes on Google
// @author         Noriaki UCHIYAMA
// @namespace      noriaki.uchiyama@facebook.com
// @description    Displays Facebook like count on Google search result page.
// @include        http://*.google.*/search*
// @include        http://*.google.*/custom*
// @version        0.1.0
// @released       2011-03-07 01:00:00
// @updated        2011-03-07 03:10:00
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

jQuery.noConflict();
jQuery.extend(jQuery, {
    like: function(elm, options) {
        var default_options = {
            "href": "",
            "layout": "standard",
            "show_faces": true,
            "width": 450,
            "height": 60,
            "action": "like",
            "colorscheme": "light"
        };
        options = jQuery.extend({}, default_options, options);
        return jQuery(elm).after(create_iframe(options));

        function create_iframe(options) {
            return jQuery("<iframe>", {
                src: "http://www.facebook.com/plugins/like.php?" + jQuery.param(options),
                scrolling: "no",
                frameborder: 0,
                allowTransparency: "true",
            }).attr({
                width: options.width,
                height: options.height
            }).css({
                border: "none",
                overflow: "hidden",
                width: options.width,
                height: options.height
            });
        }
    }
});
jQuery.fn.extend({
    like: function(options) {
        return this.each(function(i, elm) {
            jQuery.like(jQuery(elm), jQuery.extend({
                "href": jQuery(elm).attr("href")
            }, options || {}));
        });
    }
});
jQuery(function($) {

    $(".vsc").each(function(i, item) {
        $(item).like({
            href: $(item).find(".tl .r .l").attr("href")
        });
    });

});

function log() { if(unsafeWindow.console) unsafeWindow.console.log(arguments); }
