// ==UserScript==

// @name           hidebots

// @namespace      ws.openarena

// @description    Hides the bots

// @include        http://dpmaster.deathmask.net/?game=openarena*showplayers=1*

// @version        1.1

// ==/UserScript==



// Players you want highlighted.

// It does not matter if the name has colors, only the characters matter.

// The names must be LOWERCASE!

var highlightedPlayers = [
  ['red', ['fatal1ty', 'zero4', 'cooller', ]],
  ['orange', ['player', ]],
  ];

// Hide servers with no human players?
var hideEmptyServers = false;



// Pings larger than this value are considered bad.

// The users who have a bad ping are marked accordingly.

var badPing = 202;

var largePingTextDecoration = 'line-through';



// Color to be used for the column headers

var columnHeaderColor = 'gray';


function removeElements() {
  for (var i = 0; i < removeElements.arguments.length; i++) {
    var element = removeElements.arguments[i];
    element.parentNode.removeChild(element);
  }
}



var divElements = document.getElementsByTagName("DIV");

var countServerPlayers = 0;

for (var i = divElements.length - 1; i > 0; i--) {

  var thisElement = divElements[i];

  if (thisElement.id == 'handle') {
    // Found a row:

    var handleElement = thisElement;

    var fragsElement = divElements[i - 1];

    var pingElement = divElements[i - 2];

    var spacerElement = divElements[i - 3];

    var newlineElement = handleElement.nextSibling;



    // Skip 3 divs

    i = i - 3;

    

    // Is this row showing column headers?

    if (pingElement.innerHTML == 'PING') {
      // Does the current server have any human players?
      if (countServerPlayers == 0) {
        removeElements(newlineElement, handleElement, fragsElement, pingElement, spacerElement);
      } else {
        handleElement.style.color = columnHeaderColor;

        fragsElement.style.color = columnHeaderColor;

        pingElement.style.color = columnHeaderColor;
      }
      countServerPlayers = 0;

    } else {

      var ping = parseInt(pingElement.innerHTML, 10);

      // Is this row showing a bot?

      if (ping == 0) {

        removeElements(newlineElement, handleElement, fragsElement, pingElement, spacerElement);

      } else {
        countServerPlayers += 1;

        // Mark players with bad ping.

        if (ping > badPing) {

          handleElement.style.textDecoration = largePingTextDecoration;

          fragsElement.style.textDecoration = largePingTextDecoration;

          pingElement.style.textDecoration = largePingTextDecoration;

        }

        // Mark highlighted players. ;)

        for (var aw = 0; aw < highlightedPlayers.length; aw++) {
          background = highlightedPlayers[aw][0];
          players = highlightedPlayers[aw][1];

          for (var p = 0; p < players.length; p++) {

            if (handleElement.textContent.toLowerCase().indexOf(players[p]) > -1) {

              spacerElement.style.background = background;

            }
          }

        }

      }

    }  // else is row containing column headers

  }

}  // for each div


// Remove or move-at-the-end the empty servers.

// Get the element immediately following the divs.
var brElements = document.getElementsByTagName("BR");
var endElement = brElements[brElements.length - 3];  // !!

// For each A element which contains a SPAN element,
var aElements = document.getElementsByTagName("A");

for (var i = aElements.length - 1; i >= 0 ; i--) {
  var thisElement = aElements[i];
  var spanElement = thisElement.firstChild;
  if (spanElement && spanElement.tagName == 'SPAN') {
    // Is this an empty server?
    // BR, nl, A
    if (thisElement.nextSibling && thisElement.nextSibling.nextSibling && thisElement.nextSibling.nextSibling.nextSibling && thisElement.nextSibling.nextSibling.nextSibling.tagName != "DIV") {
      if (hideEmptyServers) {
        // Remove the A element and also the following BR.
        removeElements(thisElement.nextSibling, thisElement);
      } else {
        // Move the server below: BR following A, A
        endElement.parentNode.insertBefore(thisElement.nextSibling, endElement);
        endElement.parentNode.insertBefore(thisElement, endElement);
      }
    }
  }
}


// Move the server ip out of the links, so the text can be selected. ;)

// For each A element which contains a SPAN element,
aElements = document.getElementsByTagName("A");

for (var i = aElements.length - 1; i >= 0 ; i--) {
  var thisElement = aElements[i];
  var spanElement = thisElement.firstChild;
  if (spanElement && spanElement.tagName == 'SPAN') {
    // Move the first element in the span before the A element.
    thisElement.parentNode.insertBefore(spanElement.firstChild, thisElement);
  }
}

// Replace the font elements with color=black, which are invisible on a black background
fontElements = document.getElementsByTagName("FONT");

for (var i = 0; i < fontElements.length; i++) {
  var thisElement = fontElements[i];
  if (thisElement.color == "black") {
    var newElement = document.createElement("FONT");
    newElement.textContent = thisElement.textContent;
    thisElement.parentNode.replaceChild(newElement, thisElement);
  }
}