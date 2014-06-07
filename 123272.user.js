// ==UserScript==
// @name           Youtube Playlists Sorted Alphabetically
// @namespace      http://www.pbworks.net
// @description	   When you click on "+ Add to" (for adding a new video to a playlist), or on your profile (to see your playlists in the header), or on your Video Manager, YouTube displays the playlists, by default, in a strange order, beginning with the one selected last. This script arranges your playlists alphabetically, making it easier for you to find the one you are looking for. Additionally: in the watch video page the listbox has been replaced by a "tag cloud" styled one, giving a better overview.
// @author         Paolo Brocco
// @homepage       http://www.pbworks.net
// @copyright      2012+, Paolo Brocco (http://www.pbworks.net)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version        2012.12.08
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// @uso:script     123272
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

//let's modify some styles... here I fix the width of the title and get rid of "Public/Private" and Playlist creation information, which are on my opinion quite useless.
GM_addStyle(".watch-playlists-drawer .playlist-title { width: auto; } .watch-playlists-drawer .playlist-public-private, .watch-playlists-drawer .created-at { display: none; }");
//here I add some margin to the right. Feel free to modify those styles according to your needs.
GM_addStyle(".watch-playlists-drawer li { float: left; margin-right: 20px; font-size: 90%; }");
//Profile name without cursor fix
GM_addStyle("#yt-masthead-user-displayname { cursor: pointer; }");

//Note: playlist selector (damn youtube, stop changing this! You mess my work :-P ): .watch-playlists-drawer ul.playlist-items

/*** HELPERS ***/

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

/*** INIT FUNCTIONS: logic to decide when to activate the sorting ***/

unsafeWindow.initSortLists = function(){

	//this function checks if the menu is ready (ready I mean: if the ul list has children (li) (youtube populates the list via ajax, then shows it) ):
	//if ready: call sortLists()
	//else: wait for 100 ms

	var thePlaylist = $(".watch-playlists-drawer ul.playlist-items");

	if(thePlaylist.children("li").length > 0)
	{
		//unsafeWindow.console.log("the menu is ready!");
		
		if (thePlaylist.hasClass("sorted") == false) 
		{
			//unsafeWindow.console.log("playlist coming from youtube, sorting it.");
			unsafeWindow.sortLists();
		}
		else
		{
			//unsafeWindow.console.log("playlist already sorted ;)");
		}
		return false;
	}
	else
	{
		//unsafeWindow.console.log("waiting 100 ms...");	
		setTimeout('initSortLists()', 100);
	}
}

unsafeWindow.initSortHeadLists = function(){

	//this function checks if the menu is ready (ready I mean: if the ul list has children (li) (youtube populates the list via ajax, then shows it) ):
	//if ready: call sortLists()
	//else: wait for 100 ms

	//unsafeWindow.console.log("init");
	
	var thePlaylist = $("ol#playlist-bar-lists-content");

	if(thePlaylist.children("li").length > 0)
	{
		//unsafeWindow.console.log("the menu is ready!");
		
		if (thePlaylist.hasClass("sorted") == false) 
		{
			//unsafeWindow.console.log("playlist coming from youtube, sorting it.");
			unsafeWindow.sortHeadLists();
		}
		else
		{
			//unsafeWindow.console.log("playlist already sorted ;)");
		}
		return false;
	}
	else
	{
		//unsafeWindow.console.log("waiting 100 ms...");	
		setTimeout('initSortHeadLists()', 100);
	}
}

/*** SORTING FUNCTIONS ***/

unsafeWindow.sortLists = function(){
	
	//this function does what we want, meaning the sorting of the playlists, alphabetically
	
	//unsafeWindow.console.log("doing the magic!");

	var plists = [];
	var lTitle, lElement, newList;

	$(".watch-playlists-drawer ul.playlist-items li").each(function () {
		
		lTitle = $(this).attr("data-title");
		lElement = $(this);
	
		plists.push(listData(lTitle, lElement));
	});
	
	plists.sort(SortByTitle);
	
	newList = "<ul class=\"playlist-items sorted\">";
	
	for (p in plists)
	{
		//note: before 2012.04.20 I was using: newList += $(plists[p].lElement).parent().clone().html();
		//which was not working (why I don't know... jquery mystery. Using outerHTML just works fine!
		newList += $(plists[p].lElement)[0].outerHTML;
	}
	
	newList += "</ul>";
	
	//and now: viva la revolution! ;)
	$(".watch-playlists-drawer ul.playlist-items").replaceWith(newList);
}	

unsafeWindow.sortHeadLists = function(){
	
	//this function does what we want, meaning the sorting of the playlists, alphabetically
	
	//unsafeWindow.console.log("doing the magic!");

	var slists = [];//system lists
	var plists = [];//playlists
	var lTitle, lElement, newList;

	//system lists
	$("ol#playlist-bar-lists-content li.system").each(function () {	
		lTitle = $(this).children("a.playlist-thumb-section").attr("title");
		lElement = $(this);
		slists.push(listData(lTitle, lElement));
	});
	
	//playlists
	$("ol#playlist-bar-lists-content li:not(.system)").each(function () {
		
		lTitle = $(this).children("a.playlist-thumb-section").attr("title");
		
		if (lTitle == undefined) {
			//this is probably an empty list, the title has to be taken like this:
			lTitle = $(this).children("a.playlist-data-section").children("span.playlist-data-item").text()
		}
		
		lElement = $(this);
	
		//unsafeWindow.console.log("taken " + lTitle);
	
		plists.push(listData(lTitle, lElement));
	});
	
	//todo: show first system lists (Watch Later, Likes etc.)
	plists.sort(SortByTitle);
	
	newList = "<ol class=\"yt-uix-slider-slide\" id=\"playlist-bar-lists-content\" style=\"left: 0px;\">";
	
	for (s in slists)
	{
		newList += $(slists[s].lElement)[0].outerHTML;
	}
	
	for (p in plists)
	{
		//note: before 2012.04.20 I was using: newList += $(plists[p].lElement).parent().clone().html();
		//which was not working (why I don't know... jquery mystery. Using outerHTML just works fine!
		newList += $(plists[p].lElement)[0].outerHTML;
	}
	
	newList += "</ol>";
	
	//and now: viva la revolution! ;)
	$("ol#playlist-bar-lists-content").replaceWith(newList);
}

/*** DOCUMENT READY: triggers (buttons) with added calls to this script functions ***/
	
$(document).ready(function () {
	//here begins everything

	//This is the "Add to" button
	$("#watch7-secondary-actions button.action-panel-trigger.yt-uix-button").attr("onclick", ";initSortLists();return false;");

	//This is the user's profile button, at the top right corner of the website        
	$("#yt-masthead-user").attr("onclick", ";initSortHeadLists();return false;");

	//This is the playlists link in the "Video Manager" page
	$(".vm-vertical-nav li a[href='/view_all_playlists']").attr("href", "/view_all_playlists?sf=name&sa=0");
});