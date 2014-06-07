// ==UserScript==
// @name VK-Download
// @description Script for downloading audio and video files from the vk.com.
// @author Ilya Snegirev
// @version 1.4.21
// @homepage http://vk-download.ru/
// @include http://*vk.com/*
// ==/UserScript==

function audio(){
		var main_div=document.getElementsByClassName("area clear_fix");
			for(var i=0;i<main_div.length;i++){ 
				if(main_div[i].parentNode.firstChild.href){
					main_div[i].parentNode.firstChild.style.top=main_div[i].getElementsByClassName('play_new')[0].offsetTop+"px";
					continue;
					}
					var _mp3_=main_div[i].getElementsByTagName("input")[0].value.split(",")[0];
					var _b_=main_div[i].getElementsByTagName("b")[0];
					var _top_=document.getElementById(main_div[0].parentNode.id.replace('audio','play')).offsetTop+"px";
					var _t_=main_div[i].getElementsByClassName('play_new')[0].offsetTop+"px";
					var _a_=document.createElement("a");
					_a_.href="http://vk-download.ru/download.html?a="+_mp3_;
					_a_.target='_blank';
					_a_.innerHTML='<img src="http://vk-download.ru/dlicon.png" title="Download" width="16px" height="16px">';
					_a_.style.zIndex="10";
					_a_.style.left="30px";
					_a_.style.top=_t_;
					_a_.style.position="absolute";
					main_div[i].parentNode.insertBefore(_a_,main_div[i].parentNode.firstChild);
					_b_.style.paddingLeft="25px";
				}
		}

function videod(){
	if(document.getElementsByClassName("video_box_wrap")[0] && !document.getElementById('download') && document.getElementById('video_player').tagName!='IFRAME'){
var inner_video="";
var o = new Object();
var name=new Array();
var content=new Array();
var f=encodeURI(unescape(document.getElementsByClassName("video_box_wrap")[0].innerHTML.split(" ")[8].split('"')[1].replace(/amp;/g,"")));

var flashvars=f.split("&");

for(var c=0;c<=flashvars.length-1;c++){
 name[c]=flashvars[c].split("=")[0];
 content[c]=flashvars[c].split("=")[1];
}

for(var c2=0;c2<=name.length;c2++){
 o[name[c2]]=content[c2];
}



o.thumb=o.thumb.replace("http://","");


if(o.cache_base_0 && o.no_flv==1){
 var mp4_240="http://cs"+o.cache_base_0.split("/")[0]+".vk.com/d"+o.cache_base_0.split("/")[1]+"/"+o.cache_file_0+".240.mp4";
 inner_video=inner_video+"<a style='color:white;background-color:#43678E;padding:5px 5px 2px 5px;border:#395A7C;'  target='_blank' href='http://vk-download.ru/video.html?v="+mp4_240+"'>240</a> ";

}

if(o.cache_base_1 && o.no_flv==1){
 var mp4_360="http://cs"+o.cache_base_1.split("/")[0]+".vk.com/d"+o.cache_base_1.split("/")[1]+"/"+o.cache_file_1+".360.mp4";
 inner_video=inner_video+"<a style='color:white;background-color:#43678E;padding:5px 5px 2px 5px;border:#395A7C;'  target='_blank' href='http://vk-download.ru/video.html?v="+mp4_360+"'>360</a> ";

}

if(o.cache_base_2 && o.no_flv==1){
 var mp4_480="http://cs"+o.cache_base_2.split("/")[0]+".vk.com/d"+o.cache_base_2.split("/")[1]+"/"+o.cache_file_2+".480.mp4";
 inner_video=inner_video+"<a style='color:white;background-color:#43678E;padding:5px 5px 2px 5px;border:#395A7C;'  target='_blank' href='http://vk-download.ru/video.html?v="+mp4_480+"'>480</a> ";

}

if(o.cache_base_3 && o.no_flv==1){
 var mp4_720="http://cs"+o.cache_base_3.split("/")[0]+".vk.com/d"+o.cache_base_3.split("/")[1]+"/"+o.cache_file_3+".720.mp4";
 inner_video=inner_video+"<a style='color:white;background-color:#43678E;padding:5px 5px 2px 5px;border:#395A7C;'  target='_blank' href='http://vk-download.ru/video.html?v="+mp4_720+"'>720</a> ";

}






if(!o.cache_base_0 || !o.cache_base_1 || !o.cache_base_2 || !o.cache_base_3 && o.no_flv==1){
if(o.hd==3 && o.no_flv==1){
 if(!o.cache_base_0 && o.no_flv==1){

  var mp4_240="http://cs"+o.host+".vk.com/"+o.thumb.split("/")[1]+"/videos/"+o.vtag+".240.mp4";
  inner_video=inner_video+"<a style='color:white;background-color:#43678E;padding:5px 5px 2px 5px;border:#395A7C;'  target='_blank' href='http://vk-download.ru/video.html?v="+mp4_240+"'>240</a> ";

 }
 if(!o.cache_base_1 && o.no_flv==1){

  var mp4_360="http://cs"+o.host+".vk.com/"+o.thumb.split("/")[1]+"/videos/"+o.vtag+".360.mp4";
  inner_video=inner_video+"<a style='color:white;background-color:#43678E;padding:5px 5px 2px 5px;border:#395A7C;'  target='_blank' href='http://vk-download.ru/video.html?v="+mp4_360+"'>360</a> ";

 }
 if(!o.cache_base_2 && o.no_flv==1){

  var mp4_480="http://cs"+o.host+".vk.com/"+o.thumb.split("/")[1]+"/videos/"+o.vtag+".480.mp4";
  inner_video=inner_video+"<a style='color:white;background-color:#43678E;padding:5px 5px 2px 5px;border:#395A7C;'  target='_blank' href='http://vk-download.ru/video.html?v="+mp4_480+"'>480</a> ";

 }
 if(!o.cache_base_3 && o.no_flv==1){

 var mp4_720="http://cs"+o.host+".vk.com/"+o.thumb.split("/")[1]+"/videos/"+o.vtag+".720.mp4";
 inner_video=inner_video+"<a style='color:white;background-color:#43678E;padding:5px 5px 2px 5px;border:#395A7C;'  target='_blank' href='http://vk-download.ru/video.html?v="+mp4_720+"'>720</a> ";

 }
}
if(o.hd==2 && o.no_flv==1){
 if(!o.cache_base_0 && o.no_flv==1){

  var mp4_240="http://cs"+o.host+".vk.com/"+o.thumb.split("/")[1]+"/videos/"+o.vtag+".240.mp4";
  inner_video=inner_video+"<a style='color:white;background-color:#43678E;padding:5px 5px 2px 5px;border:#395A7C;'  target='_blank' href='http://vk-download.ru/video.html?v="+mp4_240+"'>240</a> ";

 }
 if(!o.cache_base_1 && o.no_flv==1){

  var mp4_360="http://cs"+o.host+".vk.com/"+o.thumb.split("/")[1]+"/videos/"+o.vtag+".360.mp4";
  inner_video=inner_video+"<a style='color:white;background-color:#43678E;padding:5px 5px 2px 5px;border:#395A7C;'  target='_blank' href='http://vk-download.ru/video.html?v="+mp4_360+"'>360</a> ";

 }
 if(!o.cache_base_2 && o.no_flv==1){

 var mp4_480="http://cs"+o.host+".vk.com/"+o.thumb.split("/")[1]+"/videos/"+o.vtag+".480.mp4";
 inner_video=inner_video+"<a style='color:white;background-color:#43678E;padding:5px 5px 2px 5px;border:#395A7C;'  target='_blank' href='http://vk-download.ru/video.html?v="+mp4_480+"'>480</a> ";

 }
}
if(o.hd==1 && o.no_flv==1){
 if(!o.cache_base_0 && o.no_flv==1){

  var mp4_240="http://cs"+o.host+".vk.com/"+o.thumb.split("/")[1]+"/videos/"+o.vtag+".240.mp4";
  inner_video=inner_video+"<a style='color:white;background-color:#43678E;padding:5px 5px 2px 5px;border:#395A7C;'  target='_blank' href='http://vk-download.ru/video.html?v="+mp4_240+"'>240</a> ";

 }
 if(!o.cache_base_1 && o.no_flv==1){

 var mp4_360="http://cs"+o.host+".vk.com/"+o.thumb.split("/")[1]+"/videos/"+o.vtag+".360.mp4";
 inner_video=inner_video+"<a style='color:white;background-color:#43678E;padding:5px 5px 2px 5px;border:#395A7C;'  target='_blank' href='http://vk-download.ru/video.html?v="+mp4_360+"'>360</a> ";

 }
}
if(o.hd==0 && o.no_flv==1){

 var mp4_240="http://cs"+o.host+".vk.com/"+o.thumb.split("/")[1]+"/videos/"+o.vtag+".240.mp4";
 inner_video=inner_video+"<a style='color:white;background-color:#43678E;padding:5px 5px 2px 5px;border:#395A7C;'  target='_blank' href='http://vk-download.ru/video.html?v="+mp4_240+"'>240</a> ";

}
}




if(o.no_flv==0){
 if(o.host.substring(0, 5)!='video' && o.cache_base_0){
  var flv_240="http://cs"+o.cache_base_0.split("/")[0]+".vk.com/d"+o.cache_base_0.split("/")[1]+"/"+o.cache_file_0+".flv";
  inner_video=inner_video+"<a style='color:white;background-color:#43678E;padding:5px 5px 2px 5px;border:#395A7C;'  target='_blank' href='http://vk-download.ru/video.html?v="+flv_240+"'>Flv</a> ";
  }
 if(o.host.substring(0, 5)!='video' && !o.cache_base_0){
  var flv_240="http://cs"+o.host+".vk.com/u"+o.oid+"/videos/"+o.vtag+".flv";
  inner_video=inner_video+"<a style='color:white;background-color:#43678E;padding:5px 5px 2px 5px;border:#395A7C;'  target='_blank' href='http://vk-download.ru/video.html?v="+flv_240+"'>Flv</a> ";
  }
 if(o.host.substring(0, 5)=='video'){
  var flv_240="http://"+o.host+"/assets/video/"+o.vtag+o.vkid+".vk.flv";
  inner_video=inner_video+"<a style='color:white;background-color:#43678E;padding:5px 5px 2px 5px;border:#395A7C;'  target='_blank' href='http://vk-download.ru/video.html?v="+flv_240+"'>Flv</a> ";
  }
}

var video_download=document.createElement("div");
video_download.style.width="auto";
video_download.style.height="auto";
video_download.style.paddingBottom="5px";
video_download.id="download";
video_download.innerHTML=inner_video;
document.getElementById("mv_narrow").insertBefore(video_download, document.getElementById("mv_narrow").firstChild);
}
	}


setInterval(function(){
	if(document.getElementsByClassName("area clear_fix").length!=0){
		audio();
		}
	if(document.getElementById('video_player')){
		videod();
		}
},400);