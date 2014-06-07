// ==UserScript==
// @name        NoImageHost
// @namespace   Vietconnect
// @description	Removes garbage from some image hosting sites and displays the image only. Extend for Show Just Image 2
// @version     1.3.0
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js  
// @include		http://*.picbucks.com/url/*
// @include		http://adf.ly/(\d)*/

// @include		http://*imgchili.com/show/*
// @include		http://*imageporter.com/*.jpg.html
// @include		http://*p1c.in/pt/*
// @include		http://*imagekitty.com/*
// @include		http://*imagehyper.com/img.php*
// @include		http://*pixhub.eu/images/show/*
// @include		http://*imagecherry.com/*
// @include		http://*dippic.com/*
// @include		http://*picjav.net/*
// @include		http://*imagevenue.com/img.php?image=*
// @include		http://*imagetwist.com/*/*.html
// @include		http://*picbuck.us/viewer.php?file=*
// ==/UserScript==

var bySelector = function(selector, attr, addHostName) {
	var url = $(selector).attr(attr);
	
	if(url.indexOf("http://adf.ly/") >= 0) {
		url = url.substring(url.lastIndexOf("http://"), url.length);
	}
	if(addHostName == true) {
		url = "http://" + location.hostname + "/" + url;
	}
	location.href = url;
}

var byUrl = function(regexRemove, preInsert, postInsert) {
	var patt = new RegExp(regexRemove);
	var textvalue = patt.exec(location.href)[0];
	textvalue = location.href.replace(textvalue, "");
	if(preInsert != null){
		textvalue = preInsert + textvalue;
	}
	location.href = textvalue;
}

var domain = location.hostname.match('([^\.]+)\.(be|biz|ca|cc|com|de|dk|eu|gr|hu|in|info|it|me|ms|name|net|no|nu|org|pl|ro|ru|se|su|to|ua|us|ws|ly)$');
$('*').unbind();
if (domain) {
	switch (domain[0]) {
		case 'picbuck.us': bySelector("#page_body .text_align_center a", "href"); break;	
		case 'picbucks.com': byUrl("http://(.)*.picbucks.com/url/"); break;
		case 'adf.ly': byUrl("http://adf.ly/(\\d*)/", 'http://'); break;
		
		case 'imgchili.com': bySelector("#show_image", "src"); break;
		case 'imageporter.com': bySelector("a[href=javascript:bookilsfx()] img", "src"); break;
		case 'p1c.in': bySelector("a#fancybox", "href"); break;
		case 'imagekitty.com': bySelector(".fullscreen-host img.allow-fullscreen", "src"); break;
		case 'imagehyper.com': bySelector("img#mainimg", "src"); break;
		case 'pixhub.eu': bySelector(".image-show img", "src"); break;
		case 'imagecherry.com': bySelector("form[name=F1] img.pic", "src"); break;
		case 'dippic.com': bySelector(".view_box .my_img", "src"); break;
		case 'picjav.net': bySelector(".text_align_center a:nth-child(2)", "href"); break;
		case 'imagevenue.com': bySelector("img#thepic", "src", true); break;
		case 'imagetwist.com': bySelector(".pic", "src"); break;
	}
}
