// ==UserScript==
// @name        Grab sofa for tieba
// @namespace   http://userscripts.org/users/508758
// @description 贴吧抢沙发
// @include     http://tieba.baidu.com/p/*
// @include	http://tieba.baidu.com/f?kw=*
// @version     1.0 beta
// ==/UserScript==

// first created on Apr 7, 2013
// finished on Apr 8, 2013
// 请保证你的网速足够快, 该脚本并不保证一定能抢到沙发。。纯新手渣实现 勿喷。。
// 貌似ff只能一次同时打开10个窗口
// 请务必在脚本每次执行后按下暂停键或ctrl+Q


if (GM_getValue("is_started")) {	// 已经开启了抢沙发模式
	goToFind();
	}

function createContent() {	// 用户界面
	var content = document.getElementsByClassName('dir_rank')[0];
	var newDiv = document.createElement("div");
	newDiv.innerHTML = '<input id = "wtxt" value = "抢沙发" type = "text" style = "height:20px; position:relative; left:50px "> <button id = "wBtn" style = "position:relative; left:50px; "> 抢沙发 </button> <button id = "stop_Btn" style = "position:relative; left:50px; "> 暂停 </button>';
	content.appendChild(newDiv);
	var the_wBtn = document.getElementById("wBtn")
	the_wBtn.addEventListener("click", goToGrabSofa);
	var stop_Btn = document.getElementById("stop_Btn");
	stop_Btn.addEventListener("click", stop);
	document.getElementById("wtxt").select();
	}

function stop() {
	var keys = GM_listValues();
	var length = keys.length;
	for(var i = 0; i < length; i++)
		GM_deleteValue(keys[i]);
	}

function goToGrabSofa() {
	GM_setValue("is_started", true);	// 开启抢沙发模式
	var sofa_txt = document.getElementById("wtxt").value;
	GM_setValue("sofa_txt", sofa_txt);
	goToFind();
	}
	
function goToFind() {
	var list = document.getElementsByClassName('threadlist_rep_num');
	var length = list.length;
	for(var i = 0; i < length; i++) {
		if (list[i].innerHTML !== '0') continue;
		var aim = list[i].parentNode.nextSibling.nextSibling.childNodes[1].childNodes[1].childNodes[1];
		aim.click();
		}
	window.location.reload();
	}
	
	
if (document.getElementById('title1')) {	// in page1
	createContent();
	}
else {	// in page2
	if (!GM_getValue('is_started')) return;	// 没有开启抢沙发模式
	if (!GM_getValue(window.location.href)) {
		GM_setValue(window.location.href, true);
		var btn = document.getElementsByClassName('subbtn_bg')[0];
		var txt = document.getElementsByClassName('tb-editor-editarea')[0];
		txt.innerHTML = GM_getValue("sofa_txt");
		btn.click();
		}
	else {
		// GM_deleteValue(window.location.href);
		window.close();
		}
	}

	
// 设置stop函数的快捷键 ctrl + Q
document.onkeydown = hotkey;
function hotkey(event) {
	if (event.ctrlKey && event.keyCode === 81) 
		stop();
	}	

////////////////////////////////////////////////////////////////////////////////////////////////

