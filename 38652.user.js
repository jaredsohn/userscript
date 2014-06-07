// CouchSurfing: Neutral References
// Version 1.0
// 2008-12-15
// 2008 by Carlos Martin
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script!
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "CouchSurfing: Neutral References", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           CouchSurfing: Reference Stats
// @namespace      http://sites.google.com/site/cscarloszgz
// @description    Adds to the CS profiles statistics about the sent and received refrences
// @include        http://www.couchsurfing.com/profile*
// @include        http://www.couchsurfing.com/people*
// @include        http://www.couchsurfing.com/mapsurf*
// @include        http://www.couchsurfing.org/profile*
// @include        http://www.couchsurfing.org/people*
// @include        http://www.couchsurfing.org/mapsurf*

// ==/UserScript==


// Load on/off switch to grease menu
// Copied from http://wiki.greasespot.net/Code_snippets#Make_menu_toggle
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
   /* Load current value into variable */
   window[key] = GM_getValue(key, defaultValue);
   /* Add menu toggle */
   GM_registerMenuCommand( (prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn),
                           function() { GM_setValue(key, !window[key]); location.reload(); } 
                         );
}

// Add possibility to (de)activate customisable ratio
makeMenuToggle("custom_ratio_activated", true, "Activate custom ratio", "Deactivate custom ratio", "Reference stats");

var reftot = 0;
var hosted = 0;
var surfed_with = 0;
var traveled = 0;
var met_in_person = 0;
var not_met_in_person = 0;
var refneg = 0;
var refpos = 0;
var refneu = 0;
var invalid = 0;

var header;
var divs = document.evaluate("//div", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null);

for (var i = 0; i < divs.snapshotLength; i++) {
   var div = divs.snapshotItem(i); 

   // Handler to the title
   if (div.innerHTML.search (/<h1 class/g) != -1) {
      header = divs.snapshotItem(i); 
   }

   if (div.className == "reference_from" || div.className == "reference_to" || div.className == "refnotIRL") {
      reftot++;  

      // Relevance
      if (div.innerHTML.search (/icon_surfed_with/g) != -1) {hosted++;}
      else if (div.innerHTML.search (/icon_hosted/g) != -1) {surfed_with++;}
      else if (div.innerHTML.search (/icon_traveled_with/g) != -1) {traveled++;}
      else if (div.className != "refnotIRL") {met_in_person++;}
      else {not_met_in_person++;}

      // Positive, negative & Neutral refs
      if (div.innerHTML.search (/>Positive</g) != -1) {refpos++;}   
      else if (div.innerHTML.search (/>Negative</g) != -1) {refneg++;}
      else if (div.innerHTML.search (/This reference is not appropriate.<br/g) != -1) {invalid++;}
      else {refneu++;}
   }
}

// ------------------------------------------------------------
// CUSTOMIZATION OF Custom Ratio
// ------------------------------------------------------------
// Available variables:
// 
//             reftot  Total References (sent and received)
//             hosted  Hosted
//        surfed_with  Surfed with
//           traveled  Just traveled with
//      met_in_person  Just met in person
//  not_met_in_person  Not even met in person
//             refneg  Number of negative references
//             refpos  Number of positive references
//             refneu  Number of neutral references
//            invalid  Number of inappropriate references
// 
// ------------------------------------------------------------

// Formula to calculate the ratio (you can use the variables described above)
var custom_ratio = (surfed_with + hosted) * 100 / reftot;

// Description of the ratio to display in the stats box
var custom_ratio_description = "(surfed + hosted) / total";

// ------------------------------------------------------------
// (end of customization)
// ------------------------------------------------------------


var txt = "<div style='border: 1px solid #000000; background-color:rgb(255,255,255); padding: 5px 5px 5px 5px;FONT-SIZE: 8pt; WIDTH: 600px'>";
txt = txt + "<b>Sent & Received references: " + reftot + "</b><br/>";
txt = txt + "Positive=" + refpos + "; ";
txt = txt + "Neutral="  + refneu + "; ";
txt = txt + "Negative=" + refneg + "; ";
txt = txt + "Inappropriate=" + invalid + "<br/>";
txt = txt + "Hosting/Surfing=" + (hosted+surfed_with) + "; ";
txt = txt + "Just traveling=" + traveled + "; ";
txt = txt + "Just met in person=" + met_in_person + "; ";
txt = txt + "Not met in person=" + not_met_in_person;
if (custom_ratio_activated) {
   txt = txt + "<br/><a target='_blank' href='http://sites.google.com/site/cscarloszgz/greasemonkey-scripts-for-couchsurfing/editing-custom-ratio-in-reference-sats-script'>";
   txt = txt + "Custom ratio</a> [ " + custom_ratio_description + " ] = " + custom_ratio.toFixed(2) + "%";
}
txt = txt + "</div>";

header.innerHTML = txt + header.innerHTML;