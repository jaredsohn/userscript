// ==UserScript==
// @name        No Hulu Ads
// @namespace   http://userscripts.org/users/71078
// @description Automatically mutes and hides ads while you watch videos on Hulu. (and restores the volume when the content comes back)
// @include     *hulu.com/*
// @version     1.0
// ==/UserScript==

var player, lastStateSeen;
var pauseOnReturn = localStorage["NoHuluAds:pauseOnReturn"] || true;
var mask = document.createElement('div');
var showNameDiv, pauseOnReturnDiv, dismissDiv;
var maskSetup = false;
var masked = false;

addGlobalStyle('#NoHuluAdsMask { position: absolute; background-color: black; color: white; z-index: 10000; }');
addGlobalStyle('#NoHuluAdsMask div { font-family: Flama; }');
addGlobalStyle('#NoHuluAdsMask #NoHuluAdsShowName { font-family: Flama; text-align: left; margin-left: 40px; margin-top: 30px; margin-bottom: 150px; font-size: 32px; font-weight: 300; }');
addGlobalStyle('#NoHuluAdsMask #NoHuluAdsShowName span { font-family: Flama; font-weight: 500; }');
addGlobalStyle('#NoHuluAdsPauseOnReturn { font-size: 26px; position: absolute; margin: 0px auto; width: 100%; bottom: 100px; cursor: pointer; }');
addGlobalStyle('#NoHuluAdsPauseOnReturn span { text-shadow: white 0px 0px 2px; position: relative; top: 2px; }');
addGlobalStyle('#NoHuluAdsPauseOnReturn.unchecked span { color: black; }');
addGlobalStyle('#NoHuluAdsPauseOnReturn.checked span { color: white; }');
addGlobalStyle('#NoHuluAdsClickToDismiss { font-size: 20px; position: absolute; margin: 0px auto; width: 100%; bottom: 30px; cursor: pointer; }');

function addGlobalStyle(css) {
	try {
		var elmHead, elmStyle;
		elmHead = document.getElementsByTagName('head')[0];
		elmStyle = document.createElement('style');
		elmStyle.type = 'text/css';
		elmHead.appendChild(elmStyle);
		elmStyle.innerHTML = css;
	} catch (e) {
		if (!document.styleSheets.length) {
			document.createStyleSheet();
		}
		document.styleSheets[0].cssText += css;
	}
}

function log(message) {
	console.log("[NoHuluAds] " + message);
}

function maskVideo() {
	setMask();
	log("Masking video");
	if (player.getVolume && player.getVolume() != 0) {
		player.mute();
	}
	player.parentElement.appendChild(mask);
	masked = true;
}

function unmaskVideo() {
	log("Unmasking video");
	if (player.getVolume && player.getVolume() == 0) {
		player.unMute();
	}
	player.parentElement.removeChild(mask);
	masked = false;
}

function togglePause() {
	pauseOnReturn = localStorage["NoHuluAds:pauseOnReturn"] = !pauseOnReturn;
	pauseOnReturnDiv.className = pauseOnReturn ? "checked" : "unchecked";
}

function updateMask() {
	mask.style.width = player.offsetWidth + "px";
	mask.style.height = player.offsetHeight + "px";
	mask.style.top = player.offsetTop + "px";
	mask.style.left = player.offsetLeft + "px";

	var showName = document.getElementsByClassName('show-title')[0] ? document.getElementsByClassName('show-title')[0].innerHTML : "Your show";
	showNameDiv.innerHTML = "<span>" + showName + "</span> will return in a moment.";
}

function setMask() {
	if (!maskSetup) {
		mask.id = "NoHuluAdsMask";

		showNameDiv = document.createElement('div');
		showNameDiv.id = "NoHuluAdsShowName";
		showNameDiv.innerHTML = "<span>Your show</span> will return in a moment.";

		pauseOnReturnDiv = document.createElement('div');
		pauseOnReturnDiv.id = "NoHuluAdsPauseOnReturn";
		pauseOnReturnDiv.onclick = togglePause;
		pauseOnReturnDiv.innerHTML = "<span>&#x2713;</span> Pause when the show comes back";
		pauseOnReturnDiv.className = pauseOnReturn ? "checked" : "unchecked";

		dismissDiv = document.createElement('div');
		dismissDiv.id = "NoHuluAdsClickToDismiss";
		dismissDiv.innerHTML = "(click here to dismiss)";
		dismissDiv.onclick = unmaskVideo;

		mask.appendChild(showNameDiv);
		mask.appendChild(pauseOnReturnDiv);
		mask.appendChild(dismissDiv);

		maskSetup = true;
	}
}

window.setInterval(function() {
	if (!player || !player.getCurrentState) {
		player = document.getElementById('player');
	} else {
		if (!maskSetup) {
			setMask();
		}
		updateMask();
		var currentState = player.getCurrentState().subState;
		if (currentState != lastStateSeen && currentState != "loading") {
			lastStateSeen = currentState;
			if (currentState == "content") {
				if (masked) {
					unmaskVideo();
				}
				if (pauseOnReturn) {
					player.pauseVideo();
				}
			} else {
				if (!masked) {
					maskVideo();
				}
			}
		}
	}
}, 1000);