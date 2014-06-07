// ==UserScript==
// @name           Crossfire 4.0
// @namespace      created by antman
// @description    Crossfire 4.0 Theme
// @include        http://crossfire.nu/*
// @include        http://www.crossfire.nu/*
// @updateURL      https://userscripts.org/scripts/source/138527.user.js
// @icon           http://dl.dropbox.com/u/30121964/cf4/crossfire40.png
// @grant          unsafeWindow
// @version        1.7.1
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head').item(0);
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// backgrounds
addGlobalStyle('#pageBody { background: #363636 url("http://dl.dropbox.com/u/30121964/cf4/bgr_waves_light.jpg") repeat-x 0 0 !important; }');
addGlobalStyle('#header, #logoAndAd { background: #1f1f1f !important; }');
addGlobalStyle('#sidebar { background: #eee !important; }');
addGlobalStyle('#sidebarWrapper { background: #cccccc !important; }');
addGlobalStyle('#sidebarBackground, .controlsWrapper .overlay { visibility: hidden !important; }');
addGlobalStyle('#sidebar .item .header > .tab.active { background: #c4c7c9 !important; }');
addGlobalStyle('#footer, #copyrightBox { background: #363636 !important; }');
addGlobalStyle('.contentItem .imageWrapper { background: none !important; }');
addGlobalStyle('.tabsPanel:before { background: transparent !important; }');

// borders, margins and paddings
addGlobalStyle('#logoAndAd, #mainMenuAndCp { border-bottom: none !important; }');
addGlobalStyle('#logoAndAd, #footer { border-top: none !important; }');
addGlobalStyle('#mainPageContent { margin-right: 0 !important; }');
addGlobalStyle('#content { margin-right: 1em; }');
addGlobalStyle('#sidebar .item .content tbody tr td { padding: 0 0 0 1em !important; }');
addGlobalStyle('#content .commentsBlock .comment-create, #content .commentsBlock .note-create, .fatPanel { border-style: solid solid solid solid !important; }');
addGlobalStyle('#content .commentsBlock form.reply.inline-reply .close-inline-reply-form { margin-top: -8px !important; }');
addGlobalStyle('#profile-wall, #profile-activity, #profile-albums { margin-right: 1em !important; }');
addGlobalStyle('.tabsPanel > .opposite { padding: 4px 10px 0 0 !important; height: 18px; }');
addGlobalStyle('.icon-pencil { float: right; margin-right: 15px !important; }');

// positioning
addGlobalStyle('#headerLogo { top: 33px !important; }');
addGlobalStyle('#onlineCounterBox { top: 72px !important; }');
addGlobalStyle('#contentWrapper { max-width: 680px !important; }');

// fonts and colors
addGlobalStyle('body { font-size: 69% !important; }');
addGlobalStyle('body, h1, h2, h3, p, select, input, textarea, pre { font-family: Verdana, Helvetica, Arial, sans-serif !important; }');
addGlobalStyle('#sidebar .item .content tbody .comments { font-family: Verdana, Helvetica, Arial, sans-serif !important; font-size: .75em !important; font-weight: bold !important; }');
addGlobalStyle('#mainMenu, #cp { font-size: 12px !important; }');
addGlobalStyle('#sidebar .title a { font-size: 0.9em !important; }');
addGlobalStyle('#footerMenu .item, #copyrightBox > span { text-shadow: none !important; color: #fff !important; }');
addGlobalStyle('#footerMenu .item:hover, #footerMenu .item:focus { color: #ef7812 !important; background: #363636 !important; }');
addGlobalStyle('a, #content .content a, #content .commentsBlock .comment-box .header .author { color: #ff5a00; text-decoration: none !important; }');
addGlobalStyle('a:hover, #content .content a:hover, #content .commentsBlock .comment-box .header .author:hover { color: #000000; }');
addGlobalStyle('.title a:hover, .author a:hover, .type a:hover, .time a:hover { color: #ff5a00 !important; }');
addGlobalStyle('.author, .comments, .counter { font-size: 10px !important; }');
addGlobalStyle('.bb-container { text-align: justify; margin-right: 5px; }');
addGlobalStyle('.button.dark { float: none !important; height: 19px !important; line-height: 20px !important; }');
addGlobalStyle('button.reply, button.delete { cursor: pointer; line-height: 3em; margin: 0; padding: 0 1.5em; background-color: #ff8b2d; border-radius: .5em; font-size: 0.9em; font-weight: bold; text-decoration: none; text-transform: uppercase; text-shadow: #ff7700 0 -1px 0; color: #ffffff; border-style: none; background-image: -webkit-linear-gradient(top, #FF9F5A, #FF7700); background-image: -moz-linear-gradient(top, #FF9F5A, #FF7700); background-image: -o-linear-gradient(top, #FF9F5A, #FF7700); background-image: -ms-linear-gradient(top, #FF9F5A, #FF7700); vertical-align: middle; }');
addGlobalStyle('button.reply:hover, button.delete:hover { color: #000000 !important; }');
addGlobalStyle('.tagsWrapper .tag { font-size: 0.8em !important; padding: .25em .5em .25em .5em !important; }');
addGlobalStyle('#content .content .bb-container { font-size: 11px !important; }');
addGlobalStyle('#content .commentsBlock .comment-box .header .author { font-size: 11px !important; }');
addGlobalStyle('.contentInfo, #cp .item { text-transform: none !important; }');
addGlobalStyle('.contentInfo { font-size: 0.9em !important; }');
addGlobalStyle('.contentInfo .authorBy { font-size: 1em !important; }');

// comment boxes
addGlobalStyle('.comment-create { border: 1px #ccc !important; }');
addGlobalStyle('.comment-box { border: 1px solid #ccc; background: #f7f5f5; padding: 4px 0 4px 4px; }');
addGlobalStyle('.comment-box.comment-single-unread { border: 1px solid #ff5a00 !important; background: #ffb993 !important; padding: 4px 0 4px 4px; }');
addGlobalStyle('#content .commentsBlock .comment-box .headerWrapper { height: 17px !important; }');
addGlobalStyle('#content .commentsBlock .comment-box.comment-single-unread .body { border-left: 0 !important; }');
addGlobalStyle('#content .commentsBlock .comment-box { margin: .5em 0 .5em 0 !important; }');
addGlobalStyle('#content .commentsBlock .comment-box .header { border-top: 0 !important; }');
addGlobalStyle('#content .commentsBlock .comment-box .text .userQuote { background-color: #f0f9ff !important; border: 1px solid #82cffa !important; }');
addGlobalStyle('img.avatar, img.avatar.empty, img.avatar_comments { background: none !important; border: none !important; width: 43px !important; height: 17px !important; overflow: hidden !important; }');

// miscellaneous fixes
addGlobalStyle('* { word-wrap: break-word !important; }');
addGlobalStyle('.social, .tip, #sidebar .item .content table thead th { display: none !important; }');
addGlobalStyle('#sidebarSwitcher, .sidebarSwitcherContainer, #sidebarVideosAndAlbums { display: none !important; }');
addGlobalStyle('.columnSecondary { background: transparent !important; border-top: 26px solid #f4f3f3; }');