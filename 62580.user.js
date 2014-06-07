// ==UserScript==
// @name           			YouTube Favourites Search
// @alternative_name        YouTube Favorites Search
// @namespace     			localhost

// @author					Marat Levit
// @description				Allows users to search their favoured YouTube videos from the Favourites page.
// @copyright 				2009+, Marat Levit of mlCodes (www.mlevit.posterous.com)
// @license					Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @homepage				http://userscripts.org/scripts/show/62580

// @version        			2.0.0
// @date           			15/12/2011

// @updateURL				http://userscripts.org/scripts/source/62580.user.js

// @include        			http://www.youtube.com/my_favorites*
// @include        			http://www.youtube.com/my_liked_videos*
// @include        			http://www.youtube.com/my_history*

// @require 				http://userscripts.org/scripts/source/52251.user.js

// @contributor				Buzzy 	(http://userscripts.org/scripts/show/52251)
// @contributor				lobo235 (http://www.netlobo.com)

// @feedback				For any comments, problems, suggestions, discussions or defects please use our UserVoice Forum here: http://mlcodesos.uservoice.com/pages/34350-youtube-favourites-search
// ==/UserScript==

//Call to check if an updated script is available
autoUpdate (62580, "2.0.0");

//Constants start
var SEARCH_BOX_ID = "fav-search-box";
var SEARCH_BUTTON_ID = "fav-search-button";
var SEARCH_CHECKBOX_ID 	= "fav-search-checkbox";

var SEARCH_PARAMETER = "q";

var SEARCH_BOX 	= "<input id='" + SEARCH_BOX_ID + "' name='" + SEARCH_PARAMETER + "' class='search-term' type='text' style='border:1px solid #999999; font-size:100% !important; height:1.38462em; padding:4px 1px 1px; vertical-align:top; width:25em; margin-right: 10px; height: 25px; margin-left: 35px; padding: 2px 4px 3px;'/>";
var SEARCH_BUTTON = "<button id='" + SEARCH_BUTTON_ID + "' class='yt-uix-button' style='margin-left: -6px' onclick='document." + SEARCH_BOX_ID + ".submit();'><span class='yt-uix-button-content'>Search My Videos</span></button>";

var ENTER_BUTTON_KEYCODE = 13;
var URL_ENCODE_REGEX = "(%[^%]{2})";

var NULL_VALUE = null;
var EMPTY_VALUE = "";

var MATCH_TERMS_PARAMETER = "m";
var SEARCH_URL = "http://www.youtube.com/my_favorites?pi=0&dm=0&sf=none&" + SEARCH_PARAMETER + "=";

//Retrieves the actual number of Favourites a user has instead of setting a high value like before.
var DISPLAY_UPPER_LIMIT = document.getElementById("vm-num-videos-shown").innerHTML;
//Constants end

//Only starts the script up once the page has finished loading. This will make sure that all the videos have already been loaded
//before the script starts searching through them.
window.addEventListener('load', function () 
{
	//Retrieve the videos array stored in the database
	var storedVideosArray = eval(GM_getValue("videos_array"));

	if (storedVideosArray == NULL_VALUE)
	{
		storedVideosArray = new Array();
		GM_setValue("videos_array", storedVideosArray.toSource());
	}

	//Get search query parameter
	var query = getParameter(SEARCH_PARAMETER);
	var matchTerms = getParameter(MATCH_TERMS_PARAMETER);

	var searchBar = document.getElementById("vm-page-subheader");
	var buttonBar = document.getElementById("vm-video-actions-inner");
	
	var newSearchBar = document.createElement("div");
	newSearchBar.setAttribute("id", "vm-page-subheader");
	newSearchBar.innerHTML = '<form action="" method="get" name="' + SEARCH_BOX_ID + '">' + SEARCH_BOX + SEARCH_BUTTON + '</form>';
	document.getElementById("yt-admin-content").insertBefore(newSearchBar, searchBar.nextSibling);

	var searchBox = document.getElementById(SEARCH_BOX_ID);
	var searchButton = document.getElementById(SEARCH_BUTTON_ID);
	var videoCSSClass = "video even";

	searchBox.focus();

	//Start searching if the user has searched
	if (query != EMPTY_VALUE)
	{
		//Creates a regular expression to get rid of special characters (e.g. space, comma, double quote etc)
		var urlEncodeRegex = new RegExp(URL_ENCODE_REGEX,'i');
		query = query.replace(urlEncodeRegex, " ");
		
		//Splits the search query into seperate terms
		var splitQuery = query.split(" ");
		
		var videoDIV = document.getElementById("vm-video-list-container");
		var videos = document.getElementById("vm-playlist-video-list-ol").getElementsByTagName("li")
		
		document.getElementById("vm-pagination").style.display = "none";
		storedVideosArray = new Array();
		//Run through all the videos on the page
		for (var i = 0; i < videos.length; i++)
		{
			var matchesFound = 0;
			
			//Retrieve the title elements for the video
			var title = videos[i].getElementsByClassName("vm-video-title-text")[0].innerHTML;
			
			//Rotate through each search term and see if a match can be found with the videos details
			for (var j = 0; j < splitQuery.length; j++)
			{
				//Make a regular expression from the search term, the 'i' is to make sure it is case insensitive
				var regex = new RegExp(splitQuery[j],'i');
				var match = title.search(regex);
				
				//Match found
				if (match != -1)
				{
					matchesFound++;
				}
			}
				
			//If no match found then hide the video
			if (matchesFound == 0)
			{
				videos[i].style.display = "none";
			}
			//If user has selected "Match all terms" and not all terms have been matched then hide the video
			else if (matchTerms != EMPTY_VALUE && matchesFound != splitQuery.length)
			{
				videos[i].style.display = "none";
			}
		}
	}
}, true); // end window load event listener

//Retrieves the value of the parameter passed in: http://www.netlobo.com/url_query_string_javascript.html
function getParameter(name)
{
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.href);
	
	if (results == null)
	{
		return "";
	}
	else
	{
		return results[1];
	}
}

function debug(message, type)
{
	if (type == 1)
	{
		var currentTime = new Date();
		GM_log(currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds() + ":" + currentTime.getMilliseconds() + ": " + message);
	}
	else
	{
		GM_log(message);
	}
}