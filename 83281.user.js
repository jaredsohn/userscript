// See http://earthgaming.com/?page_id=123 for more details.
// 
// ==UserScript==
// @name          Sinkhole
// @namespace     http://www.earthgaming.com/
// @description   Filter articles from Digg
// @include       *digg.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @copyright     2011+, Kris Arndt (http://www.earthgaming.com/)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @author        Kris Arndt
// @created       2010-08-10
// @revised       2011-06-16
// @version       0.5.8
// ==/UserScript==
//
// Changelog:
//
// 2011-06-16  Version 0.5.8
//   - Updated to work with the latest Digg.
//
// 2010-08-25  Version 0.5.6
//   - Updated to work with the Digg 4.x
//
// 2010-08-18  Version 0.5.4
//   - Added ability to hide trending stories.
//
// 2010-08-10  Version 0.5.2
//   - Script created.
//

/****************************************************************************/

var SETTING_FILTER_TEXT = 'sinkholeFilterText_';
var SETTING_FILTER_DAYS = 'sinkholeFilterDays_';
var SETTING_DISABLE_TRENDING = 'sinkholeDisableTrending';
var SETTING_MAX_CHARS = 256;
var SETTING_MAX_FILTERS = 200;

var placeSettings = ".main-column .section-header";
var newsItem = ".story-item"; // ".news-summary";

var styleSunkDiv = ' style="border: 2px solid #f00; padding: 5px; margin: 5px 0px; font-weight: bold; clear: left;"';
var styleSunkA = ' style="text-decoration: none;"';
var styleASettings = ' style="float: left;"';
var styleMainSettings = ' style="clear: left; background-color: #fff; margin-top: 5px;"';
//var styleSettings = ' style="float: left;"';
var styleSettings = ' style="display: none; clear: left; border: 0px solid #1B5790; padding: 5px 40px;"';//float: left;"';
//var styleSettings = ' style="clear: left; border: 0px solid #1B5790; padding: 5px 40px;"';//float: left;"';
var styleFormSettings = '';//' style="display: inline;"';
var styleULSettings = '';//' style="display: inline;"';
var styleLISettings = ' style="float: left; margin-right: 35px; list-style-position: inside; "';
var styleInputLISettings = ' style="clear: left; list-style: none; list-style-position: inside; padding-left: 0px;"';
var styleInputLabelKey = '<div style="float: left; width: 70px;">';
var styleInputDeleteA = ' style="text-decoration: none;"';

var sinkholeCount = 0;
var sinkholeFilters = new Array (SETTING_MAX_FILTERS);
var sinkholeDays = new Array (SETTING_MAX_FILTERS);

var sinkholeCurrentDay = new Date().getDay();

/****************************************************************************/

window.sinkholeSettings = function()
{
	$("#sinkhole-settings").toggle (200);
//    alert ('Hello world!');
	return false;
}

/****************************************************************************/

window.sinkholeSettingsCheckAll = function()
{
	$("#sinkhole-settings #sinkhole-settings-ul-filters INPUT[type='checkbox']").attr('checked', true);
	return false;
}

/****************************************************************************/

window.sinkholeSettingsCheckNone = function()
{
	$("#sinkhole-settings #sinkhole-settings-ul-filters INPUT[type='checkbox']").attr('checked', false);
	return false;
}

/****************************************************************************/
/*
window.sinkholeSettingsSaved = function()
{
//    alert ('Hello world!');
	// Save the filters.
	for (var i = 0; i < SETTING_MAX_FILTERS; i++)
	{
		if (sinkholeFilters[i] == "")
			GM_setValue (SETTING_FILTER_TEXT + i, "");
		else
//		GM_setValue (SETTING_FILTER_TEXT + i, $("#sinkhole-settings-filters").val().substring(0,SETTING_MAX_CHARS));
			GM_setValue (SETTING_FILTER_TEXT + i, sinkholeFilters[i].substring(0,SETTING_MAX_CHARS));
	}

	alert ('Settings have been saved!  Reload the page for the settings to take effect.');
	return false;
}
*/
/****************************************************************************/

window.sinkholeSettingsAddFilter = function()
{
	// Add a filter.
	var newText = $("#sinkhole-settings-filters").val().substring(0,SETTING_MAX_CHARS);
	
	if (newText == "")
	{
		alert ("Please fill in the 'Filter Text' field.");
		return false;
	}
	
	var days = "";
	$("#sinkhole-settings INPUT[type='checkbox']").each (function ()
	{
		if ($(this).attr('checked'))
		{
			if (days != "")
				days += ",";
			days += $(this).val();
		}
	});
	
	if (days == "")
	{
		alert ("Please check at least one day.");
		return false;
	}
	else if (days.length == 13)	
		days = "All";
	
	for (var i = 0; i < SETTING_MAX_FILTERS; i++)
	{
		if (sinkholeFilters[i] == "")
		{
			sinkholeFilters[i] = newText;
			sinkholeDays[i] = days;
			GM_setValue (SETTING_FILTER_TEXT + i, sinkholeFilters[i]);
			GM_setValue (SETTING_FILTER_DAYS + i, sinkholeDays[i]);
			sinkholeCount++;
			break;
		}
	}

	$("#sinkhole-settings ul#sinkhole-settings-ul-filters").html (window.sinkholeSettingsReloadFilterList());
	$("#sinkhole-settings-filters").val ("");
	$("#sinkhole-settings #sinkhole-settings-ul-filters INPUT[type='checkbox']").attr('checked', true);
	window.sinkholeSettingsReloadFilterListEvents ();
	
	alert ('Reload the page for the new filter to take effect.');
	return false;
}

/****************************************************************************/

window.sinkholeSettingsRemoveFilter = function()
{
	var id = $(this).attr('id').replace ("sinkhole-remove-filter", "");
	id = parseInt (id);
//	alert (id);
	
	if (confirm("Do you really want to delete this filter '" + sinkholeFilters[id] + "'?"))
	{
		// Remove the filter and then move everything up one spot.
		for (var i = id + 1; i <= SETTING_MAX_FILTERS; i++)
		{
			if (i < SETTING_MAX_FILTERS)
			{
				sinkholeFilters[i-1] = sinkholeFilters[i];
				sinkholeDays[i-1] = sinkholeDays[i];
			}
			else
			{
				sinkholeFilters[i-1] = "";
				sinkholeDays[i-1] = "";
			}
			
			GM_setValue (SETTING_FILTER_TEXT + (i-1), sinkholeFilters[i-1]);
			GM_setValue (SETTING_FILTER_DAYS + (i-1), sinkholeDays[i-1]);
					
			if (sinkholeFilters[i] == "")
				break;
		}
		
		sinkholeCount--;
		
		$("#sinkhole-settings ul#sinkhole-settings-ul-filters").html (window.sinkholeSettingsReloadFilterList());
		window.sinkholeSettingsReloadFilterListEvents ();
		
		alert ('Reload the page for the new filter to take effect.');
	}
	
	return false;
}

/****************************************************************************/

window.sinkholeSettingsReloadFilterList = function()
{
	// Reload the filter list.
	var list = "";
	for (var i = 0; i < SETTING_MAX_FILTERS; i++)
	{
		if (sinkholeFilters[i] == "")
			break;
		
		var days = sinkholeDays[i];
		days = days.replace ("0", "Su");
		days = days.replace ("1", "M");
		days = days.replace ("2", "T");
		days = days.replace ("3", "W");
		days = days.replace ("4", "Th");
		days = days.replace ("5", "F");
		days = days.replace ("6", "S");
		
		list += '<li' + styleLISettings + '>' + sinkholeFilters[i] + ' [' + 
			days + '] &nbsp; <a' + styleInputDeleteA + ' href="#" class="sinkhole-remove-filter" id="sinkhole-remove-filter' + i + '" title="Delete">(X)</a></li>';
	}

	var inputFilter = "";
	if (sinkholeCount >= SETTING_MAX_FILTERS)
		inputFilter = "You have reached the maximum of " + SETTING_MAX_FILTERS +
			' filters.  Please remove a filter before adding another.';
	else
		inputFilter = '<br />' + styleInputLabelKey + 'Filter Text:</div> <input type="text" name="filters" id="sinkhole-settings-filters" size="20" maxlength="256" /><br />' + 
			styleInputLabelKey + 'Days:</div> ' +
			' <input type="checkbox" name="sinkholeDaysSu" value="0" checked="checked" /> Sun &nbsp;' +
			' <input type="checkbox" name="sinkholeDaysM"  value="1" checked="checked" /> Mon &nbsp; ' +
			' <input type="checkbox" name="sinkholeDaysT"  value="2" checked="checked" /> Tue &nbsp; ' +
			' <input type="checkbox" name="sinkholeDaysW"  value="3" checked="checked" /> Wed &nbsp; ' +
			' <input type="checkbox" name="sinkholeDaysTh" value="4" checked="checked" /> Thu &nbsp; ' +
			' <input type="checkbox" name="sinkholeDaysF"  value="5" checked="checked" /> Fri &nbsp; ' +
			' <input type="checkbox" name="sinkholeDaysS"  value="6" checked="checked" /> Sat &nbsp; ' +
			' (<a href="#" id="sinkhole-settings-select-all">All</a>, <a href="#" id="sinkhole-settings-select-none">None</a>) &nbsp; <br />' +
			styleInputLabelKey + '&nbsp;</div> <input type="submit" name="filtersSubmit" id="sinkhole-settings-submit" value="Add Filter Expression" />';
	
	return list + '<li' + styleInputLISettings + '>' + inputFilter + '</li>';
}

/****************************************************************************/

window.sinkholeSettingsReloadFilterListEvents = function()
{
	$("#sinkhole-settings-select-all").click (sinkholeSettingsCheckAll);
	$("#sinkhole-settings-select-none").click (sinkholeSettingsCheckNone);
	$("#sinkhole-settings-submit").click (sinkholeSettingsAddFilter);
	$("#sinkhole-settings .sinkhole-remove-filter").click (sinkholeSettingsRemoveFilter);
}

/****************************************************************************/

window.sinkholeDisableTrending = function()
{
	GM_setValue (SETTING_DISABLE_TRENDING, ($(this).attr('checked')? 1 : 0));
//	alert ('Settings have been saved!');
	if (GM_getValue(SETTING_DISABLE_TRENDING) == 1)
		$("#game").hide ();
	else
		$("#game").show ();
	return false;
}

/****************************************************************************/
// Filter any matching articles.
window.sinkholeFilter = function()
{
	var i = 0;
	
	var filterList = "";

	for (i = 0; i < sinkholeFilters.length; i++)
	{
		if (sinkholeFilters[i] == "")
			break;
		
		// Check to see if this filter is enabled on this day.
		if ((sinkholeDays[i] != "All") && 
			(sinkholeDays[i].indexOf(sinkholeCurrentDay) == -1))
			continue;
		
		var n = 0;
		$(newsItem).filter (function() { return $(this).html().match(sinkholeFilters[i], 'i') }).each (function()
		{
			if ($(this).is(":hidden") || $(this).hasClass("sinkholed"))
				return true;

			$(this).addClass ("sinkholed");
			
//			alert ($(this).html());
			// Digg news items no longer have unique ids so give them one from
			// their new unique class names.
			var id = $(this).attr('id');
			if (id == "")
			{
				var className = $(this).attr('class');
				var unique = className.match (/(item-[^ ]*)/i);
				
				id = (unique.length > 0)? unique[0] : 'item-' + n;
				$(this).attr ('id', id);
			}
			
			$(this).before ('<div' + styleSunkDiv + 
				'>An article has been filtered using your "' + sinkholeFilters[i] + 
				'" filter.  <a' + styleSunkA + ' href="#" onclick="' + 
				'document.getElementById(\'' + id + '\').style.display=\'block\'; return false;' + 
				'">Click here to see it</a>.</div>');
			$(this).hide ();
			
			n++;
		});
	}
}

/****************************************************************************/

window.sinkholeFilterRepeat = function()
{
	window.sinkholeFilter ();
	window.setTimeout (window.sinkholeFilterRepeat, 1000);
}

/****************************************************************************/

if ($(placeSettings).get(0))
{
	// Get the filters.
	for (var i = 0; i < SETTING_MAX_FILTERS; i++)
	{
		sinkholeFilters[i] = GM_getValue (SETTING_FILTER_TEXT + i);
		sinkholeDays[i] = GM_getValue (SETTING_FILTER_DAYS + i);
		
		if ((sinkholeFilters[i] == "") || (typeof sinkholeFilters[i] == "undefined"))
			sinkholeFilters[i] = "";
		else
			sinkholeCount++;
			
		if ((sinkholeDays[i] == "") || (typeof sinkholeDays[i] == "undefined"))
			sinkholeDays[i] = "";
	}

//alert (sinkholeFilters[0]);
//	var sa = sinkholeFilters.split (/,\s/);

	window.sinkholeFilter ();
	
	// Insert the Sinkhole settings div.
//	$("#h").after ('<div id="#sinkhole"><a href="#" onclick="return window.helloworld();">Sinkhole Settings</a></div>');
	$(placeSettings).before ('<div' + styleMainSettings + ' id="#sinkhole"><a href="#" id="sinkahole"' + styleASettings + '>' +
		'Sinkhole Settings</a>' +
		'<div id="sinkhole-settings"' + styleSettings + '>' +
		'<form method="post"' + styleFormSettings + '>' + 
		'<u>Filters:</u> <ul' + styleULSettings + ' id="sinkhole-settings-ul-filters">' + 
		window.sinkholeSettingsReloadFilterList() + 
		'</ul>' +
		'<u>Other:</u> <ul' + styleULSettings + ' id="sinkhole-settings-ul-other">' + 
		'<li' + styleInputLISettings + '><input class="' + SETTING_DISABLE_TRENDING + '" type="checkbox" name="' + SETTING_DISABLE_TRENDING + '" value="1" ' + ((GM_getValue(SETTING_DISABLE_TRENDING) == 1)? 'checked="checked"' : '') + ' /> Disable trending stories</li>' +
		'</ul></form>' +
		'</div></div><div style="clear: both;"></div>');

//	$("#sinkhole-settings-filters").val (sinkholeFilters);

	$("#sinkahole").click (sinkholeSettings);	
	window.sinkholeSettingsReloadFilterListEvents ();
	
	// Call the filter function when more stories is clicked.
	$("#more-stories").click (sinkholeFilterRepeat);
	
	// Disable trending and handle setting click.
	if (GM_getValue(SETTING_DISABLE_TRENDING) == 1)
		$("#game").hide ();
	
	$("#sinkhole-settings-ul-other input." + SETTING_DISABLE_TRENDING).change (window.sinkholeDisableTrending);
}

/****************************************************************************/
