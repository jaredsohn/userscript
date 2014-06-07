// ==UserScript==
// @name ZetaBoards Forum Links on Active Topics
// @namespace Gladstone of Zathyus Networks
// @description Add forum links to the active topics list on ZetaBoards 
// @include http://if.invisionfree.com/*
// @include http://*.zetaboards.com/*
// @include http://antiquusforum.com/*
// @include http://outlineforum.com/*
// @include http://zionfirefriends.com/*
// @include http://hogwartsnewzealand.com/*
// @include http://forums.planetnexus.net/*
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function jQ_ready() {
$(function () {
        $("#main form select option").each(function() {
            var str = $(this).text();
            var reg1 = /^\s/;
            if (!str.match(reg1)) {
                $(this).addClass("cat");
            }
        });

        $("#search_results_topics").next().children("tbody").children("tr").each(function() {
            $("td.c_cat-starter").next().addClass('forum-link').each(function() {
            var that = $(this);
            var forum_name = $.trim($(this).text());

            $("#main form select option:not('.cat')").each(function() {
                var option_name = $.trim($(this).text());
                if (option_name == forum_name) {
                    var link_id = $(this).val();
                    $(that).html("<a href='" + main_url + "forum/" + link_id + "'>" + forum_name + "</a>");
                }
            });
        });
        });
});
}

addJQuery(jQ_ready);