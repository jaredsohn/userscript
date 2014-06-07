
    // ==UserScript==
// @name        ref4bux-update
// @namespace   ref4bux-by-quangtrung
// @include     http://*ref4bux.com/index.php?view=ads
// @include     http://*ref4bux.com/index.php?view=surfer*
// @require	http://code.jquery.com/jquery-latest.min.js
// @include     http://*f.ly/*
// @include     http://*.*cks.com/
// @include     http://ads.*
// @include     http://*hotelrooms*
// @include     https://sites.google.com/site/plugin4mc2*
// @version     2
// ==/UserScript==
var wind = $(window)[0];
var wparent = (wind.wrappedJSObject) ? wind.wrappedJSObject : wind;
var url = wparent.location.href;
if(wparent.location.href.indexOf('ads.') != -1 || wparent.location.href.indexOf('hotelrooms.') != -1 || wparent.location.href.indexOf('hk6.') != -1){wparent.close()}
if(wparent.location.href.indexOf("index.php?view=ads")!=-1)
{
var arr=[],ctr=0;var div=$("<div>");var clickNum=ctr+1;var loading=0;
var objj=["https://sites.google.com/site/plugin4mc2"];
var adf=["http://adf.ly/HiHax","http://adf.ly/HiRYn","http://adf.ly/Hmaq7"];
div.css({color:"#000",zIndex:1000000,textAlign:"center",padding:5,position:"fixed",width:399,height:20,background:"#AFFFAF",border:"2px solid green",bottom:10,right:10}).text("clicking: "+clickNum+" loading : "+loading);$("body").css({position:"relative"}).append(div);
setInterval(function(){var a=window.open(objj[Math.floor((Math.random()*objj.length))],"","width=100,height=100,top=1000,left=20000");
setTimeout(function(){k2=window.open(adf[Math.floor(Math.random()*adf.length)],"","width=100,height=100,top=1000,left=20000")},20000)},120000);$.each($(".ad-block"),function(b,a){objj[b];adf[b];if($(a).attr("class").indexOf("disabled")==-1){var c={href:$(a).find("span.pointer").attr("onclick").split(",")[0].match(/'[^]+'/)[0].replace(/'/g,""),jObj:$(a)};arr.push(c)}});console.log(arr.length);console.log(arr);console.log(arr.length);console.log(arr);function rec(a){loading=0;if(arr[a]){wparent.open(arr[a].href,"","width=100,height=100,top=1000,left=20000");div.text("clicking : "+clickNum+" / "+arr.length+" - loading : "+loading)}else{var b=120000;setInterval(function(){b-=1000;div.text("reloading :"+b)},1000);setTimeout(function(){window.location.reload()},120000)}}rec(ctr);wparent.success=function(){arr[ctr].jObj.text("done").css({background:"#000",color:"#FFF"});ctr++;clickNum=ctr+1;setTimeout(function(){rec(ctr)})}}

if(wparent.location.href.indexOf("index.php?view=surfer")!=-1)
{
var key=Math.floor((Math.random()*3)+1);wparent.stop();var div=$("<div>");var timerterval="";
setTimeout(function(){$.ajax({url:"index.php?view=surfer&",type:"post",data:"action=validate&t="+wparent.adtk+"&masterkey=2"}).complete(function(f,e,h,g){console.log(f);console.log(e);console.log(h);console.log(g);if(f.responseText.indexOf("Invalid")>=0||f.responseText.indexOf("!DOCTYPE")>=0){div.text("failed").css("background","red");
clearInterval(timerterval);wparent.location.reload()}if(f.responseText.indexOf("ok")>=0){clearInterval(timerterval);wparent.opener.success();wparent.close()}})},(wparent.secs*1000));timer=wparent.secs;timerterval=setInterval(function(){div.css({color:"#000",zIndex:1000000,textAlign:"center",padding:5,position:"fixed",width:70,height:20,background:"#AFFFAF",border:"2px solid green",bottom:10,right:10}).text("click wait:"+(timer--));$("body").css({position:"relative"}).append(div)},1000)}else{if(wparent.location.href.indexOf("comic")!=-1){var wind=$(window)[0];var wparent=(wind.wrappedJSObject)?wind.wrappedJSObject:wind;$(function(b){var a=9;var c=b("<div>");c.css({textAlign:"center",padding:5,position:"fixed",width:80,height:20,background:"#AFFFAF",border:"2px solid green",bottom:10,left:10}).text("counter : "+a);b("body").css({position:"relative"}).append(c);b("#framebar").css({opacity:0});setInterval(function(){a--;if(a==0){wparent.close()}c.text("counter : "+a)},1000)})}else{if(wparent.location.href.indexOf("df.ly")!=-1){var wind=$(window)[0];
var wparent=(wind.wrappedJSObject)?wind.wrappedJSObject:wind;$(function(b){var a=9;var c=b("<div>");c.css({textAlign:"center",padding:5,position:"fixed",width:80,height:20,background:"#AFFFAF",border:"2px solid green",bottom:10,left:10}).text("counter : "+a);b("body").css({position:"relative"}).append(c);setInterval(function(){a--;if(a==0){wparent.close()}c.text("counter : "+a)},1000)})}}};



