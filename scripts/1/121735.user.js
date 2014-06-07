// ==UserScript==
// @name          Simple Sina Weibo
// @namespace     http://www.chromechina.com/
// @version       0.3
// @author        Blackli
// @description   精简新浪微博
// @include       http://weibo.com/*
// ==/UserScript==
if (document.getElementById("pl_content_pullylist"))
    document.getElementById("pl_content_pullylist").style.display = 'none';
if (document.getElementById("pl_common_fun"))
    document.getElementById("pl_common_fun").style.display = 'none';
if (document.getElementById("pl_content_homeInterest"))
    document.getElementById("pl_content_homeInterest").style.display = 'none';
if (document.getElementById("pl_content_medal"))
    document.getElementById("pl_content_medal").style.display = 'none';
if (document.getElementById("pl_relation_recommendPopularUsers"))
    document.getElementById("pl_relation_recommendPopularUsers").style.display = 'none';

if (document.getElementById("pl_content_interestgroup"))
    document.getElementById("pl_content_interestgroup").style.display = 'none';

if (document.getElementById("pl_content_allInOne"))
    document.getElementById("pl_content_allInOne").style.display = 'none';
if (document.getElementById("ads_47"))
    document.getElementById("ads_47").style.display = 'none';
if (document.getElementById("ads_37"))
    document.getElementById("ads_37").style.display = 'none';
if (document.getElementById("ads_36"))
    document.getElementById("ads_36").style.display = 'none';
if (document.getElementById("ads_35"))
    document.getElementById("ads_35").style.display = 'none';
if (document.getElementById("pl_common_noticeboard"))
    document.getElementById("pl_common_noticeboard").style.display = 'none';
if (document.getElementById("pl_common_help"))
    document.getElementById("pl_common_help").style.display = 'none';
if (document.getElementById("pl_common_feedback"))
    document.getElementById("pl_common_feedback").style.display = 'none';

if (document.getElementById("pl_content_publisherTop"))
    document.getElementById("pl_content_publisherTop").getElementsByTagName("div")[0].getElementsByTagName("div")[2].getElementsByTagName("a")[0].style.display = 'none';

// 隐藏天气（写心情）
if (document.getElementById("pl_content_mood"))
    document.getElementById("pl_content_mood").style.display = 'none';

// 美化
if (document.getElementById("pl_nav_outlookBar"))
    document.getElementById("pl_nav_outlookBar").style.marginTop = '15px';

// 隐藏新注册后的引导内容
if (document.getElementById("pl_content_tasks"))
    document.getElementById("pl_content_tasks").style.display = 'none';

// 隐藏提示框
if (document.getElementById("pl_content_versionTip"))
    document.getElementById("pl_content_versionTip").style.display = 'none';
if (document.getElementById("pl_content_publishbubble"))
    document.getElementById("pl_content_publishbubble").style.display = 'none';