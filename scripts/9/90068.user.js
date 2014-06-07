// JavaScript Document
// ==UserScript==
// @name           Ikariam Nearest Time
// @autor          roselan
// @version        1.0.2
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @namespace      ikariamScript
// @description    Displays time of nearest city from selected island or spy.
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

var listOwnCities;

function secondsToHms(d) {
	d = Number(d);
	var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);	
	var s = Math.floor(d % 3600 % 60);
	return ((h > 0 ? h + ":" : "00:") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "00:") + (s < 10 ? "0" : "") + s);
	}

function computeDistance (from, to) {
	return (from[0] == to[0] && from[1] == to[1]) ? 10 : Math.sqrt(Math.pow(Math.abs(from[0]-to[0]), 2) + Math.pow(Math.abs(from[1]-to[1]), 2))*20;
}	

function computeTime (distance) {	
	return (secondsToHms(distance*60));	
}
	
function getCoords (city) {
	var myCity = city.replace("(", "[").replace(")", "]").replace(",",":");
	myCity = myCity.substring(myCity.indexOf('[') + 1, myCity.indexOf(']'));
	return myCity.split(':');	
}

function getNearestCity (targetIsland) {	
	var targetCoords = getCoords(targetIsland);
	var minDistance = 999999;
	var nearestCity;	
	listOwnCities.each( function () {
		var city = this.textContent;
		var cityName = city.substr(city.indexOf(']')+1).trim();
		var cityCoords = getCoords(city);
		var distance = computeDistance(cityCoords, targetCoords);		
		if (distance < minDistance) {
			minDistance = distance;	
			nearestCity = {name:cityName, distance:distance}		
		}	
	
	});
	return nearestCity;
}

function showTime(city) {
	var distTime = computeTime(city.distance);
	var elem = '<span id="timeToIsland">'+distTime+'&nbsp;('+city.name+')'+'</span>'
	if ($("#timeToIsland").text() == "") { 
		$("#breadcrumbs").append('<span>&nbsp;-&nbsp;</span></span>');
		$("#breadcrumbs").append(elem);
	}
	else {
		$('#timeToIsland').replaceWith(elem);
	}
}	

$(document).ready(function(){

	listOwnCities = $("li[class*=coords]");
	
	// island and city views
	var targetIsland = $("span[class=island], a[class=island]").text();
	if (targetIsland != "")	showTime(getNearestCity(targetIsland));
	
	// spy center
	var spyCities = $("li[class=city] > a");	
	spyCities.each( function () {
		var spyNearestCity = getNearestCity(this.textContent.trim());
		this.textContent += (' - '+computeTime(spyNearestCity.distance)+' ('+spyNearestCity.name+')');
		
	});
		
	// world map	
	var islandBread = document.getElementById("islandBread");
	if (islandBread) {
		islandBread.addEventListener('DOMSubtreeModified', function(){
			showTime(getNearestCity(this.textContent));			
		},false);
	}

});
