// ==UserScript==
// @name           Loopy for YouTube
// @namespace      CDM & MDC
// @description    Displays a link below YouTube videos to enable/disable auto replay.
// @include        http://*.youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*
// @credits        QuaraMan (embed code)
// ==/UserScript==

myScript = function() {

	var ytLoop = false;
	var ytPlayList;
	var ytPLIndex;

	loopy = document.createElement("div");
	loopy.id = "eLoopy";

	a = document.createElement("label");
	a.id = "eOnOff"; a.innerHTML = "Loop"; a.title = "Enable auto replay";
	a.setAttribute("onClick", "LoopyOnOff(); return false;");
	a.setAttribute("class", "LoopyOff");

	if (window.location.href.toLowerCase().indexOf("feature=playlist") > 0) {
		a.innerHTML = "LList";

		urlArgs = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < urlArgs.length; i++) {
			arg = urlArgs[i].split('=');
			if (arg[0].toLowerCase() == "p") {
				ytPlayList = arg[1];
			} else if (arg[0].toLowerCase() == "index") {
				ytPLIndex = parseInt(arg[1])+1;
			}
		}

		if(ytPlayList == getCookie("LoopyPL")) {
			a.title = "Disable auto replay";
			a.setAttribute("class", "LoopyOn");
			ytLoop = true;
		}
	}

	loopy.appendChild(a);

	window.setTimeout(function() { initLoopy(true); }, 500);
	window.setTimeout(function() { initLoopy(false); }, 1500);
	window.setTimeout(function() { initLoopy(false); }, 3500);

	function initLoopy(addElement) {
		if (addElement) { document.getElementById("watch-video").appendChild(loopy); }
		ytPlayer = document.getElementById("movie_player");
		ytPlayer.addEventListener("onStateChange", "onPlayerStateChange");
	}

	onPlayerStateChange = function(newState) {
		if (ytLoop && newState == "0") {
			if (typeof ytPlayList != "undefined") {
				if (ytPLIndex == document.getElementById("playlistVideoCount_PL").innerHTML) {
					var url = document.getElementById("playlistRow_PL_0").getElementsByTagName("a")[0].href + "&playnext=1";
					window.setTimeout(function() { window.location = url}, 60);
				}
			} else {
				window.setTimeout(function() { ytPlayer.playVideo(); }, 60);
			}
		}
	}

	LoopyOnOff = function() {
		if (ytLoop) {
			if (typeof ytPlayList != "undefined") setCookie("LoopyPL", null);
			document.getElementById("eOnOff").title = "Enable auto replay";
			document.getElementById("eOnOff").setAttribute("class", "LoopyOff");
			ytLoop = false;
		} else {
			if (typeof ytPlayList != "undefined") setCookie("LoopyPL", ytPlayList);
			document.getElementById("eOnOff").title = "Disable auto replay";
			document.getElementById("eOnOff").setAttribute("class", "LoopyOn");
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
		#eLoopy {					\
			width: 28px;				\
			margin-left: auto;			\
			text-align: center;			\
			background: #EFEFEF;			\
			border-left: #B1B1B1 1px solid;		\
			border-right: #B1B1B1 1px solid;	\
			border-bottom: #B1B1B1 1px solid;	\
			padding: 1px 4px 1px 4px;		\
			margin-bottom: 5px; }			\
		#eOnOff {					\
			font-weight: bold;			\
			text-decoration: none;			\
  			-moz-user-select: none;			\
   			-khtml-user-select: none;		\
   			user-select: none; }			\
		.LoopyOff {					\
			color: grey !important; }		\
		.LoopyOff:hover {				\
			color: black !important; }		\
		.LoopyOn {					\
			color: crimson !important; }"
	);
};

document.body.appendChild(document.createElement("script")).innerHTML = "("+myScript+")()";
