// ==UserScript==
// @name           adf.ly Skipper without waiting
// @description    Made by aditmeong
// @version        Open Beta 0.2
// @include        http://adf.ly/*
// @include        http://9.bb/*
// @include        http://u.bb/*
// @date           09/06/2011
// ==/UserScript==


function tag(n){
	return document.getElementsByTagName(n);
}

(function(){
	if(document.getElementById("rf") && tag("iframe")[1]){
		url=tag("iframe")[1].src;
	}
/* 	if(tag("script")[5]){
		url=tag('script')[5].innerHTML.split("$(\"#skip_button\").attr(\"href\", '");
		if(url){url=url[1].split("');")[0];}
	} */
	if(tag("script")[0]){
		url=tag("script")[0].innerHTML.split("var url = '")[1].split("';")[0];
	}
	if(url){
		location.href = url;
	}
})();