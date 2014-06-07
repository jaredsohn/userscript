// ==UserScript==
// @name           Google Calendar Show Week
// @namespace      Made by Anders Dahlgren @ adahlgren.com
// @description    Show week numbering in Google Calendar
// @include        http://calendar.google.tld/*
// @include        https://calendar.google.tld/*
// @include        http://www.google.tld/calendar*
// @include        https://www.google.tld/calendar*
// @include        http://google.tld/calendar*
// @include        https://google.tld/calendar*
// ==/UserScript==

function drawWeeks() {	
	
	var dowOffset = 1; //set this to the day of week the week "starts" on for your locale. 
		          //0 = sunday, 1 = monday, etc. Default is 1 = ISO 8601 week number.  				 
	var weekprefix = "w"; //week prefix, eg. w.23
 
	var divs = document.evaluate("//div[starts-with(@id, 'rg_rowy_h')] | //td[@id='dp_0_mhc']/span | //td[@id='mode_link3'] | //img[@class='navbutton'] | //span[@id='todrawfav']",
	                             document,
	                             null,
	                             XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	                             null);
	                             
	if (!divs.snapshotLength) return;
	showdate = divs.snapshotItem(0).getAttribute('onmousedown');  //Get current date that are showed.
	showdate = showdate.match(/\('(.*?)'\)/)[1]; 
	showmonth = showdate.substring(4,6)-1; 
	showyear = showdate.substring(0,4); 
 		
 	for(var i = 1; i <= 5; i++){
	divs.snapshotItem(i).addEventListener('click',drawWeeks,false);  //addListeners to various events that updates the page.
	}

	var div, firstWeekDay=[];
	for (var i = 5; i < divs.snapshotLength; i++) {
		div = divs.snapshotItem(i);
		firstWeekDay[i] = div.getElementsByTagName('span')[0].textContent;
		if (i == 5 && firstWeekDay[i] != 1 ){
			var thisMonth = new Date(showyear,showmonth-1,firstWeekDay[i]);
		}else {
			var thisMonth = new Date(showyear,showmonth,firstWeekDay[i]);
		}
		var span = div.insertBefore(document.createElement("span"),div.firstChild);
		span.style.position = "absolute";
		span.style.left = "1px";			
		span.style.color = "#f00";  //Edit to change color
		span.appendChild(document.createTextNode(weekprefix+thisMonth.getWeek(dowOffset)))
		}
}

function loader() {	
	setTimeout(drawWeeks,1500);
}
function loader2() {	
	setTimeout(drawWeeks,500);
}

window.addEventListener('load',loader,false); //add timout to initial load to prevent overloading
window.addEventListener('resize',loader2,false);  //faster timeout on resize


Date.prototype.getWeek = function (dowOffset) {
/*getWeek() function from http://www.meanfreepath.com */
	dowOffset = typeof(dowOffset) == 'number' ? dowOffset : 1; //default dowOffset to one
	var newYear = new Date(this.getFullYear(),0,1);
	var day = newYear.getDay() - dowOffset; //the day of week the year begins on
	day = (day >= 0 ? day : day + 7);
	var daynum = Math.floor((this.getTime() - newYear.getTime() -
	(this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
	var weeknum;
	//if the year starts before the middle of a week
	if(day < 4) {
		weeknum = Math.floor((daynum+day-1)/7) + 1;
		if(weeknum > 52) {
			nYear = new Date(this.getFullYear() + 1,0,1);
			nday = nYear.getDay() - dowOffset;
			nday = nday >= 0 ? nday : nday + 7;
			/*if the next year starts before the middle of the week, it is week #1 of that year*/
			weeknum = nday < 4 ? 1 : 53;
		}
	}else {
	weeknum = Math.floor((daynum+day-1)/7);
	}
	return weeknum;
};


