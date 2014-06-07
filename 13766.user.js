// ==UserScript==
// @name           Daily Show - Play All
// @namespace      http://convolv.com/
// @description    Play all Daily Show videos returned by the search results page, without loading a new page.
// @include        http://www.thedailyshow.com/video/index.jhtml*
// ==/UserScript==

// test if we're on the right page
var videos = document.getElementById("videoSearchResults");
if(!videos){
	// not a search results page
	return;
}

// inject functions
include(0, DSPA_load_player);
include(0, DSPA_load_toc);
include(0, DSPA_set_watch);
include(0, DSPA_link_clicked);

// create content div
var content = document.createElement("div");
content.class='toutContents';
content.innerHTML = "<div><span class='text16 blue bold headlinePad'>Play All Videos:</span>"+
"	<span id='DSPA_toc'></span>"+
"	<div style='width:100%' align=center><div id='DSPA_flash'></div></div>"+
"</div>";
videos.parentNode.insertBefore(content, videos);

// initialize TOC
include(0,'DSPA_load_toc()');

// ***** FUNCTIONS **********************************

// handle clicks
function DSPA_link_clicked(id){
	DSPA_current = id;
	DSPA_load_player(DSPA_links[id]);
	document.getElementById("DSPA_prev").innerHTML = id > 0 ? "&lt;&lt; Previous" : "";
	document.getElementById("DSPA_next").innerHTML = id < DSPA_links.length-1 ? "Next &gt;&gt;" : "";
	document.getElementById("DSPA_select_video").selectedIndex=id;
}

// set watch on search results
function DSPA_set_watch(){
	var d = document.getElementById("videoSearchResults");
	d.unwatch("innerHTML");
	d.watch("innerHTML", function(prop, oldv, newv){
		setTimeout("DSPA_load_toc()",500);
		return newv;
		});
}

// load options into TOC
function DSPA_load_toc(){
	var text="";
	var m = document.evaluate( "//div[@id='videoListItem_1']//div[contains(@class,'textHolder ')]//a[not(@href='#DSPA')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(!m || !m.snapshotLength){
		text = "No video links found.";
	}else{
	
		DSPA_current = -1;
		DSPA_links = new Array();
		text += "<a name='DSPA'>" +
			"<a href='#' id='DSPA_prev' onclick='if(DSPA_current>0){DSPA_current--;DSPA_link_clicked(DSPA_current);}return false;'></a> " +
			"<select id='DSPA_select_video' onChange='DSPA_link_clicked(this.selectedIndex)'>";
		
		// add each video to select
		for(var i = 0; i < m.snapshotLength; i++){
			var id = m.snapshotItem(i).href.match(/videoId=(\d+)/);
			if(id && id[1]){
				//text += "<a href='#' id='DSPA_"+i+"' onclick='DSPA_link_clicked("+i+"); return false;'>"+(i+1)+"</a> | ";
				text += "<option> "+m.snapshotItem(i).innerHTML+"</option>";
				DSPA_links[i] = id[1];
				
				//insert link to play here for each video
				var d = document.createElement("div");
				d.innerHTML = "| <a href='#DSPA' onclick='DSPA_link_clicked("+i+");'>play in this window</a>";
				m.snapshotItem(i).parentNode.insertBefore(d,m.snapshotItem(i).nextSibling);
			}
		}
		text += "</select>" +
			" <a href='#' id='DSPA_next' onclick='if(DSPA_current<DSPA_links.length-1){DSPA_current++;DSPA_link_clicked(DSPA_current);}return false;'>&lt;&lt; Play First Video</a>";
	}
	
	document.getElementById('DSPA_toc').innerHTML = text;
	DSPA_set_watch();
};
	
// flash player loader
function DSPA_load_player(videoID){
	var obj = new SWFObject("/sitewide/video_player/view/daily_show/player_large.swf", "DSPA_video_player", "488", "397", "8", "#f9f9f9", true, "high", "", "", "detectFlash");
	obj.addParam("wmode", "opaque");
	obj.setAttribute("flashVars", "is_large=true&amp;collectionId=&amp;videoId=" + videoID + "&amp;testmode=");
	obj.setAttribute("errorMessage", "");
	
	obj.write('DSPA_flash');
};

// js include function -- include a file, or run code from <head>
// handy utility to (as far as I know?) run code safely in page context, without unsafeWindow
function include(src, text)
{
	var script = document.createElement('script');
	if(src)
		script.src = src.toString();
	if(text)
		script.text = text;
	script.type = 'text/javascript';
	var head = document.getElementsByTagName('head').item(0);
	head.appendChild(script);
}

