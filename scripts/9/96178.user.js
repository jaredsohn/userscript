// ==UserScript==
// @name Youtube Fullscreen button
// @author Andreas Tarandi
// @match http://www.youtube.com/watch*
// @description Adds a button on any youtube-video that goes to http://www.youtube.com/v/[videoname] 
// @version 0.3
// ==/UserScript==


var m=document.location.href.match(/watch\?v=(.+?)(?:$|&)/);
if(m!=null) {
	var video_id=m[1];

	var btn=document.createElement("button");
	btn.setAttribute('onclick','document.location="/v/'+video_id+'"');
	btn.setAttribute('title','View in fullscreen');
	btn.setAttribute('type','button');
	btn.setAttribute('class','master-sprite yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip');
	btn.setAttribute('role','button');
	btn.setAttribute('aria-pressed','false');
	btn.innerHTML='<span>Fullscreen</span>';
	var action_elem=document.getElementById("watch-actions");
	action_elem.insertBefore(btn,document.getElementById('watch-actions-share'));
}
