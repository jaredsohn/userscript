// ==UserScript==
// @name           derpibooru2tumblr
// @namespace      TAT
// @description    Easy upload derpibooru images to tumblr
// @author         TAT
// @include        http://derpibooru.net/*
// @include        http://www.derpibooru.net/*
// @include        https://derpibooru.net/*
// @include        https://www.derpibooru.net/*
// @include        http://derpiboo.ru/*
// @include        http://www.derpiboo.ru/*
// @include        https://derpiboo.ru/*
// @include        https://www.derpiboo.ru/*
// @version        1.2
// ==/UserScript==

function derpibooru2tumblr() {
    this.main = function() {
        console.log("derpibooru2tumblr v.1.2 enabled!");
        $(document).ready(function() {
            if ($("#bbcode_embed_tag").length < 1) return;
            var a = $("#bbcode_embed_tag").html().substring(5).split("[/img]")[0],
                b = "http://derpiboo.ru/" + document.location.href.split("/")[document.location.href.split("/")[3] == "images" ? 4 : 3],
                c = [],
                tags = $(".image_show_tag").find("a"),
                d = null;
            if (b.indexOf("#") > -1) b = b.split("#")[0];
            $(".image_show_tag").find("a").each(function() { var e = $(this).text(); if (e != '+') c.push(e); });
            $("p").each(function(i,v) {
                var e = $(v).text();
                if (e.indexOf("Source:") > -1)
                    b = e.split("Source:")[1].trim();
                if (e.indexOf("Embed this image") > -1)
                    d = this;
            });
            if (d != null) {
                $(d).append('• <a href="#" onclick="window.open(\'http://www.tumblr.com/share/photo?' +
                        'source=' + escape(a) +
                        (c.length > 0 ? '&tags=' + c.join(', ') : '') +
                        "&clickthru=" + escape(b) +
                        '\',\'derpibooru2tumblr\',\'width=450,height=450\')">derpibooru2tumblr</a></b>');
            }
        });
    };
}

var script = document.createElement("script");
script.textContent = derpibooru2tumblr.toString() + "\nvar _derpibooru2tumblr = new derpibooru2tumblr();\nsetTimeout(function() { _derpibooru2tumblr.main(); },2000);";
document.head.appendChild(script);