// ==UserScript==
// @name           tieba_image_resize
// @description    百度贴吧大图还原
// @include        http://tieba.baidu.com/p/*
// @include        http://tieba.baidu.com/f?ct=*
// @include        http://tieba.baidu.com/f?kz=*
// @updateURL      https://userscripts.org/scripts/source/156463.meta.js
// @downloadURL    https://userscripts.org/scripts/source/156463.user.js
// @icon           http://tb.himg.baidu.com/sys/portraitn/item/4e2ed7f8bbb3d4f2c2d2bb21
// @author         congxz6688
// @version        2013.10.1.0
// ==/UserScript==

GM_addStyle(".myresized{max-width:100%;}");

for (var i = 0; i < document.images.length; i++) {
	var image = document.images[i];
	if (image.getAttribute("class") == "BDE_Image" && (image.width == "560" || image.getAttribute("changedsize") == "true" || image.getAttribute("pic_type") == "0")) {
		image.removeAttribute("changedsize");
		image.removeAttribute("pic_type");
		image.removeAttribute("height");
		image.removeAttribute("width");
		image.removeAttribute("class");
		image.setAttribute("class", "myresized");
		image.src = image.src.replace(/forum\/.*sign=.*?(?=\/[0-9a-z]{40})/, "forum/pic/item");
	}
}