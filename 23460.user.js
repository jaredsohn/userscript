// LiveWire Enhanced Points
// www.golivewire.com
// Author: Ethryx (http://ethryx.showmember.com)
// Version 2.5
//
// ==UserScript==
// @name          LiveWire Enhanced Points
// @namespace     http://www.golivewire.com
// @description   Enhances how points are shown on golivewire.com in your account and after posting/replying.
// @include       http://*.golivewire.*/forums/myaccount.cgi*
// @include       http://golivewire.*/forums/myaccount.cgi*
// @include       http://*.golivewire.*/forums/post.cgi
// @include       http://golivewire.*/forums/post.cgi
// @include       http://*.golivewire.*/forums/topic.cgi
// @include       http://golivewire.*/forums/topic.cgi
// @include       http://golivewire.*/forums/*
// @include       http://*.golivewire.*/forums/*
// ==/UserScript==
var POINTS, THERANK, SECONDSONLW, TIME2RANK, POINTSPERSEC, MYACCOUNT_OPTIONS;
var POINTSONLW = 0;
var MYACCOUNT_TITLE = "<br><br><font face='Verdana, Geneva, sans-serif' color='#333333' size='2'><b>Points Progress</b></font> <img src='http://img.golivewire.com/qmark.gif' width='14' height='14' onMouseOver=\"tooltip('A progress bar and point statistics will be generated here which will show you how soon you will be ranking up. The color of the bar will change depending on how close you are to your promotion.<br><b>SP</b> = Session Points<br><b>PPS</b> = Points Per Second<br><b>ETA: </b>Estimated Time Until Promotion');\" onMouseOut=\"hidetooltip();\"><br><img src='http://img.golivewire.com/ibdots.gif'><br>";
//document.body.innerHTML = document.body.innerHTML.replace('You need', 'You have attained');

// IMPORTANT FUNCTIONS { left, right, createcookie, readcookie, erasecookie, roundnumber, englishrank, pointstogo, realrank, showfriendlyoption }
	function Left(str, n){
		if (n <= 0)
		    return "";
		else if (n > String(str).length)
		    return str;
		else
		    return String(str).substring(0,n);
	}
	function Right(str, n){
	    if (n <= 0)
	       return "";
	    else if (n > String(str).length)
	       return str;
	    else {
	       var iLen = String(str).length;
	       return String(str).substring(iLen, iLen - n);
	    }
	}
	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	function eraseCookie(name) {
		createCookie(name,"",-1);
	}
	function roundNumber(num, dec) {
		var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
		return result;
	}
	function EnglishRank(eta) {
		if (eta == null) return 'Get Points First!';
		var eta = Math.round(eta);
		var returnString = '';
		if (eta >= 604800) { // >= 1 week
			returnString = Math.floor(eta / 604800) + 'w ';
			eta = eta - (Math.floor(eta / 604800) * 604800);
		}
		if (eta >= 86400) { // >= 1 day
			returnString = returnString + Math.floor(eta / 86400) + 'd ';
			eta = eta - (Math.floor(eta / 86400) * 86400);
		}
		if (eta >= 3600) { // >= 1 hour
			returnString = returnString + Math.floor(eta / 3600) + 'h ';
			eta = eta - (Math.floor(eta / 3600) * 3600);
		}
		if (eta >= 60) { // >= 1 minute
			returnString = returnString + Math.floor(eta / 60) + 'm ';
			eta = eta - (Math.floor(eta / 60) * 60);
		}
		if (eta > 0) { // whatever is left is in seconds
			returnString = returnString + eta  + 's';
		}
		return returnString;
	}
	function PointsToGo()
	{
		if (THERANK == 'Grasshopper') return 25;
		if (THERANK == 'Lawn Care Specialist') return 50;
		if (THERANK == 'Personal Assistant') return 50;
		if (THERANK == 'Technician') return 125;
		if (THERANK == 'Advisor') return 150;
		if (THERANK == 'Quality Control Engineer') return 300;
		if (THERANK == 'Dairy Product Addict') return 300;
		if (THERANK == 'Professional') return 1000;
		if (THERANK == 'Executive') return 1000;
		if (THERANK == 'Wealthy Hobo') return 1000;
		if (THERANK == 'Connoisseur') return 2000;
		if (THERANK == 'Visionary') return 2000;
		if (THERANK == 'Soothsayer') return 2000;
		if (THERANK == 'Enlightened One') return 4000;
		if (THERANK == 'Omnipotent One') return 3000;
		if (THERANK == 'Guru') return 3000;
		if (THERANK == 'Customizable') return 4000;
	}
	function RealRank(currentrank)
	{
		if (currentrank == 'Lawn Care Specialist') return 'Grasshopper';
		if (currentrank == 'Personal Assistant') return 'Lawn Care Specialist';
		if (currentrank == 'Technician') return 'Personal Assistant';
		if (currentrank == 'Advisor') return 'Technician';
		if (currentrank == 'Quality Control Engineer') return 'Advisor';
		if (currentrank == 'Dairy Product Addict') return 'Quality Control Engineer';
		if (currentrank == 'Professional') return 'Dairy Product Addict';
		if (currentrank == 'Executive') return 'Professional';
		if (currentrank == 'Wealthy Hobo') return 'Executive';
		if (currentrank == 'Connoisseur') return 'Wealthy Hobo';
		if (currentrank == 'Visionary') return 'Connoisseur';
		if (currentrank == 'Soothsayer') return 'Visionary';
		if (currentrank == 'Enlightened One') return 'Soothsayer';
		if (currentrank == 'Omnipotent One') return 'Enlightened One';
		if (currentrank == 'Guru') return 'Omnipotent One';
		if (currentrank == 'Customizable') return 'Guru';
	}
	function showFriendlyOption(optionascookie, defaulted)
	{
		var cookieSetAs; //  1=on   0=off
		if (readCookie(optionascookie) == null) {
			cookieSetAs = defaulted;
		}
		else {
			cookieSetAs = readCookie(optionascookie);
		}
		if(cookieSetAs==1){
			return "[ <b>On</b> / <a href='myaccount.cgi?save="+optionascookie+"/0@'>Off</a> ]";
		}
		else if(cookieSetAs==0){
			return "[ <a href='myaccount.cgi?save="+optionascookie+"/1@'>On</a> / <b>Off</b> ]";
		}
	}
	
// STEP 1 -> if this is a new browser session, create the time cookie. if not, see how many seconds your browser has been opened
if (readCookie('lwstarttime') == null) {
	var tstamp = new Date();
	createCookie('lwstarttime',tstamp.getTime(),0); // deleted when browser is closed
	SECONDSONLW = 0;
}
else {
	var tstamp = new Date();
	var ttemp = tstamp.getTime() - readCookie('lwstarttime');
	SECONDSONLW = ttemp / 1000;
}

// STEP 2 -> if POST.CGI, increase by +1 points. if TOPIC.CGI, increase by +0.25 points
var curloc = window.document.location.toString();
if (Right(curloc, 8) == 'post.cgi') {
	if (readCookie('lwpoints') == null) {
		createCookie('lwpoints','1.0',0); // deleted when browser is closed
		POINTSONLW = 1.0;
	}
	else {
		var tpoints = readCookie('lwpoints');
		tpoints++;
		createCookie('lwpoints',tpoints,0);
		POINTSONLW = tpoints;
	}
}
else if (Right(curloc, 9) == 'topic.cgi') {
	if (readCookie('lwpoints') == null) {
		createCookie('lwpoints','0.25',0); // deleted when browser is closed
		POINTSONLW = 0.25;
	}
	else {
		var tpoints = readCookie('lwpoints');
		var tpoints=parseFloat(tpoints)+0.25
		createCookie('lwpoints',tpoints,0);
		POINTSONLW = tpoints;
	}
}
if (readCookie('lwpoints') !=  null) POINTSONLW = readCookie('lwpoints');

// STEP 3 -> add header tags for the progress bar
var head, script, link, style;
head = document.getElementsByTagName('head')[0];
script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://www.projectodious.com/ethryx/prototype.js';
head.appendChild(script);
script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://www.projectodious.com/ethryx/jsProgressBarHandler.js';
head.appendChild(script);
link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://www.projectodious.com/ethryx/jsProgressBarHandler.css';
link.media = 'screen';
head.appendChild(link);
style = document.createElement('style');
style.type = 'text/css';
head.appendChild(style);

// STEP 4 -> loop all <span> elements, look to see if a bar needs to be placed anywhere
var allElements, thisElement;
allElements = document.getElementsByTagName('span');
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    if (Left(thisElement.innerHTML, 10) == "  You need") {
		// Found  ==> You need <b>224</b> more points to become a <b>Wealthy Hobo</b> 
		// 1) get raw points count
			var allwords, allwords_array;
			allwords = thisElement.innerHTML;
			allwords_array = allwords.split("<b>");
			POINTS = allwords_array[1];
		// 2) get raw rank name
			allwords_array = allwords.split("<b>");
			THERANK = allwords_array[2];
		// 3) format raw data so its just the string we need
			allwords_array = POINTS.split("</b>");
			POINTS = allwords_array[0];
			allwords_array = THERANK.split("</b>");
			THERANK = allwords_array[0];
		// 4) calculate time until you will level up
			if (POINTSONLW!=0) {
				POINTSPERSEC = POINTSONLW / SECONDSONLW;
				TIME2RANK = POINTS / POINTSPERSEC;
			}
		// 5) Calculate %
			var ptg, currentpoints, perc, imagecolor, almostthere;
			var tempInnerHTML = "";
			ptg = PointsToGo();
			currentpoints = ptg - POINTS;
			perc = (currentpoints * 100) / ptg;
			perc = Math.round(perc);
				if (perc <= 25){ imagecolor = "percentImage4"; almostthere = ""; }
				if (perc > 25 && perc <= 50){ imagecolor = "percentImage3"; almostthere = ""; }
				if (perc > 50 && perc <= 75){ imagecolor = "percentImage2"; almostthere = ""; }
				if (perc > 75){ imagecolor = "percentImage1"; almostthere = "<br><br><i>Your almost there! Keep posting =]</i>"; }
			if(readCookie('lwShowETA')!=0 && readCookie('lwShowETA')!=null) tempInnerHTML = "<br>Your estimated rank up is <b>" + EnglishRank(TIME2RANK) + "</b>";
			if(readCookie('lwShowPB')!=0 && readCookie('lwShowETA')!=null) tempInnerHTML = tempInnerHTML + "<br><br><b>Points Progress:</b><br><span class=\"progressBar "+imagecolor+"\" id=\"element1\">"+perc+"%</span><br>You have "+currentpoints+"/"+ptg+" points."+almostthere;
			thisElement.innerHTML = thisElement.innerHTML + tempInnerHTML;
	}
	else if (Left(thisElement.innerHTML, 19) == "  You have attained") {
		// 1) show a gold bar because this person is obviously very awesome and has attained customizable
		thisElement.innerHTML = thisElement.innerHTML + "<br><br><b>Points Progress:</b><br><img src='http://www.projectodious.com/ethryx/goldbarglow.png'>";
	}
}

// STEP 5 -> check for the user trying to save options or reset stats
if (Right(curloc, 1) == '@') {
	var temploc = curloc;
	var temploc_array = temploc.split("=");
	var variablesettings = Left(temploc_array[1], temploc_array[1].length - 1);
	var var_saving_options = variablesettings.split("/");
	createCookie(var_saving_options[0],var_saving_options[1],999);
}
else if (Right(curloc, 2) == '^^') {
	eraseCookie('lwstarttime');
	eraseCookie('lwpoints');
	alert('Stats Reset !');
}

// STEP 6 -> get the MYACCOUNT_OPTIONS variable ready
	MYACCOUNT_OPTIONS = "<br><br><font face='Verdana, Geneva, sans-serif' color='#333333' size='2'><b>Bar Options</b></font> <img src='http://img.golivewire.com/qmark.gif' width='14' height='14' onMouseOver=\"tooltip('These options affect the Progress Bar all around livewire. They are saved as cookies on your browser and will reset when the cookies are deleted.');\" onMouseOut=\"hidetooltip();\"><br><img src='http://img.golivewire.com/ibdots.gif'><br>";
	// CATEGORY: Posting
	MYACCOUNT_OPTIONS = MYACCOUNT_OPTIONS + '<b>When Posting</b>';
	MYACCOUNT_OPTIONS = MYACCOUNT_OPTIONS + '<br>&nbsp;&nbsp;Show ETA Rank Up Time: <br>&nbsp;&nbsp;' + showFriendlyOption('lwShowETA', 1);
	MYACCOUNT_OPTIONS = MYACCOUNT_OPTIONS + '<br>&nbsp;&nbsp;Show Progress Bar: <br>&nbsp;&nbsp;' + showFriendlyOption('lwShowPB', 1);
	// CATEGORY: Side Bar
	MYACCOUNT_OPTIONS = MYACCOUNT_OPTIONS + '<br><b>Side Panel</b>';
	MYACCOUNT_OPTIONS = MYACCOUNT_OPTIONS + '<br>&nbsp;&nbsp;Show Points: <br>&nbsp;&nbsp;' + showFriendlyOption('lwShowSidePB', 1);
	// MISC
	MYACCOUNT_OPTIONS = MYACCOUNT_OPTIONS + '<br>[ <a href="myaccount.cgi?temp=^^">Reset Stats</a> ]';
	
// STEP 7 -> loop all <br> elements, also look to see if a bar needs to be placed anywhere
var allElements, thisElement, newElement;
allElements = document.body.innerHTML.split('<br>');
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
	if (Left(thisElement, 8) == "You need") {
		// 1) get raw points count
			var allwords, allwords_array;
			allwords = thisElement;
			allwords_array = allwords.split("<b>");
			POINTS = allwords_array[1];
		// 2) get raw rank name
			allwords_array = allwords.split("<b>");
			THERANK = allwords_array[2];
		// 3) format raw data so its just the string we need
			allwords_array = POINTS.split("</b>");
			POINTS = allwords_array[0];
			allwords_array = THERANK.split("</b>");
			THERANK = allwords_array[0];
		// 4) calculate time until you will level up
			if (POINTSONLW!=0) {
				POINTSPERSEC = POINTSONLW / SECONDSONLW;
				TIME2RANK = POINTS / POINTSPERSEC;
			}
			else{
				TIME2RANK = null; POINTSPERSEC = 0;
			}
		// 5) Calculate %
			var ptg, currentpoints, perc, imagecolor;
			ptg = PointsToGo();
			currentpoints = ptg - POINTS;
			perc = (currentpoints * 100) / ptg;
			perc = Math.round(perc);
				if (perc <= 25) imagecolor = "percentImage4";
				if (perc > 25 && perc <= 50) imagecolor = "percentImage3";
				if (perc > 50 && perc <= 75) imagecolor = "percentImage2";
				if (perc > 75) imagecolor = "percentImage1";
			newElement = MYACCOUNT_TITLE + "<span class=\"progressBar "+imagecolor+"\" id=\"element1\">"+perc+"%</span>" + "<br><b>Rank: </b>" + RealRank(THERANK) + "<br><b>Next Rank: </b>" + THERANK + "<br><b>SP: </b>" + POINTSONLW + " points<br><b>PPS: </b>" + roundNumber(POINTSPERSEC,4) + "/sec<br><b>ETA: </b>: " + EnglishRank(TIME2RANK) + "<br><i>Stats clear when you close browser.</i>";
			newElement = newElement + MYACCOUNT_OPTIONS
			document.body.innerHTML = document.body.innerHTML.replace(thisElement, thisElement+newElement);
	}
	else if (Left(thisElement, 17) == "You have attained") {
		// 1) show a gold bar because this person is obviously very awesome and has attained customizable
		newElement = MYACCOUNT_TITLE + "<img style='align:center' src='http://www.projectodious.com/ethryx/goldbarglow.png'>";
		document.body.innerHTML = document.body.innerHTML.replace(thisElement, thisElement+newElement);
	}
}

// STEP 8 -> If user wants to show the side panel progress bar, find where to insert the HTML
if(readCookie('lwShowSidePB')!=0 && readCookie('lwShowSidePB')!=null) {
	allElements = document.getElementsByTagName('span');
	for (var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
		if (Right(thisElement.innerHTML, 3) == ")  ") {
			if(readCookie('lwpoints')>0) thisElement.innerHTML = thisElement.innerHTML + "Points: " + readCookie('lwpoints') + " <a href=\"javascript:alert('These points are only the points you have earned this browser session. To turn this off, go to My Account.');\">?</a>";
		}
	}
}