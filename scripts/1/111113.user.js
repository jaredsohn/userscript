// JavaScript Document
// ==UserScript==
// @author          GDIO
// @version         2.0.12
// @name            Better Browser
// @namespace       http://goo.gl/GDIO
// @description     Firefox加强浏览辅助脚本:留园,google图片搜索redirect去除
// @include         http://*.6park.com/*
// @include         http://www.google.com/imgres?*
// @exclude         http://www.6park.com/parks/star.shtml
// @exclude         http://www.6park.com/parks/eback.php?name=*
// @exclude         http://www.6park.com/cgi-bin/bvote/emailcheck.cgi
// @exclude         http://www.6park.com/parks/ereply.php
// @exclude         http://*/addnew.html
// @exclude         http://pop.6park.com/parks/edithelp.html
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

/*
安装页面:
http://userscripts.org/scripts/show/111113

更新日志

v2.0.12 - 2011.10.15
1. 查询页面自动返回bug

v2.0.11 - 2011.09.15
1.google图片搜索redirect去除

v2.0.10 - 2011.09.13
1.修复不显示板块精华帖,版块公告条bug

v2.0.9 - 2011.09.13
1.修复回帖编辑助手预览bug

v2.0.8 - 2011.09.12
1.帖子页回复添加按钮,可以直接回复

v2.0.7 - 2011.09.10
1.发新帖预览功能修复

v2.0.6 - 2011.09.09
1.置顶帖添加按钮
2.按钮文字修改为↓

v2.0.5 - 2011.09.01
1.div宽度可以一次显示

v2.0.4 - 2011.08.30
1.修复加载页面后第一次点击[详细]按钮div无法弹出的bug
2.无内容帖子不显示[详细]按钮(代码来自caoglish)

v2.0.3 - 2011.08.29
1.修正按钮放上面后子页面的滚动问题
2.修复回短消息时form被删除的bug

v2.0.2 - 2011.08.29
1.给网友发消息输入框被删除的bug
2.板块帖子/新闻评论回复后若不出错直接返回
3.修复查看信件自动返回bug
4.按钮放在内容页上方

v2.0.1 - 2011.08.28
1.学习jquery,重写代码
2.所有页面去广告
3.板块帖子/新闻评论逆序(主要参考caoglish的代码,多谢~)
4.添加内容按钮,可直接查看帖子内容,少几次点击.
 ps. 有人喜欢回复无标题贴,原来需要查看html代码才能阅读内容,现在点按钮即可

------------------------------------------------
v1.0.7 - 2011.08.26
1.新闻评论后自动返回
2.留园全系列(首页,板块,新闻,帖子,评论)去广告
3.修正个人账户页面
4.使用ajax库优化代码

v1.0.6 - 2011.08.26
1.回帖出错,停在出错页面

v1.0.5 - 2011.08.25
1.回帖后自动回版面主页
2.添加[返回前页]和[返回版面首页]链接
3.优化脚本加载速度
4.色彩方案略有调整
5.只有一个回复时,只显示一次[返回前页]和[返回版面首页]链接

v1.0.4 - 2011.08.24
1.移除了帖子下方的微博动态条,没啥用,网速慢的时候影响脚本加载
2.修正了回帖又有多条回复时的时间顺序bug

v1.0.3 - 2011.08.23
1.增加了帖子内容长度显示(in bytes)

v1.0.2 - 2011.08.22
1.增加[详细]内容链接
2.修复编辑助手网页

v1.0.1 - 2011.08.21
1.按照日期排序回复,看回帖不用从下到上看了.
2.直接点击姓名可以发短消息给作者.
3.直接点击[回复],回复某人的帖子.
4.直接点击[投票]给他投票.
5.回复间隔背景色.
*/


// ----------------------------------------
// google图片搜索redirect去除
function delRedirect()
{
    var st = document.URL.indexOf("=http");
    var surl = document.URL.substring(st+1);
    var ed = surl.indexOf("&");
    surl = surl.substring(0,ed);
    window.location.href = surl;
}

// ----------------------------------------
// 帖子页回复添加按钮
function addReplyButton()
{
    // 添加详细内容按钮
    $('a[name=followups] ~ ul > li a').each(function()
    {
        $(this).after('   ·<button class="hide_button" id="'+$(this).text()+'"><strong>↓</strong></button>');
    });
    
    // 函数
    $(".hide_button")
    .css("margin-right", "10px")
    .css("color", "#ff8800")
    .css("cursor", "pointer")
    .click(function() {
        $('.subpage').attr('src',$(this).siblings('a').attr('href'));
        $(this).after($('.subpage'));
        $('.subpage').slideToggle('slow');
    });
    
    // 添加div-iframe
    $("table:first").prepend('<div id="pagediv"><iframe class="subpage" id="subpage" name="subpage" width=984 height=500></iframe></div>');

    // 默认隐藏
    $("#pagediv").hide();
    $('.subpage').hide();
}

// ----------------------------------------
// 版面首页添加按钮
function addButton()
{
    // 添加详细内容按钮
    $(".dc_bar2 li a").each(function()
    {
        $(this).after('   ·<button class="hide_button" id="'+$(this).text()+'"><strong>↓</strong></button>');
    });
    
    // 置顶帖添加按钮
    $("table[width=98%] li a").each(function()
    {
        $(this).after('   ·<button class="hide_button" id="'+$(this).text()+'"><strong>↓</strong></button>');
    });
    
    // 函数
    $(".hide_button")
        .css("margin-right", "10px")
        .css("color", "#ff8800")
        .css("cursor", "pointer")
        .click(function() {
            $('.subpage').attr('src',$(this).siblings('a').attr('href'));
            $(this).after($('.subpage'));
            $('.subpage').slideToggle('slow');
        });


    // 不显示无内容的按钮
    //$(".dc_bar2 li a:contains('(无内容)')").siblings('.hide_button').remove();
    
    // 添加div-iframe
    $(".dc_bar:first").prepend('<div id="pagediv"><iframe class="subpage" id="subpage" name="subpage" width=984 height=500></iframe></div>');
    
    // 默认隐藏
    $("#pagediv").hide();
    $('.subpage').hide();
}

// -----------------------------------------
// 删除微博条
function delWeibo()
{
    var webo = document.getElementById('weibozkinfo');
    if(webo)
    {
        webo.parentNode.removeChild(webo);
    }
}

// -----------------------------------------
// 删除首页广告
function delAds()
{
    // 首页上方
    $("table[width=978][bgColor=#ffffff][border=0]").remove();

    // 漂浮层
    $("#layer1,#layer2,#layer3,#layer4").remove();

    // 左侧栏
    $("td[width='82'][bgcolor='#FFFFEE']").remove();

    // 右侧栏
    $("td[width='125'][bgcolor='#FFFFEE']").remove();

    // 中部广告栏
    $(".td3[colspan='4']").remove();
    $("td[width='122'][bgcolor='#FFFFFF']").remove();

    // 首页中部右边
    $("table[bordercolor='#CCCCCC']").remove();

    // 链接广告
    $("a[href*='php?perm']").remove();
    $("a[href*='php?do']").remove();
    $("a[href*='list.6park.com']").remove();

    // 图片广告
    $("img[style='FLOAT: left'][hspace=5][vspace=1][align=top]").remove();

    // 新闻页上方
    $("table[width=976][border=0][bgcolor=#EEEEEE]").remove();

    // 新闻页右边
    $("td[bgcolor=#E5EBF3]").remove();

    // 新闻评论页
    //$("table[width='800'][bgcolor='#EEEEEE']").remove();
    //$("td[bgcolor='#CCCCCC']").remove();

    // iframe广告
    $("iframe").replaceWith('');

    // 板块广告
    $("table[width='948'][bgcolor='#ECF6FF']").remove();
    if(!(document.URL.substr(-5)=='shtml' && document.URL.search('newscom')<0))
    {
        $("*[bgcolor='#EEEEEE']").remove();
    }

    // 帖子广告
    $("table[width=948][border=0].has('tbody')").remove();
    $("table[width='122'][bgcolor='#FFFFEE']").remove();
    $("table[bordercolor='#CCCCCC'][bgcolor='#F0F0F0']").remove();
}

//-----------Jquery代码[开始],参考caoglish朋友的---------------------
// 回帖及新闻回复逆序代码
function jqReverseReply() {
	// 找到根元素
	var post_list_root = $('a[name=followups] ~ ul > li');
	
	// 逆序列表
	if(post_list_root)
	{
        reverseWholePostList(post_list_root);
    }
}

// 递归逆序整个列表
function reverseWholePostList(post_list_root)
{
	var post_list = post_list_root;
	
	for(var i=post_list.length-1;i>=0;i--)
	{
		if(post_list.eq(i).children('ul').children().length>0)
		{
			post_list_next_level = post_list.eq(i).children('ul').children();
			reverseWholePostList(post_list_next_level);
		}
	}
	
	reversePostList(post_list);
}

// 逆序单个帖子回复
function reversePostList(post_list)
{
	for(var i=post_list.length-1;i>=0;i--)
	{
		post_list.parent().append(post_list.eq(i));
	}
}

// 逆序新闻回复
function newsReverse()
{
    var post_list = $('form table[cellpadding="5"]').not(".dc_bar");
    
    for(var i=0;i<post_list.length-1;i++)
	{
		post_list.siblings().eq(0).after(post_list.eq(i));
	}
}
//-----------Jquery代码[结束],参考caoglish朋友的---------------------

// -----------------------------------------
// 主函数入口
function parsePage()
{
    // 非搜索结果,处理页面
    if(document.URL.search('search.cgi')<0)
    {
        // 留园所有页面删除广告
        delAds();

        // 评论或回复后,如果没错误直接返回版面首页
        if((document.URL.substr(-3)=='cgi' || document.URL.substr(-2)=='pl') && document.title.search('错误')<0)
        {
            window.location.href = document.links[document.links.length-1];
        }
        // 版面首页,添加按钮
        else if(document.URL.substr(-5)=='shtml' && document.URL.search('newscom')<0)
        {
            addButton();
        }
        // 新闻帖子页,处理回复
        else if(document.URL.search('newscom')>=0)
        {
            newsReverse();
        }
        // google图片搜索,redirect去除
        else if(document.URL.search('google.com/imgres')>=0)
        {
            delRedirect();
        }
        // 非新闻帖子页,处理回复
        else
        {
            // 删除微博
            delWeibo();

            // 回复逆序
            jqReverseReply();

            // 添加按钮
            addReplyButton();
        }
    }
}

// =========================================
$(document).ready(function() {
	parsePage();
});
