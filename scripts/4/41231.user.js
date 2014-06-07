// ==UserScript==
// @name           Rense Plus
// @namespace      http://www.google.com
// @include        http://www.rense.com/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

// Insert whatever words you want to block
var blockwords = [ "zionist", "israel", "israeli", "palestinian", "zionazi" ];

$(document).ready(function() {

	// Find words to be blocked and erase those links
	$("font").each(function() {
	
		for ( i=0; i<blockwords.length; i++ )
		{
			var html = $(this).html().toUpperCase();
			var badword = blockwords[i].toUpperCase();
			
			if ( html.indexOf( badword ) != -1 )
			{
				$(this).closest("td").html("&nbsp;");
			}
		}
		
	});

   // For each headline link
	$("table:first tr td a").each(function() {
   
		var href = $(this).attr("href");
   
   		// Detect YouTube videos
		if( href.indexOf("youtube.com/watch?v=") != -1 )
		{
			// Color the link text green and remove the trailing "- Vid"
			$(this).closest("td").css({ "color":"#00FF00" }).find("font:contains('Vid')").remove();
		
			// Grab the link text, unless it's a naked link
			var text = ( $(this).text().indexOf("youtube.com/watch?v=") != -1 ) ? '' : $(this).text();
   
			$(this).empty();
   
			// Get the video ID
			var start = href.indexOf("youtube.com/watch?v=") + 20;
			var end = href.length;
			var tmp = href.substring(start, end); tmp = tmp.split("&");
			var vid_ID = tmp[0];
   
			// Replace the <a> with embed code
			var youtube_HTML = '';
			youtube_HTML += '<div style="width:340px;height:275px;">';
			youtube_HTML += '<object width="340" height="275">';
			youtube_HTML += '<param name="movie" value="http://www.youtube.com/v/';
			youtube_HTML += vid_ID + '&fs=1"></param>';
			youtube_HTML += '<param name="allowFullScreen" value="true"></param>';
			youtube_HTML += '<embed src="http://www.youtube.com/v/';
			youtube_HTML += vid_ID + '&fs=1" ';
			youtube_HTML += 'type="application/x-shockwave-flash" ';
			youtube_HTML += 'allowfullscreen="true" ';
			youtube_HTML += 'width="340" height="275">';
			youtube_HTML += '</embed>';
			youtube_HTML += '</object>';
			youtube_HTML += '</div>';
   
			$(this).replaceWith(text + youtube_HTML);
		}
   
   		// Detect Google videos
		if( href.indexOf("video.google.com/videoplay?docid=") != -1 )
		{
			// Color the link text green and remove the trailing "- Vid"
			$(this).closest("td").css({ "color":"#00FF00" }).find("font:contains('Vid')").remove();
		
			// Grab the link text, unless it's a naked link
			var text = ( $(this).text().indexOf("video.google.com/") != -1 ) ? '' : $(this).text();
   
			// Get the video ID
			var start = href.indexOf("docid=") + 6;
			var end = ( href.indexOf('&') != -1 ) ? href.indexOf('&') : href.length;
			var tmp = href.substring(start, end); tmp = tmp.split("&");
			var vid_ID = tmp[0];
   
			// Replace the <a> with embed code
			var google_HTML = '';
			google_HTML += '<div style="display:block;">';
			google_HTML += '<embed id="VideoPlayback" src="http://video.google.com/googleplayer.swf?docid=';
			google_HTML += vid_ID;
			google_HTML += '&hl=en&fs=true" style="width:340px;height:277px" allowFullScreen="true" ';
			google_HTML += 'allowScriptAccess="always" type="application/x-shockwave-flash"></embed>'
			google_HTML += '</div>';
   
			$(this).replaceWith(text + google_HTML);
		}
   
	});
});