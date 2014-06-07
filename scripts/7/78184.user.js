// ==UserScript==
// @name           Clean Loopy For Youtube
// @namespace      Rowen
// @description    Displays a link below YouTube videos to enable/disable auto replay.
// @include        *://*.youtube.com/watch?*v=*
// @include        *://*.youtube.com/watch?*videos=*
// @include        *://*.youtube.com/watch#!*videos=*
// @include        *://*.youtube.com/watch#!*v=*
// @include        *://*.youtube.com/watch?*NR=*
// @match        *://*.youtube.com/watch?*v=*
// @match        *://*.youtube.com/watch?*videos=*
// @match        *://*.youtube.com/watch#!*videos=*
// @match        *://*.youtube.com/watch#!*v=*
// @match        *://*.youtube.com/watch?*NR=*
// @credits        QuaraMan (embed code) .Paradise (List Loop Support)
// @version		1.7
// ==/UserScript==

myScript = function() {

	var ytLoop = false;
	var ytPlayList;
	var ytPLIndex;
	var lpButton = "yt-uix-button yt-uix-button-text yt-uix-button-size-default yt-uix-tooltip yt-uix-button-empty actionable"; // Button stuff
	var lpConOff = "LoopyOff"
	var lpConOn = "LoopyOn";

	loopy = document.createElement("button");
	loopy.id = "eLoopy";
	loopy.setAttribute("onClick", "LoopyOnOff(); return false;");
	loopy.setAttribute("class", lpButton);
	loopy.setAttribute("role", "button");
	loopy.setAttribute("data-button-toggle", "true");
	loopy.setAttribute("type", "button");
	loopy.setAttribute("data-tooltip-text", "Enable auto replay")
	loopy.id = "loopyButton";

	a = document.createElement("span");
	 a.innerHTML = '<img height=18 width=30 id="loopyContent" class="LoopyOff" src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Loopy"/><span class="yt-uix-button-valign"/>';


	loopy.appendChild(a);

	window.setTimeout(function() { initLoopy(true); }, 2500);
	window.setTimeout(function() { initLoopy(false); }, 3000);
	window.setTimeout(function() { initLoopy(false); }, 3500);

		function initLoopy(addElement) {
			if (addElement) { document.getElementById("watch7-sentiment-actions").appendChild(loopy); }
			ytPlayer = document.getElementById("movie_player");
			ytPlayer.addEventListener("onStateChange", "onPlayerStateChange");
			}

	onPlayerStateChange = function(newState) {
		if (ytLoop && newState == "0"){
				window.setTimeout(function() { ytPlayer.playVideo(); }, 60);
			}
	}

	LoopyOnOff = function() {
		if (ytLoop) {
			document.getElementById("loopyButton").setAttribute("data-tooltip-text", "Enable auto loop");
			document.getElementById("loopyButton").setAttribute("data-button-toggle", "true");
			document.getElementById("loopyContent").setAttribute("class", lpConOff);

			ytLoop = false;
		} else {
			document.getElementById("loopyButton").setAttribute("data-tooltip-text", "Disable auto loop");
			document.getElementById("loopyButton").setAttribute("data-button-toggle", "false");
			document.getElementById("loopyContent").setAttribute("class", lpConOn);
			ytLoop = true;
		}
	}

	function getCookie(name) {
		var results = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		if (results) {
			return unescape(results[2]);
		} else {
			return null;
		}
	}

	function setCookie(name, value) {
		document.cookie = name + "=" + escape(value);
	}

	if (typeof GM_addStyle == "undefined") {
		GM_addStyle = function(text) {
			var head = document.getElementsByTagName("head")[0];
			var style = document.createElement("style");
			style.setAttribute("type", "text/css");
			style.textContent = text;
			head.appendChild(style);
		}
	}

	GM_addStyle("						\
		#loopyButton {\
		border: 0px none;} \
		.yt-uix-button-panel:hover \
		#loopyButton {\
		border: 1px solid;\
		border-color: #C6C6C6;}\
 		img.LoopyOff{\
		background: url(\"http://i.imgur.com/jlhKt.png\") -0px -0px no-repeat transparent !important;\
		height: 18px;\
		width: 30px;}\
		img.LoopyOn{\
		background: url(\"http://i.imgur.com/jlhKt.png\") -0px -18px no-repeat transparent !important;\
		height: 18px;\
		width: 30px;}"		

	);
};

document.body.appendChild(document.createElement("script")).innerHTML = "("+myScript+")()";