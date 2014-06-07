// ==UserScript==
// @name         贴吧免跳转链
// @namespace    http://jixun.org/
// @version      1.0.1.2
// @description  修正跳转链为直接点击的链接 owo
// @include      http://tieba.baidu.com/*
// @include      http://tieba.com/*

// 手机版应该没那么丧心病狂吧… 大概…
// @include      http://*.tieba.com/*
// @include      http://wapp.tieba.com/*

// @copyright    2013+, Jixun66 / Jixun67 / Jixun.Moe
// @run-at       document-start
// ==/UserScript==

document.addEventListener ('DOMContentLoaded', function () {
	console.log ('贴吧免跳转链: 启动');
	/* floorLoader by Jixun v1.0
	 * License: WTFPL Version 2 [http://www.wtfpl.net/about/]
	 * */
	var floorLoader=function (){var c=[],b=new MutationObserver(function(a){a.forEach(function(a){if(a.addedNodes.length)for(var b=a.addedNodes[0].childNodes,d=0;d<b.length;d++)c.forEach(function(a){a(b[d])})})});return{regFloor:function(a){return-1===c.indexOf(a)&&c.push(a)-1},rmFloor:function(a){return c.splice(a,1).length},init:function(a){b.observe(a||document.querySelector("#j_p_postlist"),{childList:!0})},destory:function(){b&&b.disconnect()}}}();
	floorLoader.init ();
	
	function parseLinkUrl (n, u) {
		if (n.parentNode.className.indexOf ('wrapper') + 1) {
			// 因为 W3 标准规定 “必须” 跟随目标地址的 Location 跳转，所以 orz
			// 如果有壕能赞助个服务器咱可以写个解析器扔上去 owo
			// 对了请不要盗用 APIKey, 申请很容易的说 >.>
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://api.unshorten.it/?apiKey=7cNOOMPwOokgQCcgaZkRGkCMjZkXpkfS&shortURL=' + encodeURIComponent(n.href),

				onload: function(response) {
					if (response.responseText.indexOf('http') == 0)
						n.href = response.responseText;
				}
			});

			return false;
		}
		
		// 删掉开头结尾的空格
		var ret = u.replace(/(^\s*|\s*$)/g, '');
		
		// @ 链接防出错. 虽然现阶段不会但是难保以后会被查到
		if (u.indexOf('@') == 0)
			return false;
		
		console.log ('修正链接: %s', u);
		
		// 检查是否带 http 协议头 (因为度娘能识别 www.example.com 这样的地址)
		// 如果不添加会跳到 => 当前.域名/www.example.com
		if (ret.indexOf ('http') != 0)
			return 'http://' + ret;
		
		return ret;
	}
	
	function doFixLink (f) {
		// 枚举链接
		for (var i=0,
			 allLink = f.querySelectorAll ('a[href*="jump.bdimg.com/safecheck"]'); 
				i < allLink.length; i++)

			// 替换成内容链接
			allLink[i].href = parseLinkUrl(allLink[i], allLink[i].textContent || allLink[i].innerText) || allLink[i].href;
	}
	
	doFixLink (document);
	floorLoader.regFloor (doFixLink);
	
	console.log ('贴吧免跳转链: 结束');
}, false);