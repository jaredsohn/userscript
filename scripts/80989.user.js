// ==UserScript==
// @name           Slimtimer - JIRA integration
// @namespace      com.spiderlogic
// @description    Log work in JIRA from slimtimer by reading task tags.
// @include        http*://*slimtimer.com/edit*
// @include        http*://*.jira.com/browse/*
// @include        http*://*.jira.com/secure/CreateWorklog!default.jspa*
// @include        http*://*/jira/browse/*
// @include        http*://*/jira/secure/CreateWorklog!default.jspa*
// ==/UserScript==
//Credits http://jacwright.com/projects/javascript/date_format
/*
Use this script to automatically log work in JIRA for tasks tracked in slimtimer.
All you have to do is tag the tasks (and not time entries) in a specific pattern (JIRA@XXXX-NNN by default). With this done and after customizing variables mentioned below, you should be able to view links for each entry that can be logged on "Edit Entries" page of slimtimer website.
First link <b>XXXX-NNN</B> is issue link - just for convinience, opens the work log tab panel by default.
Second link <b>Auto Log</b> is to automatically log work in JIRA and tag the entry as Logged (customizable).
Third link <b>Manual Log</b> is to manually log work in JIRA (will keep the log work window open without logging any work so that you can edit the details if necessary)  and tag the entry as Logged (customizable).

The above links appear on the edit entries page for 'today'. If you navigate to any other date the link dissapear. To enable the links click <b>Enable JIRA</b> added to main menu of slimtimer (besides API menu).

You will have to customize following variables in the script for it to work.

1. jiraWebSiteLink - link to your JIRA website: You can extract it from any of the JIRA issue links.  e.g if your issue link is http://yourprogram.youwebsite.com/browse/XXX-NNNN, then this variabel should point to http://yourprogram.youwebsite.com.
<B font='red'>This must be customized else the JIRA links will be invalid</B>
2. loggedTag - Tag with which the time entry will be updated automatically if Auto Log or Manual Log links are clicked. 
Default - Logged

3. jiraPrefix - Prefix you would like to use in Slimtimer task tags.
Default - JIRA@


Issues:
1. All tags in time entry (not the task tags) are overwritten.
2. Work is logged at 10.00 AM in JIRA

Tested with JIRA Studio 2.2 and JIRA 3.13.3-#344

*/

new function() {

//variables to be customised for each site
var jiraWebSiteLink = "http://yourprogram.yourwebsite.com"
var loggedTag = 'Logged'
var jiraPrefix = 'JIRA@'

//dont change anything below unless you know what you are doing

var slimTimerWebsiteLinkRE = 'http*://*slimtimer.com/edit*'
var jiraIssueLinkRE = ".*/browse/.*"
var jiraWLLinkRE = ".*/secure/CreateWorklog!default.jspa.*"



var windowURL = window.location.href

var reURL = new RegExp(slimTimerWebsiteLinkRE)
var bExists = reURL.exec(windowURL);
if(bExists!=null){
	window.addEventListener("load", initializeST , false);
} else {
	reURL = new RegExp(jiraIssueLinkRE)
	bExists = reURL.exec(windowURL);
	if(bExists!=null){
		window.addEventListener("load", initializeJI , false);
	} else {
		reURL = new RegExp(jiraWLLinkRE)
		bExists = reURL.exec(windowURL);
		if(bExists!=null){
			window.addEventListener("load", initializeWL , false);
		}
	}
}

//slimtimer.com

function initializeST(){
	showMenu();
	addLinks();
}

function showMenu(){

	var menu = document.evaluate( "//*[@id='nav']/ul", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 
	menu=menu.snapshotItem(0);
	var div = document.createElement("li");
	var aLink = document.createElement("a");
	aLink.setAttribute("href","#")
	aLink.addEventListener('click', addLinks, true);
	aLink.innerHTML="Enable JIRA"
	div.appendChild(aLink);
	menu.appendChild(div)
	
	
	var cal = document.evaluate( "//*[@id='edit-entries-header']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 
	cal=cal.snapshotItem(0);
	cal.addEventListener('load', addLinks, true);
}

function addLinks(){

	var dateToLog = document.evaluate( "//a[@id='current-date']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 
	dateToLog = dateToLog.snapshotItem(0).textContent;
	dateToLog = dateToLog.substring(3,dateToLog.length)
	//alert(dateToLog)

	var day = dateToLog.substring(0,dateToLog.indexOf("/"));
	dateToLog= dateToLog.substring(day.length+1, dateToLog.length);
	//alert(dateToLog)

	var month = dateToLog.substring(0 ,dateToLog.indexOf("/"));
	dateToLog= dateToLog.substring(month.length+1, dateToLog.length);
	//alert(dateToLog)

	var year = dateToLog.substring(0 ,dateToLog.length);
	//alert(year)


	dateToLog=new Date(year,month-1,day);
	//alert(dateToLog)

	dateToLog = dateToLog.format('d/M/Y')


	//alert(dateToLog)



	findPattern = "//div[@class='time-entry-content']/table/tbody/tr"
	var entryRow = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 

	for ( var i=0 ; i < entryRow.snapshotLength; i++ )
	{
	  //alert( entryRow.snapshotItem(i).textContent );
	  var row = entryRow.snapshotItem(i)


	  var tags = document.evaluate( "td[@class='column-1']/p[@class='tags']", row, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	  if (tags == null || tags.snapshotLength == 0 ) {
		continue;
	  }
	  tags=tags.snapshotItem(0);
	  //alert(tags.innerHTML)

	  var jiraLinkHref = null;
	  var jiraLinkTarget = null;
	  {
	  var re = new RegExp('\\b'+jiraPrefix+'[a-z,A-Z]*\\-[0-9]*')
	  var m = re.exec(tags.textContent);
	   if (m != null) {
	   //alert(m)
	     var s = "";
	     for (j = 0; j < m.length; j++) {
	       s = s + m[j] + "\n";
	     }
	     jiraLinkHref = s
	     jiraLinkTarget = s
	     jiraLinkHref = jiraLinkHref.replace(jiraPrefix, jiraWebSiteLink+'/browse/')
	     getTagLink(row,tags,jiraLinkHref,s, dateToLog)

	   }

	  }


	  {

	  var re = new RegExp('\\bhttp:.*\\d\\b')
	  var m = re.exec(tags.textContent);
	   if (m != null) {
	     var s = "";
	     for (j = 0; j < m.length; j++) {
	       s = s + m[j] + "\n";
	     }
	     jiraLinkHref = s
	     jiraLinkTarget = s
	     getTagLink(row,tags,jiraLinkHref,s, dateToLog)
	   }
	  }


	}

}


function getTagLink(row, tags, issueLink, issue, dateToLog){

	var hiddenElement = document.evaluate( "*//*[@id='slJIRAInt']", row, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	if(hiddenElement.snapshotLength>0){
		return;
	}
	
	hiddenElement = document.createElement("input");
	hiddenElement.type="hidden"
	hiddenElement.id = 'slJIRAInt'
	hiddenElement.setAttribute('issueLink',issueLink)
	
	tags.appendChild(hiddenElement);
	
	var jiraIssueLink = createLink("#", issue.replace(jiraPrefix,""),"click", onIssueLinkClick )
	tags.appendChild(jiraIssueLink)

	var jiraAutoLogLink = createLink("#", "Auto Log","click", onLogLinkClick )
	tags.appendChild(jiraAutoLogLink)

	var jiraManualLogLink = createLink("#", "Manual Log","click", onLogLinkClick )
	tags.appendChild(jiraManualLogLink)
	
	setCommonParameters(hiddenElement, row, dateToLog)


}


function createLink(href, innerHTML, event, functionReference){
	var aLink = document.createElement("A");
	aLink.href=href	
	aLink.innerHTML = innerHTML
	aLink.addEventListener(event, functionReference, true)
	return aLink;
}

function gethiddenElement(aLink){
	return document.evaluate( "input[@id='slJIRAInt']", aLink.parentNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0); 
}

function onIssueLinkClick(){
	var hiddenElement = gethiddenElement(this)
	var link  = hiddenElement.getAttribute("issueLink")+"?page=com.atlassian.jira.plugin.system.issuetabpanels:worklog-tabpanel#issue-tabs"
	window.target= link
	window.open(link);	
}

function onLogLinkClick(){
	var hiddenElement = gethiddenElement(this)	
	window.open(hiddenElement.getAttribute('saveTagLink'))
	var link  = hiddenElement.getAttribute("link")
	//alert(link+"&logWork="+this.innerHTML.replace(" Log",""));
	window.target= link
	window.open(link+"&logWork="+this.innerHTML.replace(" Log",""));

}


function setCommonParameters(hiddenElement, row, dateToLog){ 
	var duration = document.evaluate( "td[@class='duration']", row,	null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 
	duration=duration.snapshotItem(0).textContent; 
	duration= duration.replace(":","h!").replace(new RegExp("[.].*","g"),"m").trim() 
	
	//alert(duration) 
	if(duration == "0m"){
		hiddenElement.setAttribute('link' , "javascript:alert('Nothing to log (0m cannot be logged)')");
	} else {
		hiddenElement.setAttribute ('link', hiddenElement.getAttribute("issueLink")+"?duration="+duration+"&dateToLog="+dateToLog+"!10:00!AM"); 
	} 
	
	var timeRange = document.evaluate( "td[@class='time-range']", row,	null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 
	timeRange=timeRange.snapshotItem(0).textContent; 
	
	var task = document.evaluate( "*//p[@class='task']", row,	null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 
	task=task.snapshotItem(0).textContent; 
	
	var startTime = timeRange.substring(0,timeRange.indexOf('-'))
	var endTime = timeRange.substring(timeRange.indexOf('-')+1, timeRange.length)
	
	var entryId = row.parentNode.parentNode.parentNode.parentNode.id
	entryId = entryId.substring('time_entry-view-'.length, entryId.length-'-row'.length)
	
	
	var saveTagLink = '/edit/update/'+entryId +'?scaffold_id=time_entry'
	saveTagLink+='&duration-field-'+entryId +'='+duration
	saveTagLink+='&tag_input_'+entryId +'='+loggedTag
	saveTagLink+='&time_entry[tags]='+loggedTag
	saveTagLink+='&task_field_'+entryId +'='+task
	saveTagLink+='&time_entry_comments=""'
	saveTagLink+='&start-time-field-'+entryId +'='+startTime
	saveTagLink+='&end-time-field-'+entryId +'='+endTime
	
	hiddenElement.setAttribute('saveTagLink',saveTagLink);

}

//Jira Issue


function initializeJI(){
	var logWork = gup('logWork')
	if(logWork == "Auto" || logWork == "Manual"){
		//alert(1)
		//try JIRa studio 2.2
		var logWorkLink = document.evaluate( "//a[@id='log-work'] | //a[@id='log_work']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		logWorkLink=logWorkLink.snapshotItem(0);
		//alert(logWorkLink)
		logWorkLink = logWorkLink + (new RegExp("[?].*").exec(window.location.href)+"").replace("?","&");
		//alert(logWorkLink)
		window.location.href=logWorkLink
	}
	

}



//JIra work log

function initializeWL(){
	var logWork = gup('logWork')
	if(logWork == "Auto" || logWork == "Manual"){
		var forSpaces = new RegExp("!","g");
		var duration = gup('duration').replace(forSpaces," ");
		
		var timeLogged = document.evaluate( "//input[@name='timeLogged']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		var timeLogged = timeLogged.snapshotItem(0);
		timeLogged.value=duration;
		
		var dateToLog = gup('dateToLog').replace(forSpaces," ");;
		var startDate = document.evaluate( "//input[@name='startDate']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		var startDate = startDate.snapshotItem(0);
		startDate.value=dateToLog;
		
		if(logWork == "Auto"){
			
			var logButton = document.evaluate( "//input[@name='Log']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			var logButton = logButton.snapshotItem(0);
			//alert(logButton)
			logButton.click();
			//window.close();
			
		}
		
	}
	

}


//common***************************************************

function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null ){
    return "";
  }
  else{
    return unescape(results[1]);
  }
}


String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}


Date.prototype.format = function(format) {
	var returnStr = '';
	var replace = Date.replaceChars;
	for (var i = 0; i < format.length; i++) {
		var curChar = format.charAt(i);
		if (replace[curChar]) {
			returnStr += replace[curChar].call(this);
		} else {
			returnStr += curChar;
		}
	}
	return returnStr;
};
Date.replaceChars = {
	shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	
	// Day
	d: function() { return (this.getDate() < 10 ? '0' : '') + this.getDate(); },
	D: function() { return Date.replaceChars.shortDays[this.getDay()]; },
	j: function() { return this.getDate(); },
	l: function() { return Date.replaceChars.longDays[this.getDay()]; },
	N: function() { return this.getDay() + 1; },
	S: function() { return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th'))); },
	w: function() { return this.getDay(); },
	z: function() { return "Not Yet Supported"; },
	// Week
	W: function() { return "Not Yet Supported"; },
	// Month
	F: function() { return Date.replaceChars.longMonths[this.getMonth()]; },
	m: function() { return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1); },
	M: function() { return Date.replaceChars.shortMonths[this.getMonth()]; },
	n: function() { return this.getMonth() + 1; },
	t: function() { return "Not Yet Supported"; },
	// Year
	L: function() { return (((this.getFullYear()%4==0)&&(this.getFullYear()%100 != 0)) || (this.getFullYear()%400==0)) ? '1' : '0'; },
	o: function() { return "Not Supported"; },
	Y: function() { return this.getFullYear(); },
	y: function() { return ('' + this.getFullYear()).substr(2); },
	// Time
	a: function() { return this.getHours() < 12 ? 'am' : 'pm'; },
	A: function() { return this.getHours() < 12 ? 'AM' : 'PM'; },
	B: function() { return "Not Yet Supported"; },
	g: function() { return this.getHours() % 12 || 12; },
	G: function() { return this.getHours(); },
	h: function() { return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12); },
	H: function() { return (this.getHours() < 10 ? '0' : '') + this.getHours(); },
	i: function() { return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes(); },
	s: function() { return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds(); },
	// Timezone
	e: function() { return "Not Yet Supported"; },
	I: function() { return "Not Supported"; },
	O: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00'; },
	P: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':' + (Math.abs(this.getTimezoneOffset() % 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() % 60)); },
	T: function() { var m = this.getMonth(); this.setMonth(0); var result = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1'); this.setMonth(m); return result;},
	Z: function() { return -this.getTimezoneOffset() * 60; },
	// Full Date/Time
	c: function() { return this.format("Y-m-d") + "T" + this.format("H:i:sP"); },
	r: function() { return this.toString(); },
	U: function() { return this.getTime() / 1000; }
};

}