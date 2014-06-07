// ==UserScript==

// @name           Shartak Map Overlay
// @namespace      http://mattandchristy.net/sharmap
// @description    Overlays your in-game Shartak map with BlackAnt's augmented one
// @include        http://*shartak.com/map.cgi*

// ==/UserScript==

/* /////////////////////////////////////////////////////////////

  Shartak Map Overlay
  version 0.3
  
  This will overlay BlackAnt's canonical map of the Shartak
  world onto your person Exploration map.
  
  THANKS TO:
  - BlackAnt, the original writer of the script
  - Johan Crichton for the map
  - Simon Amor the creator of Shartak

///////////////////////////////////////////////////////////// */




// define some constants

//var METAMAP_URL = "map_files/metamap.png";
var METAMAP_URL  = "http://i41.tinypic.com/1z17p0h.png";
var METAMAP_ID   = "blackantmap";
var MAP_WIDTH    = "840px";
var MAP_HEIGHT   = "426px"; // increased in v.3 from 376
var REMINDER_BG  = "#66aa66";
var REMINDER_FG  = "#333333";
var BUTTON_CLASS = "txbutton";
var BUTTONPANEL_CLASS = "buttons";
var ONBUTTON_ID  = "on_btn";
var OFFBUTTON_ID = "off_btn";

// get a reference to the IMG map
var allImages = document.getElementsByTagName("IMG");
var mapImage = allImages[0];

// create the DIV with appropriate properties
var mapDiv = document.createElement("DIV");
mapDiv.style.width = MAP_WIDTH;
mapDiv.style.height = MAP_HEIGHT;
mapDiv.style.backgroundImage = "url(" + mapImage.src + ")";

// replace the IMG with the transparent image and give it an ID
mapImage.src = METAMAP_URL;
mapImage.id = METAMAP_ID;
mapImage.style.display = "none";

// attach the new DIV
document.body.insertBefore(mapDiv, mapImage);

// move the IMG inside the DIV
document.body.removeChild(mapImage);
mapDiv.appendChild(mapImage);

// create javascript for toggling the map overlay
var toggleMapOn  = function(event) {
  // do the map toggle
  var mapImage = document.getElementById(METAMAP_ID);
  mapImage.style.display = "inline";
  var headers = document.getElementsByTagName("H1");
  headers[0].innerHTML = "Augmented map of Shartak";
  
  // stop event propagation, if this was a click
  if(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  
  // change the buttons, if they exist
  var onbtn = document.getElementById(ONBUTTON_ID);
  var offbtn = document.getElementById(OFFBUTTON_ID);
  if(onbtn) onbtn.style.display = "none";
  if(offbtn) offbtn.style.display = "inline";
}
var toggleMapOff = function(event) {
  // do the map toggle
  var mapImage = document.getElementById(METAMAP_ID);
  mapImage.style.display = "none";
  var headers = document.getElementsByTagName("H1");
  headers[0].innerHTML = "Your map of Shartak";

  // stop event propagation, if this was a click
  if(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  // change the buttons, if they exist
  var onbtn = document.getElementById(ONBUTTON_ID);
  var offbtn = document.getElementById(OFFBUTTON_ID);
  if(onbtn) onbtn.style.display = "inline";
  if(offbtn) offbtn.style.display = "none";
}

// add menu commands to toggle map on and off; also modify the reminder text
var reminderText = "";
if(GM_registerMenuCommand) {
  // register commands for toggling the map on and off
  GM_registerMenuCommand("Shartak map: Turn overlay OFF", toggleMapOff);
  GM_registerMenuCommand("Shartak map: Turn overlay ON", toggleMapOn);
} else {
  upgradeText = "You ought to <a href=\"http://greasemonkey.mozdev.org/\">upgrade</a> to a later version of GreaseMonkey.";
  var reminder = document.createElement("DIV");
  reminder.innerHTML = upgradeText;
  reminder.style.backgroundColor = REMINDER_BG;
  reminder.style.color = REMINDER_FG;
  document.body.appendChild(reminder);
}

// add buttons at the bottom to toggle map on and off
var divs = document.getElementsByTagName("DIV");
var buttonPanel = null;
for(i = 0; i < divs.length; i++) {
  if(divs[i].className == BUTTONPANEL_CLASS) {
    var buttonPanel = divs[i];
    break;
  }
}
if(buttonPanel == null) {
  GM_log("Can't find the button panel!");
  return;
}

// "turn on" button
var onButton = document.createElement("A");
onButton.addEventListener("click", toggleMapOn, true);
onButton.href = "#";
onButton.className = BUTTON_CLASS;
onButton.innerHTML = "Turn overlay on";
onButton.id = ONBUTTON_ID;
buttonPanel.appendChild(onButton);

// spacer
var spacer = document.createTextNode("\n");
buttonPanel.appendChild(spacer);

// "turn off" button
var offButton = document.createElement("A");
offButton.addEventListener("click", toggleMapOff, true);
offButton.href = "#";
offButton.className = BUTTON_CLASS;
offButton.innerHTML = "Turn overlay off";
offButton.id = OFFBUTTON_ID;
buttonPanel.appendChild(offButton);

// finally, hide the map
toggleMapOff();