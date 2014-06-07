/*
 * Title:
 * 	Livejournal: force preformatting off
 * 
 * Author:
 *      John Morton
 * 
 * Last Updated:
 * 	  2006-02-02
 */

// ==UserScript==
// @name LJ: force preformatting off
// @namespace http://angrymonkey.net.nz/
// @description Forces preformatting off on Livejournal posts and comments. 
// @include http://*.livejournal.com/*
// @exclude 
// ==/UserScript==

(function(){

  var this_node;
    
  // Set the comment preformatting input to checked.
  this_node = document.getElementById("prop_opt_preformatted");
  if (this_node != null) this_node.checked = true;
  
  // Set the posting formatting to preformatted
  this_node = document.getElementById("event_format");
  if (this_node != null) {
    for (var j = 0; j < this_node.length; j++){
      if (this_node.options[j].value == "preformatted") {
        this_node.options[j].selected = true;
      } else {
        this_node.options[j].selected = false;
      }
    }
  }

  var element, current_text, hasRaw;
  var rawRe =  /^\s*<lj-raw>.*/;
  // Insert <lj-raw> tags into the textareas.
  for (var f = 0; f < document.forms.length; f++){    
    for (var e = 0; e < document.forms[f].elements.length; e++) {
      element = document.forms[f].elements[e];
      if (element.type == "textarea" && 
          (element.name == "event" || element.name == "body" ||
           element.id == "commenttext") ) {        
        current_text = element.value;
        hasRaw = rawRe.exec(current_text);
        if (hasRaw == null) {
          element.value = "<lj-raw>\n" + current_text + "\n</lj-raw>";
        }
      }
    }
  }
 })()

