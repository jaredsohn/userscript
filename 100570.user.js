// ==UserScript==
// @name           fanfou-user-switcher
// @namespace      fanfou
// @include        http://fanfou.com/home
// @include        http://fanfou.com/home?*
// @include        http://fanfou.com/replies
// @include        http://fanfou.com/replies?*
// @include        http://fanfou.com/mentions
// @include        http://fanfou.com/mentions?*
// @include        http://fanfou.com/mentions/*
// @include        http://fanfou.com/privatemsg
// @include        http://fanfou.com/privatemsg/sent
// @include        http://fanfou.com/login#add_to_switcher
// ==/UserScript==

(function() {
    /* Document functions */
    var $i = function(id) { return document.getElementById(id); };
    var $c = function(tag) { return document.createElement(tag); };
    var $t = function(text) { return document.createTextNode(text); };
    if (location.hash == '#add_to_switcher') {
        var $al = $i('autologin');
        $al.checked = true;
        $al.parentNode.replaceChild(
            $t(' \u4fdd\u5b58\u5230\u201c\u591a\u8d26' +
               '\u6237\u5207\u6362\u5217\u8868\u201d'),
            $al.nextSibling);
        return;
    }
    /* Init cookies */
    var cookie_strs = document.cookie.split(/\s*;\s*/);
    var cookies = { };
    for (var i = 0; i < cookie_strs.length; ++i) {
        var cookie = cookie_strs[i];
        var pos = cookie.indexOf('=');
        if (pos < 0) continue;
        cookies[cookie.substr(0, pos)] = cookie.substr(pos + 1);
    }
    /* Init storage data */
    var data = localStorage.switcher;
    data = data ? JSON.parse(data) : { };
    /* Cookie operation functions */
    var deleteCookie = function(name) {
        document.cookie = name + '=;domain=.fanfou.com;' +
                          'expires=Thu, 01 Jan 1970 00:00:00 GMT';
    };
    var setLogin = function(al) {
        deleteCookie('al');
        deleteCookie('u');
        deleteCookie('m');
        deleteCookie('uuid');
        deleteCookie('SID');
        if (al) {
            document.cookie = 'al=' + al + ';domain=.fanfou.com';
            location.reload();
        } else {
            location.href = '/login#add_to_switcher';
        }
    };
    /* Get infomation of current user */
    var user_id = cookies.u;
    var $user_top = $i('user_top');
    var nickname = $user_top.getElementsByTagName('h3')[0].textContent;
    var image = $user_top.getElementsByTagName('img')[0].src;
    var auto_login = cookies.al;
    /* Add current user */
    if (auto_login) {
        data[user_id] = {
            'image': image,
            'nickname': nickname,
            'auto_login': auto_login,
        };
        localStorage.switcher = JSON.stringify(data);
    }
    /* Hook logout */
    var $nav = $i('navigation');
    var $nav_links = $nav.getElementsByTagName('a');
    var $logout = $nav_links[$nav_links.length - 1];
    $logout.addEventListener('click', function() {
        data[user_id] = undefined;
        localStorage.switcher = JSON.stringify(data);
    }, true);
    /* Insert styles */
    var $style = $c('style');
    $style.innerHTML =
    '#user_switcher { display: none; position: relative; margin-top: 2px; border-top: 1px solid #ccc; }' +
    '#user_top:hover #user_switcher { display: block ; }' +
    '#user_switcher a:hover { text-decoration: none; }' +
    '#user_switcher a h3 { font-size: 12px; font-weight: normal; line-height: 24px; }' +
    '#user_switcher a h3:hover { background-color: rgba(0,0,0,.05); }' +
    '#user_top { ' +
        'position: absolute; width:202px; z-index: 2; border: 1px solid #ccc; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; ' +
        'margin: -3px 11px 9px -3px; padding: 2px; ' +
    '} ' +
    '#user_top a { float: none; width: auto; height: auto; }' +
    '#user_top a img { float: left; width: 32px; height: 32px; margin-right: 10px; }' +
    '#user_switcher a img { float: left; width: 16px; height: 16px; margin: 4px; }' +
    '#user_top:hover { ' +
        'border: 1px solid #aaa; -webkit-box-shadow: 1px 2px 3px rgba(0,0,0,.3); -moz-box-shadow: 1px 2px 2px #999; ' +
        'background-color: rgba(255,255,255,.95); ' +
    '} ' +
    '#user_top h3:after { ' +
        'content: "\u25be"; ' +
        'float: right; margin-right: 5px; opacity: .5; ' +
    '} ' +
    '#user_switcher h3:after { ' +
        'content: none; ' +
    '} ' +
    '#user_switcher .addnew { ' +
        'border-top: 1px solid #ccc; height: 24px; padding-top: 9px; ' +
    '} ' +
    '#user_switcher .addnew a { ' +
        'margin: 3px; padding: 3px 6px; border: 1px solid #ccc; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; color: #666; background: #f5f5f5; background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#eee)); background: -moz-linear-gradient(top, #fff, #eee); ' +
    '} ' +
    '#user_switcher .addnew a:hover { ' +
        'color: #333; border-color: #999; ' +
    '} ' +
    '#reminder { ' +
        'margin-top: 47px; ' +
    '}';
    document.getElementsByTagName('head')[0].appendChild($style);
    /* Create user list */
    var $user_list = $c('ul');
    $user_list.id = 'user_switcher';
    for (var id in data) {
        if (! data.hasOwnProperty(id)) continue;
        var user = data[id];
        if (id == user_id) continue;
        var $item = $c('li');
        var $link = $c('a');
        $link.href = 'javascript:void(0);';
        $link.addEventListener('click', (function(al) {
            return function() { setLogin(al); };
        })(user.auto_login), true);
        var $image = $c('img');
        $image.src = user.image;
        $image.alt = user.nickname;
        $link.appendChild($image);
        var $name = $c('h3');
        $name.appendChild($t(user.nickname));
        $link.appendChild($name);
        $item.appendChild($link);
        $user_list.appendChild($link);
    }
    var $another = $c('li');
    $another.className = 'addnew';
    var $link = $c('a');
    $link.href = 'javascript:void(0);';
    $link.addEventListener('click', function() { setLogin(); }, true);
    $link.appendChild($t('\u767b\u5165\u53e6\u4e00\u4e2a...'));
    $another.appendChild($link);
    $user_list.appendChild($another);
    $i('user_top').appendChild($user_list);
})();