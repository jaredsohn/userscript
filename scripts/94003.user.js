// ==UserScript==
// @name	Mobile01+
// @version	1.1
// @description	Mobile01 自動轉址、載入圖片及影片框架
// @author	Sofroumi
// @namespace	http://userscripts.org/scripts/show/94003
// @homepage	http://userscripts.org/scripts/show/94003
// @downloadURL	https://userscripts.org/scripts/source/94003.user.js
// @updateURL	https://userscripts.org/scripts/source/94003.meta.js
// @include	http://5i01.com/*
// @include	http://www.mobile01.com/*
// @include	https://www.mobile01.com/*
// @match	http://5i01.com/*
// @match	http://www.mobile01.com/*
// @match	https://www.mobile01.com/*
// @icon	data:image/gif;base64,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
// ==/UserScript==

var Domain_Redirect = '0';		// 網域自動轉址 [0,1]
var Newsdetail_Redirect = '1';		// 本站新聞自動轉址 [0,1]
var Print_Redirect = '0';		// 友善列印自動轉址 [0,1]
var Load_Image = '1';			// 自動載入圖片 [0,1]
var Small_Image = '0';			// 優先載入小圖 [0,1] (需開啟 Load_Image)
var Load_Video = '1';			// 自動載入影片框架 [0,1] (若為 0 以下功能皆無作用)
var Video_Width = '480';		// 影片寬度 [200~738]
var Video_Height = '385';		// 影片高度 [200~738]
var Youtube_Iframe = '1';		// 包含 iframe 框架內 Youtube 影片 [0,1]
var Youtube_autohide = '2';		// Youtube 自動隱藏撥放器介面 [0,1,2]
var Youtube_autoplay = '0';		// Youtube 自動撥放 [0,1]
var Youtube_fs = '1';			// Youtube 全螢幕撥放 [0,1]
var Youtube_rel = '1';			// Youtube 顯示相關的影片 [0,1]
var Youtube_showinfo = '1';		// Youtube 顯示影片資訊 [0,1]
var Youtube_HTML5 = '0';		// Youtube HTML5 [0,1]
var Remove_Video_Text = '1';		// 移除 "按這裡在新視窗中開啟影片" 文字 [0,1]

if (Domain_Redirect == '1' && window.location.hostname == '5i01.com') {
	var URL = window.location.href.replace('5i01.com' , 'www.mobile01.com');
	window.location.replace(URL);
	}

if (Newsdetail_Redirect == '1' && /newsdetail\.php/.test(window.location.href)) {
	A_Tag = document.getElementsByTagName('a');
	for (var i = 0 ; A_Tag.length > i ; i++) {
		if (A_Tag[i].innerHTML == '相關討論') {
			window.location.replace(A_Tag[i].href);
			}
		}
	}

if (Print_Redirect == '1') {
	if (/print\.php/.test(window.location.href)) {
		var URL = window.location.href.replace('print.php' , 'topicdetail.php');
		window.location.replace(URL);
		}
	A_Tag = document.getElementsByTagName('a');
	for (var i = 0 ; A_Tag.length > i ; i++) {
		if (A_Tag[i].innerHTML == '友善列印') {
			A_Tag[i].parentNode.removeChild(A_Tag[i]);
			}
		}
	}

if (Load_Image == '1') {
	A_Tag = document.getElementsByName('attachimg');
	while (A_Tag.length > 0) {
		if (window.location.hostname == '5i01.com' || Small_Image == '1') {
			Img_Tag = document.createElement('img');
			Img_Tag.setAttribute('src' , 'http://5i01.com/genimage.php?url=http://attach.mobile01.com/attach/' + A_Tag[0].id);
			Img_Tag.setAttribute('border' , '0');
			if (window.location.hostname == '5i01.com') {
				Img_Tag.setAttribute('onclick' , 'window.open("http://attach.mobile01.com/attach/' + A_Tag[0].id + '")');
				}
			else {
				Img_Tag.setAttribute('name' , A_Tag[0].href);
				Img_Tag.setAttribute('onclick' , 'this.src=this.name , this.title="" , this.style.cursor=""');
				}
			Img_Tag.setAttribute('title' , '按這裡看大圖');
			Img_Tag.setAttribute('style' , 'cursor: pointer');
			}
		else {
			Img_Tag = document.createElement('img');
			Img_Tag.setAttribute('src' , 'http://attach.mobile01.com/attach/' + A_Tag[0].id);
			Img_Tag.setAttribute('border' , '0');
			}
		A_Tag[0].parentNode.replaceChild(Img_Tag , A_Tag[0]);
		}
	A_Tag = document.getElementsByName('waypointimg');
	while (A_Tag.length > 0) {
		if (window.location.hostname == '5i01.com' || Small_Image == '1') {
			Img_Tag = document.createElement('img');
			Img_Tag.setAttribute('src' , 'http://5i01.com/genimage.php?url=http://attach.mobile01.com/waypoint/' + A_Tag[0].id);
			Img_Tag.setAttribute('border' , '0');
			if (window.location.hostname == 'www.mobile01.com') {
				Img_Tag.setAttribute('name' , A_Tag[0].href);
				Img_Tag.setAttribute('onclick' , 'this.src=this.name , this.title="" , this.style.cursor=""');
				}
			else {
				Img_Tag.setAttribute('onclick' , 'window.open("http://attach.mobile01.com/waypoint/' + A_Tag[0].id + '")');
				}
			Img_Tag.setAttribute('title' , '按這裡看大圖');
			Img_Tag.setAttribute('style' , 'cursor: pointer');
			}
		else {
			Img_Tag = document.createElement('img');
			Img_Tag.setAttribute('src' , 'http://attach.mobile01.com/waypoint/' + A_Tag[0].id);
			Img_Tag.setAttribute('border' , '0');
			}
		A_Tag[0].parentNode.replaceChild(Img_Tag , A_Tag[0]);
		}
	A_Tag = document.getElementsByTagName('a');
	for (var i = 0 ; A_Tag.length > i ; i++) {
		if (A_Tag[i].innerHTML == '載入圖片') {
			if (A_Tag[i].previousSibling != null && /»/.test(A_Tag[i].previousSibling.nodeValue)) {
				A_Tag[i].parentNode.removeChild(A_Tag[i].previousSibling);
				}
			if (A_Tag[i].nextSibling != null && /\s\|?\s/.test(A_Tag[i].nextSibling.nodeValue)) {
				A_Tag[i].parentNode.removeChild(A_Tag[i].nextSibling);
				}
			A_Tag[i].parentNode.removeChild(A_Tag[i]);
			i--;
			}
		}
	}

if (Load_Video == '1') {
	Video_Width = Number(Video_Width);
	Video_Height = Number(Video_Height);
	if (Video_Width < 200 || Video_Width > 738 || Video_Height < 200 || Video_Height > 738) {
		Video_Width = '200';
		Video_Height = '200';
		}
	A_Tag = document.getElementsByName('video');
	while (A_Tag.length > 0) {
		Embed_Tag = document.createElement('embed');
		Embed_Tag.setAttribute('src' , A_Tag[0].id);
		Embed_Tag.setAttribute('name' , 'Custom_Video');
		Embed_Tag.setAttribute('width' , '480');
		Embed_Tag.setAttribute('height' , '405');
		Embed_Tag.setAttribute('autostart' , 'false');
		A_Tag[0].parentNode.replaceChild(Embed_Tag , A_Tag[0]);
		}
	var YouTube_URL_Type = /youtu\.?be.*?[&\/\?=]([\w-]{11})(?=[#&\?]|$)/i;
	if (Youtube_Iframe == '1') {
		Iframe_Tag = document.getElementsByTagName('iframe');
		for (var i = 0 ; Iframe_Tag.length > i ; i++) {
			if (YouTube_URL_Type.test(Iframe_Tag[i].src)) {
				Span_Tag = document.createElement('span');
				A1_Tag = document.createElement('a');
				A1_Tag.setAttribute('href' , '#');
				A1_Tag.setAttribute('name' , 'externalvideo');
				A1_Tag.setAttribute('id' , Iframe_Tag[i].src);
				A1_Tag.setAttribute('target' , '_blank');
				A1_Tag.setAttribute('onClick' , 'return LoadExternalVideo(this.id);');
				Img_Tag = document.createElement('img');
				Img_Tag.setAttribute('src' , 'http://attach2.mobile01.com/image/showvideo.gif');
				Img_Tag.setAttribute('onload' , 'checkimagesize(this.id,this.width,this.height)');
				A1_Tag.appendChild(Img_Tag);
				A1_Tag.appendChild(document.createTextNode('按這裡檢視外部影片'));
				Span_Tag.appendChild(A1_Tag);
				Span_Tag.appendChild(document.createTextNode(' ('));
				A2_Tag = document.createElement('a');
				A2_Tag.setAttribute('href' , Iframe_Tag[i].src);
				A2_Tag.setAttribute('target' , '_blank');
				A2_Tag.appendChild(document.createTextNode('按這裡在新視窗中開啟影片'));
				Span_Tag.appendChild(A2_Tag);
				Span_Tag.appendChild(document.createTextNode(')'));
				Iframe_Tag[i].parentNode.replaceChild(Span_Tag , Iframe_Tag[i]);
				i--;
				}
			}
		}
	A_Tag = document.getElementsByName('externalvideo');
	while (A_Tag.length > 0) {
		var URL = A_Tag[0].id;
		var Video_Tag = 'embed';
		if (YouTube_URL_Type.test(URL)) {
			URL = 'http://www.youtube.com/embed/' + RegExp.$1;
			Video_Tag = 'iframe';
			if (Youtube_autohide == '0' || Youtube_autohide == '1') {
				URL = URL + '&autohide=' + Youtube_autohide;
				}
			if (Youtube_autoplay == '1') {
				URL = URL + '&autoplay=1';
				}
			if (Youtube_fs == '0') {
				URL = URL + '&fs=0';
				}
			if (Youtube_rel == '0') {
				URL = URL + '&rel=0';
				}
			if (Youtube_showinfo == '0') {
				URL = URL + '&showinfo=0';
				}
			if (Youtube_HTML5 == '1') {
				URL = URL + '&html5=1';
				}
			URL = URL.replace('&' , '?');
			}
		Embed_Tag = document.createElement(Video_Tag);
		switch (Video_Tag) {
			case 'embed':
				Embed_Tag.setAttribute('border' , '0');
				Embed_Tag.setAttribute('type', 'application/x-shockwave-flash');
				break;
			case 'iframe':
				Embed_Tag.setAttribute('frameborder', '0');
				break;
			}
		Embed_Tag.setAttribute('name' , 'Custom_Video');
		Embed_Tag.setAttribute('allowfullscreen' , 'true');
		Embed_Tag.setAttribute('height' , Video_Height);
		Embed_Tag.setAttribute('width' , Video_Width);
		Embed_Tag.setAttribute('src' , URL);
		A_Tag[0].parentNode.replaceChild(Embed_Tag , A_Tag[0]);
		}
	}

if (Remove_Video_Text == '1' && Load_Video == '1') {
	Video_Tag = document.getElementsByName('Custom_Video');
	for (var i = 0 ; Video_Tag.length > i ; i++) {
		while (Video_Tag[i].nextSibling.nodeValue == ' (' || Video_Tag[i].nextSibling.nodeName == 'A') {
			Video_Tag[i].parentNode.removeChild(Video_Tag[i].nextSibling);
			}
		if (/\).*/.test(Video_Tag[i].nextSibling.nodeValue)) {
			Video_Tag[i].nextSibling.replaceData(0 , 1 , '');
			}
		}
	}
