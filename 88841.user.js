// ==UserScript==
// @name           jameschens Better Youtube
// @namespace      http://www.youtube.com
// @description    An improved interface for more efficient youtube admin tasks, especially for those who manage a lot of videos.
// @include        http://www.youtube.com*
// ==/UserScript==

/**
 * TODO:
 * - In page editing on My Video pages (50% chance it should work)
 *
 */

//-----------------------------
// Framework
//-----------------------------
// DEBUGGING INFO

var console = unsafeWindow.console;
function $(id) { return document.getElementById(id); }
var current_url = window.location.href;


//-----------------------------
// Global Style Changes
//-----------------------------
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// These override Youtube's default styling.  Has been tested on most pages.

// Min-height on all textarea boxes on the Edit Profile page
addGlobalStyle('.textarea-input { min-height: 200px; width: 100%; }');

// Textarea for the Description box in the single Edit mode view
addGlobalStyle('#mymedia #form-pane textarea { min-height: 150px; }');


//-----------------------------
// Video Response Page 
//-----------------------------
// Creates a wide select box for video respones for longer title names
var i, element;
var form = document.getElementById('choose-video-form');
if (form) {
	for(i in form.elements) {
		element = form.elements[i];
		if(element.name == 'video_response_id') {
			element.style.width = '500px';
			return;	
		}
	}
}


//-----------------------------
// Channel Editor Page
//-----------------------------
// I tried to enlarge the Featured Video select box, but it looks like Youtube truncates the text of the videos in the option box
// so it won't really help :(
// var featured_vid_box = $('featured_vid_select_box');
//if (featured_vid_box) {
//  console.log('hey', featured_vid_box.children[0]);
//featured_vid_box.children[0].style.width = '500px';
//}


//-----------------------------
// Channel Box Text Area Size 
//-----------------------------
// For non-chrome users
var channel_ta = $('profile_edit_profile');
if (channel_ta) {
	channel_ta.style.minWidth = '300px';
	channel_ta.style.minHeight = '400px';	
}


//-----------------------------
// My Uploaded Videos Page
//-----------------------------
// Feature to add links to the My Videos page, so you can right click and Open in New Tab :)
// Currently added the following:
// - Edit 
// - Insight
// - Video Response (for attaching videos)

var video_list = $('vm-playlist-video-list-ol');
if (video_list) {
	for(var i in video_list.children) {
		var video = video_list.children[i];
		
		// Grab the video url from:
         //<div class="vm-video-title">
		 // 			<a href="/watch?v=oSanrNDsJ5U">Mana (P) vs. Naama (T) - Go4SC2 #35 Finals - Game 3 p2/2</a>
		 //			<img class="vm-video-badge" src="http://s.ytimg.com/yt/img/hd_video_result_page_logo-vfl88394.png">
         //</div>
		 //
		
		 var video_title = video.getElementsByClassName('vm-video-title')[0];
		 var vid = video_title.innerHTML.match(/watch\?v=([^"]+)/)[1];
		 
		 // insert after the 'yt-uix-button-roup' span
		 var video_buttons = video.getElementsByClassName('yt-uix-button-group')[0];
		 var link_color = '#0F427F';
		 var link_span = document.createElement('span');
		 	link_span.className = 'vm-video-status';
		 	link_span.style.fontSize = '12px';
		 	link_span.style.background = '#f1f1f1';
		 	link_span.style.border = '1px solid #ccc';
		 	link_span.style.padding = '4px';
		 	link_span.innerHTML = '\
		 		<a href="http://www.youtube.com/my_videos_edit?ns=1&video_id='+vid+'&next=%2Fmy_videos">Edit</a> | \
		 		<a href="http://www.youtube.com/my_videos_insight?v='+vid+'" >Insight</a> | \
		 		<a href="http://www.youtube.com/video_response_upload?v='+vid+'">Video Response</a>';
		 var video_status = video.getElementsByClassName('vm-video-status')[0];
		 video_status.parentNode.insertBefore(link_span, video_status);
	}
}

//-----------------------------
// In-page editing
//-----------------------------
//http://upload.youtube.com/my_videos_upload_json?action_edit_video=1&category=20&content_id=&description=Game%20one%20of%20the%20best%20of%20five%20between%20SeleCT%20and%20mouzMorroW%20for%20the%20Zotac%20Cup%20%2321%20finals.%0A%0AGame%201%3A%20http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DgVV8M-B3oyc%0AGame%202%3A%20http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DiihKGvsem9o%0AGame%203%3A%20http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D4lY9xg-8ms4%0AGame%204%3A%0AGame%205%3A&keywords=select%20morrow%20%22select%20vs%20morrow%22%20%22select%20vs%20mouzmorrow%22%20mouzmorrow%20%22zotac%20cup%20%2321%22%20%22zotac%20cup%2021%22%20%22zotac%20cup%20finals%22%20%22game%202%22%20&privacy=public&session_token=n77PuEJh5GNN7GoS9WkM7BbeD-Z8MA%3D%3D&title=SeleCT%20(T)%20vs.%20MorroW%20(T)%20-%20Zotac%20Cup%20%2321%20Finals%20-%20Game%202&updated_flag=0&video_id=iihKGvsem9o