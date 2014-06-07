// ==UserScript==
// @name  Pure New Weibo
// @namespace     http://stylebot.me/styles/663
// @description   Supports New Weibo both Narrow and Wide version.
// @Version: 1.2 @ 2011-09-15
// @include   http://weibo.com/*
// @include   https://weibo.com/*
// @include   http://t.sina.com.cn/*
// @include   https://t.sina.com.cn/*
// @author        disinfeqt
// ==/UserScript==
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = '.declist, .send_weibo .title, #Box_right, .border, #pl_leftNav_app, #base_scrollToTop, .global_footer, .nfTagB_group, #pl_content_promotetopic, #pl_content_homeInterest, #pl_relation_recommendPopularUsers, #pl_content_allInOne, #pl_content_topic, #pl_common_help, #pl_common_feedback, #pl_common_reportentry {    display: none;}.nfTagB_sec {    border-top: none;    background: none;    padding: 2px 0;}.left_nav .user_atten {    margin: 0 0 0 11px;}.send_weibo .kind {    padding: 5px 0 10px 0;}.send_weibo .kind a {    margin: 0 10px 0 0;    padding: 2px 0 2px 20px;    text-indent: -9999px;}.left_nav .user_atten li {    margin: 0 5px 0 0;}.B_index .feed_lists {    margin-top: 10px;}.left_nav .border {    background: none;}.border:nth-child(1), .border:nth-child(2) {    display: block;}.W_main {    width: 750px;}.W_main_bg {    min-height: 1000px;}#wbim_box {    right: 0;}.feed_list .piclist li[action-type="feed_list_media_video"] {    display: none;} .W_main_r .left_nav {border-bottom-color:none;border-bottom-style:none;}';
document.documentElement.appendChild(styleEl);