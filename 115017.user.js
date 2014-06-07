// ==UserScript==
// @name           YouTube - Download Tab
// @namespace      http://lachlanarthur.com
// @description    Adds a tab with links to all the video's file formats for downloading. Only works on the New YouTube layout (CosmicPanda)
// @include        http://www.youtube.com/*
// ==/UserScript==

function main_115017() {

	window["$"] = function(id) { return document.getElementById(id); };

	currentVer = 3;

	window["rand"] = function(min, max) {
		return min + Math.floor(Math.random() * (max - min));
	}

	window["getScript"] = function(url) {
		var script = document.createElement("script");
		script.src = url;
		document.body.appendChild(script);
	}

	if (!document.getElementsByClassName) {
		document.getElementsByClassName = function( classname ) {
			var elArray = [];
			var tmp = document.getElementsByTagName("*");
			var regex = new RegExp("(^|\s)" + classname + "(\s|$)");
			for (var i = 0; i < tmp.length; i++ ) {
				if (regex.test(tmp[i].className)) {
					elArray.push(tmp[i]);
				}
			}
			return elArray;
		};
	}

	window["showUpdateText"] = function() {
		getScript("http://lachlanarthur.com/ytbm/ytbm_3.php?id="+video_id);
	}

	var fmt_url_map = yt.config_.PLAYER_CONFIG.args.url_encoded_fmt_stream_map.split(",");
	for (var i=0; i<fmt_url_map.length; i++) {
		fmt_url_map[i] = decodeURIComponent(fmt_url_map[i].split("=")[1]);
	}
	var fmt_map = yt.config_.PLAYER_CONFIG.args.fmt_list.split(",");
	for (var i=0; i<fmt_map.length; i++) {
		fmt_map[i] = fmt_map[i].split("/")[1].split("x");
	}
	var video_id = yt.config_.VIDEO_ID;

	if ($("watch-bar-switcher").children[0].children.length < 3) {
		
		var vid_title = $("eow-title").innerHTML.replace(/(<([^>]+)>)/gi,"").replace(/^\s+/g,"").replace(/\s+$/g,"").replace(/[\\\/?:*"<>#|]+/g,"");
		
		// Adding the "Download" button
		var button_container = $("watch-bar-switcher").children[0];
		var download_button = document.createElement("button");
		download_button.innerHTML = '<span class="yt-uix-button-content">Download</span>';
		download_button.onclick = ";return false;";
		download_button.setAttribute("class", "end yt-uix-button yt-uix-button-toggle yt-uix-button-dark");
		download_button.setAttribute("data-slider-num" ,"2");
		download_button.setAttribute("data-button-action" ,"yt.www.watch.watch6.changeSlide");
		button_container.appendChild(download_button);			// Append the button
		button_container.children[1].classList.remove("end");	// The "suggestions" button is no longer at the end - remove the end style
		
		// Adding the new slide
		var slides = $("watch-panel-slider").children[0].children[0];
		var download_slide = document.createElement("div");
		download_slide.setAttribute("class", "watch-panel yt-uix-slider-slide");
		
		var html = '<div class="watch-maincol"><div class="watch-panel-section"><ul class="watch-related-video-list">\n';
		for(i=0; i<fmt_url_map.length; i++){
			html += '<li class="watch-related-video-item" style="margin:10px 18px">';
			html += '<a id="link_'+i+'" target="_blank" href="'+fmt_url_map[i]+'&title='+vid_title+'">';
			html += '<span class="playlist-thumb-strip"><span class="videos" style="text-align: center; color: #fff; font: 900 20px/50px arial; text-shadow: 0 0 5px #000; box-shadow: inset 0 0 5px rgba(0,0,0,.5);">'+fmt_map[i][1]+'p</span></span>';
			html += '<span class="stat alt view-count"></span><span class="stat">Loading...</span>';
			html += '</a></li>\n';
		}
		html += '</ul><div id="updateText" style="text-align: center;"></div></div></div>';
		
		download_slide.innerHTML = html;
		slides.appendChild(download_slide);
		
		getScript("http://lachlanarthur.com/ytbm/ytbm_3.php");
	}

	window["showcontent"] = function(){

		for(i=0;i<fmt_url_map.length;i++){
			$("link_"+i).getElementsByClassName("stat")[0].innerHTML = videotypes[i].toUpperCase();
			$("link_"+i).getElementsByClassName("stat")[1].innerHTML = videosizes[i] + "MB";
		}
		
		var i=1e9,
			utmn=rand(1e9,1e10),
			cookie=rand(1e7,1e8),
			random=rand(i,-(1<<31)),
			today=(new Date()).getTime(),
			win = window.location,
			img = new Image(),
			urchinUrl = 'http://www.google-analytics.com/__utm.gif'
				+'?utmwv=4.8.6'
				+'&utmn='+utmn
				+'&utmsr='+screen.width+'x'+screen.height
				+'&utmsc='+((screen.colorDepth===undefined)? screen.pixelDepth: screen.colorDepth)+'-bit'
				+'&utmul='+window.navigator.language.toLowerCase()
				+'&utmje=-'
				+'&utmfl=-'
				+'&utmdt=-'
				+'&utme=8(ytbm)9(true)'
				+'&utmhn=lachlanarthur.com'
				+'&utmr='+encodeURIComponent(win)
				+'&utmp='+encodeURIComponent('/ytbm/ytbm_'+currentVer+'.js')
				+'&utmac=UA-18891223-1'
				+'&utmcc=__utma%3D'+cookie
					+'.'+random
					+'.'+today
					+'.'+today
					+'.'+today
					+'.2%3B%2B__utmb%3D'+cookie
					+'%3B%2B__utmc%3D'+cookie
					+'%3B%2B__utmz%3D'+cookie
					+'.'+today
					+'.2.2.utmccn%3D(referral)%7Cutmcsr%3D'+encodeURIComponent(win.host)
					+'%7Cutmcct%3D'+encodeURIComponent(win.pathname)
					+'%7Cutmcmd%3Dreferral%3B%2B__utmv%3D'+cookie
					+'.-%3B';
		
		img.src = urchinUrl;
	}

}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main_115017 +')();'));
(document.body || document.head || document.documentElement).appendChild(script);