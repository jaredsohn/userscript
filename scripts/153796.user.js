// ==UserScript==
// @id   	VK-Audio-Download
// @name   	VK-Audio-Download
// @version   	1.0
// @namespace   http://vk.com/*
// @author   	Lomakin Anton
// @description Script for downloading audio files from the vk.com.
// @include   	http://vk.com/*
// @copyright   2012+, Lomakin Anton (http://t0h.livejournal.com/)
// @licence     LGPL 3
// @grant       none
// @run-at      document-end
// ==/UserScript==

var image_dwnl='<img src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Njk0ODU1QUI0MEFGMTFFMjk5QzdCMTFCNDZFMEE1RTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Njk0ODU1QUM0MEFGMTFFMjk5QzdCMTFCNDZFMEE1RTAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2OTQ4NTVBOTQwQUYxMUUyOTlDN0IxMUI0NkUwQTVFMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2OTQ4NTVBQTQwQUYxMUUyOTlDN0IxMUI0NkUwQTVFMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psmg/HQAAACVSURBVHjaYmQAglkbj7EePXP9FwPx4Je1iaYIkP7MBNTMTKJmEGAD6vkEpLmYhVSt/jGQCR4/e1PNgktyQVMSCj+hbh5WdUwMFIKBN4CFkN/RxdHDAsMFuAILlxwTsQpJjgVkDfhcxYIvgPBpxGoArgDEZzALqTZihAEwV5GdFoB62ZiAueo/kMFOhmaxVD/L3wABBgCr9TPyrhjYyQAAAABJRU5ErkJggg=="/>';

function audiofirefox(){
		var  main_div=document.getElementsByClassName("area clear_fix");

		for(var i=0;i<main_div.length;i++){ 
			if(main_div[i].firstChild.href || main_div[i].firstChild.top=="6px"){
				main_div[i].firstChild.style.top="9px";
				continue;
				}
			var mp3=main_div[i].getElementsByTagName("input")[0].value.split(",")[0];
			var b=main_div[i].getElementsByTagName("b")[0];
			
			var a=document.createElement("a");
			a.href=""+mp3;
			a.target='_blank';
			a.innerHTML=image_dwnl;
			a.style.position="absolute";
			a.style.zIndex="10";
			a.style.left="30px";
			a.style.top="9px";
			main_div[i].insertBefore(a, main_div[i].firstChild);
			b.style.paddingLeft="25px";
			}
		}


function searchfirefox(){
		var  main_div=document.getElementsByClassName("area clear_fix");

		for(var i=0;i<main_div.length;i++){
			if(main_div[i].firstChild.href){continue;}
			var mp3=main_div[i].getElementsByTagName("input")[0].value.split(",")[0];
			var b=main_div[i].getElementsByTagName("b")[0];
			
			var a=document.createElement("a");
			a.href=""+mp3;
			a.target='_blank';
			a.innerHTML=image_dwnl;
			a.style.position="absolute";
			a.style.zIndex="10";
			a.style.left="30px";
			a.style.top="6px";
			main_div[i].insertBefore(a, main_div[i].firstChild);
			b.style.paddingLeft="25px";
			}
		}


function otherpagesfirefox(){
		var  main_div=document.getElementsByClassName("area clear_fix");

		for(var i=0;i<main_div.length;i++){
			if(main_div[i].firstChild.href){continue;}
			var mp3=main_div[i].getElementsByTagName("input")[0].value.split(",")[0];
			var b=main_div[i].getElementsByTagName("b")[0];
			
			var a=document.createElement("a");
			a.href=""+mp3;
			a.target='_blank';
			a.innerHTML=image_dwnl;
			a.style.position="absolute";
			a.style.zIndex="10";
			a.style.left="30px";
			a.style.top="6px";
			main_div[i].insertBefore(a, main_div[i].firstChild);
			b.style.paddingLeft="25px";
			}
		}

function firefox_time(){
	if(location.href.replace('http://').split('/')[1].substring(0,5)=='audio')	audiofirefox();
	if(location.href.replace('http://').split('/')[1].substring(0,6)=='search')	searchfirefox();
	if(location.href.replace('http://').split('/')[1].substring(0,6)!='search' && location.href.replace('http://').split('/')[1].substring(0,5)!='audio')	otherpagesfirefox();
	}

function browser(){
	setInterval(firefox_time,100);
	}
window.addEventListener('load', browser, false);