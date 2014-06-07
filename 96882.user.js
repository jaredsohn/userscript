// ==UserScript==
// @name           coordch
// @namespace      http://dosensuche.de
// @include        http*://www.geocaching.com/seek/cache_details.aspx*
// @description    replace link to coord.info with equivalent link to coord.ch
// ==/UserScript==

clone();

function clone() {
	// copy the HTML containing the GC code and replace event handler
	var wpSpan=document.getElementById("ctl00_uxWaypointName");
	var gccode=wpSpan.parentNode;
	var clone=gccode.cloneNode(true);
	var parent=gccode.parentNode;
	clone.setAttribute("class","clone"); // change class so that this copy will be ignored by other scripts
	clone.setAttribute("style",clone.getAttribute("style")+";text-decoration:none;color:#999999;"); // add styles lost by class change
	clone.id="cloneA"; // change id for the same reason
	gccode.setAttribute("oldstyle",gccode.getAttribute("style")); // save the CSS style
	gccode.setAttribute("style","display:none"); // hide original
	parent.appendChild(clone); // add copy
	clone.addEventListener("click",redirect,false); // add listener to copy
}

function unclone() {
	// undo changes made by clone()
	var wpSpan=document.getElementById("ctl00_uxWaypointName");
	var gccode=wpSpan.parentNode;
	var parent=gccode.parentNode;
	var clone=document.getElementById("cloneA");
	gccode.setAttribute("style",gccode.getAttribute("oldstyle")); // restore CSS style
	parent.removeChild(clone); // delete copy
}

function redirect() {
	// event handler to replace original
	// 1) generate URL for coord.ch
	// 2) restore HTML to the state before cloning
	// 3) call original event handler
	// 4) change URL
	// 5) clone again
	var waypoint=document.getElementById("ctl00_uxWaypointName").firstChild.data;
	var url="http://coord.ch/"+waypoint;
	var hidden=document.getElementById("dlgClipboard").getElementsByTagName("input")[0];
	var oldurl=hidden.value;
	var element=document.getElementById("ctl00_uxWaypointName").parentNode;
	var event=document.createEvent("MouseEvents");
	event.initEvent("click", true, false);
	unclone();
	element.dispatchEvent(event);
	hidden.value=url;
	var input=document.getElementById("dlgClipboard").getElementsByTagName("input")[0];
	input.focus();
	input.select();
	clone();
};

function log(s) {
	var c=document.getElementById("ctl00_Breadcrumbs");
	c.appendChild(document.createElement("br"));
	c.appendChild(document.createTextNode(s));
}


