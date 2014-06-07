// SINA miniblog right column delete 
// version 0.3.2
// 2011-09-28
// Copyright (c) 2011, Bubble
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "SINA delete", and click Uninstall.
//
//update history
//2010-08-09  version 0.1 BETA! 
//2011-01-25  version 0.2 BETA! 配合新浪围脖修改代码，为用户提供自定义删除新浪围脖中“热门话题榜”，“关注的话题”，“人气用户推荐”，“加入的群”，“手机玩转新浪微博”，“新浪微博意见反馈”这几个组件的功能，从而实现加快网页载入速度，减少无用信息的目标
//2011-04-20  version 0.2.1     添加删除右侧广告栏和应用推荐这两个组件的功能
//2011-04-21  version 0.2.2     改用正则表达式批量处理右侧广告栏
//2011-05-04  version 0.2.3     增添了适用站点weibo的新域名
//2011-09-27  version 0.3.1     增添了对新版微薄的支持
//2011-09-28  version 0.3.2     优化代码，细化可自定义屏蔽内容
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          SINA delete 
// @namespace     bubble7733@gmail.com
// @description   To delete some useless content from the right column in SINA miniblog   
// @include       http://t.sina.com.cn/*
// @include       http://weibo.com/*
// ==/UserScript==


//删除人气用户和手机玩转新浪微博
var allTables, thisTable;
var UseTable;

allTables = document.evaluate(
    "//div",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
//alert(allTables.snapshotLength);

var num = 0;
var adstr = /ads_/; //广告前缀
var ads = new RegExp(adstr);

//通过读取div的name属性,class属性和id属性定位特定的应用，并删除
for (var i = 0; i < allTables.snapshotLength; i++) {
    thisTable = allTables.snapshotItem(i);  //Table
    // do something with thisTable

    if( 0

//不同的用户可以根据自己的需求进行自定义
//操作方式：如果需要过滤下列某一项应用，则在那一行首部添加“//”即可
//反之，如果需要显示某一项应用，将那一行首部的“//”删除即可
//比如：下列“工具栏”“热门话题榜”和“勋章”是开启的，可以正常显示，而“应用推荐信息”“关注的话题”“可能感兴趣的人”“人气用户推荐”则是关闭的，不会显示在页面中

//**********************************************************************
//*************************老版微博自定义设置区*************************
//**********************************************************************
    ||thisTable.getAttribute("class")=="wI_info"  //应用推荐信息
//    ||thisTable.getAttribute("name")=="app4" //热门话题榜
    ||thisTable.getAttribute("name")=="app5"  //关注的话题
    ||thisTable.getAttribute("name")=="app20"  //可能感兴趣的人
    ||thisTable.getAttribute("name")=="app6"  //人气用户推荐
//    ||thisTable.getAttribute("name")=="app10003"  //加入的群
    ||thisTable.getAttribute("id")!=null&&ads.test(thisTable.getAttribute("id"))  //广告栏  
    ||thisTable.getAttribute("class")=="f_pro"  //手机玩转新浪微博&新浪微博意见反馈
    //**********************************************************************
    //**************************新版微薄自定应设置区************************
    //**********************************************************************
    //新版微薄底部冗余信息
    ||thisTable.getAttribute("class")=="clearfix" 
    //新版微薄三栏版本的侧边栏勋章
//    ||thisTable.getAttribute("class")=="declist" 
    //新版微薄两栏版本的侧边栏勋章
//    ||thisTable.getAttribute("id")=="pl_content_medal"
    //新版微薄侧边栏未知div，看关键字估计是留给企业用的
    ||thisTable.getAttribute("id")=="pl_business_enterpriseWeibo"
    //新版微薄侧边栏"@提到我的"“我的评论”“我的私信”“我的收藏”工具栏
//    ||thisTable.getAttribute("id")=="pl_nav_outlookBar"
    //新版微薄侧边栏热门话题
//    ||thisTable.getAttribute("id")=="pl_content_promotetopic"
    //新版微薄侧边栏人气用户推荐
    ||thisTable.getAttribute("id")=="pl_relation_recommendPopularUsers"
    //新版微薄侧边栏可能认识的人
    ||thisTable.getAttribute("id")=="pl_content_homeInterest"
    //新版微薄侧边栏可能感兴趣的应用
    ||thisTable.getAttribute("id")=="pl_content_allInOne"
    //新版微薄侧边栏关注话题
    ||thisTable.getAttribute("id")=="pl_content_topic"
    //新版微薄侧边栏公告栏
    ||thisTable.getAttribute("id")=="pl_common_noticeboard"
    //新版微薄侧边栏“如何玩转微博”
    ||thisTable.getAttribute("id")=="pl_common_help"
    //新版微薄侧边栏“意见反馈”
    ||thisTable.getAttribute("id")=="pl_common_feedback"
    //新版微薄侧边栏未知div，可能是个性化服务之类的
    ||thisTable.getAttribute("id")=="pl_content_customService"
    //新版微薄侧边栏未知div，可能是举报之类的
    ||thisTable.getAttribute("id")=="pl_common_reportentry"
//**********************************************************************
//*************************自定义设置区结束*****************************
//**********************************************************************
    )
    {
        num++;
        thisTable.parentNode.removeChild(thisTable);
    }
}

//alert(num);