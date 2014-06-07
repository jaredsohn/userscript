// ==UserScript==
// @name           BrainfreezeWarz SFW
// @include        http://forumwarz.com/*
// @include        http://*.forumwarz.com/*
// @exclude        http://forumwarz.com/forums/battle*
// @exclude        http://*.forumwarz.com/forums/battle*
// ==/UserScript==

// calling tubmail function to insert tubmail link
tubmail();

// hides the topbar background...dirty, but gets the job done
addGlobalStyle("div#topbar { background: url() repeat-x !important; }");
// replaces logo
document.getElementById("fwz_logo").src = "http://img8.imageshack.us/img8/8743/logoneu.png";
// replacing text
var status = document.getElementById("logged_in_status");
status.innerHTML = status.innerHTML.replace(/IS A STUPID NAME/, "IS PROCRASTINATING");
status.innerHTML = status.innerHTML.replace(/AND A TINY PENIS/, "");
status.innerHTML = status.innerHTML.replace(/FUCK OFF/, "LOGOFF");
status.innerHTML = status.innerHTML.replace(/MY FAGS/, "ALTS");



// Edit Style
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName("head")[0];
    if (!head) { 
		return; 
	}
    style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;
    head.appendChild(style);
}
// Adds Tubmail link
function tubmail() {
	var link = " | " + "<a href=\'/inbox/mail\'>TUBMAIL</a>";
    var tmLocation, insertLink;
    tmLocation = document.getElementsByTagName("a")[2];
    if (!tmLocation) { 
		return; 
	}
    insertLink = document.createElement("a");
    insertLink.innerHTML = link;
    tmLocation.parentNode.insertBefore(insertLink, tmLocation.nextSibling);
}