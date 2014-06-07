// ==UserScript==
// @name        书鹏自动下载
// @namespace   空
// @include     http://www.shupeng.com/book/*
// @version     1
// ==/UserScript==
var $, jQuery;
loading();

function loading()
{
    unsafeWindow.jQuery ? init() : setTimeout(loading, 100);

}

function init()
{
	$ = jQuery = unsafeWindow.jQuery;
	$(document).ready(function() {
	tags = document.getElementsByTagName("a");
	for(var i=0;i<tags.length;i++){
		var onclickvalue=tags[i].outerHTML;
		if(onclickvalue.indexOf("download-button")>0){
			window.open(tags[i].href,'_self') 
		}
	}
	});
}