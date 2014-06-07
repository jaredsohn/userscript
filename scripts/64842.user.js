// ==UserScript==
// @name           Douban Say++
// @namespace      http://www.douban.com/people/coolzi/
// @description    随时我说，同步微博(v1.0.1)
// @include        http://www.douban.com/*
// @exclude        http://www.douban.com/radio/
// @require        http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @author         Meck
// @version 1.0.1
/* @reason
   v1.0.1
   1.修正了对新版豆瓣的支持。= =！
@end*/
// ==/UserScript==

//自动检测脚本最新版本
var thisScript = {
	name: "Douban Say Anywhere",
	id: "64842",
	version:"1.0.1"
}
var updater = new Updater(thisScript);
updater.check();

//添加样式
GM_addStyle('\
	#say_button {\
	    -moz-background-clip:border;\
	    -moz-background-inline-policy:continuous;\
	    -moz-background-origin:padding;\
	    -moz-border-radius-bottomright:5px;\
	    -moz-border-radius-topright:5px;\
	    background:#666666 url(http://meck.byethost22.com/imgs/say.gif) no-repeat scroll 5px center;\
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
	#setting {\
	   \
	}\
	#setting fieldset label {\
	    cursor:pointer;\
	    margin:20px 18px;\
	    padding:2px;\
	}\
	.gab {\
	}\
	.gta {\
	    text-align: center;\
	    margin-top: 5px;\
	}\
	#showsetting {\
	    float: right;\
	}\
');
//创建我说按钮
if(GM_getValue("saybutton", true) === true) {
	var oSayButton = document.createElement("a");
	oSayButton.id = "say_button";
	oSayButton.href = "javascript:void(0)"
	document.body.appendChild(oSayButton);

	//给我说按钮添加监听函数
	var oButton = document.getElementById("say_button");
	oButton.addEventListener("click", fnShow, false);
}

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
		"<span class='gact rr'><a href='javascript:void(0)' onclick='close_dialog()'>x</a></span>"+
		"<h2 style='display: inline !important;'>我说   · · · · · ·</h2>"+
		"<span id='tip' style='margin-left:10px;'>"+
		"<span style='color: #bbbbbb'>还可以输入<span style='font-size:14px;font-weight:bold;'>128</span>个字</span></span>"+
		"<textarea style='width: 514px;' name='mb_text' id='mb_text' rows='5' class='area_miniblog'></textarea>"+
		"<div class='gab'>"+
		"<input type='button' id='mb_submit' name='mb_submit' class='button' value=' 我说 '/>"+
		"<a id='showsetting' href='javascript:void(0)'>设置 ▼</a>"+
		"</div>"+
		"<div id='setting' style='display:none'>"+
		"<h2 style='display: inline ! important;'>设置   · · · · · ·</h2>"+
		"<fieldset>"+
		"<legend>基本</legend>"+
		"<label><input type='checkbox' id='saybutton' name='saybutton' value='true' />显示我说按钮</label>"+
		"<label>打开/关闭窗口快捷键：<input type='text' id='hotkey' name='hotkey' /></label>"+
		"</fieldset>"+
		"<fieldset>"+
		"<legend>同步到嘀咕</legend>"+
		"<label><input type='checkbox' id='sync_digu' name='sync_digu' value='true' />开启同步</label>"+
		"<br />"+
		"<label>用户名：<input type='text' id='digu_username' name='username' value='' /></label>"+
		"<label>密码：<input type='password' id='digu_password' name='password' value='' /></label>"+
		"</fieldset>"+
		"<div class='gta'>"+
		"<input type='button' value='保存' id='save_setting' name='save' />"+
		"<input type='button' value='取消' id='cancel_setting' name='cancel' />"+
		"</div>"+
		"</div>"+
		"</div>"+
		"</div>"
		var oDivWrapper = document.getElementById("wrapper");

		document.body.insertBefore(oDivDialog, oDivWrapper);
		document.body.insertBefore(oDivOverlay, oDivDialog);

		//为文本框设置焦点
		document.getElementById("mb_text").focus();

		//给文本框添加键盘监听函数
		var oTextarea = document.getElementById("mb_text");
		oTextarea.addEventListener('keydown', fnHotKey, true)

		//给文本框添加字数检测
		document.addEventListener('keydown', fnWordCount, true)

		//给提交按钮添加监听函数
		var oSubmit = document.getElementById("mb_submit");
		oSubmit.addEventListener("click", fnPostData, false);

		//给设置按钮添加监听函数
		var oSettingButton = document.getElementById("showsetting");
		oSettingButton.addEventListener("click", fnShowSetting, false);

		//给保存按钮添加监听函数
		var oSave = document.getElementById("save_setting");
		oSave.addEventListener("click", fnSaveSetting, false);

		//给取消按钮添加监听函数
		var oCancel = document.getElementById("cancel_setting");
		oCancel.addEventListener("click", fnShowSetting, false);
	}
	else {
		//关闭对话框
		unsafeWindow.close_dialog();
	}
}

//POST数据
function fnPostData(){

	fnChangeTip("<span style='color: #F92D09'>内容提交中...</span>")

	//获取隐藏字段的值
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.douban.com/',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var oInputs = document.getElementsByTagName("input");
			for(i = 0; i < oInputs.length; i++){
				if(oInputs[i].name == "ck") {
					var str = oInputs[i].value;
					break;
				}
			}
			var content = document.getElementById("mb_text").value;
			//POST数据
			GM_xmlhttpRequest({
				method: "POST",
				url: "http://www.douban.com/",
				data: "ck="+str+"&mb_text="+content,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function(){
					//关闭对话框
					unsafeWindow.close_dialog();
					if(GM_getValue("sync_digu", false) === true) {
						fnSyncDigu(content);
					}
				}
			});
		}
	});
}

//给页面添加键盘监听函数
document.addEventListener('keydown', fnHotKey, false);

// keycode 转换
function getKeys(e){
	var codetable={
		'96':'Numpad 0',
		'97':'Numpad 1',
		'98':'Numpad 2',
		'99':'Numpad 3',
		'100':'Numpad 4',
		'101':'Numpad 5',
		'102':'Numpad 6',
		'103':'Numpad 7',
		'104':'Numpad 8',
		'105':'Numpad 9',
		'106':'Numpad *',
		'107':'Numpad +',
		'108':'Numpad Enter',
		'109':'Numpad -',
		'110':'Numpad .',
		'111':'Numpad /',
		'112':'F1',
		'113':'F2',
		'114':'F3',
		'115':'F4',
		'116':'F5',
		'117':'F6',
		'118':'F7',
		'119':'F8',
		'120':'F9',
		'121':'F10',
		'122':'F11',
		'123':'F12',
		'8':'BackSpace',
		'9':'Tab',
		'12':'Clear',
		'13':'Enter',
		'16':'Shift',
		'17':'Ctrl',
		'18':'Alt',
		'20':'Cape Lock',
		'27':'Esc',
		'32':'Spacebar',
		'33':'Page Up',
		'34':'Page Down',
		'35':'End',
		'36':'Home',
		'37':'←',
		'38':'↑',
		'39':'→',
		'40':'↓',
		'45':'Insert',
		'46':'Delete',
		'144':'Num Lock',
		'186':';:',
		'187':'=+',
		'188':',<',
		'189':'-_',
		'190':'.>',
		'191':'/?',
		'192':'`~',
		'219':'[{',
		'220':'\|',
		'221':']}',
		'222':'"'
	};
	var Keys = '';
	e.shiftKey && (e.keyCode != 16) && (Keys += 'shift+');
	e.ctrlKey && (e.keyCode != 17) && (Keys += 'ctrl+');
	e.altKey && (e.keyCode != 18) && (Keys += 'alt+');
	return Keys + (codetable[e.keyCode] || String.fromCharCode(e.keyCode) || '');
}

//快捷键
function fnHotKey(oEvent) {
	//打开关闭窗口
	if (getKeys(oEvent) == GM_getValue("hotkey", "alt+W")){
		fnShow();
		oEvent.preventDefault();
		oEvent.stopPropagation();
	}
	//提交ctrl+enter
	if (oEvent.ctrlKey === true && oEvent.keyCode === 13) {
		fnPostData();
		oEvent.preventDefault();
		oEvent.stopPropagation();
	}
}

//显示关闭设置界面
function fnShowSetting(){
	oDiv1 = document.getElementById("setting");
	oDiv2 = document.getElementById("overlay");
	oDiv3 = document.getElementById("showsetting")
	if (oDiv1.style.display == "none"){
		oDiv1.style.display = "block";
		oDiv2.style.height = "380px";
		oDiv3.innerHTML="缩起 ▲";

		fnLoadSetting();

		//即时显示快捷键
		var cobj = document.getElementById("hotkey");
		cobj.addEventListener('keydown',function(e){
			this.value = getKeys(e);
			e.preventDefault();
			e.stopPropagation();
		},false);
	}
	else{
		oDiv1.style.display = "none";
		oDiv2.style.height = "200px";
		oDiv3.innerHTML="设置 ▼";
	}
}

//保存设置
function fnSaveSetting() {
	GM_setValue("saybutton", document.getElementById("saybutton").checked);
	GM_setValue("hotkey", document.getElementById("hotkey").value);
	GM_setValue("sync_digu", document.getElementById("sync_digu").checked);
	GM_setValue("digu_username", document.getElementById("digu_username").value);
	GM_setValue("digu_password", document.getElementById("digu_password").value);

	fnShowSetting();
}

//加载设置
function fnLoadSetting() {
	document.getElementById("saybutton").checked = GM_getValue("saybutton", "checked");
	document.getElementById("hotkey").value = GM_getValue("hotkey", "alt+W");
	document.getElementById("sync_digu").checked = GM_getValue("sync_digu");
	document.getElementById("digu_username").value = GM_getValue("digu_username", "");
	document.getElementById("digu_password").value = GM_getValue("digu_password", "");
}


//提交后显示
function fnChangeTip(str){
	;
	oTip = document.getElementById("tip");
	oTip.innerHTML = str;
}

//同步嘀咕
function fnSyncDigu(content) {
	var sUsername = GM_getValue("digu_username");
	var sPassword = GM_getValue("digu_password");

	GM_xmlhttpRequest({
		method: "POST",
		url: "http://"+sUsername+":"+sPassword+"@api.minicloud.com.cn/statuses/update.xml",
		data: "content="+encodeURIComponent(content),
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function() {
		}
	});
}

//检测字数
function fnWordCount() {
	var sColor = "";
	var iNum = 127 - document.getElementById("mb_text").value.length;
	iNum < 0 ? sColor = "#F92D09" : sColor = "#BBBBBB";
	fnChangeTip("<span style='color: #BBBBBB'>还可以输入<span style='font-size:14px;font-weight:bold;color:"+sColor+"'>"+iNum+"</span>个字</span>");
}