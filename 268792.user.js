// ==UserScript==
// @name           twitch color changer
// @include        *://www.twitch.tv/*
// ==/UserScript==

var mybg = "#000";
var myfg = "#777";
var mytc = "#444";

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.tse-scroll-content, .stretch, .text, .js-title { background-color: ' + mybg + ' !important; }');
addGlobalStyle('#right_col .content .bottom #controls, #right_col .content .bottom .link, #right_col .content #sub-link #controls, #right_col .content #sub-link .link { border: none !important; }');
addGlobalStyle('a, textarea, .dropdown_static { box-shadow: none !important; }');
addGlobalStyle('.action, #right_nav .tab { text-shadow: none; !important; }');

addGlobalStyle('.tab, .segmented_tabs, #controls, .normal_button { background: ' + mytc + ' !important; }');
addGlobalStyle('.dropdown_static, .dropdown_glyph { background: url("../images/xarth/dropdown_arrow.png") no-repeat scroll right center ' + mytc + '  !important; }');
addGlobalStyle('#right_col .bottom #controls, #right_col .bottom .link, #right_col #sub-link #controls, #right_col #sub-link .link { border: none !important; }');

addGlobalStyle('a, .playing, #chat_line_list, .title, .header, .js-title, .panel, .panel h3 { color: ' + myfg + ' !important; }');