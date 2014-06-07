// ==UserScript==
// @name vkontakte music saver
// @namespace vkontakte::music
// @version 0.1.2
// @description Download music from vkontakte.ru
// @include http://vkontakte.ru/*
// @include http://*.vkontakte.ru/*
// @include http://vk.com/*
// @include http://*.vk.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

var save_logo_src = 'http://dl.dropbox.com/u/1762581/vkontakte/download.png';
var save_img = "<img height='16' alt='Сохранить' title='Сохранить' src='" + save_logo_src + "' />";

var timer = null;
function initSaveMusicIcon() {
    $(".audio input[type='hidden']").each(function () {
        addSaveMusicIcon(this);
    });
}
function addSaveMusicIcon(block) {
    if (block == null) return;
    var url = $(block).val().split(",")[0];
    $(block).attr("save_music", "1");
    $(block).parent().siblings().find(".duration").before("<a style='float: left; padding-right: 5px' href='" + url + "'>" + save_img + "</a>");
}
$(document).ready(function () {
    initSaveMusicIcon();
    $("body").bind("DOMNodeInserted", function (event) {
        if ($(event.target).hasClass("audio")) {
            var block = $(event.target).find("input[type='hidden']");
            if (block.size() > 0)
                addSaveMusicIcon(block[0]);
        }
        else {
            $(event.target).find(".audio input[type='hidden'][save_music!='1']").each(function () {
                addSaveMusicIcon(this);
            });
        }
    });
});