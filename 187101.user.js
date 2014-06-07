// ==UserScript==
// @name       KNC POOL
// @namespace  http://use.i.E.your.homepage/
// @version    0.5.2.1
// @description  just for otk
// @match      http://konachan.com/pool/show/*
// @copyright  2014+, EVA
// ==/UserScript==

(function($) {
    var interval = 0,
        timer = null;

    function loadjs(src) {
        var tag = document.createElement("script");
        tag.type = "text/javascript";
        tag.src = src;
        document.head.insertBefore(tag);
    }

    function changeimg() {
        if ($(this).index(".imgcontainer img") == $(".imgcontainer img").length - 1) {
            $(this).hide();
            $(".imgcontainer img:eq(0)").show();
            return;
        }
        $(this).hide().next().show();
    }

    function changetimer() {
        if (timer) {
            clearInterval(timer);
            timer = null;
            interval = 0;
        }

        if (!interval) {
            interval = prompt("输入切换间隔") || 3500;
        }
        if (!interval) {
            return;
        }
        timer = setInterval("+function(){jQuery('.imgcontainer img:visible').click();}()", interval);
    }

    function showdown() {
        /*
        var ui = document.createElement("link");
        ui.href = "http://code.jquery.com/ui/1.10.3/themes/dot-luv/jquery-ui.css";
        ui.rel = "stylesheet";
        document.getElementsByTagName("head")[0].appendChild(ui);
        */

        var self = $(this);
        self.prop("disabled", true);

        $.getScript("http://code.jquery.com/ui/1.10.3/jquery-ui.js", function() {
            var dlg = $("<div>").appendTo("body");
            $(".imgcontainer img").each(function(index, img) {
                $("<p>").text(img.src).appendTo(dlg).css("color", "black");
            });
            dlg.dialog({
                width: 1000,
                close: function() {
                    $(this).remove();
                }
            });
            self.prop("disabled", false);
        });
    }

    $("<div class='modal-backdrop fade in'>").css("z-index", 0).appendTo("body");

    var container = $("<div class='imgcontainer'>")
        .css({
            "text-align": "center",
            "position": "fixed",
            "top": 0,
            "left": 0,
            "right": 0,
            "bottom": 0
        })
        .appendTo("body"),
        h = $(window).height(),
        w = $(window).width(),
        s = w / h,
        sends = 0,
        nice = 0,
        imglinks = $("#post-list-posts a");

    imglinks.each(function(index, e) {
        sends++;
        $.get(e.href, function(html) {
            nice++;
            var img = $(html).find(".image").appendTo(container).click(changeimg),
                imgh = img.height(),
                imgw = img.width(),
                imgs = imgw / imgh;

            if (imgs > s) {
                imgh = "auto";
                imgw = w;
            } else {
                imgw = "auto";
                imgh = h;
            }

            img.css({
                "height": imgh,
                "width": imgw
            });
        });

        if (index == imglinks.length - 1) {
            if (console) {
                console.log("send get : " + sends);
                console.log("nice get : " + nice);
            }
        }
    });

    container.find("img").not(":eq(0)").hide();

    container
        .append($("<button class='btn btn-primary'>Run</button>").css({
            position: "fixed",
            bottom: 50,
            right: 1
        }).click(changetimer))
        .append($("<button class='btn btn-primary'>Down</button>").css({
            position: "fixed",
            bottom: 1,
            right: 1
        }).click(showdown));

    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "http://cdn.bootcss.com/twitter-bootstrap/3.0.3/css/bootstrap.min.css";
    document.head.insertBefore(css, document.head.firstChild);

    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = "*{font-family:'微软雅黑' !important;}";
    document.head.insertBefore(style);

    loadjs("http://cdn.bootcss.com/twitter-bootstrap/3.0.3/js/bootstrap.min.js");
})(jQuery);