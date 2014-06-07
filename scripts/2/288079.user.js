// ==UserScript==
// @name       朕知道了
// @version    0.1
// @description  新浪微博增强
// @match      http://*.weibo.com/*
// @match		http://weibo.com/*
// @copyright  2014+, Js_Chrome
// ==/UserScript==
(function() {
	var crack = function() {
if( typeof(window.com_sogou_weibodiy)=="undefined" ){
 window.com_sogou_weibodiy = {
	killErr: function (){return true;},
	gogogo: function (){
		var tt="";
		var txt="";
		var box=document.getElementById("talkList"); //t.qq.com
		if(!box)box=document.getElementById("Pl_Core_OwnerFeed__4"); //weibo.com
		if(!box)box=document.body; //通用兼容
		var oo=box.getElementsByTagName("a");
		if(oo.length<1) return;
		for (var i=oo.length;i>=0;i--){
			try{
			if(""+oo[i]=="undefined")continue; //跳过无效对象
			tt=""+oo[i].title;
			txt=""+oo[i].innerText;
			if(tt=="赞"){oo[i].title=com_sogou_weibodiyCFG.zan;}
			if(txt.indexOf("转播")==0){oo[i].innerText=txt.replace("转播","传旨");if(tt=="")oo[i].title=txt;}
			if(txt.indexOf("转发")==0){oo[i].innerText=txt.replace("转发","传旨");if(tt=="")oo[i].title=txt;}
			else if(txt.indexOf("评论")==0){oo[i].innerText=txt.replace("评论","准奏");if(tt=="")oo[i].title=txt;}
			else if(txt.indexOf("收藏")==0){oo[i].innerText=txt.replace("收藏","上奏");if(tt=="")oo[i].title=txt;}
			else if(txt.indexOf("分享")==0){oo[i].innerText=txt.replace("分享","宣旨");if(tt=="")oo[i].title=txt;}
			else if(txt.indexOf("删除")==0){oo[i].innerText=txt.replace("删除","焚毁");if(tt=="")oo[i].title=txt;}
			else if(txt.indexOf("举报")==0){oo[i].innerText=txt.replace("举报","赐死");if(tt=="")oo[i].title=txt;}
			}catch(e){}
		}//for oo
	}//func
 }
}//end if
//
onerror=com_sogou_weibodiy.killErr;
setTimeout("com_sogou_weibodiy.gogogo()",200);
        	}
	var scriptNode = document.createElement ('script');
	scriptNode.type = "text/javascript";
	scriptNode.textContent  = '(' + crack.toString() + ')();';
	scriptNode.onload = function() {
		document.getElementsByTagName('head')[0].removeChild(scriptNode);
	};
	document.getElementsByTagName('head')[0].appendChild(scriptNode);
	
})();