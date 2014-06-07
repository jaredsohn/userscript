// ==UserScript==
// @name           SWA Reservation to Google Calendar
// @namespace      tag:amartin@assaydepot.com,2007
// @description    Add SWA Flights to your Google Calendar
// @include        https://www.southwest.com/cgi-bin/confirmResPage
// ==/UserScript==


// UTILITY FUNCTIONS
function getXP(q) {
  return document.evaluate(q, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function inject(e) {
  e.style.marginBottom='2px';
  insertspot.appendChild(e);
}

function formatTime(t) {
	var result = new String();
	parse = t.match(/(\d{1,2}):(\d\d)\s([A|P]M)/);
	hour = new Number(parse[1]);
	if (parse[3] == "PM")	{hour = hour + 12}
	if (hour < 10) { result = "0"}
	result += hour;
	result += parse[2];
	result += "00";
	return result;
}

//MAIN CODE


//Make sure it is the right page
var h1check = getXP("//H1");
var confirmed = false;
for (i=0;i < h1check.snapshotLength; i++)
{
	if (h1check.snapshotItem(i).textContent == 'Southwest Airlines Purchase Confirmation')
	{
		confirmed = true;
	}
}
if (!confirmed){ return; }


//Get Title
var title = getXP("//TD[@headers='pax routing']");
if(!title.snapshotLength) {
  alert("title not found");
  return;
}
title = title.snapshotItem(0).textContent;

//Get Confirmation Number
var conf_num = getXP("//TD[@class = 'bookingConfirmationNumber2']");
if(!conf_num.snapshotLength) {
  alert("confirmation number not found");
  return;
}
conf_num = conf_num.snapshotItem(0).textContent;

//Get Passenger
var passenger = getXP("//TD[@class='bookingFormText']");
if(!passenger.snapshotLength) {
  alert("passenger not found");
  return;
}
passenger = passenger.snapshotItem(1).textContent;

//Get Account Number
var account = getXP("//TD[@class='bookingFormText']");
if(!account.snapshotLength) {
  alert("account not found");
  return;
}
account = account.snapshotItem(2).textContent;

//Get Flight Details
var details = getXP("//TD[@id='depart']/../TD");
if(!details.snapshotLength) {
	alert('details row not found');
  return;
} 
var date = details.snapshotItem(1).textContent;
var flight = details.snapshotItem(5).textContent;
var routing = details.snapshotItem(6).textContent;

//Set Insert Spot for Button
var insertspot = details.snapshotItem(6);

//Get Dates  (format of dates= 20080101T153000Z  / 20080101T173000Z)
var month_day = getXP("//TD[@headers='depart date']");
if(!month_day.snapshotLength) {alert("month_day not found"); return;}
month_day = month_day.snapshotItem(0).textContent.split(" ");

//month
var months = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec";
var month = months.indexOf(month_day[0])/4+1
if (month < 1) {alert ("invalid month parsed");	return;}
if (month < 10){month = new String("0" + month.toString());}
var day = month_day[1];

//year
var d = new Date();
var year = d.getFullYear();
if (d.getMonth() > parseInt(month)) {year = year + 1;}

//Get Times - We need to parse the routing variable above.
var match = routing.match(/(\d{1,2}:\d{2}\s[A|P]M)/g);
startTime = formatTime(match[0]);
endTime = formatTime(match[1]);

var details = 'Confirmation Number: ' + conf_num + '\n' + passenger
							+ ' (' + account + ')\nFlight: ' + flight + ' on ' + date
							+ '\n\n' + '               ' + routing;
details = details.replace (/\n/g, '%0A');

var newButton = document.createElement("DIV");

newButton.innerHTML = '<a style="float:right;" href="http://www.google.com/calendar/event?action=TEMPLATE&text='
+ title
+ '&dates='
+ year + month + day + 'T' + startTime + '/' + year + month + day + 'T' + endTime + ''
+ '&details='
+ details
+ '&location='
+ title
+ '&trp=true&sprop=&sprop=name:" target="_blank">'
+ '<img src="http://www.google.com/calendar/images/ext/gc_button1.gif" border=0></a>';

inject(newButton);