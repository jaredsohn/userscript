// ==UserScript==
// @name        贴吧首页回复
// @namespace   贴吧
// Copyleft (c) 2013,网络孤独行客
// @include     http://tieba.baidu.com/*
// @grant		GM_xmlhttpRequest
// @grant		GM_addStyle
// @grant		unsafeWindow
// @version     0.2
// ==/UserScript==

GM_addStyle(".reply_a{display:none;cursor:pointer;}");
GM_addStyle(".j_th_tit{float:left}");
GM_addStyle(".j_thread_list:hover .reply_a,.thread_title:hover  .reply_a{display:block}");
GM_addStyle(".reply_a{display:none;cursor:pointer;float:right !important;}");

(function(){
	function GM_wait(){
		if(typeof unsafeWindow.jQuery == 'undefined') { 
			window.setTimeout(GM_wait,100); 
		}
		else { 
			$ = unsafeWindow.jQuery; 
			init(); 
		}
	}
	function ajax_wait(){
		if($("div.j_th_tit .reply_a").length || $("td.thread_title .reply_a").length ){
			return 0;
		}
		else{
			init();
		}
	}

	function init(){
		var kw=$('meta')[1].getAttribute("fname");
		kw=encodeURI(kw);
		var mouse_pwd_t=get_mouse_pwd_t();
		var mouse_pwd=get_mouse_pwd(mouse_pwd_t);
		var tbs=unsafeWindow.PageData.tbs;
		var fid=unsafeWindow.PageData.forum.id;
		mouse_pwd=encodeURI(mouse_pwd);

		$("div.threadlist_title").each(function(){
			$(this).append("<a class='reply_a' style='color:red;'>回复</a>");
			var url=$(this).children('a').attr('href');
			url=url.slice(3,14);
			$(this).find(':last-child')[0].addEventListener("click",function(){
				var promptTit="请输入回复内容";
				var content=prompt(promptTit,'文科大水B');
				if(content){
					content=encodeURI(content);
					reply(kw,url,content,mouse_pwd,mouse_pwd_t,tbs,fid);
				}
			});
		});
	}
	function get_mouse_pwd(time) {
		var Y="241,1845\t1,0,1,0,1,0,1,0,1,0\t1450514\t1366,768"
		var T = [];
		var W = {};
		var X = time % 100;
		for (var V = 0,
		U = Y.length; V < U; V++) {
			var Z = Y.charCodeAt(V) ^ X;
			T.push(Z);
			if (!W[Z]) {
				W[Z] = []
			}
			W[Z].push(V);
		}
		return T;
	}

	function get_mouse_pwd_t() {
		var mim = new Date().getTime();
		return mim;
	}

	function reply(kw,url,content,mouse_pwd,mouse_pwd_t,tbs,fid){
		GM_xmlhttpRequest({
			method:"POST",
			url:"http://tieba.baidu.com/f/commit/post/add",
			data:"kw="+kw+"&ie=utf-8&rich_text=1&floor_num=2&fid="+fid+"&tid="+url+
			"&mouse_pwd="+mouse_pwd+"&mouse_pwd_t="+mouse_pwd_t+
			"&mouse_pwd_isclick=1&lp_type=0&lp_sub_type=0&content="+content+
			"&anonymous=0&tbs="+tbs+"&tag=11",
			headers:{
				'cookie':document.cookie,
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload:function(response) {
			}
		});
	}

	GM_wait();
	//Ajax 翻页
	$(document).ajaxComplete(function(){  
		window.setTimeout(ajax_wait,1000); 
	}); 
})()