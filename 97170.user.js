// ==UserScript==
// @name			onBux,vcBux,IncraseBux,BigTimeBux,NxtBux读条按钮
// @namespace		DRL
// @description		在广告网页无法打开的时候，点击按钮可以开始读条
// @version			2011.04.29 v1.2

// @include			http://vcbux.com/viewads/*
// @include			https://vcbux.com/viewads/*
// @include			http://www.vcbux.com/viewads/*
// @include			https://www.vcbux.com/viewads/*

// @include			http://onbux.com/view?*
// @include			https://onbux.com/view?*
// @include			http://www.onbux.com/view?*
// @include			https://www.onbux.com/view?*

// @include			http://incrasebux.com/cks.php?k=*
// @include			https://incrasebux.com/cks.php?k=*
// @include			http://www.incrasebux.com/cks.php?k=*
// @include			https://www.incrasebux.com/cks.php?k=*

// @include			http://bigtimebux.com/cks.php?k=*
// @include			https://bigtimebux.com/cks.php?k=*
// @include			http://www.bigtimebux.com/cks.php?k=*
// @include			https://www.bigtimebux.com/cks.php?k=*

// @include			http://nxtbux.com/viewads/*
// @include			https://nxtbux.com/viewads/*
// @include			http://www.nxtbux.com/viewads/*
// @include			https://www.nxtbux.com/viewads/*
// ==/UserScript==

/********************************************************************
2011.04.29 Update:
新增功能：
	1. BigTimeBux页面打开后直接读条
	2. BigTimeBux读条结束后自动关闭，并刷新源页面
	3. BigTimeBux广告帧改为空白页

2011.04.01 Update:
新增功能:
	1. NxtBux页面打开后直接读条
	2. NxtBux读条结束后提示点击验证码，输入正确后自动关闭并刷新源页面
	3. NxtBux广告帧改为空白页
去除功能:
	1. 由于AoBux关闭，删除对AoBux的支持

2011.02.26 Update:
新增功能:
	1. vcBux页面打开后直接读条
	2. vcBux读条结束后自动关闭，并刷新源页面
	3. vcBux广告帧改为空白页

2011.02.17 Update:
新增功能:
	1. onBux/incraseBux广告帧自动改为空白页
	2. onBux/incraseBux页面打开后直接读条
	3. onBux读条结束后弹出对话框提示
	4. onBux/incraseBux点击成功后自动关闭页面
	其中3、4点参考eyeblue的自动关闭页面脚本，感谢eyeblue的分享。

********************************************************************/

var idname, funcname;
var infomation = "";
var host = window.location.host, hostname;
var showletter = true;	// 若不想直接显示验证码，请改成false
var completedNum = -1, process, completed = null, error = null;
var checkstatus = true;
var needclick = false;

if (host.indexOf("vcbux")>=0)
{
	hostname = 'vcbux';
	idname = 'progress';
	funcname = 'fc();';

	document.getElementById("iframe").src="about:blank";
	completed = document.getElementById("ti");
	error = null;
	completedNum = 0;
}
else if (host.indexOf("onbux")>=0)
{
	hostname = 'onbux';
	idname = 'wait';
	funcname = 'inicia();';

	if (showletter)
	{
		document.getElementById("letters").style.display="";
		infomation = "必须等待读条结束后点击验证码才有效";
	}

	window.setTimeout('inicia()', 100);	// 打开页面后读条

	document.getElementById("iF").src="about:blank";
	completed = document.getElementById("completed");
	error = document.getElementById("error");
	completedNum = 100;
	needclick = true;
}
else if (host.indexOf("incrasebux")>=0)
{
	hostname = 'incrasebux';
	idname = 'completedAd';
	funcname = 'startTimer();';

	document.getElementById("pgl").src="about:blank";
	completed = document.getElementById("completedAd");
	error = null;
	completedNum = 0;
}
else if (host.indexOf("bigtimebux")>=0)
{
	hostname = 'bigtimebux';
	idname = 'completedAd';
	funcname = 'init();';

	document.getElementById("pgl").src="about:blank";
	completed = document.getElementById("completedAd");
	error = null;
	completedNum = 100;
}
else if (host.indexOf("nxtbux")>=0)
{
	hostname = 'nxtbux';
	idname = 'progress';
	funcname = 'fc();';

	document.getElementById("iframe").src="about:blank";
	completed = document.getElementById("tddi");
	error = null;
	completedNum = ""
	needclick = true;
}


var progressbar, btn;
progressbar = document.getElementById(idname);
if (progressbar) {
	btn = document.createElement("div");
	btn.innerHTML = '<button onclick="'+funcname+'">点击读条</button>'+infomation;
	progressbar.parentNode.insertBefore(btn, progressbar.nextSibling);
}

var isalert = false;
window.intervalID = window.setInterval(function(){
	if (hostname == "vcbux")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
		completed = document.getElementById("progress").parentNode.parentNode.cells[0].firstChild;
		if (completed.classList[1] != "op-icon-y")
		{
			completed = null;
		}
	}
	else if (hostname == "onbux")
	{
		process = document.getElementById("element1_percentImage").alt.slice(0, -1);
	}
	else if (hostname == "incrasebux")
	{
		process = document.getElementById("secs").innerHTML;
	}
	else if (hostname == "bigtimebux")
	{
		process = document.getElementById("progress").innerHTML.slice(0, -1);
	}
	else if (hostname == "nxtbux")
	{
		process = document.getElementById("validate-show").style.display;
		completed = document.getElementById("validate-hide").parentNode.cells[0].firstChild;
		if (completed.classList[1] != "op-icon-y")
		{
			completed = null;
		}
	}
	else
	{
		checkstatus = false;
		window.clearInterval(window.intervalID);
	}
	if (checkstatus)
	{
		if (completed && (completed.style.display == "" || completed.style.display == "display" || completed.style.display == "inline" || completed.style.display == "block"))
		{
			window.clearInterval(window.intervalID);
			window.opener.location.replace(window.opener.location.href);
			window.opener = null;
			window.setTimeout('window.close()', 500);
			return;
		}
		if (error && (error.style.display == "" || error.style.display == "display" || error.style.display == "inline"))
		{
			window.clearInterval(window.intervalID);
			window.opener.location.replace(window.opener.location.href);
			return;
		}
		if (!isalert && process == completedNum)
		{
			isalert = true;
			if (needclick)
			{
				window.setTimeout('alert("请点击验证码")', 300);
			}
		}
	}
}, 500);