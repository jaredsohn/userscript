// ==UserScript==
// @name SoundCloud Extra Download Links
// @include http://soundcloud.com/*
// @description [SoundCloud] add download links for get sound files
// ==/UserScript==

(function(unsafeWindow) {
	var tracks = {};
	if (
		unsafeWindow.SC &&
		unsafeWindow.SC.clientDB &&
		typeof unsafeWindow.SC.clientDB.getTracks === "function"
	) tracks = unsafeWindow.SC.clientDB.getTracks();
	else {
		var bufferTracks = [];
		var scripts = document.getElementsByTagName("script");
		for (var i = 0; i < scripts.length; ++i) {
			var script_str = scripts[i].textContent.replace(/^\s+|\s+$/g, "");
			var q = "window.SC.bufferTracks.push";
			if (script_str.indexOf(q) === 0) {
				eval(script_str.replace(q, "bufferTracks.push"));
			}
		}
		for (var i = 0; i < bufferTracks.length; ++i) {
			tracks[bufferTracks[i].id] = bufferTracks[i];
		}
	}
	var wrapper = document.createElement("div");
	for (var i in tracks) {
		var track = tracks[i];
		var a = document.createElement("a");
		a.href = track.streamUrl;
		a.textContent = track.title;
		wrapper.appendChild(a);
	}
	if (wrapper.hasChildNodes()) {
		decorate(wrapper);
		append(wrapper) ||
		document.body.insertBefore(wrapper, document.body.firstChild);
	}
	function decorate(wrapper) {
		for (var i = 0; i < wrapper.childNodes.length; ++i) {
			var a = wrapper.childNodes[i];
			a.style.display = "inline-block";
			a.className = "download icon-button";
			var span = document.createElement("span");
			span.appendChild(a.lastChild);
			a.appendChild(span);
		}
		var clearfix = document.createElement("br");
		clearfix.style.clear = "both";
		wrapper.appendChild(clearfix);
		wrapper.id = "userjs-extra-download-links";
	}
	function append(wrapper) {
		var append_pos = document.getElementById("main-content-inner");
		if (!append_pos) return false;
		var prepend = true;
		prepend ?
		append_pos.insertBefore(wrapper, append_pos.firstChild) :
		append_pos.appendChild(wrapper);
		return true;
	}
})(this.unsafeWindow || window);
