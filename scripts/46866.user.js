// ==UserScript==
// @name           Powerzone Monkey
// @namespace      http://userscripts.org/users/7497/
// @description    Exposes the playlist of the embedded MP3 player for MP3 download
// @include        http://www.powerzone.co.za/*
// ==/UserScript==

(function(){

	var player = document.getElementById("ep_player");
	
	var flashvars = player.getAttribute("flashvars").split("&");
	
	var playlist;
	
	for (var i = 0; i < flashvars.length; i++) {
		
		var flashvar = flashvars[i].split("=");
		
		if (flashvar[0] == "playlist") {
			playlist = flashvar[1];
			break;
		}
		
	}
	
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://" + document.domain + "/" + playlist,
		headers: {
			"User-agent": "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.8) Gecko/2009032609 Firefox/3.0.8 (.NET CLR 3.5.30729)",
			"Accept-Language": "en-us,en;q=0.5",
			"Accept-Encoding": "gzip,deflate",
			"Accept-Charset": "ISO-8859-1,utf-8;q=0.7,*;q=0.7"
		},
		onload: function(response) {
			var responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
			
			var entries = responseXML.getElementsByTagName('track');
			
			if (entries.length > 0) {
				
				var ul = document.createElement("ul");
				document.getElementById("flashcontent").parentNode.appendChild(ul);
				
				var title, creator, location;
				
				for (var i = 0; i < entries.length; i++) {
					title = entries[i].getElementsByTagName('title')[0].textContent;
					creator = entries[i].getElementsByTagName('creator')[0].textContent;
					location = entries[i].getElementsByTagName('location')[0].textContent;
					
					creatorId = entries[i].getElementsByTagName('location')[0].textContent.match("[\.]([0-9]{4})[\.]")[1];
					
					var li = document.createElement("li");
					ul.appendChild(li);
					li.innerHTML = "<a href=\"http://www.powerzone.co.za/?w=epk&b=" + creatorId + "\">" + creator + "<a/> - " + title + " [<a href=\"" + location + "\">Download</a>]";
					
				}
			
			}

		}
	});

})();