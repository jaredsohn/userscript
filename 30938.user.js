// ==UserScript==
// @name           BLIP Decode links
// @namespace      http://userscripts.org/users/21431
// @include        http://*blip.pl/*
// @version        0.2
// ==/UserScript==

window.addEventListener('load', function() {
	var statuses = {}
	var dms = {};

	function downloadStatus(id) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', "/statuses/"+id, false);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.send(null);
		
		var msg = eval('(' + xhr.responseText + ')');
		statuses[id] = msg;
		return msg;
	}

	function downloadDM(id) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', "/directed_messages/"+id, false);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.send(null);
		
		var msg = eval('(' + xhr.responseText + ')');
		dms[id] = msg;
		return msg;
	}

	function changeTitle(link, title) {
		if (title.indexOf("blip.pl/s/") >= 0) {
			var id = parseInt(title.substr(17));
			var msg = statuses[id]?statuses[id]:downloadStatus(id);
			console.log(id, msg.user_path.substr(7)+": "+msg.body);
			link.title =  msg.user_path.substr(7)+": "+msg.body;
		} else if (title.indexOf("blip.pl/statuses/") >= 0) {
			var id = parseInt(title.substr(24));
			var msg = statuses[id]?statuses[id]:downloadStatus(id);
			console.log(id, msg.user_path.substr(7)+": "+msg.body);
			link.title =  msg.user_path.substr(7)+": "+msg.body;
		} else if (title.indexOf("blip.pl/dm/") >= 0) {
			var id = parseInt(title.substr(18));
			var msg = dms[id]?dms[id]:downloadDM(id);
			console.log(id, msg.user_path.substr(7)+" > "+msg.recipient_path.substr(7)+": "+msg.body);
			link.title = msg.user_path.substr(7)+" > "+msg.recipient_path.substr(7)+": "+msg.body;
		} else if (title.indexOf("blip.pl/directed_messages/") >= 0) {
			var id = parseInt(title.substr(33));
			var msg = dms[id]?dms[id]:downloadDM(id);
			console.log(id, msg.user_path.substr(7)+" > "+msg.recipient_path.substr(7)+": "+msg.body);
			link.title = msg.user_path.substr(7)+" > "+msg.recipient_path.substr(7)+": "+msg.body;
//		} else if (title.indexOf("blip.pl/pm/") >= 0) {
//			var id = parseInt(title.substr(18));
		}
	}

	function Unlink() {
		var links = document.evaluate('//a[@title and not(contains(@class, "decoded")) and contains(@href, "rdir.pl")]', document, null, 6, null);
		var link, _i=0;
		while (link = links.snapshotItem(_i++)) {
			var title = link.title;
			console.log(title)
			link.textContent = title;
			link.className += " decoded"
			
			window.setTimeout(changeTitle, 1, link, title);
		}
	}

	var interval = window.setInterval(Unlink, 1000);
	Unlink();


}, true);