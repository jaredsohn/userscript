// ==UserScript==
// @name           ADB Downloader
// @namespace      Astrodatabank_Downloader
// @include        http://www.astro.com/astro-databank/*
// @include        http://astro.com/astro-databank/*
// @description    Creates a link to download in QuickChart format.
// ==/UserScript==
var name, birthdate, place, timezone, tables = document.getElementsByTagName('table');

var birthname=/birthname/i
var switchname=/^([a-z-]+),\s+(.+)$/gi


var table = tables[0];
var row = table.rows;

name = tables[1].rows[0].cells[0].innerHTML;
if ( birthname.test(row[1].cells[0].innerHTML) ) {
	birthdate = row[2].cells[1].innerHTML;
	place = row[3].cells[1].innerHTML;
	timezone = row[4].cells[1].innerHTML
} else {
	birthdate = row[1].cells[1].innerHTML;
	place = row[2].cells[1].innerHTML;
	timezone = row[3].cells[1].innerHTML
}

name = name.replace(switchname, "$2 $1");
var fullname = name;
birthdate = fixdate(birthdate);
timezone = fixtz(timezone);
place = fixplace(place);

if (name.length < 23) {
	while (name.length < 23) {
		name = name + ' ';
	}	
} else {
	var toolong=/(^.{23}).+/i
	name = name.replace(toolong, "$1");
}

var adbNewContent = document.createElement('a');
var content = name+birthdate+" "+timezone+place;
var url;
var verify = /^.{23}\w{3}\s{1,2}\d{1,2}\W\s\d{6}\W\d{2}\W\d{2}\s\w{2}\s\w{3}[+-]\d{2}\W\d{5}\w\d{2}\W00\s\d{2}\w\d{2}\W00\s.+/ig
//var description = "-"+verify.test(content)+"-";
if (verify.test(content)) {url = "http://www.stellarconsulting.org/convert.php?content="+encodeURI(content)+"&name="+encodeURI(fullname);} else { throw "The QuickChart file isn't properly formatted"; }
var description = " Click here to download "+fullname+"'s QuickChart file";
adbNewContent.setAttribute('href', url);
adbNewContent.appendChild( document.createTextNode( description ) );
table.parentNode.insertBefore(adbNewContent, table.nextSibling);

function fixdate(date) {
	//return date;
	var mungedate=/^\s+(\d+)\s+(\w+)\s+(\d{4})\s+\W?\w?\w?\w?\w?\W?\W?\s?at\s+\d+:\d+\s+.+small.+\s+(\d+:\d+)\s+([AM|PM]+).+/ig;
	var dates = mungedate.exec(date);
	if (dates[1].length<2) {dates[1] = " "+dates[1];}
	var cropmonth=/^(.{3}).+/i
	dates[2] = dates[2].replace(cropmonth, "$1");
	dates[2] = dates[2].toUpperCase();
	dates[4] = dates[4]+":00";
	if (dates[4].length<8) {dates[4] = 0+dates[4];}
	var returndate = dates[2]+" "+dates[1]+", "+dates[3]+dates[4]+" "+dates[5];
	return returndate;
}

function fixtz(timezone) {
	var TZT, plusminus, hrmin;
	var timezones = timezone.split(" ");
	var isGMTfmt =/^h(\d+)(\w)$/ig;
	var isMERfmt =/^m(\d+)(\w)(\d+)/ig;
	if ( isGMTfmt.test(timezones[2]) ) {
		isGMTfmt =/^h(\d+)(\w)$/ig;
		var tzs = isGMTfmt.exec(timezones[2]);
		if (tzs[2] == "e") {tzs[2] = "-";}
		if (tzs[2] == "w") {tzs[2] = "+";}
		if (tzs[1].length < 2) {tzs[1] = 0+tzs[1]+":00";} else {tzs[1] = tzs[1]+":00";}
		TZT = timezones[1];
		plusminus = tzs[2];
		hrmin = tzs[1];
	} else if ( isMERfmt.test(timezones[2]) ) {
		isMERfmt =/^m(\d+)(\w)(\d+)/ig;
		var tzs = isMERfmt.exec(timezones[2]);
		if (tzs[2] == "e") {tzs[2] = "-";}
		if (tzs[2] == "w") {tzs[2] = "+";}
		var convertsecs = (((tzs[1] * 3600) + (tzs[3] * 60))/15);
		var hour = String(Math.floor((convertsecs % 86400) / 3600));
		var min = String(Math.floor(((convertsecs % 86400) % 3600) / 60));
		if (hour.length < 2) {hour = 0+hour;}
		if (min.length < 2) {min = 0+min;}
		TZT = timezones[1];
		plusminus = tzs[2];
		hrmin = hour+":"+min;
	} else if (isMERfmt.test(timezones[1])) {
		isMERfmt =/^m(\d+)(\w)(\d+)/ig;
		var tzs = isMERfmt.exec(timezones[2]);
		if (tzs[2] == "e") {tzs[2] = "-";}
		if (tzs[2] == "w") {tzs[2] = "+";}
		var convertsecs = (((tzs[1] * 360) + (tzs[3] * 60))/15);
		var hour = String(Math.floor((convertsecs % 86400) / 3600));
		var min = String(Math.floor(((convertsecs % 86400) % 3600) / 60));
		if (hour.length < 2) {hour = '0'+hour;}
		if (min.length < 2) {min = '0'+min;}
		TZT = "LMT";
		plusminus = tzs[2];
		hrmin = hour+":"+min;
	}
	return TZT+plusminus+hrmin;
}

function fixplace(place) {
	//this function is designed to accept a location formatted in CITY STATE, COUNTRY, XX[ns]XX, XX[ew]XX
	//and return it in XXX[ew]XX'00 XX[ns]XX'00 CITY, [STATE or COUNTRY]  If outside the US, returns COUNTRY
	//and inside the US returns STATE.
	var mungeplace=/\s+([^,]+),\s+([^,]+),\s+\D+(\d+\w\d+).+\s+(\d+\w\d+)/ig; //
	var places = mungeplace.exec(place);
	if (places[2] == "USA") {
		var stuff = places[1].split(" ");
		places[2] = stuff.pop();
		places[1] = stuff.join(" ");
	}
	if (places[3].length < 5) { while (places[3].length < 5) { places[3] = 0+places[3]; } }
	if (places[4].length < 6) { while (places[4].length < 6) { places[4] = 0+places[4]; } }
	places[3] = places[3]+"'00";
	places[4] = places[4]+"'00";
	var returnplaces = places[4]+" "+places[3]+" "+places[1]+", "+places[2];
	return returnplaces;
}