// ==UserScript==
// @name           Shooter Sub Dowload Auto
// @namespace      http://pto2k.blogspot.com
// @description    射手网字幕增强型直接下载
// @include        http://www.shooter.cn/*
// @include        http://shooter.cn/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @require        http://ui.jquery.com//ui/ui.core.js
// ==/UserScript==

function logToConsole(log){
    if(unsafeWindow.console){
       unsafeWindow.console.log(log);
    }else{
    GM_log(log);
    }
}
$('.introtitle').each(function(){
	$(this).after('   <a class=realDirect title='+$(this).attr('href')+'>[直接下载]</a>')
	})
$('.realDirect').css({'cursor':'pointer'}).bind('click',function(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.shooter.cn'+$(this).attr('title'),
		onload: function(responseDetails) {
			text = responseDetails.responseText
			fileId = text.substring(text.indexOf('<fileinfo><id>')+14,text.indexOf('</id><filename>'))
			logToConsole(fileId)
			$('body').append("<div id=iframediv class=centeriframe style='width: 75%; height: 80%; position:fixed;top: 50px; left: 54px; z-index: 0; cursor: auto;'><iframe class=centeriframe id=subiframe src='http://www.shooter.cn/xml/file/"+fileId.substring(0,fileId.length-3)+"/"+fileId+".xml?shrink=1'></iframe></div>")
		},
//  		onreadystatechange: function(responseDetails){
//  		}
	});
})
$('body').live('dblclick',function(){
	$('#iframediv').remove()
})
unsafeWindow.getdownlink()
setTimeout(function(){
	GM_openInTab($("a[target]:contains('传统下载')").attr('href'))
	},2345)