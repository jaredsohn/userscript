// ==UserScript==
// @name       		腾讯游戏应用平台切换按钮
// @version    		0.3.1
// @description		腾讯游戏应用平台切换, 在游戏上方的LOGO插入3个按钮, 用于切换游戏平台. 目前支持: 秦时明月
// @include    		http://app*.qzoneapp.com/*
// @include   		http://app*.qzone.qzoneapp.com/*
// @include    		http://3366.app*.twsapp.com/*
// @icon	    	http://home.pengyou.com/favicon.ico
// @updateURL       http://userscripts.org/scripts/source/185122.user.js
// @downloadURL 	http://userscripts.org/scripts/source/185122.user.js
// ==/UserScript==

	if(!$("Appbtn")){
	var qsmy=document.createElement('div');
	qsmy.id="Appbtn";
	qsmy.innerHTML='\
		<a class="Appbtn" id="Qzone" target="_top">Qzone</a>\
		<a class="Appbtn" id="Pengyou" target="_top">Pengyou</a>\
		<a class="Appbtn" id="3366" target="_top">3366</a>\
	<style>.Appbtn{padding:5px;border:solid 2px rgb(52,155,195);background:#ccc;}</style>\
	';
	qsmy.style.cssText='position:absolute;top:20px;left:50px;';
	}
	
	var AppID;
/*
	if(/mgp.qq.com\/webgame/ig.test(location.href)){//3366检测
		AppID=location.href.substring(location.href.lastIndexOf("/",location.href.lastIndexOf("/")-2)+1,location.href.lastIndexOf("/"));//获取AppID
		//$("gamestart").parentNode.appendChild(qsmy);
	} else if(/apps.pengyou.com/ig.test(location.href)){
		AppID=location.href.substring(location.href.lastIndexOf("/")+1);//获取AppID
		//$("appCanvasIfm").parentNode.appendChild(qsmy);
	} else if(/my.qzone.qq.com\/app/ig.test(location.href)){//Qzone
		AppID=location.href.substring(location.href.lastIndexOf("/")+1,location.href.lastIndexOf(".html"));//获取AppID
		//$("appCanvasIfm").parentNode.appendChild(qsmy);
	} else if(/!app=\d+/.test(location.href)){
    	AppID="http://apps.pengyou.com/"+location.href.match(/!app=(\d+)/)[1];
		//$("appCanvasIfm").parentNode.appendChild(qsmy);
	}
*/

	AppID=location.href.match(/app(\d+)\..*\.com/)[1];
	$("wrap").parentNode.parentNode.appendChild(qsmy);

	Url(AppID);
		
	function $(ID){return document.getElementById(ID);}

	function Url(AppID){
		$("Qzone").href="http://my.qzone.qq.com/app/"+AppID+".html";
		$("Pengyou").href="http://apps.pengyou.com/"+AppID;
		$("3366").href="http://mgp.qq.com/webgame/"+AppID;
	}