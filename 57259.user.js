/*
Linkedin Network Expander - (c) 2009 Tony Confrey

Inspired by: Linkedin relations - (c) 2006 J.Q. la Poutre


This script allows you to expand the LinkedIn contacts list in-place to show the contacts of your contacts. It also tracks and links to those people with whom you share multiple contacts but who you are not connected to.

The script adds a 'Network Expander' button in the sidebar. Clicking this button adds an 'Expand' button beneath each of your contacts. Those buttons expand that persons network in place on the screen (for those contacts who allow their network to be seen). The contacts of your contacts can then be browsed in place without switching to a new window.

As each persons network is expanded the script also adds a summary at the top of the contact list showing people who are connected to your contacts but not connected to you. People connected to multiple of your contacts are potential new connections for you. Names in the summary are links to that persons profile.


This is a Greasemonkey user script.

To install, you need Greasemonkey: http://greasemonkey.mozdev.org/  Then restart Firefox and revisit this script. Under Tools, there will be a new menu item to "Install User Script". Accept the default configuration and install.

To uninstall, go to Tools/Manage User Scripts,


WARNING
=======

Fragile

The script makes heavy use of "screen scraping". This means, using regular expressions and a fixed DOM hierarchy to parse relevant data from html pages.
This method is inherently fragile.
Note also that the script only works with the older 'classic' version of the Connections page, you must opt-out of the newer view to use the script.

LICENSE
=======

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; either version 2 of the License, or (at your
option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
Public License for more details.

To receive a copy of the GNU General Public License 
write to the Free Software Foundation, Inc.,
59 Temple Place, Suite 330, Boston, MA 02111-1307 USA


CHANGELOG
=========

Version 1.01
    - Script now handles the two known display formats for contacts of contacts
    - Script now handles multiple pages of contacts of contacts

Version 1.00
    - initial release
    - this script is considered EXPERIMENTAL

*/

// ==UserScript==
// @name           Linkedin Network Expander
// @author         Tony Confrey
// @description    Augments LinkedIn contacts display to allow browsing of contacts of contacts. Also tracks people you share common contacts with but are not yet connected to.
// @namespace      http://tonyconfrey.net
// @include        *linkedin.com/connections*
// @version	       1.01
// ==/UserScript==


// Array of IDs of my first level contacts
var myContacts = new Array();
// Associative array of second level contacts
var myContactsContacts = new Object();
// Associative array of counts of number of my contacts connected to each second level contact
var myContactsContactsCount = new Object();
// Paragraph node to show potential new contacts
var p;

// --------------------- parsing functions ---------------------

function Initialize() {
    // Add "Expander" button to linkedin page on top right
    var ovl = document.createElement("input");
    ovl.setAttribute("type", "button");
    ovl.setAttribute("value", "Network Expander");
    ovl.style.background = "#93C844";         // match the 'Add Connections' color scheme
    ovl.style.margin = "2px 20px";
    ovl.addEventListener('click', function(e) {processMyContacts(e.target)}, true);
    var paras = document.getElementsByTagName("li");
    for (var j=0; j < paras.length; j++) {    // insert the button in the sidebar
	if (paras[j].getAttribute("id") == "nav-personal-home")
	    paras[j].parentNode.appendChild(ovl);
    }
}

function processMyContacts(btn) {
    // Walk thru the li tags find those showing a contact and add in an 'Expand' button, remember first level contacts

    // First check to make sure we are using the old version of the contacts page
    var optInOut = document.getElementsByTagName("p");
    for (var j=0; j < optInOut.length; j++) {
	if (optInOut[j].getAttribute("class") == "opt-out") {
	    alert("The LinkedIn Network Expander script only works with the older version of the Connection page. Please opt-out of this new view to use the Expander.\n (Use the Opt-out link at the bottom of the page).");
	    return;
	}
    }

    btn.disabled = true;	// disable the Expander button after first use

    // Now find and walk thru all contacts and add in their Expand button
    var lis = document.getElementsByTagName("li");
    var countAnchors = new Array();
    var vind = 0;
    var btn;
    for (var i=0; i < lis.length; i++) {
	if (lis[i].getAttribute("class") == "vcard") {
	    btn = document.createElement("input");
	    btn.setAttribute("type", "button");
	    btn.setAttribute("value", "Expand");
	    btn.style.background = "#93C844"; // match the 'Add Connections' button color scheme
	    btn.addEventListener('click', function(e) {toggleExpandContact(e.target.parentNode);}, false);
	    // Only enabled if contacts are available
	    btn.disabled = true;
	    countAnchors = lis[i].getElementsByTagName("a");
	    for (var j=0; j < countAnchors.length; j++) {
		if (countAnchors[j].getAttribute("class") == "count")
		    btn.disabled = false;
	    }
	    lis[i].appendChild(btn);
	    lis[i].setAttribute("expanded", "false");    // remember expanded state
	    lis[i].setAttribute("retrieved", "false");   // remember whether we've already retrieved the data

	    var connID = vcardFindID(lis[i].innerHTML);  // find this connections ID
	    myContacts.push(connID);	                 // and remember it
	}
    }
    myID = vcardFindID(document.documentElement.innerHTML); // find my id form the page
    myContacts.push(myID);				    // I'm my own walkman
    // Create the para element to hold summary information about potential new connections
    var divs = document.getElementsByTagName("div");
    for (var d=0; d<divs.length; d++) {
	if (divs[d].getAttribute("class") == "info") {
	    p = document.createElement("p");
	    p.setAttribute("style", "width: 100%");
	    p.innerHTML = "Potential New Contacts, by number of shared connections:";
	    divs[d].appendChild(p);
	}
    }
}

function toggleExpandContact(vcard) {
    // expand this contact
    var btn = vcard.getElementsByTagName("input")[0];
    if (vcard.getAttribute("expanded") == "false") {	 // need to expand contacts contacts
	btn.setAttribute("value", "Collapse");
	vcard.setAttribute("expanded", "true");
	if (vcard.getAttribute("retrieved") == "false") { // need to retrieve the data
	    var connectionsId = vcardFindID(vcard.innerHTML);
	    var url = "http://www.linkedin.com/profile?viewConns=&key=" + connectionsId;
	    if (vcard.getAttribute("nextPage")) { url += vcard.getAttribute("nextPage");}
	    requestPage(url, processContactsContacts, vcard);
	    vcard.setAttribute("retrieved", "true");
	    btn.disabled = true;
	} else {					 // data already retrieved - just display
	    var ul = document.createElement("ul");
	    ul.setAttribute("id", "connections");
	    ul.setAttribute("style", "border-top: none");
	    if (vcard.getAttribute("compressedversion") == "true") {
		ul.setAttribute("style", "font-size: 120%");
		ul.style.margin = "70px 20px 20px 20px";
	    } else {
		ul.setAttribute("style", "margin-top: 50px");
	    }
	    ul.innerHTML = vcard.getAttribute("contactsData"); 
	    vcard.insertBefore(ul, vcard.lastChild);
	} 
    } else {						 // collapse contacts expansion
	vcard.setAttribute("contactsData", vcard.lastChild.previousSibling.innerHTML);
	vcard.removeChild(vcard.lastChild.previousSibling);
	btn.setAttribute("value", "Expand");
	vcard.setAttribute("expanded", "false");
	vcard.scrollIntoView();
    }
}

function processContactsContacts(res, vcard) {
    // process a contacts page from the Expand button for a first level contact
    try {
	if (res.readyState == 4) {
	    // only if "OK"
	    if (res.status == 200) {
		var page = res.responseText;
		// Regexp matches each vcard entry. NB need to use [^] to match anything including newlines, dot (.) does not
		var re = new RegExp(/<li class="vcard connection.*?">[^]*?<ul class="actions">[^]*?<\/ul>[^]*?<\/li>/gim);
		var cards = page.match(re); // array of matched vcard elements
		if (!cards || (cards.length == 0)) {
		    // It seems different people see this page in different formats. If the first one doesn't work I try the second here.
		    re = new RegExp(/<li class=".*connection">[^]*?<\/li>/gim);
		    cards = page.match(re); // array of matched vcard elements
		    vcard.setAttribute("compressedversion", "true");
		}

		var inviteAnchor = new String();
		var id;
		// Clean up the vcard HTML
		for (var i=0; i < cards.length; i++) {
		    inviteAnchor = cards[i].match(/<a href=.*? Add to network <\/a>/);
		    if (inviteAnchor) {
			inviteAnchor = inviteAnchor[0].replace(/>/, "target='_invite'>");
			cards[i] = cards[i].replace(/<a href=.*?View profile<\/a>/g, inviteAnchor);
		    }
		    cards[i] = cards[i].replace(/<ul class="actions">[^]*<\/ul>/gi, "");
		    cards[i] = cards[i].replace(/<dt>[^]*?<\/dt>/gi, "");

		    id = vcardFindID(cards[i]);       // extract out the contacts ID
		    if (myContacts.indexOf(id) < 0) { // this is not one of my direct contacts
			if (myContactsContacts[id]) { // already seen it increment count
			    myContactsContactsCount[id] += 1;
			} else {
			    // haven't seen it, remember the details
			    myContactsContactsCount[id] = 1;
			    myContactsContacts[id] = new String(cards[i]);
			}
		    }
		}
		
		var ul = (vcard.lastChild.previousSibling.id == "connections") ? vcard.lastChild.previousSibling : document.createElement("ul");
		ul.setAttribute("id", "connections");
		ul.setAttribute("style", "border-top: none");
		if (vcard.getAttribute("compressedversion") == "true") {
		    ul.setAttribute("style", "font-size: 120%");
		    ul.style.margin = "70px 20px 20px 20px";
		} else {
		    ul.setAttribute("style", "margin-top: 50px");
		}
		ul.innerHTML += cards.join(""); 
		vcard.insertBefore(ul, vcard.lastChild);

		displayPotentialContacts();
		processMultiplePages(vcard, page); // handle multi page responses
	    }
	}
    } catch(e) {
	GM_log("error in processContactsContacts");
	alert(e);
    }
}

function processMultiplePages(vcard, page) {
// response will be broken into multiple pages if more than ~50 contacts. Find the _next link and handle appropriately
    
    var btn = vcard.getElementsByTagName("input")[0];
    btn.disabled = false;

    var re = new RegExp(/<p class="page">[^]*(\d+)<\/a>[^]?<a href=".*?(&split_page=(\d+)).*?" name="_next"/mi);
    var next = page.match(re); // array of matched vcard elements
    if (!next || (next.length == 0)) return; // no next page so we return
    
    btn.setAttribute("value", "Expand "+next[3]+" of "+next[1]);
    vcard.setAttribute("retrieved", "false");
    vcard.setAttribute("expanded", "false");
    //GM_log("Next page link = " + next[2]);
    vcard.setAttribute("nextPage", next[2]);
}

function displayPotentialContacts() {
// process contacts arrays and display an indication of contacts common to multiple of my contacts but whom I'm not connected to. Laid out grouped by number of shared connections.

    // Create an array of my connections connections sorted by most shared connections
    var indx = new Array();
    for (id in myContactsContactsCount) { 
	indx.push(id);
    }
    indx.sort(function(a,b) {return myContactsContactsCount[b] - myContactsContactsCount[a];})

    var potentials = "";	// aggregate potential new connections for me
    var numConnections = 0;	// current number of shared connections being processed
    var re = new RegExp(/<a href.*? rel="contact">[^]*?<\/a>/);
    p.innerHTML = "Potential New Contacts, by number of shared connections:";
    for (var j = 0; j < indx.length; j++) {
	if (myContactsContactsCount[indx[j]] > 1) {
	    if (numConnections != myContactsContactsCount[indx[j]]) {
		p.innerHTML += potentials + "<br/>";
		potentials = myContactsContactsCount[indx[j]] + ": ";
		numConnections = myContactsContactsCount[indx[j]];
	    }
	    lnk = String(myContactsContacts[indx[j]].match(re));
	    lnk = lnk.replace(/rel="contact"/gi, "target='_blank'"); // set link to open in new tab
	    potentials += lnk + ", ";
	}
    }
    p.innerHTML += potentials + "<br/>";
//    GM_log(potentials);
}


// XHR implementation
// the overrideMimeType is apparently available to Moz' native XHR
function requestPage(src, func, arg) {
	var xhr = new window.XMLHttpRequest();
		xhr.onreadystatechange = function() { func(xhr, arg); };
	xhr.open("GET", src);
	// this fixes the content type glitch...
	xhr.overrideMimeType("text/html; charset=ISO-8859-1");
	xhr.send(null);
}

function vcardFindID(vcard) {
    // process the vcard and find its contained LinkedIn ID. Look for this pattern:
    var re = new RegExp(/viewProfile=.+?key=(\d+)/);
    var connectionsId = vcard.match(re)[1];
//    GM_log("id="+connectionsId);
    return connectionsId;
}



Initialize();
// end user script