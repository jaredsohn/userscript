// ==UserScript==
// @name         USO 用户菜单
// @version      2013.0904.1329.M.01
// @description  用户名下拉菜单 (可定制)
// @namespace    http://userscripts.org/scripts/show/104942
// @author       Tristan DANIEL (PATATE12 aka. jesus2099/shamo), Translated and Modified by Jixun67 / Jixun.Moe
// @licence      CC BY-NC-SA 3.0 (http://creativecommons.org/licenses/by-nc-sa/3.0/)
// @grant        none
// @include      http://userscripts.org*
// @include      https://userscripts.org*
// @run-at       document-start
// ==/UserScript==

addEventListener ('DOMContentLoaded', function () {
"use strict";
/* - --- - --- - --- - 配置开始 - --- - --- - --- - 
hidedelay      : 当鼠标离开时等待多少毫秒后隐藏
clickhidedelay : 当鼠标点击多少毫秒后隐藏 (一般较小的值)
menuitems      : 当前的菜单项目 (如果不确定如何更改请跟帖回复我会给出修改方案)
                 你可以使用变量如: %username%, %scriptid%, %thirduser% (脚本作者), %thirduserid% (脚本作者 ID)
                 如果想添加非链接段落, 将 head 值设为 true 即可 (!0 即为 true).
  - --- - --- */

var eStyle = document.createElement ('style');
eStyle.innerHTML = '#usermenu { border: 1px #000 solid; position: absolute; display: none; background: black; padding: .4em 0; left: 1030px; top: 25px; }\
#usermenu li.l:hover { background: orange; color: black; }\
#usermenu li { padding: 0 .4em; list-style: none; } #usermenu li.bar { color: #000; background: #fff; padding-top: 6px}\
#usermenu a { color: #fff; text-decoration: none !important; }';
document.body.appendChild (eStyle);

var hidedelay = 300;
var clickhidedelay = 100;
var menuitems = [{
	name: '后台首页', 
	addr: '/home'
}, {
	name: '%username%', 
	head: !0
}, {
	name: '我的脚本', 
	addr: '/home/scripts'
}, {
	name: '新脚本 (文件上传)', 
	addr: '/scripts/new'
}, {
	name: '新脚本 (代码上传)', 
	addr: '/scripts/new?form=true'
}, {
	name: '用户设定', 
	addr: '/home/settings'
}, /*{
	name: '用户挂件', 
	addr: '/home/widgets'
},*/ {
	name: '查看评论', 
	addr: '/home/comments'
}, {
	name: '监视的帖子', 
	addr: '/home/topics'
}, {
	name: '脚本查询', 
	head: !0
}, {
	name: '收藏的脚本', 
	addr: '/home/favorites'
}, {
	name: '搜寻 [%username%] 的脚本', 
	addr: '/scripts/search?q=%username%'
}, {
	name: '社区', 
	head: !0
}, {
	name: '发送私信给 (%thirduser%)', 
	addr: '/messages/new?user_id=%thirduserid%',
	cond: function () {
		return (thirduser != '')
	}
}, {
	name: '创建脚本回应 (%scriptid%)', 
	addr: '/topics/new?script_id=%scriptid%',
	cond: function () {
		return (scriptid != 0)
	}
}, {
	name: '查看评论', 
	addr: '/home/comments'
}, {
	name: '监视的帖子', 
	addr: '/home/posts'
}, {
	name: '在论坛搜寻 [%username%]', 
	addr: '/posts/search?kind=forums&q=%username%'
}];
/* - --- - --- - --- - 配置结束 - --- - --- - --- - */

// 空白函数
function f () { }

var ulink = document.querySelector ('a[href^="/home"]');
var to, usermenu;
var username = ulink.textContent;
try {
	var scriptid = parseInt((document.querySelector('.menu a').href.match (/w\/(\d+)/i)||[,0])[1]);
} catch (e) {
	var scriptid = 0;
}
try {
	var thirduser = document.querySelector('.author a').textContent;
	var thirduserid = parseInt(document.querySelector('.author a').getAttribute ('user_id'));
} catch (e) {
	var thirduser='', thirduserid='';
}

function parseUrlVar (str) {
	return str
		.replace(/%username%/gi, username)
		.replace(/%thirduser%/gi, thirduser)
		.replace(/%scriptid%/gi, scriptid)
		.replace(/%thirduserid%/gi, thirduserid);
}

if (ulink) {
	ulink.appendChild(document.createTextNode("+"));
	usermenu = document.createElement("ul");
	usermenu.id = "usermenu";
	
	menuitems.forEach (function (e) {
		if (e.cond && !e.cond())
			return;
		
		var link = document.createElement(e.head?'li':'a'), li;
		if (!e.head) {
			li = document.createElement('li');
			li.textContent = parseUrlVar (e.name);
			li.className = 'l';
			link.href = parseUrlVar(e.addr);
			link.appendChild(li);
		} else {
			link.className = 'bar';
			link.textContent = parseUrlVar (e.name);
		}
		usermenu.appendChild(link);
	});
	
	document.body.appendChild(usermenu);
	[ulink, usermenu].forEach (function (e) {
		e.addEventListener ("mouseover", function(e) { showUserMenu(e, true) }, true);
		e.addEventListener ("mouseout",  function(e) {to = setTimeout (function () {
			showUserMenu (e, false)
		}, hidedelay)}, true);
	});
	usermenu.addEventListener ('click', function (e) {
		var t= e.target || e.srcElement;
		if (t.tagName.toLowerCase () == 'li') {
			t.querySelector ('a').click();
		}
	});
	document.body.addEventListener("click", function(e) {
		to = setTimeout (function () { showUserMenu (e, false) }, clickhidedelay)
	}, false);
}

var ls = document.querySelector ('#top .container');
function showUserMenu(e, on) {
	clearTimeout (to);
	usermenu.style.left = ls.offsetLeft + 800 + 'px';
	usermenu.style.display = (on?'block':'none');
}

}, false);