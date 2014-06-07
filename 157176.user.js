// ==UserScript==
// @name        QQ微博 批量显示相册内容
// @version     1.2
// @namespace   display.all.image.t.qq.com
// @include     http://t.qq.com/app/qzphoto/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @author		塞北的雪(sbdx[at]lyg91.com)
// @CreateDate	2013-01-18 21:17
// @LastUpdate	2013-01-21 22:47
// ==/UserScript==
/*
访问页面变量需要使用unsafeWindow
*/

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

jQuery("body").append("<div id='tools_sbdx' style='position:absolute;right:10px;top:100px;'><button>获取当前相册所有图片</button></div>");

var postData = {
	filter: 4,
	mode: 1,
	page: 1,
	r: MI.random(),
	_r:MI.random(),
	time:MI.time,
	//r: parseInt((new Date).getTime()),
	u: void 0 !== MI.guest ? MI.guest.user : MI.user.account,
	//u: unsafeWindow.MI.guest.user,
	apiType: 8,
	apiHost: "http://api.t.qq.com"
};
function CreatePhotoListInNewWindow()
{
	displayURL=confirm("图片可能较多，如果全部显示可能会卡死！！！\n\n是否只显示连接？方便用软件批量下载。\n\n是 - 显示连接\t否- 显示图片");
	var newwin=unsafeWindow.open("","newwin");
	doc=newwin.document;
	doc.title=MI.guest.user+' 腾讯微博相册批量下载器';
	doc.write(MI.guest.user+" 相册<br>");
	SendAjax();
}
function SendAjax()
{
	unsafeWindow.MI.ajax({
		url: "http://api1.t.qq.com/asyn/index.php",
		type: "get",
		data: postData,
		success:processAjaxData
	});
}
//处理Ajax请求回来的数据
function processAjaxData(data)
{
	var LastPicID='';
	var LastTimeStamp='';
	//doc.write("postData:"+var_dump(postData)+"<br>\r\n");
	json=unsafeWindow.MI.json(data);
	for(i=0;i<json.info.talk.length;i++)
	{
		img=json.info.talk[i].image[0]+"/2000";
		if(displayURL)
		{
			doc.write(img + "<br>\r\n");
		}
		else
		{
			doc.write("<img src='" + img + "' /><br>\r\n");
		}
		LastPicID=json.info.talk[i].id;
		LastTimeStamp=json.info.talk[i].timestamp;
	}
	curPage++;
	//if(curPage>5)return;
	if(json.info.hasNext==1)
	{
		postData.page=curPage;
		postData.r=parseInt((new Date).getTime());
		postData._r=parseInt((new Date).getTime());
		postData.time=parseInt((new Date).getTime());
		//postData.time=MI.time;
		postData.id=LastPicID;
		postData.time=LastTimeStamp;
		window.setTimeout(SendAjax,500);
		doc.write("<hr>\r\n");
	}
}
jQuery(function(){
	jQuery("#tools_sbdx").live("click",CreatePhotoListInNewWindow);
	jQuery(window).scroll(function(){
		var intTop=jQuery(document).scrollTop()+100;
		jQuery("#tools_sbdx").offset({top:intTop});
	});
});
function var_dump(obj){
	if(typeof obj== "object")
	{
		var txt = '';
		for(key in obj)
		{
			txt +=key + '=' + obj[key] + ',';
		}
		return "Type: "+typeof(obj)+((obj.constructor) ? "\nConstructor: "+obj.constructor : "")+"\nValue: " + txt;
	}
	else
	{
		return "Type: "+typeof(obj)+"\nValue: "+obj;
	}
}