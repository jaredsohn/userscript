// ==UserScript==
// @name        pibux
// @namespace   pibux
// @include     *://*pibux.com/?x=advertisements
// @include     *://*pibux.com/?x=advertisements_view*
// @require     http://userscripts.org/scripts/source/159898.user.js
// @include     *://*.*cks.com/
// @include     *://*cl.my/*
// @include     *://*link.com/*
// @include     *://*oc.us/*
// @include     *://*df.ly/*
// @include     *://*ad7.biz/*
// @include     *://*link.fr/*
// @version     1
// ==/UserScript==

if((wparent.location.href.indexOf("x=advertisements")!=-1&&wparent.location.href.indexOf("x=advertisements_view")==-1)&&top==self){var arr=[],ctr=0;var div=$("<div>");var clickNum=ctr+1;var loading=0;div.css({zIndex:1000000,textAlign:"center",padding:5,position:"fixed",width:399,height:20,background:"#AFFFAF",border:"2px solid green",bottom:10,right:10}).text("clicking: "+clickNum+" loading : "+loading);$("body").css({position:"relative"}).append(div);$.each($(".advert-category-box  a"),function(b,a){objj[b];if($(a).attr("href")){if($(a).attr("href").indexOf("x=advertisements_view")>=0&&!$(a).parent().parent().hasClass("blocked")){var c={href:$(a).attr("href"),jObj:$(a).parent().parent()};arr.push(c)}}});console.log(arr.length);console.log(arr);function rec(b){loading=0;if(arr[b]){wparent.open(arr[b].href,"","width=100,height=100,top=1000,left=20000");div.text("clicking : "+clickNum+" / "+arr.length+" - loading : "+loading)}else{var c=120000;var a=setInterval(function(){c-=1000;div.text("reloading :"+c);if(c==0){clearInterval(a);window.location.reload()}},1000)}}rec(ctr);wparent.success=function(a){if(a=="retry"){setTimeout(function(){rec(ctr)})}else{arr[ctr].jObj.text("done").css({background:"#000",color:"#FFF"});ctr++;clickNum=ctr+1;setTimeout(function(){rec(ctr)})}}}if(wparent.location.href.indexOf("x=advertisements_view")!=-1){var div=$("<div>");div.css({zIndex:1000000,textAlign:"center",padding:5,position:"fixed",width:85,height:20,background:"#AFFFAF",border:"2px solid green",bottom:10,right:10}).text("");$("html").css({position:"relative"}).append(div);var timers=(wparent.c/10);var inters=setInterval(function(){div.text("loading:"+(timers--))},1000);$.ajaxSetup({complete:function(f,e,h,g){console.log(f);console.log(e);console.log(h);console.log(g);if(f.statusText=="OK"){wparent.opener.success("");wparent.close()}else{wparent.opener.success("retry");wparent.close()}}})}else{if(wparent.location.href.indexOf("ucks.com")!=-1&&self==top){var wind=$(window)[0];var wparent=(wind.wrappedJSObject)?wind.wrappedJSObject:wind;$(function(b){var a=16;var c=b("<div>");c.css({textAlign:"center",padding:5,position:"fixed",width:80,height:20,background:"#AFFFAF",border:"2px solid green",top:10,left:10}).text("counter : "+a);b("body").css({position:"relative"}).append(c);b("#framebar").css({opacity:0});setInterval(function(){a--;if(a==0){wparent.close()}c.text("counter : "+a)},1000)})}};