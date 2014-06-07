// ==UserScript==
// @name           viidii2Original
// @namespace      viidii2Original
// @description    自动转换 Viidii 跳转地址为原始地址
// @include        http://www.viidii.com/*
// ==/UserScript==

window.location.href = this.location.href.replace("http://www.viidii.com/?","").replace(/______/g,".").replace("&z","");