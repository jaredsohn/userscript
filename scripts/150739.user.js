// ==UserScript==
// @name        新浪微博 批量显示相册内容
// @namespace   display.large.image.photo.weibo.com
// @include     http://photo.weibo.com/*/albums/detail/album_id*
// @include     http://photo.weibo.com/*/talbum/*
// @exclude		http://photo.weibo.com/*/photos/detail/photo_id/*
// @version     1.2.2
// @require     http://code.jquery.com/jquery-1.8.3.min.js
// @author		塞北的雪(sbdx[at]qq.com)
// @date		2014/4/18 9:52
// @grant		none
/*
@echo off
Rem wget批量下载并且重命名 批处理文件
setlocal enabledelayedexpansion
set /a num=0
FOR /F %%i in (URL.txt) do (
 set /a num+=1
 title !num!
 wget -c -q %%i -O !num!.jpg
)
*/ 
// ==/UserScript==

var MAX_PIC_IN_PAGE=30;//超过则显示连接提示
var MAX_PIC_PER_REQ=30;//每次AJAX请求图片的数量,目前只能设定为30
var TOTAL_PICS=$GLOBAL_DETAIL.album_info.count.photos;//图片总数
$("body").append("<div id='tools_sbdx' style='position:absolute;right:10px;top:100px;'><button>获取当前相册所有图片</button></div>");
function CreatePhotoListInNewWindow(){
	
	var displayURL=false;
	if($GLOBAL_DETAIL.album_info.count.photos>MAX_PIC_IN_PAGE)
	{
		displayURL=confirm("图片大于"+MAX_PIC_IN_PAGE+"张，全部显示可能会卡死！！！\n\n是否只显示连接？方便用软件批量下载。");
	}
	var newwin=window.open("","newwin");
	var doc=newwin.document;
	doc.title='新浪微博相册照片批量下载器';
	doc.body.innerHTML="照片总数:"+TOTAL_PICS+"<br>\n";
    var num=1;
	var str='';
	id_length=TOTAL_PICS.toString().length;//图片总数的长度
	for(i=1;i<=Math.ceil($GLOBAL_DETAIL.album_info.count.photos/MAX_PIC_PER_REQ);i++)
	{
		var page=i;
		var picURL="http://photo.weibo.com/photos/get_all?uid=" + $GLOBAL_INFO.owner_uid + "&album_id=" + $GLOBAL_DETAIL.page_album_id + "&count="+MAX_PIC_PER_REQ+"&page=" + page + "&type=" + $GLOBAL_DETAIL.type;
		$.ajaxSetup({async:false});//阻塞调用
		$.get(picURL,
			function(data){
				str='';
				$.each(data.data.photo_list,function(i,item){
					picurl=item.pic_host+"/large/"+item.pic_name;
					/*
					//disable func
					id='00000000000000'+num;//图片编号，用0填充
					id=id.substr(-1*id_length);
					*/
					if(!displayURL)
					{
						str += '<a target="_blank" href="'+picurl+'"><img border="0" src="'+picurl+'" /></a><br><br>\n';
					}
					else
					{
						str +='<a target="_blank" href="'+picurl+'">'+picurl+'</a><br>\n';
					}
					num++;
				});
				doc.body.innerHTML += str;
			}
		);
	}
}
$(function(){
	$("#tools_sbdx").live("click",CreatePhotoListInNewWindow);
	$(window).scroll(function(){
		$("#tools_sbdx").offset({top:$(document).scrollTop()+100});
	});
});