// ==UserScript==
// @name       KNC POST
// @namespace  http://use.i.E.your.homepage/
// @version    0.4.0.0
// @description  enter something useful
// @match      http://konachan.com/post*
// @copyright  2012+, You
// ==/UserScript==
(function($) {
    function loadjs(src) {
        var tag = document.createElement("script");
        tag.type = "text/javascript";
        tag.src = src;
        document.head.insertBefore(tag);
    }

    function do_post() {
        var container,
            previous = $(".previous_page"),
            next = $(".next_page"),
            h = $(window).height(),
            w = $(window).width(),
            s = w / h;

        function setPageBtn(sourceDocument){
            previous.data('href', $(".previous_page", sourceDocument).attr('href'));
            next.data('href', $(".next_page", sourceDocument).attr('href'));
        }

        function appendImg(sourceDocument){
            $("#post-list-posts a.directlink", sourceDocument)
                .each(function(index, e) {
                    var img = $("<img>")
                        .appendTo(container)
                        .hide()
                        .attr("src", e.href)
                        .click(changeimg),
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
        }

        function getOtherPage() {
            var href= $(this).data('href');
            if (console) {
                console.log(href);
            }
            if (!href || href == location.href.replace(location.origin, '')) {
                return;
            }
            $.get(href, function(html){
                var newDocument = $(html);
                appendImg(newDocument);
                setPageBtn(newDocument);
            });
            return;
        }

        function disablePageBtn(btn, leftOrRight){
            if (btn.is('span')){
                btn = $('<a>')
                        .attr('href', btn.attr('href'))
                        .addClass(btn.attr('class'))
                        .removeClass('disabled')
                        .text(btn.text());
            }

            btn
                .appendTo('body')
                .data('href', btn.attr('href'))
                .attr('href', 'javascript:void()')
                .click(getOtherPage)
                .addClass("btn btn-primary")
                .css(
                    leftOrRight
                    ? {
                        position: "fixed",
                        bottom: 0,
                        left: 0
                    }
                    : {
                        position: "fixed",
                        bottom: 0,
                        right: 0
                    }
                );
        }

        function changeimg() {
            if ($(this).index() == $(".imgcontainer img").length - 1) {
                $(this).hide();
                $(".imgcontainer img:eq(0)").show();
                return;
            }
            $(this).hide().next().show();
        }

        $("<div class='ui-widget-overlay'>").appendTo("body");
        container = $("<div class='imgcontainer'>")
            .css({
                "text-align": "center",
                "position": "fixed",
                "top": 0,
                "left": 0,
                "right": 0,
                "bottom": 0
            })
            .appendTo("body");

        disablePageBtn(previous, true);
        disablePageBtn(next, false);
        appendImg(document);

        container
            .find("img:eq(0)")
                .show();
    }

    !function (){
        if (!$) {
            loadjs("http://cdn.bootcss.com/jquery/1.10.2/jquery.min.js");
        }

        $("<button class='btn btn-primary'>")
            .text("幻灯片")
            .click(function() {
                do_post();
                $(this).remove();
            }).css({
                position: "fixed",
                right: 1,
                bottom: 1
            }).appendTo('body');


        var css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "http://cdn.bootcss.com/twitter-bootstrap/3.0.3/css/bootstrap.min.css";
        document.head.insertBefore(css, document.head.firstChild);

        var style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = "*{font-family:'微软雅黑' !important;}";
        document.head.insertBefore(style);

        loadjs("http://cdn.bootcss.com/twitter-bootstrap/3.0.3/js/bootstrap.min.js");
    }();
})(jQuery);