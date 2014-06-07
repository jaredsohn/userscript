// ==UserScript==
// @name            Douban Highlight Friends Script
// @version         0.5.1
// @namespace       http://blog.luliban.com/
// @description     Highlight all your friends and contacts on every douban page
// @include         http://www.douban.com/*
// @require         http://jquery-douban.appspot.com/media/scripts/jquery.js
// @require         http://jquery-douban.appspot.com/media/scripts/sha1.js
// @require         http://jquery-douban.appspot.com/media/scripts/oauth.js
// @require         http://jquery-douban.appspot.com/media/scripts/jquery.douban.js
// @require         http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @reason          修正更新信息错误
// ==/UserScript==

// 自动更新
var auto_update = GM_getValue('auto_update', true);
if (auto_update) {
    var thisScript = {
        name: "豆瓣高亮友邻脚本",
        id: "38149",
        version: "0.5.1"
    }
    var updater = new Updater(thisScript);
    updater.check();
}

// API key
var api_key = '0107c5c3c9d4ecc40317514b5d7ec64c';
var api_secret = '7feaf4ec7b6989f8';

// 获取已存的高亮颜色
var friend_color = GM_getValue('friend_color', '#ffcccc');
var contact_color = GM_getValue('contact_color', '#ccffcc');

// 获取已存的request token和access token
var request_key = GM_getValue('request_key', '');
var request_secret = GM_getValue('request_secret', '');
var access_key = GM_getValue('access_key', '');
var access_secret = GM_getValue('access_secret', '');
var user_id = GM_getValue('user_id', '');

// 获取已存的友邻列表
var ONE_DAY = 86400000;
var cache_time = GM_getValue('cache_time', null);
var friends = GM_getValue('friends', '');
var contacts = GM_getValue('contacts', '');

// 调试
var debug = false;
var console = unsafeWindow.console || { debug: function() {} };
if (debug) {
    console.debug(access_key + ', ' + access_secret + ', ' + user_id);
    console.debug(friends, contacts);
}

// 初始化豆瓣service
var service = $.douban({
    key: api_key,
    secret: api_secret,
    type: 'greasemonkey'
});

if (access_key) {
    // 如果access token已存，直接设置
    service.login({ key: access_key, secret: access_secret });

    // 如果cache过期了（预设为一天），重新获取友邻列表
    var now = new Date();
    if (!cache_time || (now - cache_time > ONE_DAY)) {
        get_friends();
        get_contacts();
    }

    // 高亮用户链接和图片
    $(function() {
        highlight_users_on_page();
    });
} else if (request_key && location.href.match(/#friend_marker/)) {
    // 如果只有request token已存，则用request key获取相应的access token
    service.getAccessToken({
        key: request_key,
        secret: request_secret
    }, onAccessToken);
}

// 处理获取request token响应
function onRequestToken(token) {
    if (token.key) {
        if (confirm("现在将转入授权页面，请选择同意授权。授权成功后，将返回当前页面")) {
            // 保存request token
            GM_setValue('request_key', token.key);
            GM_setValue('request_secret', token.secret);

            // 重定向到授权页面
            setTimeout(function() {
                location.href = service.getAuthorizationUrl(token, location.href + '#friend_marker');
            }, 500);
        }
    } else {
        alert('授权失败，请稍后再试。');
    }
}

// 处理获取access token响应
function onAccessToken(token, user_id) {
    if (token.key) {
        // 保存access token和用户id
        GM_setValue('access_key', token.key);
        GM_setValue('access_secret', token.secret);
        GM_setValue('user_id', user_id);

        // 清除request token
        GM_setValue('request_key', '');
        GM_setValue('request_secret', '');

        // 登录service
        service.login(token);
    } else {
        alert('授权失败，请稍后再试。');
    }
}

// 设置授权命令
function authorize() {
    // 清除已存的access token
    GM_setValue('access_key', '');
    GM_setValue('access_secret', '');
    GM_setValue('user_id', '');

    // 获取request token
    service.getRequestToken(onRequestToken);
}

// 设置高亮友邻的颜色
var color_pattern = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;

function set_friend_color() {
    var color = prompt("输入高亮朋友的颜色，如\"#ffcccc\"", "");
    if (color_pattern.test(color)) GM_setValue('friend_color', color);
    else alert("你输如的色彩格式不正确");
}

function set_contact_color() {
    var color = prompt("输入高亮友邻的颜色，如\"#ffcccc\"", "");
    if (color_pattern.test(color)) GM_setValue('contact_color', color);
    else alert("你输如的色彩格式不正确");
}

// 设置是否自动更新
function set_auto_update() {
    if(confirm("是否设为自动更新友邻高亮脚本？"))
        GM_setValue('auto_update', true);
    else
        GM_setValue('auto_update', false);
}
GM_registerMenuCommand("授权豆瓣帐户（高亮友邻脚本）", authorize);
GM_registerMenuCommand("设置朋友的高亮颜色（高亮友邻脚本）", set_friend_color);
GM_registerMenuCommand("设置关注的高亮颜色（高亮友邻脚本）", set_contact_color);
GM_registerMenuCommand("设置是否自动更新（高亮友邻脚本）", set_auto_update);

// 更新朋友列表
function get_friends(offset) {
    offset = offset || 0;
    // 新建临时列表
    if (offset == 0) window._friends = [];

    service.user.friends(user_id, offset, 50, function(users) {
        // 如果没有取到所有的朋友，则继续抓取
        if (users.total && (offset + 50 < users.total)) {
            get_friends(offset + 50);
        }

        if (users.entries) {
            // 将获得的朋友的id，加入临时列表
            $.each(users.entries, function() {
                window._friends.push(this.userName);
            });

            // 保存朋友列表
            GM_setValue('friends', '|' + window._friends.join('|') + '|');
            
            // 设置缓存
            var now = new Date();
            GM_setValue('cache_time', '' + now.getTime());
        }
    });
}

// 更新关注列表
function get_contacts(offset) {
    offset = offset || 0;
    if (offset == 0) window._contacts = [];

    service.user.contacts(user_id, offset, 50, function(users) {
        if (users.total && (offset + 50 < users.total)) {
            get_contacts(offset + 50);
        }
        if (users.entries) {
            $.each(users.entries, function() {
                window._contacts.push(this.userName);
            });

            GM_setValue('contacts', '|' + window._contacts.join('|') + '|');
            var now = new Date();
            GM_setValue('cache_time', '' + now.getTime());
        }
    });
}

// 高亮页面上的友邻头像和链接
function highlight_users_on_page() {
    var links = $('a');
    var results = [];
    $.each(links, function() {
        var link = $(this);
        var is_user = (link.attr('href') || '').match(/^\/people\/(.*)\/$/);
        if (!!is_user) {
            var username = '|' + is_user[1] + '|';
            if (friends.indexOf(username) != -1) {
                highlight(link, 'friend');
            } else if (contacts.indexOf(username) != -1) {
                highlight(link, 'contact');
            }
        }
    });
}

// 处理单个链接高亮。
function highlight(link, type) {
    var color = type == 'friend' ? friend_color : contact_color;
    // 如果子节点是图片，则加上边框。
    link.children('img').css({ 'border': color + ' solid 1px' }).end()
        // 修正留言板的错位 bug
        .parent('li.mbtl').css({ 'margin-top': '7px' }).end();

    // 如果子节点是文字，则加上背景。
    if (!link.children().length) {
        link.css({ 'background': color });
        link.hover(function() {
            $(this).css({ 'background': '#003399' });
        }, function() {
            $(this).css({ 'background': color });
        });
    }
}

// vim: foldmethod=indent
