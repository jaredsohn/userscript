// ==UserScript==
// @name           视频全屏播放
// @namespace      http://wagada.com
// @description    让所有页面支持视频全屏
// @include        *
// ==/UserScript==
var p=document.createElement("param");
p.name="allowFullScreen";
p.value="true";
document.getElementsByTagName("object").appendChild(p);