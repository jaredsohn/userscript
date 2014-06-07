// ==UserScript==
// @name           tieba
// @namespace      http://chenxuefeng.net.cn
// @description    百度贴吧自动签到
// @version        1.3
// @include        http://tieba.baidu.com/*
// @downloadURL    https://userscripts.org/scripts/source/147428.user.js
// @updateURL      https://userscripts.org/scripts/source/147428.meta.js

// ==/UserScript==
IPS_HOLDER: '#miniheader,#gTop',
			TIPS: '<div class="tips_container">OpenGG.Clean.Player \u5DF2\u542F\u7528&emsp;<span class="tips_toggleWide">\u5bbd\u5c4f/\u7a84\u5c4f&emsp;</span><a href="http://opengg.me/781/opengg-clean-player/" style="color:blue" target="_blank">\u53CD\u9988</a>&emsp;<a href="http://opengg.me/donation/" style="color:red" title="\u6211\u8981\u6350\u52A9\u6B64\u9879\u76EE" target="_blank">\u6350\u52A9</a><a class="tips_close" href="#" style="color:red">X</a></div>',

document.body.style.fontFamily ="微软雅黑";
document.body.style.fontSize ="10pt";
document.body.style.background ="#ffffff";
document.body.innerHTML="";

var ajax=false;
var rewords="";
var ba;
var bai;
var bas=[];

if(window.XMLHttpRequest){//非IE，包括（IE7，IE8）
	ajax=new XMLHttpRequest();
}
else if(window.ActiveXObject){//IE
	var versions=['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Msxml2.XMLHTTP.7.0','Msxml2.XMLHTTP.6.0','Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
	for(var i=0; i<versions.length; i++){
			try{
				ajax=new ActiveXObject(versions[i]);
			}
			catch(e){
				ajax=false;
			}
	}
}
if(ajax==false){
	document.body.innerHTML+="遇到未知问题，程序不能继续下去!";
}
else{
	document.body.innerHTML+="请自行检查有没有签到正确，如有错误，欢迎反馈<a href='http://tieba.baidu.com/p/1768731534'  target='_blank'>蝉曦吧反馈专用贴</a><br>";
	
	
	// document.body.innerHTML+="<span style='color:red;'>代码修改中，期间使用本签到可能出现故障，请稍候再用</span><br>";
	document.body.innerHTML+="<span style='color:red;'>特别注意:请在自动签到的时候，放慢你的发帖和回复速度，防止应为操作过频被度受和谐ID。</span><br>";
	document.body.innerHTML+="<span style='color:red;'>------2012.09.03  v0.6------</span><br>";
	
	document.body.innerHTML+="<span style='color:red;'>更新1:增加被封禁贴吧显示异常的提示</span><br>";
	document.body.innerHTML+="<span style='color:red;'>------------------------------</span><br>";
	
	document.body.innerHTML+="<span style='color:red;'>备注1:由于本代码放置于免费空间，最近因为访问量变大，导致空间里出现了广告，所以，大家不用再本站的首页留言板留言，有问题请到本人贴吧反馈专用贴咨询</span><br>";
	document.body.innerHTML+="<span style='color:red;'>备注2:请转载的童鞋去掉我的个人贴吧信息，以免引起误会</span><br>";
	document.body.innerHTML+="<span style='color:red;'>备注3:感谢以下吧友建议</span><a href=\"/i/sys/jump?un=%C8%F6%B5%A9%D2%B2%C0%E4\" target=\"_blank\">@撒旦也冷</a> | <a href=\"/i/sys/jump?un=wangxi3799\" target=\"_blank\">@wangxi3799</a> | <a href=\"/i/sys/jump?un=%D6%BF%B0%AE%B3%C9%A4%CE%DD%E6\" target=\"_blank\">@挚爱成の萱</a> | <a href=\"/i/sys/jump?un=%D3%D0%D6%BB%D0%A1F%D8%BC\" target=\"_blank\">@有只小F丶</a>  <br>";

	document.body.innerHTML+="程序开始工作...<br>---防止度受和谐，等待6s ing...<br>";
	countba();//开始运行
}
function checksigned(urlStr){

	bai++;
	if(bai>ba.length){
		document.body.innerHTML+="<br>签到完毕！请自行检查有没有签到正确，如有错误，欢迎反馈<a href='http://tieba.baidu.com/p/1768731534'  target='_blank'>蝉曦吧反馈专用贴</a><br><br><br><br><br>";
		return 0;
	}else{
		document.body.innerHTML+="<br>+<a href=\"http://tieba.baidu.com/f?kw="+ba[bai-1]+"&ie=utf-8&tp=0\" target=\"_blank\">"+ba[bai-1]+"吧</a>";
	}
	
	ajax.onreadystatechange=function(){
		if(ajax.readyState == 4){
			if(ajax.status == 200){
				rewords=ajax.responseText;
				var aa=cutchar(rewords,"<span class=\"sign_index_num j_signin_index\">","</span>");
				var tbs=cutchar(rewords,"PageData.tbs = \"","\";");
				
				if(cutchar(rewords,"PageData.user.is_block = ",";//是否已封禁")=="1"){
					document.body.innerHTML+="--您在本吧<span style='color:red;'>被封禁，不能签到!</span>";
					document.body.innerHTML+="---防止度受和谐，等待1s ing...<br>";
					setTimeout("checksigned(\""+ba[bai]+"\");",1000);
					return 0;	
				}
				
				if(rewords.indexOf("<span class=\"sign_index_num j_signin_index\">")<0){
					document.body.innerHTML+="--本吧还没开放签到系统!";
					document.body.innerHTML+="---防止度受和谐，等待1s ing...<br>";
					setTimeout("checksigned(\""+ba[bai]+"\");",1000);
					return 0;	
				}					
				if(aa=="0"){
					document.body.innerHTML+="--还没签到!";
					signed(ba[bai-1],tbs);
					setTimeout("checksigned(\""+ba[bai]+"\");",6000);
				}
				else{
					document.body.innerHTML+="--本吧已签到!";
					document.body.innerHTML+="--今日,你是本吧第 <span style='color:red;'>"+aa+"</span> 个签到!";
					document.body.innerHTML+="---防止度受和谐，等待1s ing...<br>";
					setTimeout("checksigned(\""+bas[bai]+"\");",1000);
				}
				return 0;
			}
		}
	};
	if(ajax){
		ajax.open("get", "http://tieba.baidu.com/f?kw="+ba[bai-1]+"&ie=utf-8&tp=0");
		ajax.send(null);
	}else{
		ajax.open("get", "http://tieba.baidu.com/f?kw="+ba[bai-1]+"&ie=utf-8&tp=0", true);
		ajax.send();
	}
}

function signed(urlStr,tbs){
	ajax.onreadystatechange=function(){
		if(ajax.readyState == 4){
			if(ajax.status == 200){
				rewords=ajax.responseText;
				var ranks=cutchar(rewords,"\"user_sign_rank\":",",");
				document.body.innerHTML+="--签到完毕,您是第 <span style='color:red;'>"+ranks+"</span> 个签到的...";
				document.body.innerHTML+="---防止度受和谐，等待6s ing...<br>";
			}
		}
	};
	

	document.body.innerHTML+="--开始签到...";
	ajax.open("post","http://tieba.baidu.com/sign/add");
	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	ajax.send("kw="+urlStr+"&ie=utf-8&tbs="+tbs);

}

//查贴吧数量
function countba(){
	ajax.onreadystatechange=function(){
		if(ajax.readyState == 4){
			if(ajax.status == 200){
				rewords=ajax.responseText;
				ba=rewords.split("<a class=\"j_ba_link often_forum_link\""); 
				
				for(var i=1;i<ba.length;i++){
					bas[i-1]=cutchar(ba[i],"forum=\"","\"");
					var aa=cutchar(ba[i],">","</a>");
					if(aa.indexOf("...")>=4)
						var aa=cutchar(ba[i],"title=\"","\"");
					ba[i]=aa;	
				}
				document.body.innerHTML+="估测完毕:您喜欢的贴吧有"+(ba.length)+"个，最长将花费时间"+parseInt(ba.length*6/60)+"分"+(ba.length*6%60)+"秒";
				
				bai=1;
				checksigned(bas[bai]);
			}
		}
	};
	if(ajax){
		ajax.open("get", "http://tieba.baidu.com/");
		ajax.send(null);
	}else{
		ajax.open("get", "http://tieba.baidu.com/", true);
		ajax.send();
	}
}
		
		
function cutchar(allstr,prechar,endchar){
	var preposition=allstr.indexOf(prechar)+prechar.length;
	var strlength=allstr.indexOf(endchar,preposition);
	return allstr.substring(preposition,strlength);
}

function isCon(arr, val){
	for(var i=0; i<arr.length; i++){
		if(arr[i] == val)
			return i-1;
	}
	return 0;
}

function changeStr(allstr,cbit,changeStr){ 
	  return allstr.substring(0,cbit)+changeStr+allstr.substring(cbit+1,allstr.length); 
   }
