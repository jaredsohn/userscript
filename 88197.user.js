// ==UserScript==
// @name                Search Helper
// @description         给Google/Baidu/Bing添加搜索跳转功能
// @include             http://*google.com/search?*
// @include             http://*baidu.com/s?*
// @include             http://*.bing.com/search?q=*
// @include             http://*.wikipedia.org/w/index.php?*
// @version             0.1
// ==/UserScript==

/**
 * Author: LOO2K
 * URI: http://loo2k.com/search-helper
 */

function $$(w){
	return document.querySelectorAll(w);
}
function $(select){
	var name = select.substring(1);
	switch(select.charAt(0)){
		case '#':
			return document.getElementById(name);
		case '.':
			return document.getElementsByClassName(name);
		case '/':
			return document.getElementsByTagName(name);
		default:
			return document.getElementsByName(select);
	}
};
var newstuff = document.createElement('div');
var Google = /[^9]+\.google\.com$/i.test(location.hostname);
var Baidu = /[^9]+\.baidu\.com$/i.test(location.hostname);
var Bing = /[^9]+\.bing\.com$/i.test(location.hostname);
var Wiki = /[^9]+\.wikipedia\.org$/i.test(location.hostname);

if(self.location == top.location && Google){
	$("#res").insertBefore(newstuff,$("#topstuff"));
	var KeyWd = $("#tsf-oq").innerHTML;
	var keyword = encodeURIComponent(KeyWd);
	var str = "<b>Search</b>:";
	str += " <a target='_blank' href='http://www.baidu.com/s?ie=utf-8&wd="+ keyword +"'>Baidu</a> -";
	str += " <a target='_blank' href='http://cn.bing.com/search?q="+ keyword +"'>Bing</a> -";
	str += " <a target='_blank' href='http://zh.wikipedia.org/w/index.php?search="+ keyword +"'>WikiPedia</a>";
	newstuff.style.marginBottom="10px";
	newstuff.style.fontSize = "12px";
	newstuff.innerHTML = str;
} else if(self.location == top.location && Baidu){
	$("#wrapper").insertBefore(newstuff,$("#1"));
	var KeyWd = $("#kw").value;
	var keyword = encodeURIComponent(KeyWd);
	var str = "<b>Search</b>:";
	str += " <a target='_blank' href='http://www.google.com/search?&q="+ keyword +"'>Google</a> -";
	str += " <a target='_blank' href='http://cn.bing.com/search?q="+ keyword +"'>Bing</a> -";
	str += " <a target='_blank' href='http://zh.wikipedia.org/w/index.php?search="+ keyword +"'>WikiPedia</a>";
	newstuff.style.marginBottom="10px";
	newstuff.style.marginLeft="15px";
	newstuff.style.fontSize = "12px";
	newstuff.innerHTML = str;
} else if(self.location == top.location && Bing){
	$("#results_container").insertBefore(newstuff,$("#results"));
	var KeyWd = $("#sb_form_q").value;
	var keyword = encodeURIComponent(KeyWd);
	var str = "<b>Search</b>:";
	str += " <a target='_blank' href='http://www.google.com/search?&q="+ keyword +"'>Google</a> -";
	str += " <a target='_blank' href='http://www.baidu.com/s?ie=utf-8&wd="+ keyword +"'>Baidu</a> -";
	str += " <a target='_blank' href='http://zh.wikipedia.org/w/index.php?search="+ keyword +"'>WikiPedia</a>";
	newstuff.style.marginBottom="10px";
	newstuff.style.fontSize = "12px";
	newstuff.innerHTML = str;
} else if(self.location == top.location && Wiki){
	$("#bodyContent").insertBefore(newstuff,$("#search").nextSibling);
	var KeyWd = $("#searchText").value;
	var keyword = encodeURIComponent(KeyWd);
	var str = "<b>Search</b>:";
	str += " <a target='_blank' href='http://www.google.com/search?&q="+ keyword +"'>Google</a> -";
	str += " <a target='_blank' href='http://www.baidu.com/s?ie=utf-8&wd="+ keyword +"'>Baidu</a> -";
	str += " <a target='_blank' href='http://cn.bing.com/search?q="+ keyword +"'>Bing</a>";
	newstuff.style.margin="10px";
	newstuff.style.fontSize = "0.9em";
	newstuff.innerHTML = str;
}