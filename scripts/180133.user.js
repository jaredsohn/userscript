// ==UserScript==
// @name        ApplyNow
// @namespace   robi
// @include     https://www.immigration.govt.nz/WorkingHoliday/Application/Create.aspx?CountryId=*
// @version     1
// @grant       none
// ==/UserScript==

function log (msg) {
	console.log(msg);
}

function getSound() {
	//var oggB64 = GM_getResourceURL("GMwavaudio");
	//var ausrc = 'data:audio/wav;base64,'+oggB64.split('data:application/octet-stream;base64,')[1];
	var au = document.getElementById('audio');

	if (!au) {
		au = document.createElement('audio');
		au.setAttribute('src', "http://gmflowplayer.googlecode.com/files/notify.wav");
		au.setAttribute('id', 'GMwavaudio');
		document.body.appendChild(au);
		au.load();
	}

	return au;
}

var autoRun = function(e) {
	// apply button
	var applyNow = document.getElementById("ctl00_ContentPlaceHolder1_applyNowButton");
	if ((applyNow == undefined)) {
		log("apply not ready!");
	} else {

		applyNow.onclick = function() {
			//window.setInterval(function(){var au = getSound(); au.play();},500);
		    log("apply now!");      
		}

		if(document.createEvent) {
		    var click = document.createEvent("MouseEvents");
		    click.initMouseEvent("click", true, true, window,
		    0, 0, 0, 0, 0, false, false, false, false, 0, null);
		    applyNow.dispatchEvent(click);
		    applyNow.focus();
		}

		else if(document.documentElement.fireEvent)
		{
		    applyNow.fireEvent("onclick");
		    applyNow.focus();
		}		
	}	

}

window.addEventListener('load', autoRun, false);