// ==UserScript==
// @name        gognix
// @namespace   grimwerk.com
// @description Hides or highlights gog forum topics based on keywords you select yourself.
// @include     http://www.gog.com/forum/general/page*
// @include     http://www.gog.com/forum/general#*
// @include     http://www.gog.com/forum/general
// @version     aardvark
// @grant       none
// @author      grimwerk
// ==/UserScript==

// notes:
// As before, this is mostly javascript designed to run in the scope of a gog forum page.
// I use greasemonkey to add a block of javascript to the gog page, and then that javascript
// inserts the control links, modifies forum topic color and display visibility.  It also
// includes a preferences box, allowing you to choose your own keywords and colors.
// Preferences are stored locally using localStorage.  (GOG uses localStorage, too.)

// This script should work with both light and dark forum schemes.

// re: the weird includes above -- gog sometimes updates the URL during
// or after pageload.  The third include seems to catch this.  A general*
// include would operate on the actual thread pages, which we don't want.
// Hmm, remember to include https:// option for people with always secure connections?

// thanks to:
// Squak Mountain Consulting, Inc. for code used to package up and insert my javascript 
// http://html-color-codes.info/color-names/ for the color arrangement
// http://www.w3schools.com and http://stackoverflow.com/ for answering much

var s = new Array();

s.push('var subtle_text_color = "LightGray";'); // Used for dividers and headers. 
s.push('var strong_text_color = "White";');     // Used for descriptive text and box borders.
s.push('var link_text_color = "Gold";');        // Used for hide/unhide/prefs/save/cancel.

// adds the hide/show topics link and the prefs link to the interface');
// will also add the prefsbox and colorbox');
s.push('function insert_controls()');
s.push('  {');
s.push('  var bars = document.getElementsByClassName("list_bar_h");');
s.push('  bars[0].innerHTML += \'<div align="right" style="color:\' + subtle_text_color + \';"><a id="hidden_topics_control" style="color: \' + link_text_color + \'" href="#" onclick="toggle_hidden_topics(); return false;">hide x topics</a>&nbsp;&nbsp; | &nbsp;&nbsp;<a id="prefs_control" style="color: \' + link_text_color +\'" href="#" onclick="open_prefs_box(); return false;">prefs</a>&nbsp;&nbsp;</div>\';');
s.push('  }');

s.push('var color_options = new Array("IndianRed", "LightCoral", "Salmon", "DarkSalmon", "LightSalmon", "Crimson", "Red", "FireBrick", "DarkRed", "Pink", "LightPink", "HotPink", "DeepPink", "MediumVioletRed", "PaleVioletRed", "LightSalmon", "Coral", "Tomato", "OrangeRed", "DarkOrange", "Orange", "Gold", "Yellow", "LightYellow", "LemonChiffon", "LightGoldenrodYellow", "PapayaWhip", "Moccasin", "PeachPuff", "PaleGoldenrod", "Khaki", "DarkKhaki", "Lavender", "Thistle", "Plum", "Violet", "Orchid", "Fuchsia", "Magenta", "MediumOrchid", "MediumPurple", "BlueViolet", "DarkViolet", "DarkOrchid", "DarkMagenta", "Purple", "Indigo", "SlateBlue", "DarkSlateBlue", "MediumSlateBlue", "GreenYellow", "Chartreuse", "LawnGreen", "Lime", "LimeGreen", "PaleGreen", "LightGreen", "MediumSpringGreen", "SpringGreen", "MediumSeaGreen", "SeaGreen", "ForestGreen", "Green", "DarkGreen", "YellowGreen", "OliveDrab", "Olive", "DarkOliveGreen", "MediumAquamarine", "DarkSeaGreen", "LightSeaGreen", "DarkCyan", "Teal", "Aqua", "Cyan", "LightCyan", "PaleTurquoise", "Aquamarine", "Turquoise", "MediumTurquoise", "DarkTurquoise", "CadetBlue", "SteelBlue", "LightSteelBlue", "PowderBlue", "LightBlue", "SkyBlue", "LightSkyBlue", "DeepSkyBlue", "DodgerBlue", "CornflowerBlue", "MediumSlateBlue", "RoyalBlue", "Blue", "MediumBlue", "DarkBlue", "Navy", "MidnightBlue", "Cornsilk", "BlanchedAlmond", "Bisque", "NavajoWhite", "Wheat", "BurlyWood", "Tan", "RosyBrown", "SandyBrown", "Goldenrod", "DarkGoldenrod", "Peru", "Chocolate", "SaddleBrown", "Sienna", "Brown", "Maroon", "White", "Snow", "Honeydew", "MintCream", "Azure", "AliceBlue", "GhostWhite", "WhiteSmoke", "Seashell", "Beige", "OldLace", "FloralWhite", "Ivory", "AntiqueWhite", "Linen", "LavenderBlush", "MistyRose", "Gainsboro", "LightGrey", "Silver", "DarkGray", "Gray", "DimGray", "LightSlateGray", "SlateGray", "DarkSlateGray", "Black");');

// Amethyst removed (doesn\'t work in Firefox)
// LightSalmon appears twice
// MediumSlateBlue appears twice

s.push('function insert_color_box()');
s.push('  {');
s.push('  var prefs_box = document.getElementById("prefbox");');
s.push('  var insert = \'<div id="colorbox" class="list_bar_h" style="position:absolute; top:100; right:10; width:200px; height:400px; border: 1px solid; color: \' + strong_text_color + \'; overflow: auto;" >\';');
s.push('  insert += \'<p align="center"><a style="color: \' + link_text_color + \'" href="#" onclick="close_color_box(); return false;">cancel</a></p><br>\'');
s.push('  insert += \'Choose a new topic color:<br><br>\';');

  // add every wc3 color to the list
s.push('  for (var i=0; i < color_options.length; i++)');
s.push('    {');
s.push('	insert += \'<a style="color:\' + color_options[i] + \'" href="#" onclick="choose_color(\\\'\' + color_options[i] + \'\\\'); return false;">\' + color_options[i] + \'</a><br>\';');
s.push('	}');

s.push('  insert += \'<br><br><br>\';');
s.push('  insert += \'</div>\';');

  // be careful!  This line obliterates the present values in prefsbox!
  // so it looks like we must create colorbox when we create prefsbox
  // or repopulate prefsbox when we create colorbox
s.push('  prefs_box.innerHTML =  insert + prefs_box.innerHTML;');
s.push('  }');


s.push('function insert_prefs_box()');
s.push('  {');
s.push('  var bars = document.getElementsByClassName("list_bar_h");');

  // for some reason, must set the zindex of the parent div else the other
  // bar will overlap the prefs and color boxes
s.push('  bars[0].style.zIndex = "30";');

  // mod color for white background?
s.push('  var insert = \'<div id="prefbox" class="list_bar_h" style="position:absolute; top:100; right:0; width:500px; height:280px; border: 1px solid; color: \' + strong_text_color + \';">\';');
s.push('  insert += \'Enter lists of keywords below, separated by commas: (e.g., giveaway, win, vote)<br>\';');
s.push('  insert += \'Forum topics containing keywords will become the corresponding color.<br>\';');
s.push('  insert += \'Usernames work, too.  Click color names to change colors.  Check \\\'hide\\\' <br>\';'); 
s.push('  insert += \'if you want forum topics of a given color hidden by default.<br><br>\';');

s.push('  insert += \'<table>\';');
s.push('  insert += \'<tr style="color:\' + subtle_text_color + \'"><td style="padding: 4px;">keywords</td><td></td><td style="padding: 4px;">hide</td></tr>\';');

s.push('  for (var i=0; i < keywords.length; i++)');
s.push('    {');
s.push('    insert += \'<tr><td style="padding: 8px;"><input style="width: 280px;" type="text" id="keyword_field\';');
s.push('    insert += i;');
s.push('    insert += \'"></td><td style="padding: 8px;"><a id="color\';');
s.push('    insert += i;');
s.push('    insert += \'" style="color: gold" href="#" onclick="open_color_box(\';');
s.push('	insert += i;');
s.push('	insert += \'); return false;">gold</a></td><td style="padding: 8px;"><input type="checkbox" id="hide\';');
s.push('	insert += i;');
s.push('	insert += \'"></td></tr>\';');
s.push('	}');
s.push('	');
s.push('  insert += \'</table>\';  ');
s.push('  insert += \'<br>\';');

s.push('  insert += \'<center><a style="color: \' + link_text_color + \'" href="#" onclick="save_prefs(); return false;">save</a> | <a style="color: \' + link_text_color + \'" href="#" onclick="cancel_prefs(); return false;">cancel</a></center>\';');
s.push('  insert += \'</div>\';');

s.push('  bars[0].innerHTML = bars[0].innerHTML + insert;');
s.push('  }');

s.push('function open_prefs_box()');
s.push('  {');
  // if it doesn\'t exist, create it
  // if we were to create it when the page is loaded, then it gets created even when unused
s.push('  if (document.getElementById("prefbox") == null)');
s.push('    {');
s.push('	insert_prefs_box();');
	// colorbox must be added at the same time as prefs
	// otherwise inserting the code can delete any changes to prefs box
s.push('	insert_color_box();');
s.push('	close_color_box();');
s.push('	}');

  // update keywords, colors, checkboxes
s.push('  for (var i=0; i < keywords.length; i++)');
s.push('    {');
s.push('	document.getElementById("keyword_field" + i).value = keywords[i].join(", ");');
s.push('    document.getElementById("color" + i).style.color = topic_colors[i];');
s.push('    document.getElementById("color" + i).textContent = topic_colors[i];');
s.push('	document.getElementById("hide" + i).checked = hide_color[i];');
s.push('    }');

  // make visible
s.push('  document.getElementById("prefbox").style.display = "block";');
s.push('  }');

s.push('function close_prefs_box()');
s.push('  {');
  // also close color picker box if it is open
s.push('  close_color_box();');
s.push('  document.getElementById("prefbox").style.display = "none";');
s.push('  }');

// the index 0-3 of the color which will be selected by the color picker box
s.push('var color_index;');
// c determines which of the four fields the user seeks to change
s.push('function open_color_box(c)');
s.push('  {	');
s.push('  color_index = c;');
s.push('  document.getElementById("colorbox").style.display = "block";');
s.push('  }');

// set the color specified by color_index to c
// update the color in the prefs box
// close the color picker box
s.push('function choose_color(c)');
s.push('  {');
s.push('  document.getElementById("color" + color_index).style.color = c;');
s.push('  document.getElementById("color" + color_index).textContent = c;');
s.push('  close_color_box();');
s.push('  }  ');

s.push('function close_color_box()');
s.push('  {');
s.push('  if (document.getElementById("colorbox") != null)');
s.push('    {');
s.push('    document.getElementById("colorbox").style.display = "none";');
s.push('    }');
s.push('  }');



// are the topics which can be hidden presently hidden or visible 
s.push('var topics_hidden = true;');
// one array containing 4 arrays of keywords
// *note* these would be the default keywords?
s.push('var keywords = new Array(new Array("giveaway", "gift", "win", "vote"), new Array(), new Array(), new Array());  ');
// colors for those 4 arrays
// *note* these are the default colors?
s.push('var topic_colors = new Array("Gold", "Orange", "DarkOrange", "Coral");');
// whether or not those colors can be hidden/shown
s.push('var hide_color = new Array(true, false, false, false);');

// *note* should offer \'visited\' link color
// base it upon the existing color of the thread topic text

// does text contain a keyword from the array of keys? 
s.push('function contains_keyword(text, keys)');
s.push('  {');
s.push('  if (!keys) { return false; }');
s.push('  for (var k in keys)');
s.push('    {');
s.push('	if (text.indexOf(keys[k].toLowerCase()) != -1)');
s.push('	  { return true; }');
s.push('	}');
s.push('  return false;');
s.push('  }  ');

// stored data structure:

//version
//color0;hide0;keyword0.0,keyword0.1,keyword0.2,keyword0.3
//color1;hide1;keyword1.0,keyword1.1,keyword1.2,keyword1.3
//color2;hide2;keyword2.0,keyword2.1,keyword2.2,keyword2.3
//color3;hide3;keyword3.0,keyword3.1,keyword3.2,keyword3.3


// be careful not to override existing gog page function names!
// oh flip how awesome is localstorage 
s.push('function store_prefs()');
s.push('  {');
s.push('  localStorage["gognix_version"]="aardvark";');
s.push('  for (var i=0; i < keywords.length; i++)');
s.push('    {');
s.push('    localStorage["gognix_filter" + i] = topic_colors[i] + ";" + hide_color[i] + ";" + keywords[i].join(",");');
s.push('    }');
s.push('  }');

// load preferences from localStorage
s.push('function retrieve_prefs()');
s.push('  {');
  // should test for localstorage, but anything that runs greasemonkey/tampermonkey supports it
  // if the localstorage entries exist...
  // if stored preferences exist, load \'em
s.push('  if (localStorage["gognix_version"] != undefined)');
s.push('    {');
s.push('    var a = new Array();');

s.push('    for (var i=0; i < keywords.length; i++)');
s.push('      {');
s.push('      a = localStorage["gognix_filter" + i].split(";");');
s.push('	  if (a[2].length == 0)');
s.push('	    { keywords[i] = new Array(); }');
s.push('	  else');
s.push('	    { keywords[i] = a[2].split(","); }');

s.push('	  topic_colors[i] = a[0];');
	  // localstorage is strings only.  So be careful about "false" vs false
s.push('	  hide_color[i] = (a[1] == "true");');
s.push('	  }');
s.push('	} ');
s.push('  }  ');


// used for error messages
s.push('var ordinals = new Array("First", "Second", "Third", "Fourth");');
// character limit for each keyword field
// to prevent enormous cookies and possible poor performance
// No cookies anymore.  Max could be huge now.
s.push('var MAX_FIELD_LENGTH = 200;');

// validate, pretty-up, save and apply the preferences from the prefs_box
// also save those preferences to localStorage
s.push('function save_prefs()');
s.push('  {  ');
  // first, vaildate keyword lists before attempting to save/apply anything
s.push('  var field;');

s.push('  for (var i=0; i < keywords.length; i++)');
s.push('    {');
s.push('	field = document.getElementById("keyword_field" + i).value;');

	// may need to count spaces and remove them from the count
	// else a well-formatted reload from cookies could expand beyond the limit
	// that is, data entered like this: tom,dick,harry becomes tom, dick, harry after reload
	// use: (field.match(/ /g)||[]).length (I think) the ||[] changes null to a zero-length array
	// still a slight problem here, as internal spaces, i.e. "riki tiki" shouldn\'t be included in the space count

	// check length limit (if too long, cookie may bump gog session cookies)
s.push('	if (field.length - (field.match(/ /g)||[]).length > MAX_FIELD_LENGTH)');
s.push('	  {');
s.push('	  alert (ordinals[i] + " keyword field too long.\\n" + field.length + " chars.  (max: " + MAX_FIELD_LENGTH + ")");');
s.push('	  return;');
s.push('	  }');

	// check for characters only alphanumeric, ()[] -., (comma as separator)
s.push('	if (!/^[a-z0-9\\[\\])( .,-]*$/i.test(field))');
s.push('	  {  ');
s.push('	  alert (ordinals[i] + " keyword field contains invalid characters.\\nUse only: letters numbers spaces [ ] ( ) . , -");');
s.push('	  return;');
s.push('	  }  ');
s.push('	}');

  // cleanup and save the four keyword lists
  // trim entries, remove empties
  // also save colors and checkboxes
s.push('  for (i=0; i < keywords.length; i++)');
s.push('    {');
s.push('	keywords[i] = document.getElementById("keyword_field" + i).value.split(",");');

	// loop through all words and trim
	// count backwards as splice shortens the array
s.push('	for (var j=keywords[i].length-1; j >= 0; j--)');
s.push('	  {');
	  // trim doesn\'t modify the original object, it returns a new one.
s.push('	  keywords[i][j] = keywords[i][j].trim();');

s.push('	  if (keywords[i][j].length == 0)');
s.push('	    {');
s.push('		keywords[i].splice(j, 1);');
s.push('		}');
s.push('	  }');

s.push('	topic_colors[i] = document.getElementById("color" + i).textContent;');
s.push('	hide_color[i] = document.getElementById("hide" + i).checked;');
s.push('	}');

s.push('  close_prefs_box();');
s.push('  update_topics();');
s.push('  store_prefs();');
s.push('  }');

s.push('function cancel_prefs()');
s.push('  {');
s.push('  close_prefs_box();');
s.push('  }');

s.push('var hidden_topic_count = 0; // number of topics that are/can be hidden (used for unhide/hide link) ');

// filter the list of thread topics
// hides and colors topics based on keyword lists
s.push('function update_topics()');
s.push('  {	');
s.push('  var forum_topics = document.getElementsByClassName("list_row_odd");');
s.push('  hidden_topic_count=0;');
s.push('  var topic_text="";');
s.push('  var keyword_found = false;');

s.push('  for (var e in forum_topics)');
s.push('    {  ');
s.push('	if (forum_topics[e].textContent) // topic not empty');
s.push('	  {');
s.push('	  topic_text = forum_topics[e].textContent.toLowerCase();');
s.push('	  keyword_found = false;');
s.push('	  ');
s.push('	  for (var k=0; k < keywords.length; k++)');
s.push('	    {');
s.push('	    if (contains_keyword(topic_text, keywords[k]))');
s.push('	      {');
s.push('		  keyword_found = true;');
s.push('		  forum_topics[e].style.color = topic_colors[k];');
s.push('		  forum_topics[e].getElementsByTagName("A")[0].style.color = topic_colors[k];');
s.push('		  ');
s.push('		  if (hide_color[k])');
s.push('		    { hidden_topic_count++; }');
s.push('		  if (topics_hidden && hide_color[k])');
s.push('		    { forum_topics[e].style.display = "none"; }');
s.push('		  else');
s.push('		    { forum_topics[e].style.display = "block"; }');
s.push('		  k = keywords.length;  // don\'t test other colors if match is found');
s.push('		  }');
s.push('		}');
s.push('		');
	  // if no keyword found, restore the original text color
s.push('	  if (!keyword_found)');
s.push('	    {');
s.push('	    forum_topics[e].style.color = "";');
s.push('	    forum_topics[e].getElementsByTagName("A")[0].style.color = "";');
s.push('		}');
s.push('	  }');
s.push('	}');
s.push('  update_hidden_topics_control(); // now update the hide/unhide link');
s.push('  }');

// modifies the hide/unhide link and count
s.push('function update_hidden_topics_control()');
s.push('  {');
s.push('  var hidden_topics_control = document.getElementById("hidden_topics_control");');
s.push('  var control_text = "";');

s.push('  if (topics_hidden)');
s.push('    { control_text += "unhide "; }');
s.push('  else');
s.push('    { control_text += "hide "; }	');

s.push('  control_text += hidden_topic_count;');

s.push('  if (hidden_topic_count == 1)');
s.push('    { control_text += " topic"; }');
s.push('  else');
s.push('    { control_text += " topics"; }');

  // inserting &nbsp; doesn\'t work
  //control_text += String.fromCharCode(160);

s.push('  hidden_topics_control.textContent = control_text;');
s.push('  }');

// hides / unhides topics which can be hidden	
s.push('function toggle_hidden_topics()');
s.push('  {');
s.push('  topics_hidden = !topics_hidden;');
s.push('  update_topics();');
s.push('  }  ');

// All this javascript is inserted before the forum page has finished loading.
// These lines actually call the inserted functions when the page finshes loading. 
s.push('window.addEventListener ("load", page_has_loaded, false);');

// gog has two color schemes
// this detects the scheme and changes default colors to suit
// should be called *before* retrieve_prefs() so it doesn\'t override saved user prefs
// should be called *before* any insert code so the colors are used to build the interface
s.push('function suit_scheme_colors()');
s.push('  {');
  // test for background light dark:
  // alert(document.getElementsByClassName(\'my_scheme_link_EN\')[0].onclick);
  // if above contains 0, background is white.  if 1, background is dark.
s.push('  if (document.getElementsByClassName(\'my_scheme_link_EN\')[0].onclick.toString().indexOf(\'0\') != -1)');
s.push('    {');
s.push('	subtle_text_color = "LightSlateGray";');
s.push('	strong_text_color = "DarkSlateGray";');
s.push('	link_text_color   = "Maroon";');

s.push('	topic_colors = new Array("Maroon", "FireBrick", "IndianRed", "LightCoral");');
s.push('	} ');
s.push('  }');

s.push('function page_has_loaded()');
s.push('  {');
s.push('  suit_scheme_colors();');
s.push('  insert_controls();  ');
s.push('  retrieve_prefs();');
s.push('  update_topics();');
s.push('  }');

// stitch all the above together and insert it into the document HEAD
var script = document.createElement('script');    // create the script element
script.innerHTML = s.join('\n');         // add the script code to it
s.length = 0;                            // recover the memory we used to build the script

// this is sort of hard to read, because it's doing 2 things:
// 1. finds the first <head> tag on the page
// 2. adds the new script just before the </head> tag
document.getElementsByTagName('head')[0].appendChild(script); 