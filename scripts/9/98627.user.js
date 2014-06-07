 
// ==UserScript==
// @name           Facebook Video İndirici
// @namespace      Serkan Algur
// @description    Facebook videolarını indir
// @include        http://*facebook.com/video/*
// @include        https://*facebook.com/video/*
// @include	   http://*facebook.com/*
// @include	   https://*facebook.com/*
// ==/UserScript==

var script_tags = document.getElementsByTagName('script');
var found = new Boolean();
var hd = new Boolean();
var low = new Boolean();
var shell_executable = new Boolean();	//If true then all '&' are replaced by '\&' for safe
					//	shell execution.
var i = 0;
var hd_video_url = "";
var video_url = "";
var temp = "";
var hd_download_link = document.createElement('a');
var download_link = document.createElement('a');
var description_div = document.getElementById('video_metadata');

hd_download_link.setAttribute('target','_blank');
hd_download_link.setAttribute('title','Bu Videoyu İndir');
download_link.setAttribute('target','_blank');
download_link.setAttribute('title','Bu videoyu indir');
description_div.innerHTML = description_div.innerHTML + "<br /><br />";
shell_executable = false;
found = false;
hd = false;
low = false;

function decode(url) {
	url = url.substring(url.indexOf(","),url.indexOf(";"));
	url = url.substring(url.indexOf('"'),url.indexOf(")"));
	url = url.substring(url.indexOf('"'));
	url = url.substring(1,url.length-1);
	if(url.search(/https/) != -1){ url = url.replace("https","http"); }
	url = url.replace(/\\u00253A/g,":");
	url = url.replace(/\\u00252F/g,'/');
	url = url.replace(/\\u00253F/g,"?");
	url = url.replace(/\\u00253D/g,"=");
	if(shell_executable) { temp="\\&"; }
	else { temp = "&"; }
	url = url.replace(/\\u002526/g,temp);
	
	return url;
}

for(i = 0;i < script_tags.length && found == false;i++){
	temp = script_tags[i];
	temp = temp.innerHTML;
	if(temp.search(/video_src/) != -1){
		video_url = temp;
		low = true;
	}
	if(temp.search(/highqual_src/) != -1){
		hd_video_url = temp;
		hd = true;
	}
}

if(hd == true){
	hd_video_url = hd_video_url.substring(hd_video_url.indexOf("highqual_src"),hd_video_url.indexOf("lowqual_src"));
	hd_video_url = decode(hd_video_url);
	hd_download_link.setAttribute('href',hd_video_url);
	hd_download_link.innerHTML = "<span style='display:block;background:black;color:white;width:85px;font-weight:bold'>Video İndir HQ</span><br />";
	description_div.appendChild(hd_download_link);
}
	
if(low == true){
	video_url = video_url.substring(video_url.indexOf("video_src"),video_url.indexOf("motion_log"));
	video_url = decode(video_url);
	download_link.setAttribute('href',video_url);
	download_link.innerHTML = "<span style='display:block;background:black;color:white;width:85px;font-weight:bold;'>Video İndir LQ</span>";
	description_div.appendChild(download_link);
}