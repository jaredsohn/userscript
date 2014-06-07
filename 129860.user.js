// ==UserScript==
// @name   Pure Rounded Weibo Mod By ihead
// @namespace   http://userscripts.org/scripts/show/129860
// @description   A minor revision based on roamlog's style: http://stylebot.me/styles/669 Rounded Corner was added.

// this script support both firefox (rounded corners is not allowded) and chrome, you need to install the Greasemonkey add-on for Firefox.

// v1.0(2012.04.05)
// @include   http://weibo.com/*
// @include   https://weibo.com/*
// @include   http://t.sina.com.cn/*
// @include   https://t.sina.com.cn/*
// @include   http://www.weibo.com/*
// @include   https://www.weibo.com/*
// @author    ihead ( based on roamlog&disinfeqt mod )
// ==/UserScript==
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = '.wbim_min_box_col2, .wbim_min_box {-webkit-border-top-left-radius:6px;-webkit-border-top-right-radius:6px;} .chePicMin, .feed_list .piclist li img, .feed_list .face img, a.notes, .nfBox {-webkit-border-radius: 6px;} .W_main_l {-webkit-border-top-left-radius: 10px;-webkit-border-bottom-left-radius:10px;} .W_main_bg {-webkit-border-radius: 10px;} #plc_profile, #plc_main {-webkit-border-top-right-radius: 10px;-webkit-border-bottom-right-radius:10px;} .W_main_r, #pl_leftNav_game, #Box_right.W_main_r, .declist, .send_weibo .title,#pl_content_userInfo,#pl_content_commentTopNav,#pl_content_hisTags,#pl_content_favoritesTopNav,#pl_relation_recommendAttUsers,#pl_content_chainFollowers,.M_activities,#pl_content_sameFriends,#pl_content_myTags,#pl_common_thirdmodule_1003,#pl_content_hisOperationPlate,#pl_content_weibodesk,#pl_content_medal,#pl_common_noticeboard,#pl_content_userTips,#pl_content_followStatus,#pl_content_interestgroup,#ads_bottom_1, dd.settings, #pl_content_hisFans, #pl_content_topic, #pl_common_fun, #pl_content_pullylist, #pl_content_mood, #ads_37,#pl_content_promoteto, #pic pl_common_feedback, .border, #pl_leftNav_app, #base_scrollToTop, .global_footer,.f_pro,.nfTagB_group,.deal_view2,#pl_content_promotetopic, #pl_content_homeInterest, #pl_relation_recommendPopularUsers, #pl_content_allInOne, #pl_content_topic, #pl_common_help, #pl_common_feedback, #pl_common_reportentry,.rightTxtList {        display: none;}.W_linedot, .W_rightModule {    border-bottom: none;}#pl_content_liteFacePersonInfo .W_rightModule, #pl_content_litePersonInfo .W_rightModule, #pl_content_personInfo .W_rightModule {    padding-bottom: 0;}.nfTagB_sec {        border-top: none;        padding: 2px 0;}.left_nav .user_atten {        margin: 0 0 0 17px;}.send_weibo .kind {        padding: 5px 0 10px 0;}.send_weibo .kind a {        margin: 0 15px 0 0;        padding: 2px 0 2px 20px;    }.left_nav .user_atten li {       margin: 0 5px 0 0;}.B_index .feed_lists {        margin-top: 10px;}.left_nav .border, .nfTagB_sec {        background: none;}.border:nth-child(1), .border:nth-child(2),.W_main_narrow #Box_right {       display: block;}.W_main {       width: 750px;}.W_main .W_main_c{    float: none;}.W_main_c {        padding: 0 30px 30px;    }.W_main_bg {        min-height: 1000px;}#wbim_box {        right: 0;}.W_main .left_nav .border{    padding: 0;}.W_main_r .left_nav {    border-bottom-color: none;    border-bottom-style: none;} .W_main_r .user_atten {    border-bottom-color: none;    border-bottom-style: none;    border-bottom: none;    margin: 0;    padding:0 10px 10px; }';
document.documentElement.appendChild(styleEl);