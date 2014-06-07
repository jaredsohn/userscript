// ==UserScript==
// @name           Gmail Autologout
// @namespace      pandamatak.com
// @description    Autologout/Timed session in Gmail. Currently hardcoded to 5 minutes (300 seconds)
// ==/UserScript==
//
// With thanks to Chris Nguyen. He wrote the Gmail Search Unread script, which I took and hacked. 
//
// TODO: My original plan was to provide the 5 minute default session, while allowing the user to
// alter/reset this duration by typing directly into the text-input box holding the countdown. But
// I haven't yet been able to fix the (namespace/scope?) issue preventing me from getting the box's
// contents in timedSession(). As a consequence, I opted for the immediate working patch of passing
// the TD into the closure.
//
// Anand: Feb 22, 2011
//
function tryAgain(tries) {
    setTimeout(function() { gm_autologout(tries++); }, 500*tries);
}

function gm_autologout(tries) {
    tries = tries || 0;
    if (tries > 3) return; // give up, too many tries

    // Locate the canvas_frame iframe
    var f = document.getElementById("canvas_frame");
    if (f == null) return tryAgain(tries);

    // Locate the SEARCH table
    var d = f.contentWindow.document;
    if (d == null) return tryAgain(tries);
    var tables = d.getElementsByTagName("table");
    if (tables == null) return tryAgain(tries);
    var searchTable = null;
    for (var i in tables) {
	if (tables[i].getAttribute("role") == "search") {
	    searchTable = tables[i]; // found
	    break;
	}
    }
    if (searchTable == null) return tryAgain(tries);

    // Locate a visible Search "DIV" button (it's first non-hidden DIV that has non-empty text)
    var tds = searchTable.getElementsByTagName("TD");
    if (tds == null) {return};

    var newTD = document.createElement('td');
    newTD.setAttribute('align', "right");
    newTD.setAttribute('style', "height:10px;font-size:10px;color:red;");

    // Countdown from 300 seconds (5 minutes)
    newTD.innerHTML = "Timed session. Seconds remaining: <input id='gm_timer' style='font-weight:bold;width:50px;' value=300 />";
    searchTable.appendChild(newTD);

    timedSession(newTD); //  Start the timer
}

function timedSession(e) {
    var s = e.innerHTML;
    var n = parseInt(s.replace(/.*value=/, "").replace(/[^0-9]/g,""));
    if (n == NaN) {
	alert("Unparseable timer. Giving up on timing this session");
	e.innerHTML = "";
	return;
    }
    var newN = n-5;
    if (newN < 0) window.location="?logout";
    
    var newS = "Timed session. Seconds remaining: <input style='font-weight:bold;width:50px;' value=" + newN + " />";
    e.innerHTML = newS;
    setTimeout(function() {timedSession(e);}, 5000); //  Schedule reinvocation in 5 seconds
}

window.addEventListener('load', gm_autologout, false);
