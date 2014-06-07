// ==UserScript==
// @name         Facebook to Google Calendar
// @namespace    fb2gc
// @match        *://*.facebook.com/event.php*
// @author       Samuel Gaus
// @description  This userscript adds a button to a Facebook event that extracts the relevant data and produces a Google Calendar event.
// ==/UserScript==

// This method of including jQuery was lovingly stolen from Erik Vold (http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script)

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {

// First we need to scrape the data.

	// Title is in the header
	var title = $("h1").text();
	// Time is stored using hCal (yyyy-mm-ddThh:mm:ss)
	var start = $("span.dtstart span.value-title").attr("title");
	var end = $("span.dtend span.value-title").attr("title");
	// Location is stored using hCard
	var place = $("span.org").text();
	var address = $.map(
		$("div.adr").children(),
		function(element){
			return $(element).text()
		}
	).join(", ");
	var description = $("div.description").clone().find("span.text_exposed_hide").remove().end().text();

	// Times needs to be yyyymmddThhmmssZ
	var regexp = new RegExp("[-|:]", "g");
	start = start.replace(regexp, "")+'Z';
	end = end.replace(regexp, "")+'Z';

// Generate the Google Calendar template link

	var href  = "http://www.google.com/calendar/event?action=TEMPLATE&text=";
	href += escape(title);
	href += "&dates=";
	href += start;
	href += "/";
	href += end;
	href += "&location=";
	href += escape(place+", "+address);
	href += "&trp=true";

	// Include the right amount of description ensuring href is no longer than 1900 characters. Sometimes Google adds some additional parameters, so we'll keep it at 1900 - it seems to work for me.
	var cutoff = 1900-href.length;
	cutoff -= 12; //&details= and ...
	if(cutoff > 0){
		var details = location.href+": "+description;
		details = details.substring(0,cutoff);
		//length will expand when encoded; little loop here to compensate for that
		while(escape(details).length>cutoff){
			details = details.substring(0,details.length-1);
		}
		details = "&details="+escape(details)+"...";
		href += details;
	}

// Now we need to make a Send to Google Calendar link

	$('div.profileHeaderMain div.fsm').append(" · <span class='fsl'><a target='_blank' href='"+href+"'>Google Calendar</a></span>");

}

addJQuery(main);
