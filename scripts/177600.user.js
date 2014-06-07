// ==UserScript==
// @name        贴吧_根据关键词屏蔽提醒
// @namespace   yuxingyc
// @include     http://tieba.baidu.com/*
// @include		http://localhost/_tieba_baidu_com/*
// @grant		GM_setValue
// @grant		GM_getValue
// @grant		GM_xmlhttpRequest
// @grant		unsafeWindow
// @downloadURL https://userscripts.org/scripts/source/177600.user.js
// @updateURL https://userscripts.org/scripts/source/177600.meta.js 
// @version     1.6
// ==/UserScript==

(function(){
/**
 * msgMode=1:关键词+贴吧黑名单+用户名黑名单 模式,过滤内容包含对方名字 回复内容的前40个字 标题 贴吧名字
 * msgMode=2:贴吧白名单模式,符合条件的贴吧才有提醒
 * msgMode=3:贴吧黑名单模式,符合条件的贴吧没有提醒
 *
 * 如需测试弹出提醒及屏蔽效果,请启用大概179行的代码 b=[13,0,0,14,15,0,0,0,16,17,0,0,0,0,0,0,0,0,0,0];
 */

var msgMode=1;//这里设置你要使用的模式
//---------------------------------

//关键词  msgMode=1时生效.请按格式设置关键词,支持正则表达式. 该模式不提醒含有列表关键词的内容. 过滤内容包含对方用户名 回复内容的前40个字  标题  贴吧名字.
var keywords=["(欢迎|召唤|招人|收人).*?(q群|加群)","(欢迎|本吧|这里是.*?吧).*?@.*?@.*?@.*?@" , "请按格式添加关键词111" ];

//用户名黑名单  msgMode=1时生效
var keywords_nameList=["请按格式添加用户名111","请按格式添加用户名222"];

//贴吧黑名单  msgMode=1时生效. 假如要添加"xxx吧",请填写 "xxx", 去掉"吧"字.
var keywords_tiebaList=["请按格式添加贴吧名称111","请按格式添加贴吧名称222"];

//--------------------------------- 
/**
 * 获取我喜爱的贴吧 
 * 先安装脚本userscripts.org/scripts/show/178365
 * 然后打开网址http://tieba.baidu.com/f/like/mylike?&pn=1 等待网页生成代码
 * 最后删除第44行代码var tiebaWhiteList=[.....], 并换上网页生成的代码.
 */
// msgMode=2时生效,请按格式设置贴吧白名单. (只提醒这些贴吧的回复和召唤)
var tiebaWhiteList=["firefox","chrome","opera","windows8"];


//---------------------------------

// msgMode=3时生效,请按格式设置贴吧黑名单. (不提醒这些贴吧的回复和召唤)
var tiebaBlackList=["请按格式添加贴吧名称111","请按格式添加贴吧名称222"];

//---------------------------------
var mmm=90;//检测提醒的间隔时间 ,单位(秒)
//---------------------------------

for(var i=0;i<keywords_nameList.length;i++)keywords.push("\\."+keywords_nameList[i]+":");
for(var i=0;i<keywords_tiebaList.length;i++)keywords.push(">"+keywords_tiebaList[i]+"吧");

var ww=document.documentElement.clientWidth;
var hh=document.documentElement.clientHeight;

if(ww<400&&hh<200)return;//小窗口不弹出提醒

var msgContainer=document.createElement("ul");
var msgDiv=document.createElement("ul");
msgDiv.style=msgContainer.style="display:none;width:auto;height:auto;top:2em;right:250px;background:rgb(255, 255, 218);overflow:hidden;text-align:left;z-index:9999999;position:fixed;font-size: 12px;border: 1px solid rgb(209, 176, 124);border-radius: 4px;padding: 5px;";
document.body.appendChild(msgContainer);
document.body.appendChild(msgDiv);

var aa=[];
var check1;
var check2;
var timer;
var timer_hide;
var timerx;
var timer_flag;
var ttt=7000;
var wapHtml="";
var isWhiteList=[];
var gg;
var resNum;
var flag=1;
msgContainer.onmousedown=function(e){	
	var n=parseInt(e.target.getAttribute("text"));
	if(aa[n]){		
		aa[n]=0;
		GM_setValue("msgNum",aa.toString());		
	}
}
msgContainer.onmouseover=function(){
	ttt=300;
	clearInterval(timer_hide);
	clearTimeout(timerx);
	if(parseInt(msgContainer.style.top.replace("px",""))>0)return;
	msgContainer.style.top="0px";
	if(flag)checkMsg();
	flag=0;
}
msgContainer.onmouseout=function(){	
	var c=8-msgContainer.offsetHeight,d=0;
	if(d<c)return;
	clearTimeout(timerx);					
	timerx=setTimeout(function(){							
		timer_hide=setInterval(function(){
			d-=1;
			msgContainer.style.top=d+"px";
			if(d<c){
				msgContainer.style.top=c+"px";
				clearTimeout(timer_flag);
				timer_flag=setTimeout(function(){flag=1},3000);
				clearInterval(timer_hide);
			}
		},10);
	},ttt);
};
var localTest=location.hostname=="localhost";

var bdurl={
	get_data:"http://message.tieba.baidu.com/i/msg/get_data",
	replyme:"http://wapp.baidu.com/mo/q-0/replyme?src=0",
	atme:"http://wapp.baidu.com/mo/q-0/atme?src=0"	
}
if(localTest)bdurl={
	get_data:"http://localhost/_tieba_baidu_com/msg.txt",
	replyme:"http://localhost/_tieba_baidu_com/replyme.xht",
	atme:"http://localhost/_tieba_baidu_com/atme.xht"	
}
function checkMsg(){
	ttt=7000;
	ad1=false;
	ad2=false;		
	if(typeof(gg)!='function')gg=(function(){
		if(msgMode==1)return function(str){
			for(var j=0;j<keywords.length;j++){
			var reg=new RegExp(keywords[j],"i");
				if(reg.test(str)){
					resNum--;
					console.log("关键词 "+keywords[j]+"  --匹配--> "+str);
					str="<s>"+str+"</s>";
					break;
				}
			}
			return str;
		}		
		else if(msgMode==2){
			for(var k=0;k<tiebaWhiteList.length;k++){
				isWhiteList[tiebaWhiteList[k]]=1;
			}		
			return function(str){
				resNum--;
				var tiebaName=str.slice(str.lastIndexOf(">")).match(/>(.*)吧/)[1];
				if(isWhiteList[tiebaName]==1)return str;
				return "<s>"+str+"</s>";
			}
		}
		else if(msgMode==3)return function(str){
			for(var j=0;j<tiebaBlackList.length;j++){
				var str=replyDiv[i].textContent;
				var tiebaName=str.slice(str.lastIndexOf(">")).match(/>(.*)吧/)[1];
				if(tiebaName==tiebaBlackList[j]){
					resNum--;					
					console.log("贴吧黑名单 "+tiebaBlackList[j]+" --匹配--> "+str);
					str="<s>"+str+"</s>";
					break;
				};
			}
			return str;
		}
	})();
	GM_xmlhttpRequest({		
		method: "Get",
		url: bdurl.get_data,
		onload: function(response){			
			aa = response.responseText.match(/(\d+)/g);
			console.log("服务器-> "+aa);
			var b = GM_getValue("msgNum","[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]").match(/\d+/g);
			console.log(" 本地 -> "+b);
			//aa=[1,0,0,2,3,0,0,0,4,5,0,0,0,0,0,0,0,0,0,0];
			//b=[13,0,0,14,15,0,0,0,16,17,0,0,0,0,0,0,0,0,0,0];
			var c=false;
			for(var i=0;i<20;i++){
				aa[i]=parseInt(aa[i])||0;
				var num=i+1;
				if(aa[i]>0){GM_xmlhttpRequest({method: "GET",url: "http://message.tieba.baidu.com/i/msg/clear_data?type="+num,});}
				b[i]=parseInt(b[i])||0;
				aa[i]+=b[i];
				if(aa[i]>0)c=true;								
			}			
			console.log(" 相加 -> "+aa);
			if(!c)return;
			GM_setValue("msgNum",aa.toString());
			checkAd();	
			timer=setInterval(function(){	
				if(check1&&check2){
					msgContainer.style.display="block";
					clearInterval(timer);
					var str="";
					var url="http://tieba.baidu.com/i/sys/jump?u="+unsafeWindow.PageData.user.portrait;
					var f=function(r,s,t){						
						if(aa[r]>0)str+="<li><a text='"+r+"' href='"+url+s+"' target='_blank'>"+aa[r]+t+"</a></li>";
					}
					f(0,"&type=fans","个新粉丝");
					f(1,"&type=evaluate","个新评价");
					f(2,"&type=wealth","(wealth)");
					f(3,"&type=replyme","个新回复");
					f(4,"&type=feature","个新精品");
					f(5,"&type=guess","个竞猜结果");
					f(6, "" ,"个未知;(6)");
					f(7,"&type=main","(postPasser)");
					f(8,"&type=atme","个@提到我");
					f(9,"&type=recycle","个回收站提醒");
					f(10,"&type=invite","个粉丝福利卡");
					f(11,"&type=light","个点亮我");
					f(12, "", "个未知;(12)");
					f(13, "", "个未知;(13)");
					f(14, "", "个未知;(14)");
					f(15, "", "个未知;(15)");
					f(16, "", "个未知;(16)");
					f(17, "", "个未知;(17)");
					f(18, "", "个未知;(18)");
					f(19,"&type=storethread","(storethread)");
					msgContainer.innerHTML="<li><span id='gmShowMsg130911'  style='cursor:pointer'>预览</span> | <span id='gmClearMsg130911' style='cursor:pointer'>关闭</span></li>"+str;
					var b=document.getElementById("gmShowMsg130911");
					b.onmouseover=function(){						
						msgDiv.innerHTML=wapHtml;
						msgDiv.style.display="block";
						msgDiv.style.top="150px"
					}
					b.onmouseout=function(){msgDiv.style.display="none"};
					if(aa[3]==0&&aa[8]==0)wapHtml="<b>回复我的</b><br>没有新内容<br><b>@我的</b><br>没有新内容<br>";
					document.getElementById("gmClearMsg130911").onclick=function(){
						msgContainer.style.display="none";
						GM_setValue("msgNum","[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]");
					}			
					msgContainer.onmouseout();				
				}				
			},200);
		}
	});	
}

function check(a,b){
	resNum=a;
	var parser = new DOMParser();
	var dom = parser.parseFromString(b,"application/xml");
	var replyDiv = dom.getElementsByTagName('div');
	var len=2+a;
	if(len>12)len=12;
	for(var i=2;i<len;i++){
		var str=replyDiv[i].textContent.replace(/\s/,"");		
		wapHtml+=gg(str)+"<br>";
	}	
	return resNum;
}

function checkAd(){
	wapHtml="";
	if(aa[3]>0)GM_xmlhttpRequest({		
		method: "Get",
		url:bdurl.replyme,
		onload: function(response){	
			check1=true;
			console.log("---------reply---------");
			var tips="";
			if(aa[3]>10)tips="<font color='red'>(只显示前10条,还有"+(aa[3]-10)+"条未显示)</font>";
			wapHtml+="<b>回复我的</b>"+tips+"<br>";
			aa[3]=check(aa[3],response.responseText);						
		}
	});	
	else check1=true;
	
	if(aa[8]>0)GM_xmlhttpRequest({		
		method: "Get",	
		url:bdurl.atme,
		onload: function(response){
		check2=true;
		console.log("---------atme---------");
		var tips="";
		if(aa[8]>10)tips="<font color='red'>(只显示前10条,还有"+(aa[8]-10)+"条未显示)</font>";		
		wapHtml+="<b>@我的</b>"+tips+"<br>";
		
		aa[8]=check(aa[8],response.responseText);
		}
	});
	else check2=true;	
}
checkMsg();
var timer2;
var tmp=mmm;
function startTimer(){
	if(timer2)clearInterval(timer2);
	timer2=setInterval(function(){
		if(--tmp<1){checkMsg();tmp=mmm;}	
	},1000);
}
startTimer();
window.addEventListener("blur",function(){if(timer2)clearInterval(timer2);console.log("回复提醒 暂停计时");},false);
window.addEventListener("focus",function(){startTimer();console.log("回复提醒　开始计时");},false);
})();

