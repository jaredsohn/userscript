// ==UserScript==
// @name Wikipedia图片解决方案
// @description 使用google的https图片代理显示Wikipedia被G℉W屏蔽的图片
// @namespace http://laobubu.net/lab/gms
// @include http://*.wikipedia.org/*
// @include http://*.wikimedia.org/*
// @match http://*.wikipedia.org/*
// @match http://*.wikimedia.org/*
// @source http://laobubu.net/lab/gms
// @author laobubu
// @version 1.0.0
// @date 2011-02-24
// ==/UserScript==

prefix = "https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?url=";
suffix = "&container=focus&gadget=a&no_expand=1&resize_h=0&rewriteMime=image%2F*";
u1 = location.href;

function LFE(id) {
	return document.getElementById(id);
}
function LPIt() {
	var images = document.getElementsByTagName('img');
	for (var i=0;i<images.length;i++) {
		images[i].src = prefix + encodeURIComponent(images[i].src) + suffix;
	}
}

if (u1.indexOf('wikipedia.org')>1 | u1.indexOf('wikimedia.org')>1 ) { //Wikipedia
	LPIt();
	var ob1=LFE('p-logo').childNodes[0];
	var ob2 = ob1.style.backgroundImage.toString()+"URL";
	ob2 = ob2.substring(ob2.indexOf("(")+1,ob2.lastIndexOf(")"));
	ob1.style.backgroundImage = 'url(' + prefix + encodeURIComponent(ob2) + suffix + ')';
}