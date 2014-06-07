// Copyright (c) 2008 Squiffle
//
// Feel free to use and redistribute, but I'd appreciate it if you'd let me know
// if you like it, or if you make any improvements to it.
//
// Version 2 (22 July 2008)
//
// ==UserScript==
// @name PM Society
// @description add a button to send a PM to all online society members
// @include http://www.secretsocietywars.com/index.php?p=forums&a=pm_editor*
// ==/UserScript==

const maxAddressees = 33;

function parse_list(response) {
// Find the society members
	var members = [];
	var start = 0;
	var end = response.responseText.indexOf("&to=")
	while ((end > -1) && (maxAddressees > members.length)) {
		start = end+4;
		end = response.responseText.slice(start).indexOf("\"");
		var substr = response.responseText.slice(start,start+end);
		// GM_log(substr);
		if (substr != get_username()) {
			members.push(substr);
		}
		start = start + end;
		end = response.responseText.slice(start).indexOf("&to=")
		if (end > -1) {
			end = end + start;
		}
	}
	//GM_log(members);
	send_to = document.getElementsByName('send_to');
	if (members.length) {
		send_to[0].value = members.join(", ");
	}
}

function get_username() {
	var pattrname = document.evaluate('//td[@class="pattrName"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var username;

	if(pattrname) {
		var re;

		if(re = /<b[^>]*>([^<]+)/.exec(pattrname.innerHTML)) {
			username = re[1];
		}
	}
	return username;
}

function get_society() {
	var pattrname = document.evaluate('//td[@class="pattrName"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var society;

	if(pattrname) {
		var re;

		if(re = /color[^>]*>([^<]+)/.exec(pattrname.innerHTML)) {
			society = re[1];
		}
	}
	switch (society) {
	case "The Illuminati" :
	return "illuminati";
	break;
	case "The Society of Oddfellows" :
	return "oddfellows";
	break;
	case "The Order of the Amaranth" :
	return "amaranth";
	break;
	case "The Order of the Eastern Star" :
	return "eastern_star";
	break;
	case "The Triad Cabbal" :
	return "triad";
	break;
}

// Shouldn't ever get here
return society;
}

var send_to = document.getElementsByName('send_to');
if (send_to.length > 0) {
// Add the button
	var button = document.createElement('input');
	button.type = "button";
	button.value = "Society";
	button.addEventListener('click', pm_society, false);

	send_to[0].parentNode.insertBefore( button, send_to[0].nextSibling );
}

function pm_society() {
// Get the list of online society members
	GM_xmlhttpRequest(
	{
	method: 'GET',
	url: "http://www.secretsocietywars.com/index.php?p=records&a=whos_online&society=" + get_society(),
	onload: parse_list
	})
}