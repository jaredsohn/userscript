// ==UserScript==
// @name          YouTube to me (modified)
// @namespace     http://www.joshkinberg.com/ (http://dev.thewheatfield.org/userscripts)
// @description   Provides download links for Flash FLV and MP4 files hosted by YouTube.com
// @include       http://*youtube.*/*
// ==/UserScript==

// Version 1.0 initial release
// Version 1.1 
//	added MP4 download link
//	changed download link to below video name (if cannot find, revert to banner at top of screen)

// YouTube URL: http://www.youtube.com/watch?v=[video_id]
// YouTube download link: http://youtube.com/get_video?video_id=[video_id]&t=[t_id]&fmt=[format]
//		fmt=18			MP4
//		fmt not specified	FLV



var page_scripts, script;
page_scripts = document.evaluate(
    "//script",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var pos;

var video_id = 0;
var t;
var title;

var variable_str = '';
var STR_VIDEO_ID = "video_id";
var STR_T = "t";
var STR_TITLE = "title";
var VAR_MP4 = "&fmt=18"
var DOWNLOAD_PAGE = "http://youtube.com/get_video?";
var download_url =  DOWNLOAD_PAGE + STR_VIDEO_ID + '=';

function stripslashes(str) 
{
	str=str.replace(/\\'/g,'\'');
	str=str.replace(/\\"/g,'"');
	str=str.replace(/\\\\/g,'\\');
	str=str.replace(/\\0/g,'\0');
	return str;
}

for (var i = 0; i < page_scripts.snapshotLength; i++) 
{    
	script = page_scripts.snapshotItem(i);
		if((pos = script.text.indexOf('fullscreenUrl')) != -1)
	{
		pos = script.text.indexOf('?', pos);
		variable_str = stripslashes(script.text.substring(pos+1, script.text.indexOf('\';', pos)));
		video_id=variable_str.match(/video_id=([^(\&|$)'"]*)/)[1];
		t=variable_str.match(/t=([^(&)]*)/)[1];
		title=variable_str.match(/title=([^(&\)]*)/)[1];
		break;
	}

}

if (video_id != 0)
{
	var video_url = download_url + video_id + '&t=' + t;
	var dldLinks = '<a href="' + video_url + '">Save FLV</a>' +
					' | <a href="' + video_url + VAR_MP4 + '">Save MP4' +
					'';
	var my_banner = document.createElement("div");
	my_banner.innerHTML = '<div style="padding: 5px; border: 0px solid #000; background-color: #ccc; color: #030; font-size:10px;font-weight:bold;text-align:center">' +
	    title + ' : ' + dldLinks + 
	    '</div>';
	
	var video_title = document.getElementById('watch-vid-title');
	if (video_title)
	{
		video_title.innerHTML += dldLinks;
	}
	else
	{
		document.body.insertBefore(my_banner, document.body.firstChild);
	}
	// clean up body margin
	
	
	document.body.style.margin = '0px';
}