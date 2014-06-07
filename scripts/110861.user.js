// ==UserScript==
// @name           Facebook Video Downloader
// @description    Download link for Facebook Videos
// @Author      Ronald Carnate
// @include     http://facebook.com/video/*
// @include     http://*.facebook.com/video/*
// @include     https://facebook.com/video/*
// @include     https://*.facebook.com/video/*
// ==/UserScript==


function download_video(){
	var script_tags = document.getElementsByTagName('script');
	var found = new Boolean();
	var hd = new Boolean();
	var low = new Boolean();
	var i = 0;
	var hd_video_url = "";
	var video_url = "";
	var temp = "";
	var hd_download_link = document.createElement('a');
	var download_link = document.createElement('a');
	var description_div = document.getElementById('video_metadata');

	if(description_div == null){
		window.location.reload();
	}

	hd_download_link.setAttribute('target','_blank');
	hd_download_link.setAttribute('title','Download this video');
	
	download_link.setAttribute('target','_blank');
	download_link.setAttribute('title','Download this video');
	
	description_div.innerHTML = description_div.innerHTML + "<br /><br />";
	
	found = false;
	hd = false;
	low = false;

	function decode(url) {
		url = url.substring(url.indexOf(","),url.indexOf(";"));
		url = url.substring(url.indexOf('"'),url.indexOf(")"));
		url = url.substring(url.indexOf('"'));
		url = url.substring(1,url.length-1);
	
		url = url.replace(/\\u00253A/g,":");
		url = url.replace(/\\u00252F/g,'/');
		url = url.replace(/\\u00253F/g,"?");
		url = url.replace(/\\u00253D/g,"=");
		url = url.replace(/\\u002526/g,"&");
	
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

	if(hd === true){
		hd_video_url = hd_video_url.substring(hd_video_url.indexOf("highqual_src"),hd_video_url.indexOf("lowqual_src"));
		hd_video_url = decode(hd_video_url);
		
		hd_download_link.setAttribute('href',hd_video_url);
		hd_download_link.innerHTML = "Download High Quality<br />";
		
		description_div.appendChild(hd_download_link);
	}
	
	if(low === true){
		video_url = video_url.substring(video_url.indexOf("video_src"),video_url.indexOf("motion_log"));
		video_url = decode(video_url);
		
		download_link.setAttribute('href',video_url);
		download_link.innerHTML = "Download Low Quality";
		
		description_div.appendChild(download_link);
	}

	if(low === false){
		window.setTimeout("download_video",1000);
	}
}

download_video();