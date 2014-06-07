// ==UserScript==
// @name          RigInt Plus
// @author        monster
// @description   Enhancements for the Rigorous Intuition forum
// @include       http://www.rigorousintuition.ca/board/*
// @include       http://rigorousintuition.ca/board/*
// @require       http://code.jquery.com/jquery-latest.pack.js
// ==/UserScript==

// Config
var quote_scroll            = true;
var quote_scroll_max_height = "400px";
var quote_width             = "90%";
var prevent_img_stretch     = true;
var max_img_width           = 0.8; // 80% of the post width
var link_color              = "blue"; // use empty string ("") for default color
var youtube_embed           = true;
var google_search           = true;
var google_vid_embed        = true;
var avatars_on              = true;
// Add avatars here: "username" : "URL"
var avatars = {
	"monster" : "http://farm1.static.flickr.com/157/330162607_85fd826f4c.jpg?v=0"
};

$(document).ready(function() {

	// Add avatars
	if ( avatars_on )
	{
		for ( var username in avatars ) 
		{
			$(".name b:contains('"+username+"')").after("<br /><br /><img src='"+avatars[username]+"' />");
		}
	}

	// Set tall quotes to overflow with a scrollbar
	if ( quote_scroll )
	{
		var wrap = '<div style="width:' + quote_width + ';max-height:' + quote_scroll_max_height + ';overflow-y:auto"></div>';
		var quote_table = $("td.quote").parent("tr").parent("tbody").parent("table");
   
		quote_table.each(function() {
			if( $(this).parents("td.quote").length == 0 )
			{
				$(this).wrap(wrap);
			}
		});
	}
	
	// Stop images from stretching the screen
	if ( prevent_img_stretch )
	{
		var max_width = max_img_width*$(window).width(); 
		$("span.postbody img").css({ "max-width": max_width });
	}
	
	// Iterate over links 
	$("span.postbody a").each(function() {
		
		// Make links more readable
		if ( link_color )
		{ 
			if ( link_color != "" ) 
			{ 
				$(this).css({ "color": "blue" }); 
			} 
		}
		
		var href = $(this).attr("href");
		
		// Change YouTube links into embedded videos
		if ( youtube_embed )
		{
			if( href.indexOf("youtube.com/watch?v=") != -1 )
			{
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
				youtube_HTML += '<div style="width:450px; height:366px;">';
				youtube_HTML += '<object type="application/x-shockwave-flash" ';
				youtube_HTML += 'style="width:450px; height:366px; display:block" ';
				youtube_HTML += 'data="http://www.youtube.com/v/';
				youtube_HTML += vid_ID;
				youtube_HTML += '"><param name="movie" ';
				youtube_HTML += 'value="http://www.youtube.com/v/';
				youtube_HTML += vid_ID;
				youtube_HTML += '" /></object>';
				youtube_HTML += '</div>';
   
				$(this).replaceWith(text + youtube_HTML);
			} 
		}
		
                // Change Google Video links into embedded videos
		if ( google_vid_embed )
		{
			if( href.indexOf("video.google.com/videoplay?docid=") != -1 )
			{
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
				google_HTML += '&hl=en&fs=true" style="width:400px;height:326px" allowFullScreen="true" ';
				google_HTML += 'allowScriptAccess="always" type="application/x-shockwave-flash"></embed>'
				google_HTML += '</div>';
				
				$(this).replaceWith(text + google_HTML);
			}
		}
	});
	
	// Add Google search box
	if ( google_search )
	{
		var search = '';
		search += '<form action="http://www.google.com/cse" id="cse-search-box" style="display:inline">';
		search += '<div style="display:inline">';
		search += '<input type="hidden" name="cx" value="partner-pub-4887758681658152:83be92-sea4" />';
		search += '<input type="hidden" name="ie" value="ISO-8859-1" />';
		search += '<input type="text" name="q" size="14" />';
		search += '<input type="submit" name="sa" value="Search" />';
		search += '</div>';
		search += '</form>';
		search += '<script type="text/javascript" ';
		search += 'src="http://www.google.com/coop/cse/brand?form=cse-search-box&amp;lang=en"></script>';
   
		$("a.mainmenu[href='search.php']").empty().replaceWith(search);	
	}
	
});

	