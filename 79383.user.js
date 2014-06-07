// ==UserScript==
// @name           soundcloud dl+
// @author         Alexander Nordelius (alexander.nordelius@gmail.com)
// @version        v.0.2
// @namespace      http://walk-alone.ru
// @description    adds "download preview" links, hides annoying timestamped comments
// @include        http://www.soundcloud.com/*
// @include        http://soundcloud.com/*
// ==/UserScript==

document.addEventListener("DOMContentLoaded", function() {
    $("div.player").addClass("no-comments");
   var db = window.SC.clientDB.getTracks();
        $.each(db, function(i, v) {       
            var
            s = $("div[data-sc-track=" + v.id + "]"),
            d = s.find("span.download");
            d.hasClass("disabled") && d.remove();
            $("<a/>", {
                class: "pl-button",
                href: v.streamUrl,
                title: "Download Preview",
                html: "&darr;&nbsp;Preview"
            }).appendTo(s.find("div.secondary"));
        })
}, true);