// ==UserScript==
// @name          KL URL Jumper
// @author        kl
// @description   URL 跳转
// @include       http://blogs.wsj.com/photojournal/*
// @include       *?utm_source=*
// @include       */*&utm_source=*
// @include       http://t.dangdang.com/ddindex_pop
// @include       http://img.ifeng.com/tres/html/pop_page.html*
// @include       http://*.mtime.cn/*_160X160.jpg
// @include       *://*.google.com/url*
// @include       *://*.google.com.*/url*
// @include       *://*.google.com/news/url*
// @include       *://*.google.com.*/news/url*
// @run-at        document-start
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version       0.0.2
// @history       0.0.2 2012-06-14
// @history       0.0.1 2012-05-15
// ==/UserScript==

var blhref=location.href;
var blhost=location.host; 

//不使用UserScript
if (blhref.indexOf("?userjs=no")>0 || blhref.indexOf("&userjs=no")>0){return;}

var blarray;
var blat;
var bldate;
var bltext;
var i;

//mtime
if (blhost.indexOf(".mtime.cn")>0){
	blhref=blhref.replace("_160X160.jpg","_900.jpg");
	window.location=blhref;
	return;
}

//访问WSJ PhotoJournal时自动跳转到print页面
bltext="http://blogs.wsj.com/photojournal/";
bldate="2011/11/30/"
if (blhref.indexOf(bltext)==0 && blhref.length>bltext.length+bldate.length && blhref.indexOf("/tab/print")==-1){
	blat=blhref.indexOf("?");
	if (blat>=0){
		blhref=blhref.substring(0,blat-1);
	}
	blhref=blhref+"/tab/print/";
	blhref=blhref.replace("//tab/","/tab/");
	window.location=blhref;
	return;
}

//去掉网址中的utm_source部分
if (blhref.indexOf("?utm_source=")>0){location.href=blhref.substring(0,blhref.indexOf("?utm_source="));return;}
if (blhref.indexOf("&utm_source=")>0){location.href=blhref.substring(0,blhref.indexOf("&utm_source="));return;}

//google+ 链接跳转404
if (blhost.indexOf(".google.com")>0 && blhref.indexOf("/url")>0){
	if (blhref.indexOf("%26url%3D")>0){
		blhref=blhref.substring(blhref.indexOf("%26url%3D")+9);
		if (blhref.indexOf("%26usg%3D")>=0){
			blhref=blhref.substring(0,blhref.indexOf("%26usg%3D"));
		}
		
		blhref=blhref.replace(new RegExp("%253A","gm"),":");
		blhref=blhref.replace(new RegExp("%252F","gm"),"/");
		blhref=blhref.replace(new RegExp("%253D","gm"),"=");
		blhref=blhref.replace(new RegExp("%253F","gm"),"?");
		blhref=blhref.replace(new RegExp("%2526","gm"),"&");
		blhref=blhref.replace(new RegExp("%2525","gm"),"%");
		location.href=blhref;
		return;
	}
	if (blhref.indexOf("&url=")>0){
		blhref=blhref.substring(blhref.indexOf("&url=")+5);
		if (blhref.indexOf("&usg=")>=0){
			blhref=blhref.substring(0,blhref.indexOf("&usg="));
		}

		if (blhref.indexOf("&ei=")>=0){
			blhref=blhref.substring(0,blhref.indexOf("&ei="));
		}
		
		blhref=blhref.replace(new RegExp("%3A","gm"),":");
		blhref=blhref.replace(new RegExp("%2F","gm"),"/");
		blhref=blhref.replace(new RegExp("%3D","gm"),"=");
		blhref=blhref.replace(new RegExp("%3F","gm"),"?");
		blhref=blhref.replace(new RegExp("%26","gm"),"&");
		blhref=blhref.replace(new RegExp("%25","gm"),"%");
		location.href=blhref;
		return;
	}
	return;
}

//关闭一些页面
blarray=["http://t.dangdang.com/ddindex_pop","http://img.ifeng.com/tres/html/pop_page.html"];
for (i=0;i<blarray.length;i++){
	if (blhref.indexOf(blarray[i])>=0){
		window.close();
		return;
	}
}