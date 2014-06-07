// Copyright (c) 2008, Mike Wilt :: mikewilt [at] gmail.com
//
// ==UserScript==
// @name          Gmail - Add Right Click Menu
// @namespace     http://www.room117.com
// @description	  Adds a right click on menu to Gmail 
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==


/* ************************** */
/* Append stylesheet to page  */
/* ************************** */

addGlobalStyle('#RC_Menu{font-family: Arial, Helvetica, sans-serif;font-size:13px;color: #336699;border-collapse:collapse;position:absolute;width:175px;border:1px solid #CCCCCC;background-color: #EEEEEE;cursor: pointer;z-index:100;}tr.RC_MenuItem{height:20px;}td.RC_label{width:145px;font-weight:bold;text-align:left;padding-left:8px;}td.RC_shortcut{width:20px;font-size:12px;text-align:left;padding-right:2px;}tr.RC_hr,td.RC_hr{padding:0px;}hr{width:175px;background-color: #CCCCCC;border: 0px;height: 1px;}');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


/* ************************************* */
/* Initiate Greasemonkey API for Gmail   */
/* ************************************* */

window.addEventListener('load', function() {  
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', function(gmail) {


/* ******************************************* */
/* Begin code after initiating function(gmail) */
/* ******************************************* */

// Get pointer to Gmail's content window
var win = window.top.document.getElementById('canvas_frame').contentWindow;

// Create right click menu table
var RC_MenuTable = document.createElement("table");
RC_MenuTable.id = 'RC_Menu';
RC_MenuTable.style.display = 'none';

RC_MenuTable.innerHTML = '<tr class="RC_MenuItem" url="#compose"><td class="RC_label">Compose new</td><td class="RC_shortcut">c</td></tr>' +
					  '<tr class="RC_hr"><td class="RC_hr" colspan="2"><hr></td></tr>' + 
					  '<tr class="RC_MenuItem" url="#inbox"><td class="RC_label">Inbox</td><td class="RC_shortcut">g,i</td></tr>' +  
					  '<tr class="RC_MenuItem" url="#starred"><td class="RC_label">Starred</td><td class="RC_shortcut">g,s</td></tr>' + 
					  '<tr class="RC_MenuItem" url="#chats"><td class="RC_label">Chats</td><td class="RC_shortcut"></td></tr>' + 
					  '<tr class="RC_MenuItem" url="#sent"><td class="RC_label">Sent Mail</td><td class="RC_shortcut">g,t</td></tr>' +  
					  '<tr class="RC_MenuItem" url="#drafts"><td class="RC_label">Drafts</td><td class="RC_shortcut">g,d</td></tr>' + 
					  '<tr class="RC_MenuItem" url="#all"><td class="RC_label">All Mail</td><td class="RC_shortcut">g,a</td></tr>' + 
					  '<tr class="RC_hr"><td class="RC_hr" colspan="2"><hr></td></tr>' + 
					  '<tr class="RC_MenuItem" url="#contacts"><td class="RC_label">Contacts</td><td class="RC_shortcut">g,c</td></tr>';

// Insert right click menu at bottom of page
win.document.body.appendChild(RC_MenuTable);

// Save right click menu as an object
var RC_Menu=win.document.getElementById("RC_Menu");



/* ******************************************************** */
/* Functions to open/close/position/style/activate menu 	*/
/* ******************************************************** */

/* Show menu */
function showMenu(e) {
	var RC_MenuWidth = 177;
	var RC_MenuHeight = 190;
	
	var rightEdge= window.top.innerWidth-e.clientX;
	var bottomEdge = window.top.innerHeight-e.clientY;
	
	// If the menu overlaps with the default right click menu, try adjusting this variable.  For FF3 on Windows Vista I set it to 190; for FF2 on Windows Vista or XP I set it to 180
	var defaultContextMenuWidth= 195;

	// If menu is off the right side of the page...
	if (rightEdge<defaultContextMenuWidth) { 
		// ...move the menu to the left by the width of the default menu
		RC_MenuTable.style.left= (window.top.innerWidth-RC_MenuWidth-defaultContextMenuWidth)+"px";
		} else
			// if the menu is off the left side of the page...
			if (e.clientX<defaultContextMenuWidth) { 
				// ...move the menu to the right by the width of the default menu plus the distance from the edge where the mouse was clicked
				RC_MenuTable.style.left= (defaultContextMenuWidth+e.clientX)+"px";
				} else {
					//position the horizontal position of the menu to the left of where the mouse was clicked
					RC_MenuTable.style.left= (win.pageXOffset+e.clientX-RC_MenuWidth)+"px";
					}

	//apply similar concept to vertical position
	if (bottomEdge<RC_MenuHeight) {
		RC_MenuTable.style.top = (win.pageYOffset+e.clientY-RC_MenuHeight)+"px";
		} else {
			RC_MenuTable.style.top = (win.pageYOffset+e.clientY)+"px";
			}
	
	RC_MenuTable.style.display='';
	return false;
}


/* Hide menu */
function hideMenu() {
	RC_MenuTable.style.display='none';
	return false;
}


/*  Highlight row on mouse over  */
function highlight(e){
	var firingobj= e.target;
	if (firingobj.parentNode.className=="RC_MenuItem") {
		firingobj.parentNode.style.backgroundColor="#CCCCCC";
		firingobj.parentNode.style.color="#496397";
	}
}


/*  Lowlight row on mouse out  */
function lowlight(e){
	var firingobj= e.target
	if (firingobj.parentNode.className=="RC_MenuItem"){
		firingobj.parentNode.style.backgroundColor="";
		firingobj.parentNode.style.color="#336699";
	}
}


/*  Visit link on click  */
function jumpTo(e){
	var firingobj= e.target;
			if (firingobj.parentNode.className=="RC_MenuItem") {
				firingobj=firingobj.parentNode;
				}
				top.location.hash = firingobj.getAttribute("url")
}


/* ************************** */
/* 		Event Listeners		  */
/* ************************** */

/* on right click */
win.document.addEventListener(
    "contextmenu",
    function(event) {
	  showMenu(event);
    },
    true);

/* after right click menu appears on screen */
win.document.addEventListener(
    "click",
    function(event) {
	  hideMenu(event);
    },
    true);


/* highlight rows on mouseover */
RC_Menu.addEventListener(
"mouseover",
    function(event) {
	   highlight(event);
    },
    true);


/* lowlight rows on mouseout */
RC_Menu.addEventListener(
"mouseout",
    function(event) {
	   lowlight(event);
    },
    true);
	

/* jump to url on click */ 
RC_Menu.addEventListener(
"click",
    function(event) {
	   jumpTo(event);
    },
    true);


/* ******************************************* */
/*                                             */
/* End code and close function(gmail)          */
/*                                             */
/* ******************************************* */

    });
  }
}, false);