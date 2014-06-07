// ==UserScript==
// @name           twitterbar
// @namespace      http://userscripts.org/users/wenbob
// @description    twitter aside
// @include        http://t.163.com/*
// ==/UserScript==

/* 
注意： 
	1、本脚本只能用于在 网易微博 t.163.com 网站的右侧，显示指定的推特列表的时间线，不涉及密码验证、私有权限等。此推特列表必须开放的。
	2、如果需要显示某个推特用户自己的时间线，请先创建列表，把你感兴趣的推号加入此列表，然后再修改设置。
	3、可修改的参数有三个：
		account：推特账号，不要加@
		list：列表名
		interval：自动刷新的时间间隔
	4、示例。如果想显示 @wenbob 的列表 default ，那么应该设置
			var account = "wenbob";
			var list = 'default';
		另一个例子，@kcome/xxx (http://twitter.com/kcome/xxx) ：
			var account = "kcome";
			var list = 'xxx';				
*/
var account = "wenbob";
var list = 'default';
var interval = 600000; 

// https://api.twitter.com/1/wenbob/lists/default/statuses.xml
// http://twiterlist2rss.appspot.com/wenbob/lists/default/statuses.rss
var twJs = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%27https%3A%2F%2Fapi.twitter.com%2F1%2F' + account + '%2Flists%2F' + list + '%2Fstatuses.xml%27%20and%20itemPath=%27statuses.status%27&format=json'

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') 
        window.setTimeout(GM_wait,100);
    else { 
        $ = unsafeWindow.jQuery.noConflict(true); 
        main(); 
    }
}
GM_wait();

function copyToEdit(item){
	alert(item.innerHTML);
	$('#sendinfo').val(item.innerHTML);	
}

var timeoutID;

// All your GM code must be inside this function
function main() {
	// setup our css
	$('.t-info, .mobile').css('width', '100%');
	$('.mobile-top, .mobile-bottom').css('background', 'none');
	$('.optionList').css('list-style', 'none').css('padding', '0').css('margin', '0').css('float', 'left');
	$('.optionList li').css('list-style', 'none outside none').css('clear', 'none').css('margin', '0')
		.css('width', '70px').css('float', 'left').css('text-indent', '0');
	$('.optionList li span').css('cursor', 'pointer');
	$('.optionList a').css('display', 'inline');
	$('.conL').css('border-right', '1px dashed #DCDDDD');
	$('.conR').css('background', 'none repeat scroll 0 0 #FFFFFF').css('margin', '0').width(418);
	$('.content').width(1000);

	$('div.status-update div.hd h2, div.private div.hd h2').replaceWith($('.optionList').html());
	$('div.status-update div.hd, div.private div.hd li').css('background-color', 'white')
	$('.optionList').replaceWith('');

	 // add twitter bar
    $('.optionBar').after('<span id="refreshTwitter">@' + account + '/' + list + ' [刷新]</span><ul class="twitterBar timeLine clearfix"></ul>');
    $('.twitterBar').css('margin', '0 8px');
    // set refresh event
    $('#refreshTwitter').click(function(){
	 	$.getJSON(twJs, function(data){
			//var twText = '<li><b>@' + account + ':</b></li>';
			var twText = '';
			//$.each(data.query.results.item, function(index, item){
				//twText += '<li>' + item.title + '</li>';
			$.each(data.query.results.status, function(index, item){
				var dt = new Date(item.created_at).toLocaleFormat('%Y-%m-%d %T');
				twText += '<li><span>' + item.user.screen_name + ' ' + 
					item.text.replace(/\bRT(\s|:)*@/gi, '♺@').replace(/\&gt;@/gi, '♺@').replace(/(http|https|ftp|ed2k|thunder)(:\/\/\S+)/gi, 
						'<a href="$1$2" title="$1$2" target="_blank" onmouseover="listPage.getLongUrl(this,this.href)" class="entry">$1$2</a>') + 
					'</span><br/>' + dt + ' 来自 ' + item.source + '</li>';
			});
			$('.twitterBar').html(twText);
		    $('.twitterBar li').css('padding', '0 0 8px');
			$('.twitterBar span').click(function(){
				 $('#sendinfo').val('♺@' + this.innerHTML.replace(/<[^>]+>/gi, '')).focus();
			});
		}, 'text/javascript');
		if (undefined !== timeoutID)
			clearTimeout(timeoutID);
		timeoutID = setTimeout(function(){
			$('#refreshTwitter').click();
		}, interval);
   }).click();
}