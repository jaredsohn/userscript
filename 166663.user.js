// ==UserScript==
// @name		SilentMouseGesture
// @description		直接划动鼠标以执行打开链接 刷新  后退 贴吧发帖等操作   
// @include		*
// @grant		unsafeWindow
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_addStyle
// @homepage		https://userscripts.org/scripts/show/166663
// @updateURL		https://userscripts.org/scripts/source/166663.meta.js
// @downloadURL		https://userscripts.org/scripts/source/166663.user.js
// @author		yuxingyc
// @version		2013-5-5
// ==/UserScript==
//← → ← →:后退
//↓↑↓ : 网页底部
//↑↓↑ : 网页顶部
//↗↙↗↙或者↙↗↙↗:刷新
//↖↘↖↘:到达贴吧编辑框
//↘↖↘↖:倒计时发帖
//超链接内(↑↓↑或者↓↑↓ ) :打开链接
//页面上画圈:停用/启用 手势打开链接功能


(function(){

var tiebaAd1=" ";//


function getTimeAndStr(){
var tiebaStr;
var now1=new Date();
var hr=now1.getHours();
var min=now1.getMinutes();
if (min<10)min='0'+min;
if (hr==0)
{tiebaStr="午夜12点"+min+"分了!吧主已经睡觉了,放心灌水~";
}
if (hr==1)
{tiebaStr="午夜1点"+min+"分了!这个时间很多人应该都睡觉了吧";
}
if (hr==2)
{tiebaStr="午夜2点"+min+"分了!这个帖子是周公叫我发的!";
}
if (hr==3)
{tiebaStr="已经午夜3点"+min+"分了!举世皆'睡'而我独醒!";
}
if (hr==4)
{tiebaStr="凌晨4点"+min+"分了!吧主已经睡觉了,放心灌水~";
}
if (hr==5)
{tiebaStr="早安啊!清晨5点"+min+"分了!吧主已经睡觉了,放心灌水~";
}
if (hr==6)
{tiebaStr="早安!清晨6点"+min+"分了!吧主还没起床,放心灌水~";
}
if (hr==7)
{tiebaStr="早上7点"+min+"分了!听说吃早餐的时候发帖双倍经验";
}
if (hr==8)
{tiebaStr="早上8点"+min+"分了!听说吃早餐的时候发帖扣经验,好可怕";
}
if (hr==9)
{tiebaStr="早上9点了"+min+"分!一日之计在于晨!";
}
if (hr==10)
{tiebaStr="小尾巴报时:现在是上午10 点"+min+"分!";
}
if (hr==11)
{tiebaStr="上午11点"+min+"分了!不管你饿不饿,反正我是饿了";
}
if (hr==12)
{tiebaStr="午安!中午12点"+min+"分了!听说吃饭时间发帖双倍经验!";
}
if (hr==13)
{tiebaStr="小尾巴提醒您:现在是下午 1 点"+min+"分!";
}
if (hr==14)
{tiebaStr="下午2点"+min+"分了!来火狐吧灌一下水吧!";
}
if (hr==15)
{tiebaStr="下午3点"+min+"分了!小尾巴报时~~~";
}
if (hr==16)
{tiebaStr="现在是下午4点"+min+"分!吃饭时间就快到了";
}
if (hr==17)
{tiebaStr="现在是下午5点"+min+"分!吧主正在吃饭,大家放心灌水~";
}
if (hr==18)
{tiebaStr="已经傍晚6点"+min+"分了!吧主正在吃饭,大家放心灌水~";
}
if (hr==19)
{tiebaStr="晚上7点"+min+"分了!观众朋友们大家晚上好！";
}
if (hr==20)
{tiebaStr="现在是晚上8点"+min+"分!小帅哥,小美女,快来火狐吧玩一下吧~";
}
if (hr==21)
{tiebaStr="现在是晚上9点"+min+"分!快来火狐吧玩一下吧~";
}
if (hr==22)
{tiebaStr="现在是晚上10点"+min+"分!夜班发帖,三倍经验~";
}
if (hr==23)
{tiebaStr="已经晚上11点"+min+"分了!吧主已经睡觉了,放心灌水~";
}

return tiebaStr;
}
//生成可获取鼠标方向的空心大方框,由八个小方框组成

GM_addStyle('#thediv0{position:absolute;width:100px;height:100px;display:none;z-index:99999;');// background:blue;
GM_addStyle('#thediv1{position:absolute;width:30px;height:100px;display:none;z-index:99999;');
GM_addStyle('#thediv2{position:absolute;width:100px;height:100px;display:none;z-index:99999;');
GM_addStyle('#thediv3{position:absolute;width:100px;height:30px;display:none;z-index:99999;');
GM_addStyle('#thediv4{position:absolute;width:100px;height:100px;display:none;z-index:99999;');
GM_addStyle('#thediv5{position:absolute;width:30px;height:100px; display:none;z-index:99999;');
GM_addStyle('#thediv6{position:absolute;width:100px;height:100px;display:none;z-index:99999;');
GM_addStyle('#thediv7{position:absolute;width:100px;height:30px;display:none;z-index:99999;');

var body = document.body;
thediv0= document.createElement("div");thediv0.id = 'thediv0';body.appendChild(thediv0);
thediv1= document.createElement("div");thediv1.id = 'thediv1';body.appendChild(thediv1);
thediv2= document.createElement("div");thediv2.id = 'thediv2';body.appendChild(thediv2);
thediv3= document.createElement("div");thediv3.id = 'thediv3';body.appendChild(thediv3);
thediv4= document.createElement("div");thediv4.id = 'thediv4';body.appendChild(thediv4);
thediv5= document.createElement("div");thediv5.id = 'thediv5';body.appendChild(thediv5);
thediv6= document.createElement("div");thediv6.id = 'thediv6';body.appendChild(thediv6);
thediv7= document.createElement("div");thediv7.id = 'thediv7';body.appendChild(thediv7);



var mousePath="";
var arry=new Array();//路径
var arrnum=0;
//记录鼠标在链接内的Y轴坐标
function recordMouseY(event)
{
	document._clickTarget = event.currentTarget;//记录
	arry[arrnum]=parseFloat(event.clientY);//记录鼠标Y轴路径
	arrnum++;
}
//信息提示和清除鼠标路径
function eventMsgAndClearPath(strHtml,strSize)
{
	var divStr=document.getElementById('thediv7');
	divStr. innerHTML="<font style='background-color:black;' color='yellow' size='"+strSize+"'> "+strHtml+"</font>";
	window.setTimeout(function(){divStr. innerHTML=''},1000);	
	mousePath='';//清除鼠标手势
}

var pageBottom=document.body.scrollHeight-document.documentElement.clientHeight;
//var bdstep;
//var openLink=GM_getValue ('mouseOpenLink','1'); 
//if(openLink==1)bdstep=0;//手势功能开启时..
//else if(openLink==0)bdstep=1;//手势功能关闭时..
//else {openLink=1;bdstep=0; }

//鼠标手势功能
function bodyMouseOver(event) {
	//
	//方向,1上,5下,7左,3右
	//012
	//7 3
	//654


		//(左上)-(右下)  贴吧回复功能
	if(/4040/.test(mousePath))//倒计时发帖
	{
		if(/tieba\.baidu\.com/.test(window.location.host))
		{
			eventMsgAndClearPath("倒计时发帖",2);	
			window.scrollTo('0',pageBottom);	
			var replyCountDown=GM_getValue ('gmCountDown','3');	//倒计时
			var buttonObj = document.getElementById("autoClick1");    
		    if(buttonObj)buttonObj.parentNode.removeChild(buttonObj);
		    var buttonObj4 = document.getElementById("bdAutoClick1");    
			if(buttonObj4)buttonObj4.parentNode.removeChild(buttonObj4);
			$('.new_tiezi_tip:eq(0)').after('<input type="button"   value="点击取消" id="bdAutoClick1">');
			var replyButton3= document.getElementById('bdAutoClick1')
			var ww=setInterval(function()
								{
									replyButton3.value=replyCountDown+'秒后发帖';
									if(replyCountDown<1)
									{
										replyButton3.value='正在发帖';	
										clearInterval(ww);
										getTrailAndSendMsg();
									}
									replyCountDown--;
								}, 1000);		
			replyButton3.addEventListener("mouseenter",function(event)
													{
														clearInterval(ww);
														replyButton3.value='已取消';
														$("#edit_parent").find("div.tb-editor-editarea").html('');
														setTimeout(function()
																	{
																		replyButton3.parentNode.removeChild(replyButton3);
																	},600);
													},false);		
			$("#edit_parent").find("div.tb-editor-editarea").focus();
		}
	}
		//免点击发帖
	else if(/0404/.test(mousePath))
	{
		if(/tieba\.baidu\.com/.test(window.location.host))
		{	
			eventMsgAndClearPath("输入内容",1);
			if(!document.getElementById('autoClick1'))
			{	
				$('.new_tiezi_tip:eq(0)').before('<input type="button"  class="subbtn_bg" value="免点击" id="autoClick1">');
				document.getElementById('autoClick1').addEventListener("mouseenter",getTrailAndSendMsg,false);
			}
			$("#edit_parent").find("div.tb-editor-editarea").focus();
			window.scrollTo('0',pageBottom);
		}
	}

	//1515上下上下  5151下上下上 顶部 底部

	else if(/151/.test(mousePath))
	{
		eventMsgAndClearPath("- 顶部 -",1);
		window.scrollTo('0','0');
	}
	else if(/515/.test(mousePath))
	{
		eventMsgAndClearPath("- 底部 -",2);
		window.scrollTo('0',pageBottom);
	}

	//(左下)-(右上) 刷新
	else if(/6262/.test(mousePath))
	{
		eventMsgAndClearPath(" 正在刷新...",2);
		window.location.href=window.location.href;
	}
	else if(/2626/.test(mousePath))
	{
		eventMsgAndClearPath(" 正在刷新...",2);
		window.location.href=window.location.href;
	}
	//左 与 右
	else if(/7373/.test(mousePath))//左右左
	{	
		eventMsgAndClearPath("- 后退 -",1);	
		history.go(-1);
	}
	/*
	else if(/3737/.test(mousePath))//右左右
	{
		eventMsgAndClearPath("- 前进 -",2);
		history.go(1);
	}	
	*/

	//鼠标转圈 关闭-开启 手势打开链接功能
	else if(mousePath.length>8)
	{
		if(GM_getValue ('mouseOpenLink',true))
		{
		eventMsgAndClearPath("<font color='white'>手势打开链接-关<\/font>",2);
		GM_setValue ('mouseOpenLink' , false);
		}else
			{
				eventMsgAndClearPath("手势打开链接-开",2);
				GM_setValue ('mouseOpenLink' , true);
			}

	}

	var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

	//上左
	thediv0.style.display="block";
	thediv0.style.left=event.clientX - 115+'px';
	thediv0.style.top=event.clientY + scrollTop - 115+'px';
	//上中
	thediv1.style.display="block";
	thediv1.style.left=event.clientX - 15+'px';
	thediv1.style.top=event.clientY + scrollTop - 135+'px';
	//上右
	thediv2.style.display="block";
	thediv2.style.left=event.clientX + 15+'px';
	thediv2.style.top=event.clientY + scrollTop - 115+'px';
	//中右
	thediv3.style.display="block";
	thediv3.style.left=event.clientX + 35+'px';
	thediv3.style.top=event.clientY + scrollTop - 15+'px';
	//下右
	thediv4.style.display="block";
	thediv4.style.left=event.clientX + 15+'px';
	thediv4.style.top=event.clientY + scrollTop + 15+'px';
	//下中
	thediv5.style.display="block";
	thediv5.style.left=event.clientX - 15+'px';
	thediv5.style.top=event.clientY + scrollTop + 35+'px';
	//下左
	thediv6.style.display="block";
	thediv6.style.left=event.clientX - 115+'px';
	thediv6.style.top=event.clientY + scrollTop + 15+'px';
	//中 左
	thediv7.style.display="block";
	thediv7.style.left=event.clientX - 135+'px';
	thediv7.style.top=event.clientY + scrollTop - 15+'px' ;

}



//撤消打开链接
function stopOpenLink()
{
	if(setTimeOpenlink>0)
	{
		window.clearTimeout(setTimeOpenlink);
		setTimeOpenlink=0;
		eventMsgAndClearPath("<font color='white'>正在取消...</font>",2);
	}
}
var clearMousePath;
function clearMouseTimeOut()
{
	window.clearTimeout(clearMousePath);
	clearMousePath=setTimeout(function(){mousePath='';},500);//一个方向手势超时时间 (下同)

}
//moveDiv0(event)～moveDiv7(event)接收鼠标8个方向

//上左
function moveDiv0(event){
	stopOpenLink();
	if(mousePath.charAt(mousePath.length-1)!='0')mousePath+='0';
	bodyMouseOver(event);
	clearMouseTimeOut();
}

//上中
function moveDiv1(event)
{
	if(mousePath.charAt(mousePath.length-1)!='1')mousePath+='1';
	bodyMouseOver(event);
	clearMouseTimeOut();
	//清除数组,避免手势打开链接
	arry.length=0;
	arrnum=0;
	xx.length=0;

}
//上右
function moveDiv2(event)
{
	stopOpenLink();
	if(mousePath.charAt(mousePath.length-1)!='2')mousePath+='2';
	bodyMouseOver(event);
	clearMouseTimeOut();

}
//中右
function moveDiv3(event)
{
	stopOpenLink();
	if(mousePath.charAt(mousePath.length-1)!='3')mousePath+='3';
	bodyMouseOver(event);
	clearMouseTimeOut();
}
//下右
function moveDiv4(event)
{
	stopOpenLink();
	if(mousePath.charAt(mousePath.length-1)!='4')mousePath+='4';
	bodyMouseOver(event);
	clearMouseTimeOut();
}
//下中
function moveDiv5(event){
	if(mousePath.charAt(mousePath.length-1)!='5')mousePath+='5';
	bodyMouseOver(event);
	clearMouseTimeOut();
	//清除数组,避免手势打开链接
	arry.length=0;
	arrnum=0;
	xx.length=0;

}
//下左
function moveDiv6(event)
{
	stopOpenLink();
	if(mousePath.charAt(mousePath.length-1)!='6')mousePath+='6';
	bodyMouseOver(event);
	clearMouseTimeOut();
}
//中左
function moveDiv7(event)
{
	stopOpenLink();
	if(mousePath.charAt(mousePath.length-1)!='7')mousePath+='7';
	bodyMouseOver(event);
	clearMouseTimeOut();
}



var xx=new Array();
var	setTimeOpenlink;
var	openLink=true;
//提取Y路径
function readMouseY(event) {
	var res=0,resup=0,resdown=0,zz=0;
	for(var i=0;i<arry.length-2;i++)
	{
		res=arry[i+1]-arry[i];
		if(res>0) {xx[zz]=res;zz++;}
		if(res<0) {xx[zz]=res;zz++;}
	}
	for(var i=0;i<xx.length-1;i++)
	{
		if(xx[i]>0 && xx[i+1]<0)resup++;
		if(xx[i]<0 && xx[i+1]>0)resdown++;
	}
	res=resup+resdown;//鼠标在链接内的上下移动次数
	if(res>1)
	{
		if(GM_getValue ('mouseOpenLink',true))
		{
			eventMsgAndClearPath("✿正在打开链接",2);
			setTimeOpenlink=setTimeout(function()
										{
											window.location.href=document._clickTarget.href;//打开链接
											
										},'500');
		}else eventMsgAndClearPath("<font color='white'>该功能未启用</font>",2);
	} 
	arry.length=0;
	arrnum=0;
	xx.length=0;
	res=0;
	resup=0;
	resdown=0;
	zz=0;
}


var links = document.querySelectorAll("a");
for(i=0;i<links.length;i++){
links[i].addEventListener("mousemove",recordMouseY, false);
links[i].addEventListener("mouseenter",bodyMouseOver, false);
links[i].addEventListener("mouseout",readMouseY, false);
}
var thebody = document.querySelectorAll("body");

document.body.addEventListener("mouseover",bodyMouseOver, false);

//moveDiv0～moveDiv7接收鼠标方向，添加到浮动div
thediv0.addEventListener("mousemove",function(event){moveDiv0(event);},false);
thediv1.addEventListener("mousemove",function(event){moveDiv1(event);},false);
thediv2.addEventListener("mousemove",function(event){moveDiv2(event);},false);
thediv3.addEventListener("mousemove",function(event){moveDiv3(event);},false);
thediv4.addEventListener("mousemove",function(event){moveDiv4(event);},false);
thediv5.addEventListener("mousemove",function(event){moveDiv5(event);},false);
thediv6.addEventListener("mousemove",function(event){moveDiv6(event);},false);
thediv7.addEventListener("mousemove",function(event){moveDiv7(event);},false);



//以下只适用百度贴吧

//保存尾巴
function saveBaiduTail()
{

	var baiduInputText=$("#edit_parent").find("div.tb-editor-editarea").html();
	if(confirm('(提示:尾巴过长会影响吧友浏览帖子)\n将以下内容设为自定义尾巴?\n\n'+baiduInputText))
	{
	GM_setValue ('gmCustomTail',baiduInputText);

	}
}

//显示按钮
function showBdButton()
{
	for(i=2;i<9;i++)
	{
	var nnn=document.getElementById('bdButtonaaa'+i);
	nnn.style.visibility="visible";
	
	}
		//初始化未启用功能的按钮
	
	if(!GM_getValue ('gmHourTailOnOff',true))
	{
 	var nnn=document.getElementById('bdButtonaaa2');
	nnn.value="每小时尾巴已禁用";
	nnn.style.backgroundColor ='#F0F0F0';
	}
	if(!GM_getValue ('gmStayTimeTailOnOff',true))
	{
 	var nnn=document.getElementById('bdButtonaaa3');
	nnn.value="停留时间尾巴已禁用";
	nnn.style.backgroundColor ='#F0F0F0';
	}
	if(!GM_getValue ('gmCustomTailOnOff',true))
	{
 	var nnn=document.getElementById('bdButtonaaa4');
	nnn.value="自定义尾巴已禁用";
	nnn.style.backgroundColor ='#F0F0F0';
	}
		
}

//隐藏按钮
function hideBdButton()
{
	for(i=2;i<9;i++)
	{
	var nnn=document.getElementById('bdButtonaaa'+i);
	nnn.style.visibility="hidden"; 

	}
}

//设置尾巴符号
function setTailBr()
{

 var nnn=prompt("设置尾巴符号\n\n请输入符号",GM_getValue ('gmSetBr','✿'));
	if(nnn)
	{
   		GM_setValue ('gmSetBr',nnn);
  		alert('尾巴符号已设置为'+nnn)

 	}  

}

//设置发帖倒计时

function setCountDown()
{
	var nnn=prompt("设置发帖倒计时\n\n请输入一个数字",GM_getValue ('gmCountDown','3'));
	if(nnn)
	{
    	if(/^\d+$/.test(nnn))
    	{
    
   			  GM_setValue ('gmCountDown',nnn);
  			  alert('倒计时时间已设置为'+nnn+'秒')
  		  }else {
  		  	alert('只能输入数字!');
  		  	setCountDown();
  		  	}
 	}  
}

//开-关 每小时尾巴
function hourTailOnOff()
{	
	var nnn=document.getElementById('bdButtonaaa2');
 	if(GM_getValue ('gmHourTailOnOff',true))
 	{
	nnn.value="每小时尾巴已禁用";
	nnn.style.backgroundColor ='#F0F0F0';
	GM_setValue ('gmHourTailOnOff',false);
	}else
		{
		GM_setValue ('gmHourTailOnOff',true);
		nnn.value="每小时尾巴已启用";
		nnn.style.backgroundColor ='#D1E7FF';
		}
}

//开-关 自定义尾巴
function customTailOnOff()
{
	var nnn=document.getElementById('bdButtonaaa4');
 	if(GM_getValue ('gmCustomTailOnOff',true))
 	{
	nnn.value="自定义尾巴已禁用";
	nnn.style.backgroundColor ='#F0F0F0';
	GM_setValue ('gmCustomTailOnOff',false);
	}else
		{
		GM_setValue ('gmCustomTailOnOff',true);
		nnn.value="自定义尾巴已启用";
		nnn.style.backgroundColor ='#D1E7FF';
		}
}

//开-关 停留时间尾巴
function stayTimeTailOnOff()
{
	var nnn=document.getElementById('bdButtonaaa3');
 	if(GM_getValue ('gmStayTimeTailOnOff',true))
 	{
	nnn.value="停留时间尾巴已禁用";
	nnn.style.backgroundColor ='#F0F0F0';
	GM_setValue ('gmStayTimeTailOnOff',false);
	}else
		{
		GM_setValue ('gmStayTimeTailOnOff',true);
		nnn.value="停留时间尾巴已启用";
		nnn.style.backgroundColor ='#D1E7FF';
		}
}

//生成尾巴和发表回复
function getTrailAndSendMsg(){
		var theTaileee='';
		var theTailfff='';
		var theTailggg='';
		var tiebaReply;
		var	setBr='<br>'+GM_getValue ('gmSetBr','✿');
			 if(GM_getValue('gmStayTimeTailOnOff',true))
			 	{
			 	theTaileee=setBr+getStayTimeSentence();//停留时间
			 	}else theTaileee='';
			if(GM_getValue('gmCustomTailOnOff',true))
				{
				theTailfff='<br>'+GM_getValue ('gmCustomTail','✿悄悄的我走了，正如我悄悄的来;我挥一挥鼠标,不带走半点经验。');//自定义尾巴 
				} else theTailfff=''
			if(GM_getValue('gmHourTailOnOff',true))
				{ 
				theTailggg=setBr+getTimeAndStr();//每小时
				}else {
					theTailggg='';
					tiebaAd1='';
					}	
			tiebaReply=$("#edit_parent").find("div.tb-editor-editarea").html()+'<br><br><br><br>'+theTaileee+theTailfff+theTailggg+tiebaAd1;
			$("#edit_parent").find("div.tb-editor-editarea").html(tiebaReply);
			$('.subbtn_bg[value=" 发 表 "]').click();
}


//获取停留时间尾巴
function getStayTimeSentence()
{
	var now3=new Date();
	var hr3=now3.getHours();
	var min3=now3.getMinutes();
	var sec3=now3.getSeconds();
	var replaySeconds=hr3*3600+min3*60+sec3;//回复时间转为秒
	var enterSeconds=hr2*3600+min2*60+sec2;//进帖时间转为秒
	var stayTime=replaySeconds-enterSeconds;
	if(stayTime<0)stayTime=86400-enterSeconds+replaySeconds;//0点之前秒数＋0点之后秒数
	var hourReplyStr=hr2+"点"+min2+"分"+sec2+"秒，我悄悄的来，正如我"+hr3+"点"+min3+"分"+sec3+"秒悄悄的走;<br>我挥一挥鼠标,在这个帖子里停留了"+stayTime+"秒。";	
	return hourReplyStr;		
}

var _windowMousePath;
var $;
if(/tieba\.baidu\.com/.test(window.location.host))
{
	_windowMousePath = typeof unsafeWindow == 'undefined' ? window: unsafeWindow;
	$ = _windowMousePath.$;

	//获取进入帖子时间
	var now2=new Date();
	var hr2=now2.getHours();
	var min2=now2.getMinutes();
	var sec2=now2.getSeconds();
	//插入按钮
	$('.new_tiezi_tip:eq(0)').after('<div>　　　　'+
								'<input id="bdButtonaaa0" type="button" style="background:#BADAFF;" value="发表">'+
								'<input id="bdButtonaaa1" type="button" style="background:#BADAFF;" value="设置">'+								
								'<input id="bdButtonaaa8" type="button" style="visibility:hidden;background:#F0F0F0;" value="关闭">'+								
								'<input id="bdButtonaaa5" type="button" style="visibility:hidden;background:#D1E7FF;" value="回复框内容设为尾巴">'+
								'<input id="bdButtonaaa2" type="button" style="visibility:hidden;background:#D1E7FF;" value="每小时尾巴已启用">'+
								'<input id="bdButtonaaa3" type="button" style="visibility:hidden;background:#D1E7FF;" value="停留时间尾巴已启用">'+
								'<input id="bdButtonaaa4" type="button" style="visibility:hidden;background:#D1E7FF;" value="自定义尾巴已启用">'+								
								'<input id="bdButtonaaa6" type="button" style="visibility:hidden;background:#D1E7FF;" value="设置倒计时">'+
								'<input id="bdButtonaaa7" type="button" style="visibility:hidden;background:#D1E7FF;" value="尾巴符号">'+
								'</div>');
	document.getElementById('bdButtonaaa0').addEventListener("click",function(event){ getTrailAndSendMsg();},false);							
	document.getElementById('bdButtonaaa1').addEventListener("click",function(event){ showBdButton();},false);
	document.getElementById('bdButtonaaa8').addEventListener("click",function(event){ hideBdButton();},false);	
	document.getElementById('bdButtonaaa5').addEventListener("click",function(event){ saveBaiduTail();},false);						
	document.getElementById('bdButtonaaa6').addEventListener("click",function(event){ setCountDown();},false);
	document.getElementById('bdButtonaaa7').addEventListener("click",function(event){ setTailBr();},false);		
	document.getElementById('bdButtonaaa2').addEventListener("click",function(event){ hourTailOnOff();},false);		
	document.getElementById('bdButtonaaa3').addEventListener("click",function(event){ stayTimeTailOnOff();},false);	
	document.getElementById('bdButtonaaa4').addEventListener("click",function(event){ customTailOnOff();},false);									

}
//脚本加载完成 提示
var divStr=document.getElementById('thediv3');
divStr. innerHTML="<font size='3'>✿</font>";
window.setTimeout(function(){divStr. innerHTML=''},500);
	
		
})();