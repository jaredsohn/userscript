// ==UserScript==
// @name           mlbTVTime
// @namespace      mlbTvTimeHack
// @include        http://mlb.mlb.com/mediacenter/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// ==/UserScript==

//document.getElementsByClassName = function(cl) {

$(document).ready(function() {
	setTimeout(doCalcs,1000);
});

$("body").on("click", ".mediagrid-toggle-link, .bam-daypicker-next, .bam-daypicker-previous", function(event){
	setTimeout(doCalcs,1000);
});

function doCalcs()
{

	var jetzt = new Date();
	var diff = jetzt.getTimezoneOffset();
	$(".mediagrid-info-time,.mediagrid-expanded-time").each(function() {
		var zeit = $(this).html();
		
		if ((zeit.indexOf("PM") > -1) || (zeit.indexOf("AM") > -1))
		{
			// time difference values - european summertime is 6 hours off US central time, in winter 7
			//if (diff == -120) {zz = 6;} else {zz = 6;}
			var zz = 6;
			
			// for 12 hour to 24 hour conversion
			if (zeit.indexOf("PM") > -1) { ampm = 12; }
			if (zeit.indexOf("AM") > -1) { ampm = 0; }
			
			stunden = parseInt(zeit.substr(0,zeit.indexOf(":")));
			minuten = zeit.substr(zeit.indexOf(":") + 1,2);
			// calculate new hour value, timezone & 24h clock
			stunden = ((stunden + ampm) + zz); // PM zeit & zeitverschiebung
			if (stunden >= 24) { stunden = (stunden - 24); }
			
			neuzeit = stunden + ":" + minuten;
			
			$(this).html(neuzeit);
			//+	"   <b style=\"font-size:70%\">(" + zeit + ")</b>"; // won't show the old one anymore
		}
		if (zeit.indexOf("Time") > -1)
		{
			if (diff == -120) {sz = "S";} else {sz = "";}
			$(this).html("ME"+ sz + "Z");
		}
	});
}