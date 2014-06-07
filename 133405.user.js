// ==UserScript==
// @name           Show warning for citizenship request
// @namespace      http://userscripts.org/users/467084
// @version        0.1
// @description    Shows a warning message to people to check the eUSA forums before accepting a citizenship request.
// @include        http://e-sim.org/profile.html?id=*
// @match          http://e-sim.org/profile.html?id=*
// ==/UserScript==

function insertCitizenNotification()
{
	var medal = document.getElementById("medals");
	var enew = document.createElement('div');
	enew.className="testDivblue";
	enew.style.width="500px";
	enew.style.color="red";
	
	var text = document.createTextNode('WARNING: All Congress members should check the FBI forum board before accepting any citizenships: ');

	var link = document.createElement('a');
	link.href = "http://eusaforums.com/forum/index.php/board,193.0.html";
	link.target = "_blank";
	link.appendChild(document.createTextNode('http://eusaforums.com/forum/index.php/board,193.0.html'));
	
	enew.appendChild(text);
	enew.appendChild(link);

	var parent = medal.parentNode.parentNode;
	parent.insertBefore(document.createElement('br'), parent.firstChild);
	parent.insertBefore(enew, parent.firstChild);
}

insertCitizenNotification();
