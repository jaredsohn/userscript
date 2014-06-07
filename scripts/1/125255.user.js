// ==UserScript==
// @name           Youtube Party
// @namespace      pausiert
// @description    change favicon to player status (play/pause) and title to time left
// @include        http*://*.youtube.com/watch*v=*
// @version        1.0
// @credit         the internetz
// ==/UserScript==

//##################################################################################################
// the favicons are pretty damn ugly, if you can, improve them and send me a mail pausiert[at]gmail.com
//##################################################################################################

var gotPlayer = false;
var catchFails = 0;
var player = null
var obj = null;
var duration = 0;
var origWindowTitle = document.title;

var settings = new Array();
settings["autoPlay"] = GM_getValue('autoPlay', true);
settings["highQuality"] = GM_getValue('highQuality', false);
settings["showTime"] = GM_getValue('showTime', true);

window.setTimeout(function() { init(); }, 500);

function timeLeft() {
	played = Math.round(obj.getCurrentTime());
	left = duration - played;
	document.title = format(left) + ' ' + origWindowTitle;
}

function format(sec) {
	leftSec = parseInt(sec);
	leftMin = parseInt(sec/60);
	leftSec = leftSec%60;
	if(leftSec < 10) {
		leftSec = '0' + leftSec; 
	}
	return '(' + leftMin + ':' + leftSec + ')';
}

function init() {	
	try {
		player = document.getElementById("movie_player");
		obj = player.wrappedJSObject || player;
		//obj.mute(); //debug
		if(!settings.autoPlay) { obj.pauseVideo() }
		if(settings.highQuality) { obj.setPlaybackQuality('hd720'); }
		obj.addEventListener("onStateChange", 'onPlayerStateChange');
		gotPlayer = true;
	}
	catch(ex) {
		catchFails++;
	}
	if(!gotPlayer) {
		if(catchFails < 1) {
			window.setTimeout(function() { init(); }, 500); 
		} else {
			document.getElementById("yt-masthead-content").appendChild(document.createTextNode("Youtube Party could not catch the Player. Please Check vor Updates or try again"));
		}
	} 
}

createMenu();
function createMenu() {
	headline = document.getElementById("watch-headline-title");
	GM_addStyle(".settingsMenu { float: left; font-size: 11px; color: rgb(102, 102, 102) }");  
	GM_addStyle(".settingsMenu ul { display:  none;}");
        GM_addStyle(".settingsMenu:hover ul { display: block; }");
        GM_addStyle(".settingsMenu ul {   list-style-type:none; list-style-image:none; margin:0px; padding:0px; }");
	settingsMenuLi = document.createElement("li");
	settingsMenuUl = document.createElement("ul");
	settingsMenuLi.appendChild(settingsMenuUl);
	settingsMenuLi.innerHTML = "party settings";
	settingsMenuLi.appendChild(settingsMenuUl);
	settingsMenuLi.setAttribute("class", "settingsMenu"); 
	
	inputHighQuality = document.createElement("input");
	inputHighQuality.setAttribute("type", "checkbox");
	if(settings["highQuality"]) {
			inputHighQuality.setAttribute("checked", "true");
	}
	inputHighQuality.setAttribute('onclick', 'changeSetting(\'highQuality\')');
	inputAutoPlay = document.createElement("input");
	inputAutoPlay.setAttribute("type", "checkbox");
	if(settings["autoPlay"]) {
			inputAutoPlay.setAttribute("checked", "true");
	}
	inputAutoPlay.setAttribute('onclick', 'changeSetting(\'autoPlay\')');
	inputShowTime = document.createElement("input");
	inputShowTime.setAttribute("type", "checkbox");
	if(settings["showTime"]) {
			inputShowTime.setAttribute("checked", "true");
	}
	inputShowTime.setAttribute('onclick', 'changeSetting(\'showTime\')');

	settingHighQuality = document.createElement("li");
	settingAutoPlay = document.createElement("li");
	settingShowTime = document.createElement("li");
	
	settingHighQuality.appendChild(inputHighQuality);
	settingHighQuality.appendChild(document.createTextNode("try 720p"));
	settingShowTime.appendChild(inputShowTime);
	settingShowTime.appendChild(document.createTextNode("show time in title"));
	settingAutoPlay.appendChild(inputAutoPlay);
	settingAutoPlay.appendChild(document.createTextNode("autoplay"));
	
	settingsMenuUl.appendChild(settingHighQuality);
	settingsMenuUl.appendChild(settingAutoPlay);
	settingsMenuUl.appendChild(settingShowTime);

	headline.appendChild(settingsMenuLi);
}

unsafeWindow.changeSetting = function(setting) {
	newStatus = 0;
	if (settings[setting]) {
		newStatus = false;
	} else { 
		newStatus = true;
	}
	setTimeout(function() {
		settings[setting] = newStatus;
		GM_setValue(setting, newStatus);
	}, 0);

}

unsafeWindow.onPlayerStateChange = function(newState) {
    if(duration == 0) {
        duration = obj.getDuration();
    }
	favico = "";
	if(newState == 1) { // play
	   if(settings["showTime"]) {
	   		active = window.setInterval(function() {timeLeft (); } , 500);
	   }
		favico = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIACEAQAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAUtJREFUOI3FkrFKRDEQRc99+wRZQdCPEMRKC0GwEKxsrOxs/C5/Rn9AC8HKysZCUJFE4ZnsXosku08LWwfChMnMnTt3Av9tut6Y7vVw0wECJP1ZMLeLBw7fPqWrjWlekSYYypMRwjJqMbG8yGAhQbJn/dxMEsY1q/U/evkA4HpzrSEXFGvhZ2bSZSAZsk0GEpBshmFgGAYOnl5JhmSVg2sOZKBLNkmlsIElIMRADJEQI7sPj7XQtRkkTMb0WQKXMRtV28QQGRFn+/aeu72dX7qIPrf55BJ18TFGXJVVVSbbUBsWFNMnWuF4WSaEMJafx5PjRm+cRp9aQKDRY2FQ7PnstCxXy/oG3efFzlVBC6MQiwbvF+eLdFuoCdaALtdXs60JcvtCdddVF1PmXshZxENGMOu/zH6Hb2wQZv4jsW2n8VoO35nZHLb4d/sG3CnPSBPJ4X4AAAAASUVORK5CYII=';
	} else if (newState == 2) { // pause
		try {
			window.clearInterval(active);
		} catch(err) {}
		favico = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIAB6AQAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAUFJREFUOI3FkrGqlDEQhb+zpFjuiuAWYm9/64uVdoIv6NtoIdwFEV/DQm6TCSx/fvdYZLL/og9wpwmZnDmZ+RJ47tDpeDgCP4DXwN1/CgMaS8YZuBh+vXtqb/Xt1eER8XDVGqxct/prbupG0qey4nsQ9lXK+9+BJb4eXwDmw1MD4MvxgFODBXBfOuyxtwOgRkOYldFG1ABBn/dnqzb7spiddHMARFRA9EzVFgjoNyBSvit/rhtnXrRoWLBmZ60GYNY5JZu+LAbNsRikaqtgsaQ0IrBM19blbKZ0nHQ1ktaYGViTy78jzGIDZTUXwQ6cYCFiGHQbBC2mYRbPRzCXsuCz0PaBDLUGEvSEW6OmYX4UhAe3sz6/3D/u4ME3BiSLodcGTZsksZ1KN58E34E3WXoHxtPxBtzFLDkJwE/gI88efwFMm8dUsr49gAAAAABJRU5ErkJggg==';
	} else { // stop/finished
		window.clearInterval(active);
		document.title = origWindowTitle;
		favico = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABiAQAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAASlJREFUOI3Fkr1Ow0AQhL+xrogShEQKRE+fOqKiROIFeRoqpERCiNegSuNzFNnGQ3Hnc/gJJVyzvt3Z8ezcwn8fbZeLJfACXALzbwgDSiGfAzAY3m52zbWeLhYbxLpgDVaOU3/JjbiU9Db0eAXCTtDbXfxV8uPyLFFYAKvQwQwbJ0qaffNJb06jHHtcpNrMQmsqKQszxPpnBbmfbiRP8Cq8l0uq1DECRlaa+4uhfflM+NAeyTMixhplT1QKKmZ29mQkEDqc3U2gJkZsUVrSrGWI7qjZQOjNIKjAWFCf8GCk6MaRE98QWnwQKgsUY41RMa3sRa73WZmTbwc9nM82FazLy41y5UygyTRNkPyDbejMveAZuMqtcxjnZlpJYDAt00O8Ancn5/2z8wHmoqR+2ezf7wAAAABJRU5ErkJggg==';
	}
	var link = document.createElement('link');
	link.type = 'image/x-icon';
	link.rel = 'shortcut icon';
	link.href = favico;
	document.getElementsByTagName('head')[0].appendChild(link);
}
