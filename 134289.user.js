// ==UserScript==
// @name          KL href Cleaner
// @author        kl
// @description   
// @include       http://*.baidu.com/*
// @include       *://*.google.com/search*
// @include       *://*.google.com.*/search*
// @include       *://*.google.com/news*
// @include       *://*.google.com.*/news*
// @include       http://4fun.tw/*
// @include       http://www.ragbear.com/read.php*
// @include       http://bbs*.btwuji.com/*
// @include       http://bbs*.wujidy.com/*
// @include       http://*.feedsportal.com/*.htm
// @include       http://www.facebook.com/*
// @include       *://twitter.com/*
// @include       http://www.beareyes.com.cn/*
// @include       http://www.expreview.com/*
// @include       http://*.pconline.com.cn/*.html*
// @include       http://*.zol.com.cn/*.html*
// @include       http://www.7headlines.com/*
// @include       http://www.duxieren.com/*
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version       0.0.2
// @history       0.0.2 2012-06-10
// @history       0.0.1 2012-05-19
// ==/UserScript==

var blhref=location.href;
var blhost=location.host; 

//不使用UserScript
if (blhref.indexOf("?userjs=no")>0 || blhref.indexOf("&userjs=no")>0){return;}

var blat;
var blbody;
var blelement;
var blhtml;
var blleft;
var bllink;
var blobject;
var blright;
var bltext;
var i;

//duxieren.com
if (blhost.indexOf(".duxieren.com")>0){
	blelement=document.querySelectorAll("td.rss_table_td");
	for (i=0;i<blelement.length;i++){
		blobject=blelement[i].querySelector('span[onclick^="window.open"]');
		if (blobject){
			bllink=blobject.getAttribute("onclick");
			bltext=blobject.textContent;
			if (i==0){alert(bltext);}
			blat=bllink.indexOf("'");
			if (blat>=0){bllink=bllink.substring(blat+1);}
			blat=bllink.indexOf("'");
			if (blat>=0){bllink=bllink.substring(0,blat);}
			if (!bllink==""){blelement[i].innerHTML='<a href="'+bllink+'" target=_blank><font color=#000000>'+bltext+'</font></a>';}
		}
	}
	return;
}

//7headlines.com
if (blhost.indexOf(".7headlines.com")>0){
	blelement=document.querySelector("div.address-bar > input");
	if (blelement){
		blhtml=blelement.getAttribute("value");
		location.href=blhtml;
	}
	return;
}

//twitter
if (blhost.indexOf("twitter.com")>=0){
	document.getElementsByTagName('body')[0].setAttribute("onmouseover","var blitem=event.srcElement||event.target;if (blitem.getAttribute(\"class\")==\"twitter-timeline-link\" && blitem.tagName.toLowerCase()==\"a\"){var bllink=blitem.getAttribute(\"title\");blitem.setAttribute(\"href\",bllink);}");
	return;
}

//facebook
if (blhost.indexOf("www.facebook.com")>=0){
	document.getElementsByTagName('body')[0].setAttribute("onmouseover","var blitem=event.srcElement||event.target;if (blitem.getAttribute(\"onmousedown\").indexOf(\"UntrustedLink.bootstrap\")>=0 && blitem.tagName.toLowerCase()==\"a\"){blitem.setAttribute(\"onmousedown\",\"\");}");
	return;
}

//百度搜索引擎链接直接链接，不再跳转
if (blhost.indexOf(".baidu.com")>=0){
	blelement=document.querySelectorAll(".t > a"); 
	for (i=0;i<blelement.length;i++){
		blelement[i].setAttribute("onmousedown", "");
    }
    return;
}

//Google搜索引擎链接直接链接，不再经过Google跳转
if (blhost.indexOf("google.com")>=0){
	blelement=document.querySelectorAll("a.l"); 
	for (i=0;i<blelement.length;i++){
		blelement[i].setAttribute("onmousedown", "");
    }
    
    blelement=document.querySelectorAll('a[href^="/url\?url="]'); 
	for (i=0;i<blelement.length;i++){
		bllink=blelement[i].getAttribute("href");
		bllink=bllink.substring(9);
		if (bllink.indexOf("&rct=")>=0){
			bllink=bllink.substring(0,bllink.indexOf("&rct="));
		}
		if (bllink.indexOf('%2F')>=0){
			bllink=bllink.replace(new RegExp('%2F',"gm"),'/');
		}		
		if (bllink.indexOf('%3A')>=0){
			bllink=bllink.replace(new RegExp('%3A',"gm"),':');
		}
		if (bllink.indexOf('%3D')>=0){
			bllink=bllink.replace(new RegExp('%3D',"gm"),'=');
		}		
		if (bllink.indexOf('%3F')>=0){
			bllink=bllink.replace(new RegExp('%3F',"gm"),'?');
		}		
		blelement[i].setAttribute("href",bllink);
    }
	return;
}

//4fun.tw 链接直接打开
if (blhost.indexOf("4fun.tw")>=0){
	blelement=document.querySelector("#target_url");
	if (blelement){
		bllink=blelement.getAttribute("value");
		location.href=bllink;
	}
	return;
}

//破烂熊下载链接不再弹出对话框
if (blhost.indexOf("www.ragbear.com")>=0){
	blelement=document.querySelectorAll('a[onclick^="return ajaxurl("]'); 
	for (i=0;i<blelement.length;i++){
		blelement[i].setAttribute("onclick", "");
	}
	return;
}

//将BT无极的快车下载修改为普通BT下载
if (blhost.indexOf(".btwuji.com")>=0 || blhost.indexOf(".wujidy.com")>=0){
	blelement=document.querySelector("div[id^=att_] > a");
	if (blelement){
		bllink=blelement.getAttribute("oncontextmenu");
		if (bllink && bllink.indexOf("bbs.btwuji.com")>=0){
			bllink=bllink.substring(bllink.indexOf("bbs.btwuji.com"));
			bllink=bllink.substring(0,bllink.indexOf("','"));
			blelement.href='http://'+bllink.trim();
			blelement.setAttribute("onClick","");
			blelement.setAttribute("oncontextmenu","");
			bltext=blelement.innerText;
			if (bltext==undefined){bltext=blelement.textContent;}
			blelement.innerHTML="<font color=blue>"+bltext.replace("(快车高速下载)","(BT下载)")+"</font>";
		}
	}
	return;
}

//feedsportal链接自动跳转
if (blhost.indexOf(".feedsportal.com")>=0){
	blelement=document.querySelectorAll("a"); 
	for (i=0;i<blelement.length;i++){
		if (blelement[i].innerText==undefined){bllink=blelement[i].textContent;}
		else {bllink=blelement[i].innerText;}
		if (bllink=="click here to continue to article" || bllink=="﻿继续阅读文章，请点击这里"){
			location.href=blelement[i].getAttribute("href");
			break;
		}
    }
    return;
}

//小熊在线自动转到全文页面
if (blhref.indexOf("http://www.beareyes.com.cn/")>=0){
	if (blhref.indexOf("_0.")>=0){return;}
	blat=blhref.lastIndexOf("/");
	blright=blhref.substring(blat+1);
	blleft=blhref.substring(0,blat+1);
	
	blat=blright.lastIndexOf(".");
	if (blat==-1){return;}
	
	bllink=blright.substring(0,blat)+"_0"+blright.substring(blat);

	blelement=document.querySelector('a[href="'+bllink+'"]'); 
	if (blelement==null){blelement=document.querySelector('a[href="'+blleft+bllink+'"]');}
	if (blelement){location.href=blleft+bllink;}
	return;
}

//expreview.com自动转到全文页面
if (blhref.indexOf("http://www.expreview.com/")>=0){
	if (blhref.indexOf("-all.")>=0){return;}
	blat=blhref.lastIndexOf("/");
	blright=blhref.substring(blat);
	blleft=blhref.substring(0,blat);
	
	blat=blright.lastIndexOf(".");
	if (blat==-1){return;}
	
	bllink=blright.substring(0,blat)+"-all"+blright.substring(blat);

	blelement=document.querySelector('a[href="'+bllink+'"]'); 
	if (blelement==null){blelement=document.querySelector('a[href="'+blleft+bllink+'"]');}
	if (blelement){location.href=blleft+bllink;}
	return;
}

//pconline.com.cn自动转到全文页面
if (blhost.indexOf(".pconline.com.cn")>0){
	if (blhref.indexOf("_all.")>=0){return;}
	blat=blhref.lastIndexOf(".");
	if (blat==-1){return;}
	
	blright=blhref.substring(blat);
	blleft=blhref.substring(0,blat);
	
	bllink=blleft+"_all"+blright;
	
	blelement=document.querySelector('a[href^="'+bllink+'"]');
	if (blelement){location.href=bllink;}
	return;
}

//zol.com.cn自动转到全文页面
if (blhost.indexOf(".zol.com.cn")>0){
	if (blhref.indexOf("_all.")>=0){return;}
	blat=blhref.lastIndexOf(".");
	if (blat==-1){return;}
	
	blright=blhref.substring(blat);
	blleft=blhref.substring(0,blat);
	
	bllink=blleft+"_all"+blright;
	blelement=document.querySelector('a[href^="'+bllink+'"]');
	if (blelement){location.href=bllink;return;}	
	
	blelement=document.querySelectorAll('a[href*="_all."]');
	for (i=0;i<blelement.length;i++){
		blhtml=blelement[i].innerHTML;
		if (blhtml=='在本页阅读全文'){location.href=blelement[i].getAttribute("href");break;}
	}
	return;
}