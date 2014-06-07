// ==UserScript==
// @name           Fixed_Left_and_Top
// @namespace      www.mnc4.com
// @description    fixes left column and top column so stay on screen when scrolling main newsfeed
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/*
// @include        https://facebook.com/*
// @include        http://facebook.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle( '#leftCol {position: fixed; top: 40px; background: #fff; height: 100%; overflow: scroll; width: 200px; padding-left: 10px; padding-right: 10px; margin-left: -30px; border-left: 1px solid #aaa;}' + '#contentArea {margin-left: 100px;}' + '#blueBar {position: fixed; z-index: 9999; -webkit-box-shadow: 0px 0px 5px #000; -moz-box-shadow: 0px 0px 5px #000; box-shadow: 0px 0px 5px #000; top: 0;}' + '#global container{width: 1020px; }' + '.messageBody {font-size: 14px; line-height: 1.5em;}' + '#content {margin-top: 40px;}'
+ '#pageHead {position: fixed; z-index: 10000; top: 0; }' + '#contentCol {padding-top: 50px; background: #fff; padding-left: 10px; }' + 'body {background: #efefef; line-height: 1.5em; color: #000; font-size: 14px}' + '#rightCol, .fbFeedTickerStory {display: none;}' + 'div#contentArea, div#headerArea { margin-left: 160px;}' +'#headerArea {padding-left: 160px}' + ' #headerArea.uiButton {margin-left: -200px;}' + 'div#profile_view_actions.rfloat {margin-left: -200px;position: relative;float: none;left: 500px;top: 20px;}');