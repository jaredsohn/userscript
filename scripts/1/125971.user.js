// Tested in Chrome


// ==UserScript==
// @name           Make Grooveshark free
// @version        0.2.3
// @namespace      http://grooveshark.com
// @description    Removes the pay thingy and the annoying notifications in the bottom right from Grooveshark
// @include        http://*grooveshark.com/*
// ==/UserScript==

(function() {
	var d = document;
	var q = function (id) { return d.getElementById(id) };
	var rm = function(id) { var e = q(id); e && e.parentNode.removeChild(e); };
	var isPaused = function() { 
		try { 
			return GS.Controllers.PlayerController.instance().isPaused;
		} catch(e) {}
		return pb.className.indexOf(" pause") < 0;
	};
	var wasInterrupted = function() {
		return mustResume && isPaused() && !isLoading();
	};
	var isLoading = function() {
		try {
			return GS.Controllers.PlayerController.instance().isLoading;
		} catch(e) {}
		return pb.className.indexOf("buffering") >= 0;
	};
	var pb;
	var mustResume = true;
	var triggered = false;
	
	setInterval(function() {
		rm("lightbox_overlay");
		rm("lightbox_wrapper");
		rm("notifications");
	}, 500);
	
	var awaitInit = setInterval(function() {
		pb = q("player_play_pause");
		if (!pb) return;
		
		var setPermissions = function() {
			try {
				GS.user.subscription.canListenUninterrupted = function() { return true };
			} catch(e) {}
		};
		
		if (typeof GS != "undefined") {
			setPermissions();
		} else {
			var s = d.createElement("script");
			s.appendChild(d.createTextNode("(" + setPermissions + ")();"));
			(document.body || document.head || document.documentElement).appendChild(s);
		}
		// actually simply executing / injecting setPermissions should suffice to solve the "interrupt" problem,
		// however do retain code below as fallback
		
		pb.addEventListener("mouseup", function(e) {
			mustResume = !triggered && pb.className.indexOf(" pause") < 0;
		});
			
		setInterval(function() {
			if (!wasInterrupted()) return;
			
			try {
				GS.Controllers.PlayerController.instance().player.resumeSong();
				return;
			} catch(e) {}
			triggered = true;
			pb.click();
			triggered = false;
		}, 1250);
		
		d.addEventListener("keyup", function(e) {
			if (e.keyCode == 32) {
				mustResume = !isPaused();
			}
		});
		
		clearInterval(awaitInit);
	}, 1000);
})();