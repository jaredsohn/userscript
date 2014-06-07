// ==UserScript==
// @name           YouTube Link Info
// @namespace      bauer.youtube
// @author         Bauer
// @version        1.1.1
// @description    Shows info about a YouTube link
// @include        *
// ==/UserScript==

function _log(obj) {
	if(console && console.log) {
		console.log(obj);
	}
}

_log("YouTube Link Info by BauerUK - Loaded.");
_log("http://reddit.com/user/BauerUK");

// var results_cache;

/**
 * Wait for jQuery to initialise (on reddit) instead of 
 * loading up our own.
 *
 * @note:   If you're going to run this on other domains, 
 *          you'll need to load an instance of jQuery and
 *          attach the `main` function to the `document.ready`
 *          event
 */
function GM_wait() {

	_log("Checking for jQuery existence ...");

	if(typeof unsafeWindow.jQuery == 'undefined') { 
	
		setTimeout(GM_wait,100);

	} else { 		
	
		_log("Found jQuery. Starting...");

		$ = unsafeWindow.jQuery;
		main(); 
		
    }

}

GM_wait();

/**
 * start doing stuff here!
 */
function main() {      
    var css = "\
	.yt-video-info {\
		cursor: pointer;\
		width: 20px;\
		height: 20px;\
		background-color: #EEE;\
		border: 1px solid #CCC;\
		border-radius: 5px;\
		-moz-border-radius: 5px;\
		-webkit-border-radius: 5px;\
		display: inline-block;\
		vertical-align: middle;\
		margin-left: 2px;\
		margin-right: 5px;\
		font-size: 10px;\
		font-family: Arial, sans-serif;\
		background-repeat: no-repeat;\
		background-position: 2px 2px;\
		color: #000;\
		font-weight: normal;\
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAABS0lEQVQ4y52SPUgDQRCFvz2DIFhIzsbaA63tLESLhEBKwcr+ymAldrbGMk0qG6soIRZp1DQ2ohaiKEoMZxWw8kylICQZi707b82P0dfsm9mdN7Mzg4jIQyUn29lJERFJuWXZP2/KqCAiIK0Dff4F0evHo5wAUfbTQkYAcfNXUYL42SPw/nIogNTbXfkIeBhQb3cHCliMiL0Nm6eO9PgTIVFKaSLCxMwaJ4UMSinc/CVzY4rO8jrzCYuUWzYEVFDWv5Gg0YDsYqgHjKgnwPEFSmaTgud/Xzh2vEDwXn/4TOgmOtN9gsM0w2EZDxeWwPO16fnaJuDFkubFElw/Q+XMnILZWmXajq1FNncgnQ6czSECv5UefVX1EajVMJp6c6vtahV2t8BS2r67h9UVPYXW51tU+aCtiO0ZKhjQ1HgSJSLg2LGwQbvQx+/56gup6yKu0ymjHgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMS0xMC0xMlQxOTo0Mjo0NyswMTowMF/X8VkAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTEtMTAtMTJUMTk6NDI6NDMrMDE6MDDaxW32AAAAAElFTkSuQmCC');\
	}\
\
	.yt-video-info strong { font-weight: bold; }\
\
	.loading {\
		width: 30px;\
	}\
\
	.yt-video-info.loaded {\
		width: auto;\
		line-height: 20px;\
		padding-left: 22px;\
		padding-right: 3px;\
	}\
	";
	
	$("head").append("<style type='text/css'>" + css + "</style>");
	
    // for every link posted by a user
    // see if it s a youtube url, and if so
    // match the `v` (video id) value and
    // then attempt to set the title of that
    // anchor object
    
    $("a[href^='http://']").each(function() {

		var a = $(this);

        var href = a.attr("href");
        
		var match = null;
		
        if(href.match(/^http:\/\/(www\.)?youtube\.com\/.*/i)) {
        
            regVideo = /v=([a-zA-Z0-9\-]+)/i;
            match = regVideo.exec(href);
		   
        } else if(href.match(/^http:\/\/(www\.)?youtu\.be\/.*/i)) {
			
			regVideo = /([a-zA-Z0-9\-]+)/i;
            match = regVideo.exec(href);
			
		}
        
		if (match != null) {
			videoID = match[1];
			mark_yt_link(a, videoID)
		}
		
    });
	
	$(".yt-video-info").live("click", function() {
		
		var a = $(this);
		
		var yt_video_id = $(this).data("yt-id");
		
		a.addClass("loading");
		
		getVideoDetails(yt_video_id, function(result) {
			
			a.removeClass("loading");
			a.addClass("loaded");			
			a.html(tmpl_video_details(result.title, result.uploader, result.category));
			
		});
		
	});
	
}

function mark_yt_link(obj, yt_id) {
	
	var handler = $("<div class='yt-video-info'></div>");
	handler.data("yt-id", yt_id.replace(/^-/, ""));
	
	$(obj).after(handler);
	
}


function getVideoDetails(q, callback) {

	// TODO check results cache before calling

	var ytData = 
		"http://gdata.youtube.com/feeds/api/videos?v=2&alt=jsonc&q=" 
			+ q + "&callback=?";
    
    $.getJSON(ytData, function(result) {
        
		callback(result.data.items[0]);
		
    });
	
}

function tmpl_video_details(title, uploader, category) {
	
	var html =	'<strong>Title:</strong> ' + title 
		+ ' <strong>Uploader:</strong> ' + uploader
		+ ' <strong>Category:</strong> ' + category;
	
	return html;
	
}