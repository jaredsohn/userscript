// JavaScript Document
// ==UserScript==
// @name           Shilpa's Craiglist Sorting
// @namespace      http://www.pbworks.net
// @description	   When clicking on "+ Add to" (to add a video to a playlist) youtube displays the playlists in a weird order (by last used). This script sorts them by title, making it easier for you to find the playlist you are looking for. Enjoy!
// @author         Paolo Brocco
// @homepage       http://www.pbworks.net
// @copyright      2012+, Paolo Brocco (http://www.pbworks.net)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version        0.9.3
// @include        http://boston.craigslist.org/*
// @uso:script     123272
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

//let's modify some styles... The playlist box is really too small, let's improve it!
//this is to modify the box height
GM_addStyle("#shared-addto-menu { height: 250px; } #shared-addto-menu .playlists ul { height: 150px; }");
//this is to make the box larger
GM_addStyle("#shared-addto-menu, #addto-create-panel, #shared-addto-menu .playlists ul, #shared-addto-menu .menu-panel { width:525px; } .yt-uix-button-menu li { display: inline-block; } #shared-addto-menu .menu-panel.dismissed-panel.slide { left: -525px; }");

//This will sort an array
function SortByTitle(a, b){
  var aName = a.title.toLowerCase();
  var bName = b.title.toLowerCase(); 
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0)); 
}

//function to populate lists data array
function listData(title, lElement) {
    return {
        title: title,
		lElement: lElement
    }
}

unsafeWindow.initSortLists = function(){

	//this function checks if the menu is ready (ready I mean: if the ul list has children and the menu is visible (youtube populates it via ajax, then shows it) ):
	//if ready: call sortLists()
	//else: wait for 100 ms

	var thePlaylist = $("#shared-addto-menu .playlists ul");
	var theMenu = $("#shared-addto-menu");

	if(thePlaylist.children("li").length > 0 && theMenu.is(':visible'))
	{
		//unsafeWindow.console.log("the menu is ready!");
		unsafeWindow.sortLists();
		return false;
	}
	else
	{
		//unsafeWindow.console.log("waiting 100 ms...");	
		setTimeout('initSortLists()', 100);
	}
}

unsafeWindow.sortLists = function(){
	
	//this function does what we want, meaning the sorting of the playlists, alphabetically
	
	//unsafeWindow.console.log("doing the magic!");

	var plists = [];
	var lTitle, lSpan, newList;

	$(".playlists ul li span.yt-uix-button-menu-item").each(function () {
		lTitle = $(this).attr("data-possible-tooltip");
		lSpan = $(this);
		
		if (lTitle == "") { lTitle = "_Favorites"; }
	
		plists.push(listData(lTitle, lSpan));
	});
	
	plists.sort(SortByTitle);
	
	newList = "<ul>";
	
	for (p in plists)
	{
		newList = newList + "<li>" + $(plists[p].lElement).parent().clone().html() + "</li>";
	}
	
	newList = newList + "</ul>";
	
	//and now: viva la revolution! ;)
	$(".playlists ul").replaceWith(newList);
}	
	
$(document).ready(function () {
	//here begins everything
	$(".addto-button").attr("onclick", ";initSortLists();return false;");
});