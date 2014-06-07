// ==UserScript==
// @name           SB Blocker 1.0.4
// @namespace      SB
// @description    Blocks special users, changes usernames and colors, adds Refresh Button, changes SB Title
// @include        http://forum.szene1.at/chat
// author: pbammer    18.02.2011

// ==/UserScript==

// Version 1.0.1: Added colors for special users, added Nickchange
// Version 1.0.2: Added F5 mouseover button
// Version 1.0.3: Added colors for all users
// Version 1.0.4: minor bugfixes for chrome

// changes Color and Username


function CheckBrowserName(name) {  

var agent = navigator.userAgent.toLowerCase();  
    
  if (agent.indexOf(name.toLowerCase())>-1) {  
    return true;  
  }  // end if
    return false;  
}  // end CheckBrowserName

function RefreshButton() {

var allElements, thisElement;

allElements = document.getElementsByClassName('box');
var pos = 0; 
var refresh = "<input type='button' value='F5' onmouseover='window.location.href=window.location.href'>";

  for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    if (thisElement.innerHTML.search("Message:") != -1) {
	  pos = thisElement.innerHTML.search('Message:')+8;
      thisElement.innerHTML = thisElement.innerHTML.substr(0, pos) + refresh + thisElement.innerHTML.substr(pos);
    } // end if	
  } // end for

} // RefreshButton

function ChangeSbName() {

var allElements, thisElement;

allElements = document.getElementsByClassName('box');
var replace = "<b>~-~-~-~syst3ml0rds Spielwiese~-~-~-~</big>";  // change SB Text here
var SbName = "... eine Box die sie \"Shout\" nannten. Denn sie wissen nun <sub>hoffentlich</sub> was sie taten.";

  for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];	
    if (thisElement.innerHTML.search(SbName) != -1) {
      thisElement.innerHTML = thisElement.innerHTML.replace(SbName, replace);
    } // end if	
  } // end for

} // ChangeSbName
 
function ChangeStyle() { 

var allElements, thisElement;
var found;
var posting;
var tempname;

  allElements = document.getElementsByClassName('postauthor');
  user = new Array("systemlord6680", "Lisa1207", "reisi1990", "jasmiiin", "wuzel87", "magdazeini", "FroschmitLocke", "timide86", "_urViecH_");
  newNick = new Array("syst3ml0rd", "Lisa1207", "re1si", "minchen ", "wuzel87", "magdazeini", "FroschmitLocke", "timide86", "_urViecH_");


  for(var z = 0; z < user.length; z++) {

    for (var i = 0; i < allElements.length; i++) {
      thisElement = allElements[i];
      found = thisElement.innerHTML.search(user[z]);
      if (found != -1) { 

	    var newHTML = thisElement.innerHTML;
	    var replace = user[z] 
	    newHTML = newHTML.replace(user[z], newNick[z]); 
	    tempname = thisElement.innerHTML;

	    var temp = "";
	    var cnt = found;
	    for(var j = 0; j < cnt; j++) {
	      temp = temp + newHTML[j];
	    } // end for
	  
	    if(CheckBrowserName('firefox')){  
	      temp = temp + "<small>";    
        } // end if
	    if (tempname.search("jasmiiin") != -1) {
          temp = temp + "<font color='#FF00FF'>";
   	    } else if (tempname.search("FroschmitLocke") != -1) {
	      temp = temp + "<font color='#FF0080'>";
	    } else if (tempname.search("timide86") != -1) {
	      temp = temp + "<font color='#0B0B61'>";
	    } else if(tempname.search("Lisa1207") != -1) {
	      temp = temp + "<font color='#008000'>";
	    } else if(tempname.search("systemlord6680") != -1) {
	      temp = temp + "<font color='#00BFFF'>"; 
        } else if(tempname.search("_urViecH_") != -1) {
	      temp = temp + "<font color='#7C90FE'>";
        } else if(tempname.search("reisi1990") != -1) {
	      temp = temp + "<font color='#2F4F4F'>";			  
	    } // end if 
	  
	    for (j; j < replace.length+cnt; j++) {
	      temp = temp + newHTML[j]
	    } // end for
	  
	    if(CheckBrowserName('firefox')){
	      temp = temp + "</small>";
	    } // end if
		
	    for (j; j < newHTML.length; j++) {
	      temp = temp + newHTML[j];
	    } // end for

	    thisElement.innerHTML = temp;  //return changes

      } // end if
    } // end for
  } // end for
  
} // ChangeStyle


function RemoveUser() {

  var allPostings = document.getElementsByClassName('postbody');  
  var allUser = document.getElementsByClassName('postauthor');

  for (var i = 0; i < allPostings.length; i++) {
    if (allUser[i].innerHTML.search('Wolfi-WA') != -1) {  //change blocked user here
      allPostings[i].innerHTML = "";	 // changed posting
	  allUser[i].innerHTML = "ignored"; // changed Username
	} // end if
  } // end for 
  ChangeStyle();  // changes Style. To deaktivate put "//" at begin of the line
  RefreshButton();
  ChangeSbName();
  ChangeName();
} // RemoveUser



setTimeout(RemoveUser(), 1); 
