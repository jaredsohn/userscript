// ==UserScript==
// @name           StudiVZ Schnelleinladung
// @namespace      http://robv.de
// @description    Fügt auf bestimmten Seiten im StudiVZ einen Link zum Einladen der jeweiligen Person in zuvor angegebene Gruppen ein.
// @include        http://www.studivz.net/*
// @include        http://studivz.net/*
// ==/UserScript==

var groups = new Array();
var $ = unsafeWindow.$;

function addInviteLinks() {	
	if (document.location.pathname.indexOf("/Friends/") == 0 || document.location.pathname.indexOf("/Search/") == 0) {
		
		var ulUserList = $('.obj-usertable ul.obj-linklist');
		ulUserList.each(function() {
			var friendlink = $(this).find('a[href^="/Gruscheln/"]').get(0);
			friendlink.href.match(/\/Gruscheln\/DialogGruscheln\/([0-9a-zA-z]{16})/i);
			var friendid = RegExp.$1;
			if (friendid.length != 16) return;
			
			for (var groupid in groups) {
				var newLI = document.createElement("li");
				var newLink =  document.createElement("a");
	
				newLink.href = "/Groups/Invite/" + groupid + "/" + friendid;
				newLink.innerHTML = "In Gruppe \"" + groups[groupid] + "\" einladen";
				
				newLI.appendChild(newLink);
				$(this).append(newLI);
			}
		});

	} else if (document.location.pathname.indexOf("/Profile/") == 0) {
		var divProfileLeft = document.getElementById("profileLeft");
		if (!divProfileLeft) return;
		var ulLinkList = divProfileLeft.getElementsByTagName("ul")[0];

		document.location.pathname.match(/^\/Profile\/([0-9a-zA-z]{16})/i);
		var friendid = RegExp.$1;
		if (friendid.length != 16) return;

		for (var groupid in groups) {
			var newLI = document.createElement("li");
			var newLink =  document.createElement("a");

			newLink.href = "/Groups/Invite/" + groupid + "/" + friendid;
			newLink.innerHTML = "In Gruppe \"" + groups[groupid] + "\" einladen";
			
			newLI.appendChild(newLink);
			ulLinkList.appendChild(newLI);
		}
	} else if(document.location.pathname.indexOf("/Groups/Overview/") == 0) {
		var liInviteFriend = $('#Groups_Overview ul.obj-linklist li:has(a[href^="/Friends/GroupInviteSearch"])');

		document.location.pathname.match(/^\/Groups\/Overview\/([0-9a-zA-z]{16})/i);
		var groupid = RegExp.$1;
		if (groupid.length != 16) return;
		
		var newLI = document.createElement("li");
		var newLink =  document.createElement("a");

		newLink.href = "#";
		newLink.setAttribute("onclick", "return false;");
		newLink.addEventListener("click", openConfigDlg, true);
		newLink.id = "svzil_conf";
		newLink.setAttribute("groupid", groupid);
		newLink.setAttribute("groupname", groups[groupid]);
		linkChangeActive(newLink, (groups[groupid] != null));
		
		newLI.appendChild(newLink);
		liInviteFriend.after(newLI);
	}
}

function linkChangeActive(newLink, toActive) {
	if (toActive) {
		newLink.innerHTML = "Schnelleinladung =>  \"" + newLink.getAttribute("groupname") + "\"";
		newLink.style.textDecoration = "";
		newLink.style.color = "green";
		newLink.title = "Schnelleinladung deaktivieren";
		newLink.setAttribute("svzil_act", true);
	}	else {
		newLink.innerHTML = "Schnelleinladung (inaktiv)";
		newLink.style.textDecoration = "line-through";
		newLink.style.color = "";
		newLink.title = "Schnelleinladung aktivieren";
		newLink.setAttribute("svzil_act", false);
	}
}

function loadSettings() {
	var num = GM_getValue("num_groups", 0);
	for (var i = 1; i <= num; i++) {
		var s = GM_getValue("group" + i, "");
		if (s != "") {
			var sArr = s.split("|||");
			groups[sArr[0]] = sArr[1];
		}
	}
}

function saveSettings() {
	var i = 1;
	for (var groupid in groups) {
		if (groups[groupid] != null) {
			GM_setValue("group" + i, groupid + "|||" + groups[groupid]);
			i++;
		}
	}
	GM_setValue("num_groups", i - 1);
}

function openConfigDlg() {
	var theLink = document.getElementById("svzil_conf");
	var isActive = (theLink.getAttribute("svzil_act") == "true");
	var groupid = theLink.getAttribute("groupid");
	var groupname = null;
	
	if (!isActive) {
		groupname = prompt("Name für die Gruppe:", document.getElementById("Grid-Page-Center-Header").getElementsByTagName("h1")[0].textContent);
		if (!groupname || groupname == "") return;
		theLink.setAttribute("groupname", groupname);
	} else {
		if (!confirm("Schnelleinladung wirklich deaktivieren?")) return;
		groupname = null;
	}
	groups[groupid] = groupname;
	saveSettings();
	
	linkChangeActive(theLink, !isActive);
}

loadSettings();
addInviteLinks();