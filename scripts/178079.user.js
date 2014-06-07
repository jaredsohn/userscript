// ==UserScript==
// @name        TiebaChatRoom
// @namespace   yuxingyc
// @description -
// @include     http://tieba.baidu.com/*
// @include     http://wapp.baidu.com/*
// @include		http://localhost/_tieba_baidu_com/*
// @grant		GM_setValue
// @grant		GM_getValue
// @grant		GM_xmlhttpRequest
// @grant		GM_openInTab
// @grant		GM_addStyle
// @grant		unsafeWindow
// @updateURL      https://userscripts.org/scripts/source/178079.meta.js
// @downloadURL    https://userscripts.org/scripts/source/178079.user.js
// @version     1.6.3
// ==/UserScript==
(function(){

var ww=document.documentElement.clientWidth;
var hh=document.documentElement.clientHeight;
if(ww<600&&hh<350)return;//小窗口不弹出提醒
//图片显示
var picMode=0; //picMode=1 压缩大图; picMode=0 徽缩

//滚轮滚动
var smooth_scroll=2;// smooth_scroll=2 由脚本控制的滚动,; smooth_scroll=1 平滑滚动; smooth_scroll=0 浏览器默认

//滚屏
var scrollTime=5;//单次滚动间隔时间 (单位:秒 ;默认 3)
var scrollH=100;//单次滚动距离 (单位:像素 ;默认 35)  , 同时适用于 滚轮滚动smooth_scroll=2;

//处理尾巴
var hideTail=0;//hideTail=0 不隐藏尾巴; hideTail=1 隐藏尾巴 (会误杀含有----或－－符号的正常内容)

//设置聊天窗口的位置
var Ax=(ww-542)/2;//聊天窗口网页 右边 的距离; Ax=0 最右边  ,  Ax=(ww-542)/2 居中

var Ay=(hh-460)/2;//聊天窗口离 顶部 的距离; Ay=0 消息提示在顶部 , Ay=hh-20 消息提示在底部  .  Ay=(hh-460)/2 居中

//设置消息提示的位置
var Bx=0;//悬浮提示框离网页 右边 的距离; Bx=0 在右边 ,Bx=ww-100 在左边

var By=0;//悬浮提示框离 顶部 的距离;By=0 消息提示在顶部 , By=hh-20 消息提示在底部  

//聊天窗口样式

var borderColor="rgb(200,200,200)";//边框颜色
var STYLE=[

//聊天内容显示区
,".chat_name{font-family:微软雅黑;font-size:14px;color:rgb(255,255,255) }"//用户名的字体大小 颜色

,".chat_msg{font-family:微软雅黑;font-size:14px;color:rgb(255,255,1) }"//内容的字体大小 颜色 

//聊天内容显示区的背景颜色 图片 490X300    |  rgba(0,0,0,0.7)半透明
,".chat_bg{background:rgb(0,0,0) url('http://localhost/1.jpg');border: 1px solid "+borderColor+"}"

,".chat_rep{color:gray}"//回复数颜色
,".chat_lzl{font-family:微软雅黑;font-size:14px;color:pink}"//楼中楼 1楼颜色

/* 输入框 */
//输入框的字体大小体颜色
,".chat_cc{font-family:微软雅黑;font-size:14px;color:rgb(255,255,1); width:490px;height:60px;}"

//输入框的 背景颜色或图片490X60 
,".chat_dd{background:rgb(70, 70, 70) url('http://localhost/2.jpg');border: 1px solid "+borderColor+"}"

/*窗体 */
//窗体背景颜色 
,".chat_wd{background: rgba(240,240,240,0.9) url('');border: 1px solid "+borderColor+"}"
//下拉选项颜色
,"#bdchatroom select{background: rgba(255, 255, 255,0.4) url(''); border:1px solid "+borderColor+"}"

,".chat_ovf{OVERFLOW-Y: auto; OVERFLOW-X:hidden;}"
,".chat_cur{cursor:pointer}"
,".chat_margin{margin-left:3px;margin-right:3px}"
,".chat_face{display:inline;border:1px solid gray;margin:5px;background:white;border-radius: 4px;}"
];

var autoCheck=0; //autoCheck=1 自动检测主题数量(右上角悬浮框显示iiiiiiiiii吧主题数量) , autoCheck=0不检测

var flashing=0;//flashing=1 检测主题数量时,网页右上角的按钮有闪光, flashing=0 无闪光

//iiiiiiiiii
var KW="iiiiiiiiii";//聊天记录保存地点


//用户名黑名单, 不显示这些用户的发言
var blackList=["请按格式添加黑名单111","请按格式添加黑名单222"];

//var wapurl="http://wapp.baidu.com/mo/q-0--0-sz%40224_220%2C,sz@240_320-1-2-0--0/";
var wapurl="http://wapp.baidu.com/mo/q-0--0-sz%40240_320%2C,sz@320_240-1-3-0--2/"
var msgDataUrl=wapurl+"m?tn=bdBIW&word="+KW+"&lp=5016";//wap版贴吧"关于本吧"网址

var tiebaKw=wapurl+"/m?kw="+KW+"&lp=1030";
var fid, tbs, checkMylike;

var localTest=location.hostname=="localhost";
if(localTest){
msgDataUrl="http://localhost/_tieba_baidu_com/贴吧信息firefox.xht";
tiebaKw="http://localhost/_tieba_baidu_com/zzzzzzzzz.xht";
wapurl="http://localhost/_tieba_baidu_com/";
}



var body=document.body;
function ADD(el,pos,s){
	var b=el.indexOf("|");
	var f=b>-1?el.slice(0,b):el;
	var a=document.createElement(f);
	if(b>-1)a.appendChild(document.createTextNode(el.slice(b+1)));
	if(s)for(var i=2,len=arguments.length;i<len;i++){
		a.setAttribute(arguments[i][0],arguments[i][1]); 
	}
	pos.appendChild(a);	
	return a;
}

function mouseMoveElement(onEl,moveEl,fn){
	var p=false,xxx,yyy;	
	onEl.onmousedown=function(e){
		p=true;		
		xxx =  e.pageX- moveEl.offsetLeft;
		yyy =  e.pageY - moveEl.offsetTop;
		if(typeof(fn)=="function")fn();
		return false;
	}
	body.addEventListener("mousemove",function(e){
		if(!p)return;		
		moveEl.style.left=e.pageX - xxx+"px";
		moveEl.style.top=e.pageY - yyy+"px";					
		},false);
	onEl.onmouseup=function(){p=false}
};
function addOption(el,text1,value1){
	el.options.add(new Option(text1, value1));
}
var aaa="1234567890abcdefghijklmnopqrstuvwxyz`~!@#$%^&*+:;'\\,./<>|{}[]\"()?_-=";
var bbb="zaq1xsw2cde3vfr4bgt5nhy6mju7ki8lo9p0ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function encode(str){
	var psw=parseInt(Math.random()*50+1);
	var nnn=bbb.slice(psw)+bbb.slice(0,psw)+"()?_-=";
	var resArr=[psw+","],fff=[];
	for(var i=0;i<=aaa.length;i++)fff[aaa.charAt(i)]=nnn.charAt(i);
	for(var i=0;i<str.length;i++){
		var a=fff[str.charAt(i)];
		if(a){resArr.push(a)}
		else{
			var c=(parseInt(str.charCodeAt(i))+psw).toString(32);
			resArr.push("#"+c+";");		
		}
	}
	return resArr.join("");
}
function decode(res){
	var strArr=res.match(/(\d+),(.+$)/);
	var psw=parseInt(strArr[1]);
	var rrr=strArr[2].replace(/#(.*?);/g,function(p1,p2){return String.fromCharCode(parseInt(p2,32)-psw)});
	var nnn=bbb.slice(psw)+bbb.slice(0,psw)+"()?_-=";
	var ggg=[],deArr=[];
	for(var i=0;i<bbb.length;i++)ggg[nnn.charAt(i)]=aaa.charAt(i);
	for(var i=0;i<rrr.length;i++){
		var a=ggg[rrr.charAt(i)];
		if(a){deArr.push(a)}else deArr.push(rrr.charAt(i))
	}
	return deArr.join("");
}

GM_addStyle(STYLE.join(""));


var textFace=["^_^","(o゜▽゜)o☆","⊙﹏⊙‖","ㄟ( ▔, ▔ )ㄏ","≧ε ≦","┳＿┳"
,"Σ(っ °Д °;)っ","(╬▼皿▼）","\"o((>ω< ))o","⊙▽⊙","\\(\"▔□▔)/","↖(￣▽￣\")","(づ￣3￣)づ","(*￣▽￣)y","o(≧口≦)o"
,"(￣ε￣*)","/(ㄒoㄒ)/~~","(￣ε￣*)","<(￣︶￣)>","o(≧v≦)o","╮(╯3╰)╭"
,"凸(艹皿艹 )","罒ω罒","(◕ω＜)☆","(✿✪‿✪｡)ﾉ","（◕(ｪ)◕）","(●'◡'●)ﾉ♥"
,"｡◕‿◕｡","m(_ _)m","(⊙x⊙;)","( =∩ω∩= )"
,"╮(╯▽╰)╭","(≧3≦)/","(＠_＠;)?","o(*￣▽￣*)ブ","(-__-)b"
];


var MAX=10000;
function msgWindow(){
	var R=this;
	R.msgDiv=ADD("div",body,["id","bdchatroom"],["class","chat_wd"],["style","text-align:left;padding:10px;padding-top:3px;z-index:10000;display:none;overflow:hidden;text-align:middle;position:fixed;font-size: 12px;border-radius: 4px;"]);	
	R.topDiv=ADD("div",R.msgDiv,["style","width:500px;height:20px;"]);
	R.topDivL=ADD("div",R.topDiv,["style","float:left;width:460px;height:20px;"]);
	R.topDivL1=ADD("div",R.topDivL,["style","float:left;width:auto;height:20px;"]);
	R.topDivR=ADD("div",R.topDiv,["style","float:right;width:30px;height:20px;"]);
	R.closeBtn=ADD("a|关闭",R.topDivR,["href","javascript:;"]);
	R.msgContent=ADD("div",R.msgDiv,["class","chat_bg chat_ovf"],["style","padding: 5px;width:490px;height:300px;"]);
	R.menuBar=ADD("div",R.msgDiv,["style","width:500px;height:20px;border: 0px solid rgb(220, 220, 220);border-bottom:0px;"]);
	R.inputDiv=ADD("div",R.msgDiv,["class","chat_cc chat_dd chat_ovf"],["style","padding:5px;"],["contenteditable","true"]);
	R.bottomDiv=ADD("div",R.msgDiv,["style","display:inline;padding-left:2px;padding-top:5px;width:500px;height:20px;border: 0px solid rgb(220, 220, 220);"]);
	R.sendBtn=ADD("input",R.bottomDiv,["type","button"],["title","Enter"],["value"," 发送 "],["style","margin-top:5px;border-radius:3px;background:rgb(226,238,252);  border:1px solid rgb(145,193,245);"])
	R.tipsBar=ADD("span",R.msgDiv,["style","padding-left:3px;color:red"]);
	R.tipsBar2=ADD("span",R.topDivL1,["style","padding-left:3px;color:gray"]);	
	R.checkbox_scroll=ADD("input",R.menuBar,["style","float:right;margin-top:5px;margin-right:15px"],["type","checkbox"],["checked","true"],["title","勾选自动刷新"]);
	
	var faceDiv=ADD("div",R.menuBar,["style","padding-bottom:3px;px;padding-top:3px;position:absolute;top:0px;background:rgba(255,255,255,0.9);border-radius: 4px;"]);
	R.faceBtn=ADD("a|表情",R.menuBar,["href","javascript:;"],["style","margin-left:5px;margin-right:5px"]);		
	R.faceBtn.onclick=function(e){
		faceDiv.style.left=40+"px";
		faceDiv.style.top=parseInt(R.msgContent.style.height.replace(/px/i,""))-70+"px";
		console.log(parseInt(R.msgContent.style.height.replace(/px/i,""))+1)
		for(var i=0;i<textFace.length;i++){
		ADD("div|"+textFace[i],faceDiv,["class","chat_face chat_cur"]).onclick=function(){
		faceDiv.style.display="none";
		R.inputDiv.textContent+=this.textContent};
		if((i+1)%4==0)ADD("br",faceDiv)
		}
		faceDiv.onclick=function(){faceDiv.style.display="none"}
		R.faceBtn.onclick=function(){faceDiv.style.display=faceDiv.style.display=="block"?"none":"block"};
	}
	
	var timer,timer1,speed=1,aa,nn;
	var animScroll=function(s){
		clearInterval(timer1)
		aa=s>0?function(){R.msgContent.scrollTop+=1}:function(){R.msgContent.scrollTop-=1}
		nn=0;		
		timer1=setTimeout(function(){			
			clearInterval(R.timer);			
			 R.timer=setInterval(function(){
			  aa();			  
			  if(++nn>scrollH+speed*20-20){nn=0, speed=1;clearInterval(R.timer)}
			  if(s!=999)if(R.msgContent.scrollTop==0|| R.msgContent.clientHeight+R.msgContent.scrollTop==R.msgContent.scrollHeight){
				clearInterval(R.timer2);
				clearInterval(timer1);
				speed=1, nn=0;				
			  }
			 },20/speed);
		},30);				
	};
	R.autoScroll=function(s,fn){
		clearInterval(R.timer2);
		R.timer2=setInterval(function(){
		animScroll(s);
		if(R.msgContent.clientHeight+R.msgContent.scrollTop==R.msgContent.scrollHeight){
			clearInterval(R.timer2);
			speed=1;
			if(typeof(fn)=='function')setTimeout(function(){fn()},1000*scrollTime);
		}
		},1000*scrollTime);
	};

	var brs=(/chrome/i.test(navigator.userAgent))?'mousewheel':'DOMMouseScroll';

	 if(smooth_scroll==1)R.msgDiv.addEventListener(brs,function(e){
		speed+=0.5;
		animScroll(-e.wheelDelta||e.detail);
		e.preventDefault()
	},false);	
	else if(smooth_scroll==2)R.msgDiv.addEventListener(brs,function(e){
		var c=-e.wheelDelta||e.detail;
		R.msgContent.scrollTop+=scrollH*c/Math.abs(c);
		e.preventDefault()
	},false);
	
	R.msgDiv.style.zIndex=MAX++;
	mouseMoveElement(R.topDivL,R.msgDiv,function(){R.msgDiv.style.zIndex=MAX++});
	R.showTips=function(str){
		R.tipsBar.textContent=str;
		var a=this;
		setTimeout(function(){a.tipsBar.textContent=""},3000);
	}
	R.closeBtn.onclick=function(){R.msgDiv.parentNode.removeChild(R.msgDiv);clearInterval(timer2)};
	R.insertMessage=function(){}
	R.wapPost=function(postData){
		GM_xmlhttpRequest({ 
		   method:"post", 
			url:"http://tieba.baidu.com/mo/q-0/m", 
			data:postData,
			headers:{ 
			"Content-Type": "application/x-www-form-urlencoded" 
			}, 
		   onload:function(response) { 				
				R.checkbox_scroll.checked=true;
				//getData(_url);					
				if(/请输入下图验证码:/.test(response.responseText)){
					R.showTips("需要验证码!未关注该帖子所在贴吧?");
				}else {						
					R.showTips("发送成功!");
					R.inputDiv.innerHTML="";
					R.insertMessage(response.responseText);
				}
		   },
		   onerror:function(e){
			R.showTips("发送失败,请检查网络!");
		   }
		});	
	}
}


var msgSmallDiv=ADD("div",body,["style","z-index:9999999;width:auto;height:20px;background:white;overflow:hidden;text-align:left;position:fixed;font-size: 12px;border: 1px solid rgb(220, 220, 220);border-radius: 4px;padding-left:3px;padding-right:3px"]);

msgSmallDiv.style.top=By+"px";
msgSmallDiv.style.right=Bx+"px"; 
var enterBtn2=ADD("span",msgSmallDiv,["title","当前帖子"],["style","margin-right:5px;cursor:pointer"]);

var enterBtn=ADD("span|chat",msgSmallDiv,["title","主窗口"],["class","chat_cur"]);
ADD("span| | ",msgSmallDiv);
closeMsgBtn=ADD("span|☓",msgSmallDiv,["class","chat_cur"]);

enterBtn.onclick=function(){
	this.onclick=function(){}
	init();
	init=function(){};
	this.onclick();	
}
closeMsgBtn.onclick=function(){msgSmallDiv.style.display="none"}	

var autoCheckFn;
var inBlackList=[];
for(var i in blackList)inBlackList[blackList[i]]=1;	
var init=function(){
	autoCheckFn=function(){		
		checkMsg();
		startTimer();
	}
	enterBtn.onclick=function(){	
		msgNum=0;
		enterBtn.textContent="||||"
		if(R.msgDiv.style.display=="block")return;
		getData();
		startTimer();
		R.msgDiv.style.display="block";
	}
	closeMsgBtn.onclick=function(){
		msgSmallDiv.style.display="none";
		clearInterval(timer2);
	}
	var R=new msgWindow();
	var select_container=ADD("div|检测时间:",R.menuBar,["style","display:inline"],["title","检测到主题数量有变化,则自动刷新"]);
	var select_time=ADD("select",select_container);
	select_time.onchange=function(){
		tmp=check_time1=this.value;
		GM_setValue("time",this.value);
	}
	
	var check_time1=parseInt(GM_getValue("time","10"));
	addOption(select_time,check_time1+"秒",check_time1);
	var timeArr=[3,5,8,10,15,20,30,60,90,99];
	for(var i in timeArr)addOption(select_time,timeArr[i]+"秒",timeArr[i]);

	var select_container2=ADD("div| 显示数量",R.menuBar,["style","display:inline"]);
	var select_setNum=ADD("select",select_container2);

	var titleNum=GM_getValue("Num1","10");
	addOption(select_setNum,"-"+titleNum+"-",titleNum);
	
	var numArr=[5,10,20,30];
	for(var i in numArr)addOption(select_setNum,numArr[i]+"条",numArr[i]);
	ADD("a|刷新",R.menuBar,["href","javascript:;"],["style","margin-left:10px;display:inline"]).onclick=getData;
	var select_modeCtn=ADD("div| | 发言模式:",R.menuBar,["style","display:inline"]);
	var select_setmode=ADD("select", select_modeCtn);
	var insertTitle,insertLink;
	select_setmode.onchange=function(){
		R.inputDiv.innerHTML="";
		R.inputDiv.setAttribute("contenteditable","true");
		if(this.value=="1"){
			R.tipsBar.textContent="主题模式:第一行是标题(26字以内).回车键换行之后的是帖子内容.";
		}else if(this.value=="2"){
			R.tipsBar.textContent="请输入标题和链接";
			R.inputDiv.setAttribute("contenteditable","false");
			ADD("br",R.inputDiv);
			insertTitle=ADD("input",ADD("div|标题:",R.inputDiv,["style",""]),["maxlength","26"],["type","text"],["style","width:400px"]);
			insertLink=ADD("input",ADD("div|链接:",R.inputDiv,["style",""]),["type","text"],["style","width:400px"]);			
		}else {
			R.tipsBar.textContent="普通模式:直接输入你要说的话.";
		}		
	};
	var modeArr=["普通","主题","转帖"];
	for(var i in modeArr)addOption(select_setmode,modeArr[i],i);
	ADD("a|新窗口",R.menuBar,["href","javascript:;"],["style","margin-left:10px;display:inline"]).onclick=function(){	
			chatRoom2("","");
		}
	
	
	R.closeBtn.onclick=function(){
		R.msgDiv.style.display="none";
	};	
	select_setNum.onchange=function(){		
		GM_xmlhttpRequest({ 
		   method:"post", 
		   url:wapurl+"/urs", 
		   data:"frsrn="+this.value+"&pbrn="+this.value+"&src=2&word="+encodeURI(KW),
		   headers:{ 
			"Content-Type": "application/x-www-form-urlencoded" 
		   },
		});
		GM_setValue("Num1",this.value);
	};
	
	R.inputDiv.onkeyup=function(e){		
		var len=this.textContent.length;
		if(select_setmode.value!="0"){
			len=this.innerHTML.replace(/<br.+$/g,"").length+4;
		}
		var str=select_setmode.value=="0"?"超出":"标题超出";
		R.tipsBar.textContent=len>30?str+(len-30)+"个字":"";
		if(select_setmode.value=="0"&&e.keyCode==13)R.sendBtn.onclick();
	}
	
	R.sendBtn.onclick=function(){		
		if(R.sendBtn.disabled)return;
		
		var title,content,htm=R.inputDiv.innerHTML.replace(/<br.*?>/g,"<br>");
		if(select_setmode.value=="1"){
			title="[主题]"+htm.match(/(.*?)<br/)[1];
			content=htm.match(/<br>(.+$)/)[1].replace(/&/g,escape("&")).replace(/\+/g,"%2B");
		}else if(select_setmode.value=="2"){
			title="[转帖]"+insertTitle.value;
			content=insertLink.value.replace(/\s+/g,"");
			if(!/(http|https|ftp):[/\\]{2}(\w+\.)?\w+\.\w{2,4}([/\\][/\\a-z\?#\.0-9%&=]+)?/.test(content)){R.showTips("链接有错误!");return;}
			content=encode(content)+"!!!!";
		}
		else {
			title=R.inputDiv.textContent;
			content="<br>";
		}
		
		title=title.replace(/&/g,escape("&")).replace(/\+/g,"%2B");
		R.sendBtn.disabled=true;
		setTimeout(function(){R.sendBtn.disabled=false},5000);
		if(title.length>0){
			GM_xmlhttpRequest({ 
			   method:"post", 
			   url:"http://tieba.baidu.com/f/commit/thread/add", 
			   data:"kw="+encodeURI(KW)+"&ie=utf-8&rich_text=1&floor_num=0&fid="+fid+"&tid=0&prefix=&title="+encodeURI(title)+"&content="+encodeURI(content)+"&anonymous=0&tbs="+tbs+"&tag=11&new_vcode=1", 
			   headers:{ 
				"Content-Type": "application/x-www-form-urlencoded" 
			   }, 
			   onload:function(response) { 
				   var data1=JSON.parse(response.responseText);			   
				   if(data1.err_code==0){
						getData();
						R.inputDiv.textContent="";
						R.showTips("发送成功");
					}else if(data1.err_code==40){
						R.showTips(data1.data.vcode.str_reason);
					}else {R.showTips("出现错误! 发言过快? err_code:"+data1.err_code)}
			   },
			   onerror:function(e){
				R.showTips("发送失败,请检查网络!");
			   }
			 });
		}else R.showTips("内容为空!");
	}

	R.msgDiv.style.left=ww-524-Ax+"px";
	R.msgDiv.style.top=Ay+"px";
	
	var msgNum;
	var newNum;
	var oldNum;
	function checkMsg(){
		GM_xmlhttpRequest({		
			method: "Get",
			url: msgDataUrl,
			onload: function(response){
				var parser = new DOMParser();
				var dom = parser.parseFromString(response.responseText,"application/xml");		
				var str=dom.querySelector("body").textContent;
				var newNum=parseInt(str.slice(str.lastIndexOf("主题:")+3,str.lastIndexOf("个贴子")));	
				R.tipsBar2.textContent="主题数量:"+newNum+"  时间:"+(new Date()).toLocaleTimeString();
				enterBtn.textContent=""+newNum;
				if(oldNum){
					msgNum=newNum-oldNum;
					oldNum=newNum;
				}else {
					oldNum=newNum;				
					return;
					}
				if(flashing==1){
					msgSmallDiv.style.background='pink';
					setTimeout(function(){msgSmallDiv.style.background='white'},200);
					setTimeout(function(){msgSmallDiv.style.background='pink'},400);
					setTimeout(function(){msgSmallDiv.style.background='white'},600);
				}				
				if(msgNum==0)return;
				ADD("font| "+msgNum,R.tipsBar2,["color","red"]);
				if(R.msgDiv.style.display=="block")getData();				
				enterBtn.textContent="";
				ADD("font|更新:"+msgNum,enterBtn,["color","red"]);
			}
		});	
	}
	function insertMessage(xml){
		try{
		var parser = new DOMParser();
		var dom = parser.parseFromString(xml,"application/xml");
		var content=dom.querySelectorAll("div.i");
		var arr=[];
		for(var i=0,len=content.length;i<len;i++){
			content[i].setAttribute("id","waptiebaid"+i);
			var kz=content[i].querySelector("a").getAttribute("href").match(/kz=(\d+)/)[1];
			arr.push(parseInt(kz)*1000+i);
		}
		arr.sort(function(a,b){return a-b});
		R.msgContent.textContent="";
		for(var i=0;i<arr.length;i++){
			try{
			var s=String(arr[i]);
			var n=s.slice(s.length-2).replace(/^0/g,"");
			var obj=dom.querySelector("#waptiebaid"+n);
			var msg=obj.querySelector("a").textContent.replace(/\d+\.\s/,"");
			var zz=obj.querySelector("p").textContent;
			var ss=zz.match(/回(\d+)\s(.*?)\s(.+)/);//ss[1]回复数  ss[2]用户名 ss[3]回复时间
			if(inBlackList[ss[2]])continue;
			
			var m=ADD("div",R.msgContent);
			if(parseInt(ss[1])>0){ADD("font| (回复"+ss[1]+") ",m,["class","chat_name"]);}
			else ADD("font|"+ss[3]+" "+ss[2]+": ",m,["class","chat_name"]);	
			var url=obj.querySelector("a").getAttribute("href");
		
			if(msg.indexOf("[转帖]")==0)ADD("b|"+msg,m,["text",url],["class","chat_msg chat_cur"]).onclick=function(){				
				this.onclick=null;
				var a=this;		
				GM_xmlhttpRequest({		
				method: "Get",
				url:this.getAttribute("text"),
				onload: function(response){
					try{
					var p=new DOMParser();
					var DOM =p.parseFromString(response.responseText,"application/xml");
					var url1=DOM.querySelector(".i").textContent.match(/1楼\.(.*?)!!!!/)[1];
					url1=decode(url1);					
					if(/(http|https|ftp):[/\\]{2}(\w+\.)?\w+\.\w{2,4}([/\\][/\\a-z\?#\.0-9%&=]+)?/.test(url1)){
						a.onclick=function(){GM_openInTab(url1);R.tipsBar.textContent="链接已在新标签打开!";}
						a.color="white";
						a.onclick();
					}else alert("网址格式不正确\n\n"+url1);
					}catch(e){alert("获取转帖链接出错!")}
				}
				});
				
			}
			else if(msg.indexOf("[主题]")==0)ADD("b|"+msg,m,["text",url],["class","chat_msg chat_cur"],
				["text-url",obj.querySelector("a").getAttribute("href")],["text-title",msg]).onclick=function(){chatRoom2(this.getAttribute("text-title"),this.getAttribute("text-url"))};
			else ADD("font|"+msg,m,["class","chat_msg chat_cur"],
				["text-url",obj.querySelector("a").getAttribute("href")],["text-title",msg]).onclick=function(){chatRoom2(this.getAttribute("text-title"),this.getAttribute("text-url"))};			
			ADD("p",R.msgContent);
			}catch(e){R.showTips("获取主题列表出错!")}
		}	
		R.msgContent.scrollTop=R.msgContent.scrollHeight;

		if(checkMylike!=1){
			try{
			tbs=dom.querySelector('input[name="tbs"]').getAttribute("value");
			fid=dom.querySelector('input[name="fid"]').getAttribute("value");
			}catch(e){R.tipsBar.textContent="获取tbs/fid失败,不能发言!"}
			try{
			var t=dom.querySelector("div.bc").querySelector("div").querySelector("a");
			if(t.textContent=="喜欢本吧"){
				R.inputDiv.onclick=function(){
					if(confirm("提示:所有发言都以主题形式发表到"+KW+"吧,\n你需要该关注该吧才能正常发言,否则会提示输入验证码.\n\n添加"+KW+"吧到我关注的贴吧?")){
						R.inputDiv.onclick=null;
						GM_xmlhttpRequest({method: "Get",url:t.getAttribute("href"),});						
					}
				}
			}
			}catch(e){};
		}
		checkMylike=1;
		}catch(e){
			R.showTips("获取网页出错!");
			ADD("font| "+e,R.msgContent,["color","white"]);
		}
	}
	
	function getData(){
		GM_xmlhttpRequest({		
			method: "Get",
			url:tiebaKw,
			onload: function(response){
			insertMessage(response.responseText);
			}
		});	
	}
	var timer2;
	var tmp=check_time1;
	function startTimer(){
		if(timer2)clearInterval(timer2);
		timer2=setInterval(function(){
			if(--tmp<1){if(R.checkbox_scroll.checked)checkMsg();tmp=check_time1;}	
		},1000);
	}	

	window.addEventListener("blur",function(){if(timer2)clearInterval(timer2);console.log("tiebaChatRoom暂停计时");},false);
	window.addEventListener("focus",function(){startTimer();console.log("tiebaChatRoom开始计时");},false);
}

//刷新帖子列表功能 ,参考了@网络孤独行客 的脚本tieba_refresh( https://userscripts.org/scripts/source/147324	)
//由于tieba_refresh单独使用会让脚本的部分功能失效,所以将刷新帖子列表的功能整合进来了.
function refreshNow(){
	GM_xmlhttpRequest({		
	method: "Get",
	url:document.URL+"&tp=0&pn=0&apage=1&t="+Math.random(),
	onload: function(response){
		document.getElementById("content_leftList").innerHTML=response.responseText;
		btnListener();
	}
	});
}

function chatRoom2(_t,_url,homepage){
	var kw,tbs,fid,tid;
	var R=new msgWindow();
	function getData(url){			
		if(url.length>0){
			GM_xmlhttpRequest({		
			method: "Get",
			url:url,
			onload: function(response){
			R.insertMessage(response.responseText);
			}
			});
		}
	}
	R.insertMessage=function(xml){
		try{var parser = new DOMParser();
		var dom = parser.parseFromString(xml,"application/xml");
	
		var img=dom.querySelectorAll("img");
		try{
		for(var k in img){
		var thisImg=img[k];
		var a=thisImg.parentNode;
		if(a.tagName=="a"){
			if(picMode==1)thisImg.setAttribute("src",a.getAttribute("href"));	
			thisImg.setAttribute("text-url",a.getAttribute("href"));
			thisImg.setAttribute("class","bd_wap_img");
			}
		}
		}catch(e){}
		
		var d=dom.querySelectorAll("div.i");
		R.msgContent.innerHTML="";
		if(R.checkbox_autoScroll.checked)ADD("div",R.msgContent,["style","width:200px;height:230px;"]);
		for(var i=d.length-1;i>=0;i--){
			try{
			var s=R.checkbox_scroll.checked?d[i]:d[d.length-1-i];
			var userName=s.querySelector("span.g").textContent;
			var date=s.querySelector("span.b");
			
			var w=s.querySelectorAll("a");
			var replyNum="",replyUrl="";
			for(var k in w){
				if(/回复/.test(w[k].textContent)){
				replyUrl=w[k].getAttribute("href");				
				if(/回复\((\d+)\)/.test(w[k].textContent))replyNum=" ✉"+RegExp.$1;
				}
				if(!/^http(s)?:\/\/|^@|^<br/.test(w[k].innerHTML))w[k].textContent="";				
			}			
			var ff=ADD("div",R.msgContent,["style","word-break:break-all;margin-bottom:3px"]);
			var replyBtn1=ADD("font|"+date.textContent+" "+userName+": ",ff,["title","点击回复 "+userName],["text-name",userName],["text-url",replyUrl],["class","chat_name chat_cur"]);			
			date.textContent="";
			var msg=s.innerHTML.replace(/\r\n/g,"").replace(/\d+楼./,"");
			if(hideTail)msg=msg.replace(/(\s+)?(----|————).*?<br(.*?)?>/g,"----").replace(/Mozilla\/.*\.0/,"----").replace(/^——.*?<br(.*?)?>/g,"----");
			msg=msg.replace(/<[^>(?:br)(?:img)].*?>/g,"").replace(/(<br(.*?)?>)+/g,"<br/>").replace(/<br\/>(\s+)?$/,"");
			ADD("font|",ff,["class","chat_msg"]).innerHTML=R.checkbox_scroll.checked?msg:"<br/>"+msg;
			var replyBtn2=ADD("font|"+replyNum,ff,["title","查看回复"],["text-name",userName],["text-url",replyUrl],["class","chat_cur chat_rep"]);
			replyBtn1.onclick=replyBtn2.onclick=function(e){
				var RR=new reply(this.getAttribute("text-name"),this.getAttribute("text-url"),e.clientX);				
				if(R.checkbox_autoScroll.checked){
					R.checkbox_autoScroll.checked=false;
					clearInterval(R.timer2);
					RR.K.closeBtn.addEventListener("click",function(){nextPage();R.checkbox_autoScroll.checked=true},false);
					}
				}
			}catch(e){console.log(e)}
		}
		try{
		tbs=dom.querySelector('input[name="tbs"]').getAttribute("value");
		fid=dom.querySelector('input[name="fid"]').getAttribute("value");
		tid=dom.querySelector('input[name="z"]').getAttribute("value");
		kw=dom.querySelector('input[name="word"]').getAttribute("value");
		}catch(e){R.tipsBar.textContent="获取kw/tbs/fid/tid失败,不能发言!"}	
		try{
		var pnum=dom.querySelector('input[name="pnum"]');
		if(pnum){	
			showPage.textContent=pnum.previousSibling.textContent;
			var nnn=showPage.textContent.match(/第(\d+)\/(\d+)页/);
			var a=parseInt(nnn[1]),b=parseInt(nnn[2]);
			pageNumEl.value=a==b?1:a+1;
			var l=a==1?b:a-1;
			pageNumEl.setAttribute("text-prepage",l);
			pageDiv.style.display="inline";
		}else{pageDiv.style.display="none"}
		}catch(e){}
		R.msgContent.scrollTop=R.checkbox_scroll.checked?R.msgContent.scrollHeight:0;
		}catch(e){
			R.showTips("获取网页出错!");
			ADD("font| "+e,R.msgContent,["color","white"]);
		}
		if(R.checkbox_autoScroll.checked)nextPage();
		
		var img1=R.msgContent.querySelectorAll(".bd_wap_img");
		try{
		for(var i in img1){
			img1[i].onclick=function(){this.setAttribute("src",this.getAttribute("text-url"))}
			img1[i].setAttribute("class","chat_cur");
		}
		}catch(e){}
	}

	R.msgDiv.style.display="block";
	R.msgDiv.style.top=(hh-460)/2+20+parseInt(Math.random()*50)+"px";
	R.msgDiv.style.left=(ww-542)/2+200+parseInt(Math.random()*50)+"px";
	R.menuBar.style.height="25px";
	R.tipsBar2.textContent=_t;
	if(homepage){
		R.checkbox_scroll.checked=false;
		R.msgDiv.style.left=homepage+200+"px";
		getData(_url.replace("&last=1","&sub=跳页&pnum=1"));	
	}else if(_t.length>0){
		_url+="&last=1";
		getData(_url)
	}else if(location.href.indexOf('tieba.baidu.com/p/')>-1){
		R.tipsBar2.textContent=document.title;
		try{
		var	p=unsafeWindow.PageData.thread_url.match(/\d+/);
		}catch(e){ p=document.querySelector("input[name='z']").value;}
		_url=wapurl+"m?kz="+p+"&last=1";
		getData(_url);
	}
	
	if(location.href.indexOf("http://tieba.baidu.com/f")==0){
		ADD("a|刷新主页",R.menuBar,["href","javascript:;"],["style","margin-left:5px"]).onclick=refreshNow;
	}

	ADD("a|切换",R.menuBar,["title","更换帖子"],["href","javascript:;"],["style","top:0px;margin-left:5px"]).onclick=function(){
		var num1=GM_getValue("topicnum","");
		var t=prompt("请输入帖子的号码\nhttp://teiba.baidu.com/p/xxxx号码",num1);
		if(t.length>0){
			_url=wapurl+"m?kz="+t.match(/\d+/)+"&last=1";			
			getData(_url);
			R.tipsBar2.textContent=t;
			GM_setValue("topicnum",t);
		}		
	}
	ADD("span|机器人",R.menuBar,["title","聊天机器人小风"],["class","chat_cur"],["style","margin-left:5px"]).onclick=robot1;
	
	ADD("a|刷新",R.menuBar,["href","javascript:;"],["style","margin-left:10px;"]).onclick=function(){getData(_url+"&last=1")};
	var select_container=ADD("div|",R.menuBar,["title","刷新时间"],["style","margin-left:5px;display:inline"]);
	var select_setTime=ADD("select",select_container);
	select_setTime.onclick=function(){
		GM_setValue("refreshtime2",this.value);
		tmp=check_time1=parseInt(select_setTime.value);
	}
	var check_time1=parseInt(GM_getValue("refreshtime2","10"));
	addOption(select_setTime,check_time1+"秒",check_time1);
	
	var numArr=[5,10,15,20,30,60,120,180,300];
	for(var i in numArr)addOption(select_setTime,numArr[i]+"秒",numArr[i]);	
	
	var pageDiv=ADD("div",R.menuBar,["style","display:none"]);	
	var showPage=ADD("span",pageDiv,["style","margin-left:10px;width:25px"]);
	var pageNumEl=ADD("input",pageDiv,["style","width:25px;height:15px"]);
	var pageBtn=ADD("span|跳页",pageDiv,["class","chat_cur"]);
	
	var prepageBtn=ADD("input",pageDiv,["value","<"],["type","button"],["class","chat_margin chat_cur"]);
	var nextpageBtn=ADD("input",pageDiv,["value",">"],["type","button"],["class","chat_margin chat_cur"]);
	
	nextpageBtn.onclick=pageBtn.onclick=function(){
		getData(_url.replace("&last=1","sub=跳页&pnum="+pageNumEl.value));
		R.checkbox_scroll.checked=false;
		clearInterval(R.timer2);
		clearInterval(R.timer);
	}
	prepageBtn.onclick=function(){
		pageNumEl.value=pageNumEl.getAttribute("text-prepage");
		pageBtn.onclick();
	}

	
	var nextPage=function(){
		R.autoScroll(999,function(){if(parseInt(pageNumEl.value)>1){R.showTips("正在加载下一页...");pageBtn.onclick();}});
	}
	R.checkbox_autoScroll=ADD("input",R.menuBar,["style","margin-top:5px;margin-left:10px;margin-right:15px"],["type","checkbox"],["title","勾选自动滚屏&翻页"]);
	R.checkbox_autoScroll.onclick=function(){
		GM_setValue("autoPage",R.checkbox_autoScroll.checked);
		if(R.checkbox_autoScroll.checked){nextPage()}
		else if(R.timer2)clearInterval(R.timer2);		
	}
	R.checkbox_autoScroll.checked=GM_getValue("autoPage",false);
	
	R.sendBtn.onclick=function(){		
		if(R.sendBtn.disabled)return;		
		var content=R.inputDiv.textContent.replace(/&/g,escape("&")).replace(/\+/g,"%2B");
		//console.log(tbs+" "+fid+" "+tid+" "+kw+"-----"+content);
		if(content.length>0){
			R.sendBtn.disabled=true;
			setTimeout(function(){R.sendBtn.disabled=false},5000);
			var postData="co="+encodeURI(content)+"&ti=&src=1&word="+kw+"&tbs="+tbs+"&ifpost=1&ifposta=1&post_info=0&tn=baiduWiseSubmit&fid="+fid+"&verify=&verify_2=&pinf=1_2_0&pic_info=&z="+tid+"&last=1&pn=0&r=0&see_lz=0&no_post_pic=0&floor=9&sub1=%E5%9B%9E%E8%B4%B4";
			R.wapPost(postData);	
		}else R.showTips("内容为空!");	
	}
	R.inputDiv.onkeyup=function(e){
		R.tipsBar.textContent="";
		if(e.keyCode==13){R.sendBtn.onclick()}		
	}	
	var timer;
	var tmp=check_time1;
	function startTimer(){
		if(timer)clearInterval(timer);
		timer=setInterval(function(){
			if(--tmp<1){if(R.checkbox_scroll.checked)getData(_url);tmp=check_time1;}	
		},1000);
		console.log("chatRoom2开始计时");
	}
	function clearTimer()
	{	
		if(timer)clearInterval(timer);
		console.log("chatRoom2暂停计时");
	}
	startTimer();
	
	window.addEventListener("blur",clearTimer,false);
	window.addEventListener("focus",startTimer,false);
	R.closeBtn.onclick=function(){
		R.msgDiv.parentNode.removeChild(R.msgDiv);
		clearTimer();
		window.removeEventListener("blur",clearTimer,false);
		window.removeEventListener("focus",startTimer,false);
	}
}

function reply(username,url,posX){
	var kw,tbs,fid,tid,pid;
	var R=this.K=new msgWindow();
	
	url=url+"&fpn=1";
	if(localTest)url="http://localhost/_tieba_baidu_com/%E6%A5%BC%E4%B8%AD%E6%A5%BC.xht"
	function getData(url){
		GM_xmlhttpRequest({		
		method: "Get",
		url:url,
		onload: function(response){
		R.insertMessage(response.responseText);
		}
		});
	}
	R.insertMessage=function(xml){
		var parser = new DOMParser();
		var dom = parser.parseFromString(xml,"application/xml");
		var d=dom.querySelectorAll(".i");
		R.msgContent.innerHTML="";
		try{
		var firstFloor=dom.querySelector(".bc");
		var username=firstFloor.querySelector("span.g").textContent;
		firstFloor.querySelector("span.b").innerHTML=firstFloor.querySelector("span.g").innerHTML="";
		ADD("div|"+username+": "+firstFloor.textContent.match(/楼\.(.+$)/)[1],R.msgContent,["class","chat_lzl"],["style","margin-bottom:5px"]);
		}catch(e){R.showTips("无法获取楼中楼 1楼")}
		for(var i=0,len=d.length;i<len;i++){
			try{var s=d[i];
			var a=s.querySelectorAll("a");
			var userName=a[a.length-1].textContent=="删"?a[a.length-3].textContent:a[a.length-2].textContent;
			var date=s.querySelector("span.b").textContent;
			if(a[a.length-1].textContent=="删")a[a.length-3].textContent="";
			a[a.length-2].innerHTML=a[a.length-1].innerHTML=s.querySelector("span.b").innerHTML="";			
			var ff=ADD("div",R.msgContent,["style","margin-bottom:5px"]);
			ADD("span|"+date+" "+userName+": ",ff,["title","回复此人"],["text-name","@"+userName+" :"],["class","chat_name chat_cur"]).onclick=function(){
				R.inputDiv.innerHTML=this.getAttribute("text-name")+R.inputDiv.innerHTML;
			}
			ADD("span|"+s.textContent,ff,["class","chat_msg"]);
			}catch(e){console.log(e)}
		}
		try{
		tbs=dom.querySelector('input[name="tbs"]').getAttribute("value");
		fid=dom.querySelector('input[name="fid"]').getAttribute("value");
		pid=dom.querySelector('input[name="pid"]').getAttribute("value");
		tid=dom.querySelector('input[name="z"]').getAttribute("value");
		kw=dom.querySelector('input[name="word"]').getAttribute("value");
		}catch(e){R.tipsBar.textContent="获取kw/tbs/fid/tid失败,不能发言!"}	
		try{
		var pnum=dom.querySelector('input[name="pnum"]');
		if(pnum){	
			showPage.textContent=pnum.previousSibling.textContent;
			var nnn=showPage.textContent.match(/第(\d+)\/(\d+)页/);
			var a=parseInt(nnn[1]),b=parseInt(nnn[2]);
			pageNumEl.value=a==b?1:a+1;
			var l=a==1?b:a-1;
			pageNumEl.setAttribute("text-prepage",l);
			pageDiv.style.display="inline";
		}else{pageDiv.style.display="none"}
		}catch(e){}
		if(flag){R.msgContent.scrollTop=R.msgContent.scrollHeight;flag=0;}
		else R.msgContent.scrollTop=0;
	}

	R.msgDiv.style.display="block";
	R.msgDiv.style.top=(hh-460)/2+20+parseInt(Math.random()*50)+"px";
	R.msgDiv.style.left=posX-542/2+"px";
	
	R.msgContent.style="padding: 5px;width:490px;min-height:100px;max-height:300px;";
	R.checkbox_scroll.style.display="none";
	var flag=0;
	R.sendBtn.onclick=function(){		
		if(R.sendBtn.disabled)return;	
		var content=R.inputDiv.textContent.replace(/&/g,escape("&")).replace(/\+/g,"%2B");
		console.log(pid+" "+tbs+" "+fid+" "+tid+" "+kw+"-----"+content);
		if(content.length>0){
			R.sendBtn.disabled=true;
			setTimeout(function(){R.sendBtn.disabled=false},5000);	
			var postData="co="+encodeURI(content)+"&ti=&src=3&word="+kw+"&tbs="+tbs+"&ifpost=1&ifposta=1&post_info=0&tn=baiduWiseSubmit&fid="+fid+"&verify=&verify_2=&pinf=1_2_0&pic_info=&z="+tid+"&last=&pn=0&r=&see_lz=0&no_post_pic=0&fpn=1&pid="+pid+"&floor=&sub1=%E5%9B%9E%E8%B4%B4";
			R.wapPost(postData);
			flag=1;
		}else R.showTips("内容为空!");	
	}
	R.inputDiv.onkeyup=function(e){
		R.tipsBar.textContent="";
		if(e.keyCode==13){R.sendBtn.onclick()}		
	}	
	
	var pageDiv=ADD("div",R.menuBar,["style","display:none"]);	
	var showPage=ADD("span",pageDiv,["style","margin-left:10px;width:25px"]);
	var pageNumEl=ADD("input",pageDiv,["style","width:25px;height:15px"]);
	var pageBtn=ADD("span|跳页",pageDiv,["class","chat_cur"]);
	var prepageBtn=ADD("input",pageDiv,["value","<"],["type","button"],["class","chat_margin chat_cur"]);
	var nextpageBtn=ADD("input",pageDiv,["value",">"],["type","button"],["class","chat_margin chat_cur"]);
	
	nextpageBtn.onclick=pageBtn.onclick=function(){
		getData(url.replace(/&fpn=(\d+)/,"&fpn="+pageNumEl.value));
		flag=0;
	}
	prepageBtn.onclick=function(){
		pageNumEl.value=pageNumEl.getAttribute("text-prepage");
		pageBtn.onclick();
	}
	
	ADD("a|刷新",R.menuBar,["href","javascript:;"],["style","margin-left:10px;display:inline"]).onclick=function(){getData(url+"&flast=1")};
	R.tipsBar2.textContent=username;

	getData(url);
}
var flag=0;
var bduserName=unsafeWindow.PageData?unsafeWindow.PageData.user.name:"我";
//聊天机器人(作者:疯子 http://fzblog.sinaapp.com/).   感谢@shyangs找到这个好玩的机器人~
function robot1(){	
	var R=new msgWindow();
	R.msgDiv.style.display="block";
	R.msgDiv.style.top=(hh-460)/2+20+parseInt(Math.random()*50)+"px";
	R.msgDiv.style.left=542/2+"px";	
	R.tipsBar2.textContent="聊天机器人";
	ADD("div|小风 "+(new Date()).toLocaleString().match(/ .*/), R.msgContent, ["class","chat_name"]);
	ADD("div|嗨~ 我是聊天机器人", R.msgContent, ["class","chat_msg"]);
	R.sendBtn.onclick=function(){
		if(R.inputDiv.textContent.length==0){
			R.showTips("内容为空!");
			return;
		}
		if(flag){
			R.showTips("【系統】輸入過快，請等待小風回應，再發言。");
			return;
		}
		flag=1;		
		setTimeout(function(){flag=0},5000);
		ADD("div|"+bduserName+" "+(new Date()).toLocaleString().match(/ .*/), R.msgContent, ["class","chat_name"]);
		ADD("div|"+R.inputDiv.textContent, R.msgContent, ["class","chat_msg"]);
		R.msgContent.scrollTop=R.msgContent.scrollHeight;
		GM_xmlhttpRequest({
			method : "GET",
			url : "http://xiaofengrobot.sinaapp.com/api.php?text="+encodeURIComponent(R.inputDiv.textContent),
			onload : function (response) {
				switch (response.status) {
					case 200:
						ADD("div|小风 "+(new Date()).toLocaleString().match(/ .*/), R.msgContent, ["class","chat_name"]);
						ADD("div|"+response.responseText.replace(/<[^>].*?>/g,""), R.msgContent,["class","chat_msg"]);												
						flag=0;
						R.inputDiv.innerHTML="";
						R.msgContent.scrollTop=R.checkbox_scroll.checked?R.msgContent.scrollHeight:0;
						break;
					default:
						R.showTips("發生錯誤, status: "+response.status);
						flag=0;
				}
			},
			onerror:function(e){
				R.showTips("发送失败! 无法连接服务器");
			}
		});
	};
	R.inputDiv.onkeyup=function(e){
		if(e.keyCode==13)R.sendBtn.onclick();
	}
}


if(autoCheck==1){
	init();
	autoCheckFn();
	init=function(){};
}
if(localTest){enterBtn.onclick();return;}
function btnListener(){
	if(location.href.indexOf("http://tieba.baidu.com/p/")==0||
		location.href.indexOf("http://tieba.baidu.com/f?ct=")==0||
		location.href.indexOf("http://tieba.baidu.com/f?kz=")==0){
		enterBtn2.onclick=function(){chatRoom2("","")}
		enterBtn2.textContent="❐";
	}else if(location.href.indexOf("http://tieba.baidu.com/f")==0){
		var replyNum=document.querySelectorAll(".threadlist_rep_num");
		var topicTitle=document.querySelectorAll(".threadlist_title");
		var aa=[],ss=[];
		for(var i=0,len=replyNum.length;i<len;i++){	   
			var a=topicTitle[i].querySelector("a");
			var b=replyNum[i];
			b.setAttribute("text-num",wapurl+"m?kz="+a.getAttribute("href").match(/\d+/)+"&last=1");
			b.setAttribute("text-title",a.textContent);
			b.style.cursor="pointer";
			b.title="预览";
			b.addEventListener("click",function(e){chatRoom2(this.getAttribute("text-title"),this.getAttribute("text-num"),e.clientX)});
		}
	}
}
btnListener();

})();




