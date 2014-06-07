// ==UserScript==
// @name          谷歌中国淡入式极简首页
// @namespace     http://xinxian.info/
// @description   使谷歌中国首页拥有英文首页淡入效果
// @include       http://www.google.cn/
// @include       http://www.google.cn/webhp?*
// @exclude       http://www.google.cn/search?*
// @include       http://www.google.com.hk/
// @include       http://www.google.com.hk/webhp?*
// @exclude       http://www.google.com.hk/search?*
// @version       0.2
// @author        xinxian.info
// ==/UserScript==
//------------------------------------------------------


var objs = new Array();
objs[0] = document.getElementById("ghead");//顶部
objs[1] = document.getElementById("tb");//图标导航
objs[2] = document.getElementById("fctr");//页脚
objs[3] = document.getElementsByTagName("td")[2];//高级、语言
objs[4] = document.getElementsByTagName("td")[3];//搜索语言选择
objs[5] = document.getElementsByTagName("font")[1];//语言提示


setOpacity(0);

//FadeIn Speed (ms)
var speed = 100;

document.addEventListener("mouseover",doEvent,false);
document.addEventListener("click",function(){doEvent();document.getElementsByName("q")[0].focus();},false);
document.getElementsByName("btnG")[0].addEventListener("focus",doEvent,false);


var done = 0;
function doEvent(){
	if(done == 0){
		t = window.setInterval(fadeIn,speed);done = 1;
	}else{return false;};
}


var opacNow = 0;
function fadeIn(){
	opacNow+=1;
	setOpacity(opacNow);	
	if(opacNow > 9){
		window.clearInterval(t);
	};
}


function setOpacity(val){
	for (var i=0;i<objs.length;i++){
		objs[i].style.opacity = val/10;
	};
}


//HIDE Google Time Search
//document.getElementsByName("as_qdr")[0].style.display = "none";