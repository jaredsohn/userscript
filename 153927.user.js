// ==UserScript==
// @name        LixianExporter
// @namespace   Honooon.LixianExporter
// @description QQ旋风、迅雷离线、QQ旋风分享导出Aria2
// @include     http://lixian.qq.com/main.html*
// @include     http://dynamic.cloud.vip.xunlei.com/user_task?*
// @include     http://61.147.76.6/iplay.html?*
// @include     http://222.141.53.5/iplay.html?*
// @include     http://fenxiang.qq.com/x/*
// @version     0.3
// @Author  	Honooon
// @Email 		honooon@gmail.com
// Special thanks: Binux <root@binux.me>  ThunderLixianExporter
// Special thanks: maplebeats <maplebeats@gmail.com>  web QQ旋风/xuanfeng
// Special thanks: chztv <0571chz@gmail.com>  QQFXExporter
// ==/UserScript==

var script = document.createElement('script');
script.id = "Honooon_script";
if (location.host == "fenxiang.qq.com") {
  script.src = "http://file.onbk.info/lixianjs/QQFXExporter.js";
//  script.src = "https://raw.github.com/chztv/QQFXExporter/master/QQFXExporter.js";
} else if (location.host == "lixian.qq.com") {
  script.src = "http://file.onbk.info/lixianjs/QQLixianExport.js";
//  script.src = "https://raw.github.com/ondh/LixianExporter/master/QQLixianExport.js";
} else if (location.host == "dynamic.cloud.vip.xunlei.com") {
  script.src = "http://file.onbk.info/lixianjs/ThunderLixianExporter.js";
//  script.src = "https://raw.github.com/binux/ThunderLixianExporter/master/ThunderLixianExporter.js";
} else {
  script.src = "http://file.onbk.info/lixianjs/master/vod_html5.js";
//  script.src = "https://raw.github.com/binux/ThunderLixianExporter/master/vod_html5.js";
}
document.body.appendChild(script);

