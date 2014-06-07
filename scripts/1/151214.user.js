// ==UserScript==
// @name        贴吧消息提醒
// @version     1.20
// updateURL  http://userscripts.org/scripts/source/151214.meta.js
// downloadURL http://userscripts.org/scripts/source/151214.user.js
// @exclude	http://tieba.baidu.com/f?kw=*
// @exclude	http://tieba.baidu.com/f?*
// @exclude	http://tieba.baidu.com/p/*
// @require   http://code.jquery.com/jquery-1.6.js
// @run-at document-end
// ==/UserScript==

//蛋疼的iframe导致统一页面出现多个提醒框，由于iframe的src大都很长，简单判断一下
//当前网址长度大于50会误伤（收不到提醒）
if(location.href.length<50)
{
var second=30;//更新频率，单位秒
second*=1000;
var note="";
window.checkNow=function ()
{
$('#note').remove();
$('#count').remove();
GM_xmlhttpRequest({
method: "Get",
url: "http://message.tieba.baidu.com/i/msg/get_data",
onload: function(response) {
var n = response.responseText
if(!n)GM_notification('网络错误或没有登录');
n=n.match(/\[(.*)\]/)[1].split(','); 				
var fans=n[0];
var reply = n[3];
var AtMe = n[8];
var trash=n[9];
var title="";
note='<div id="note">';
if(fans!=0){note+='<div>'+n[0]+'个'+'<a>新粉丝</a></div>'; tltle+=n[0]+'粉丝  ';}
if(reply!=0){note+='<div>'+n[3] +'个'+ '<a id="reply" target="_blank" href="http://tieba.baidu.com/i/sys/jump?u=&type=replyme">新回复</a></div>'; title+=n[3] +'回复  ';}
if(AtMe!=0){note+='<div>'+n[8]+'个'+'<a id="atme" target="_blank" href="http://tieba.baidu.com/i/sys/jump?u=&type=atme">@提到我</a></div>'; title+=n[8]+'个@提到我';}
if(trash!=0){note+='<div>'+n[9]+'个'+'<a id="trash" target="_blank" href="http://tieba.baidu.com/i/sys/jump?u=&type=recycle">回收站提醒</a></div>';title+=n[9]+'回收站';}
count=parseInt(n[0])+parseInt(n[3])+parseInt(n[8])+parseInt(n[9]);

if(count!=0)
{
$("html").append(note);
}
}
});
}

//清理回复
if(location.href.match(/http:\/\/tieba.baidu.com\/i\/[0-9]*\/replyme/)!=null)
{
GM_xmlhttpRequest({
method: 'GET',
url: 'http://message.tieba.baidu.com/i/msg/clear_data?type=4'
});
}
//清理AT
if(location.href.match(/http:\/\/tieba.baidu.com\/i\/[0-9]*\/atme/)!=null)
{
GM_xmlhttpRequest({
method: 'GET',
url: 'http://message.tieba.baidu.com/i/msg/clear_data?type=9'
});
checkNow();
}
//清理垃圾箱
if(location.href.match(/http:\/\/tieba.baidu.com\/i\/[0-9]*\/recycle/)!=null)
{
GM_xmlhttpRequest({
method: 'GET',
url: 'http://message.tieba.baidu.com/i/msg/clear_data?type=10'
});
}
checkNow();
setInterval(function(){checkNow();},second);


//回复框css
GM_addStyle('#note{\
text-align:left;\
background-color: #FFFFDA;\
border: 1px solid #D1B07C;\
border-radius: 4px 4px 4px 4px;\
box-shadow: 1px 1px 2px #D4D4D4;\
padding: 5px;\
width:auto;\
height:auto;\
position:fixed;\
top:3px;\
right:5px;\
z-index:99999;\
font-size:12px;\
}\
#note a{\
color:blue;\
}\
');
}