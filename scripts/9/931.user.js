// ==UserScript==
// @name          Audioscrobbler play statistics!
// @namespace     http://www.d-scribe.de/
// @description   Displays a statistic after the number of played tracks on Audioscrobbler.com
// @include       http://www.audioscrobbler.com/user/*
// ==/UserScript==

(function() {
	//Get registration Date
	registered_xpath = document.evaluate("//table[@class='topn']/tbody/tr/th/h5", document, null, XPathResult.ANY_TYPE,null); 
	registered_elem = registered_xpath.iterateNext();
	if(registered_elem == null) 
		return;

	//Calculate elapsed time 
	d = registered_elem.textContent.match(/Registered on: (.*)/);
	ms = Date.parse(d[1]);
	now = new Date();
	ms_elapsed = now.getTime()-ms;
	hours = ms_elapsed/(1000*60*60)
	days = hours/24
	weeks = days/7

	//Get Number of played tracks
	tracksplayed_xpath = document.evaluate("//table[@class='userinfo']/tbody/tr[3]/td[2]" , document, null, XPathResult.ANY_TYPE,null); 
	tracksplayed_elem = tracksplayed_xpath.iterateNext();
	if(tracksplayed_elem == null) 
		return;
	tracksplayed = tracksplayed_elem.textContent;

	tracksperhour = Math.round(tracksplayed / hours);
	tracksperday  = Math.round(tracksplayed / days);
	tracksperweek = Math.round(tracksplayed / weeks);

	s = tracksperhour + " per hour, " + tracksperday + " per day, " + tracksperweek + " per week";
	
	tracksplayed_elem.textContent = tracksplayed_elem.textContent+" ("+s+")";
})();

