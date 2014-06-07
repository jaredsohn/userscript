// ==UserScript==
// @name         傲娇零次元免掉线脚本
// @namespace    http://jixun.org/
// @version      1.0.2.0
// @description  每 12 分钟刷新一次, 顺便加了个快速回复那里的自动字数补丁
// @include      *://aojiao.org/*
// @include      *://www.aojiao.org/*
// @copyright    2012+, Jixun
// @run-at       document-start
// ==/UserScript==

try {var w = unsafeWindow} catch (e) {var w = window}
// 如果需要使用小尾巴请改 false 为 true.
var useTail = false,
    strTail = '/水水更健康 0v0';

function $(p) {var ret=document.querySelector(p);return ret?ret:document.getElementById(p)}
function reDefId () { localStorage.refId = refreshId = Math.random ().toString().substr(2) }
function execIfVarDefined (ver4Check, func, replaceVar) {
	var timer = setInterval(function(){
		if (typeof(ver4Check) == 'function') {
			if (!ver4Check())
				return;
		} else {
			if (typeof(w[ver4Check]) == 'undefined')
				return;
		}
		clearInterval (timer);
		
		if (replaceVar && typeof(ver4Check) == 'function')  w[ver4Check] = replaceVar;
		if (typeof(func) == 'function') func ();
	}, 100);
}
var refreshId,
	refEle = document.createElement ('div'),
	refObj = document.createElement ('iframe'),
	refFoo = function () {
		// 请勿在两个页面开启该功能
		if (localStorage.refId != refreshId) {
			refEle.textContent = '自动刷新已结束, 如果需要重新开启单击此处即可';
			return
		}
		console.log ('开始刷新 (' + Date().toString() + ')');
		refEle.textContent = '自动刷新于 [' + Date().toString() + '], 12 分钟后继续.';
		reDefId ();
		refObj.src = '/?' + refreshId + (+new Date()).toString(); // 防止缓存
		setTimeout (refFoo, 720000); // 12 mins
	};
if (!localStorage.getItem ('refId'))
	localStorage.refId = 0;

// 初始化
refEle.style.cursor = 'pointer';
refObj.style.border = 'none';
refObj.style.width = refObj.style.height = 0;
refEle.textContent = '自动刷新';
refEle.style.marginLeft = '20px';

// 等待网页加载
addEventListener ('DOMContentLoaded', function () {
	// 如果访问内容不是网页 (一般没有标题属性), 则不执行后续代码
	if (!document.querySelector ('title')) return;

	document.querySelector ('#toptb').style.height = '50px';
	document.body.appendChild (refObj);
	var refInsObj = document.querySelector ('#toptb .z');
	refInsObj.parentNode.insertBefore (refEle, refInsObj);
	refEle.addEventListener ('click', function () {
		refEle.textContent = '请保留该窗口开启, 并不要在其他窗口开启该功能, 每 12 分钟自动穿透缓存重新访问.';
		reDefId ();
		console.log ('12 mins 后自动刷新启动');
		localStorage.refId = refreshId;
		setTimeout (refFoo, 720000); // 12 mins
	});
	
	execIfVarDefined ('parseurl', function () {
        if (!useTail) return;
		// 自动字数补丁, 快速回复处
		var parseurlOld = w.parseurl;
		w.parseurl = function (a,b,c) {
            var arg = arguments;
            arg[0] += '\n' + strTail;
			return parseurlOld.apply (this, arg);
		}
	});
}, false);