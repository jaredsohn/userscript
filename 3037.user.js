// ==UserScript==
// @name           Litefeeds override popup
// @namespace      http://eric.themoritzfamily.com/greasemonkey
// @description    This overrides the litefeeds popup so that firefox works the way it should.
// @include        http://www.litefeeds.com/myfeeds/myFeedsLib.jsp*
// ==/UserScript==

function main(){
  // Get all the anchors on the page
  anchors = document.getElementsByTagName("a");

  // Loop over each anchor
  for (var i = 0; i < anchors.length; i++) { 
    anchor = anchors[i]; 

    // Get the anchor's id
    var idref = anchor.getAttribute("id");

    // If the anchor is not local
    if (idref!="local"){
      // Remove the onClick event handler so that it doesn't open a new window.       // The anchor's '_blank' target is good enough (I make it open a new tab anyway)
      anchor.setAttribute("onClick", "");
    }
  }
}

window.addEventListener(
    'load', 
    main,
    true);