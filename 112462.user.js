// ==UserScript==
// @name       Garmin Add Map Tab
// @namespace  http://matt.mn/
// @version    0.2
// @description  Adds Google Map Tab to Garmin Site
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include        http://connect.garmin.com/activity/*
// ==/UserScript==
var activity			= location.href.split('/');
var activityFile		= 'http:%2F%2Fprojects.matt.mn%2Fgarmin%2Factivity_' + activity[activity.length-1] + '.kml&hl=en';
var mapLink				= '<li><a href="http://maps.google.com/maps?q=' + activityFile + '" id="mapLink">Map</a></li>';
$("ul.nav-site").append(mapLink);