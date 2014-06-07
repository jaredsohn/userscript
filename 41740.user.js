// ==UserScript==
// @name           last.fm/Meebo Now Playing
// @namespace      http://userscripts.org/users/60424
// @include        http://www.meebo.com/
// ==/UserScript==

// Type your last.fm username between the quotes below
var username = "";

var listeningEntry, statusMenu;

var iconUrl = "http://www.contrib.andrew.cmu.edu/~dfreeman/listen.png";

checkLogin = function() {
	if (username == "") {
		alert("For Now Playing to work, you have to enter your last.fm username into the GreaseMonkey script!");
	} else if (isOnline()) {
		setTimeout(go, 3000);
	} else {
		setTimeout(checkLogin, 2000);
	}
};

go = function() {
	addNowListening();
	getCurrentTrack();
	setInterval(checkKickout, 500);
}

//TODO There must be a better way of calculating this...
isOnline = function() {
	return 	unsafeWindow.gEventMgr &&
		unsafeWindow.gEventMgr.getState() == "im" &&
		unsafeWindow.gConsoleMgr && 
		unsafeWindow.gConsoleMgr.m_pageMain && 
		unsafeWindow.gConsoleMgr.getMainPage().m_mainConsoleContainer &&
		unsafeWindow.gConsoleMgr.getMainPage().getMainContainer().m_presenceMenu &&
		unsafeWindow.gConsoleMgr.getMainPage().getMainContainer().m_presenceMenu.m_menuBody.m_numItems > 3;
}

checkKickout = function() {
	var menuItems = statusMenu.m_menuBody.m_items;
	var kicked = true;
	for (i in menuItems) {
		if (menuItems[i] == listeningEntry)
			kicked = false;
	}
	if (kicked)
		addNowListening();
}

addNowListening = function() {
	if (!statusMenu)
		statusMenu = unsafeWindow.gConsoleMgr.getMainPage().getMainContainer().m_presenceMenu;
	listeningEntry = statusMenu.addMenuItem(
		"Now Listening", 
		iconUrl, 
		"customAvailable", 
		false, 
		statusMenu.m_menuBody.m_items['away']
	);
	listeningEntry.m_element.style.borderTop = "1px solid";
	listeningEntry.m_element.style.height = (listeningEntry.m_height - 1) + "px";
};

getCurrentTrack = function() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user="+username+"&api_key=852904056c6cb6b58ff843e3674c4b2a&limit=1",
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/xml,text/xml',
			'If-Modified-Since': new Date(0)
		},
		onload: function(response) {
			
			if (unsafeWindow.gEventMgr.m_state == "im") {
				var parser=new DOMParser();
				var doc=parser.parseFromString(response.responseText,"text/xml");
				var track = doc.getElementsByTagName("track")[0];
				if (track.getAttribute("nowplaying") == "true")
					var title = "Now Listening: " + doc.getElementsByTagName("name")[0].childNodes[0].nodeValue + " (" + doc.getElementsByTagName("artist")[0].childNodes[0].nodeValue + ")";
				else
					var title = "Now Listening";
				if (statusMenu.getTitle() == "Now Listening")
					unsafeWindow.meeboApp.setStatusMessage(title);
				else if (unsafeWindow.gLogon.getLogons()[0].getStatusMessage().indexOf("Now Listening") == 0)
					unsafeWindow.meeboApp.setStatusMessage("");
			}
			setTimeout(getCurrentTrack, 2000);
		}
	});
};

checkLogin();
