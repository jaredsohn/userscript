// ==UserScript==
// @name  Pure New Weibo Mod For V5 By roamlog
// @description   clean the whole world

// this script support both firefox and chrome, you need to install the Greasemonkey add-on for Firefox

// v1.2(2012.11.19)
// @include   http://weibo.com/*
// @include   https://weibo.com/*
// @include   http://t.sina.com.cn/*
// @include   https://t.sina.com.cn/*
// @include   http://www.weibo.com/*
// @include   https://www.weibo.com/*
// @author        roamlog
// ==/UserScript==
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = '#Box_right,#pl_leftnav_app,#base_scrollToTop,#WB_webim,#pl_content_biztips,.tab_nosep,.right_bar,.pf_info_right,.S_textb,.global_footer,.W_main_2r,.W_main_r,.icon_sw_qing,.icon_sw_vote,.icon_sw_mood,.icon_sw_welfare,.gn_title[node-type^="game"],.gn_title[node-type^="weiba"],.gn_title[node-type^="app"],.gn_setting[node-type^="member"]{display:none;}.W_main{width:750px;}.W_main_a{width:600px;}.W_profile_main .W_main_c{width:750px;}.WB_global_nav .gn_person{float:left;margin-left:70px;}.WB_global_nav .gn_logo{left:116px;}.WB_global_nav .gn_nav{margin:0 0 0 251px;}.WB_global_nav .gn_search{margin:7px 0 0 60px;}.B_myfollow .W_main_a{width:518px;}.profile_top .pf_info_left {width:518px;}.layer_menulist_tags{width:476px;}.B_myfans .W_main_a{width:560px;}.cnfList .con_new .con_left{margin-right:0;}';
document.documentElement.appendChild(styleEl);