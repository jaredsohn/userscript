// ==UserScript==
// @name           			TV Calendar Reloaded
// @namespace     			localhost

// @author					Marat Levit
// @description				Now a multi tool for www.pogdesign.co.uk/cat. Cleans up the website removing links and text, adds torrent search links and formatted file names for each episode for easy copy and renaming.
// @copyright 				2009+, Marat Levit of mlCodes (www.mlevit.wordpress.com)
// @license					Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @homepage				http://userscripts.org/scripts/show/59150
	
// @version        			2.20
// @date           			23/11/2009

// @include        			http://www.pogdesign.co.uk/cat*

// @exclude					http://www.pogdesign.co.uk/cat/showselect.php
// @exclude					http://www.pogdesign.co.uk/cat/next-airing
// @exclude					http://www.pogdesign.co.uk/cat/recent-additions.html

// @require 				http://userscripts.org/scripts/source/52251.user.js

// @contributor				Buzzy (http://userscripts.org/scripts/show/52251)

// @note					A modified script of TV Calendar to Bin (http://userscripts.org/scripts/show/57065) by Andrew Lawton.

// @feedback				For any comments, problems, suggestions, discussions or defects please use our UserVoice Forum here: http://mlcodesos.uservoice.com/pages/34339-tv-calendar-reloaded

// ==/UserScript==

//Call to check if an updated script is available
autoUpdate (59150, "2.20");

var SEARCH_LINK_TITLE = "ezRSS Search Link";
var SEARCH_LINK_VALUE = "ezRSS";

var SHOW_NAME_TEXT 	= "<show_name>";
var SEASON_NUMBER_TEXT = "<season_number>";
var EPISODE_NUMBER_TEXT = "<episode_number>";
var EPISODE_NAME_TEXT = "<episode_name>";

var SCRIPT_URL_REF = "&ref=TV%20Calendar%20Reloaded";

//Start of Properties

var NAME_FORMAT = 0;												//refer to nameFormat array below

//Modify the below from the new Greasemonkey menu
var USE_ALIAS = getSetGMVariable("USE_ALIAS");						//true to use show name alias', false to use original full names
var ADD_ZERO_EPISODE = getSetGMVariable("ADD_ZERO_EPISODE");		//true to add a zero in front of single digit episode numbers
var ADD_ZERO_SEASON = getSetGMVariable("ADD_ZERO_SEASON");			//true to add a zero in front of single digit season numbers
var ADD_FILE_EXTENSION = getSetGMVariable("ADD_FILE_EXTENSION");	//true to add a .avi to the end of the formatted string (true: Windows XP users false: Windows Vista or 7)
var CLEANUP_CAT = getSetGMVariable("CLEANUP_CAT");					//true will clean up the site. remove links, footer and various other improvments
var SHOW_SEARCH_LINK = getSetGMVariable("SHOW_SEARCH_LINK");		//true will display a torrent search link for that particular episode searching ezRSS.it
var RUN_FOR_WATCHED = getSetGMVariable("RUN_FOR_WATCHED");			//true to run the script on watched shows; false will skip shows that you have marked as watched

//End of Properties

//Start of init

var TORRENT_SEARCH_URL = "http://ezrss.it/search/index.php"
							+ "?show_name=" + SHOW_NAME_TEXT
							+ "&season=" + SEASON_NUMBER_TEXT
							+ "&episode=" + EPISODE_NUMBER_TEXT
							+ "&show_name_exact=true" + SCRIPT_URL_REF;

//Some show names are too long, so the alias array should help out with that.
//To add a new show alias, simple add and element to the array below with the full show title as it appears in CAT
//then add another element after that with the new alias for that show.
var showAlias = new Array()
showAlias[showAlias.length] = new ShowAlias();
showAlias[showAlias.length - 1].original = "The Big Bang Theory";
showAlias[showAlias.length - 1].alias = "TBBT";
showAlias[showAlias.length] = new ShowAlias();
showAlias[showAlias.length - 1].original = "Two and a Half Men";
showAlias[showAlias.length - 1].alias = "TAAHM";

//Some shows may show up different on TV Calendar than they do on ezRSS (TV Calendar displays Law & Order: SVU, ezRSS displays Law 
//& Order: Special Victums Unit). This new array can hold the TV Calendar version of the show name and the ezRSS version of the show name. If some shows like the Law & Order: SVU
//have this difference, you can add them to the new showSearchAlias array.
var showSearchAlias = new Array()
showSearchAlias[showSearchAlias.length] = new ShowSearchAlias();
showSearchAlias[showSearchAlias.length - 1].tvCalendar = "Law & Order: SVU";
showSearchAlias[showSearchAlias.length - 1].search = "Law & Order: Special Victums Unit";
showSearchAlias[showSearchAlias.length] = new ShowSearchAlias();
showSearchAlias[showSearchAlias.length - 1].tvCalendar = "Law & Order: CI";
showSearchAlias[showSearchAlias.length - 1].search = "Law & Order: Criminal Intent";

var nameFormat = new Array()
nameFormat[0] = SHOW_NAME_TEXT + " " + SEASON_NUMBER_TEXT + "x" + EPISODE_NUMBER_TEXT + " - " + EPISODE_NAME_TEXT;		//House 6x01 - Broken
nameFormat[1] = SHOW_NAME_TEXT + " S" + SEASON_NUMBER_TEXT + "E" + EPISODE_NUMBER_TEXT + " - " + EPISODE_NAME_TEXT;		//House S6E01 - Broken
nameFormat[2] = SHOW_NAME_TEXT + " S" + SEASON_NUMBER_TEXT + " x E" + EPISODE_NUMBER_TEXT + " - " + EPISODE_NAME_TEXT;	//House S6 x E01 - Broken
nameFormat[3] = SHOW_NAME_TEXT + " " +  SEASON_NUMBER_TEXT + EPISODE_NUMBER_TEXT + " - " + EPISODE_NAME_TEXT;			//House 601 - Broken

//Replaced HTML Code like &amp; with its symbol counterpart. This is because to display the ampersand on a webpage you must use &amp;
var htmlNameToSymbol = new Array();
htmlNameToSymbol[htmlNameToSymbol.length] = new HTMLSymbol();
htmlNameToSymbol[htmlNameToSymbol.length - 1].html = "&amp;";
htmlNameToSymbol[htmlNameToSymbol.length - 1].symbol = "&";

var header = document.getElementsByTagName("table");		//Retrieves all the tables in the webpage
var topLinks = header[0].getElementsByTagName("td");		//Retrieves the columns inside the first table

var footer = document.getElementsByClassName("bottomtext"); //Retrieves the first of the bottom texts div
var footer2 = document.getElementsByClassName("comment");	//Retrieves the second of the bottom texts div

var options = document.getElementById("optionsarea");		//Retrives the Settings box

var days = document.getElementsByClassName('day');			//Finds all the calendar day boxs (except for 'today')
var today = document.getElementsByClassName('today');		//Finds todays calendar box

var selectOptions = "";

//The functions creates two dropdown menu options based on whether you have selected to cleanup CAT or not
if (CLEANUP_CAT == true)
{
	selectOptions = "<option value='No' selected='selected'>No</option>"
					+ "<option value='Yes'>Yes</option>";
}
else
{
	selectOptions = "<option value='Yes' selected='selected'>Yes</option>"
					+ "<option value='No'>No</option>";
}

var additionalMenu = "<label>Show Top Links:</label>"
					+ "<select id='toplinks' name='toplinks'>"
					+ selectOptions
					+ "</select>"
					+ "<label>Show Bottom Links:</label>"
					+ "<select id='bottomlinks' name='bottomlinks'>"
					+ selectOptions
					+ "</select>"; 
					
//Inserts the additional menu into the original settings box
options.innerHTML = options.innerHTML + additionalMenu;

//Adds even listeners to the document to listen to users actions
var listener = document.getElementById("toplinks");
listener.addEventListener("change", function (){ showHide(topLinks[0], this.value); }, false);

var listener = document.getElementById("bottomlinks");
listener.addEventListener("change", function (){ showHide(footer[0], this.value); showHide(footer2[0], this.value); }, false);

//End of init

for (var i = 0; i < days.length; i++)
{
	runThroughDays(days, i);
}

for (var i = 0; i < today.length; i++)
{
	runThroughDays(today, i);
}

if (CLEANUP_CAT == true)
{
	showHide(topLinks[0], 'No');
	showHide(footer[0], 'No'); 
	showHide(footer2[0], 'No');
}

function runThroughDays(days, i)
{
	var watched = days[i].getElementsByClassName('watched');	
	var shows = days[i].getElementsByClassName('eplink');
	
	if (watched.length > 0)
	{
		//Will only create search link and formatted filename if the show is either marked as unwatched
		//or the property RUN_FOR_WATCHED is set to true (meaning the user wishes the script to run for watched and unwatched shows)
		for (var y = 0; y < shows.length; y++)
		{
			//Checks to see if the show has been marked as watched. The show will be skipped if it has been marked as
			//watched. If the user has set RUN_FOR_WATCHED property to true then it wont be skipped
			if (watched[y].getElementsByClassName('iswatched').length != 1 || RUN_FOR_WATCHED == true)
			{
				//Retrieves the shows name
				var showName = shows[y].innerHTML;
				//Retrieves the shows episode name
				var episodeName = shows[y].parentNode.getElementsByClassName('seasep')[0];
				//Retrieves the shows season and episode numbers
				var episodeElement = shows[y].parentNode.getElementsByClassName('seasep')[1];
				
				var episodeName = episodeName.innerHTML;
				var episodeDetails = episodeElement.innerHTML;
				
				//Finds and retrives the shows season number
				var seasonNumber = episodeDetails.substring(3, episodeDetails.search('-') - 1);
				//Finds and retrives the shows episode number
				var episodeNumber = episodeDetails.substr(episodeDetails.search('Ep:') + 4, 2);
				
				//Removes the ' ' quotes around the shows episode name
				var episodeName = episodeName.replace(/\'/g, "");
				//Removes all spaces from the shows episode number
				var episodeNumber = episodeNumber.replace(" ", "");
				
				if (seasonNumber.length == 1 && ADD_ZERO_SEASON == true)
				{
					seasonNumber = "0" + seasonNumber;
				}
				
				if (episodeNumber.length == 1 && ADD_ZERO_EPISODE == true)
				{
					episodeNumber = "0" + episodeNumber;
				}
				
				for (k = 0; k < htmlNameToSymbol.length; k++)
				{
					showName = showName.replace(htmlNameToSymbol[k].html, htmlNameToSymbol[k].symbol);
					episodeName = episodeName.replace(htmlNameToSymbol[k].html, htmlNameToSymbol[k].symbol);
				}
				
				var showNameAlias = showName;
				
				if (USE_ALIAS == true)
				{
					//Replaces the show names with their alias'
					for (var j = 0; j < showAlias.length; j++)
					{
						if (showName == showAlias[j].original)
						{
							showNameAlias = showAlias[j].alias;
							break;
						}
					}
				}
				
				//Creates the actual string
				var formattedName = createName(NAME_FORMAT, showNameAlias, seasonNumber, episodeNumber, episodeName);
				
				if (SHOW_SEARCH_LINK == true)
				{
					episodeElement.innerHTML = episodeElement.innerHTML + createSearchLink(showName, seasonNumber, episodeNumber);
				}
				
				episodeElement.innerHTML = episodeElement.innerHTML + "<br/>File Name: ";
				episodeElement.appendChild(createTextBox(formattedName));
			}
		}
	}
}

function createName(formatStyle, showName, seasonNumber, episodeNumber, episodeName)
{
	var formattedName = nameFormat[formatStyle];
	
	//Inserts the show details into the generat filename format string
	formattedName = formattedName.replace(SHOW_NAME_TEXT, trim(showName));
	formattedName = formattedName.replace(SEASON_NUMBER_TEXT, trim(seasonNumber));
	formattedName = formattedName.replace(EPISODE_NUMBER_TEXT, trim(episodeNumber));
	formattedName = formattedName.replace(EPISODE_NAME_TEXT, trim(episodeName));
	
	if (ADD_FILE_EXTENSION == true)
	{
		formattedName = formattedName + ".avi";
	}
	
	return formattedName;
}

function createSearchLink(showName, seasonNumber, episodeNumber)
{
	var url = TORRENT_SEARCH_URL;
	
	for (var i = 0; i < showSearchAlias.length; i++)
	{
		if (showSearchAlias[i].tvCalendar == showName)
		{
			showName = showSearchAlias[i].search;
			break;
		}
	}
	
	//Inserts the show details into the torrent search string
	url = url.replace(SHOW_NAME_TEXT, escape(showName));
	url = url.replace(SEASON_NUMBER_TEXT, seasonNumber);
	url = url.replace(EPISODE_NUMBER_TEXT, episodeNumber);
	
	var searchLink = '<br/>Search: <a href="' + url + '" target="_blank" title="' + SEARCH_LINK_TITLE + '" style="color: white; font-weight: normal">' + SEARCH_LINK_VALUE + '</a>';
	
	return searchLink;
}

function createTextBox(formattedName)
{
	var nameBox = document.createElement("input");
	nameBox.value = formattedName;
	nameBox.setAttribute("onclick", "javascript:select();");	//Highlights the entire text box for copying
	nameBox.style.fontSize = "10px";
	nameBox.style.border = "none";
	nameBox.style.background = "none";
	nameBox.style.color = "white";
	nameBox.style.width = "55%";
	
	return nameBox;
}

function showHide(object, value)
{
	if (value == "Yes")
	{
		object.style.display = "";
	}
	else
	{
		object.style.display = "none";
	}
}

function getSetGMVariable(constant)
{
	var value = GM_getValue(constant);
	
	if (value == null)
	{
		GM_setValue(constant, true);
		value = true;
	}
	
	if (value == true)
	{
		GM_registerMenuCommand(constant + ": True", function(){GM_setValue(constant, false); window.location.reload();});
	}
	else
	{
		GM_registerMenuCommand(constant + ": False", function(){GM_setValue(constant, true); window.location.reload();});
	}
	
	return value;
}

function HTMLSymbol ()
{
	this.html = "";
	this.symbol = "";
}

function ShowAlias ()
{
	this.original = "";
	this.alias = "";
}

function ShowSearchAlias ()
{
	this.tvCalendar = "";
	this.search = "";
}

function trim(str, chars)
{
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars)
{
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars)
{
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}