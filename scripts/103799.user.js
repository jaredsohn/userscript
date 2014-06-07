// ==UserScript==
// @name           YouTube Rate Everyting
// @namespace      http://userstyles.org
// @description    Shows ratings & Favourite count of all videos. Weed out videos not worth your time
// @include        http://*.youtube.*
// @version        0.65
// ==/UserScript==
//Version 0.50 Initial Release
//Version0.60 Removed double ratings on frontpage
//Version0.61 Name Changed for easier identification
//Version0.65 Works on search pages & Youtube charts page

// Close ratings when closing recommendation
function hide_ratings_box(evt) {
	if(evt.explicitOriginalTarget.className == 'master-sprite img-php-close-button') {
		var ratings = this.getElementsByClassName('yt_gm_ratings');
		this.removeChild(ratings[0]);
	}
}

// Load ratings when clicking 'Load More Suggestions'
function get_more_ratings_wrapper(evt) {
	var fib_1 = 0;
	var fib_2 = 100;
	if(!evt.explicitOriginalTarget.id == 'watch-more-related-button') {
		return;
	} else {
		for(j = 0;j<6;j++) {
			setTimeout(get_more_ratings, fib_1 + fib_2);
			fib_1 = fib_2;
			fib_2 = fib_2 + fib_1;
		}
	}
}

function get_more_ratings() {
	var more_vids = document.getElementById('watch-more-related').getElementsByClassName('video-list-item');
	if(more_vids) {
		for(i = g_len; i < more_vids.length; i++) {
			get_rating(more_vids[i]);
			g_len = i + 1;
		}
	}
}

// Async get ratings on a video list
function get_ratings(l_vids) { // call get_rating mutiple times for an array of vids
	if(l_vids) { // If found
		for(i = 0; i < l_vids.length; i++) {
			get_rating(l_vids[i]); // need to use function for async call
		}
		vids = null;
	}
}

// Main work - fetch rating of a single vid
function get_rating(video) {
	var vid_link = video.getElementsByClassName('video-list-item-link');
	
	if(typeof(vid_link[0]) == 'undefined') {
		vid_link = video.getElementsByClassName('ux-thumb-wrap contains-addto');
	}

	if(typeof(vid_link[0]) == 'undefined') {
		vid_link = video.getElementsByClassName('ux-thumb-wrap');
	}
	
	if(typeof(vid_link[0]) == 'undefined') {
		vid_link = video.getElementsByClassName('thumb-container');
	}
	
	if(typeof(vid_link[0]) == 'undefined'){return;}
	
	var video_id = vid_link[0].href.match(/v=([^&]{11})/);
	if(video_id == null){return;}// not found
	var xml_http = null;
	var vid_href = 'http://gdata.youtube.com/feeds/api/videos/'+video_id[1]+'?v=2';

	//Dont Double
	var exists = video.getElementsByClassName('yt_gm_ratings');
	if(exists.length) {
		return;
	}

	//Loading...
	var load_text = document.createElement('li');
	load_text.className = 'yt_gm_ratings';
	load_text.innerHTML = 'Loading rating...';
	video.appendChild(load_text);

	GM_xmlhttpRequest({
		method: 'GET',
		url: vid_href,
		onload: function(response) {

			if(response.status == 200) {
				response.responseXML = new 	DOMParser().parseFromString(response.responseText, "text/xml");
				var entry   = response.responseXML.getElementsByTagName('entry'); //root element of response is entry
				var rating  = entry[0].getElementsByTagName('yt:rating')[0];      // tag name yt:rating holds the ratings
				var stats   = entry[0].getElementsByTagName('yt:statistics')[0]; // Favourites are held in statistics
			} else {
				var err = document.createElement('li');
				err.className = 'yt_gm_ratings';
				err.innerHTML = 'Could not fetch video rating..!';
				video.removeChild(load_text);
				video.appendChild(err);
				return;
			}

			/* Display ratings similar to existing to YT ratings box i.e at bottom of video, with colored bar & number of likes/dislikes*/
			var rating_box = document.createElement('li');
			rating_box.className = 'yt_gm_ratings';// For easy lookup

			if(rating) {
				var num_likes    = rating.getAttribute('numLikes');
				var num_dislikes = rating.getAttribute('numDislikes');

				// First Dom Node :Create bar
				var watch_sparkbars = document.createElement('div');
				// CSS applied from YT
				watch_sparkbars.className = 'watch-sparkbars';

				// Left part/Green part of the bar
				var watch_sparkbars_likes = document.createElement('div');
				watch_sparkbars_likes.className = 'watch-sparkbar-likes';
				watch_sparkbars_likes.style.width = (parseInt(num_likes) * 100/(parseInt(num_likes) + parseInt(num_dislikes))).toPrecision(12) + '%';

				//Right part/red part of the bar
				var watch_sparkbars_dislikes = document.createElement('div');
				watch_sparkbars_dislikes.className = 'watch-sparkbar-dislikes';
				watch_sparkbars_dislikes.style.width = (parseInt(num_dislikes) * 100/(parseInt(num_likes) + parseInt(num_dislikes))).toPrecision(12) + '%';

				//Full Ratings bar
				watch_sparkbars.appendChild(watch_sparkbars_likes);
				watch_sparkbars.appendChild(watch_sparkbars_dislikes);

				// Secon DOM node: Rating text
				var watch_likes_dislikes = document.createElement('span');
				watch_likes_dislikes.className = 'watch-likes-dislikes';

				//Likes
				var likes = document.createElement('span');
				likes.className = 'likes';
				likes.innerHTML = num_likes;

				//Dislikes
				var dislikes = document.createElement('span');
				dislikes.className = 'dislikes';
				dislikes.innerHTML = num_dislikes;

				//Ratings text
				watch_likes_dislikes.appendChild(likes);
				watch_likes_dislikes.appendChild(document.createTextNode(' likes, '));
				watch_likes_dislikes.appendChild(dislikes);
				watch_likes_dislikes.appendChild(document.createTextNode(' dislikes. '));

				//Append to box
				rating_box.appendChild(watch_sparkbars);
			} else {// error occured or ratings dont exist
				var watch_likes_dislikes = document.createElement('span');
				watch_likes_dislikes.className = 'watch-likes-dislikes';
				watch_likes_dislikes.appendChild(document.createTextNode('Ratings dont exist!. '));

			}

			if(stats) {
				var fav = document.createElement('span');
				fav.className = 'times_favourited';
				fav.innerHTML = stats.getAttribute('favoriteCount');

				watch_likes_dislikes.appendChild(document.createTextNode(' Favourited '));
				watch_likes_dislikes.appendChild(fav);
				watch_likes_dislikes.appendChild(document.createTextNode(' times. '));
			} else {
				watch_likes_dislikes.appendChild(document.createTextNode('Never favourited. '));
			}

			// Add textline to box
			rating_box.appendChild(watch_likes_dislikes);
			// Attach to video
			video.removeChild(load_text);
			video.appendChild(rating_box);
		},
		onerror: function(response) { // If an error ocurrs
			var err = document.createElement('li');
			err.classname = 'yt_gm_ratings';
			err.innerHTML = 'Could not fetch video rating..!';
			video.removeChild(load_text);
			video.appendChild(err);
		}
	});
}

/* ---------------------------------------------Start of processing---------------------------------------------*/

GM_addStyle('.yt_gm_ratings{display: block;bottom: 0px;}'); // Otherwise is shown as bulleted list on front page
GM_addStyle('.video-aso-cell{height:220px !important;}'); // Otherwise ratings are hidden
GM_addStyle('.most-viewed-list .video-cell{height:180px !important;}'); // Otherwise are hidden
GM_addStyle('.main-tabs-spotlight-inner{height:180px !important;}'); // Otherwise rating hidden in spotlight box
GM_addStyle('.video-bar-item .video-cell {width: 100% !important;}'); // need to override as default is 20%, leads to display issue in slider
GM_addStyle('.watch-likes-dislikes{color: #666666; }'); // show in same colour as YT original
GM_addStyle('#ppv-container .featured-label{position: relative !important;left: 0px}'); // retain 'Featured' text on feature videos
GM_addStyle('.video-list-item:hover{background: none repeat scroll 0 0 #D1E1FA;text-decoration:none;}'); // Provide similar look & feel in sidebar;
GM_addStyle('.result-item-main-content{margin-bottom:25px;}'); 
GM_addStyle('.result-item:hover{border:1px dotted #666666 !important;}'); 

var g_len = 0;
var vids = null;;
/* ---------------------------------------------Video Page---------------------------------------------*/
//Sidebar(also for sidebar on main page)
vids = document.getElementsByClassName('video-list-item');
get_ratings(vids);

//Load more vids event
var more_related_button = document.getElementById('watch-more-related-button');
if(more_related_button) {
	more_related_button.addEventListener('click',get_more_ratings_wrapper,true);
}

/* ---------------------------------------------Main Page---------------------------------------------*/
//Recommended Videos - On Close
vids = document.getElementsByClassName('feedmodule-item-with-x');
if(vids) {
	for(i = 0; i < vids.length; i++) {
		vids[i].addEventListener('click',hide_ratings_box,true);
	}
}

/* ---------------------------------------------Cagtegory Page---------------------------------------------*/
//Category Entertainment+Film/Animation+Howto/Style+Comedy+sports+News/Politics
vids = document.getElementsByClassName('video-aso-cell');
get_ratings(vids);

vids = document.getElementsByClassName('video-cell');
get_ratings(vids);

//Category Music
vids = document.getElementsByClassName('browse-item music-item');
get_ratings(vids);

vids = document.getElementsByClassName('yt-uix-slider-slide-item last');
get_ratings(vids);

// Search Page
vids = document.getElementsByClassName('result-item *sr');
get_ratings(vids);

// Charts page :
try{
vids = document.getElementById('charts-top-videos').getElementsByTagName('li');
get_ratings(vids);
}catch(err){
/*do nothing*/}
