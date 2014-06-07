/* vim: ts=4 noet ai :
$Id: $

Linkedin relations - (c) 2006 J.Q. la Poutre

This script spiders all LinkedIn contacts and second order
contacts (their contacts).

Output is openend in a new Browser TAB and formatted as a Javascript 
object definition, which can be used for off-line experiments.

WARNING
=======

Impact

This script can cause a heavy load on LinkedIn. 
All contact listings, and their contact listings are retrieved from
the web server. This can be a substantial number of hits in a relative
short time.
The script uses a "spider queue" with a maximum number of MAXREQ 
simultaneous page requests; feedback of the queue size is displayed
during runtime.
Please do not over-use this script, more than one run in a couple of 
days doesn't make sense anyway. Do your experiments with the resulting 
javascript output instead!


Fragile

The script makes heavy use of "screen scraping". This means, 
using regular expressions to parse relevant data from html pages.
This method is inherently fragile. All occurences of these regular
expressions and request URLs are marked with a comment:
// pgtxt

Character encoding

LinkedIn currently uses ISO-Latin-1 as chacracter encoding for their
html pages. Aparently, GM expects UTF-8 only, so any diacritic
characters will be outputted garbled.

See also: 
https://bugzilla.mozilla.org/show_bug.cgi?id=337434
https://bugzilla.mozilla.org/attachment.cgi?id=221611&action=view

The work around is method overrideMimeType():
...
xhr.open( 'GET', url, true );
xhr.overrideMimeType("text/html; charset=ISO-8859-1");
xhr.send( null );
...


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

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
59 Temple Place, Suite 330, Boston, MA 02111-1307 USA


CHANGELOG
=========

Version 1.00
    - initial release
    - this script is considered EXPERIMENTAL

Version 1.01
	- fix: email address extraction wasn't working OK
    - use http rather than https urls
      (Linkedin started redirecting those)
    - work around for character encoding issue
    

*/
// ==UserScript==
// @name           Linkedin Relations
// @namespace      http://joe.lapoutre.com/BoT/Javascript
// @description    Mapping of linkedin relations
// @include        *linkedin.com/connections*
// @version	       1.01
// ==/UserScript==


// global object - data model -----------------------------------
var gContacts = {
	MAXREQ: 4, // max. number of simultaneous page requests
	baseUrl: "http://www.linkedin.com",
	contacts: [],
	myKey: 0,
	add: function(key, name, email, refKey) {
		if (! this.contacts[key]) {
			this.contacts[key] = new Contact(key, name);
		}
		if (refKey) {
			// add link to current contact on referring contact,
			// -- this exists already, due to spidering order
			this.contacts[refKey].addRef(key, this.contacts[key]);
			// add contact's contacts page to spider queue
			// -- only if it's a first level contact
			// -- which means, referred by me (myKey)
			if (refKey == this.myKey) { 
				this.url_push("/profile?browse=&id=" + key);
				li_dbg("Pushing url: profile?browse=&id=" + key + "from key: " + refKey);

			}
		}
		if (email) {
			this.contacts[key].setEmail(email);
		}
	},
	getContact: function(key) {
		return (this.contacts[key]) ? this.contacts[key] : null;
	},
	toDotString: function() {
		var s = "/* Dot file created with linkedinrelations.user.js */\n";
		s += "// " + (new Date()).toString() + "\n";
		s += "graph G {\n";
		s += "\toverlap=false;\n";
		s += "\tsplines=true;\n";
		s += "\tconcentrate=true;\n";
		for (k in this.contacts) {
			s += this.contacts[k].toDotString();
		}
		return s + "}\n";
	},
	toObjString: function() {
		var s = "/* JS Object file created with linkedinrelations.user.js */\n";
		s += "// " + (new Date()).toString() + "\n";
		s += "gContacts = {\n";
		for (k in this.contacts) {
			s += k + ": " + this.contacts[k].toObjString() + ",\n";
		}
		return s + "};\n// EOF\n";
	},
	requests: 0, // number of active XHR's
	url_queue: [], // spider queue: stack of urls to fetch
	url_push: function(url) {
		this.url_queue.push(this.baseUrl + url);
	},
	interval: null,
};

// contact object
function Contact(key, name) {
	this.key = key;
	this.name = name;
	this.email = "";
	this.contacts = [];
	li_dbg("Created contact " + name);
	this.toDotString = function() {
		var s = "";
		for (var k in this.contacts) {
			s += "\t" + this.getName() + " -- " +
				this.contacts[k].getName() + ";\n";
		}
		//return this.name + " (" + this.key + ")";
		return s;
	}
	this.toObjString = function() {
		var s = "{";
		s += '"key": ' + this.key + ', ';
		s += '"name": "' + this.name + '", ';
		s += '"email": "' + this.email + '", ';
		s += '"contacts": [';
		for (var k in this.contacts) {
			s += this.contacts[k].key + ', ';
		}
		s += '] }';
		return s;
	}
	this.setEmail = function(e) {
		this.email = e;
	}
	this.addRef = function(k, oRef) {
		this.contacts[k] = oRef;
	}
	this.hasRef = function(k) {
		return ((this.contacts[k]) ? true : false);
	}
	this.getName = function() {
		return '"' + this.name + '"';
	}
}
 
// --------------------- parsing functions ---------------------

// process any fetched page (1-st and second level contacts)
function processPage(txt) {
	// Main contacts: href="/connections?split_page=1"
	// Contact contacts: /profile?browse=&id=1505855&split_page=4
	var re = new RegExp("split_page=\\d+", "mg");	// pgtxt
	var arr = txt.match(re);
	var num = 1;
	if (arr) {
		for (var i = 0; i<arr.length; i++) {
			var pg = arr[i].match(/\d+/);
			// smart hack: 
			// every page after first one contains link to first page
			// don't recurse if this link is found
			if (pg == 1) break;
			if (pg > num) num = pg;
		}
		// if (num > 1) alert(num + " pages found");
	}
	// differentiate between 1st level and 2nd level pages
	if (txt.match(/\/connections\?split_page=/)) {	// pgtxt
		getMainContacts(txt);
	} else {
		getContacts(txt);
	}
	// get following (second and next) pages
	for (var i = 2; i<=num; i++) {
		if (txt.match(/\/connections\?split_page=/)) {	// pgtxt
			// main connections page
			gContacts.url_push("/connections?split_page=" + i);	// pgtxt
		} else {
			// connection's connections page
			gContacts.url_push("/profile?browse=&id=" +	// pgtxt
				txt.match(/&id=(\d+)&split_page=/)[1] +
				"&split_page=" + i);
		}
	}

}
// parse first level contacts page, contains emails
function getMainContacts(txt) {
/* <td><strong name="fullName"><a href="/profile?viewProfile=&amp;key=3085028&amp;goback=%2Econ_1" title="View Sybren's Profile" name="fullProfile">Arnoldus (sybren.arnoldus@gmail.com), Sybren</a></strong><br><span class="helper"><a href="mailto:sybren.arnoldus@gmail.com" name="mailto">sybren.arnoldus@gmail.com</a></span></td>
*/
	// "viewProfile=&key=1032676& *** >Wozniak, Steve</a>"
	var re = new RegExp('viewProfile=&key=\\d+&.*>[^<]+<.+mailto:[^"]+', "mg");	// pgtxt
	var arr = txt.match(re);
	if (! arr) return;
	li_dbg("Contacts on 1st level page: " + arr.length);
	for (var i = 0; i<arr.length; i++) {
		// li_dbg("item: " + arr[i]);
		var key = arr[i].match(/\d+/);	// pgtxt
		var nm = arr[i].match(/>([^<]+)</)[1];	// pgtxt
		var email = arr[i].match(/mailto:(.+)$/)[1]; // pgtxt
		gContacts.add(key, nm, email, gContacts.myKey);
	}
}

// parse 2nd level contacts page, contains links to their contacts:
function getContacts(txt) {
	// "viewProfile=&key=1032676& *** >Wozniak, Steve</a>"
	var re = new RegExp("viewProfile=&key=\\d+&.*>[^<]+<", "mg");	// pgtxt
	var arr = txt.match(re);
	if (! arr) return;
	// look for referring contact, if any:
	//  /profile?viewProfile=&key=3259572&goback=%2Ebcc_1502835_1
	var refKey;
	try {
		refKey = txt.match(/bcc_(\d+)_/)[1];	// pgtxt
	} catch(e) {
		// "&goback=.con_1": this is a direct contact of me
		if (txt.match(/goback=%2Econ_1/)) refKey = gContacts.myKey;
	}
	var email;
	try {
		email = txt.match(/mailto:([^"]+)"/)[1];	// pgtxt
	} catch(e) {
		// no email on 2nd order contacts, just keep empty
		email = "";
	}
	//alert(arr.length);
	for (var i = 0; i<arr.length; i++) {
		var key = arr[i].match(/\d+/);	// pgtxt
		var nm = arr[i].match(/>([^<]+)</)[1];	// pgtxt
		gContacts.add(key, nm, email, refKey);
	}
}




// find my account's ID key
function get_my_id(res) {
	// only if req is "loaded"
	if (res.readyState == 4) {
		// only if "OK"
		if (res.status == 200) {
			// /emailContacts?context=1&itemID=596654&
			var myKey;
			var myName;
			try {	// pgtxt
				myKey = res.responseText.match(/emailContacts.+&itemID=(\d+)&/)[1];
				myName = res.responseText.match(/h2 class="name">([^&]+)&nbsp/)[1];
			} catch(e) {
				myKey = 0;
				window.alert("Error getting my Profile ID:\n" + e);
//				outputToTab(res.responseText);
			}
			// alert(myName + "-" + myKey);
			gContacts.myKey = myKey;
			gContacts.add(myKey, myName);
			// start "spidering engine"
			gContacts.requests--;
			gContacts.interval = setInterval(heartBeat, 1000);
		}
	}
}

// generic response processing for contact pages
function get_response(res) {
	// only if req is "loaded"
	if (res.readyState == 4) {
		// only if "OK"
		if (res.status == 200) {
			// window.alert(res.responseText);
			processPage(res.responseText);
			gContacts.requests--;
		}
	}
}

// XHR implementation
// the overrideMimeType is apparently available to Moz' native XHR
function requestPage(src, func) {
	var xhr = new window.XMLHttpRequest();
	xhr.onreadystatechange = function() { func(xhr); };
	xhr.open("GET", src);
	// this fixes the content type glitch...
	xhr.overrideMimeType("text/html; charset=ISO-8859-1");
	xhr.send(null);
}


function outputToTab(str) {
	GM_openInTab("data:text/plain;charset=UTF-8," + encodeURI(str));
	// GM_openInTab("data:text/plain;charset=iso-8859-1," + encodeURI(str));
}

function heartBeat() {
	if ((gContacts.requests < gContacts.MAXREQ) && gContacts.url_queue.length) {
		// feedback
		var btn = document.getElementById("gm_limapper_btn");
		btn.setAttribute("value", "Spidering (" + gContacts.url_queue.length + ")..."); 
		// work: get next URL
		requestPage(gContacts.url_queue.pop(), get_response);
	}
	if ((gContacts.requests == 0) && (gContacts.url_queue.length == 0)) {
		clearInterval(gContacts.interval);
		// output results after last request has been processed
		//outputToTab(gContacts.toDotString());
		outputToTab(gContacts.toObjString());
		evtDone();
	}
}


function evtStart() {
	// selfTest(); return; // NOTE: test
	requestPage("http://www.linkedin.com/profile", get_my_id); // pgtxt
	var btn = document.getElementById("gm_limapper_btn");
	btn.setAttribute("value", "Get Start Node...");
	btn.removeEventListener('click', evtStart, true);
	btn.addEventListener('click', evtStop, true);
}
function evtStop() {
	if (window.confirm("Stop processing? Result set will be incomplete...")) {
		clearInterval(gContacts.interval);
		// output results right away
		outputToTab(gContacts.toObjString());
		var btn = document.getElementById("gm_limapper_btn");
		btn.setAttribute("value", "Resume");
		btn.removeEventListener('click', evtStop, true);
		btn.addEventListener('click', evtResume, true);
	}
}
function evtResume() {
	gContacts.interval = setInterval(heartBeat, 1000);
	var btn = document.getElementById("gm_limapper_btn");
	btn.setAttribute("value", "Resuming...");
	btn.removeEventListener('click', evtResume, true);
	btn.addEventListener('click', evtStop, true);
}
function evtDone() {
	var btn = document.getElementById("gm_limapper_btn");
	btn.setAttribute("value", "Done.");
	btn.setAttribute("disabled", "disabled");
}

function Initialize() {
	// initial contacts page url
	gContacts.url_push("/connections");	// pgtxt
	// "start" button on linkedin page
	var ovl = document.createElement("input");
	ovl.setAttribute("id", "gm_limapper_btn");
	ovl.setAttribute("type", "button");
	ovl.setAttribute("value", "Create JS Model");
	ovl.style.position = "absolute";
	ovl.style.top = "12px";
	ovl.style.right = "12px";
	ovl.style.backgroundColor = "lime";
	// start watching request queue every second
	ovl.addEventListener('click', evtStart, true);
	document.getElementsByTagName("body")[0].appendChild(ovl);
}

Initialize();
// -------------------------- testing stuff -------------------

function li_dbg(str) {
	GM_log(str);
}

function selfTest() {
	gContacts.myKey = 1;
	gContacts.add(1, "Home");
	gContacts.add(2, "A", 'amail@test.com', 1);
	gContacts.add(3, "B", 'bmail@B.com', 2);
	gContacts.add(4, "C", 'cmail@C.com', 2);
	gContacts.add(5, "D", null, 1);
	gContacts.add(6, "E", null, 1);
	gContacts.add(7, "F", 'fmail@F.com', 6);
	gContacts.add(6, "E", null, 5);
	
	outputToTab(gContacts.toObjString());
	evtDone();
}



// end user script