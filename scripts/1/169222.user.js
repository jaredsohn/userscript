// ==UserScript==
// @name        百度贴吧马甲回复
// @description 马甲回复帖子#离线模式#离线帐号有回复提醒
// @namespace   yuxingyc
// @include http://tieba.baidu.com/*
// @downloadURL	https://userscripts.org/scripts/source/169222.user.js
// @updateURL	https://userscripts.org/scripts/source/169222.meta.js
// @grant		GM_setValue
// @grant		GM_getValue
// @grant		GM_addStyle
// @run-at  document-start
// @grant		GM_xmlhttpRequest
// @version     3.0
// ==/UserScript==
var bduss="";
try{
var co=document.cookie;
if(/BDUSS=(.*?);/.test(co))bduss=RegExp.$1;
else bduss=co.split("BDUSS=")[1];
}catch(e){}

function c(num)
{
		var n1 = new Date;
		if(num)n1.setTime(n1.getTime() + 99999999);
		var a=num?GM_getValue("bd"+num):"";
		document.cookie = "BDUSS="+a+";domain=baidu.com;path=/;expires=" + n1.toGMTString();	
}

//贴吧离线模式
var sMode=GM_getValue("sMode","0");
var isReload=0;
if(/tieba\.baidu\.com\/i\//.test(location.href))
{
//	
}else
	{
		if(bduss&&sMode==1)
		{
		c();	
		isReload=1;
		window.location.reload();		
		document.write("");
		alert("当前为离线模式\n\n如果页面空白,请手动刷新");			
		}
	}
	
document.onreadystatechange = function () {
  if (document.readyState != "complete")
  {
  	
  	if(isReload==1)window.location.reload();    
   main();
  }
}


function main(){	
var $ = unsafeWindow.$;
var bdUserName="";
var baiduId1="";
var baiduId2="";

var tbsLocked=0;
var tbs="";
var page_y=GM_getValue("pageY",0);
if(page_y>0){window.scrollTo(0,page_y);GM_setValue("pageY",0);}

var str1;
var sMode=GM_getValue("sMode",0);

if(sMode==1) str1="贴吧离线模式";
else str1="贴吧普通模式";

try{
var sHtml="<li><p><a  class='a_x_20130711' href='javascript:void(0)' >"+str1+"<a/></p></li>";
$("li.v2_tab_tab_normal:eq(0)").after(sHtml);
$('li.j_tbnav_tab:eq(0)').after(sHtml);
}catch(e){}
	
$(".a_x_20130711")[0].addEventListener("click",function()
{	
	if(sMode==0)
	{
		if(confirm("切换为离线模式?"))
		{
			if(bduss)saveUseInfo("0");
			GM_setValue("sMode",1);
			window.location.reload();
		}
	}
	else if(sMode==1)
		{
			if(confirm("切换为 "+GM_getValue("name0"," ")+" 登录状态?"))
			{
				c("0");			
				GM_setValue("sMode",0);
				window.location.reload();
			}
		}		
	
},false);	

baidumsg();	
baiduId1=GM_getValue("name1"," ");
baiduId2=GM_getValue("name2"," ");
if(!bduss&&sMode==1)iniApp();
else{
	
bdUserName=unsafeWindow.PageData.user.name;

tbs=unsafeWindow.PageData.tbs;
if(bdUserName==baiduId1)
{	
	if(GM_getValue("bd1"," ")!=bduss){GM_setValue("bd1",bduss);GM_setValue("tbs1",tbs);}
}
if(bdUserName==baiduId2)
{	
	if(GM_getValue("bd2","")!=bduss){GM_setValue("bd2",bduss);GM_setValue("tbs2",tbs);}
}
}


function page2()
{
GM_addStyle('.ggg20130711{border-radius:3px;background:rgb(230,237,238);border:1px solid #93B7CE}');


var islzl=0;
var lzlQuoteId;
function lzl(){
$("#buttonId").remove();
$("div.lzl_simple_wrapper").after(button_22);



var a=$(".tb-editor-editarea-wrapper").closest(".core_reply_wrapper").attr('data-field');
lzlQuoteId=a.match(/pid":"(.*?)"/,"")[1];
addClick();
islzl=1;
}

function addClick()
{
document.getElementById('aaa20130711').onclick=function(){bdGetAndPost("1",this);}
document.getElementById('bbb20130711').onclick=function(){bdGetAndPost("2",this);}

}

//监听按钮: "回复" "我说一句" 楼中楼"回复"　
$("a[class*='lzl_s_r']").mouseup(function(){setTimeout(lzl,300)});
$("p[class*='j_lzl_p']").mouseup(function(){setTimeout(lzl,300)});
$("div.core_reply_tail").mouseup(function(){setTimeout(lzl,300)});

var bdPostData;

//马甲回复
function bdGetAndPost(a,buttonxx)
{		
	if(islzl==1)GM_setValue("pageY",document.documentElement.scrollTop-100);	
	else GM_setValue("pageY",$("#thread_theme_4")[0].offsetTop-200);
	
	buttonxx.disabled=true;
	var thisCookie=GM_getValue("bd"+a,"");
	
	var n1 = new Date;
	n1.setTime(n1.getTime() + 99999999);
	//切换发帖帐号
	document.cookie = "BDUSS=" + thisCookie + ";domain=baidu.com;path=/;expires=" + n1.toGMTString();
	
	var aa=$("#editor").attr("data-postor");
	var aa=aa.substring(1,aa.length-2).replace(/:'/g,"=").replace(/',/g,"&");
	
	tbs=GM_getValue('tbs'+a,""); 
	var content=islzl==0?unsafeWindow.rich_postor._getData().content:unsafeWindow.LzlEditor._s_p._se.getHtml();
	content=content.replace(/ /g,'%20').replace(/&/g,escape("&")).replace(/\+/g,"%2B");			
	var quoteId="",repostId="";
	if(islzl==1){quoteId="&quote_id="+lzlQuoteId+"&repostid="+lzlQuoteId;}
	bdPostData=aa+quoteId+"&content="+content+"&anonymous=0&tbs="+tbs+"&tag=11&new_vcode=1";

	GM_xmlhttpRequest({
	method: "POST",
	url: "http://tieba.baidu.com/f/commit/post/add",
	data:bdPostData,
	headers: {
    "Content-Type": "application/x-www-form-urlencoded"
	},
	onload: function(response) {
		//恢复在线帐号
	document.cookie = "BDUSS=" + bduss + ";domain=baidu.com;path=/;expires=" + n1.toGMTString();
	if(response.responseText.indexOf("\"content\":\"\"")>-1)
	{
		alert("-------------发帖失败-------------\n　　抱歉，您的贴子无法正常提交。\n\n　　可能情况:\n\n　　1.您发的贴子需要输入验证码\n　　请使用不需要输入验证码的帐号\n\n　　2.贴子过长\n\n　　3.含有百度禁止的内容\n----------------------------------");
    buttonxx.disabled=false;
   }else setTimeout(window.open(location.href,'_self'),1000);
  }
	});
	

}  
var onlineUser="";
if(bdUserName)onlineUser="<font size='2' color='gray'> 在线帐号:"+bdUserName+"</font>";
var button_11='　<input class="ggg20130711"  id="bdinput20130711_1" type="button"  value="保存为马甲1"> '+				
				' <input class="ggg20130711"  id="bdinput20130711_2" type="button" value="保存为马甲2"> '+
				'<a href=\'javascript:TbCom.process("User", "buildLoginFrame");void(0);\'>登录新帐号</a>';
var button_22=' <span id="buttonId"><input class="ggg20130711" id="aaa20130711" type="button" value="马甲1('+baiduId1+')发表"> '+
		'<input class="ggg20130711"  id="bbb20130711" type="button"  value="马甲2('+baiduId2+')发表">'+onlineUser+'</span>';
$('#tofrs_down').after("<span style='float:left'>"+button_11+"</span>");


function h(n)
{
document.getElementById("bdinput20130711_"+n).addEventListener("click",function()
{
	if(confirm("将本次登录的帐号 "+bdUserName+" 保存为马甲"+n+"?"))
	{
	saveUseInfo(n);
	window.location.reload();
	}
},false);

}
	h("1");
	h("2");
function button1()
{
	$("#buttonId").remove();
	$('div.editor_users').after(button_22);
	addClick();
	islzl=0;
}
button1();
 
document.body.onmouseup = function()
{
	var p=document.activeElement;
	if(p.className=="tb-editor-editarea edit_field_focus")
	{
		if(islzl==1)button1();
	}	
	if(p.className=="tb-editor-editarea")
	{
		lzl();
	}
}

}//page2


//////多帐号回复提醒////
function baidumsg(){
GM_addStyle("#bddiv20130711{display:none;margin:0;width:auto;top:2em;right:5px;background:#D9E3E6;overflow:hidden;zoom:1;text-align:left;z-index:9999999;position:fixed;display:none;font-size: 12px;border: 2px solid #379082;border-radius: 10px;padding: 3px;}");
var bdmainDiv = document.createElement("div");
bdmainDiv.id = "bddiv20130711";
var body=document.body;
body.insertBefore(bdmainDiv,body.childNodes[0]);

function setbdCookie(num,This)
{	
	c(num);
	window.open(This.parentNode.parentNode.nextSibling.title);
}


var w=document.documentElement.clientWidth;
var h=document.documentElement.clientHeight;

var idx0=GM_getValue("i0","0");
var idx1=GM_getValue("i1","0");
var idx2=GM_getValue("i2","0");
if(w>600&&h>300)
{			
		if(idx0!=idx1&&idx0!=idx2){	getMsg("0");};
		getMsg("1");
		getMsg("2");
		
}

function getMsg(n){
	var p=GM_getValue("p"+n,"0");
	if(p!=0){
	GM_xmlhttpRequest({		
		method: "Get",
		url: "http://message.tieba.baidu.com/i/msg/get_data?user="+p,
		onload: function(response)
		{
			var a = response.responseText.match(/(\d+)/g);
			var str="";
			var tit="title='http://tieba.baidu.com/i/sys/jump?u="+p+"&type=";
			if(a[0]!=0)str+="<li "+tit+"fans'>"+a[0]+"个新粉丝</li>";
	 		if(a[1]!=0)str+="<li>"+a[1]+"个新评价</li>";
			if(a[3]!=0)str+="<li "+tit+"replyme'>"+a[3]+"个新回复</li>";
			if(a[4]!=0)str+="<li "+tit+"feature'>"+a[4]+"个新精品</li>";
			if(a[5]!=0)str+="<li>"+a[5]+"个竞猜结果</li>";
			if(a[8]!=0)str+="<li "+tit+"atme'>"+a[8]+"个@提到我</a></li>";
			if(a[9]!=0)str+="<li "+tit+"recycle'>"+a[9]+"个回收站提醒</li>";
			if(a[10]!=0)str+="<li>"+a[10]+"个粉丝福利卡</li>";
			if(a[11]!=0)str+="<li>"+a[11]+"个点亮我</li>";
			if(str.length>0)
			{  	
				var iBaUrl="http://tieba.baidu.com/i/"+GM_getValue("i"+n,"")+"?st_mod=userbar&fr=tb0_forum"
				bdmainDiv.innerHTML+="<ul style='margin:0;padding:0;list-style:none'><li><strong>帐号:<a id='bd_a_20130711_"+n+"' title='点击登录该帐号'  href='javascript:void(0)'>"+GM_getValue("name"+n,"")+" </a></strong></li>"+str+"</ul>";
				
				bdmainDiv.style.display="block";										
						
				var id0=document.getElementById("bd_a_20130711_0");
				var id1=document.getElementById("bd_a_20130711_1");
				var id2=document.getElementById("bd_a_20130711_2");
				
				if(id0){id0.style.color="green";id0.addEventListener("click",function(){setbdCookie("0",this)},false);}			
				if(id1){id1.style.color="green";id1.addEventListener("click",function(){setbdCookie("1",this)},false);}
				if(id2){id2.style.color="green";id2.addEventListener("click",function(){setbdCookie("2",this)},false);}	
			}
		}
	});	
	}
}

bdmainDiv.addEventListener('mouseup',function(){bdmainDiv.style.display="none"},false);


}//baidumsg()

function saveUseInfo(n)
{
	GM_setValue("bd"+n,bduss);
	GM_setValue("tbs"+n,unsafeWindow.PageData.tbs);	
	GM_setValue("name"+n,unsafeWindow.PageData.user.name);
	GM_setValue("p"+n,unsafeWindow.PageData.user.portrait);
	GM_setValue("i"+n,unsafeWindow.PageData.user.itieba_id);
}


if(/baidu\.com\/f.*?kw/.test(location.href)){}else if(bduss)	page2();

function iniApp(){
GM_addStyle('#fullbg{background-color: Gray;left: 0px;opacity: 0.5; position: absolute;top: 0px;z-index:999;  -moz-opacity: 0.5;}'+
'#divConxx{ display:none;padding-bottom:30px;padding-right:10px; padding-top:0px; padding-left:13px;border:1px solid #E3E3E3}'+
'#userinfoxx{padding-left:13px;height:40px}#userinfoxxTop{padding-top:8px;float:left}'+
'.xxinput20130711{cursor:pointer;border-radius:3px;background:white;color:rgb(29, 83, 191);border:1px solid #E7E7E7}');	

document.body.addEventListener('keyup',function(e)
{
	//F1	
	if(e.ctrlKey && e.keyCode == 13) 
	{
		send();
	}	
},false);

function send()
{
		if(isPost==0){
	
	if(quoteData.length >0)GM_setValue("pageY",document.documentElement.scrollTop-100);	
	else GM_setValue("pageY",$("#thread_theme_4")[0].offsetTop-200);		
	var str=$("div.tb-editor-editarea").html().replace(/(<br>)+$/,"");
	var sss=str;
	var str=str.replace(/<.*?>/g,"");
	var len = str.match(/[^ -~]/g) == null ? str.length : str.length + str.match(/[^ -~]/g).length ;
  if(len<=280 && quoteData.length >0)	postData(sss);
	else if(quoteData.length >0)
		{		
			
			 if(confirm("超出楼中楼字符长度,\n\n发表到普通楼层？"))
			 {
			 		quoteData="";
			 	
			 		sss=sss.replace(/<font.*?font>:/,"");
			 		var addStr="回复 @"+thisName+" "+floorNum+"<br>";
			 		postData(addStr+sss);
			 		GM_setValue("pageY",document.documentElement.scrollTop-100);	
				}else	postData(sss);
				
					
		}
		else
			 postData(sss.replace("<font color='green'>","").replace("</font>",""));	
	}
	
}

var fullbg = document.createElement("div");
fullbg.id="fullbg";
document.body.appendChild(fullbg);
var imgHtml='<img style="height:40px;width:40px;border:2px solid #F0F0F0"  src="http://tb.himg.baidu.com/sys/portrait/item/'+GM_getValue("p0","")+'" />'

var picAndName="<font color=green size=2>发帖帐号: "+GM_getValue("name0","")+"<br>Ctrl+Enter 快捷发表</font>"
var userinfo='<div  id="userinfoxx" ><div style="float:left">'+ imgHtml+'</div><div id="userinfoxxTop">'+picAndName+'</div></div>';
$("div.tb-editor-toolbar").before("<div id='divConxx' ><span id='bdclosexx' style='color:gray;cursor:pointer; float:right;padding-right:5px;'>[关闭]</span><br><span id='msg1xx'></span></div>");
$("div.tb-editor-toolbar").after(userinfo);
$("#bdclosexx").click(function(){
	isPost=0;
	quoteData="";
	$("#fullbg").hide();
	$("#divConxx").hide();
	$("div.j_editor_windex").css({"z-index":"10","position":"relative","left":"0px","top":"0px"});
	});
	
//可移动的编辑框
$("#divConxx").mousedown(function(e){
	xxx = e.pageX - $(this).offset().left;
	yyy = e.pageY - $(this).offset().top; 
	$(this).mousemove(function(e){		
		$("div.j_editor_windex").css({"left": (e.pageX - xxx), "top": (e.pageY - yyy) }); ;		
	});
});
$("#divConxx").mouseup(function(){
	$(this).unbind("mousemove");	
});
$("#divConxx").mouseenter(function(){
	$(this).unbind("mousemove");	
});

//开启编辑功能

$("div.tb-editor-toolbar").attr({"class":"tb-editor-toolbar"});
$("div.tb-editor-wrapper").attr({"class":"tb-editor-wrapper"});
$("div.tb-editor-editarea").css({"height": "auto",
			"min-height": "193px", "max-height": "204px",
			"display": "block","color": "black",
			"word-wrap": "break-word","position": "relative"}); 
$("div.editor_tip_show").remove();
$("td.pt_submit").removeAttr("color");
$("div.tb-editor-editarea").attr({"class":"tb-editor-editarea"})
				.attr({"contentEditable":"true"})
				.after("<input type='button' id='input_id20130711' class='xxinput20130711' value='离线发表'>");
$("#input_id20130711")[0].addEventListener("click",send,false);
$("input.subbtn_bg").hide();
$("span.subTip").html("Ctrl+Enter "+GM_getValue("name0","")+" 发表");


//隐藏编辑框工具栏
$(".tb-editor-toolbar").hide();

$("#quick_reply").hide();// 
$("a[class*='lzl_link_unfold']").each(function(){this.outerHTML="<input type='button' class='xxinput20130711 inp_cz' value='回复'>　　"});
$("a[class*='lzl_s_r']").each(function(){this.outerHTML="<input type='button'  class='xxinput20130711 inp_lzl'  value='回复'>"});
$("p[class*='j_lzl_p']").each(function(){this.outerHTML="<input type='button'  class='xxinput20130711 inp_cz j_lzl_p' value='我也说一句'>"});
$("a.p_reply_first")[0].outerHTML="<input type='button' class='xxinput20130711 inp_cz' value='回复楼主'>";
$("span[class*='lzl_link_fold']").remove();

var lzlQuoteId="",quoteData="",thisName,floorNum,quoteContent;//
//回复层主 楼主
$("input[class*='inp_cz']").click(function(event)
{	
	var p=$(this).closest("div.l_post");
	var userData=JSON.parse(p.attr("data-field"));	
	thisName=userData.author.name;	
	floorNum=userData.content.floor+"楼";	
	var usePic="<div style='float:left'><img  style='border:4px solid #F0F0F0;width:50px;height:50px' src='http://tb.himg.baidu.com/sys/portrait/item/"+userData.author.portrait+"'></div>";

	quoteContent=p.find("div.d_post_content").html().replace(/<img.*?>/g,"[图片]")
				.replace(/图片来自：<a.*?的百度相册<\/a>/g,"")
				.replace(/<br>/g,"[换行]")
				.replace(/<.*?>/g,"");	
	var s=quoteContent.substring(0,120);
	var zz=quoteContent.length-120;;
	if(quoteContent.length>120)quoteContent=s+"...(省略"+zz+"字)";		

	lzlReply(thisName,this,event);	
	$("#msg1xx").html(usePic+"<font size=2 color='black'> <a>"+thisName+"</a> 在"+floorNum+"发表的内容"+"</font><br><div><font color='gray'>"+quoteContent+"</font></div>");		
	$("div.tb-editor-editarea").html("");
});

//回复楼中楼
$("input[class*='inp_lzl']").click(function(event)
{
	var p=$(this).closest(".lzl_single_post");
	thisName=p.find("a.at").html();
	floorNum=$(this).closest("div.l_post").find("ul.p_tail").find("span").html()+"(楼中楼)";
	var b=p.find(".lzl_content_main").html();
	$("#msg1xx").html(p.html().split('<div class="lzl_content_reply">')[0]);
	lzlReply(thisName,this,event);
});

function lzlReply(thisName,rr,event)
{
	var df=$(rr).closest("div.l_post").attr('data-field');
	lzlQuoteId=df.split(/content":{"id":(\w+),/)[1];
	quoteData="&quote_id="+lzlQuoteId+"&repostid="+lzlQuoteId;
	$("div.tb-editor-editarea").html("<font color='green'> 回复 "+thisName+" </font>:");
	//$("#msg1xx").html("shift+Enter 快捷发表");
	showEditor(event);
	showBg();	
}

function showBg() { 
var bh = $("body").height(); 
var bw = $("body").width(); 

 $("#fullbg").css({ 
     height: bh, 
     width: bw, 
     display: "block" 
    }); 
} 

function showEditor(event){
$("#divConxx").show();
var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

var left= $("div.j_editor_windex")[0].offsetLeft+55;
var top=scrollTop+$(window).height()/2-200;
$("div.j_editor_windex").css({"z-index":"99999","position":"absolute","left":left+"px","top":top+"px"});	
}

var content1="",bdPostData1="",isPost=0;
function postData(str)
{	
	
isPost=1;
var aa=$("#editor").attr("data-postor");
var aa=aa.substring(1,aa.length-2).replace(/:'/g,"=").replace(/',/g,"&");

var	content1=str.replace(/ /g,'%20').replace(/&/g,escape("&")).replace(/\+/g,"%2B");
bdPostData1=aa+quoteData+"&content="+content1+"&anonymous=0&tbs="+GM_getValue("tbs0","")+"&tag=11&new_vcode=1";
	
c("0");	


	if(quoteData.length >0)GM_setValue("pageY",document.documentElement.scrollTop-100);	
	else GM_setValue("pageY",$("#thread_theme_4")[0].offsetTop-200);
		$("div.tb-editor-editarea").attr({"contentEditable":false})
					.css({"background-color":"#F1F1F1"});		
			
var  XmlHttp = new XMLHttpRequest(); 
XmlHttp.open("post","http://tieba.baidu.com/f/commit/post/add",true);
XmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
XmlHttp.send(bdPostData1);
//c(); 
XmlHttp.onreadystatechange=function()
{
	if (XmlHttp.readyState==2)
	{
		c();
	}
	if (XmlHttp.readyState==4)
	{		
			$("div.tb-editor-editarea").attr({"contentEditable":true})
			.css({"background-color":"rgb(255, 255, 255)"});		
		isPost=0;	
		var replyContent=XmlHttp.responseText.split(/content":"(.*?)"/)[1];
		
			if(replyContent.length>0)			
				setTimeout(window.location.reload(),1500);
			else
				alert("-------------发帖失败-------------\n　　抱歉，您的贴子无法正常提交。\n\n　　可能情况:\n\n　　1.您发的贴子需要输入验证码\n　　请使用不需要输入验证码的帐号\n\n　　2.贴子过长\n\n　　3.含有百度禁止的内容\n----------------------------------");
	}
} 
}
}
}

