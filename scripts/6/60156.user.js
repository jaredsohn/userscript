// ==UserScript==
// @name           TODOIST Calendar
// @namespace      http://www.tuwe.se/todoistcalendar
// @description    Adds Google calendar to TODOIST
// @include        http://todoist.com/*
// @include        http://www.todoist.com/*
// @exclude	   http://todoist.com/Static/*
// @exclude	   http://todoist.com/Help/*
// @exclude	   http://todoist.com/Users/*
// @exclude	   http://todoist.com/Projects/*
// @exclude	   http://todoist.com/Items/*
// @exclude	   http://todoist.com/static*
// ==/UserScript==

//****SETTINGS - START*****
//User 
var email = '';
var calUserHash = ''; //Get it from your google calendar-settings
var calTimezone = 'Europe/Stockholm';

//Calendar toolbar
var calShowTitle = '0';
var calShowDate = '0';
var calShowPrint = '0';
var calShowCalendars = '0';
var calShowTimezone = '0';

//Calendar start mode
var calMode = 'AGENDA'; //AGENDA, WEEK, MONTH

//Calendar size and position
var calendarWidth = '300';
var calendarHeight = '600';
var calendarPositionRight = '10';

//Todoist position
var todoistPositionLeft = '15';
var todoistZIndex = '1000';

//****SETTINGS - END******

if(email == ''){
	alert('No Google email adress found. Edit the userscript and set your Google email.');
}
if(calUserHash == ''){
	alert('No Google Calendar user hash fond. Edit the userscript and set calUserHash');
}

var newFrame = document.createElement('iframe');
var calendarSrc = 'http://www.google.com/calendar/embed?src='+ email +'&ctz='+ calTimezone +'&pvttk='+ calUserHash +'&showTitle='+ calShowTitle +'&showDate='+ calShowDate +'&showPrint='+ calShowPrint +'&showCalendars='+ calShowCalendars +'&showTz='+ calShowTimezone+'&mode='+ calMode +'';

newFrame.setAttribute('src', calendarSrc);
newFrame.setAttribute('width', calendarWidth + 'px');
newFrame.setAttribute('height', calendarHeight + 'px');
newFrame.setAttribute('style', 'border:0;position:absolute;top:35px;right:' + calendarPositionRight  + 'px;');

insertAfter(newFrame, document.body);
document.body.setAttribute('style', 'position:absolute;top:0px;left:' + todoistPositionLeft + 'px;z-index:' + todoistZIndex);

//Add calendar event
var addEvent = document.createElement('iframe');
var addEventSrc = 'http://www.google.com/calendar/event?action=TEMPLATE';
addEvent.setAttribute('src', addEventSrc);
addEvent.setAttribute('width', '900px');
addEvent.setAttribute('height', '600px');
addEvent.setAttribute('style', 'background-color: white;border:9px solid #c3d9ff;position:absolute;top:65px;right:' + (parseInt(calendarWidth) + parseInt(calendarPositionRight) - 8)  + 'px;z-index:2300;display:none');

insertAfter(addEvent, document.body);

var calendarAddLink = document.createElement('button');
calendarAddLink.addEventListener("click",showAddEvent, true);
var calendarEventOpenText = 'Add calendar event';
var calendarEventCloseText = 'Close calendar event';

calendarAddLink.innerHTML = calendarEventOpenText;

calendarAddLink.setAttribute('style', 'position:absolute;top:5px;right:' + (parseInt(calendarWidth) + parseInt(calendarPositionRight) - 200) + 'px;cursor:pointer;width:200px');
insertAfter(calendarAddLink, document.body);

function showAddEvent(){
	var texarea = document.getElementsByTagName('textarea');
	for(var key in texarea){
		addEvent.setAttribute('src', addEventSrc + '&text=' +  texarea[key].value);
	}
	if(addEvent.style.display == 'none'){//Open iframe
		addEvent.style.display = 'block';
		calendarAddLink.innerHTML = calendarEventCloseText;
	}else{//Close iframe
		addEvent.style.display = 'none';
		calendarAddLink.innerHTML = calendarEventOpenText;
		addEvent.setAttribute('src', addEventSrc);
		
		newFrame.setAttribute('src', calendarSrc);
		
	}
}

function insertAfter(new_node, existing_node) {
	if (existing_node.nextSibling) {
		existing_node.parentNode.insertBefore(new_node, existing_node.nextSibling);
	} else {
		existing_node.parentNode.appendChild(new_node);
	}
}
