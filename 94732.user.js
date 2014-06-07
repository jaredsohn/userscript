// ==UserScript==
// @name           youku Light On
// @namespace      youkuLight
// @description    优酷的关灯不应该那么刺眼
// @author         zhcexo
// @homepage      http://www.zhcexo.com/
// @include        http://v.youku.com/v_show/*
// @include        http://v.youku.com/v_playlist/*
// @version        1.42
// ==/UserScript==
(function(){
	var body = document.getElementsByTagName("body")[0];
	var bodyMask = document.createElement("div");
	bodyMask.setAttribute("id","bodymask");
	body.appendChild(bodyMask);
	var head = document.getElementsByTagName("head")[0];
	var style = document.createElement("style");
	head.appendChild(style);
	var css_text = "#bodymask{position:fixed;top:0;left:0;width:100%;height:100%;background:#000;z-index:999;opacity:0.75;cursor:pointer;}#brightness,#flvDownload{position:fixed;right:20px;bottom:20px;color:#fff;z-index:1000;cursor:pointer;padding:6px 10px;background:#000;-moz-border-radius:3px;-webkit-border-radius:3px;}#flvDownload{display:block;width:48px;height:20px;right:98px;}#flvDownload:hover{text-decoration:none;}#flvDownload:focus{outline:none;}#lightZH{float:right;color:#014ccc;cursor:pointer;}";
	var css = document.createTextNode(css_text);
	style.appendChild(css);
	var vpvideonav = document.getElementsByTagName("div");
	for(var i=0;i<vpvideonav.length;i++){
		if(vpvideonav[i].className == "guide"){
			var guide = vpvideonav[i];
			break;
		}
	}
	var maskctrl = document.createElement('div');
	maskctrl.setAttribute("id","lightZH");
	guide.appendChild(maskctrl);
	document.getElementById('lightZH').innerHTML = '开启护眼';
	
	var bright = document.createElement("div");
	bright.setAttribute("id","brightness");
	bright.setAttribute("title","调节遮罩亮度值");
	bright.innerHTML = "亮度调节";
	body.appendChild(bright);
	
	var download = document.createElement("a");
	var down_href = document.location.href;
	down_href = "http://www.flvcd.com/parse.php?flag=&format=&kw=" + encodeURIComponent(down_href);
	download.setAttribute("id","flvDownload");
	download.setAttribute("title","用硕鼠下载此视频");
	download.setAttribute("href",down_href);
	download.setAttribute("target","_blank");
	download.innerHTML = "下载视频";
	body.appendChild(download);
	
	var maskHandler = document.getElementById("bodymask");
	var ctrlHandler = document.getElementById("brightness");
	
	function ctrl(){
		body.removeChild(maskHandler);
		body.removeChild(ctrlHandler);
	}
	maskHandler.addEventListener("click",ctrl,false);
	
	function lightOn(){
		body.appendChild(bodyMask);
		body.appendChild(bright);
	}
	document.getElementById("lightZH").addEventListener("click",lightOn,false);
	
	function brightCtrl(){
		var opacity = prompt("请输入亮度值(0~100之间的整数)：");
		if(!opacity) return false;
		opacity -= 0;
		opacity = Math.round(opacity)/100;
		if(opacity>1 || opacity<0) return false;
		maskHandler.style.opacity = opacity;
	}
	document.getElementById("brightness").addEventListener("click",brightCtrl,false);
})();