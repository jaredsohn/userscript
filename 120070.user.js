// ==UserScript==
// @name           FA Nuke Everything
// @namespace      net.fa
// @description    Nukes every last message on your FA account without confirmation
// @include        http://*.furaffinity.net/*
// @include        https://*.furaffinity.net/*
// ==/UserScript==

// FA Nuke Everything
//
// Copyright (c) 2010. All Rights Reserved.
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.

//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.


var nukeLinkClass = "fa_nuke_everything_button";

var urls = [ "/msg/others/", "/msg/others/", "/msg/others/", "/msg/others/" ];
var bodies = [ "nuke-journals=Nuke+journals", "nuke-journal-comments=Nuke+journal+comments", "nuke-watches=Nuke+watches", "nuke-shouts=Nuke+shouts" ];
var types = [ "journals", "comments", "watches", "shouts" ];

document.addEventListener("DOMContentLoaded", function() {
	var messageCenterResult = document.evaluate('//td[@class="alt1"]/p', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	var messageCenter = messageCenterResult.singleNodeValue;

	if(messageCenter) {
		var br = document.createElement('br');
		var nuke_button = document.createElement('a');
		nuke_button.style.fontWeight = 'bold';
		nuke_button.style.color = 'red';
		nuke_button.href = '#';
		nuke_button.innerHTML = "<<< NUKE EVERYTHING NOW >>>";
		nuke_button.className = nukeLinkClass;
		nuke_button.id = "nuke-link-unclicked";
		nuke_button.addEventListener("click", nukeClick, false);
		
		messageCenter.appendChild(br);
		messageCenter.appendChild(nuke_button);		
	}
});

function nukeClick() {
	switch(this.id) {
		case "nuke-link-unclicked":
			showConfirmation(this);
			break;
		case "nuke-link-clicked":
			nuke(this, 0);
			break;
		case "nuke-link-clicked-submissions":
			urls.push("/msg/submissions/new@36");
			bodies.push("messagecenter-action=Nuke+all+Submissions");
			types.push("submissions");
			nuke(this, 0);
			break;
		case "nuke-link-busy":
			break;
	}
}

function showConfirmation(elem) {
	elem.addEventListener("keydown", submissionToggle, false);
	elem.innerHTML = "<<< CLICK AGAIN TO CONFIRM >>>";
	elem.id = "nuke-link-clicked";
}

function submissionToggle(e) {
	switch(e.keyCode) {
	case 83: // s key
		this.innerHTML = "<<< GOING TO NUKE EVERYTHING INCLUDING SUBMISSIONS. ARE YOU SURE? >>>";
		this.id = "nuke-link-clicked-submissions";
		break;
	case 27: // escape key
		this.innerHTML = "<<< NUKE EVERYTHING NOW >>>";
		this.id = "nuke-link-unclicked";
		break;
	}
}

function nuke(elem, i) {
	if (i > urls.length-1) {
		unsafeWindow.location.reload();
		return;
	}

	var typestring = types[i];
	var url = urls[i];
	var body = bodies[i];


	elem.innerHTML = "Nuking " + typestring + ", please wait...";

	var nukeRequest = new XMLHttpRequest();

	nukeRequest.onreadystatechange = function() {
		if(nukeRequest.readyState == 4 &&
		nukeRequest.status == 200)
			nuke(elem, ++i);
		else if (nukeRequest.readyState == 4 &&
		nukeRequest.status != 200)
			errorState(elem);
	}

	nukeRequest.open("POST", url, true);
	nukeRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	nukeRequest.send(body);
}

function errorState(elem) {
	elem.innerHTML = "ERROR - Please click here to try again";
	elem.id = "nuke-link-clicked";
}
