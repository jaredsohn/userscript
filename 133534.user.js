// ==UserScript==
// @name          Tianya Reader
// @description	  Override Tianya Baibaoxiang, read, highlight by certain author
// @homepage	  http://hi.baidu.com/ymerlin
// @author        yMerlin
// @include       http://www.tianya.cn/publicforum/content/*
// @include       http://www.tianya.cn/pub/c/*
// @include       http://www.tianya.cn/new/Publicforum/*
// @include       http://bbs.city.tianya.cn/tianyacity/Content/*
// @include       http://www.tianya.cn/techforum/content/*
// ==/UserScript==
// Licence: GPL
// June 1, 2009
// June 2, 2009
// June 4, 2009
// Feb 5, 2011

// rewrite the script, and hide some ads - 2011-02-05
var doc = document;

var topPage = doc.getElementById('pageDivTop');
if (topPage) {
	var topPage_c = topPage.cloneNode(true);
	topPage_c.setAttribute("id", 'TopClone');
	topPage.parentNode.insertBefore(topPage_c, topPage);
	topPage.style.display = "none";
}

var bottomPage = doc.getElementById('pageDivBottom');
if (bottomPage) {
	var bottomPage_c = bottomPage.cloneNode(true);
	bottomPage_c.setAttribute("id", 'bottomClone');
	bottomPage.parentNode.insertBefore(bottomPage_c, bottomPage);
	bottomPage.style.display = "none";
}

// replace links 
var lzonly = doc.getElementById("__ty_vip_1");
var span_child = lzonly.parentNode.childNodes;
for (var i=0; i<span_child.length; i++) {
	if (span_child[i].tagName == "A") {
		switch (span_child[i].innerHTML) {
			case '只看楼主':
				span_child[i].setAttribute("onclick","javascript:V.lookByAuthor(V.author); void 0;");
				break;
			case '高亮楼主':
				span_child[i].setAttribute("onclick","javascript:V.redByAuthor(V.author); void 0;");
				break;
			case '只看某人回复':
				span_child[i].setAttribute("onclick","javascript:void(f=prompt('which pig?','')); V.lookByAuthor( f ); void 0;");
				break;
			case '关注此帖':
				span_child[i].innerHTML = '返回';
				span_child[i].setAttribute("onclick","javascript:V.lookByAuthorBack(); void 0;");
				break;
			case '免费试用百宝箱':
				span_child[i].setAttribute("href","javascript:void(4)");
				span_child[i].setAttribute("onclick","javascript:alert('you are using it now!'); void 0;");
				break;
		}
	}
}
// hide some ads 
var ad_hide = doc.getElementById("tianyaBrandSpan1");
if (ad_hide) {ad_hide.style.display = "none";}
ad_hide = doc.getElementById("couplet_right_NULL");
if (ad_hide) {ad_hide.style.display = "none";}
ad_hide = doc.getElementById("couplet_left_NULL");
if (ad_hide) {ad_hide.style.display = "none";}
ad_hide = doc.getElementById("adsp_content_top_banner");
if (ad_hide) {ad_hide.style.display = "none";}
