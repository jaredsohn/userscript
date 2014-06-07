// ==UserScript==
// @name           Moderation History Upgrade
// @namespace      Moderation History Upgrade
// @description    Allows you to toggle the moderation history and makes some aesthetic changes.
// @include        http://*bungie.net/Account/Profile.aspx
// ==/UserScript==

var modDisplay = localStorage.getItem('modhistorydisplay'), modHistoryLabel = document.getElementById("ctl00_mainContent_BanHistoryPanel").getElementsByTagName("h3").item(0), modHistory = document.getElementById("ctl00_mainContent_BanHistoryPanel").getElementsByTagName("p").item(0);
modHistoryLabel.innerHTML = '<a id="toggleHistory" href="javascript: void(0);" style="font-size: 15px; text-decoration: none; margin-right: 7px;"></a> Most Recent Moderation History';
if (!modDisplay || modDisplay == "block")
	document.getElementById("toggleHistory").textContent = "-";
else
	document.getElementById("toggleHistory").textContent = "+";

modHistory.style.display = modDisplay;
// Daz <3
modHistory.innerHTML = modHistory.innerHTML.replace(/.+(?= \[(\d+)\])/, "<a href=\"?uid=$1\">$&</a>");
modHistory.innerHTML = modHistory.innerHTML.replace(/(http:\/\/.+?)(?=<br.*?>|<\/span>|\s+)/gi, "<a href=\"$1\">$1</a>");

// Stylin'
GM_addStyle("#ctl00_mainContent_BanHistoryPanel p { font-weight: bold; font-size: 14px; }#ctl00_mainContent_BanHistoryPanel p a { font-weight: bold; font-size: 14px; }#ctl00_mainContent_BanHistoryPanel p span { font-weight: normal; font-size: 12px; }#ctl00_mainContent_BanHistoryPanel p span a { font-weight: normal; font-size: 12px; }");
modHistory.innerHTML = modHistory.innerHTML.replace(/this user/, document.getElementById('ctl00_mainContent_header_lblUsername').textContent);
document.getElementById("toggleHistory").addEventListener("click", function() {
	var modHistory = document.getElementById("ctl00_mainContent_BanHistoryPanel").getElementsByTagName("p").item(0);
	if (this.textContent == "+")
	{
		this.textContent = "-";
		modHistory.style.display = "block";
		localStorage.setItem('modhistorydisplay', 'block');
	}
	else
	{
		this.textContent = "+";
		modHistory.style.display = "none";
		localStorage.setItem('modhistorydisplay', 'none');
	}	
	
}, false);

// Between the conception and the creation; between the emotion and the response, falls the Shadow.                             