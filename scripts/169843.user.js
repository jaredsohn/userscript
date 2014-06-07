// ==UserScript==
// @name        贴吧首页直接回复
// @namespace   yuxingyc
// @include     http://tieba.baidu.com/*
// @exclude     http://tieba.baidu.com/p/*
// @exclude     http://tieba.baidu.com/f?ct=*
// @exclude    http://tieba.baidu.com/f?kz=*
// @downloadURL	https://userscripts.org/scripts/source/169843.user.js
// @updateURL	https://userscripts.org/scripts/source/169843.meta.js
// @grant		GM_addStyle
// @grant		GM_xmlhttpRequest
// @grant  unsafeWindow 
// @version     2.4
// ==/UserScript==
(function(){
GM_addStyle('.ww {position:absolute; cursor:url("http://static.tieba.baidu.com/tb/editor/images/face/i_f24.png"),pointer;display:none;z-index:99999;border-radius:3px;background:rgb(230,237,238);border:1px solid #93B7CE}'+
		'#divConxx1{display:none;padding-bottom:30px;padding-right:10px; padding-top:0px; padding-left:13px;border:1px solid #E3E3E3}'+
		'#fullbg{background-color: Gray;left: 0px;opacity: 0.5; position: absolute;top: 0px;z-index:3;  -moz-opacity: 0.5;}'+ 
		'.div1x{ padding-left:20px;}');
var $ = unsafeWindow.$;
var newtb=$("div.card_head").length;
var fullbg = document.createElement("div");
fullbg.id="fullbg";
document.body.appendChild(fullbg);

var middleDiv = document.createElement("div");
middleDiv.id="middleDiv";
document.body.appendChild(middleDiv);
$("div.tb-editor-toolbar").before("<div id='divConxx1' ><small>SHIFT+ENTER快捷发表 </small><span id='bdclosexx' style='color:gray;cursor:pointer; float:right;padding-right:5px;'>[关闭]</span><br><span id='msg1ssss'></span></div>");
$("#bdclosexx").click(function(){
	$("#fullbg").hide();
	$("#divConxx1").hide();
	$("div.j_editor_windex").css({"z-index":"10","position":"relative","left":"0px","top":"0px"});
	});

var editorLeft=$("div.j_editor_windex")[0].offsetLeft;
var editorTop=$("div.j_editor_windex")[0].offsetTop;
if(newtb>0)editorLeft= editorLeft+65;
function showEditor(event){
$("#divConxx1").show();
var top=event.pageY;
var left=editorLeft;
if(newtb>0)
{ top=top-$(document).height()+600;
 left=editorLeft-75;
}

$("div.j_editor_windex").css({"z-index":"99999","position":"absolute","left":left+"px","top":top+"px"});	
}
$("div.tb-editor-editarea").after("</div> <input id='input1' type='button' value='发表'>");


$("#fullbg")[0].onclick=function(){$("#bdclosexx")[0].click();}

//显示遮罩层
function showBg() { 
var bh = $("body").height(); 
var bw = $("body").width(); 
 $("#fullbg").css({ 
     height: bh, 
     width: bw, 
     display: "block" 
    }); 
} 

var b = document.createElement("input");
b.className = "ww";
b.value="回复";
b.type = "button";

var g = document.getElementById("input1");
var f = document.createElement("input");
f.type = "button";
f.style.display = "none";

var html11,title1;
function addevent(event) {
var a = event.target.getAttribute("href");

b.style.display="block";
b.style.top="36px";
b.style.left="35px";

f.setAttribute("href",a);
html11=$(this).closest(".j_thread_list")[0].innerHTML.replace(/<img.*?>/g,"")
	.replace(/threadlist_pic_highlight j_m_pic_light/g,"")
	.replace(/<input.*?>/g,"");

//加入"回复"按钮
var t=this.parentNode.parentNode.parentNode;
t.parentNode.insertBefore(b,t.childNodes.nextSibling);
t.parentNode.insertBefore(f,t.childNodes.nextSibling);
}

$("a[class*='j_th_tit']").mouseenter(addevent);

//"回复"按钮 事件
b.addEventListener("click",function(event){
b.style.display="none";
g.style.display="block";

showBg();//遮罩层
showEditor(event);
{

html11=html11.replace(/\n/g,"");
$("#msg1ssss").html(html11);	
}
},false);

//隐藏的发表按钮 事件
f.addEventListener("click",function(event){
var text11=unsafeWindow.rich_postor._getData().content;
var url1=event.target.getAttribute("href");
bdGetAndPost(text11,url1,this);
},false);

//"发表"按钮
g.addEventListener("click",function(event){f.click()},false);

//shift+enter
document.onkeydown =function(event) 
{
if(event.shiftKey && event.keyCode == 13) 
{
f.click();
}
}

//------参照了 @网络孤独行客 的脚本http://userscripts.org/scripts/review/169850 
 var kw=$('meta')[1].getAttribute("fname"); 
 kw=encodeURI(kw); 
 var tbs=unsafeWindow.PageData.tbs; 
 var fid=unsafeWindow.PageData.forum.id; 
//------

var content="",bdPostData="";
function bdGetAndPost(text1,url,ppp)
{	
	var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

	g.disabled=true;
	ppp.disabled=true;
content=text1.replace(/ /g,'%20').replace(/&/g,escape("&")).replace(/\+/g,"%2B");

bdPostData="kw="+kw+"&ie=utf-8&rich_text=1&floor_num=2&fid="+fid+"&tid="+url.slice(3,14)+
    "&mouse_pwd_isclick=1&lp_type=0&lp_sub_type=0&content="+content+ 
    "&anonymous=0&tbs="+tbs+"&tag=11";
	GM_xmlhttpRequest({
	method: "POST",
	url: "http://tieba.baidu.com/f/commit/post/add",
	data:  bdPostData,
	headers: {
  	'cookie':document.cookie,
    "Content-Type": "application/x-www-form-urlencoded"
	},
	onload: function(response) {
	ppp.disabled=false;
	g.disabled=false;	
	var replyConten=response.responseText.split(/content":"(.*?)"/)[1];
	if(replyConten.length>0)
	{
	
	$("#bdclosexx")[0].click();
	 setTimeout(function(){scrollTo(0,scrollTop)},400);
	ppp.outerHTML="<div class='div1x'>已回复 :<br>"+text1+"</div>";	
	$("div.tb-editor-editarea").html("");
    }else
    {		               
      alert("　　　　发帖失败\n\n抱歉，您的贴子无法正常提交。\n\n可能情况:\n\n1.您发的贴子需要输入验证码\n请使用不需要输入验证码的帐号\n\n2.贴子过长");
   		ppp.outerHTML="<div id='pre12321' class='div1x'><font color='red' size='2'>发帖失败</font></div>";
   		setTimeout(function(){$('#pre12321').remove()},8000);
    }
  }
});

} 

	
})();