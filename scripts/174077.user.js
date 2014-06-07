// ==UserScript==
// @name        SteamCN 临时修正
// @namespace   http://userscripts.org/users/deparsoul
// @description 解决目前SteamCN首页版块图标动画与Firefox的兼容性问题
// @include     http://steamcn.com/*
// @version     0.1
// ==/UserScript==

jq('.big').css('transition', 'none');

jq('.forum-thumb.big').each(function(){
    var href = jq(this).find('.forum_thumb_icon a').attr('href');
    jq(this).wrap("<a href=\""+href+"\" />");
});

jq('.big').unbind('click');
