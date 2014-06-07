// ==UserScript==
// @name           Douban Say Anywhere
// @namespace      http://meckmeck.cn
// @description    在豆瓣任何页面使用我说功能(v1.2)
// @include        http://www.douban.com/*
// @exclude        http://www.douban.com/radio/
// @require        http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @author         Meck
// @version 1.2
/* @reason
   v1.2
   1.增加如下快捷键：
    呼出我说对话框：Alt+W
    关闭我说对话框：Alt+R
    提交内容：Ctrl+Enter
   2.呼出对话框后自动设置焦点。
@end*/
// ==/UserScript==

//自动检测脚本最新版本
var thisScript = {
    name: "Douban Say Anywhere",
    id: "61245",
    version:"1.2"
}
var updater = new Updater(thisScript);
updater.check();

//创建我说按钮
var oSayButton = document.createElement("a");

oSayButton.id = "say_button";
oSayButton.href = "javascript:"
GM_addStyle('\
	#say_button {\
	    -moz-background-clip:border;\
	    -moz-background-inline-policy:continuous;\
	    -moz-background-origin:padding;\
	    -moz-border-radius-bottomright:5px;\
	    -moz-border-radius-topright:5px;\
	    background:#666666 url(http://keep-rolling.googlecode.com/files/say.gif) no-repeat scroll 5px center;\
	    border-color:#EEF9EB;\
	    border-style:solid;\
	    border-width:4px 4p 4px 0;\
	    display:block;\
	    height:66px;\
	    outline-color:-moz-use-text-color;\
	    outline-style:none;\
	    outline-width:medium;\
	    position:fixed !important;\
	    left:0;\
	    text-indent:-9999px;\
	    top:300px;\
	    width:24px;\
	}\
');
document.body.appendChild(oSayButton);

//显示我说对话框
function fnShow() {
    if (document.getElementById("overlay") == undefined) {
	var oDivOverlay = document.createElement("div");
	oDivOverlay.id = "overlay";
	oDivOverlay.style.height = "200px";
	oDivOverlay.style.width = "586px";
	oDivOverlay.style.left = "351px";
	oDivOverlay.style.top = "250px";

	var oDivDialog = document.createElement("div");
	oDivDialog.id = "dialog";
	oDivDialog.style.left = "351px";
	oDivDialog.style.top = "250px";
	oDivDialog.innerHTML = "<div>"+
	"<div class='indentpop clearfix'>"+
	"<span class='gact rr'><a href='javascript:void(O)' onclick='close_dialog()'>x</a></span>"+
	"<h2 style='display: inline !important;'>我说   · · · · · ·</h2>"+
	"<span id='tip' style='margin-left:10px;color:#BBBBBB'>呼出我说：Alt+W 关闭我说：Alt+R 提交：Ctrl+Enter</span>"+
	"<div style='display: none;'><input type='hidden' value='8cdb' name='ck'/></div>"+
	"<div align='center'>"+
	"<textarea class='area_miniblog' rows='5' id='mb_text' name='mb_text' style='width:400px'></textarea><br/>"+
	"<input type='button' value=' 我说 ' class='button' name='mb_submit' id='mb_submit' />"+
	"</div>"+
	"</div>";

	var oDivWrapper = document.getElementById("wrapper");

	document.body.insertBefore(oDivDialog, oDivWrapper);
	document.body.insertBefore(oDivOverlay, oDivDialog);

	//为文本框设置焦点
	document.getElementById("mb_text").focus();

	//给提交按钮添加监听函数
	var oSubmit = document.getElementById("mb_submit");
	oSubmit.addEventListener("click", fnPostData, false);
    }
}

//POST数据
function fnPostData(){

    fnChangeTip()

    //获取隐藏字段的值
    GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.douban.com/contacts/',
	headers: {
	    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(responseDetails) {
	    var strInput = responseDetails.responseText;
	    var regx=/name=\"ck\" value=\"(.*?)\"/g;
	    strInput.match(regx);
	    var str = RegExp.$1;
	    //POST数据
	    GM_xmlhttpRequest({
		method: "POST",
		url: "http://www.douban.com/contacts/",
		data: "ck="+str+"&mb_text="+document.getElementById("mb_text").value,
		headers: {
		    "Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(){
		    //关闭对话框
		    unsafeWindow.close_dialog();
		}
	    });
	}
    });
}

//提交后显示
function fnChangeTip(){
    oTip = document.getElementById("tip");
    oTip.style.color = "#F92D09";
    oTip.innerHTML = "内容提交中...";
}

//快捷键
function fnHotKey(oEvent) {
    //呼出alt+w
    if (oEvent.altKey === true && oEvent.keyCode === 87) {
	fnShow();
    }

    //提交ctrl+enter
    if (oEvent.ctrlKey === true && oEvent.keyCode === 13) {
	fnPostData();
    }

    //关闭alt+r
    if (oEvent.altKey === true && oEvent.keyCode === 82) {
	unsafeWindow.close_dialog();
    }
}

//给我说按钮添加监听函数
var oButton = document.getElementById("say_button");
oButton.addEventListener("click", fnShow, false);

//给页面添加键盘监听函数
document.addEventListener('keydown', fnHotKey, true);

//给文本框添加键盘监听函数
var oTextarea = document.getElementById("mb_text");
oTextarea.addEventListener('keydown', fnHotKey, true)
