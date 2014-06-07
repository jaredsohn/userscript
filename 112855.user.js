// ==UserScript==
// @name           NicoLink
// @namespace      http://d.hatena.ne.jp/shobonengine/
// @description    ニコニコ動画の説明文に含まれる URL からリンクできるようにします
// @include        http://www.nicovideo.jp/watch/*
// @include        http://com.nicovideo.jp/community/*
// @include        http://www.nicovideo.jp/user/*
// ==/UserScript==


(function () {
    function replacedHtml(html) {
        var re = /(?:[^"])(http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?)/g;
        return html.replace(re, '<a href="$1" target="_blank">$1</a>');
    }
    
    // ニコニコ動画
    var itab_description = document.getElementById('itab_description');
    if (itab_description) {
        var html = itab_description.innerHTML;
        itab_description.innerHTML = replacedHtml(html);
    }
    
    // ニコニコミュニティ　ただいま生放送中！
    var now_live = document.getElementById('now_live');
    if (now_live) {
        var html = now_live.innerHTML;
        now_live.innerHTML = replacedHtml(html);
    }
    
    // ニコニコミュニティ　コミュニティプロフィール
    var community_description = document.getElementById('community_description');
    if (community_description) {
        var html = community_description.innerHTML;
        community_description.innerHTML = replacedHtml(html);
    }
    
    // ニコニコミュニティ　お知らせ
    var news = document.getElementById('news');
    if (news) {
        var html = news.innerHTML;
        news.innerHTML = replacedHtml(html);
    }
    
    // ニコニコミュニティ　お知らせ (コミュニティ参加者)
    var community_news = document.getElementById('community_news');
    if (community_new) {
        var html = community_news.innerHTML;
        community_news.innerHTML = replacedHtml(html);
    }
    
    // ユーザーページ
    var profileWrapBox = document.getElementById('profileWrapBox');
    if (profileWrapBox) {
        var html = profileWrapBox.innerHTML;
        profileWrapBox.innerHTML = replacedHtml(html);
    }
})();