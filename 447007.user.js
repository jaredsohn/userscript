// ==UserScript==
// @name           RU-Board WhosOnline mod
// @author         Zloy_Gelud
// @namespace      http://userscripts.org/scripts/show/447007
// @include        http*://forum.ru-board.com/topic.cgi?forum=*
// @include        http*://72.233.112.78/topic.cgi?forum=*
// @include        http*://forum.ru-board.com/forum.cgi?forum=*
// @include        http*://72.233.112.78/forum.cgi?forum=*
// @icon           http://forum.ru-board.com/favicon.ico
// @description    Скрипт добавляет значок справа от имени юзера зеленого цвета - пользователь в онлайне, красного - модератор в онлайне, серого - оба в офлайне
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @updateURL      https://userscripts.org/scripts/source/447007.meta.js
// @downloadURL    https://userscripts.org/scripts/source/447007.user.js
// @screenshot     http://s3.amazonaws.com/uso_ss/25950/large.png
// @version        0.4
// @grant          none
// @run-at         document-start
// ==/UserScript==
if ((document.cookie.indexOf('amembernamecookie') >= 0) && (document.cookie.indexOf('apasswordcookie') >= 0)) {
    var Users = [];
    $.ajax({
        type: 'GET',
        url: 'http://forum.ru-board.com/whosonline.cgi',
        dataType: 'html',
        cache: false,
        success: function (html) {
            $('tr.dats td:first-child b a', $(html)).each(function (col) {
                var Moderator = $(this).find('font');
                if (Moderator.length > 0) {
                    Users[$(Moderator).html()] = 'mod';
                } else {
                    Users[$(this).html()] = 'mem';
                }
            });
        }
    });

    $(document).ready(function () {
        $('a.m b, tr[bgcolor="#FFFFFF"] td:last-child.dats>a', $('table')).each(function (user) {
            $('<div class="UState">').attr({
                style: 'width:4px;height:4px;left:4px;top:-1px;background:#C0C0C0;border:1px solid #A0A0A0;border-radius:100%;position:relative;display:inline-block;box-shadow: 0 0 2px rgba(51,51,51,0.9)',
                title: 'User offline'
            }).appendTo($(this).parent());
        });
    });

    $(document).ajaxComplete(function (e) {
        $('div.UState', $('table')).each(function (user) {
            var strStatus = Users[$(this).prev().html()];
            if (strStatus == 'mod') {
                $(this).css({
                    'background': '#cc4f4f',
                    'border': '1px solid #ff3126',
                    'box-shadow': '0 0 2px rgba(125,0,0,0.9)'
                });
                $(this).attr({
                    title: 'Moderator online'
                });
            } else if (strStatus == 'mem') {
                $(this).css({
                    'background': '#7AC774',
                    'border': '1px solid #54B94E',
                    'box-shadow': '0 0 2px rgba(0,125,0,0.9)'
                });
                $(this).attr({
                    title: 'User online'
                });
            }
        });
    })
}