// ==UserScript==
// @name        网易图集采集
// @namespace   display.all.image.163.com
// @include     http://*.163.com/photoview/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @author		塞北的雪(sbdx[at]lyg91.com)
// @CreateDate	2013-06-04 14:52
// @LastUpdate	
// ==/UserScript==
var MI=unsafeWindow.MI;
var MAX_PIC_IN_PAGE=50;
var doc;
var curPage=1;
var displayURL=false;
if(!jQuery)
{
	if(typeof unsafeWindow.jQuery != 'undefined'){
	    jQuery = jQuery = unsafeWindow.jQuery;
	}else{
	    var script = document.createElement('script');
	    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
	    script.type = 'text/javascript';
	    script.sync = true;
	    document.getElementsByTagName('head')[0].appendChild(script);
	}
}
jQuery.noConflict();
jQuery(function(){
	jQuery("body").append("<div id='tools_sbdx' style='position:absolute;right:10px;top:100px;'><button>获取当前相册所有图片</button></div>");
	jQuery("#tools_sbdx").live("click",CreatePhotoListInNewWindow);
	jQuery(window).scroll(function(){
		var intTop=jQuery(document).scrollTop()+100;
		jQuery("#tools_sbdx").offset({top:intTop});
	});
});
function CreatePhotoListInNewWindow()
{
	jQuery("#tools_sbdx").attr("disable",true);
	var newwin=unsafeWindow.open('',new Date());
	doc=newwin.document;
	var arr=jQuery("textarea[name='gallery-data']").attr("value").replace('\n','');
	arr=jQuery.parseJSON(arr);
	doc.title=arr.info.setname;
	doc.writeln("<a href='"+location.href+"' target='_blank'><h2>"+arr.info.setname+"</h2></a>");
	for(i=0;i<arr.list.length;i++)
	{
		img=arr.list[i].img;
		doc.write("<img src='" + img + "' /><br>\r\n");
	}
}