// Git Time Tracker Greasemonkey Script
// version 0.1 BETA!
// 2005-04-22
// Copyright (c) 2005, Robert McLeod
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script to track time in git.
//
// Currently single user (no breakdown on time spent per user per issue)
//
// You will need to add the server side scripts somewhere and add your
// URL and api key below.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Git Time Tracker
// @namespace https://gist.github.com/2273229
// @description Script to track time on github
// @include https://github.com/*/*/issues/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

// api setting
api_key = "48c510eea7701597bbc9172d12978908";
api_url = "http://timer.hamstar.co.nz/";

// Get the issue id
url = window.location.href;
issue_id = url.replace('https://github.com/','')
		 .replace('issues/','')
		 .replace(/\//g,'-');

// Add the time tracker stuff
sidebar = $("div.discussion-sidebar");
sidebar.append($('<hr>'));
sidebar.append($('<p>').html( "<strong>Time Spent</strong>" ));
sidebar.append($('<p>').attr('id', 'tracked-time').text("loading...").css('font-size','large'));
sidebar.append($('<p>').html("<a href='javascript:void(0)' id='set-time-link'>Set Time</a>"));

// get the time from the storage
get_time_url = api_url + "get_time.php?key=" + api_key +"&issue_id=" + issue_id;

GM_xmlhttpRequest({
  method: "GET",
  url: get_time_url,
  onload:  function(r) {
	$('#tracked-time').text( r.responseText );
  }
});

document.addEventListener('click', function(event) {
	// event.target is the element that was clicked
	if ( event.target.id == 'set-time-link' ) {
		
		
		time = prompt("Enter the time spent");
		
		set_time_url = api_url + "set_time.php?key=" 
					 + api_key +"&issue_id=" + issue_id
					 + "&time="+time;
					 
		GM_xmlhttpRequest({
		  method: "GET",
		  url: set_time_url,
		  onload:  function(r) {
			$('#tracked-time').text( r.responseText );
		  }
		});
		
		// if you want to prevent the default click action
		// (such as following a link), use these two commands:
		event.stopPropagation();
		event.preventDefault();
	}
}, true);