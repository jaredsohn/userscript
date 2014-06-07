// ==UserScript==
// @name           ablink
// @namespace      ablink
// @description    将acfun/bilibili视频说明中提到的sm/nm/av/ac号或者acfun页面地址转换成对应的链接
// @include        http://bilibili.tv/plus/*
// @include        http://bilibili.tv/video/*
// @include        http://www.bilibili.tv/plus/*
// @include        http://www.bilibili.tv/video/*
// @include        http://acfun.tv/v/ac*
// @include        http://www.acfun.tv/v/ac*
// @include        http://acfun.tv/html/*/*/*.html
// @include        http://www.acfun.tv/html/*/*/*.html
// @include        http://*.*.*.*/html/*/*/*.html
// @version        0.1.6
// ==/UserScript==

function ablink(){
try {

var intro;
var site,linkStyle="";
if(location.href.match("bilibili.tv/")) {
	site="bilibili";
	if(document.querySelector) {
		intro=document.querySelector(".intro");
	} else {
		var intro=document.getElementsByTagName("div");
		for (var i in intro) {
			if(intro[i].className=="intro") {
				intro=intro[i];
				break;
			}
		}
	}
} else if(location.href.match("/html/[a-z]{2,5}/[0-9]{8}/[0-9_]+\\.html|acfun\\.tv")) {
	site="acfun";
	intro=document.getElementsByTagName("embed");
	if(intro && intro[0]) {
		intro=intro[0];
		while(intro.tagName!="TABLE") {
			intro=intro.parentNode;
		}
		if(intro.nextElementSibling) {
			intro=intro.nextElementSibling;
		} else {
			intro=intro.nextSibling;	// IE
			linkStyle="text-decoration:underline";
		}
		intro=intro.getElementsByTagName("span")[0];
	}
}

if(intro) {
	var table=[
		["([sn]m[0-9]+)","http://www.nicovideo.jp/watch/$1","$1"],
		["(av[0-9]+)","http://bilibili.tv/video/$1","$1"],
		["(ac[0-9]+)","http://acfun.tv/v/$1","$1"],
		["(mylist/?)([0-9]+)","http://www.nicovideo.jp/mylist/$2","$1$2"],
		["(/?html/[a-z]{2,5}/[0-9]{8}/)([0-9]+)(.html)|(/?html/[a-z]{2,5}/[0-9]{8}/)([0-9]+)(_[0-9]+)\\b","http://acfun.tv/api/jump.php?type=acfun&id=$2.html","$1$2$3"]
	];
	var html=intro.innerHTML;
	for(var i=0;i<table.length;i++) {
		html=html.replace(new RegExp(table[i][0],"ig"),"<a class='ablink' href='"+table[i][1]+"' target='_blank' style='"+linkStyle+"'>"+table[i][2]+"</a>");
	}
	intro.innerHTML=html;
	if(site=="acfun" && !linkStyle) {
		var linkStyle=document.createElement("style");
		linkStyle.innerHTML="a.ablink{color:blue}a.ablink:hover{text-decoration:underline;color:red}";
		document.body.appendChild(linkStyle);
	}
}

}catch(err) {
//	alert(err.message);
}
};


if(window.opera) {
	document.addEventListener("DOMContentLoaded",ablink,false);
} else {
	ablink();
}

