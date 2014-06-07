// ==UserScript==
// @name        Ikariam Growl
// @namespace   http://fluidapp.com
// @description Ikariam Growl Notification for Fluid
// @include     http://*.ikariam.*/*
// @author      Kahil Young
// ==/UserScript==


var ONESEC   = 1000 ;				// One second (in ms)
var ONEMIN   = 60 * ONESEC ;		// One minute (in ms)
var INTERVAL = 3 * ONEMIN ;			// How often is page refreshed (in ms)
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	INTERVAL
) ;


(function () {
    growlNewCity();
})();

function growlNewCity() {
    if (['advCities'].some(function(e) {
    if (document.evaluate('.//a[@class="normalactive"]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
})) {        
                fluid.showGrowlNotification({
				title: "Ikariam",
				description: "New message from your City Advisor.",
				priority: 0,
				sticky: false
											});
    }	
}


(function () {
    growlNewMilitary();
})();

function growlNewMilitary() {
    if (['advMilitary'].some(function(e) {
    if (document.evaluate('.//a[@class="normalactive"]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
})) {        
                fluid.showGrowlNotification({
				title: "Ikariam",
				description: "New message from your Military Advisor.",
				priority: 0,
				sticky: false
											});
    }	
}


(function () {
    growlNewMilitaryAlert();
})();

function growlNewMilitaryAlert() {
    if (['advMilitary'].some(function(e) {
    if (document.evaluate('.//a[@class="normalalert"]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
})) {        
                fluid.showGrowlNotification({
				title: "Ikariam",
				description: "New alert from your Military Advisor.",
				priority: 0,
				sticky: false
											});
    }	
}


(function () {
    growlNewResearch();
})();

function growlNewResearch() {
    if (['advResearch'].some(function(e) {
    if (document.evaluate('.//a[@class="normalactive"]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
})) {        
                fluid.showGrowlNotification({
				title: "Ikariam",
				description: "New message from your Research Advisor.",
				priority: 0,
				sticky: false
											});
    }	
}


(function () {
    growlNewDiplomacy();
})();

function growlNewDiplomacy() {
    if (['advDiplomacy'].some(function(e) {
    if (document.evaluate('.//a[@class="normalactive"]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
})) {        
                fluid.showGrowlNotification({
				title: "Ikariam",
				description: "New message from your Diplomacy Advisor.",
				priority: 0,
				sticky: false
											});
    }	
}