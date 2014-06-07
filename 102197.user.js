// ==UserScript==
// @name          Facebook - Fishwrangler Folsom Boat Trainer
// @namespace     altosaxplayer
// @description   A boat trainer for the folsom boat
// @include       http://apps.facebook.com/fishwrangler/*
// @include       https://fish-wrangler.com/fishwrangler/my
// ==/UserScript==

function boatTrainer() {

	var nextLocation = null;
	var locationIndex = -1;
	var timeAndExtra = null;
	var time = null;
	var boatTimeout = null;
	var activeBoat = GM_getValue('Boat', false);
	
		if (activeBoat == 'Folso') {
		//Go from New Seinborough(21) to Perilimeter (25) and then back again
		locationIndex = (island == "New Seinborough") ? 21 : 25;
		nextLocation = (locationIndex == 21) ? 25 : 21;
		}

		var textLocation = document.body.innerHTML.search(/Arriving at [A-Za-z ].* in [0-9]{1,2}.[0-9]{1,2} minutes./);
		var textLocation2 = document.body.innerHTML.search(/Arriving at [A-Za-z ].* in [0-9]{1,2} seconds./);
		
		if (textLocation != -1) {
			//magic number: +50, pulled from my butt, just wanted to get the full message
			timeAndExtra = document.body.innerHTML.substring(textLocation + "Arriving at ".length, textLocation + "Arriving at ".length + 50);
			time = parseFloat(timeAndExtra.substring(timeAndExtra.indexOf("in ") + "in ".length, timeAndExtra.indexOf(" minutes")));
			timervalue = Math.ceil(time * 60.0);
			boatTimeout = (parseInt(timervalue, 10) + Math.round(Math.random() * 30) + 3) * 1000;
			
		}
		else if (textLocation2 != -1) {
			//magic number: +50, pulled from my butt, just wanted to get the full message
			timeAndExtra = document.body.innerHTML.substring(textLocation2 + "Arriving at ".length, textLocation2 + "Arriving at ".length + 50);
			timervalue = parseInt(timeAndExtra.substring(timeAndExtra.indexOf("in ") + "in ".length, timeAndExtra.indexOf(" seconds")), 10);
			boatTimeout = (parseInt(timervalue, 10) + Math.round(Math.random() * 30) + 3) * 1000;
			
		}
		
				//Already determined what boat and the nextLocation. If we aren't traveling, then lets get the party started!
		if (locationIndex > -1 && (!voyaging)) {
			
			setTimeout(function () {
				document.location = 'https://fish-wrangler.com/fishwrangler/map-travel/' + nextLocation;
			}, 5000);
			changeTitleWithTimeout("Boat Training - Arrive at " + nextAvailableTime(boatTimeout));
		}
		
		//Already determined what boat, and the nextLocation.  Use boatTimeout from voyaging message to determime next trip.     
		else if (locationIndex > -1 && boatTimeout >= 0) {
			
			setTimeout(function () {
				document.location = 'https://fish-wrangler.com/fishwrangler/map-travel/' + nextLocation;
			}, boatTimeout);
			changeTitleWithTimeout("Boat Training - Arrive at " + nextAvailableTime(boatTimeout));
		}
		else {
			alert("Boat Trainer Issues - Unable to determine enough to auto-travel.\n Boat: "+activeBoat+"\n timeoutvalue: " + boatTimeout + "\n locationIndex: " + locationIndex + "\n URL location:" + location + "\n\nPlease turn Boat Trainer OFF if you aren't using it");
		}

	}
}