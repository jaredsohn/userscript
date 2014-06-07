// ==UserScript==
// @name          YouTube Deflashify
// @namespace     http://userscripts.org/users/vltl
// @description	  Replaces YouTube player with native player
// @version       1.1.3
// @include       http://youtube.com/watch?*
// @include       http://*.youtube.com/watch?*
// @include       https://youtube.com/watch?*
// @include       https://*.youtube.com/watch?*
// @run-at        document-start
// ==/UserScript==
// NOTE: MUST use wildcard to match subdomains (e.g. jp.youtube.com)

////////////////////////////////////////////////////////////////////////////////
// Convenience/misc code.

// make sure we're running at document-start (tampermonkey scripts can't do this?)
if ('loading' != document.readyState)
	alert("WARNING: Script starting late... document.readyState: " + document.readyState);

// get prefix (e.g. http://, https://)
var prefix = window.location.protocol + "//";
var storageKey = "yt-deflashify-prefs";
var oldDocumentCreateElement = document.createElement;

// implement String.startsWith (lifted from http://stackoverflow.com/a/4579228)
if(typeof String.prototype.startsWith != 'function')
	String.prototype.startsWith = function (str) { return this.lastIndexOf(str, 0) === 0; };

// reads and parses a query string
function readQueryString(qs)
{
	qs = qs.split("+").join(" ");
	var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;
	while(tokens = re.exec(qs)) params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	return params;
}

function getPreferences()
{
	var prefsObject = {};

	// load data
	prefsObject.data = JSON.parse(localStorage.getItem(storageKey));
	if(prefsObject.data == null) prefsObject.data = {};

	prefsObject.get = function(key, defValue)
	{
		if(this.data[key])
			return this.data[key];
		else
			return defValue;
	};

	prefsObject.set = function(key, value)
	{
		this.data[key] = value;
		this.save();
	};

	prefsObject.save = function()
	{
		localStorage.setItem(storageKey, JSON.stringify(this.data));
	};

	return prefsObject;
}

var preferences = getPreferences();

////////////////////////////////////////////////////////////////////////////////
// Anti-HTML5 player code
// --
// Because of HTML5 video quirkiness, we must not let the HTML5 video element
// get created in the first place, or else it may buffer/play in the background.

// hookCreateElement()
//  hooks create element
function hookCreateElement()
{
	var oldDocumentCreateElement = document.createElement;
	document.createElement = function(tag)
	{
		var elem = oldDocumentCreateElement.apply(document, arguments);
		if(tag == "video") return null; // nope :)
		return elem;
	}
}

// jsInject(func)
//  injects js into the page
// parameters
//  func: function/closure containing hooking code
function jsInject(func)
{
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.textContent = '(' + func.toString() + ')()';
	var target = document.getElementsByTagName ('head')[0] || document.body || document.documentElement;
	target.insertBefore(script, target.firstChild);
}

// This is really stupid, but it is necessary for Firefox sometimes.
var waitForDomInterval = setInterval
(
	function ()
	{
		var domPresentNode;
		if(typeof document.head == "undefined") domPresentNode = document.querySelector ("head, body");
		else domPresentNode = document.head;

		if(domPresentNode)
		{
			clearInterval(waitForDomInterval);
			jsInject(hookCreateElement);
		}
	}, 1
);


////////////////////////////////////////////////////////////////////////////////
// YouTube URL fetching code
// --
// This code handles grabbing URLs + info for playback.

// getYouTubeVideoInfo(video_id)
//  gets video info
// parameters
//  video_id: string containing video id
// returns
//  javascript object containing parsed get_video_info
function getYouTubeVideoInfo(video_id)
{
	var el_types = ["&el=embedded", "&el=detailpage", "&el=vevo", ""];
	for(var i in el_types)
	{
		var request = new XMLHttpRequest();
		var requesturl = prefix+"www.youtube.com/get_video_info?&video_id=" + video_id + el_types[i] + "&ps=default&eurl=&gl=US&hl=en";
		request.open('GET', requesturl, false);
		request.send(); // synchronous requests! don't tell mom

		if(request.status === 200)
		{
			var q = readQueryString(request.responseText);

			// if it has a token it's good enough
			if(q.token)
				return q;
		}
	}

	// can't get vidya info
	return null;
}

// getYouTubeVideoURL(video_info, quality)
//  gets video url
// parameters
//  video_info: string containing video id
//  quality: optional, contains quality string (like best, worst, large,
//           medium, small.)
// returns
//  string containing url to video resource
function getYouTubeVideoUrl(video_info, quality)
{
	if(video_info.conn && video_info.conn.startsWith('rtmp')) return video_info.conn;
	else if(video_info.url_encoded_fmt_stream_map && video_info.url_encoded_fmt_stream_map.length > 1)
	{
		var url_data = [];
		var url_data_strs = video_info.url_encoded_fmt_stream_map.split(',');
		var url_data_sort_func = (function(a,b) { return b.itag - a.itag; });
		var url_data_get_quality = (function(quality) {
			for(var i in url_data)
			{
				var url_info = url_data[i];
				if(url_info.quality == quality)
					return url_info;
			}
			return url_data[0];
		});
		for(var i in url_data_strs)
		{
			var url_info = readQueryString(url_data_strs[i]);
			
			if(url_info.sig)
				url_info.url += '&signature=' + url_info.sig;

			if(url_info.url && url_info.itag)
				url_data.push(url_info);
		}
		url_data.sort(url_data_sort_func);

		if(quality != undefined && quality != null)
		{
			if(quality == "best") return url_data[0];
			else if(quality == "worst") return url_data[url_data.length - 1];
			else return url_data_closest_quality(quality);
		}
		else return url_data;
	}
	else console.log("Don't understand video info.");

	return;
}

////////////////////////////////////////////////////////////////////////////////
// UI code

function createUixButtonGroup(children)
{
	if(children.length == 0) return null;
	else if(children.length == 1) return children[0];

	var buttonGroup = document.createElement("span");
	buttonGroup.className = "yt-uix-button-group";

	for(var i in children)
	{
		if(i == 0) children[i].className += " start";
		if(i == children.length - 1) children[i].className += " end";
		buttonGroup.appendChild(children[i]);
	}

	return buttonGroup;
}

function createUixButton(text, onclick, classes)
{
	var button = document.createElement("button");
	button.className = "yt-uix-button yt-uix-button-default";
	if(classes) button.className += " " + classes;
	button.setAttribute("role", "button");
	var buttonContent = document.createElement("span");
	buttonContent.className = "yt-uix-button-content";
	buttonContent.appendChild(document.createTextNode(text));
	button.appendChild(buttonContent);
	button.onclick = onclick;

	return button;
}
function createUixDropdown(text, onclick)
{
	var button = document.createElement("button");
	button.className = "yt-uix-button yt-uix-button-default yt-uix-expander-collapsed";
	button.setAttribute("role", "button");

	var buttonContent = document.createElement("span");
	buttonContent.className = "yt-uix-button-content";
	buttonContent.appendChild(document.createTextNode(text));

	var buttonArrow = document.createElement("img");
	buttonArrow.className = "yt-uix-button-arrow";
	buttonArrow.src = "//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" // this url is probably going to change...
	buttonContent.appendChild(buttonArrow);
	button.appendChild(buttonContent);
	button.onclick = onclick;

	return button;
}
function createDropdownOnClickHandler(createDropdown, showHideCallback)
{
	var x = 0;
	var y = 0;

	var saveMousePos = function(e) {
		x = e.clientX;
		y = e.clientY;
	};
	document.addEventListener("mousemove", saveMousePos, false);

	var closeDropdown = function() {
		var old = this.getAttribute("data-old-class");
		this.className = old;
		this.removeAttribute("data-old-class");
		document.body.removeChild(this.dropdown);

		if(showHideCallback)
			showHideCallback(false);
	};

	var openDropdown = function() {
		this.setAttribute("data-old-class", this.className);
		this.className += " yt-uix-button-toggled";

		var thisPass = this;
		this.dropdown = createDropdown(function() { closeDropdown.call(thisPass); });
		this.dropdown.style.position = "absolute";
		this.dropdown.style.left = (x + document.body.scrollLeft) + "px";
		this.dropdown.style.top = (y + 16 + document.body.scrollTop) + "px";
		document.body.appendChild(this.dropdown);

		if(showHideCallback)
			showHideCallback(true);
	};

	var onClickCallback = function() {
		var old = this.getAttribute("data-old-class");
		if(old == null || old == "")
			openDropdown.call(this);
		else
			closeDropdown.call(this);
	}
	return onClickCallback;
}
function createListItem(node, onclick)
{
	var listItem = document.createElement("li");
	listItem.appendChild(node);
	listItem.onclick = onclick;
	return listItem;
}
function createListButton(text, onclick)
{
	return createListItem(createUixButton(text, onclick), function() {});
}

////////////////////////////////////////////////////////////////////////////////
// Player code

function createFormatDropdown(videoInfo, currentCallback, switchCallback, showHideCallback)
{
	return createUixDropdown("Formats", createDropdownOnClickHandler(function(close)
	{
		var dropdown = document.createElement("ul");
		var current = currentCallback();

		dropdown.style.background = "#fff";
		dropdown.style.width = "200px";

		for(var i in videoInfo)
		{
			var videoEntry = videoInfo[i];
			videoEntry.i = i;

			if(videoEntry.url)
			(function(value) { // javascript is really annoying
				var formatText = videoEntry.quality + ": " + videoEntry.type.split(";")[0];
				if(i == current)
					formatText = "* " + formatText;
				
				 var formatButton = createListButton(formatText, function() { switchCallback(value); close(); });
				formatButton.firstChild.style.width = "100%";
				dropdown.appendChild(formatButton);
			})(i);
		}
		return dropdown;
	}, showHideCallback));
}

function createHtml5Player(videoEntries, buttonBox)
{
	var currentFmt = 0;
	var setTimeTo = null;
	var html5Player = oldDocumentCreateElement.call(document, "video");

	// enable browser controls (and autoplay, for now)
	html5Player.controls = true;
	html5Player.autoplay = true;
	html5Player.addEventListener("timeupdate", function()
	{
		if(setTimeTo)
		{
			html5Player.currentTime = setTimeTo;
			setTimeTo = null;
		}
	}, false);

	// size
	html5Player.width = "854";
	html5Player.height = "480";

	// url
	html5Player.src = videoEntries[currentFmt].url;

	// <center> container
	// Replaced with div for the new layout.
	var centerBox = document.createElement("div");
	centerBox.appendChild(html5Player);

	if(buttonBox)
	{
		var fullscreenButton = createUixButton("Fullscreen", function()
		{
			if (html5Player.mozRequestFullScreen)
				html5Player.mozRequestFullScreen();
			else if (html5Player.webkitRequestFullScreen)
				html5Player.webkitRequestFullScreen();
		});
		var pluginModeButton = createUixButton("Plugin Mode", function()
		{
			preferences.set("player", "native");
			window.location.reload(true);
		});
		var formatDropdown = createFormatDropdown(videoEntries, function() { return currentFmt; }, function(fmt)
		{
			var oldTime = html5Player.currentTime;
			currentFmt = fmt;
			html5Player.src = videoEntries[currentFmt].url;
			setTimeTo = oldTime;
		});
		buttonBox.appendChild(createUixButtonGroup([fullscreenButton, pluginModeButton, formatDropdown]));
	}

	return centerBox;
}

function createNativePlayer(videoEntries, buttonBox)
{
	var currentFmt = 0;
	var nativePlayer = document.createElement('object');
	var use = { VLC_API: false };

	// size
	nativePlayer.width = "854";
	nativePlayer.height = "480";

	nativePlayer.addEventListener("load", function()
	{
		if(nativePlayer.getVersion())
			alert("Detected VLC mozilla plugin.");
	});

	// url + mimetype
	nativePlayer.src = videoEntries[currentFmt].url;
	nativePlayer.type = "video/mpeg"; // not really important

	// <center> container
	var centerBox = document.createElement("center");
	centerBox.appendChild(nativePlayer);

	if(buttonBox)
	{
		var html5ModeButton = createUixButton("HTML5 Mode", function()
		{
			preferences.set("player", "html5");
			window.location.reload(true);
		});
		var formatDropdown = createFormatDropdown(videoEntries,
		function() { return currentFmt; }, // current callback
		function(fmt) // switch callback
		{
			currentFmt = fmt;
			nativePlayer.src = videoEntries[currentFmt].url;
		},
		function(beingShown) // show/hide callback
		{
			centerBox.style.visibility = beingShown ? "hidden" : "visible";
		});
		buttonBox.appendChild(createUixButtonGroup([html5ModeButton, formatDropdown]));
	}

	return centerBox;
}

var playerConstructors = {
	"html5": createHtml5Player,
	"native": createNativePlayer
}

////////////////////////////////////////////////////////////////////////////////
// Payload
// --
// where everything is ran, and the native player is loaded

document.addEventListener("DOMContentLoaded", function()
{
	document.removeEventListener("DOMContentLoaded", arguments.callee, false);

	// install create element hook
	//jsInject(hookCreateElement);

	// we need to go wider
	document.getElementById("page").className += " watch-wide";
	document.getElementById("watch7-video").className += " medium";

	// sabotage youtube (this prevents flash player)
	var watchvid = document.getElementById("watch7-video");
	if(watchvid && watchvid.parentNode) watchvid.parentNode.removeChild(watchvid);
	else alert("WARNING: Couldn't find 'watch7-video.'");

	// get video information
	var videoId = readQueryString(document.location.search).v;
	var videoInfo = getYouTubeVideoInfo(videoId);
	var videoEntries = getYouTubeVideoUrl(videoInfo);

	// create our player
	var watchVideoContainer = document.getElementById("watch7-video-container");
	var headlineUserInfo = document.getElementById("watch7-headline-user-info");

	if(watchVideoContainer)
	{
		var player = preferences.get("player", "html5");
		if(!playerConstructors[player]) player = "html5";
		preferences.set("player", player);

		watchVideoContainer.appendChild((playerConstructors[player])(videoEntries, headlineUserInfo));
	}
	else alert("WARNING: Couldn't find 'watch-video-container.'");
}, false);
