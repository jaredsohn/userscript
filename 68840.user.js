// ==UserScript==
// @name        WoW Realm Status from Forums
// @namespace   Lasre/Lasbank of Emerald Dream (US)
// @description Displays the status of a World of Warcraft server from that server's own forum. Click "Status" to toggle tracking of the current realm, and click the result to change between colour modes.
// @include     http*://forums.worldofwarcraft.com/board.html*
// @include     http*://forums.worldofwarcraft.com/thread.html*
// @include     http*://forums.wow-europe.com/board.html*
// @include     http*://forums.wow-europe.com/thread.html*
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

(function() {
	function initial(region) {
		$("#realmstatus").remove(); // Garbage collection
		server = GM_getValue("watch") ? GM_getValue("watch").split(":")[0] : $("title").text().substr($("title").text().lastIndexOf(">") + 2).replace(String.fromCharCode(8217), "'").trim();
		$(".theader:first").append('<div id="realmstatus" style="text-align: center; margin-left: 300px;"><span id="hook">Status:</span> <span id="watch">' + (GM_getValue("watch") ? '[' + server + ']' : '') + ' </span><span id="status">Checking...</span></div>');
		
		// Toggle status colours
		$("#realmstatus #status").click(function() {
			GM_setValue("colour", 1 - GM_getValue("colour", 0));
			$("#realmstatus #status").html( colour( $("#status").text() ) );
  	});
		
		// Realm tracking
		$("#realmstatus #hook").click(function() {
			if (!GM_getValue("watch")) {
				if (confirm("Do you want to track the status of " + server + " throughout the forums?")) {
					GM_setValue("watch", server + ":" + region);
					$("#realmstatus #watch").text("[" + server + "] ");
				}
			}
			else {
				if (confirm("Stop tracking the status of " + server + "?")) {
					GM_deleteValue("watch");
					$("#realmstatus").remove(); 
					dorequest(); // Start over
				}
			}
		});
	}
	
	function colour(status) {
		if (GM_getValue("colour") == 1) {
			var c = ["L", "99FF00", "M", "FFFF33", "H", "FF9900", "F", "FF0000", "On", "99FF00"];
			for (var i=0; i<c.length; i+=2) {
				if (new RegExp("^" + c[i]).test(status)) return '<span style="color: #' + c[i+1] + '">' + status + '</span>';
			}
		}
		else {
			if (/^L|^M|^H|^On/.test(status)) return status;
			if (status == "Full, Queued") return '<span style="color: #FF0000">Full</span>, Queued';
		}
		return '<span style="color: #FF0000">Offline</span>';
	}

	function dorequest(region) {
		var w = location.pathname;
		var page = w.substring(w.indexOf("/") + 1, w.indexOf("."));

		// US
		if ((/WOW REALM FORUMS|FOROS DE LOS REINOS/.test($(".ftitle a:nth-child(2)").text()) && page == "board") || region == "US") {
			initial("US");
			
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.worldofwarcraft.com/realmstatus/status.xml',
				onload: function(responseDetails) {
	
					$(responseDetails.responseText).find("r").each(function() {
						if ($(this).attr("n") == server) {
							if ($(this).attr("s") == 1) { // Up/Down
								switch ($(this).attr("l")) {
									case "1":
										var update = colour("Low Load");
										break;
									case "2":
										var update = colour("Medium Load");
										break;
									case "3":
										var update = colour("High Load");
										break;
									case "4":
										var update = colour("Full, Queued");
								}
							}
							else var update = colour("Offline");
							
							$("#realmstatus #status").html(update);
						}
					});
					
				},
				onerror: function(responseDetails) {
					$("#realmstatus #status").text("Unable to verify (" + responseDetails.status + ")");
				}
			});
		}
		
		// EU
		if ((/Realm Forums|Forums des royaumes|Realmforen|Foros de los reinos|Игровые миры/.test($(".ftitle a:nth-child(2)").text()) && page == "board") || region == "EU") {
			initial("EU");
	
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.wow-europe.com/realmstatus/index.xml',
				onload: function(responseDetails) {
					
					$(responseDetails.responseText).find("item").each(function() {
						if ($(this).children("title").text() == server) {
							if ($(this).children("category[domain=status]").text() == "Realm Up") {
								if ($(this).children("category[domain=queue]").text() == "true") {
									var update = colour("Full, Queued");
								}
								else var update = colour("Online");
							}
							else var update = colour("Offline");
							
							$("#realmstatus #status").html(update);
						}
					});
					
				},
				onerror: function(responseDetails) {
					$("#realmstatus #status").text("Unable to verify (" + responseDetails.status + ")");
				}
			});
		}
	}
	
	dorequest( (GM_getValue("watch") ? GM_getValue("watch").split(":")[1] : "") );
}());