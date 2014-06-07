// ==UserScript==
// @name        Klassik Radio - Title
// @namespace   http://klassikradio.de
// @include     http://*klassikradio.de/liveplayer.php*
// @version     0.1
// @author      heinrichmartin
// @description Adds the title of the current playlist item to the browser's title bar.
// ==/UserScript==

function title_refresh() {
    unsafeWindow.$("img[onclick][src='player/refresh_btn.jpg']").click();
    var title = unsafeWindow.$("#playlist tr:nth-of-type(2) tr:nth-of-type(1) td:last-of-type span").attr("title");
    if (undefined == title) {
        title = unsafeWindow.$("#playlist tr:nth-of-type(2) tr:nth-of-type(1) td:last-of-type").text();
    };
    var composer = unsafeWindow.$("#playlist tr:nth-of-type(2) tr:nth-of-type(2) td:last-of-type").text();
    title = composer + ": " + title + " by ";
    console.log(composer + ": " + title);
    var opts = new Object();
    opts.text = title;
    unsafeWindow.$.marqueeTitle(opts);
};

// jquery extension for scrolling page titles, extended from
// http://blog.dreasgrech.com/2010/02/scrolling-page-title-with-javascript.html
(function ($) {
    var shift = {
        "left": function (a) {
            a.push(a.shift());
        },
        "right": function (a) {
            a.unshift(a.pop());
        }
    };
    $.marqueeTitle = function (options) {
        var opts = $.extend({},
        {
            text: "",
            dir: "left",
            speed: 200,
            sep: " "
        }, options),
            t = (opts.text || document.title).split("");
        if (!t || $.marqueeTitleTitle == t.join("")) {
            return;
        }
        $.marqueeTitleTitle = t.join("");
        t.push(opts.sep);
        clearInterval($.marqueeTitleInterval);
        $.marqueeTitleInterval = setInterval(function () {
            var f = shift[opts.dir];
            if (f) {
                f(t);
                document.title = t.join("");
            }
        }, opts.speed);
    };
}(unsafeWindow.jQuery));

console.log("Title extension loaded for Klassik Radio Player.");

title_refresh();
setInterval(title_refresh,10000);
