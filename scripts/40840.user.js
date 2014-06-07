// Douban Retweet
// A Greasemonkey script allows you to forward sayings and recommendations on Douban miniblog page
// version 0.2
// Copyright (c) 2009 Wu Yuntao <http://blog.luliban.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// --------------------------------------------------------------------
// ==UserScript==
// @name            Douban Retweet
// @version         0.2
// @namespace       http://blog.luliban.com/
// @description     Forward sayings and recommendations on Douban miniblog page
// @include         http://www.douban.com/contacts/*
// @require         http://jquery-douban.appspot.com/media/scripts/jquery.js
// @reason          Initial commit
// ==/UserScript==

if(/\/contacts\/(\?.*)?$/.test(location.href)) {

$(function() {
    // 获取我说输入框和推荐表单
    var sayBox = $('textarea[name="mb_text"]');
    var recommendDialog = $('form[name="rec_url_form"]');

    // 单击用户头像
    $('.mbtl').click(function() {
        // 获取相关用户名
        var name = '@' + $(this).find('img').attr('alt') + ',';

        // 在输入框增加 "@用户名,"
        sayBox.insert(name);

        return false;
    });

    // 双击广播条目
    $('.mbtr').dblclick(function() {

        // 如果是我说的广播条目
        if (/说：$/.test($(this).children('.pl').text())) {

            // 获取相关用户名和用户说
            var name = $(this).children('a:first').text();
            var say = $(this).find('.quote > .inq').text();

            // 生成 retweet 语句，如 "RT @用户名, 用户说"
            var text = "转 @" + name + ": " + say;

            // 在输入框插入 retweet 语句
            sayBox.insert(text, true);

            return false;
        }

        // 如果是推荐的广播条目
        if (/^推荐/.test($(this).children('.pl').text())) {

            // 获取用户名
            var name = $(this).children('a:first').text();

            // 获取推荐的站外网址
            var url = $(this).children('.broadsmr').text();

            // 获取推荐的站内（包括九点）网址
            if (!/^https?:\/\//.test(url)) {
                url = $(this).children('.pl').children('a:last').attr('href');
            }

            // 为豆瓣本地URI加上host
            if (!/^https?:\/\//.test(url) && /^\/.*/.test(url)) {
                url = 'http://www.douban.com' + url;
            }

            // 如果还是无法获取正确的URL，取消这次推荐
            if (!/^https?:\/\//.test(url)) {
                return false;
            }

            // 获取网页标题
            var title = $(this).children('.pl').children('a').text();

            // 获取评论
            var comment = $(this).find('.quote > .inq').text();

            if (!comment.length) {
                // 获取有多人同时推荐时候的评论
                comment = $(this).find('.indentrec:first .norquote').text();
                if (comment.length) {
                    comment = comment.match(/^\ "(.*)"\ $/)[1];
                }
            }

            // 生成 retweet 语句，如 "RT @用户名, 用户评论"
            text = "转 @" + name + ': ' + comment;

            // 弹出推荐对话框
            recommendDialog.open({
                url: url,
                title: title,
                comment: text
            });

            return false;
        }
    });
});

$.fn.insert = function(text, clear) {
    if (!this.length) return this;

    if (this.val().length && !clear) text = this.val() + ' ' + text;

    return this.val(text);
};

$.fn.open = function(s) {
    if (!this.length) return this;

    this.find('.a_search_text').val(s.url).end()
        .find('.a_rec_btn').trigger('click').end()
        .find('.a_search_text').val('http://').end();

    waitDialog(function(dialog) {
        return dialog.find('.reccomment')
            .find('input[name="title"]').val(s.title).end()
            .find('textarea[name="comment"]').val(s.comment).end()
            .end();
    });

    return this;
};

function waitDialog(callback) {
    var dialog = $('#dialog');
    if (!dialog.length) {
        setTimeout(waitDialog, 100, callback);
    } else {
        if (typeof callback == 'function') return callback(dialog);
    }
}

}
