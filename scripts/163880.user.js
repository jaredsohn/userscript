// ==UserScript==
// @name         googleSearchCountRobot
// @namespace    http://www.yekezhong.com/
// @version      1.1
// @edition      2
// @date         2013-04-10
// @description  GoogleSearch使用统计机器人
// @include      http://www.google.*
// @include      https://www.google.*
// @copyright    2013+, 叶科忠
// ==/UserScript==

///////////////////////////////////////////////////// 初始化
var myDate = new Date();

// 初始化统计
if (getCookie("googleSearchCountAll") == null || getCookie("googleSearchCountToday") == null || getCookie("googleSearchCountDay") == null) {
    setCookie("googleSearchCountAll", 0, 365*24*60*60*1000);
    setCookie("googleSearchCountToday", 0, 365*24*60*60*1000);
    setCookie("googleSearchCountHome", 0, 365*24*60*60*1000);
    setCookie("googleSearchCountDay", myDate.getDate(), 365*24*60*60*1000);
}
// 每日重置
if (myDate.getDate() != getCookie("googleSearchCountDay")) {
    setCookie("googleSearchCountDay", myDate.getDate(), 365*24*60*60*1000);
    setCookie("googleSearchCountToday", 0, 365*24*60*60*1000);
    setCookie("googleSearchCountHome", 0, 365*24*60*60*1000);
}

var reg = new RegExp("^(http|https)?://(www\.|)google\.(com|cn|com\.hk)\/$")
if (window.location.href.match(reg)) {
    setCookie("googleSearchCountHome", parseInt(getCookie("googleSearchCountHome")) + 1, 365*24*60*60*1000);
}
reg = new RegExp("^(http|https)?://(www\.|)google\.(com|cn|com\.hk)/(search|webhp)[\s\S]{1,}")
if (reg.test(window.location.href)) {
    setCookie("googleSearchCountToday", parseInt(getCookie("googleSearchCountToday")) + 1, 365*24*60*60*1000);
    setCookie("googleSearchCountAll", parseInt(getCookie("googleSearchCountAll")) + 1, 365*24*60*60*1000);
}

addInfoBox();
function addInfoBox()
{
    var result = document.createElement("div");
    result.id = "resultInfo";
    document.body.appendChild(result);
    var newHtml = "<div id='infoBox' class='hdtb_mitem' style='z-index:999;position:fixed;left:5px;bottom:5px;color:green;'> \
        今日:" + getCookie("googleSearchCountToday") + "<br/>总共:" + getCookie("googleSearchCountAll") + "<br/>主页:" + getCookie("googleSearchCountHome") + "</div>"
    Id("resultInfo").innerHTML = newHtml;
}

///////////////////////////////////////////////////// 全局功能函数们

function setCookie(name, value, expire)
{
    var exp = new Date(); 
    exp.setTime(exp.getTime() + expire);
    document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
}

function getCookie(name)
{
    var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function delCookie(name, path, domain)
{  
    document.cookie = name + "=" + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

function Id(id) {
    return (typeof id == "string") ? document.getElementById(id) : id;
}