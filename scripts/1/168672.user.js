// ==UserScript==
// @name        WapTeiba For PC
// @description 增强手机版贴吧的功能 
// @namespace   yuxingyc
// @include     http://wapp.baidu.com/*
// @include     http://wap.baidu.com/*
// @include     http://tieba.baidu.com/mo/*
// @include     http://tieba.baidu.com/?ssid=0&from=0&bd_page_type=1&*
// @grant		GM_xmlhttpRequest
// @grant		GM_addStyle
// @grant		GM_setValue
// @grant		GM_getValue
// @homepage 	http://userscripts.org/scripts/show/168672
// @downloadURL	https://userscripts.org/scripts/source/168672.user.js
// @updateURL	https://userscripts.org/scripts/source/168672.meta.js
// @version	2013-5-28
// ==/UserScript==
(function(){

var defaultMusic="http://www6.flash8.net/file/sound/loop/f8b/f8b015.MP3";

var wapUrl="http://wap.baidu.com/";
var wapp="http://wapp.baidu.com/";
var wapUrl1=window.location.href;
//简版切换为炫彩版
if((wapUrl==wapUrl1|wapp==wapUrl1))window.location.href='http://wapp.baidu.com/?bd_page_type=1';

//切换为wapp  
var re1=new RegExp("http://tieba.baidu.com/mo/","");
if(re1.test(wapUrl1))window.location.href=wapUrl1.replace(re1,"http://wapp.baidu.com/mo/");

var addCss=['',
	'input{border-radius:3px;background:rgb(230,237,238);border:1px solid #93B7CE}',
	'form{padding-left:8px;padding-bottom:5px;padding-top:1px}',
	'a{ color:rgb(0, 136, 204);}a:hover{text-decoration:underline;}',
	'.i{border-bottom:0px!important;padding-left:10px!important;padding-rigth:10px!important;}',
	'body {word-break:break-all; background-color :#E1E9EA ; width: 600px;margin:0 auto; border:1px solid rgb(239,242,250);font: 14px "Lucida Grande","Lucida Sans Unicode",Helvetica,Arial,Verdana,sans-serif; }',
	'.div3{OVERFLOW-Y: auto;OVERFLOW-X:hidden; padding-bottom:5px;padding-right:5px; padding-top:5px; padding-left:5px;}',
	'.bg3{background:rgb(230,237,238) ;}.bg2{background:#E1E9EA ;}',
	'.ddiv{OVERFLOW-Y: auto; OVERFLOW-X:hidden; position:relative; left:90px; min-height: 20px;background:#C8D9DB; width:500px;}',
	'.mousecss{cursor: url("http://tb2.bdstatic.com/tb/static-pb/img/cur_zin.cur"), pointer;}',
	'textarea{border-radius:3px;}textarea:hover{background:rgb(245,245,245)}.h{background-color:#cfe0e2!important}',
	'.q{border:1px solid #93B7CE;background-color: rgb(230,237,238);OVERFLOW-x:hidden;width: 455px;max-height: 270px;min-height: 18px;}',
	'div.RoundedCorner{ }b.rtop, b.rbottom{display:block;background: #E1E9EA} ',
	'b.rtop b, b.rbottom b{display:block;height: 1px;overflow: hidden; background: #C8D9DB} ',
	'b.r1{margin: 0 5px} b.r2{margin: 0 3px} b.r3{margin: 0 2px}b.rtop b.r4, b.rbottom b.r4{margin: 0 1px;height: 2px} '];
GM_addStyle(addCss.join(""));

function $(id){return document.getElementById(id);}
var corner_top='<div class="RoundedCorne"><b class="rtop"><b class="r1"></b><b class="r2"></b><b class="r3"></b><b class="r4"></b></b>'
var corner_bottom='<b class="rbottom"><b class="r4"></b><b class="r3"></b><b class="r2"></b><b class="r1"></b></b> </div> ';

var iframeStr=document.body.innerHTML;
var testhtml1=/>刷新<\/a>/.test(iframeStr);
var testhtml2=/>返回<\/a>/.test(iframeStr);

if( testhtml2&&testhtml1)
{	
	var s=replaceWapCode1(iframeStr);
	var test1=/"light">回贴成功<\/span>/.test(iframeStr);
	if(test1)s="<body>"+s+"</body>";
	if(s)document.body.outerHTML="<div style='background:#C8D9DB;' >"+s+"</div>";	
}

//提取回复框
if(/rname.*?floor/.test(wapUrl1))document.body.outerHTML=document.getElementsByTagName("div")[1].outerHTML;

//回复页 去掉首尾无用内容
function replaceWapCode1(n)
{		
	var ss="",ss1="",ss2="";
	var test1=/(<form.*?form>)/.test(n);
	if(test1)ss1=RegExp.$1;	
	var test2=/<div class="m t">(.*?)<div><a href=/.test(n);
	if(test2)ss2="<div>"+RegExp.$1;
	 ss=corner_top+ss1+ss2+corner_bottom;
	if(test1|test2)return ss;
	else return "0";	
}

var allLinks, thisElement;
var count=0;
var replyLink=[];
var setclass=0;
var checkSign=true;
var checkReplyme=true;
var checkAtme=true;
var msgElement;
var checkRefleshButton=true;
var newMsg="";
var replyForm="";
var signIn=GM_getValue('GMsignInButton',true);
var refleshUrl="";
allElements = document.getElementsByTagName('*');
for (var i = 0;i <allElements.length; i++) 
{
	thisElement = allElements[i];
	//thisElement.id="aaa"+i;
	
	if(thisElement.href)
	if(/m\.tiebaimg\.com/.test(thisElement.href))
	{
		var img = document.createElement("img");
		var s=thisElement.href;
		thisElement.className="ggg";	
		img.id="imgg"+i;
		img.src=s;	
		thisElement.parentNode.replaceChild(img,thisElement);	
		//点击图片,新窗口打开	
		img.addEventListener("click",function(){
				var imgEl=$(this.id);	
				var picUrl=imgEl.src.replace(/http:\/\/m.tiebaimg.com\/timg.*src=(.*)/gi,function(match, p1) {
					var imgUrl=p1.replace(/%3A/ig,":").replace(/%2F/ig,"\/");
					return imgUrl; });	
				open(picUrl)
									
      		},false);
	}
	

		
	if (thisElement.tagName == 'div'&&thisElement.className == 'i' ) 
	{					
		//设置 隔行颜色
		thisElement.className=setclass==0?"div3 bg3":"div3 bg2";
		setclass=setclass==0?1:0;	
	}
	//操作链接元素		
	if (thisElement.tagName == 'a' ) 
	{	
		thisElement.id="aaa"+i;
		//签到
		if(checkSign&&signIn)			
			if(/">签到<\/a>/.test(thisElement.outerHTML))
			{
				location.href=thisElement.href;
				checkSign=false;
			}
		//记录"刷新"元素	
		if(checkRefleshButton)
		{
			//msgElement :插入功能图标的位置
			if(/">刷新<\/a>/.test(thisElement.outerHTML))
			{
				refleshUrl=thisElement.href;
				msgElement=thisElement;
				checkRefleshButton=false;
				//百度首页不适用
				GM_addStyle('input[type="submit"]{cursor:pointer; position:relative; left:300px;}input[name="sub"]{left:4px;}');
			}		
		}
		//更换"去底部"链接为"电脑版网页"
		if(/#bottom/.test(thisElement.href))
		{		
			if(/=.*/.test(thisElement.href))
			{
				var b;		
				var a=thisElement.href.split(/=|&|#/);
				a[1]?b=a[1]:"";
				if(a[5])
				if(a[5].length>8)
					if(/^[0-9]*$/.test(a[5]))b=a[5];
				if(b)
				{
				thisElement.href="http://tieba.baidu.com/p/"+b;
				thisElement.innerHTML="电脑版网页";
				}
				//1楼添加回复框
				var test1=/class="d h">(<form.*?form>)/.test(iframeStr);
				if(test1)replyForm="<div class='ddiv'>"+corner_top+RegExp.$1+corner_bottom+"</div>";	
			}			
		 }		 		
			//更换"去顶部"链接为"返回顶部" 
		else if(/#top/.test(thisElement.href))
		{
			thisElement.outerHTML="<a href='#top' style=' position:relative; left:0px;'>返回顶部</a>";			
		}	
		 	//设置新窗口打开帖子
		 else if(/is_bakan/.test(thisElement.href))thisElement.target="_blank";
		//新窗口打开用户i贴吧
		if(/\/\i?un=/.test(thisElement.href))thisElement.target="_blank";		
		
		if(checkReplyme)
			if(/\/replyme\?/.test(thisElement.href)) 
				if(/[1-9]/.test(thisElement.innerHTML))
				{	
					thisElement.target="_blank";			
					newMsg+=thisElement.outerHTML+' ';
					checkReplyme=false;			
				}
		
		if(checkAtme)
			if(/\/atme\?/.test(thisElement.href)) 
				if(/[1-9]/.test(thisElement.innerHTML))
				{	
					newMsg+=thisElement.outerHTML;
					thisElement.target="_blank";						
					checkAtme=false;
				}
		
		if (thisElement.className == 'reply_to' ) 
		{		
			if(/回复\(/.test(thisElement.innerHTML))
			{
				//记录有回复帖子的回复链接元素
				replyLink[count]=thisElement;
				count++;		
				thisElement.target="_blank";
			}
			else
			{
				//清除1楼 回复链接
				if(/#reply/.test(thisElement.href))thisElement.outerHTML=replyForm;
				//其他回复添加点击事件
				addmouseLinstner(thisElement,"frameccc","87")			
			}
		}	
			
	}	
}

//  ifame中打开链接
function addmouseLinstner(el,iframid,iframh)
{
	el.addEventListener("mousedown",function()
	{				
		var hrefTmp=this.href;
		this.href="javascript:void(0)";
		var replyEl=$(this.id);
		replyEl.innerHTML="<p></p><div align='right' style='padding-right:5px;' >"+
							"<iframe   style='OVERFLOW-X:hidden;max-height: "+iframh+"px;' id='"+iframid+"' frameborder='0'  width='490' ></iframe></div>";
		var m=$(iframid);
		m.src=hrefTmp;
		m.id="";
		this.id="";													
	},false);
}

var  bdmusicPlayer="";

//新消息
if(newMsg.length>0)
{
	var ss=GM_getValue('GMwapMusic',defaultMusic);
	if(GM_getValue('GMwapMusicButton',true)){ bdmusicPlayer='<embed width="0" height="0"  src="'+ss+'"></embed>';}
}

//功能图标
var arr=["<div style='padding-left:5px;background-color :#E1E9EA'>",
	"<a href='http://msg.baidu.com' target='_blank'>✉</a> ",
	"<span style='cursor:pointer;color:"+GM_getValue("musicBottonColor","rgb(0, 136, 204)")+ "' id='wapmusic'>♫</span> ",
	"<span style='cursor:pointer;color:"+GM_getValue("signBottonColor","rgb(0, 136, 204)")+"' id='wapsign'>✎</span> ",
	"<span style='cursor:pointer;color:"+GM_getValue("displayReplyBottonColor","rgb(0, 136, 204)")+"' id='displayReply1'>■</span>",
	" 　<span style='cursor:pointer;color:"+GM_getValue("displayRefleshBottonColor","rgb(0, 136, 204)")+"' id='reflesh1'>♋</span> "+newMsg+ bdmusicPlayer,
	"<span style='color:green' id='msg123'></span></div>"];



//兼容 贴吧小版中版
try{
var wapTd1=document.getElementsByTagName('td')[0];
var wapTd2=document.getElementsByTagName('td')[1];	
if(wapTd1&&wapTd2&&testhtml1)
{	
	wapTd1.outerHTML=wapTd1.innerHTML;
	wapTd2.outerHTML=" | "+wapTd2.innerHTML+"<div id='newmsg'></div>";
	$('newmsg').innerHTML=arr.join("");
}else msgElement.outerHTML+=arr.join("");
}catch(e){}
var displayMsgEl=$('msg123');

//按钮颜色变化
function bottonButton(gmButtonId,gmColorId,gmMsg1,gmMsg2,thisEl)
{
	
	if(GM_getValue(gmButtonId,true))
	{
		GM_setValue(gmButtonId,false);
		GM_setValue(gmColorId,"gray");
		thisEl.style.color="gray";
		displayMsgEl.innerHTML=gmMsg2;
	}
	else
	{
		GM_setValue(gmButtonId,true);
		GM_setValue(gmColorId,"rgb(0,136,204)");
		thisEl.style.color="rgb(0,136,204)";
		displayMsgEl.innerHTML=gmMsg1;
	}

}

var timoutReflesh;
var timeNum=GM_getValue("gmCountDown","99");
function startCountDown()
{	
	timeoutReflesh=setTimeout(function()
	{
	displayMsgEl.innerHTML=timeNum;
	
	startCountDown();	
	if(timeNum<=0)
	{
	window.location.href=refleshUrl;
	displayMsgEl.innerHTML="正在刷新";
	clearTimeout(timeoutReflesh);
	}
	timeNum--;
	},1000);
}
// 开-关 自动刷新
$('reflesh1').addEventListener('click',function()
{
	function saveNum(){
		var b=$('time321');
		if(/^\d+$/.test(b.value))
		{
			if(b.value<1)b.value=1;
			GM_setValue("gmCountDown",b.value)
			window.location.href=refleshUrl;
		}else alert("只能输入数字");	
	}
	if(GM_getValue("GMrefleshButton",true)){try{clearTimeout(timeoutReflesh);}catch(e){}}
	var strr=[" <input id='time321' size='3'  value='"+GM_getValue("gmCountDown",'99')+"'></input><small>秒</small>",
		" <input type='button' style='cursor:pointer;' id='settime111' value='(1)刷新全部'></input>",
		" <input type='button' style='cursor:pointer;' id='settime222' value='(2)只刷新首页'></input>",
		" <input type='button' style='cursor:pointer;' id='settime333' value='(3)只刷新活动页'></input>",
		"自动刷新"];
	bottonButton("GMrefleshButton","displayRefleshBottonColor",strr.join("")," 已停止自动刷新",this);
	//刷新全部
	$('settime111').addEventListener('click',function()
	{
		GM_setValue("gmRefleshxx",1);
		saveNum();	
	},false);
	//只刷新首页
	$('settime222').addEventListener('click',function()
	{
		GM_setValue("gmRefleshxx",2);
		saveNum();	
	},false);
	//只刷新活动页
	$('settime333').addEventListener('click',function()
	{
		GM_setValue("gmRefleshxx",3);
		saveNum();	
	},false);	
},false);

//开始刷新
if(GM_getValue("GMrefleshButton",true))
{
	//刷新方式
	var refleshxx=GM_getValue("gmRefleshxx",2);
	switch(refleshxx)
	{
	case 1:
	startCountDown();
	break;
	case 2:
	if(/>发贴<\/a>/.test(iframeStr))startCountDown();
	break;
	case 3:	
	startCountDown();
	window.onblur=function(){try{clearTimeout(timeoutReflesh);}catch(e){}}
	window.onfocus=function(){try{clearTimeout(timeoutReflesh);}catch(e){}startCountDown();}
	break;
	default:startCountDown();
	}
}
// 开-关 立即签到
$('wapsign').addEventListener('click',function()
{
	bottonButton("GMsignInButton","signBottonColor","打开贴吧立即签到 ✓ 已开启","打开贴吧立即签到 ✘ 已关闭",this);
},false);
//开-关 提示音
$('wapmusic').addEventListener('click',function()
{
	try{clearTimeout(timeoutReflesh);}catch(e){}//停止刷新功能
	var str="<input size='45' id='musicaddress'  value='"+GM_getValue('GMwapMusic',defaultMusic)+"'></input> <input type='button' style='cursor:pointer;' id='saveMusic' value='保存'></input> ";
	bottonButton("GMwapMusicButton","musicBottonColor"," 消息提示音 开 "+str," 消息提示音 关 ",this);

	$('saveMusic').addEventListener('click',function()
	{
		var str5=$('musicaddress').value.replace(/<|>|'|"/g,"");
		displayMsgEl.innerHTML='<small>提示音已经设置为'+str5+'</small><embed id="testMusic"  width="0" height="0"  src="'+str5+'"></embed>'
		GM_setValue('GMwapMusic',str5);
	},false);
},false);

//开-关 自动展开回复
$('displayReply1').addEventListener('click',function()
{
	GM_getValue("GMdisplayReplyButton",true)?count1=9999:getPageStart();	
	bottonButton("GMdisplayReplyButton","displayReplyBottonColor","自动展开回复 ✓ 已开启","自动展开回复 ✘ 已关闭",this);		
},false);

var timeoutInnsertPage,timeoutOpenlink;
var count1=0;
var count3=0;

//--1--          
function getPageStart()
{
	timeoutInsertPage=setTimeout(function()
	{
		var aa=replyLink[count1];
		var ff=$("div11");
		if(ff)
		{
			ff.className='ddiv';
			ff.id="div11xx"+Math.round(Math.random()*9999999);	
		}
	
		var div11 = document.createElement("div");
		div11.id="div11";
		div11.className='ddiv';
		aa.parentNode.insertBefore(div11,aa.nextSibling);
		getReplyPage(aa.href);//转到--2-- 抓取网页
		count1++;
		if(count1>=replyLin.length)clearTimeout(timeoutInsertPage);		
		getPageStart();//转到--1--  	
	},1000);
}

var wapHtml="0";
var replaceCount=0;


//--2--
function getReplyPage(a)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: a,
		headers:{
		'cookie':document.cookie,
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var s=responseDetails.responseText;			
			//楼中楼添加id
 			s=s.replace(/(<a href="flr\?.*?)(>回复<\/a>)/ig,	function(match,p1,p2)
 			{  
 				replaceCount=replaceCount+1;
 				return p1+' id="replyidxx'+replaceCount+'" '+p2; 						
 			});
 			s=s.replace(/(<a accesskey.*?)(>下一页<\/a>)/ig,	function(match,p1,p2)
 			{  
 				replaceCount=replaceCount+1;
 				return p1+' id="nextpagexx'+replaceCount+'" '+p2; 						
 			});			
			wapHtml=replaceWapCode1(s);
		}
	});
getWapHtmlText();//转到--3--  
}
//--3--
function getWapHtmlText()
{		
	timeoutOpenlink=setTimeout(function()
	{										
		var s="0";												
		clearTimeout(timeoutInsertPage);//清除
		clearTimeout(timeoutOpenlink);//清除							
		s=wapHtml;
		wapHtml="0";			
		$('div11').innerHTML=s;
			if(s=="0"||s=="undefined")
			{
				count3++;
				$('div11').innerHTML="等待响应..."+count3;
				if(count3<10)getWapHtmlText();//转到--3-- , 10秒内等待网页代码
				else
				{	
					getPageStart();//转到--1--  10秒内无法取得网页代码, 进入下一个循环
					count3=0;
					$('div11').innerHTML="无法获取内容,请点击查看回复"
				}
			}
			else
			{			
				replyContent();				
				getPageStart();//转到--1--    成功取得网页代码, 进入下一个循环
				count3=0;			
			}
	},1000);
}

// '回复' '下一页' 添加点击
var replaceCountTmp=0;
function replyContent()
{
	for(var i=replaceCountTmp;i<=replaceCount;i++)
	{
		var ww=$('replyidxx'+i);		
		var ne=$('nextpagexx'+i);
		//'下一页'链接 添加点击
		if(ne)addmouseLinstner(ne,"frameooo","600")
		//'回复'链接 添加点击
		if(ww)addmouseLinstner(ww,"framexxx","105")
		replaceCountTmp=replaceCount;	
	}		
}
// 开始展开回复内容
if(GM_getValue("GMdisplayReplyButton",true))getPageStart();

//input元素转为textarea
var textElementTmp;
var inputElementTmp;

//input输入框转成textarea
document.body.onclick = function()
{
	var p=document.activeElement;
	if(textElementTmp)
	{
		textElementTmp.rows='1';
		p.rows=p.value.split("\n").length+1;
	}
	if(p.tagName=="input" && p.name=="co")
	{	
		try{clearTimeout(timeoutReflesh);}catch(e){}//输入内容时停止刷新页面			
		inputElementTmp=document.activeElement;				
		var j="textid"+Math.round(Math.random()*9999999);;
		p.style.display="none";
		textElementTmp=document.createElement("textarea");
		textElementTmp.className="q";		
		inputElementTmp.parentNode.insertBefore(textElementTmp,inputElementTmp);
		textElementTmp.value=inputElementTmp.value.replace(/<br>/g,"\n");
		textElementTmp.focus();				
	}
	else if(p.tagName=="textarea") textElementTmp=p;				
}

document.onkeyup=function()
{	
    try{clearTimeout(timeoutReflesh);}catch(e){}//输入内容时停止刷新页
	if(textElementTmp)
	{	//textarea传递到input	
		inputElementTmp.value=textElementTmp.value.replace(/\n/g,"<br>");	
		var b=textElementTmp.value.split("\n");
		b.length>0?textElementTmp.rows=b.length+1:textElementTmp.rows=1;
	}	
}

window.setTimeout(function()
{
	var allImgs;
	allImgs = document.getElementsByTagName('img');
	for (var i = 0; i < allImgs.length; i++) 
	{		
		var imgh=allImgs[i];
		//大图片添加鼠标样式		
		var k=/src\=http/.test(imgh.src);
		if(imgh.width>=150&&k)imgh.className="mousecss";
		//小图片显示原图
		if(imgh.width>10&&imgh.width<150&&k) 
		{		
				imgh.src=imgh.src.replace(/http:\/\/m.tiebaimg.com\/timg.*src=(.*)/gi,function(match, p1)
				 {
					var imgRul=p1.replace(/%3A/ig,":").replace(/%2F/ig,"\/");
					return imgRul; 
				});
		}		
	}
},2000);
})();





