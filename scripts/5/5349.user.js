// ==UserScript==
// @name           LJ Message Center: Tracking Subscriptions and Notifications Metadata
// @namespace      afuna.livejournal.com
// @description    Keep track of additional information for notifications in LJ's tracking system. You can display the entry subject for comment notifications in your inbox and keep track of most recent subcription activity
// @include        http://www.livejournal.com/manage/subscriptions/*
// @include        http://www.livejournal.com/inbox*
// ==/UserScript==

/***********************************
 ** Known issues with displaying the entry subject:
 **	 entries with no titles all use "an entry"
 **  does not work when tracking comment threads and nonspecific entry subscriptions
 **  not very accurate unless you regularly check your inbox (http://www.livejournal.com/inbox/)

 ** Known issues for recent subscription activity: 
 **  does not work when tracking comment threads and nonspecific entry subscriptions
 **  must run before any scripts that change the text of the "an entry" link (example: may conflict with the original version of this script, which was why I decided to merge the two)
 **  does not work with all languages
 ***********************************/

/***********************************
 ** Things to work on:
 ** 	- customize the time increments for languages with more than one plural
 ** 	- button to check notifications in the inbox so you don't have to visit the inbox to see which subscriptions have had recent activity (probably keep track of latest notification OR set number of weeks or something)
 **		- prettify, prettify, prettify
 ***********************************/
 
 /***********************************
 ** Changelog:
 * 2006.10.06 - fixed so that it will work with new message center URL
 * 2006.10.28 - expanded functionality. Added the time a subscription was last updated in order to track active subscriptions. Renamed the script to reflect the changes
 		- added preference panel to customize text and colors and to let you enable/disable entry subjects and recent subscriptions data
 * 2006.10.31 - added preference so users can translate the time units into their own language -- does not work for languages with more than one plural form; default to both functions on instead of off
 * 2006.11.24 - added link to refresh the list of entry subjects from the message center
 ***********************************/

curDate = Date.now();
defaultPref = eval(({
				// Unit: [output_singular, output_plural, output_color, inbox_singular, inbox_plural]
				Second:["second", "seconds", "#000000", "second", "seconds"], 
				Minute:["minute", "minutes", "#000000", "minute", "minutes"], 
				Hour:["hour", "hours", "#000000", "hour", "hours"],
				Day:["day", "days", "#000000", "day", "days"], 
				Week:["week", "weeks", "#000000", "week", "weeks"]
			}));
preferences = eval(GM_getValue("preferences",null));
if(preferences == null) 
	preferences = defaultPref;

// time unit constructors
function TimeUnit(u, x) {
	if(typeof(x) == "undefined")
		this.time = 999999; // arbitrarily large number
	else
		this.time = x;
	if(typeof(u) == "undefined")
		this.unit = "Week";
	else
		this.unit = u;
	this.color = "#000000";
}

TimeUnit.prototype.toString = function() {
	var temptime = Math.floor(this.time);
	if( temptime == 1)
		return "<span class='"+this.unit+"'>"+temptime+" "+preferences[this.unit][0]+"</span>";
	else // if(temptime > 1)
		return "<span class='"+this.unit+"'>"+temptime+" "+preferences[this.unit][1]+"</span>";
}

function Week(temp) {
	TimeUnit.call(this, "Week", temp);
}
Week.prototype = new TimeUnit();
Week.convert = function(x) {return x * 7;}
Week.isUnit = function(u) { return u == preferences["Week"][3] || u == preferences["Week"][4]; }
// Week.prototype.constructor = Week;

function Day(x) {
	TimeUnit.call(this, "Day", x);
}
Day.prototype = new TimeUnit;
Day.convert = function(x) {return x * 24; }
Day.isUnit = function(u) { return u == preferences["Day"][3] || u == preferences["Day"][4]; }

function Hour(x) {
	TimeUnit.call(this, "Hour", x);	
}
Hour.prototype = new TimeUnit;
Hour.convert = function(x) {return x * 60; }
Hour.isUnit = function(u) { return u == preferences["Hour"][3] || u == preferences["Hour"][4]; }

function Minute(x) {
	TimeUnit.call(this, "Minute", x);	
}
Minute.prototype = new TimeUnit;
Minute.convert = function(x) {return x * 60; }
Minute.isUnit = function(u) { return u == preferences["Minute"][3] || u == preferences["Minute"][4]; }

function Second(x) {
	TimeUnit.call(this, "Second", x);
}
Second.prototype = new TimeUnit;
Second.convert = function(x) {return x * 1000; }
Second.isUnit = function(u) { return u == preferences["Second"][3] || u == preferences["Second"][4]; }

function convertToUnixTime(timestring)
{
	// time[0] = length 
	// time[1] = unit
	// time[2] = "ago" (ignore)
	var time = timestring.split(" ");
	if(Second.isUnit(time[1]))
	{
		var tempdate = curDate - Second.convert(time[0]);
	}
	else if(Minute.isUnit(time[1]))
	{
		var tempdate = curDate - Minute.convert(Second.convert(time[0]));
	}	
	else if(Hour.isUnit(time[1]))
	{
		var tempdate = curDate - Hour.convert(Minute.convert(Second.convert(time[0])));
	}
	else if(Day.isUnit(time[1]))
	{
		var tempdate = curDate - Day.convert(Hour.convert(Minute.convert(Second.convert(time[0]))));
	}
	else if(Week.isUnit(time[1]))
	{
		var tempdate = curDate - Week.convert(Day.convert(Hour.convert(Minute.convert(Second.convert(time[0])))));
	}
	// no months and years I think?	
	return tempdate;
}

function convertToReadable(utctime)
{
	 var time = utctime / Week.convert(Day.convert(Hour.convert(Minute.convert(Second.convert(1)))));
	 if( time < 1)	// less than a week
	 {
	 	time = Week.convert(time);
		if( time < 1) // less than a day
		{
			time = Day.convert(time);
			if(time < 1) // less than an hour
			{
				time = Hour.convert(time);
				if( time < 1) // less than a minute
					return new Second(Minute.convert(time));
				else return new Minute(time);							
			}
			else return new Hour(time);
		}
		else return new Day(time);
	 }
	 else return new Week(time);
}

function createRow(timetable, str)
{
	var array = new Array(document.createTextNode(str), 
		// output (singular, plural, color)
		document.createElement("input"),
		document.createElement("input"),
		document.createElement("input"), 
		// input (singular, plural)
		document.createElement("input"), 		
		document.createElement("input"));
	var row = document.createElement("tr");
	row.setAttribute("class", "timetable"+str);

	timetable.appendChild(row);

	// label
	var cell = document.createElement("td");
	row.appendChild(cell);
	cell.appendChild(array[0]);
	// inputs
	for(i = 1; i < array.length; ++i)
	{
		cell = document.createElement("td");
		row.appendChild(cell);
		array[i].setAttribute("size", 10);
		cell.appendChild(array[i]);
		if(preferences[str] != null)
			array[i].value = preferences[str][i-1];		
		else
			array[i].value = defaultPref[str][i-1];
	}
	return array;
}

function createPrefPane()
{	
	var prefPaneOuter = document.createElement("div");	
	var prefPane = document.createElement("div");
	prefPane.style.display = "none";

	prefPaneOuter.setAttribute("id", "manageScriptPref");	
	
	var manage = document.getElementById("manageSettings");
	manage.insertBefore(prefPaneOuter,manage.firstChild);


	var show = document.createElement('a');
	var isShown = false;
	show.setAttribute("class", "show");
	show.setAttribute("href", "javascript:void(0)");
	show.appendChild(document.createTextNode("Show preferences"));	
	show.addEventListener('click', function() { 
		if(!isShown)
		{
			prefPane.style.display = "inline";
			//scriptoptions.style.display = "block";
			//submit.style.display = "block";					
			show.textContent = "Hide preferences";
			isShown = true;
		}
		else
		{
			prefPane.style.display = "none";
			//scriptoptions.style.display = "none";			
			//submit.style.display = "none";			
			show.textContent = "Show preferences";
			isShown = false;			
		}
		return false;
	}, true);


	prefPaneOuter.appendChild(show);
	prefPaneOuter.appendChild(prefPane);
	
	// text when single, text when plural, color
	var timetable = document.createElement("table");	
	// timetable.style.display = "none";

	var row = document.createElement("tr");
	timetable.appendChild(row);
	
	// blank element
	var cell = document.createElement("td");
	row.appendChild(cell);
	row.setAttribute("class","label");

	// output label
	cell = document.createElement("td");	
	row.appendChild(cell);		
	cell.appendChild(document.createTextNode("Displayed text formatting"));
	cell.setAttribute("colspan", 3);
	
	// input label
	cell = document.createElement("td");
	row.appendChild(cell);		
	cell.appendChild(document.createTextNode("Time units in message center"));
	cell.setAttribute("colspan", 2);
	
		
	var units = new Array(
			createRow(timetable, "Second"), 
			createRow(timetable, "Minute"),
			createRow(timetable, "Hour"),
			createRow(timetable, "Day"),
			createRow(timetable, "Week"));
	
	// check what happens when you localize
	// text for time units, color according to time increments and time increments for display	
	// text that appears in the message center (inbox)
	prefPane.appendChild(timetable);	

	var scriptoptions = document.createElement("div");
	//	scriptoptions.style.display = "none";	

	var subject = document.createElement("input");
	subject.setAttribute("type", "checkbox");
	subject.setAttribute("id", "showsubjects");
	if(show_subjects) subject.setAttribute("checked", true);
	scriptoptions.appendChild(subject);
	var label = document.createElement("label");
	label.textContent = "Show entry subject in inbox";
	label.setAttribute("for", "showsubjects");
	scriptoptions.appendChild(label);
	scriptoptions.appendChild(document.createElement("br"));

	var activity = document.createElement("input");
	activity.setAttribute("type", "checkbox");
	activity.setAttribute("id", "showactivity");	

	if(show_activity) activity.setAttribute("checked", true);
	scriptoptions.appendChild(activity);
	label = document.createElement("label");
	label.textContent = "Show latest activity";
	label.setAttribute("for", "showactivity");
	scriptoptions.appendChild(label);
	prefPane.appendChild(scriptoptions);
	
	var submit = document.createElement('a');
//	submit.style.display = "none";				
	submit.setAttribute("class", "submit");
	submit.setAttribute("href", "");
	submit.appendChild(document.createTextNode("Save preferences"));
	prefPane.appendChild(submit);
	submit.addEventListener('click', function() { 
		for(i = 0; i < units.length; ++i)
		{	
			var arr = new Array();
			for(j = 1; j < units[i].length; ++j)
			{				
				arr[j-1] = units[i][j].value;	
			}
			preferences[(units[i][0]).textContent] = arr;
		}

		// 00 = 0 = none selected
		// 01 = 1 = show entry subjects only
		// 10 = 2 = show latest activity only
		// 11 = 3 = both
		var option = 0;
		if(subject.checked) option += 1;
		if(activity.checked) option += 2;
		GM_setValue("preferences", uneval(preferences));
		GM_setValue("scriptoptions", option);
		submit.innerHTML = "Saving preferences...";
		return false;
	}, true);
	
	GM_addStyle(".timetableSecond input, .Second{color:"+preferences["Second"][2]+";}");
	GM_addStyle(".timetableMinute input, .Minute{color:"+preferences["Minute"][2]+";}");
	GM_addStyle(".timetableHour input, .Hour{color:"+preferences["Hour"][2]+";}");
	GM_addStyle(".timetableDay input, .Day{color:"+preferences["Day"][2]+";}");
	GM_addStyle(".timetableWeek input, .Week{color:"+preferences["Week"][2]+";}");
	
	GM_addStyle("\
#manageScriptPref {\
	border: 1px #ddd solid;\
	margin: 10px 0px;\
}\
#manageScriptPref div {\
	padding: 10px;\
}\
#manageScriptPref table{\
	margin-left:auto; margin-right: auto;\
}\
#manageScriptPref .submit, #manageScriptPref .show {\
	background-color: #eee;\
	text-align: center;\
	display: block;\
	color: #777;\
	text-decoration: none;\
}\
#manageScriptPref .submit:hover, #manageScriptPref .show:hover {\
	color: #222;\
}\
#manageScriptPref .label td {\
	background-color: #eee;\
	color: #777\
}\
");

}

function saveEntrySubjects()
{
	if(myDoc.location.href.indexOf("entry.bml") > -1 		// track entry
		|| myDoc.location.href.indexOf("comments.bml") > -1)	// track comment
	{
		subjects = eval(GM_getValue("subjects", new Object()));
	}	
	else 														// manage settings
	{	
		subjects = new Object();		
	}
	var entries = myDoc.evaluate("//label[contains(text(), 'Someone comments on')]/following-sibling::a", myDoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < entries.snapshotLength; i++)
	{
		var temp = entries.snapshotItem(i);
		subjects[temp.href] = temp.textContent;
		//GM_log("logging title for " + temp.href + ": "+temp.textContent);
	}
	GM_setValue("subjects", uneval(subjects));
}

function fetchEntrySubjects()
{
	saveEntrySubjects();
	loadEntrySubjects();
	//window.location.href = window.location.href;
}

function loadEntrySubjects()
{
	var titles = eval(GM_getValue("subjects", new Object()));
	var entries = document.evaluate("//a[text() = 'an entry']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for(i = 0; i < entries.snapshotLength; i++)
	{
		var link = entries.snapshotItem(i);	
		
		if(titles[link.href])
			link.innerHTML = titles[link.href];
	}
}

function repopulateEntrySubjects() {
	if (window == top) {
	  GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.livejournal.com/manage/subscriptions/",
		onload: function(details) {
		  // create an IFRAME to write the document into. the iframe must be added
		  // to the document and rendered (eg display != none) to be properly 
		  // initialized.
		  var iframe = document.createElement("IFRAME");
		  iframe.style.visibility = "hidden";
		  iframe.style.position = "absolute";
		  document.body.appendChild(iframe);
	
		  // give it a URL so that it will create a .contentDocument property. Make
		  // the URL be the current page's URL so that we can communicate with it.
		  // Otherwise, same-origin policy would prevent us.
		  if(iframe)
		  {
			  iframe.contentWindow.location.href = location.href;
		
			  // write the received content into the document
			  iframe.contentDocument.open("text/html");
			  iframe.contentDocument.write(details.responseText);
			  iframe.contentDocument.close();
		
			  // wait for the DOM to be available, then do something with the document
			  myDoc = iframe.contentDocument;
			  iframe.contentDocument.addEventListener("DOMContentLoaded", fetchEntrySubjects, false);
		  }
		}
	  });
	}
}
var savedoption = GM_getValue("scriptoptions",3);
var show_subjects = ((savedoption == 1) || (savedoption == 3));
var show_activity = ((savedoption == 2) || (savedoption == 3));

if(window == top && document.location.href.indexOf("http://www.livejournal.com/manage/subscriptions/")>-1)
{
	// save even if showing subjects is disabled?
	myDoc = document;
	saveEntrySubjects();
	
	if(document.location.href.indexOf("comments.bml") == -1 
		&& document.location.href.indexOf("entry.bml") == -1 
		&& document.location.href.indexOf("user.bml") == -1)
	{
		createPrefPane();
	}

	if(show_activity)
	{
		// create a new object only if there's nothing currently being stored
		subscriptions = eval(GM_getValue("subscriptions", new Object())); 
		
		var entries = document.evaluate("//label[contains(text(), 'Someone comments on')]/following-sibling::a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var readable;
		for(var i = 0; i < entries.snapshotLength; i++)
		{
			var temp = entries.snapshotItem(i);
			
			if(subscriptions[temp.href] != null)
			{
				lapse = Date.now() - subscriptions[temp.href];
				readable = document.createElement("span");
				readable.innerHTML = " (updated "+ convertToReadable(lapse) +" ago)";
				temp.parentNode.appendChild(readable);
			}
		}
		// huh, is this line necessary?
		GM_setValue("subscriptions", uneval(subscriptions));
	}
}
else if( window == top && document.location.href.indexOf("http://www.livejournal.com/inbox")>-1)
{
	refreshLink = document.getElementById("RefreshLink");

	var repopulateLink = document.createElement("a");	
	repopulateLink.innerHTML = "Get Subjects";
	repopulateLink.setAttribute("href", "");
	repopulateLink.setAttribute("onclick", "return false");	
	repopulateLink.addEventListener("click", repopulateEntrySubjects,false);
	refreshLink.parentNode.appendChild(document.createTextNode(" | "));
	refreshLink.parentNode.appendChild(repopulateLink);

	
	// save even if tracking active subscriptions is disabled?
	var subscriptions = eval(GM_getValue("subscriptions", new Object()));
	var notifications = document.evaluate("//tr[contains(@class,'InboxItem_Row')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for(i = 0; i < notifications.snapshotLength; i++)
	{
		item = notifications.snapshotItem(i);
		result = document.evaluate(".//td[@class='time']", item, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		entry = document.evaluate(".//td/span/a[text()= 'an entry']",item, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if(entry != null )
		{
			notificationtime = convertToUnixTime(result.innerHTML);		
			if(notificationtime > subscriptions[entry.href] || subscriptions[entry.href] == null)
			{
				subscriptions[entry.href] = notificationtime;
			}
		}
	}
	GM_setValue("subscriptions", uneval(subscriptions));

	if(show_subjects)	
		loadEntrySubjects();
}

