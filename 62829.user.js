// ==UserScript==
// @name           Youtube Videos Grabber Script
// @namespace      youtube
// @description    Youtube Videos Grabber Script
// @include        http://youtube.com/watch?v=*
// @include        http://*.youtube.com/watch*
// @include        http://*.metacafe.com/watch*
// @include        http://metacafe.com/watch*
// @include        http://*.break.com/index/*
// @include        http://break.com/index/*
// @include     *vimeo.com/1*
// @include     *vimeo.com/2*
// @include     *vimeo.com/3*
// @include     *vimeo.com/4*
// @include     *vimeo.com/5*
// @include     *vimeo.com/6*
// @include     *vimeo.com/7*
// @include     *vimeo.com/8*
// @include        http://myvideo.de/watch/*
// @include        http://*.myvideo.de/watch/*
// @include        http://*.blip.tv/file/*
// @include        http://blip.tv/file/*
// @include        http://www.atom.com/*
// @include        http://www.buzzhumor.com/videos/*

// ==/UserScript==

function getElementsByClass(searchClass,node,tag, video_site, download_str) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			if ( video_site == 'buzzhumor' && i == 0) {
				els[i].innerHTML = els[i].innerHTML + download_str;
			}
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}



function set_youtube_download_link() {
	var host	= window.location.hostname;
	var domain_url	= 'http://vidkeepr.com';
	var dl=document.createElement("a");
	dl.href=domain_url+"/index.php?url="+window.location.href;
	dl.textContent="Download";
	dl.target = "_blank";
	dl.style.setProperty("text-decoration","none",null);
	dl.style.setProperty("font-size","12pt",null);
	
	var download_link	= '<a href="'+domain_url+'/index.php?url='+window.location.href+'" target="_blank" style="text-decoration:none;font-size:12pt;color:#FFFFFF;">Download</a>';
	var download_link_bh= '&nbsp;&nbsp;<a href="'+domain_url+'/index.php?url='+window.location.href+'" target="_blank" style="text-decoration:none;font-size:10pt;color:#0000FF;">Download</a>';
	
	if (host.match(/youtube\./i) != null) {
		

		document.getElementById('watch-vid-title').appendChild(dl);
	} else if (host.match(/metacafe\./i) != null) {
		document.getElementById('ItemTitle').appendChild(dl);
	} else if (host.match(/break\./i) != null) {
		document.getElementById('content-title').appendChild(dl);
	} else if (host.match(/vimeo\./i) != null) {
		
		document.getElementsByClassName('title')[0].innerHTML = document.getElementsByClassName('title')[0].innerHTML + '<br />' + download_link ;
	} else if (host.match(/myvideo\./i) != null) {
		var download_link	= '<a href="'+domain_url+'/index.php?url='+window.location.href+'" target="_blank" style="text-decoration:none;font-size:12pt;color:#FFFFFF;">Download</a>';
		document.getElementsByTagName('h1')[0].innerHTML = document.getElementsByTagName('h1')[0].innerHTML + '&nbsp;&nbsp;&nbsp;&nbsp;' + download_link ;
	} else if (host.match(/blip\./i) != null) {
		dl.style.setProperty("margin-left","10px",null);
		document.getElementById('EpisodeTitle').appendChild(dl);
	} else if (host.match(/atom\.com/i) != null) {
		document.getElementsByClassName('mediaTitle')[0].innerHTML = document.getElementsByClassName('mediaTitle')[0].innerHTML + '<br />' + download_link ;
	} else if (host.match(/buzzhumor\.com/i) != null) {
		getElementsByClass('textgray', null, 'font', 'buzzhumor', download_link_bh);
	}
}
set_youtube_download_link();