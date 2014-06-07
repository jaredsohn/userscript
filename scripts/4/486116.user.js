// ==UserScript==
// @name PTT網頁版自動換行修正
// @namespace http://userscripts.org/users/kenqr
// @version 1.0.0
// @description 修正PTT網頁版在Firefox上沒有自動換行的問題
// @include http://www.ptt.cc/bbs/*/*.html
// @require http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

(function($){
    $(document).ready(function(){
        $('#main-content').css('white-space', 'pre-wrap');
    });
})($.noConflict(true));
