// ==UserScript==
// @name        giveawayglow
// @namespace   grimwerk.com
// @description Highlights, counts, and hides giveaway forum topics.
// @include     http://www.gog.com/forum/general/page*
// @include     http://www.gog.com/forum/general#*
// @include     http://www.gog.com/forum/general
// @version     1
// @grant       none
// @author      grimwerk
// ==/UserScript==

// This script is very similar to giveawaynix, except this script highlights rather than hides
// giveaways by default.

// notes:
// I'm new to greasemonkey, but comfortable with javascript.  So this is mostly 
// javascript designed to run in the scope of a gog forum page.  I use
// greasemonkey to add a block of javascript to the gog page, and then that javascript
// inserts the control link, modifies forum topic color and display visibility.

// The white color scheme forum option won't break this script, but the gold text
// is a bit difficult to read against it. 

// This doesn't remember state between pages.  It always assumes you want threads hidden
// when a new page loads.

// re: the weird includes above -- gog sometimes updates the URL during
// or after pageload.  The third include seems to catch this.  A general*
// include would operate on the actual thread pages, which we don't want.

// thanks to Squak Mountain Consulting, Inc. for code used 
// to package up and insert my javascript 

var s = new Array();

// This javascript function simply adds the hide/show link to the uppermost forum header.
// Typically, it's the "list all topics" header, but if you have a favourite topics header
// the link will appear there instead.
s.push('function insert_giveaway_controls()');
s.push('  {');
s.push('  var bars = document.getElementsByClassName("list_bar_h");');
s.push('  bars[0].innerHTML += \'<div align="right"><a id="giveaway_control" style="color: gold" href="#" onclick="toggle_giveaways(); return false;">hide x giveaways</a>&nbsp;&nbsp;</div>\';');
s.push('  }');

// All this javascript is inserted before the forum page has finished loading.
// These lines actually call the inserted functions when the page finshes loading. 
s.push('window.addEventListener ("load", insert_giveaway_controls, false);');
s.push('window.addEventListener ("load", toggle_giveaways, false);');

// Flag describing whether giveaways are actually visible at the moment. 
s.push('var giveaways_visible = false;');

// This function is called by the show/hide link.  Basically turns giveaway topics
// on or off depending on the giveaways_visible flag, and then toggles that flag.
// It is also called on page load to hide giveaways by default.
s.push('function toggle_giveaways()');
s.push('  {');
// list_row_odd is the class of div which contains each topic line
// the last sticky thread has a slightly different name I should also include
s.push('  var forum_topics = document.getElementsByClassName("list_row_odd");');
s.push('  var giveaway_count=0;');
// sift through all forum topics, count and modify those which contain "giveaway"
// Note that usernames containing giveaway will be affected (I'm lazy)
s.push('  for (var e in forum_topics)');
s.push('    {');
s.push('    if (forum_topics[e].textContent && forum_topics[e].textContent.toLowerCase().indexOf("giveaway") != -1)');
s.push('      {');
s.push('      giveaway_count++;');
// colors the topic text gold.  The topic link itself requires special attention...
s.push('      forum_topics[e].style.color = "gold";');
s.push('      forum_topics[e].getElementsByTagName("A")[0].style.color = "gold";');
s.push('      if (giveaways_visible)');
s.push('        {');
// hides a topic bar
s.push('        forum_topics[e].style.display = "none";');
s.push('        }');
s.push('      else');
s.push('        {');
// reveals a topic bar
s.push('        forum_topics[e].style.display = "block";');
s.push('        }');
s.push('      }');
s.push('    }');
// this section changes the text of the toggle link
//(hide/show) count (giveaway/giveaways) link
s.push('  var giveaway_control = document.getElementById("giveaway_control");');
s.push('  var control_text = "";');
s.push('  if (giveaways_visible)');
s.push('    {');
s.push('    giveaways_visible = false;');
s.push('    control_text += "show ";');
s.push('    }');
s.push('  else');
s.push('    {');
s.push('    giveaways_visible = true;');
s.push('    control_text += "hide ";');
s.push('    }');
s.push('  control_text += giveaway_count;');
s.push('  if (giveaway_count == 1)');
s.push('    { control_text += " giveaway"; }');
s.push('  else');
s.push('    { control_text += " giveaways"; }');
// &nbsp; doesn't get interpreted.  Code 160 gives us the same space.
s.push('  control_text += String.fromCharCode(160);');
s.push('  control_text += String.fromCharCode(160);');
s.push('  giveaway_control.textContent = control_text;');
s.push('  }');
s.push('');

	
	  

// stitch all the above together and insert it into the document HEAD
var script = document.createElement('script');    // create the script element
script.innerHTML = s.join('\n');         // add the script code to it
s.length = 0;                            // recover the memory we used to build the script

// this is sort of hard to read, because it's doing 2 things:
// 1. finds the first <head> tag on the page
// 2. adds the new script just before the </head> tag
document.getElementsByTagName('head')[0].appendChild(script); 