// ==UserScript==
// @name        highlight_id
// @namespace   
// @include     http://forum*.hkgolden.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @description highlight_id
// @version     0.1
// @grant       none
// ==/UserScript==


var link = $("#ctl00_ContentPlaceHolder1_lb_UserName a").attr("href");

var id = link.split("=");

function hightlight() {
    $("tr[userid]").each(function () {
        if ($(this).attr("userid") == id[1]) {
            $(this).find("td").css({"background-color": "#E9EC6C"});
        }
    });
}

hightlight();