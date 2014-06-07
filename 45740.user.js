//
// version 0.1.2
// 2008-Oct-04
// Copyright (c) 2008, Ektdeheba
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "IkariamMemberLastOnline", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Version History:
// 0.1.0: Original Public Release
// 0.1.1: Added function to clarify date conversion from Ikariam
// internal system dates to javascript Date objects, and changed
// 'nowDate' to server's system time rather than user's computer clock.
// 0.1.2: Fix formatting and a typo
// 
// --------------------------------------------------------------------
//
// This script replaces the lightbulb online status indicator
// with the date that Alliance member was last online
// on the Diplomatic Adviser - Alliance - Member List and
// the Embassy - Member List pages.  This should make it
// easier to manage which members have been inactive for
// long periods of time.
// If the last online date is more than seven days old,
// that date will appear in bold and have a little '(i)'
// next to it to indicate that player is inactive.
//
// Feel free modify any way you wish; as long as you leave
// a little credit, and of course publish for the players
// of Ikariam!
//
// This script was originally created by Ektdeheba, 
// with a function borrowed from wphilipw in
// the IkariamScoreLinker.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           BYBS Now Online
// @namespace      domz
// @description    Replaces the lightbulb with the date last online when viewing the Alliance Member List.
// @include        http://*.ikariam.*/*
// ==/UserScript==

/*
This function lets us access an element by it's class name
Original Author: wphilipw
*/

document.getElementsByClass = function(className) {
  var all = document.getElementsByTagName('*');
  var elements = new Array();
  for (var e = 0; e < all.length; e++)
    if (all[e].className == className)
      elements[elements.length] = all[e];
  return elements;
}


/*
This function extends the String prototype to add the trim method
Original Author: http://www.whadiz.com/
Source: "http://www.whadiz.com/what-is.aspx/programming/javascript/javascript-trim"
*/

String.prototype.trim = function() {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}


/*
This function runs when the system starts
Original Author: Ektdeheba
For version: 0.1.0
Last changed: 0.1.0
*/

function init() {
    // if we are looking at the member listing
    var memberInformation = document.getElementById('memberList');
    if (memberInformation){
        // and if the list has any items in it -- but it always should...
        var listElements = memberInformation.getElementsByTagName('td');
        if (listElements.length > 0){
            // then call the script
            addLastOnline_fn();
        }
    }
}


/*
This function helps convert the Ikariam internal date format (day.month.year)
to the javascript Date Object format (year,month,day).
Original Author: Ektdeheba
For version: 0.1.1
Last changed: 0.1.2
*/
function convertIkariamDate( argDate ) {
    var returnDate = new Date(
        argDate.split(".")[2],      // Year Argument
        argDate.split(".")[1] - 1,  // Month Argument (ZERO based), subtract one to offset
        argDate.split(".")[0]);     // Day Argument
    return returnDate;
}


/*
The main function
Original Author: Ektdeheba
For version: 0.1.0
Last changed: 0.1.1
*/

function addLastOnline_fn() {
    var e = 0;  // loop iterator
    var onlineMemberList = document.getElementsByClass("online");
    var offlineMemberList = document.getElementsByClass("offline");
    
    // Online Members - "Online Now"
    for ( e = 0; e < onlineMemberList.length; e++){
        onlineMemberList[e].innerHTML += "Online Now"
        onlineMemberList[e].style.backgroundImage = "none"
    }
    
    var nowDateStr = document.getElementById('servertime').innerHTML.split(" ")[0].trim();
    var nowDate = convertIkariamDate( nowDateStr );
    var inactiveDate = new Date();
    inactiveDate.setDate( nowDate.getDate() - 7 );  // accounts generally go inactive after seven days
    
    // Offline Members - last date logged in
    for ( e = 0; e < offlineMemberList.length; e++){

        var lastOnline = offlineMemberList[e].title.split(":")[1].trim()
        var lastDate = convertIkariamDate( lastOnline );

        if( lastDate < inactiveDate ){
            offlineMemberList[e].innerHTML += "<B>"+lastOnline+" (i)</B>"
        }else{
            offlineMemberList[e].innerHTML += lastOnline
        }
        offlineMemberList[e].style.backgroundImage = "none"
    }
}


/*
The startup functions and global variables.
*/

init();