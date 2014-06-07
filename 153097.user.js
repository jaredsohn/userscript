// ==UserScript==
// @name	Wykop pokaż obrazki
// @namespace	http://userscripts.org/scripts/show/153097
// @author	kasper93
// @description	Umożliwia załadowanie wszystkich obrazków/filmików w komentarzach/wpisach za pomoca tylko jednego przycisku. 
// @include	http://*.wykop.pl/link*
// @include	http://*.wykop.pl/mikroblog*
// @include	http://*.wykop.pl/wpis*
// @include	http://*.wykop.pl/tag*
// @downloadURL	https://userscripts.org/scripts/source/153097.user.js
// @updateURL	https://userscripts.org/scripts/source/153097.meta.js
// @version	1.3.2
// @grant	none
// @run-at	document-end
// ==/UserScript==

function main() {
    //ustawienia
    var bLoadImg = true;
    var bLoadVid = false;
    var bRemoveWatermark = true;
    //koniec ustawień
    var button = '<a href="javascript: void(0)" class="small pobierzobrazki"><span>v</span></a> | ';
    var button1 = '<a class="button pding0_15 small marginleft5 fright pokazobrazki" style="line-height: 20px !important; height: 20px;" href="javascript: void(0)">Poka\u017c obrazki</a>';
    var button2 = '<li class="inline "><a class="pobierzobrazki" href="javascript: void(0)">v</a></li>';
    var autobutton = '<a class="button pding0_15 small marginleft5 fright auto" style="line-height: 20px !important; height: 20px;" href="javascript: void(0)">auto</a>';
    var a_c = ".scale";
    var a_f = "#activities-stream";
    var w_c = "blockquote";
    var b_c = "#body-con";
    var auto = "off";
    // Sprawdzamy gdzie jesteśmy, żeby wiedzieć gdzie dodać przyciski.
    if (gdzie("mikr")) {
        $("span.votes.hoverup").prepend(button);
        $("ul.newtagmenu").append(autobutton + button1);
        var settings = "ali_mikr";
        auto = localStorage.getItem(settings);
    } else if (gdzie("wpis")) {
        $("span.votes.hoverup").prepend(button);
        $("ul.newtagmenu").append(autobutton + button1);
        var settings = "ali_wpis";
        auto = localStorage.getItem(settings);
    } else if (gdzie("link")) {
        a_f = "#comments-list-entry";
        $("div.bgecf2f7").append(autobutton + button1);
        $("ul.breaklist.hoverup").prepend(button2);
        var settings = "ali_link";
        auto = localStorage.getItem(settings);
    } else if (gdzie("tag/")) {
        a_c = b_c;
        $("ul.newtagmenu").append(autobutton + button1);
        $(".pokazobrazki").removeClass("fright");
        $(".auto").removeClass("fright");
        $("span.votes.hoverup").prepend(button);
        var settings = "ali_tag";
        auto = localStorage.getItem(settings);
    }
    // Ładujemy automatycznie?
    $(document).ready(function() {
        if ("on" == auto) {
            var $this = $(a_f, a_c);
            $("a", $this).open();
            $(".auto").addClass("orange");
            linki($this);
        }
    });
    // Ładujemy obrazki z całej strony po kliknięciu na przycisk.
    $(".pokazobrazki").click(function() {
        var $this = $(this).closest(b_c).find(a_f);
        $("a", $this).open();
        linki($this);
    });
    // Ładujemy obrazki z danego wpisu po kliknięciu na 'v'.
    $(".pobierzobrazki").on("click", function() {
        var $this = $(this).closest(w_c);
        $("a", $this).open();
        $("a.show-more", $this).click();
        linki($this);
    });
    // ustawienia auto [on/off]
    $(".auto").click(function() {
        if ("on" == auto) {
            localStorage.setItem(settings, "off");
            auto = "off";
            $(this).removeClass("orange");
        } else {
            localStorage.setItem(settings, "on");
            auto = "on";
            $(this).addClass("orange");
        }
    });
    // magiczna funkcja zmuszająca funkcje wykopowe do rozwinięcia obrazka.
    $.fn.open = function() {
        $(this).filter(function() {
            var $th = $(this);
            return "undefined" != typeof $th.attr("href") && "lightbox[w]" !== $th.attr("rel") && bLoadImg && $th.attr("href").match(/\.(jpg|jpeg|png|gif)/i) || bLoadVid && $th.attr("href").match(/(youtube\.|youtu\.be|vimeo\.com)/i);
        }).trigger({
            type: "click",
            which: 0
        });
    };
    // Zamieniamy src obrazków na źródłowe, timeout, żeby być pewnym, że się załadowało i będzie co zmieniać :)
    function linki($this) {
        window.setTimeout(function() {
            // zamianiamy zrodlo obrazka na oryginalne
            $("a[target=_blank] > span > img", $this).each(function() {
                var $this = $(this);
                var src = $this.closest("blockquote").find(".c999 > a[target=_blank]").attr("href");
                if (bRemoveWatermark) {
                    src = src.replace(/^(https?:\/\/\w\d+\.cdn\d+\.imgwykop\.pl\/.+),.+(\.\w{1,4})(.?)+$/, "$1$2");
                }
                $this.attr("src", src);
                $this.closest(".embed").removeClass("embed");
                $this.removeAttr("height");
                $this.css("max-height", .85 * $(window).height());
                $this.css("max-width", "99%");
                $this.closest("a").attr("href", src).removeClass("tooLongPicture");
                $this.parent().find(".tooLongPictureHint").remove();
                //$this.parent().find(".tooLongPictureHint").width($(this).width());
                $this.hover(
                    function() {
                        $(this).css("max-height", ""); //.css("max-width", $(window).width());
                    },
                    function() {
                        $(this).css("max-height", .85 * $(window).height()).css("max-width", "99%");
                    }
                );
            });
            $(".img_att > img", $this).each(function() {
                var $this = $(this);
                $this.css("max-width", "99%");
                $this.css("max-height", .85 * $(window).height());
            });
        }, 500);
    }
    function gdzie(e) {
        return document.location.pathname.substring(0, 5) == "/" + e;
    }
}

if ("undefined" == typeof $) {
    if ("undefined" != typeof unsafeWindow && unsafeWindow.jQuery) {
        // Firefox
        var $ = unsafeWindow.jQuery;
        main();
    } else {
        // Chrome
        addJQuery(main);
    }
} else {
    // Opera
    main();
}

function addJQuery(callback) {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}