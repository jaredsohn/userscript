// ==UserScript==
// @name        bili_fix_player
// @namespace   bili
// @description 修复B站播放器,黑科技,列表页、搜索页弹窗,破乐视限制,提供高清、低清晰源下载,弹幕下载
// @include     /^.*\.bilibili\.tv\/(video\/|search)?.*$/
// @include     /^.*bilibili\.kankanews\.com\/(video\/|search)?.*$/
// @version     3.5.1
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @author     绯色
// ==/UserScript==
/**
出现无法播放情况先关闭自动修复
2013-12-14修复B站播放器无法在火狐魔镜弹窗播放
2014-01-23替换优酷、爱奇艺、搜狐为B站播放器
2014-03-28增加下载视频按钮
2014-05-10收益于自己的B站追番计划(http://v.myacg.ga或者http://weiyun.jd-app.com)，代码逻辑重构(不再区分视频源再解析视频)，并重写UI
2014-05-10受诸多基佬要求，增加除首页外其他分类页面的弹窗播放(初衷是为了弹窗乐视源)
2014-05-11还是基佬要求，增加弹窗播放器分P效果，增加弹幕下载功能，在吧友大神田生的建议下，正则表达式加强匹配
2014-05-13增加搜索页面的弹窗播放，并且支持多P和显示当前P，增加模糊画质下载按钮
2014-05-14增加首页弹窗播放，基本实现全站可弹窗（首页新番专题列表除外等）
------------以下信息提供给开发者-----------
//https://static-s.bilibili.tv/play.swf---新版播放器
//http://static.hdslb.com/play.swf---旧版播放器
//https://static-s.bilibili.tv/play_old.swf---考古级别播放器
-------------------------------------------
*/
(function (){
//初始化 init
if (GM_getValue('auto') == undefined) GM_setValue('auto', 1);
if (GM_getValue('player_size') == undefined) GM_setValue('player_size', 1);
//初始化jquery支持
var $=unsafeWindow.$;
/**
-------------------------------用户界面GUI View-------------------------------------
*/
//函数，插入可视化操作视图
function insert_html(type) {
var auto= GM_getValue('auto') ? '已打开' : '已关闭';
var player_size= GM_getValue('player_size') ? '大型' : '小型';
var div  = '<a style="color:red">脚本(｀・ω・´)</a>\
							<ul class="i_num" id="bili_fix_script">\
								<li><a class="font">遇到播放错误请关闭自动修复后刷新页面</a><a target="_blank" href="bilili.ml/361.html">BUG反馈</a></li>\
								<li><a>本页视频源:<b style="color:#F489AD">' + type + '</b></a></li>\
								<li><a class="font">高清视频下载HD(右键复制以下视频分段下载链接，然后在新标签粘贴打开即可不被403)</a><div class="m_num" id="av_source">\
									</div></li>\
								<li><a class="font" target="_blank" id="aid_down_av">模糊画质视频下载(单文件)</a></li>\
								<li><a id="down_cid_xml" target="_blank">弹幕下载</a></li>\
								<li><a>自动修复(修改后请刷新页面):<a id="bili_fix" class="btn">' + auto + '</a></a></li>\
								<li><a class="font">播放器大小(小型在火狐弹窗无BUG):<a id="player_size" class="btn">' + player_size+ '</a></a></li>\
								<li><a id="bili_set_status">就绪中→_→</a></li>\
							</ul>\
							<span class="addnew_5">+10086</span>';
$('div.num:nth-child(4) > ul:nth-child(1) > li:nth-child(1)').html(div);
var css = '.btn{font-size: 12px;height: 25.6px;line-height: 25.6px;padding: 0px 2px;transition-property: #000, color;\
transition-duration: 0.3s;\
box-shadow: none;\
color: #FFF;\
text-shadow: none;\
border: medium none;\
background: none repeat scroll 0% 0% #00A1CB!important;}\
.btn.active{\
background: none repeat scroll 0% 0%  #F489AD!important;}\
.btn.notice{\
background-color:#A300C0!important;}\
.font{\
font-size:11px!important;}\
';
	GM_addStyle(css);

	//监听修复按钮
	var btn = document.querySelector("#bili_fix");
	btn.addEventListener("click", set_auto, false); 
	//监听播放器大小按钮
	var btn = document.querySelector("#player_size");
	btn.addEventListener("click", set_player, false); 
}

//函数，插入下载按钮
function insert_download_button(url, count) {
	$('#av_source').append('<a href="' + url + '" target="blank">分段【' + count + '】</a>');
}

//设置参数
//修复按钮事件
function set_auto() {
	GM_getValue('auto') ? GM_setValue('auto', 0) : GM_setValue('auto', 1);
	var s = GM_getValue('auto') ? '已打开' : '已关闭';
	document.getElementById('bili_fix').innerHTML = s;
	$("#bili_fix").toggleClass("active");
	$('#bili_set_status').html('<a class="btn notice font">已更改,刷新生效_(:3」∠)_</a>');
}
//播放器大小按钮事件
function set_player() {
	GM_getValue('player_size') ? GM_setValue('player_size', 0) : GM_setValue('player_size', 1);
	var s = GM_getValue('player_size') ? '大型' : '小型';
	document.getElementById('player_size').innerHTML = s;
	$("#player_size").toggleClass("active");
	$('#bili_set_status').html('<a class="btn active font">已更改,刷新生效_(:3」∠)_</a>');
}

/**
-------------------------------函数 Model-------------------------------------
*/
//函数，替换播放器
function Replace_player(aid, cid) {
	if (GM_getValue('auto') == '1') {
	if (GM_getValue('player_size') == '1') {
		document.getElementById('bofqi').innerHTML = '<iframe class="player" src="https://secure.bilibili.tv/secure,cid='+cid+'&amp;aid='+aid+'" scrolling="no" border="0" framespacing="0" onload="window.securePlayerFrameLoaded=true" frameborder="no" height="482" width="950"></iframe> ';
		}else{
		document.getElementById('bofqi').outerHTML = '<embed id="bofqi_embed" class="player" allowfullscreeninteractive="true" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" allowscriptaccess="always" rel="noreferrer" flashvars="cid=' + cid + '&amp;aid=' + aid + '" src="http://static.hdslb.com/play.swf" type="application/x-shockwave-flash" allowfullscreen="true" quality="high" wmode="window" height="482" width="950">';
		}
	}
}
//api获取cid
function api_get_cid(aid,page) {
	var url = 'http://api.bilibili.tv/view?type=json&appkey=0a99fa1d87fdd38c&batch=1&id=' + aid;
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		synchronous: false,
		onload: function(responseDetails) {
			if (responseDetails.status == 200) {
				var Content = eval('(' + responseDetails.responseText + ')');
				var list = Content.list;
				var p=page-1;
				if(list!=undefined){
				var lp=(list[p]==undefined)?list[0]:list[p];//针对某些aid只有一个cid但是有分P的情况
				//console.log(lp);
				var cid=lp.cid;
				var type=lp.type;
				insert_html(type); //UI
				var cid_xml_url='http://comment.bilibili.tv/'+cid+'.xml';
				$('#down_cid_xml').attr('href',cid_xml_url);//弹幕下载
				Replace_player(aid, cid);//替换播放器 
				cid_get_videodown_hd(cid);//获取高清下载链接
				aid_down_av(aid,page);//av画质下载（单文件）
				}else{
				window_player_init();//执行弹窗函数
				}
			}
		}
	});
}
//在新番页面，通过弹窗，获取aid,cid然后进行播放
function aid_build_player(aid) {
	var url = 'http://api.bilibili.tv/view?type=json&appkey=0a99fa1d87fdd38c&batch=1&id=' + aid;
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		synchronous: false,
		onload: function(responseDetails) {
			if (responseDetails.status == 200) {
				var Content = eval('(' + responseDetails.responseText + ')');
				var list = Content.list;
				//默认播放第一个分P-------------------
				var p=0;
				var lp=(list[p]==undefined)?list[0]:list[p];
				//console.log(lp);
				var cid=lp.cid;
				$('#player_content').html(window_player(aid,cid));
				//分P列表和播放器------------------------------
				for(var i in list){
				//console.log(list[i]);
				var cid=list[i].cid;
				var p=parseInt(i)+1;
				$('#window_play_list').append('<li class="single_play_list" data-field="aid='+aid+'&cid='+cid+'"><a  href="javascript:void(0);" style="color:#00A6D8;" >'+p+'P</a></li>');
				}
				//弹窗的分P播放
				$('.single_play_list').click(
				function (){
				$('#window_play_info').html('正在播放第'+$(this).find('a').html());
				//console.log(i);
				var info=$(this).attr('data-field');
				var pattern=/aid=(\d+)&cid=(\d+)/ig;
				var val=pattern.exec(info);
				var aid=val===null?'':val[1];
				var cid=val===null?'':val[2]; 
				// console.log(aid,cid);				
				$('#player_content').html(window_player(aid,cid));
				});
				var css='#av_player li{\
				float: left;\
				position: relative;\
				width: 5em;\
				border: 1px solid #B0C4DE;\
				font: 80% Verdana, Geneva, Arial, Helvetica, sans-serif;\
				}';
				GM_addStyle(css);
			}
		}
	});
}
//弹窗播放器
function window_player(aid,cid){
	return '<embed id="bofqi_embed" class="player" allowfullscreeninteractive="true" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" allowscriptaccess="always" rel="noreferrer" flashvars="cid='+cid+'&amp;aid='+aid+'" src="http://static.hdslb.com/play.swf" type="application/x-shockwave-flash" allowfullscreen="true" quality="high" wmode="window" height="482" width="950">';
}
//cid获取高清视频链接
function cid_get_videodown_hd(cid) {
	var url = 'http://interface.bilibili.cn/playurl?appkey=0a99fa1d87fdd38c&platform=android&quality=2&cid=' + cid;
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		synchronous: false,
		onload: function(responseDetails) {
			if (responseDetails.status == 200) {
				var pattern = /<\/(?:(?:chunk)?size|length)>[\s\n]*?<url><\!\[CDATA\[(.*?)\]\]><\/url>/ig;
				var c = 1;
				//console.log(responseDetails.responseText);
				while (content=pattern.exec(responseDetails.responseText)) {
					//var content = pattern.exec(responseDetails.responseText);
					var url = content ? (content[1]) : 'http://interface.bilibili.cn/playurl?appkey=0a99fa1d87fdd38c&platform=android&quality=2&cid=' + cid;
					insert_download_button(url, c);
					c++;
				} 
			}
		}
	});
}
//低画质视频下载（单文件）
function aid_down_av(aid,page){
	var url = 'http://www.bilibili.tv/m/html5?aid=' + aid+'&page='+page;
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		synchronous: false,
		onload: function(responseDetails) {
			if (responseDetails.status == 200) {
				var Content = eval('(' + responseDetails.responseText + ')');
				var downlink=Content.src;
				$('#aid_down_av').attr('href',downlink);				
			}
		}
	});
}

/**
-------------------------------控制 Control-------------------------------------
*/
function window_player_init(){
//弹窗------------------------------
//新番列表弹窗UI
$('.vd_list .title').each(
function(){
var href=$(this).attr('href');
var pattern=/\/video\/av(\d+)\//ig;
var content= pattern.exec(href);
var aid = content ? (content[1]):'';
var url='http://static.hdslb.com/miniloader.swf?aid='+aid+'&page=1';
$(this).prepend('<a class="single_player" href="javascript:void(0);" style="color:red;" data-field="'+aid+'">弹▶</a>');
//console.log($(this).parent());
});
//侧栏列表弹窗UI
$('.rlist li a').each(
function(){
var href=$(this).attr('href');
var pattern=/\/video\/av(\d+)\//ig;
var content= pattern.exec(href);
var aid = content ? (content[1]):'';
var url='http://static.hdslb.com/miniloader.swf?aid='+aid+'&page=1';
$(this).find('.title.t').prepend('<a class="single_player" href="javascript:void(0);" style="color:red;" data-field="'+aid+'">弹▶</a>');    
//console.log($(this).parent());
});
//搜索列表弹窗UI
$('.result li .r a').each(
function(){
var href=$(this).attr('href');
var pattern=/http:\/\/www\.bilibili\.tv\/video\/av(\d+)\//ig;
var content= pattern.exec(href);
var aid = content ? (content[1]):'';
if(aid!=''){
var url='http://static.hdslb.com/miniloader.swf?aid='+aid+'&page=1';
$(this).find('.t').prepend('<a class="single_player" href="javascript:void(0);" style="color:red;" data-field="'+aid+'">弹▶</a>');    
}
//console.log($(this).parent());
});
//带缩略图弹窗UI、和侧栏新投稿弹窗UI
$('.video li a,.z-r.new li a').each(
function(){
var href=$(this).attr('href');
var pattern=/\/video\/av(\d+)\//ig;
var content= pattern.exec(href);
var aid = content ? (content[1]):'';
var url='http://static.hdslb.com/miniloader.swf?aid='+aid+'&page=1';
$(this).find('.t').prepend('<a class="single_player" href="javascript:void(0);" style="color:red;" data-field="'+aid+'">弹▶</a>');
//console.log($(this).parent());
});
//首页的推荐栏弹窗
$('#suggest li a').each(
function(){
var href=$(this).attr('href');
var pattern=/\/video\/av(\d+)\//ig;
var content= pattern.exec(href);
var aid = content ? (content[1]):'';
var url='http://static.hdslb.com/miniloader.swf?aid='+aid+'&page=1';
$(this).find('.t').prepend('<a class="single_player" href="javascript:void(0);" style="color:red;" data-field="'+aid+'">弹▶</a>');
}); 
//弹窗默认的第一P，建立弹窗播放器并建立分P列表===click事件应该在each事件之后执行
$('.single_player').click(
function (){
$('#av_player').remove();//防止同时播放两个视频
var a='<div id="av_player" style="width: 950px;height: auto;display: block;top: 2%;left:16%;margin:0 auto;position:fixed;z-index:10000;background-color:white;border:2px solid RGB(181,182,183);"><p id="window_play_title">脚本(｀・ω・´)正在加载中</p><ul id="window_play_list"></ul><div id="player_content">脚本(｀・ω・´)播放器正在努力加载中....</div><p style="float:right"><a onclick="$(\'#av_player\').remove();" style="color:red">【关闭视频弹窗】</a></p></div>';
$('body').append(a);
var title=$(this).parent('.t').html()===null?$(this).parent('.title').html():$(this).parent('.t').html();
$('#window_play_title').html('<span style="color:orange;">'+title+'</span>>>>><span id="window_play_info" style="color:purple;">正在播放第1P</span><a onclick="$(\'#av_player\').remove();" style="color:red;float:right">【关闭视频弹窗】</a>');    
var aid=$(this).attr('data-field');
setTimeout(function() {
aid_build_player(aid);},0);
});
}
//END弹窗------------------------------

//替换播放器----------------------------
//取出aid和分P
var url = document.location.href;
var aid_reg = /\/av(\d+)\/(?:index_(\d+)\.html)?/ig;
var aid_array = aid_reg.exec(url); 

var aid=aid_array===null?'':aid_array[1];//aid
var page=aid_array===null?'1':typeof(aid_array[2])=='undefined'?'1':aid_array[2];//分p

//播放器的html
var content;//本脚本使用了很多content变量，其中cid_get_videodown函数的while循环content变量全局，如果此处未定义content，火狐会报权限问题
api_get_cid(aid,page);//按照aid和分p获取cid并且替换播放器
})();