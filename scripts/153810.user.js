// ==UserScript==
// @name        YouTube Addon: See More Uploader Videos
// @description See a selection of other videos from the uploader of the video you are watching.
// @author		Andrew Burns (OnlyFails)
// @license		Creative Commons Attribution License
// @namespace	http://www.youtube.com/burnsy96
// @include     http://www.youtube.com/watch?*
// @include     https://www.youtube.com/watch?*
// @version     1.0.1.5
// @released	2012-12-10
// @updated		2012-12-10
// @compatible	Greasemonkey
// @grant		GM_xmlhttpRequest
// ==/UserScript==

/* 
 * This file is a Greasemonkey user script. To install it, you need 
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit 
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 * 
 * To uninstall this script, go to your "Tools" menu and select 
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
 *
 * Creative Commons Attribution License (--> or Public Domain)
 * http://creativecommons.org/licenses/by/2.5/
*/

// Loading Screen
var ap = document.getElementById("watch7-action-panels"); // Action Panels
var but = document.getElementById("watch7-secondary-actions"); // Action Buttons

// Custom Action Button Name
var can = "More";
localStorage.can = can;
// Custom Action Button Object
var cab = "<span><button id=\"action-panel-spanbutton-" + can.toLowerCase() + "\" role=\"button\" data-trigger-for=\"action-panel-" + can.toLowerCase() + "\" data-button-toggle=\"true\" onclick=\";return false;\" class=\"action-panel-trigger yt-uix-button yt-uix-button-hh-text\" type=\"button\"><span class=\"yt-uix-button-content\">"+can+" </span></button></span>"
// Custom Action Content
var cact = "<div class=\"action-panel-loading\"><p class=\"yt-spinner\"><img alt=\"Loading icon\" class=\"yt-spinner-img\" src=\"//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif\">Loading...</p></div>";
// Custom Action Panel Object
var cap = "<div class=\"action-panel-content\" style=\"display:none;\" id=\"action-panel-" + can.toLowerCase() + "\" data-panel-loaded=\"true\" style=\"\">	<div id=\"watch-actions-" + can.toLowerCase() + "-loading\" style=\"display: none;\" class=\"hid\">		<div class=\"action-panel-loading\">			<p class=\"yt-spinner\"><img alt=\"Loading icon\" class=\"yt-spinner-img\" src=\"//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif\">Loading...</p>		</div>	</div>	<div id=\"watch-actions-" + can.toLowerCase() + "-panel\"><div class=\"" + can.toLowerCase() + "-panel\">"+cact+"</div></div></div>"

// Inject the elements into the page
ap.innerHTML = cap + ap.innerHTML;
but.innerHTML = cab + but.innerHTML;

// Discover the ID of the current video
var att = location.href.split("/watch?")[1].split("&");
var pageID = "";
for(var i = 0; i < att.length; i++)
{
	if(att[i].substr(0,2)=="v=")
	{
		pageID=att[i].substr(2);
		break;
	}
}
localStorage.pageID = pageID;

// Get the first page of videos from the uploader's channel
var MahTest = "http://youtube.com"+document.getElementById("watch7-user-header").getElementsByTagName("a")[2].getAttribute("href") + "?flow=list&view=0";
GM_xmlhttpRequest({
	method: "POST",
	url: MahTest,
	headers:
	{
		"Content-Type": "application/x-www-form-urlencoded"
	},
	onload: function(response)
	{
		// The VideoObject class
		function VideoObject()
		{
			this.vidimglnk="http://i2.ytimg.com/vi/mKkLjJHwRec/mqdefault.jpg";
			this.vidurllnk="http://youtube.com/burnsy96";
			this.viditemid="HuIdclEjmj8";
			this.videoname="Untitled";
			this.videoview=0;
			this.vidlength="0:00";
			this.videorate=100;
			this.vidoowner="burnsy96";
			this.vidupload="Now"
		}

		// Used to manage the size of previews (Currently Hard-coded!)
		var ImageScale = 0.80;
		var ImageSize = [120,90];
		
		// Video ID of the current Page
		var pageID = localStorage.pageID;
		
		// Current index of the video in the 'More From' section
		var pageIndex = (-1);
		
		// Current Video Scroll Offset
		var cvso = 0;
		
		// Hard Coding, TODO: Fix it?
		ImageSize[0] *= 4/3 * ImageScale; ImageSize[1] *= ImageScale;
		var VideoList = new Array();
		var VideoListRaw = response.responseText.split("feed-item-main");
		html = "<table><tr>";
		
		// This will parse the HTML code into VideoObject data
		for(var i = 1; i < VideoListRaw.length; i++)
		{
			var NewVideoObject = new VideoObject();
			NewVideoObject.videoname = VideoListRaw[i].split("data-context-item-title=\"")[1].split("\" data")[0];
			NewVideoObject.vidlength = VideoListRaw[i].split("data-context-item-time=\"")[1].split("\"")[0];
			NewVideoObject.vidoowner = VideoListRaw[i].split("data-context-item-user=\"")[1].split("\"")[0];
			NewVideoObject.viditemid = VideoListRaw[i].split("data-context-item-id=\"")[1].split("\"")[0];
			NewVideoObject.vidurllnk = "http://www.youtube.com/watch?v=" + NewVideoObject.viditemid;
			try{NewVideoObject.videoview = VideoListRaw[i].split("<span class=\"view-count\">")[1].split("  </")[0];}catch(e){NewVideoObject.videoview=""};
			try{NewVideoObject.vidimglnk = "http://" + VideoListRaw[i].split("data-thumb=\"")[1].split("\"")[0].substring(2);}catch(e){NewVideoObject.vidimglnk="http://i2.ytimg.com/vi/mKkLjJHwRec/mqdefault.jpg"}
			try{NewVideoObject.vidupload = VideoListRaw[i].split("time-published\">\n        ")[1].split("\n")[0]+"<br>";}catch(e){NewVideoObject.vidupload = ""};
			
			if(NewVideoObject.viditemid==pageID)
				pageIndex=i-1;
			
			VideoList[VideoList.length] = NewVideoObject;
		}
		
		// Hardcoded TODO: Fix it?
		cvso=151*(pageIndex-3);		// Make it: "cvso=151*(pageIndex-4);" w/o the quotes to not include your current video in the list
		if(pageIndex<0)
			cvso=151*(VideoList.length-4)	// Moar hard coding
		
		// The will create the list in HTML form
		for(var i = 0; i < VideoList.length; i++)
		{
			html += "<td style=\"padding-right: 3px\" id=\""+VideoList[i].viditemid+"\" valign=\"top\">"
			html += "<a onmouseover=\"document.getElementById('"+VideoList[i].viditemid+"').style.color='#1C62B9';\" onmouseout=\"document.getElementById('"+VideoList[i].viditemid+"').style.color='#333333';\" style=\"display: block; margin: 10px; text-decoration: none; font-weight: bold; text-height: 10px\" title=\""+VideoList[i].videoname+"\" data-sessionlink=\"ved=CAsQzRooCA%3D%3D&amp;ei=COb7kqnYjLQCFSjdQgodS3DtLg%3D%3D&amp;feature=related\" class=\"related-video yt-uix-contextlink  yt-uix-sessionlink\" href=\"/watch?v="+VideoList[i].viditemid+"\"><span class=\"ux-thumb-wrap contains-addto \" style=\"width:"+ImageSize[0]+"px; height:"+ImageSize[1]+"px;\"><span style=\"width:"+ImageSize[0]+"px; height:"+ImageSize[1]+"px;\" class=\"video-thumb ux-thumb yt-thumb-default-120 \"><span style=\"top: 0px; left: 0px;\" class=\"yt-thumb-clip\"><span style=\"width:"+ImageSize[0]+"px; height:"+ImageSize[1]+"px;\" class=\"yt-thumb-clip-inner\"><img style=\"width:"+ImageSize[0]+"px; height:"+ImageSize[1]+"px;\" data-thumb=\""+VideoList[i].vidimglnk+"\" alt=\""+VideoList[i].videoname+"\" src=\""+VideoList[i].vidimglnk+"\" data-group-key=\"thumb-group-0\"><span class=\"vertical-align\"></span></span></span></span><span class=\"video-time\">"+VideoList[i].vidlength+"</span>  <button role=\"button\" data-video-ids=\""+VideoList[i].viditemid+"\" class=\"addto-button video-actions spf-nolink addto-watch-later-button yt-uix-button yt-uix-button-hh-default yt-uix-button-short yt-uix-tooltip\" type=\"button\" title=\"Watch Later\" onclick=\";return false;\"><span class=\"yt-uix-button-content\">  <img alt=\"Watch Later\" src=\"//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif\"> </span></button></span><br style=\"display:block;margin:3px 0;line-height:22px\"><font style=\"color:#333333\" id=\""+VideoList[i].viditemid+"\" onmouseover=\"document.getElementById('"+VideoList[i].viditemid+"').style.color='#1C62B9';\" onmouseout=\"document.getElementById('"+VideoList[i].viditemid+"').style.color='#333333';\">"+VideoList[i].videoname+"</font><br><div style=\"font-size: 5px\">&nbsp;</div><font onmouseover=\"document.getElementById('"+VideoList[i].viditemid+"').style.color='#1C62B9';\" onmouseout=\"document.getElementById('"+VideoList[i].viditemid+"').style.color='#333333';\" style=\"hover:#ffff00;font-size:11px;font-weight:normal;line-height:1.4em;\" color=\"#999999\">"+VideoList[i].vidupload+"by "+VideoList[i].vidoowner+"<br>"+VideoList[i].videoview+"</font></a>"
			html += "</td>";
		}
		html += "</tr></table>"
		
		// Custom Action Button Name
		var can = localStorage.can;
		// Custom Action Panel
		var cap = document.getElementById("action-panel-" + can.toLowerCase()); // Action Panels

		// When openening the 'more videos' section, this code will auto-scroll to the video you are watching
		document.getElementById("action-panel-spanbutton-" + can.toLowerCase()).onclick = function(e){setTimeout("document.getElementById('capHolder').scrollLeft = "+cvso,10);return false};
		
		// Custom Action Button Object
		var cab = "<span><button role=\"button\" data-trigger-for=\"action-panel-" + can.toLowerCase() + "\" data-button-toggle=\"true\" onclick=\";return false;\" class=\"action-panel-trigger yt-uix-button yt-uix-button-hh-text\" type=\"button\"><span class=\"yt-uix-button-content\">"+can+" </span></button></span>"
		// Custom Action Content
		var cact = html;
		// Custom Action Panel Object
		//var cap = "<div class=\"action-panel-content\" id=\"action-panel-" + can.toLowerCase() + "\" data-panel-loaded=\"true\" style=\"\">	<div id=\"watch-actions-" + can.toLowerCase() + "-loading\" style=\"display: none;\" class=\"hid\">		<div class=\"action-panel-loading\">			<p class=\"yt-spinner\"><img alt=\"Loading icon\" class=\"yt-spinner-img\" src=\"//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif\">Loading...</p>		</div>	</div>	<div id=\"watch-actions-" + can.toLowerCase() + "-panel\"><div class=\"" + can.toLowerCase() + "-panel\">"+cact+"</div></div></div>"
		cap.innerHTML = "<div id=\"capHolder\" onmouseover=\"this.addEventListener('DOMMouseScroll', function(e){this.scrollLeft+=10*(3/e.detail);e.preventDefault();}, false);\" style=\"overflow-x: scroll; overflow-y: none; width:200; height:200; border:0 #000000 solid; text-align: left;  padding: 2px;\">"+cact+"</div>";
		
		// Start the list scrolled to the current video
		document.getElementById("capHolder").scrollLeft = cvso;
		
		// Clean up
		localStorage.removeItem("can");
		localStorage.removeItem("pageID");
	}
});