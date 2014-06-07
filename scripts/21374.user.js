/*
	Gmail Calendar Nav Module
	version 1.4.5
	03/20/2008
	by Glenn Harris
	gharris@eklo.com
	Released under the GPL license
	http://www.gnu.org/copyleft/gpl.html
	-
	based on code originally found in
	Google Calendar Feed View - GMAIL by Chris McKeever
	and Gmail Google Calendar sidebar by Brad Stewart
	-
	Latest version available here: http://userscripts.org/scripts/show/21374
	-
	This script grabs a Google Calendar feed URL, parses it, and displays it in a side nav.
	Installation:
		1) Click the install icon for this user script in FireFox
		2) First get your Calendar Feed URL from calendar.google.com (XML)
			a. click the down arrow beside the calendar name in the left panel
			b. choose calendar settings
			c. click the XML button next to "Private Address:" at the bottom
			d. copy the URL in the pop-up
		3) Add this URL to google bookmarks (http://google.com/bookmarks) with a label that does not contain spaces (GMgcal recommended)
		4) When GMail is loaded/refreshed a new Nav Module will appear indicating you neeed to run setup.
		5) To run setup, click Firefox's tools menu, then choose user script commands->Gmail Calendar Nav Module Setup
		6) This will prompt you for the bookmark label (the one you selected above) and the number of events to display, and the number of pages of events to display.
		7) The Nav Module will refresh with your calendar data.
		8) To add feeds for further calendars, simply repeat steps 2 and 3 for each.  Make sure you use the same label as before.
		9) To change the color of items from a calendar, rename the link to the calendar in google bookmarks so that it ends with a color hex code, such as #F2A640 for orange -- the # is necessary

	Notes:
		- To clear your data, click Firefox's tools menu, then choose user script commands->Clear Gmail Calendar Nav Module Settings
		- If you make any changes to your calendar, or add new calendars to the bookmarks label, click 'Reload' in the Nav Module to download the new calendar information
		- To avoid the use of Google Bookmarks you can enter your calendar urls directly into this script.  Follow the instructions/examples at line 309.
	--------------------------------------------------------------------
	This is a Greasemonkey user script.
	-
	To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
	Then restart Firefox and revisit this script.
	Under Tools, there will be a new menu item to "Install User Script".
	Accept the default configuration and install.
	-
	To uninstall, go to Tools/Manage User Scripts,
	select "Gmail Calendar Nav Module", and click Uninstall.
	--------------------------------------------------------------------
	Updates
	-
	v1.4.5 - 3/20/2008
		- added support for static calendar lists - bypassing google bookmarks
		- fixed recognition/detection of color codes
	v1.4.0 - 3/6/2008
		- added support for multiple pages of events (default: 2)
		- added a script command to clear all settings
		- locations link to a map
		- changing script settings no longer reloads gmail - just the Nav Module
		- canceled events are rendered with a strikethrough font
		- updated install/uninstall instructions
	v1.0.2 - 2/1/2008
		- better error handling/reporting of invalid feeds
		- fixed a problem with loading calendars on the first of the month
	v1.0.1 - 1/29/2008
		- fixed display of "12pm" times
		- fixed highlighting of "today's events"
	v1.0.0 - 1/23/2008
		- rewritten to make use of gmail api, native js objects and caching.
		- renamed to gmail calendar nav module
	-
	--------------------------------------------------------------------
*/

// ==UserScript==
// @name           Gmail Calendar Nav Module
// @namespace      http://www.eklo.com/
// @description    Displays a Google Calendar summary in a nav module in Gmail.
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// @exclude          http://mail.google.com/mail/help/*
// @exclude          https://mail.google.com/mail/help/*
// ==/UserScript==

// Constants
var DISPLAY_CHARS = 20;
var DISPLAY_LIST_SIZE = 5;
var DISPLAY_MAX_PAGES = 2;
var CACHE_TIME = 60 * 60 * 1000;
var FONT_SIZE = '8pt';
var USER_AGENT = 'Mozilla/4.0 (compatible) Greasemonkey';

GM_registerMenuCommand('Gmail Calendar Nav Module Setup', gcal_setup);
GM_registerMenuCommand('Clear Gmail Calendar Nav Module Settings', gcal_clear_settings);

GM_addStyle(
	".gcalPage {display:none;}\n"+
	".gcalListDIV {background: white; display:none; padding: 1px 3px 0px 2; font-size: " + FONT_SIZE + ";}\n"+
	".gcalStatusDIV {background: #ffffcc; padding: 2px 2px 2px 2px; font-size: " + FONT_SIZE + ";}\n"+
	".gcalItem {color: #CC3333; font-size: " + FONT_SIZE + ";}\n"+
	".gcalItemCanceled {text-decoration:line-through;}\n"+
	".gcalItemToday {background-color:#FFFFCC;}\n"+
	".gcalMapLink {text-decoration:none;color: #CC3333}\n"+
	".GgcalItem {color: #CC3333; font-size: " + FONT_SIZE + ";background-color:#EBFFCE}\n"+
	".gcalEditDIV {text-align: right; padding: 2px 0px 5px 0; display:none; background: white; font-size: " + FONT_SIZE + ";}\n"+
	".gcalEditLink {color: #CC3333;}\n"
);

// declare global variables
var EventList = new Array();
var calCountTotal = 0;
var calCount = 0;
var gcalLabel;
var gcalDisplay;
var gcalDisplayPages;
var gcalNavModule;
var gcalStatusDIV;
var gcalListDIV;
var gcalEditDIV;
var gcalPageTN;
var isError;
var errorList;
var calendarList;
var current_page;
var total_pages;

function gcal_setup()
{
	if ( !gcalLabel || gcalLabel == 'undefined' )
	{
		gcalLabel = 'GMgcal';
	}
	gcalLabel = prompt('What is the Label for the XML Feed Bookmark', gcalLabel);
	GM_setValue('gcalLabel', gcalLabel);

	if ( !gcalDisplay )
	{
		gcalDisplay = DISPLAY_LIST_SIZE;
	}
	gcalDisplay = prompt('Display how many events', gcalDisplay);
	GM_setValue('gcalDisplay',gcalDisplay);

	if ( !gcalDisplayPages )
	{
		gcalDisplayPages = DISPLAY_MAX_PAGES;
	}
	gcalDisplayPages = prompt('Maximum number of pages', gcalDisplayPages);
	GM_setValue('gcalDisplayPages',gcalDisplayPages);

	refresh();
}

function gcal_clear_settings()
{
	GM_setValue('gcalLabel', '');
	GM_setValue('gcalDisplay','');
	GM_setValue('gcalDisplayPages','');
	GM_setValue('gcal_html','');
	GM_setValue('gcal_last_updated','');
	GM_setValue('gcal_pages','');
	GM_setValue('gcal_title','');
}

// grab gmail api reference
window.addEventListener('load',
	function()
	{
		if (unsafeWindow.gmonkey)
		{
			unsafeWindow.gmonkey.load('1.0',
				function(gmail)
				{
					// TODO: gmail settings
//					// one day we will make use of the gmail settings page
// 					gmail.registerViewChangeCallback(
// 						function()
// 						{
// 							var gmail = unsafeWindow.gmonkey.get("1.0");
// 							var cv = gmail.getActiveViewType();
// 							if ( cv == 's' )
// 							{
// 								console.log("gmail settings pane loaded");
// 							}
// 						}
// 					);

//					// TODO: rtm display
//					// find the parent node of the viewing pane
// 					var rnode = gmail.getActiveViewElement();
// 					while ( typeof(rnode) != 'undefined' && rnode.tagName != 'undefined' && rnode.className != 'undefined'  )
// 					{
// 						if ( rnode.className == 'XoqCub EGSDee' && rnode.parentNode.className == 'IY0d9c' )
// 						{
// 							break;
// 						}

// 						rnode = rnode.parentNode;
// 					}

					window.setTimeout(function() {
						initialize(gmail);
						refresh();
					}, 0);
				}
			);
		}
	}, true
);

function display_error(msg)
{
	errorList.push(msg);
	msg = '';
	for ( var i = 0 ; i < errorList.length ; i ++ )
	{
		 msg += ( i > 0 ? '<br>' : '' ) + errorList[i];
	}
	gcalStatusDIV.innerHTML = msg;

	isError = true;
	gcalEditDIV.style.display = 'block';
}

function initialize(gmail, rnode)
{
	gcalLabel = GM_getValue('gcalLabel');
	if ( !gcalLabel || gcalLabel == 'undefined' ) gcalLabel = 'GMgcal';

	gcalDisplay = GM_getValue('gcalDisplay');
	if ( !gcalDisplay   || gcalDisplay == 'undefined' ) gcalDisplay = DISPLAY_LIST_SIZE;

	gcalDisplayPages = GM_getValue('gcalDisplayPages');
	if ( !gcalDisplayPages   || gcalDisplayPages == 'undefined' ) gcalDisplayPages = DISPLAY_MAX_PAGES;

	current_page = 1;
	total_pages = 2;

	console.log('agenda setup');
	gcalNavModule = gmail.addNavModule('Agenda');
	console.log('created module');

	gcalListDIV = document.createElement("div");
	gcalListDIV.className = "gcalListDIV";
	gcalNavModule.appendChild(gcalListDIV);

	// set loading message
	gcalStatusDIV = document.createElement("div");
	gcalStatusDIV.className = "gcalStatusDIV";
	gcalStatusDIV.appendChild(document.createTextNode('Loading ' + gcalLabel));
	gcalNavModule.appendChild(gcalStatusDIV);
	console.log('status set ');

	// create edit div - contains reload link
	gcalEditDIV = document.createElement("div");
	gcalEditDIV.className = "gcalEditDIV";
	gcalNavModule.appendChild(gcalEditDIV);

	var gEditA = document.createElement('a');
	gEditA.href = "https://gmail.com";
	gEditA.className = "lk cs gcalEditLink";
	gEditA.appendChild(document.createTextNode("Prev"));
	gEditA.addEventListener("click", function(e) {
		e.preventDefault();
		previous_page();
	} , true);
	gcalEditDIV.appendChild(gEditA);

	gcalEditDIV.appendChild(document.createTextNode(' '));
	gcalPageTN = document.createTextNode(current_page + '/' + total_pages);
	gcalEditDIV.appendChild(gcalPageTN);
	gcalEditDIV.appendChild(document.createTextNode(' '));

	var gEditA = document.createElement('a');
	gEditA.href = "https://gmail.com";
	gEditA.className = "lk cs gcalEditLink";
	gEditA.appendChild(document.createTextNode("Next"));
	gEditA.addEventListener("click", function(e) {
		e.preventDefault();
		next_page();
	} , true);
	gcalEditDIV.appendChild(gEditA);
	gcalEditDIV.appendChild(document.createTextNode(' | '));

	var gEditA = document.createElement('a');
	gEditA.href = "https://gmail.com";
	gEditA.className = "lk cs gcalEditLink";
	gEditA.appendChild(document.createTextNode("Reload"));
	gEditA.addEventListener("click", function(e) {
		e.preventDefault();
		EventList = new Array();
		GM_setValue("last_updated", 0);
		refresh(true);
	} , true);
	gcalEditDIV.appendChild(gEditA);

	// TODO: rtm style
	// make some room - shrink the viewing pane
// 	console.log(rnode.style.width + ' - ' + parseInt(rnode.style.width));
// 	rnode.style.width = ( parseInt(rnode.style.width) - 150 ) + 'px';

	// create a new node to contain the nav module
// 	var bnode = document.createElement('div');
// 	bnode.appendChild(document.createTextNode('Loading . . .'));
// 	bnode.className = 'XoqCub EGSDee';
// 	bnode.style.border = "1px solid black";
// 	bnode.style.width = "141px";
// 	rnode.parentNode.appendChild(bnode);


	//////////////////////////////////////////////////////////////////////////////////////
	// *** set up static calendar list ***
	// url is the calendar url
	// title is the title of the calendar
	// color is the hex color code (no #) - if this is blank, the default color will be used
	// if setTitle is true the title of this calendar will be used as the title for the nav module
	//
	// examples:
	// 	calendarList.push({
	// 		url: 'http://www.google.com/calendar/feeds/1',
	// 		title: 'My Calendar',
	// 		color: '',
	// 		setTitle: true
	// 	});
	// 	calendarList.push({
	// 		url: 'http://www.google.com/calendar/feeds/2',
	// 		title: 'Another Calendar',
	// 		color: 'F2A640',
	// 		setTitle: false
	// 	});
	calendarList = new Array();
	//////////////////////////////////////////////////////////////////////////////////////
}

function refresh(force)
{
	// grab the cached data if it has been refreshed within the past hour
	var d = new Date();
	if ( !(force === true) && parseInt(GM_getValue("gcal_last_updated", 0)) + CACHE_TIME > d.getTime() )
	{
		console.info("using cached data");
		var gcal_html = GM_getValue("gcal_html", "");
		var gcal_title = GM_getValue("gcal_title", "Agenda");
		total_pages = GM_getValue("gcal_pages", 1);
		set_calendar_title(gcal_title);
		current_page = 1;
		display_calendar(gcal_html);
		return;
	}
	isError = false;
	errorList = new Array();

	gcalStatusDIV.style.display = 'block';
	gcalListDIV.style.display = 'none';
	gcalEditDIV.style.display = 'none';

	console.info("reloading data");

	if ( typeof(calendarList) == 'object' && calendarList.length > 0 )
	{
		calCount = 0;
		calCountTotal = calendarList.length;

		gcalStatusDIV.innerHTML = 'Retrieving Static Calendars';

		// calculate start and end times (+ 60 days)
		var start = new Date();
		var end = new Date();
		end.setDate(end.getDate() + 60);
		var range =  "start-max=" + end.format('s') + "&start-min=" + start.format('s');

		for ( var i = 0 ; i < calendarList.length ; i ++ )
		{
			var link = calendarList[i].url;

			if ( link.match(/.*basic$/) )
			{
				console.debug(" converting to full feed");
				link = link.replace(/basic$/,'full');
			}
			load_calendar(link + "?" + range,
				calendarList[i].title + ( calendarList[i].color != '' ? '#' + calendarList[i].color : '' ) ,
				calendarList[i].setTitle);
		}
	}
	else
	{
		load_bookmarks();
	}
}

function load_bookmarks()
{
	var XMLURL = "http://www.google.com/bookmarks/find?q=label:" + gcalLabel + "&output=rss";

	gcalStatusDIV.innerHTML = 'Retrieving Bookmarks';
	console.info("Retrieving Bookmarks");
	GM_xmlhttpRequest({
		method: 'GET',
		url: XMLURL,
		headers: {
			'User-Agent': USER_AGENT,
			'Accept': 'application/atom+xml,application/xml,text/xml'
		},
		onload: function(responseDetails) { parse_bookmarks(responseDetails.responseText); },
		onerror: function(responseDetails) { display_error("<FONT style='color:red;font-size:" + FONT_SIZE + ";'>Error retrieving bookmarks: " + responseDetails.statusText + "; aborting</FONT>"); }
	});
}

function parse_bookmarks(x)
{
	console.log("got bookmark feed");
	var responseDOM = new XMLDoc(x,
		function(error)
		{
			display_error("<FONT style='color:red;font-size:" + FONT_SIZE + ";'>Bookmark response data contained invalid XML: " + error + "; aborting</FONT>");
		}
	);

	if ( responseDOM == null || responseDOM.docNode == null){
		display_error("<FONT style='color:red;font-size:" + FONT_SIZE + ";'>Bookmark response data contained invalid XML, aborting.</FONT>");
		return;
	}

	var channel = responseDOM.docNode.getElements("channel")[0];
	var items = channel.getElements("item");

	gcalStatusDIV.innerHTML = 'Retrieving Dyn Calendars';

	// calculate start and end times (+ 60 days)
	var start = new Date();
	var end = new Date();
	end.setDate(end.getDate() + 60);
	var range =  "start-max=" + end.format('s') + "&start-min=" + start.format('s');

	calCount = 0;
	calCountTotal = items.length;

	console.info("found " + items.length + " bookmarked items");
	for ( var i = 0 ; i < items.length ; i ++ )
	{
		var title = items[i].getElements("title")[0].getText();
		var link = items[i].getElements("link")[0].getText();
		var setTitle = false;

		console.debug(" processing bookmark: " + title);
		if ( title.charAt(0) == '*' )
		{
			title = title.substr(1);
			setTitle = true;
		}

		if ( link.match(/.*basic$/) )
		{
			console.debug(" converting to full feed");
			link = link.replace(/basic$/,'full');
		}

		load_calendar(link + "?" + range, title, setTitle);
	}
}

function load_calendar(url, title, setTitle)
{
	console.debug("Loading: " + url);
	GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers: {
				'User-Agent': USER_AGENT,
				'Accept': 'application/atom+xml,application/xml,text/xml'
			},
			onload: function(responseDetails) {
				parse_calendar(responseDetails.responseText, title, setTitle); },
			onerror: function(responseDetails) { display_error("<FONT style='color:red;font-size:" + FONT_SIZE + ";'>Error retrieving agenda: " + responseDetails.statusText + "; ignoring</FONT>"); }
		});
}

function parse_calendar(x, title, setTitle)
{
	console.debug("got calendar feed for " + title);
	var responseDOM = new XMLDoc(x,
		function(error)
		{
			display_error("<FONT style='color:red;font-size:" + FONT_SIZE + ";'>Calendar " + title + " contained invalid XML: " + error + "; ignoring.</FONT>");
		}
	);

	if ( responseDOM == null || responseDOM.docNode == null)
	{
		if ( responseDOM == null )
		{
			console.debug("responseDOM is null");
		}
		if ( responseDOM.docNode == null )
		{
			console.debug("responseDOM.docNode is null");
		}
		display_error("<FONT style='color:red;font-size:" + FONT_SIZE + ";'>Calendar " + title + " contained invalid XML, ignoring.</FONT>");
	}
	else
	{
		var color = null;
		if ( /#[0-9A-Fa-f]{6}$/.test(title) )
		{
			var tmp = title.split("#");
			if ( tmp.length > 1 )
			{
				color = "#" + tmp[1];
				title = tmp[0]
			}
		}

		if ( setTitle )
		{
			set_calendar_title(title);
		}

		var nl = responseDOM.docNode.getElements("entry");
		console.info("calendar " + title + " contains " + nl.length + " event nodes");

		for ( var i = 0 ; i < nl.length ; i ++ )
		{
			var id = nl[i].getElements("id")[0].getText();
			var title = nl[i].getElements("title")[0].getText();
			var location = nl[i].getElements('gd:where')[0].getAttribute('valueString');
			var url;
			var canceled = false;

			var ln = nl[i].getElements("link");

			// find the link to the calendar
			for ( var c = 0 ; c < ln.length ; c ++ )
			{
				if ( ln[c].getAttribute('title') == 'alternate' )
				{
					url = ln[c].getAttribute('href');
					break;
				}
			}

			// check for event cancellation
			var sn = nl[i].getElements("gd:eventStatus");
			for ( var c = 0 ; c < sn.length ; c ++ )
			{
				if ( sn[c].getAttribute('value').match(/.canceled/) )
				{
					canceled = true;
					break;
				}
			}

			// add an event for each time slot
			var wn = nl[i].getElements("gd:when");
			for ( var c = 0 ; c < wn.length ; c ++ )
			{
				var etime = new Date();
				etime.setISO8601(wn[c].getAttribute('endTime'));
				// ensure this event has not already ended
				if ( etime > new Date() )
				{
					console.debug("event " + title + " : " + wn[c].getAttribute('startTime') + " - " + wn[c].getAttribute('endTime') + " - " + color + " - " + location);
					EventList.push(new CalendarEvent(id, title, location, url, wn[c].getAttribute('startTime'), wn[c].getAttribute('endTime'), canceled, color));
				}
			}
		}
	}

	calCount++;

	// if this is the last calendar to load, call render calendar
	if ( calCount == calCountTotal )
	{
		console.log("All calendars parsed - rendering");
		EventList.sort(function (a,b)
			{
				var s = a.stime;
				var e = b.stime;
				return ( ( s < e ) ? -1 : ( ( s > e ) ? 1 : 0 ) );
			}
		);
		render_calendar();
	}
}

function render_calendar()
{
	var html = '';
	var e = EventList;
	var n = new Date();

	var i = 0; // event count

	console.info("Processing " + e.length + " events");

	for ( var p = 1 ; p <= gcalDisplayPages && i < e.length ; p ++ )
	{
		console.debug("Rendering page " + p);
		html += '<div class="gcalPage">';
		for ( var c = 0 ; i < e.length && c < gcalDisplay ; i ++, c ++ )
		{
			var color = e[i].color;
			var className = 'gcalItem';

			var ntime = new Date();
			var stime = new Date();
			stime.setISO8601(e[i].stime);
			var etime = new Date();
			etime.setISO8601(e[i].etime);

			// begin container div
			html += '<div' + ( ( stime.getMonth() == n.getMonth() && stime.getDate() == n.getDate() )
				|| ( ntime > stime && ntime < etime ) ? ' class="gcalItemToday"' : '' ) + '>';

			html += '<div><a class="' + className + ( e[i].canceled ? ' gcalItemCanceled' : '' ) + '" target="_blank" title="' + e[i].title + '" href="' + e[i].url + '"' + ( typeof(e[i].color) ? ' style="color: ' + e[i].color + '"' : '' ) + '>' + shrink(e[i].title, DISPLAY_CHARS) + '</a></div>';
			if ( e[i].location != '' )
			{
				html += '<div><a target="_blank" title="' + e[i].location + '" class="gcalMapLink" href="http://maps.google.com/maps?q=' + encodeURIComponent(e[i].location) + '&hl=en">' + shrink(e[i].location, DISPLAY_CHARS) + '</a></div>';
			}

			html += '<div>' + stime.format() + '</div>';

			if ( stime && etime )
			{
				// no times specified
				if ( e[i].stime.indexOf('T') == -1 && e[i].etime.indexOf('T') == -1 )
				{
					etime.setDate(etime.getDate() - 1);

					if ( stime.format('s') != etime.format('s') )
					{
						if ( stime.getYear() == etime.getYear() )
						{
							html += '<div>' + stime.format('ss') + '~' + etime.format('ss') + '</div>';
						}
						else
						{
							html += '<div>' + stime.format('s') + '~' + etime.format('s') + '</div>';
						}
					}
				}
				// single day
				else if ( stime.format('s') == etime.format('s') )
				{
					html += '<div>' + stime.format('t') + '~' + etime.format('t') + '</div>';
				}
			}
			else if ( e[i].stime )
			{
				html += '<div>' + stime.format('t') + '</div>';
			}

			// end container div
			html += '</div>';
		}
		html += '</div>';
	}
	total_pages = p - 1;

	GM_setValue("gcal_pages", total_pages);
	GM_setValue("gcal_html", html);
	var date = new Date();
	GM_setValue("gcal_last_updated", date.getTime().toString());

	display_calendar(html);
}

function previous_page()
{
	var page;
	if ( current_page == 1 )
	{
		page = total_pages;
	}
	else
	{
		page = current_page - 1;
	}
	set_page(page);
}

function next_page()
{
	var page;
	if ( current_page == total_pages )
	{
		page = 1;
	}
	else
	{
		page = current_page + 1;
	}
	set_page(page);
}

function set_page(page)
{
	gcalListDIV.childNodes[current_page-1].style.display = 'none';
	gcalPageTN.textContent = page + '/' + total_pages;
	current_page = page;
	gcalListDIV.childNodes[current_page-1].style.display = 'block';
}

function set_calendar_title(title)
{
	GM_setValue("gcal_title", title);
	gcalNavModule.getTitleElement().innerHTML = "&nbsp;" + shrink(title, DISPLAY_CHARS, '');
}

function display_calendar(gcal_html)
{
	// load display string into nav module
	gcalListDIV.innerHTML = gcal_html;

	if ( !isError )
	{
		gcalStatusDIV.style.display = 'none';
	}
	gcalListDIV.style.display = 'block';
	gcalEditDIV.style.display = 'block';
	set_page(current_page);
}

/********* utility functions **************/

function CalendarEvent(id, title, location, url, stime, etime, canceled, color)
{
	this.id = id;
	this.title = title;
	this.location = location;
	this.url = url;
	this.stime = stime;
	this.etime = etime;
	this.canceled = ( canceled === true ? true : false );
	this.color = color;
}

// read an ISO 'T' formatted date string into a javascript object
//  - by Paul Sowden at http://delete.me.uk/2005/03/iso8601.html
Date.prototype.setISO8601 = function (string) {
    var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
        "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
        "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
    var d = string.match(new RegExp(regexp));

    var offset = 0;
    var date = new Date(d[1], 0, 1);

    if (d[3]) { date.setMonth(d[3] - 1); }
    if (d[5]) { date.setDate(d[5]); }
    if (d[7]) { date.setHours(d[7]); } else { date.setHours(0); }
    if (d[8]) { date.setMinutes(d[8]); } else { date.setMinutes(0); }
    if (d[10]) { date.setSeconds(d[10]); } else { date.setSeconds(0); }
    if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); } else { date.setMilliseconds(0); }
    if (d[14]) {
        offset = (Number(d[16]) * 60) + Number(d[17]);
        offset *= ((d[15] == '-') ? 1 : -1);
    }

    // if there was a specified time, adjust it using the timezone
    if ( d[7] )
    {
		offset -= date.getTimezoneOffset();
		time = (Number(date) + (offset * 60 * 1000));
	}
	else
	{
		time = Number(date);
	}

	this.setTime(Number(time));
}

Date.prototype.format = function (s)
{
	var Month = new Array();
	Month[0] = 'Jan';
	Month[1] = 'Feb';
	Month[2] = 'Mar';
	Month[3] = 'Apr';
	Month[4] = 'May';
	Month[5] = 'Jun';
	Month[6] = 'Jul';
	Month[7] = 'Aug';
	Month[8] = 'Sep';
	Month[9] = 'Oct';
	Month[10] = 'Nov';
	Month[11] = 'Dec';

	var LMonth = new Array();
	LMonth[0] = 'January';
	LMonth[1] = 'February';
	LMonth[2] = 'March';
	LMonth[3] = 'April';
	LMonth[4] = 'May';
	LMonth[5] = 'June';
	LMonth[6] = 'July';
	LMonth[7] = 'August';
	LMonth[8] = 'September';
	LMonth[9] = 'October';
	LMonth[10] = 'November';
	LMonth[11] = 'December';

	var Weekday = new Array();
	Weekday[0] = 'Sun';
	Weekday[1] = 'Mon';
	Weekday[2] = 'Tue';
	Weekday[3] = 'Wed';
	Weekday[4] = 'Thu';
	Weekday[5] = 'Fri';
	Weekday[6] = 'Sat';

	var LWeekday = new Array();
	LWeekday[0] = 'Sunday';
	LWeekday[1] = 'Monday';
	LWeekday[2] = 'Tuesday';
	LWeekday[3] = 'Wednesday';
	LWeekday[4] = 'Thursday';
	LWeekday[5] = 'Friday';
	LWeekday[6] = 'Saturday';

	var o = '';
	if ( typeof(s) == 'undefined' || s == 'd' )
	{
		o = Weekday[this.getDay()] + ' ' + Month[this.getMonth()] + ' ' + this.getDate() + ' ' + this.getFullYear();
	}
	else if ( s == 't' )
	{
		var h = this.getHours();

		o = ( h > 12 ? ( h - 12 ) : h ) + ':' + this.getMinutes().toString().pad(2, 0) + ( h >= 12 ? 'p' : 'a' );
	}
	else if ( s == 's' )
	{
		o = this.getFullYear() + '-' + ( this.getMonth() + 1 ).toString().pad(2, '0') + '-' + this.getDate().toString().pad(2, '0');
	}
	else if ( s == 'ss' )
	{
		o = ( this.getMonth() + 1 ).toString().pad(2, '0') + '-' + this.getDate();
	}
	return o;
}

function shrink (text, length, append)
{
	// shrinks text to length and makes undefined = ''
	// appends append to the end
	if ( text )
	{
		// fix IE &apos; issue
		text = text.replace("&apos;","'");
		if ( text.length > length )
		{
			text = text.substring(0 ,length) + ( typeof(append) == 'undefined' ? '...' : append );
		}
	}
	else
	{
		text = "";
	}

	return text;
}

// len, pad string, right - true
String.prototype.pad = function (l, c, r)
{
	var o = this;

	// run two seperate while loops to avoid checking
	//  'r' through every iteration.
	if ( r )
	{
		while ( o.length < l )
		{
			o += c;
		}
	}
	else
	{
		while ( o.length < l )
		{
			o = c + o;
		}
	}
	return o;
}

// undef - both
// 1 - left
// 2 - right
String.prototype.trim = function(r)
{
	var o = this;
	if ( typeof(r) == undefined )
	{
		o = r.replace(/^ /g, '').replace(/ $/g, '');
	}
	else if ( r == 1 )
	{
		o = r.replace(/^ /g, '');
	}
	else if ( r == 2 )
	{
		o = r.replace(/ $/g, '');
	}

	return o;
}

// ----------------- TINYDOM
// =========================================================================
//
// tinyxmldom.js - an XML DOM parser in JavaScript compressed for downloading
//
//   This is the classic DOM that has shipped with XML for <SCRIPT>
//   since the beginning. For a more standards-compliant DOM, you may
//   wish to use the standards-compliant W3C DOM that is included
//   with XML for <SCRIPT> versions 3.0 and above
//
//
// version 3.1
//
// =========================================================================
//
// Copyright (C) 2000 - 2002, 2003 Michael Houghton (mike@idle.org), Raymond Irving and David Joham (djoham@yahoo.com)
//
// This library is free software; you can redistribute it and/or
// modify it under the terms of the GNU Lesser General Public
// License as published by the Free Software Foundation; either
// version 2.1 of the License, or (at your option) any later version.

// This library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.   See the GNU
// Lesser General Public License for more details.

// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA   02111-1307   USA
//
// Visit the XML for <SCRIPT> home page at http://xmljs.sourceforge.net


var whitespace = "\n\r\t "; var quotes = "\"'"; function convertEscapes(str) { var gt; gt = -1; while (str.indexOf("&lt;", gt + 1) > -1) { var gt = str.indexOf("&lt;", gt + 1); var newStr = str.substr(0, gt); newStr += "<"; newStr = newStr + str.substr(gt + 4, str.length); str = newStr;}
gt = -1; while (str.indexOf("&gt;", gt + 1) > -1) { var gt = str.indexOf("&gt;", gt + 1); var newStr = str.substr(0, gt); newStr += ">"; newStr = newStr + str.substr(gt + 4, str.length); str = newStr;}
gt = -1; while (str.indexOf("&amp;", gt + 1) > -1) { var gt = str.indexOf("&amp;", gt + 1); var newStr = str.substr(0, gt); newStr += "&"; newStr = newStr + str.substr(gt + 5, str.length); str = newStr;}
return str;}
function convertToEscapes(str) { var gt = -1; while (str.indexOf("&", gt + 1) > -1) { gt = str.indexOf("&", gt + 1); var newStr = str.substr(0, gt); newStr += "&amp;"; newStr = newStr + str.substr(gt + 1, str.length); str = newStr;}
gt = -1; while (str.indexOf("<", gt + 1) > -1) { var gt = str.indexOf("<", gt + 1); var newStr = str.substr(0, gt); newStr += "&lt;"; newStr = newStr + str.substr(gt + 1, str.length); str = newStr;}
gt = -1; while (str.indexOf(">", gt + 1) > -1) { var gt = str.indexOf(">", gt + 1); var newStr = str.substr(0, gt); newStr += "&gt;"; newStr = newStr + str.substr(gt + 1, str.length); str = newStr;}
return str;}
function _displayElement(domElement, strRet) { if(domElement==null) { return;}
if(!(domElement.nodeType=='ELEMENT')) { return;}
var tagName = domElement.tagName; var tagInfo = ""; tagInfo = "<" + tagName; var attributeList = domElement.getAttributeNames(); for(var intLoop = 0; intLoop < attributeList.length; intLoop++) { var attribute = attributeList[intLoop]; tagInfo = tagInfo + " " + attribute + "="; tagInfo = tagInfo + "\"" + domElement.getAttribute(attribute) + "\"";}
tagInfo = tagInfo + ">"; strRet=strRet+tagInfo; if(domElement.children!=null) { var domElements = domElement.children; for(var intLoop = 0; intLoop < domElements.length; intLoop++) { var childNode = domElements[intLoop]; if(childNode.nodeType=='COMMENT') { strRet = strRet + "<!--" + childNode.content + "-->";}
else if(childNode.nodeType=='TEXT') { var cont = trim(childNode.content,true,true); strRet = strRet + childNode.content;}
else if (childNode.nodeType=='CDATA') { var cont = trim(childNode.content,true,true); strRet = strRet + "&lt;![CDATA[" + cont + "]]&gt;";}
else { strRet = _displayElement(childNode, strRet);}
}
}
strRet = strRet + "</" + tagName + ">"; return strRet;}
function firstWhiteChar(str,pos) { if (isEmpty(str)) { return -1;}
while(pos < str.length) { if (whitespace.indexOf(str.charAt(pos))!=-1) { return pos;}
else { pos++;}
}
return str.length;}
function isEmpty(str) { return (str==null) || (str.length==0);}
function trim(trimString, leftTrim, rightTrim) { if (isEmpty(trimString)) { return "";}
if (leftTrim == null) { leftTrim = true;}
if (rightTrim == null) { rightTrim = true;}
var left=0; var right=0; var i=0; var k=0; if (leftTrim == true) { while ((i<trimString.length) && (whitespace.indexOf(trimString.charAt(i++))!=-1)) { left++;}
}
if (rightTrim == true) { k=trimString.length-1; while((k>=left) && (whitespace.indexOf(trimString.charAt(k--))!=-1)) { right++;}
}
return trimString.substring(left, trimString.length - right);}
function XMLDoc(source, errFn) { this.topNode=null; this.errFn = errFn; this.createXMLNode = _XMLDoc_createXMLNode; this.error = _XMLDoc_error; this.getUnderlyingXMLText = _XMLDoc_getUnderlyingXMLText; this.handleNode = _XMLDoc_handleNode; this.hasErrors = false; this.insertNodeAfter = _XMLDoc_insertNodeAfter; this.insertNodeInto = _XMLDoc_insertNodeInto; this.loadXML = _XMLDoc_loadXML; this.parse = _XMLDoc_parse; this.parseAttribute = _XMLDoc_parseAttribute; this.parseDTD = _XMLDoc_parseDTD; this.parsePI = _XMLDoc_parsePI; this.parseTag = _XMLDoc_parseTag; this.removeNodeFromTree = _XMLDoc_removeNodeFromTree; this.replaceNodeContents = _XMLDoc_replaceNodeContents; this.selectNode = _XMLDoc_selectNode; this.selectNodeText = _XMLDoc_selectNodeText; this.source = source; if (this.parse()) { if (this.topNode!=null) { return this.error("expected close " + this.topNode.tagName);}
else { return true;}
}
}
function _XMLDoc_createXMLNode(strXML) { return new XMLDoc(strXML, this.errFn).docNode;}
function _XMLDoc_error(str) { this.hasErrors=true; if(this.errFn){ this.errFn("ERROR: " + str);}else if(this.onerror){ this.onerror("ERROR: " + str);}
return 0;}
function _XMLDoc_getTagNameParams(tag,obj){ var elm=-1,e,s=tag.indexOf('['); var attr=[]; if(s>=0){ e=tag.indexOf(']'); if(e>=0)elm=tag.substr(s+1,(e-s)-1); else obj.error('expected ] near '+tag); tag=tag.substr(0,s); if(isNaN(elm) && elm!='*'){ attr=elm.substr(1,elm.length-1); attr=attr.split('='); if(attr[1]) { s=attr[1].indexOf('"'); attr[1]=attr[1].substr(s+1,attr[1].length-1); e=attr[1].indexOf('"'); if(e>=0) attr[1]=attr[1].substr(0,e); else obj.error('expected " near '+tag)
};elm=-1;}else if(elm=='*') elm=-1;}
return [tag,elm,attr[0],attr[1]]
}
function _XMLDoc_getUnderlyingXMLText() { var strRet = ""; strRet = strRet + "<?xml version=\"1.0\"?>"; if (this.docNode==null) { return;}
strRet = _displayElement(this.docNode, strRet); return strRet;}
function _XMLDoc_handleNode(current) { if ((current.nodeType=='COMMENT') && (this.topNode!=null)) { return this.topNode.addElement(current);}
else if ((current.nodeType=='TEXT') || (current.nodeType=='CDATA')) { if(this.topNode==null) { if (trim(current.content,true,false)=="") { return true;}
else { return this.error("expected document node, found: " + current);}
}
else { return this.topNode.addElement(current);}
}
else if ((current.nodeType=='OPEN') || (current.nodeType=='SINGLE')) { var success = false; if(this.topNode==null) { this.docNode = current; current.parent = null; success = true;}
else { success = this.topNode.addElement(current);}
if (success && (current.nodeType!='SINGLE')) { this.topNode = current;}
current.nodeType = "ELEMENT"; return success;}
else if (current.nodeType=='CLOSE') { if (this.topNode==null) { return this.error("close tag without open: " + current.toString());}
else { if (current.tagName!=this.topNode.tagName) { return this.error("expected closing " + this.topNode.tagName + ", found closing " + current.tagName);}
else { this.topNode = this.topNode.getParent();}
}
}
return true;}
function _XMLDoc_insertNodeAfter (referenceNode, newNode) { var parentXMLText = this.getUnderlyingXMLText(); var selectedNodeXMLText = referenceNode.getUnderlyingXMLText(); var originalNodePos = parentXMLText.indexOf(selectedNodeXMLText) + selectedNodeXMLText.length; var newXML = parentXMLText.substr(0,originalNodePos); newXML += newNode.getUnderlyingXMLText(); newXML += parentXMLText.substr(originalNodePos); var newDoc = new XMLDoc(newXML, this.errFn); return newDoc;}
function _XMLDoc_insertNodeInto (referenceNode, insertNode) { var parentXMLText = this.getUnderlyingXMLText(); var selectedNodeXMLText = referenceNode.getUnderlyingXMLText(); var endFirstTag = selectedNodeXMLText.indexOf(">") + 1; var originalNodePos = parentXMLText.indexOf(selectedNodeXMLText) + endFirstTag; var newXML = parentXMLText.substr(0,originalNodePos); newXML += insertNode.getUnderlyingXMLText(); newXML += parentXMLText.substr(originalNodePos); var newDoc = new XMLDoc(newXML, this.errFn); return newDoc;}
function _XMLDoc_loadXML(source){ this.topNode=null; this.hasErrors = false; this.source=source; return this.parse();}
function _XMLDoc_parse() { var pos = 0; err = false; while(!err) { var closing_tag_prefix = ''; var chpos = this.source.indexOf('<',pos); var open_length = 1; var open; var close; if (chpos ==-1) { break;}
open = chpos; var str = this.source.substring(pos, open); if (str.length!=0) { err = !this.handleNode(new XMLNode('TEXT',this, str));}
if (chpos == this.source.indexOf("<?",pos)) { pos = this.parsePI(this.source, pos + 2); if (pos==0) { err=true;}
continue;}
if (chpos == this.source.indexOf("<!DOCTYPE",pos)) { pos = this.parseDTD(this.source, chpos+ 9); if (pos==0) { err=true;}
continue;}
if(chpos == this.source.indexOf('<!--',pos)) { open_length = 4; closing_tag_prefix = '--';}
if (chpos == this.source.indexOf('&lt;![CDATA[',pos)) { open_length = 9; closing_tag_prefix = ']]';}
chpos = this.source.indexOf(closing_tag_prefix + '>',chpos); if (chpos ==-1) { return this.error("expected closing tag sequence: " + closing_tag_prefix + '>');}
close = chpos + closing_tag_prefix.length; str = this.source.substring(open+1, close); var n = this.parseTag(str); if (n) { err = !this.handleNode(n);}
pos = close +1;}
return !err;}
function _XMLDoc_parseAttribute(src,pos,node) { while ((pos<src.length) && (whitespace.indexOf(src.charAt(pos))!=-1)) { pos++;}
if (pos >= src.length) { return pos;}
var p1 = pos; while ((pos < src.length) && (src.charAt(pos)!='=')) { pos++;}
var msg = "attributes must have values"; if(pos >= src.length) { return this.error(msg);}
var paramname = trim(src.substring(p1,pos++),false,true); while ((pos < src.length) && (whitespace.indexOf(src.charAt(pos))!=-1)) { pos++;}
if (pos >= src.length) { return this.error(msg);}
msg = "attribute values must be in quotes"; var quote = src.charAt(pos++); if (quotes.indexOf(quote)==-1) { return this.error(msg);}
p1 = pos; while ((pos < src.length) && (src.charAt(pos)!=quote)) { pos++;}
if (pos >= src.length) { return this.error(msg);}
if (!node.addAttribute(paramname,trim(src.substring(p1,pos++),false,true))) { return 0;}
return pos;}
function _XMLDoc_parseDTD(str,pos) { var firstClose = str.indexOf('>',pos); if (firstClose==-1) { return this.error("error in DTD: expected '>'");}
var closing_tag_prefix = ''; var firstOpenSquare = str.indexOf('[',pos); if ((firstOpenSquare!=-1) && (firstOpenSquare < firstClose)) { closing_tag_prefix = ']';}
while(true) { var closepos = str.indexOf(closing_tag_prefix + '>',pos); if (closepos ==-1) { return this.error("expected closing tag sequence: " + closing_tag_prefix + '>');}
pos = closepos + closing_tag_prefix.length +1; if (str.substring(closepos-1,closepos+2) != ']]&gt;') { break;}
}
return pos;}
function _XMLDoc_parsePI(str,pos) { var closepos = str.indexOf('?>',pos); return closepos + 2;}
function _XMLDoc_parseTag(src) { if (src.indexOf('!--')==0) { return new XMLNode('COMMENT', this, src.substring(3,src.length-2));}
if (src.indexOf('![CDATA[')==0) { return new XMLNode('CDATA', this, src.substring(8,src.length-2));}
var n = new XMLNode(); n.doc = this; if (src.charAt(0)=='/') { n.nodeType = 'CLOSE'; src = src.substring(1);}
else { n.nodeType = 'OPEN';}
if (src.charAt(src.length-1)=='/') { if (n.nodeType=='CLOSE') { return this.error("singleton close tag");}
else { n.nodeType = 'SINGLE';}
src = src.substring(0,src.length-1);}
if (n.nodeType!='CLOSE') { n.attributes = new Array();}
if (n.nodeType=='OPEN') { n.children = new Array();}
src = trim(src,true,true); if (src.length==0) { return this.error("empty tag");}
var endOfName = firstWhiteChar(src,0); if (endOfName==-1) { n.tagName = src; return n;}
n.tagName = src.substring(0,endOfName); var pos = endOfName; while(pos< src.length) { pos = this.parseAttribute(src, pos, n); if (pos==0) { return null;}
}
return n;}
function _XMLDoc_removeNodeFromTree(node) { var parentXMLText = this.getUnderlyingXMLText(); var selectedNodeXMLText = node.getUnderlyingXMLText(); var originalNodePos = parentXMLText.indexOf(selectedNodeXMLText); var newXML = parentXMLText.substr(0,originalNodePos); newXML += parentXMLText.substr(originalNodePos + selectedNodeXMLText.length); var newDoc = new XMLDoc(newXML, this.errFn); return newDoc;}
function _XMLDoc_replaceNodeContents(referenceNode, newContents) { var newNode = this.createXMLNode("<X>" + newContents + "</X>"); referenceNode.children = newNode.children; return this;}
function _XMLDoc_selectNode(tagpath){ tagpath = trim(tagpath, true, true); var srcnode,node,tag,params,elm,rg; var tags,attrName,attrValue,ok; srcnode=node=((this.source)?this.docNode:this); if (!tagpath) return node; if(tagpath.indexOf('/')==0)tagpath=tagpath.substr(1); tagpath=tagpath.replace(tag,''); tags=tagpath.split('/'); tag=tags[0]; if(tag){ if(tagpath.indexOf('/')==0)tagpath=tagpath.substr(1); tagpath=tagpath.replace(tag,''); params=_XMLDoc_getTagNameParams(tag,this); tag=params[0];elm=params[1]; attrName=params[2];attrValue=params[3]; node=(tag=='*')? node.getElements():node.getElements(tag); if (node.length) { if(elm<0){ srcnode=node;var i=0; while(i<srcnode.length){ if(attrName){ if (srcnode[i].getAttribute(attrName)!=attrValue) ok=false; else ok=true;}else ok=true; if(ok){ node=srcnode[i].selectNode(tagpath); if(node) return node;}
i++;}
}else if (elm<node.length){ node=node[elm].selectNode(tagpath); if(node) return node;}
}
}
}
function _XMLDoc_selectNodeText(tagpath){ var node=this.selectNode(tagpath); if (node != null) { return node.getText();}
else { return null;}
}
function XMLNode(nodeType,doc, str) { if (nodeType=='TEXT' || nodeType=='CDATA' || nodeType=='COMMENT' ) { this.content = str;}
else { this.content = null;}
this.attributes = null; this.children = null; this.doc = doc; this.nodeType = nodeType; this.parent = ""; this.tagName = ""; this.addAttribute = _XMLNode_addAttribute; this.addElement = _XMLNode_addElement; this.getAttribute = _XMLNode_getAttribute; this.getAttributeNames = _XMLNode_getAttributeNames; this.getElementById = _XMLNode_getElementById; this.getElements = _XMLNode_getElements; this.getText = _XMLNode_getText; this.getParent = _XMLNode_getParent; this.getUnderlyingXMLText = _XMLNode_getUnderlyingXMLText; this.removeAttribute = _XMLNode_removeAttribute; this.selectNode = _XMLDoc_selectNode; this.selectNodeText = _XMLDoc_selectNodeText; this.toString = _XMLNode_toString;}
function _XMLNode_addAttribute(attributeName,attributeValue) { this.attributes['_' + attributeName] = attributeValue; return true;}
function _XMLNode_addElement(node) { node.parent = this; this.children[this.children.length] = node; return true;}
function _XMLNode_getAttribute(name) { if (this.attributes == null) { return null;} if (typeof(this.attributes['_' + name]) == 'undefined') { return void(0);}
return this.attributes['_' + name];}
function _XMLNode_getAttributeNames() { if (this.attributes == null) { var ret = new Array(); return ret;}
var attlist = new Array(); for (var a in this.attributes) { attlist[attlist.length] = a.substring(1);}
return attlist;}
function _XMLNode_getElementById(id) { var node = this; var ret; if (node.getAttribute("id") == id) { return node;}
else{ var elements = node.getElements(); var intLoop = 0; while (intLoop < elements.length) { var element = elements[intLoop]; ret = element.getElementById(id); if (ret != null) { break;}
intLoop++;}
}
return ret;}
function _XMLNode_getElements(byName) { if (this.children==null) { var ret = new Array(); return ret;}
var elements = new Array(); for (var i=0; i<this.children.length; i++) { if ((this.children[i].nodeType=='ELEMENT') && ((byName==null) || (this.children[i].tagName == byName))) { elements[elements.length] = this.children[i];}
}
return elements;}
function _XMLNode_getText() { if (this.nodeType=='ELEMENT') { if (this.children==null) { return null;}
var str = ""; for (var i=0; i < this.children.length; i++) { var t = this.children[i].getText(); str += (t == null ? "" : t);}
return str;}
else if (this.nodeType=='TEXT') { return decodeURI(this.content);}
else { return this.content;}
}
function _XMLNode_getParent() { return this.parent;}
function _XMLNode_getUnderlyingXMLText() { var strRet = ""; strRet = _displayElement(this, strRet); return strRet;}
function _XMLNode_removeAttribute(attributeName) { if(attributeName == null) { return this.doc.error("You must pass an attribute name into the removeAttribute function");}
var attributes = this.getAttributeNames(); var intCount = attributes.length; var tmpAttributeValues = new Array(); for ( intLoop = 0; intLoop < intCount; intLoop++) { tmpAttributeValues[intLoop] = this.getAttribute(attributes[intLoop]);}
this.attributes = new Array(); for (intLoop = 0; intLoop < intCount; intLoop++) { if ( attributes[intLoop] != attributeName) { this.addAttribute(attributes[intLoop], tmpAttributeValues[intLoop]);}
}
return true;}
function _XMLNode_toString() { return "" + this.nodeType + ":" + (this.nodeType=='TEXT' || this.nodeType=='CDATA' || this.nodeType=='COMMENT' ? this.content : this.tagName);}
