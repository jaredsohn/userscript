// ==UserScript==
// @name          Gmail - Google Calendar Seamless Integration
//@author	      Michael A. Balazs
// @include        http://mail.google.com/* 
// @include        https://mail.google.com/*
// ==/UserScript==


//OBSOLETE: Please use <a href="http://userscripts.org/scripts/show/36028">Gmail - Seamless Integration (Google Calendar, Reader, Notebook, etc...) with Collapsible Inbox for Standard GMail and GMail Apps</a> instead.

var calendar_frame_height = "600px"; 
var allow_starting_collapsed = true; //May cause unviewable text in 2+ week and month views. 
var place_before = "notebook"; //Choice are (depending on what scripts you have): ATTOP, calendar, reader, notebook, ATBOTTOM;

function loadCalendar(gmail_calendar,gmail_calendarBox) 
{
	gmail_calendar.getFooterElement().insertBefore(gmail_calendarBox.getElement(), gmail_calendar.getFooterElement().childNodes[0]);

	var calendarBox = parent.document.getElementById("canvas_frame").contentDocument.getElementById("calendarBox");
	calendarBox.id = "calendarBoxLoaded";

	calendarBox = calendarBox.parentNode.parentNode;
	calendarBox.style.textAlign = "left";

	for(var i = 0; i < 11; i++) calendarBox = calendarBox.parentNode;
	calendarBox.style.width = "100%";
	
	var calendarBoxIFrame = parent.document.getElementById("canvas_frame").contentDocument.getElementById("calendar_iframe");
	calendarBoxIFrame.src = 'null';	
	calendarBoxIFrame.src = calendarURLDetector();
	calendarBoxIFrame.style.height = calendar_frame_height;
	
	setTimeout(function(){moveCurrentBox(gmail_calendar,gmail_calendarBox);},500);
	
	gmail_inbox.registerViewChangeCallback(function(){moveCurrentBox(gmail_calendar,gmail_calendarBox);});	
};

function moveCurrentBox(gmail,currentBox) 
{
	var place_before_id = "ATTOP";
	
	switch (place_before)
	{
		case 'calendar': place_before_id = "calendarBoxLoaded"; break;
		case 'reader': place_before_id = "readerBoxLoaded"; break;
		case 'notebook': place_before_id = "notebookBoxLoaded"; break;
		case 'ATBOTTOM': place_before_id = "ATBOTTOM"; break;
	}

	if(place_before_id.search("AT") == -1)
	{
		var placeBeforeBox = parent.document.getElementById("canvas_frame").contentDocument.getElementById(place_before_id); 
		if(placeBeforeBox  == null) {setTimeout(function(){moveReader(gmail,currentBox);},200); return;}
		
		for(var i = 0; i < 13; i++) placeBeforeBox = placeBeforeBox.parentNode;
		gmail.getFooterElement().insertBefore(currentBox.getElement(),placeBeforeBox);
	}
	else if(place_before_id == "ATTOP") gmail.getFooterElement().insertBefore(currentBox.getElement(),gmail.getFooterElement().childNodes[0]);		
	else if(place_before_id == "ATBOTTOM") gmail.getFooterElement().insertBefore(currentBox.getElement(),gmail.getFooterElement().childNodes[gmail.getFooterElement().childNodes.length-1]);				
}

function calendarURLDetector()
{
	if(document.URL.search("mail.google.com/a") != -1) 
	{
		var domain = document.URL.substring(document.URL.search("mail.google.com/a/")+18);
		domain = domain.substring(0,domain.search("/"));
		return 'http://www.google.com/calendar/hosted/'+domain;
	}
	else return 'https://www.google.com/calendar';
}

function checkCalendarElementsLoaded(gmail_calendar,calendarBox) { 
	var checkCalendarLoaded = parent.document.getElementById("canvas_frame").contentDocument.getElementById("calendarBoxLoaded"); 
	try {if(typeof gmail_calendar.getFooterElement() != 'undefined' && typeof calendarBox.getElement() != 'undefined' && checkCalendarLoaded == null) loadCalendar(gmail_calendar,calendarBox);}
	catch(err) {setTimeout(function(){checkCalendarElementsLoaded(gmail_calendar,calendarBox);},200);}
}

function checkGMailAPILoaded(gmail_calendar)
{
	try 
	{
		if(allow_starting_collapsed) var calendarBox = gmail_calendar.addNavModule('<span id="calendarBox">Calendar </span>');
		else var calendarBox = gmail_calendar.addNavModule('<span id="calendarBox">Calendar<span style="display:none;">'+(new Date()).getTime()+'</span> </span>'); 
		
		calendarBox.setContent("<iframe id='calendar_iframe' style='border: medium none ; padding: 2px; display:block; width:100%;'></iframe>");
		
		checkCalendarElementsLoaded(gmail_calendar,calendarBox);	
	}
	catch(err) {setTimeout(function(){checkGMailAPILoaded(gmail_calendar);},200);}
}

function onCalendarPageLoaded()
{
	if(unsafeWindow.gmonkey) unsafeWindow.gmonkey.load('1.0', function(gmail_calendar) {checkGMailAPILoaded(gmail_calendar)});
}

window.addEventListener('load', onCalendarPageLoaded, true);