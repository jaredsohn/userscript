// ==UserScript==
// @name		Pardus Teamchat
// @version		4
// @namespace	marnick.leau@skynet.be
// @description	Adds custom chat tabs to the Chat window
// @icon		http://www.majhost.com/gallery/Faziri/Pardus/Scripts/icon.png
// @include		http*://*.pardus.at/chat.php
// @include		http*://*.pardus.at/chat.php?channel=*
// @grant		GM_getValue
// @grant		GM_setValue
// ==/UserScript==

var rooms = [
	{
		"Name": "Chat 1",
		"URL": "http://www.pardus.at"
	},
	{
		"Name": "Chat 2",
		"URL": "http://www.pardus.at"
	}
];

var activetab, activetabindex, inactivetab;
var tabs = document.getElementsByClassName("tabcontent");
var i = 0;
while (!activetab) {
	if (!tabs[i].getAttribute("onmousedown")) {
		activetab = tabs[i].cloneNode(true);
		activetabindex = i;
		inactivetab = tabs[tabs.length - 1 - i].cloneNode(true);
	}
	i++;
}
for (var i = 0;i < 4;i++) {
	tabs[i].addEventListener("click", function() {
		GM_setValue("lastSelectedTab", null);
	});
}

var layoutbox = tabs[0].parentNode.parentNode.parentNode;
layoutbox.setAttribute("width", parseInt(layoutbox.getAttribute("width"))/tabs.length*(tabs.length + rooms.length));
var tabcontainer = tabs[0].parentNode;

var lastTab = GM_getValue("lastSelectedTab", null);
for (var i = 0;i < rooms.length;i++) {
	var tab;
	if (lastTab != rooms[i]["Name"]) {
		tab = inactivetab.cloneNode(true);
		tab.dataset.name = rooms[i]["Name"];
		tab.addEventListener("click", function(event) {
			GM_setValue("lastSelectedTab", event.target.dataset.name);
			document.location.href = document.location.href;
		});
	} else {
		tab = activetab.cloneNode(true);
		document.getElementById("ChatFrame").setAttribute("src", rooms[i]["URL"]);
		document.getElementById("ChatFrame").previousSibling.innerHTML = rooms[i]["Name"];
		
		var replacementtab = inactivetab.cloneNode(true);
		replacementtab.innerHTML = tabs[activetabindex].innerHTML;
		replacementtab.setAttribute("onmousedown", tabs[tabs.length - activetabindex].getAttribute("onmousedown"));
		replacementtab.addEventListener("click", function(event) {
			GM_setValue("lastSelectedTab", null);
		});
		tabcontainer.insertBefore(replacementtab, tabs[activetabindex]);
		tabcontainer.removeChild(tabcontainer.childNodes[activetabindex + 1]);
	}
	tab.innerHTML = rooms[i]["Name"];
	tab.removeAttribute("onmousedown");
	tabcontainer.appendChild(tab);
}