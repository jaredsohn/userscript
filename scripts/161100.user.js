// ==UserScript==
// @name         suseAutoLoginRobot
// @namespace    http://www.yekezhong.com/
// @version      1.1.2
// @description  四川理工学院教务系统登录机器人
// @match        http://61.139.105.138/zdy.htm*
// @match        http://61.139.105.138/xs_main.aspx*
// @match        http://www.yekezhong.com/labor/*
// @match        http://61.139.105.138/default2.aspx
// @match        http://61.139.105.138/
// @copyright    2013+, 叶科忠
// ==/UserScript==

///////////////////////////////////////////////////// 基本参数们

var initSecond = 4;
var second = initSecond;
var nIntervId;
var offTime = 5*60*1000;

///////////////////////////////////////////////////// 初始化
if (window.location.href == "http://www.yekezhong.com/labor/login.html") {
    init();
	Id("autoGo").addEventListener("click", start, false);
	Id("save").addEventListener("click", save, false);
}

///////////////////////////////////////////////////// 工作中

// 登录错误，跳转回去
var urlRegErr = new RegExp("http://61\.139\.105\.138/zdy\.htm+");
if (window.location.href.match(urlRegErr)) {
	window.location.href = "http://www.yekezhong.com/labor/login.html";
}

if (window.location.href == "http://61.139.105.138/default2.aspx" || window.location.href == "http://61.139.105.138/") {
	window.location.href = "http://www.yekezhong.com/labor/login.html";
}

// 登录成功
var urlRegOk = new RegExp("http://61\.139\.105\.138/xs_main\.aspx+");
if (window.location.href.match(urlRegOk)) {
	addInfoBox();
}
   // var time = new Date();
   // alert(offTime - (time.getTime() - getCookie("startTime")));
// go on
if (getCookie("going") == "true") {
    var time = new Date();
    if ((time.getTime() - getCookie("startTime")) < getCookie("offTime")) {
    	Id("id").value = getCookie("id");
    	Id("password").value = getCookie("pw");
    	Id("go").click();
    }
}


///////////////////////////////////////////////////// 函数们

// 开始倒计时
function start()
{
    if (getCookie("id") == null || getCookie("pw") == null) {
        alert("请先填写学号和密码并保存!");
        return false;
    }
    nIntervId = window.setInterval(run, 1000);
    Id("autoGo").style.display = "none";
    addTimerElements();
    setCookie("going", "true", offTime);
    var time = new Date();
    setCookie("startTime", time.getTime(), 365*24*60*60*1000);
    setCookie("offTime", Id("time").value * 1000, 365*24*60*60*1000);
}

// 停止倒计时
function stop()
{
	setCookie("going", "false", offTime);
    clearInterval(nIntervId);
    second = initSecond;
    Id("autoGo").style.display = "block";
    removeTimerElements();
}

// 实现倒计时
function run()
{
    if (second == 0) {
		document.getElementById("go").click();
    }
    if (second >= 0) {
        Id("run").innerHTML = "<span style=\"font-size:160px; color:red;\">" + second + "</span>" + "秒后启动<br/><span style='color:red'>【爆炸危险，请远离电脑！】</span>";
		second--;
    }
}

function addTimerElements()
{
    var firstSecond = initSecond + 1;
    Id("run").innerHTML = "<span style=\"font-size:160px; color:red;\">" + firstSecond + "</span>" + "秒后启动<br/><span style='color:red'>【爆炸危险，请远离电脑！】</span>";
    var button =  document.createElement("input");
    button.id = "stop";
    button.setAttribute("type", "submit");
    button.setAttribute("value", "停止");
    Id("box_autoLogin").appendChild(button);
    Id("stop").addEventListener("click", stop, false);
}

function removeTimerElements()
{
    Id("run").innerHTML = "已停止";
    var stopButton = Id("stop");
    stopButton.parentNode.removeChild(stopButton);
}

function init()
{
	var message = Id("message");
    message.parentNode.removeChild(message);
    if (getCookie("id") != null) {
        Id("setId").value = getCookie("id");
        Id("setPassword").value = getCookie("pw");
    }
}

function save()
{
    if (Id("setId").value != "" && Id("setPassword").value != "") {
    	setCookie("id", Id("setId").value, 365*24*60*60*1000);
    	setCookie("pw", Id("setPassword").value, 365*24*60*60*1000);
        Id("id").value = getCookie("id");
        Id("password").value = getCookie("pw");
        alert("保存成功！");
        return true;
    }
    alert("保存失败，不能为空哦！");
}

function addInfoBox()
{
	var infoBox = document.createElement("div");
    infoBox.id = "infoBoxContanier";
    Id("mainDiv").appendChild(infoBox);
    var newHtml = "<div id='infoBox' style='color:green;position: fixed; box-shadow: 0 0 5px 5px #888; \
right:30px; bottom: 15px; background: black; height: 70px; width: 260px; padding:2px; '>\
suseAutoLoginRobot 已帮助您成功登录！<br/>\
<p>Made by <a href='http://wlxh.suse.edu.cn/' target='_blank'>大学生网络技术协会</a><a href='http://www.yekezhong.com/' target='_blank'> 叶科忠</a></p>\
<p><a href='http://www.yekezhong.com/457' target='_blank'>意见、建议、BUG反馈</a></p>\
<p><a href='http://taourl.com/nmyu5' title='有点无聊？去淘宝特卖频道逛逛吧！' target='_blank'>【淘宝特卖】</a><a href='http://taourl.com/4v4jn' target='_blank'>【女装频道】</a></p>\
<p style:'float:right'>Ver 1.1.2 | 2013/3/14</p></div>"
    Id("infoBoxContanier").innerHTML = newHtml;
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
    alert("asdf");
	document.cookie = name + "=" + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

function Id(id) {
    return (typeof id == "string") ? document.getElementById(id) : id;
}
