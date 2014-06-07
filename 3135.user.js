/*
 * Title:
 * 	LJ: anonymous posting warning.
 * 
 * Author:
 *      John Morton
 * 
 * Last Updated:
 * 	  2006-11-24
 */

// ==UserScript==
// @name LJ: anonymous posting warning
// @namespace http://angrymonkey.net.nz/
// @description Makes it more obvious that you're posting anonymously.
// @include http://*.livejournal.com/*
// @exclude 
// ==/UserScript==


var bgchanger =  function(event) {
  if (event == null || event.target.id == "talkpostfromanon" ||
      event.target.id == "talkpostfromoidlo" || 
      event.target.id == "talkpostfromlj" ) {

    var bg_colour = "rgb(100%,20%,20%)";
    
    // Set the background of the containing row of the anonymous posting
    // selector to red.
    var anon_node = document.getElementById("talkpostfromanon");
    if (anon_node != null) {
      if (anon_node.nodeName.toLowerCase() == "input" && 
          anon_node.type == "radio" && anon_node.checked == true) {
        // This could be smarter, certainly...
        if (anon_node.parentNode.nodeName.toLowerCase() == "td") {
          anon_node.parentNode.parentNode.style.backgroundColor = bg_colour;
        }
        anon_node.parentNode.style.backgroundColor = bg_colour;
      } else {
        if (anon_node.parentNode.nodeName.toLowerCase() == "td") {
          anon_node.parentNode.parentNode.style.backgroundColor = null;
        }
        anon_node.parentNode.style.backgroundColor = null;
      }
    }
  }
};
 
bgchanger(null);
document.addEventListener('change', bgchanger, true);

  
