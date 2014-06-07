// ==UserScript==
// @name          Glitch Location Helper
// @namespace     glitcth.userscripts.location
// @description	  For players of Glitch! Use this bookmarklet at glitch.com/locations to see where you've been!
// @version	0.3.5
// @date 10/8/2011
// @include http://www.glitch.com/locations/
// ==/UserScript==

function main() {
    //if (!/glitch\.com\/locations/i.test(window.location)) {
    //   confirm("Use this at glitch.com/locations! Go there now?") && (window.location = "http://glitch.com/locations/");
    //    return false
    //}
    if ($(".metabolics").length == 0) {
        alert("Log in first!");
        return false
    }
    $("a[href*=locations]:only-child").each(function () {
        var i = $('<a style="margin-left:30px; color:#C0C0C0;" href="' + this.href + '">Set as Destination</a>').click(function () {
            var j = this;
            $.ajax({
                type: "post",
                url: j.href,
                data: {
                    set_as_destination: 1
                }
            });
            return false
        });
        $(this).after(i)
    });
    var a = $('<div class="dialog"></div>');
    var h = $('<h2 style="margin:0;text-align:center;"></h2>');
    $(a).append($($('<div class="dialog-inner"></div>')).append(h).append($('<a class="close" href="#">x</a>').click(c))).hide();
    $(document.body).append(a);

    function d(i) {
        return $(h).html(i)
    }

    function c() {
        for (var j = 0; j < e.length; j++) {
            e[j].abort()
        }
        e = [];
        $(a).fadeOut();
        return (b = false)
    }

    function g() {
        $(a).fadeIn()
    }

    function f(j, i) {
        $(j).css("color", (i) ? "grey" : "red");
        $(j).css("font-weight", (i) ? "normal" : "bold");
        if (i) {
            $(j).addClass("checked")
        }
    }
    var e = [];
    var b = false;
    $("h3 ~ ul").each(function () {
        var j = this;
        var i = $('<a href="#" style="position:absolute;top:60px;left:40px;">Check</a>').click(function () {
            if (b) {
                return false
            }
            b = true;
            g();
            var k = $(j).find("a:first-child");
            if (!k.length) {
                d("No locations found!");
                return setTimeout(c, 2000)
            }
            var l = k.length;

            function m() {
                l--;
                if (l) {
                    d(l + " remaining...")
                } else {
                    c()
                }
            }
            d(k.length + " found, checking...");
            $(k).each(function () {
                var n = this;
                if ($(n).hasClass("checked")) {
                    m();
                    return
                }
                e.push($.ajax({
                    url: n.href,
                    dataType: "html",
                    success: function (o) {
                        f(n, !/never been/i.test(o));
                        m()
                    }
                }))
            });
            return false
        });
        $(j).before(i)
    })
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);