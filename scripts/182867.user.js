// ==UserScript==
// @name       论坛最新帖
// @author	monsm
// @namespace  http://weibo.com/monsm
// @version    0.2
// @description  论坛点击最新永远获取最新，不是伪最新
// @include      http*://bbs*/*
// @include      http://*/forum.*
// @copyright  2013+, monsm
// ==/UserScript==
var i=0;
var getUrl = function(url) {
    i++;
	var false_reg = "filter=lastpost&orderby=lastpost";
	var true_reg = "filter=author&orderby=dateline"; 
    if(url.indexOf(false_reg)>0){
    if(i<2){
		url = url.replace(false_reg, 'filter=author&orderby=dateline');	
        return url;}
    }
	
};

var zoomed_url = getUrl(location.href);
if (zoomed_url) {
	location.href = zoomed_url;
}