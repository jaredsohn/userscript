// ==UserScript==
// @name YouTube MAX
// @description Playing at the highest quality and add a loop button.
// @include http://*.youtube.com/watch*
// @source http://userscripts.org/scripts/show/109485
// @date 2011/8/8
// ==/UserScript==

mLoopy = function () {
	var ytLoop = false;
	var ytPlayList;
	var ytPLIndex;
	loopy = document.createElement("div");
	loopy.id = "eLoopy";
	a = document.createElement("label");
	a.id = "eOnOff";
	a.innerHTML = "Loop";
	a.title = "Enable auto replay";
	a.setAttribute("onClick", "LoopyOnOff(); return false;");
	a.setAttribute("class", "LoopyOff");
	if (window.location.href.toLowerCase().indexOf("list") > 0) {
		a.innerHTML = "LList";
		urlArgs = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0; i < urlArgs.length; i++) {
			arg = urlArgs[i].split('=');
			if (arg[0].toLowerCase() == "list") {
				ytPlayList = arg[1];
			} else if (arg[0].toLowerCase() == "index") {
				ytPLIndex = parseInt(arg[1]) + 1;
			}
		}
		if (ytPlayList == getCookie("LoopyPL")) {
			a.title = "Disable auto replay";
			a.setAttribute("class", "LoopyOn");
			ytLoop = true;
		}
	}
	loopy.appendChild(a);
	window.setTimeout(function () { initLoopy(true); }, 1000);
	window.setTimeout(function () { initLoopy(false); }, 1500);
	window.setTimeout(function () { initLoopy(false); }, 2000);

	function initLoopy(addElement) {
		if (addElement) {
			document.getElementById("watch-actions").appendChild(loopy);
		}
		ytPlayer = document.getElementById("movie_player");
		ytPlayer.addEventListener("onStateChange", "onPlayerStateChange");
	}
	onPlayerStateChange = function (newState) {
		if (ytLoop && newState == "0") {
			if (typeof ytPlayList != "undefined") {
				if (ytPLIndex == document.getElementById("playlistVideoCount_PL").innerHTML) {
					var url = document.getElementById("playlistRow_PL_0").getElementsByTagName("a")[0].href + "&playnext=1";
					window.setTimeout(function () {
						window.location = url
					}, 60);
				}
			} else {
				window.setTimeout(function () {
					ytPlayer.playVideo();
				}, 60);
			}
		}
	}
	LoopyOnOff = function () {
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
		GM_addStyle = function (text) {
			var head = document.getElementsByTagName("head")[0];
			var style = document.createElement("style");
			style.setAttribute("type", "text/css");
			style.textContent = text;
			head.appendChild(style);
		}
	}
	GM_addStyle("						\
		#eLoopy {					\
			width: 40px;				\
			margin-left: 11px;			\
			height: 19px;				\
			text-align: center;			\
			-webkit-border-radius: 3px;		\
			-moz-border-radius: 3px;		\
			border-radius: 3px;			\
			background: -moz-linear-gradient(center top , #FFFFFF, #EFEFEF) repeat scroll 0 0 #F6F6F6; \
			border: #CCCCCC 1px solid;		\
			padding: 2px 4px 2px 4px;		\
			font: 12px Arial,Helvetica,sans-serif;	\
			float: right;				\
			font-size: 100%; }	                \
		#eOnOff {					\
			display: inline-block;			\
			background:none repeat scroll 0 0 transparent;\
			border:0 none;				\
			font-size:100%;				\
			margin:0;				\
			outline:0 none;				\
			padding:0;				\
			line-height:1.6666em;			\
			virtical-align: middle; 		\
			text-decoration: none;			\
  			-moz-user-select: none;			\
   			-khtml-user-select: none;		\
   			user-select: none; }			\
		#eLoopy:hover {					\
			-moz-box-shadow: 0 0 3px #999999;	\
			border-color: #999999;			\
			background: -moz-linear-gradient(center top , #FFFFFF, #EBEBEB) repeat scroll 0 0 #F3F3F3; } \
		.LoopyOff {					\
			color: #525252 !important; }		\
		.LoopyOff:hover {				\
			color: grey !important; }		\
		.LoopyOn {					\
			color: crimson !important; }		\
		.LoopyOn:hover {				\
			color: grey !important; }");
};
document.body.appendChild(document.createElement("script")).innerHTML = "(" + mLoopy + ")()";
document.getElementById("content").setAttribute("class", "watch-wide");
document.getElementById("watch-video").setAttribute("class", "wide");
(function play() {
	try {
		var player = document.getElementById("movie_player");
		if(player.getAvailableQualityLevels()[0]=="highres"){
			player.setPlaybackQuality(player.getAvailableQualityLevels()[1]);
		}else{
			player.setPlaybackQuality(player.getAvailableQualityLevels()[0]);
		}
	} catch(error) {
		window.setTimeout(function () { play(); }, 200);
	}
})();