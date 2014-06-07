// ==UserScript==
// @name          Simple Google Reader Style
// @namespace     Simple_GR_Style
// @description	  Changes the GR's default interface
// @author        ZH CEXO
// @homepage      http://www.zhcexo.com/
// @include       http://www.google.com/reader/view/*
// @include       https://www.google.com/reader/view/*
// @version       1.33
// @homepage      http://www.zhcexo.com/simple-gr-update-to-1-1/
// ==/UserScript==
/*以下是Simple Google Reader Style的脚本内容*/
(function() {
//添加css样式
	var css = "@namespace url(http://www.w3.org/1999/xhtml);*:focus{outline:none !important;}html,body{font-family:Tahoma,\"Microsoft Yahei\" !important;color:#333 !important;}#gb{display:none;}#main{clear:both;}#main,.lhn-section,.scroll-tree li{background:#e3e3e3 !important;}#lhn-add-subscription-section{width:auto !important;margin-left:90px !important;}#lhn-add-subscription{margin-left:0 !important;top:0 !important;margin-top:0 !important;}#search{position:relative !important;}#viewer-header{height:31px !important;}#viewer-top-controls-container{top:0 !important;margin-top:1px !important;}#viewer-header-container{background:#fff !important;}#navbutton{margin-right:18px;}#navsubmenus{display:none;width:100px !important;top:44px;left:461px;}#navsubmenus a{display:block;height:21px;line-height:21px;padding:0.2em 0 0.2em 1.5em;padding-left:20px;text-decoration:none;color:#333;}#navsubmenus a:hover{background:#eee}.entry-body{font-size:16px !important;}.entry-body p{line-height:2 !important;}#top-bar{display:none;}#showTop{height:25px;line-height:25px;border-left:3px solid #fff;margin-top:0.6em;padding-left:13px;color:#000;cursor:pointer;position:relative;}#showTop:hover{background:#eee;}";
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node);
		}
	}
//移动订阅按钮的位置
	var subbutton = document.getElementById('lhn-add-subscription-section'),
		searcharea = document.getElementById('search');
	searcharea.appendChild(subbutton);
	subbutton.className = 'goog-inline-block';
//修正搜索按钮的位置
	subbutton.previousSibling.style.position = 'absolute';
	subbutton.previousSibling.style.top = '15px';
//添加显示顶部的按钮
	var showTop = document.createElement('div');
	showTop.id = 'showTop';
	showTop.innerHTML = '显示顶部';
	document.getElementById('home-section').parentNode.insertBefore(showTop, document.getElementById('home-section'));
	document.getElementById('showTop').innerHTML = '显示顶部<b></b>';
//添加显示顶部的动作
	var showTopBool = false;
	document.getElementById('showTop').addEventListener('click', function(){
		if(!showTopBool){
			document.getElementById('top-bar').style.display = 'block';
			document.getElementById('gb').style.display = 'block';
			document.getElementById('showTop').innerHTML = '隐藏顶部';
			showTopBool = true;
		} else {
			document.getElementById('top-bar').style.display = 'none';
			document.getElementById('gb').style.display = 'none';
			document.getElementById('showTop').innerHTML = '显示顶部';
			showTopBool = false;
		}
	}, false);
})();
