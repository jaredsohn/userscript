// ==UserScript==
// @name           tieba_vip_view
// @description    百度贴吧橙名、认证
// @include        http://tieba.baidu.com/*
// @exclude        http://tieba.baidu.com/i/*
// @exclude        http://tieba.baidu.com/f/like*
// @exclude        http://tieba.baidu.com/club/*
// @exclude        http://tieba.baidu.com/shipin/*
// @exclude        http://tieba.baidu.com/bakan*
// @exclude        http://tieba.baidu.com/daquan*
// @exclude        http://tieba.baidu.com/f/tupian*
// @exclude        http://tieba.baidu.com/tb/*
// @exclude        http://tieba.baidu.com/*postBrowserBakan*
// @icon           http://tb.himg.baidu.com/sys/portrait/item/eabe7869616f6861697a693032303039ee07
// @updateURL      http://userscripts.org/scripts/source/174547.meta.js
// @downloadURL    http://userscripts.org/scripts/source/174547.user.js
// @author         xiaohaizi02009
// @version        2013.7.30.2
// ==/UserScript==

// 如果贴吧的 jQuery 库失效，请把下面这行复制到 @icon 下面
// @require http://libs.baidu.com/jquery/1.7.1/jquery.min.js

// 获取用户名
// 一定要看加载脚本前的网页源代码
var usrname = PageData.user.name_url

// 获取“已签到日期”的函数

function DateDiff() {
    var oDate1 = new Date('07-31-2012') // 2012 年 8 月 1 日起百度开始签到功能
    var oDate2 = new Date()
    var iDays = parseInt((oDate2 - oDate1) / 1000 / 60 / 60 / 24)
    return iDays
}
Days = DateDiff()

// GBK 编码函数
var wbriframe = document.createElement("iframe");
wbriframe.src = "about:blank";
wbriframe.setAttribute("style", "display:none;visibility:hidden;");
document.body.appendChild(wbriframe);
var d = wbriframe.contentWindow.document;
d.charset = d.characterSet = "GBK";

function getGBKEscape(s) {
    d.write("<body><a href='?" + s + "'>X</a></body>");
    d.close();
    var url = d.body.firstChild.href;
    return url.substr(url.lastIndexOf("?") + 1);
}
gbkname = getGBKEscape(usrname)

// 主题列表页面
$("span.tb_icon_author a[href='/i/sys/jump?un=" + gbkname + "']").addClass('sign_highlight');
$("span.tb_icon_author a[href='/i/sys/jump?un=" + gbkname + "']").attr('title', '该用户已经连续签到' + Days + '天了，连续30天一举“橙”名');
$("span.tb_icon_author a[href='/i/sys/jump?un=" + gbkname + "']").parent().append($('<img src="http://tb2.bdstatic.com/tb/img/itieba_vip.gif" title="贴吧实名认证" class="verified_icon">'))
// rely？是不是拼错了
$("span.tb_icon_author_rely a[href='/i/sys/jump?un=" + gbkname + "']").parent().append($('<img src="http://tb2.bdstatic.com/tb/img/itieba_vip.gif" title="贴吧实名认证" class="verified_icon">'))

// 在主题中
$("img.icon[username=" + usrname + "]").parent().parent().parent().parent().children('.d_name').children('a').addClass('sign_highlight');
$("img.icon[username=" + usrname + "]").parent().parent().parent().parent().children('.d_name').children('a').attr('title', '该用户已经连续签到' + Days + '天了，连续30天一举“橙”名');
$("img.icon[username=" + usrname + "]").parent().parent().parent().parent().children('.d_name').children('a').after('<img src="/tb/img/itieba_vip.gif" title="贴吧实名认证" class="d_verified_icon">')

// 在楼中楼中
// 喂喂喂，官方都没有！
$("div.lzl_cnt a[username=" + usrname + "]").addClass('sign_highlight');
$("div.lzl_cnt a[username=" + usrname + "]").attr('title', '该用户已经连续签到' + Days + '天了，连续30天一举“橙”名');
$("div.lzl_cnt a[username=" + usrname + "]").after('<img style="vertical-align: middle;margin-top: -3px;" src="http://tb2.bdstatic.com/tb/img/itieba_vip.gif" title="贴吧实名认证" width="11" height="18" class="verified_icon">')