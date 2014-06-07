// ==UserScript==
// @name           AcfunBackGround
// @description    Acfun背景图增强脚本
// @author         Yangff
// @include        http://www.acfun.tv/*
// @version        0.5
// ==/UserScript==
(function(){

//将数据读取自LocalStorage
function mimikoLoad(para){
	if(window.localStorage){
		var mimikoSaveData = localStorage.getItem('av.' + para);
		return mimikoSaveData;
	}else{
		return null;
	};
};

//将数据存储至LocalStorage
function mimikoSave(key, content){
	if(window.localStorage){
		localStorage.setItem('av.' + key, content);
	};
};
//将Json转化为字符串
function parseString(para){
	if(!JSON){
		
	};
	var mimikoString = JSON && typeof(para) != 'string' ? JSON.stringify(para) : para;
	return mimikoString;
};

//将一个字符串转换为Json
function parseJson(para){
	var mimikoJson = typeof(para) != 'object' ? $.parseJSON(para) : para;
	return mimikoJson;
};
var style='/*Yangff\'s EX FLAG*/\
body{ background-image: url(http://s.acfun.tv/h/Images/Upload/f5d15578-24f0-431b-ab61-97c969aa8abd.png); background-repeat: no-repeat; background-position: 0px 0px; background-attachment: fixed!important; background-size: cover; }\
#stage{ background-color: rgba(0, 0, 0, 0); }\
#header{ height: 128px; background: url() 0px 0px repeat-x; }\
#area-topic{ background-color: rgba(255, 255, 255, 0.9); border-radius: 15px 15px 0px 0px; }\
#list-topic-third{ width: 280px; height: 200px; margin-left: 20px; border-radius: 4px; overflow: hidden; background-color: rgba(0, 0, 0, 0); }\
#header{ border-bottom: 0px solid #ccc; }\
#mainer{ border-top: 0px solid #f9f9f9; }\
#ad-index{ display: none; }\
.tabbable{ background-color: rgba(0, 0, 0, 0); }\
#area-link{ opacity: 0.9; }\
.btn{ opacity: 0.9; }\
#info-public{ opacity: 0.9; }\
#area-player{ opacity: 0.9; border-radius: 8px 8px 8px 8px; padding: 10px; }\
#title-article{ background: none; }\
#btn-header-search{ opacity: 0.9; }\
#desc-article{ opacity: 0.9; }\
#area-comment{ opacity: 0.9; padding: 8px; }\
.xheLayout{ opacity: 0.9; }\
#input-header-search{ background-color: rgba(255, 255, 255, 0.9); }\
#area-index-bottom{ background-color: rgba(255, 255, 255, 0.9); }\
.banner:{ background-color: rgba(255, 255, 255, 0.9); }\
.page{ background-color: white; border-left: none; border-radius: 0px 0px 0px 0px; }\
#area-video-other{ background-color: white; opacity: 0.9; }\
.banner{ opacity: 0.9; }\
#area-mainer-left{ opacity: 0.9; }\
.item-video{ opacity: 0.9; }\
#info-search{ opacity: 0.9; }';
if (mimikoLoad("style")==null||mimikoLoad("style")=="")
{
	var popup=$("<div style='background:#ffffff;position: fixed;z-index:999'>");
	popup.html("您还没有设定自定义样式，<a id='install-style' href='javascript:void(0);'>点击使用</a>（由于程序没有Cookie权限所以请自行在<a href='http://www.acfun.tv/config.html#target=style'>这里</a>启用自定义样式！）启用后本提示条消失，关于增强脚本和CSS的更多信息请关注<a href='http://www.acfun.tv/v/ac339672'>这里</a>");
	
	popup.insertBefore("#stage");
	$("#install-style").bind("click",function(){
		mimikoSave("style",style);location.reload();
	});

}
if (mimikoLoad("backpics")==null){
var picstr="http://s.acfun.tv/h/Images/Upload/d2197abf-786f-4aa3-842a-0185f5d635ca.jpg,\
http://s.acfun.tv/h/Images/Upload/edd217b4-90a7-4fb1-b6fa-c3e8f79349c3.jpg,\
http://s.acfun.tv/h/Images/Upload/2e0fd3b0-1f85-4b85-a0ea-1160d6182357.jpg,\
http://s.acfun.tv/h/Images/Upload/9c4b4c1f-261a-49d2-ac53-0bccedb83258.jpg,\
http://s.acfun.tv/h/Images/Upload/d2fc6f88-a291-400a-8392-dd725244c293.jpg,\
http://s.acfun.tv/h/Images/Upload/6a19a141-81ee-4877-a57a-9e3db9402b7e.jpg,\
http://s.acfun.tv/h/Images/Upload/5a88912b-523f-4669-a463-20705180e2f4.jpg,\
http://s.acfun.tv/h/Images/Upload/33e60698-c2dc-4424-a272-e533ed6066a3.jpg";
mimikoSave("backpics",picstr);
}
else
{
	picstr=mimikoLoad("backpics");
}
var profile = '<div id="page-backstyle">\
	<div id="inner">\
    	<div class="window">\
            <div class="title-window">自定义背景</div>\
            <div class="mainer">\
		<label class="">\
		请在下面的文本框中编辑背景用逗号分隔。关于增强脚本和CSS的更多信息请关注<a href=\'http://www.acfun.tv/v/ac339672\'>这里</a>\
			<textarea style="width: 600px; height:250px" id="background"></textarea>\
		</label>\
            </div>\
        </div>\
    </div>\
</div>';
var pics=picstr.split(",");
var url=pics[Math.ceil(Math.random()*pics.length)-1];
document.body.style.backgroundImage = "url("+url+")"
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundAttachment = "fixed";
if (window.location.href.split("#")[0] == "http://www.acfun.tv/config.html")
{
	var btn = $('<a class="btn-left" href="#background">背景图</a>');
	btn.insertBefore("#btn-apply");
	btn.bind("click",function(){
		$('a.btn-left-active').removeClass('btn-left-active');
		btn.addClass('btn-left-active');
		$('#area-stage-right').empty().html(profile);
		$("#background").val(picstr);
		$("#background").bind("change",function (){picstr=$("#background").val();$(this).parent().toggleClass('changed');document.title = '*' + $('title').text().replace(/\*/g, '');});
	});
	$("#btn-apply").bind("click",function(){picstr=mimikoSave("backpics",picstr);})
}
})();