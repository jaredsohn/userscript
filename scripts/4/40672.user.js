// ==UserScript==
// @name          paid4clickz.com Auto Click [WORKING]
// @namespace      paid4clickz.comautoclick
// @description    Auto Click Ads On Bux.to. Comes with 2 options that you change inside the script; logout when finished, and close main window when finished.
// @include         http://wwww.paid4clickz.com/surf.php
// @include        http://wwww.paid4clickz.com/index.php
// @author         JoeSimmons
// @copyright      JoeSimmons
// @version        1.6
// ==/UserScript==

var close_window_when_done, logout_when_done;

// Adapted from CAzh's script

//////////////////////////////////////////
// Version history
// 1.0 - Script created
// 1.1 - Ad window closing added
// 1.2 - Main window closing option added
// 1.3 - Logout option added
// 1.4 - Only runs when logged in
// 1.5 - Switched to xpath
// 1.6 - Added switching to surf.php
//////////////////////////////////////////

//////////////////////////////////////////
//////////////////////////////////////////
// OPTIONS ///////////////////////////////
close_window_when_done = false;
logout_when_done = false;
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////


// Switch to surf.php if you just logged in
if(document.body.textContent.indexOf("Logout") !== -1 && location.href == "http://wwww.paid4clickz.com/index.php")
{ location.href = "http://wwww.paid4clickz.com/surf.php"; }


var i, a, w, sec, timena, foundAd;

	function setTimers() {
		setInterval(function () {
			timena = parseInt(document.getElementById("sec").textContent) - 1;
			document.getElementById("sec").textContent = timena.toString();
			if (timena == 0) location.href="http://wwww.paid4clickz.com/surf.php";
		},1000);
	}

a = document.evaluate("//a[@class='al4']", document, null, 7, null);

function main() {
foundAd = false;
if(document.body.textContent.indexOf("Logout") !== -1)
{
sec = document.createElement("span");
sec.setAttribute("style", "background:grey; color:black; border:1px solid black; padding:5em; position:absolute; top:0px; left:0px;");
sec.setAttribute("id", "sec");
sec.appendChild(document.createTextNode("45"));
document.body.appendChild(sec);

for(i=0; i<a.snapshotLength; i++) {
  ad = a.snapshotItem(i);
	w = window.open(ad.href.toString(), "adWindow");
	foundAd = true;
	break;
}

if(foundAd === false)
{
// close ad window when there are no ads left
w = window.open("http://paid4clickz.com/", "adWindow");
if(w) w.close();

// remove timer
document.body.removeChild(document.getElementById("sec"));

// logout if option is true
if(logout_when_done) location.href = "http://wwww.paid4clickz.com/logout.php";


// close window if option is true
if(close_window_when_done) window.close();

}
else setTimers();
}
}

if (document.addEventListener) {
window.addEventListener("load", main, false);
}
else {
window.document.onLoad = main();
}


Because it's your web. A tremendous project with the help from our friends.
