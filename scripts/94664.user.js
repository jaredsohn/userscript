// ==UserScript==
// @name           OCI Script
// @namespace      Travis
// @include        http://www.micropress.org/oci/entry.php*
// ==/UserScript==

/*******************************************************************
 * Auto focuses Book ID, enlarges card image, adds keyboard 
 * shortcuts:
 *  Ctrl+L   - Focus on GEN, or OGEN if GEN already has focus
 *  Ctrl+I   - Focus on Book ID 
 *  Ctrl+P   - Focus on top row of Line 3
 *  Ctrl+S   - Same as clicking [SS], but doesn't reload page;
 *             also moves focus to Line 3.
 *  Ctrl+J   - Moves focused row in Line 3 down by a row.
 *  Ctrl+K   - Moves focused row in Line 3 up by a row.
 *  Ctrl+G   - Get and clear data in focused row of Line 3.
 *  Ctrl+F   - Fill current row in Line 3 with Ctrl+E'd data.
 *  Ctrl+Up  - Move focus up one row in Line 3
 *  Ctrl+Dn  - Move focus down one row in Line 3
 *  Ctrl+D   - Changes 1= to 1=2 in focused input, 1=== to 1-4 
 *  Ctrl+[   - Add row to Line 3 and focus on bottom row
 *  Ctrl+]   - Delete row from Line 3 and focus on bottom row 
 *  Enter    - Same as clicking [OK] button
 *  Ctrl+Enter - Same as clicking [NOIX] button
 *  Shift+Enter - Selects top AS result, focuses top row of Line 3.
 *-----------------------------------------------------------------*
 * Desired features:
 *  - Add shortcuts for quickly navigating the page.
 *    Not arrows...
 *  - Cache all entries as they're completed, to facilitate rapid 
 *    error correction.
 *  - Download and cache next entry so it can quickly be retrieved
 *    upon submission of current entry.
 *  - Make process dynamic, so page doesn't have to be reloaded
 *    after each submission and to navigate entries.
 ******************************************************************/

var U =     unsafeWindow;
var ui =    {};
var $keys = [];

window.setTimeout(init, 250);
add_style('div#pageBody{display:none}\
	   body{overflow-y:visible!important;margin:0;padding:0}');


function init ()
{
  ui.l1 = $('f_g',   'f_sg', 'f_sp', 'f_var',
            'f_var', 'f_a',  'f_y',  'f_IXSelected');
  ui.l2 = $('f_og',   'f_osg', 'f_osp', 'f_ovar',
            'f_ovar', 'f_oa',  'f_oy',  'f_IXSelected');
  ui.form = $('entry');
  
  ui.form.addEventListener("submit", store_form, false);
  
  $('L1_autosearch').click();

  size_image();

  if (!$('f_bookid').value)
    focus_id();
  else
    focus_pg();
  
  $keys_add (document, "13", entry_submit);         // Enter
  $keys_add (document, "shift+13", L1_tab);         // Shift+Enter
  $keys_add (document, "ctrl+38",  focus_next_row); // Ctrl+Up
  $keys_add (document, "ctrl+40",  focus_next_row); // Ctrl+Down
  $keys_add (document, "ctrl+68",  fast_dash);      // Ctrl+D
  $keys_add (document, "ctrl+70",  fill_L3_row);    // Ctrl+F
  $keys_add (document, "ctrl+71",  get_L3_row);     // Ctrl+G
  $keys_add (document, "ctrl+73",  focus_id);       // Ctrl+I
  $keys_add (document, "ctrl+74",  move_L3_row);    // Ctrl+J
  $keys_add (document, "ctrl+75",  move_L3_row);    // Ctrl+K
  $keys_add (document, "ctrl+76",  focus_taxons);   // Ctrl+L
  $keys_add (document, "ctrl+80",  focus_pg);       // Ctrl+P
  $keys_add (document, "ctrl+83",  entry_SS);       // Ctrl+S
  $keys_add (document, "ctrl+219", add_cite);       // Ctrl+[
  $keys_add (document, "ctrl+221", del_cite);       // Crtl+]
}

// Focuses prev or next row in Line 3
function focus_next_row (e)
{
  var currRow = get_par(e.target, 'tr');
  var id = currRow.id;
  if (! /L\dR\d+/.test (id)) return;
  
  var dir = (e.which==40)? 1 : -1;
  var currNum = id.match(/\d{1,2}$/)[0] * 1; // implicit typecast
  var prevNum = currNum + dir;
  if (!prevNum) return;
  
  var prevRow = $('L3R' + prevNum);
  if (prevRow.style.display == "none")
  {
    prevRow = $('L3R1');
  }
  
  var nextElms = tags(prevRow, e.target.tagName);
  var currElms = tags(currRow, e.target.tagName);
  
  for (var i = 0, len = 3; i < len; ++i)
  {
    if (currElms[i] != e.target) continue;
    nextElms[i].focus();
    return true;
  }
}

// Clear focused row of L3
function fill_L3_row (e)
{
  var currRow = get_par(e.target, 'tr');
  var id = currRow.id;
  if (! /L\dR\d+/.test (id)) return;
  
  var currIns = tags(currRow, 'input');
  var currSel = tags(currRow, 'select');
  var inpKey = "L3_inp";
  var selKey = "L3_sel";
  var inpVal = "";
  var selVal = "";
  
  for (var i = 0, len = 3; i < len; ++i)
  {
    inpVal = U.localStorage.getItem(inpKey + i);
    selVal = U.localStorage.getItem(selKey + i);
    if (inpVal == null || selVal == null) continue;
    
    currIns[i].value = inpVal;
    currSel[i].selectedIndex = selVal;
  }
}


// Clear focused row of L3
function get_L3_row (e)
{
  var currRow = get_par(e.target, 'tr');
  var id = currRow.id;
  if (! /L\dR\d+/.test (id)) return;
  
  var currIns = tags(currRow, 'input');
  var currSel = tags(currRow, 'select');
  var inpKey = "L3_inp";
  var selKey = "L3_sel";
  
  for (var i = 0, len = 3; i < len; ++i)
  {
    U.localStorage.setItem(inpKey + i, currIns[i].value);
    U.localStorage.setItem(selKey + i, currSel[i].selectedIndex);
    currIns[i].value = "";
    currSel[i].selectedIndex = 0;
  }
}


// Moves data in focused row of L3 up or down. j=74=down, k=75=up
function move_L3_row (e)
{
  var currRow = get_par(e.target, 'tr');
  var id = currRow.id;
  if (! /L\dR\d+/.test (id)) return;
  
  var dir = (e.which==74)? 1 : -1;
  var currNum = id.match(/\d{1,2}$/)[0] * 1; // implicit typecast
  var prevNum = currNum + dir;
  if (!prevNum) return;
  
  var prevRow = $('L3R' + prevNum);
  if (prevRow.style.display == "none")
  {
    prevRow = $('L3R1');
  }
  
  var prevIns = tags(prevRow, 'input');
  var prevSel = tags(prevRow, 'select');
  var currIns = tags(currRow, 'input');
  var currSel = tags(currRow, 'select');
  
  var insSwap = "";
  var selSwap = "";
  
  for (var i = 0, len = 3; i < len; ++i)
  {
    insSwap = currIns[i].value;
    currIns[i].value = prevIns[i].value;
    prevIns[i].value = insSwap;
    
    selSwap = currSel[i].selectedIndex;
    currSel[i].selectedIndex = prevSel[i].selectedIndex;
    prevSel[i].selectedIndex = selSwap;
  }
  
  prevIns[0].focus();
}


// returns children of elm with tagName tag
function tags (elm, tag)
{
  return elm.getElementsByTagName(tag);
}


// finds parent node with matching tag
function get_par (elm, tag)
{
  tag = tag.toUpperCase();
  while (elm.tagName != tag && elm != document)
  {
    elm = elm.parentNode;
  }

  if (elm == document)
    return false;
  
  return elm;
}


// sizes main image
function size_image ()
{
  var img = $('img_main');
  var s = img.style;
  var imgDims = img.getBoundingClientRect();
  var tblDims =$$("table.guide", true).getBoundingClientRect();
  var wSize = {"h": window.innerHeight, "w": window.innerWidth, };
  var newH = imgDims.height + (wSize.h - tblDims.height);

  s.height  = newH + "px";
  s.width   = newH * 1.66 + "px";
}

// Stores form data in localStorage. indexed by book ID
function store_form (e)
{
  var l =     ui.l1,
      ll =    ui.l2;
  var lstr =  "",
      llstr = "";
  var len = l.length;
      
  for (var i = 0; i < len; ++i)
  {
    lstr +=  l[i].value + "|";
    llstr += ll[i].value + "|";
  }
  
  U.localStorage.setItem("l",  lstr);
  U.localStorage.setItem("ll", llstr);
}


// Converts 175-- to 175-176 in focused input
function fast_dash (e)
{
  var active = document.activeElement;
  var val = active.value;
  var reg = /(\d*)=+/g;
  var dif = /=+/.exec(val);
  if (!dif) return;
  
  dif = dif[0].length; //.exec ?= null
  var num = parseInt (reg.exec(val)[0]) + dif;
  
  active.value = val.replace(reg, "$1-" + num);
}

// Focuses on GEN, or OGEN if GEN has focus
function focus_taxons ()
{
  if ($('f_g') == document.activeElement)
    return $('f_og').focus();
  
  $('f_g').focus();  
}

// Adds a row to Line3 (Citations)
function add_cite ()
{
  $('bAddL3').click();
  var len = $$('tr[style="display: table-row;"]').length;
  $$('input[name="ci1_' +len+ '"]', true).focus();
}

function del_cite ()
{
  $('bDelL3').click();
  var len = $$('tr[style="display: table-row;"]').length;
  $$("input[name='ci1_" +len+ "']", true).focus();
}

// Focuses Book ID
function focus_id (e)
{
  $('f_bookid').focus();
}

// Focuses first input box in Line 3
function focus_pg (e)
{
  var pg = $$('input[name="ci1_1"]', true);
  pg.focus();
  pg.scrollIntoView();
}

// Programatically clicks [SS]
function entry_SS (e)
{
  var reg = /[^|]/;
  var l = U.localStorage.getItem("l");
  var ll = U.localStorage.getItem("ll");
  
  if (reg.test(l) || reg.test(ll))
  {
    U.setL1Values(l);
    U.setL2Values(ll);
    focus_pg ();
    return;
  }
  
  $$("input[name='copy']", true).click();
}

// Programatically clicks [OK]
function entry_submit (e)
{
  $('OK').click();
}
// Programatically clicks [NOIX]
function entry_noix (e)
{
  $('NOIX').click();
}


function L1_tab (e)
{
  var l = ui.l1, ll = ui.l2;
  var len = l.length;
  var opt = null;
  
  for (var i = 0; i < len; ++i)
  {
    if (document.activeElement == l[i])
    {
      opt = $('taxonItemL1_1');
      click_L1AS_option(opt);
      break;
    }
    else if (document.activeElement == ll[i])
    {
      opt = $('taxonItemL2_1');
      click_L2AS_option(opt);
      break;
    }
  }
  focus_pg();
}


function click_L1AS_option (opt)
{  
  U.setL1Values(opt.getAttribute('value'));
  hide($('dlg_searchL1'));
}


function click_L2AS_option (opt)
{
  U.setL2Values(opt.getAttribute('value'));
  hide($('dlg_searchL2'));
}


function $keys_listener (e)
{
  var hash = "", code = e.keyCode;
  
  if (e.ctrlKey)  hash += "ctrl+";
  if (e.altKey)   hash += "alt+";
  if (e.shiftKey) hash += "shift+";
  if (code != 16 && code != 17 && code != 18)
    hash += e.keyCode;
  
  for (var i = 0, len = $keys.length; i < len; ++i)
  {
    if ($keys[i].elm == this) break;
  }
  if (!$keys[i][hash]) return;
  
  e.preventDefault();
  e.stopPropagation();
  $keys[i][hash].call(this, e);
}


function $keys_add (elm, shortcut, funct)
{
  var obj = {};
  elm.addEventListener('keydown', $keys_listener, false);
  
  for (var i = 0, len = $keys.length; i < len; ++i)
  {
    if($keys[i].elm != elm) continue;
    
    return $keys[i][shortcut] = funct;
  }
  
  obj.elm = elm;
  obj[shortcut] = funct;
  $keys.push(obj);
}


function $ (id)
{
  var len = arguments.length;
  if (len == 1)
    return document.getElementById(id);
    
  var arr = [];  
  for (var i = 0; i < len; ++i)
  {
    arr.push(document.getElementById(arguments[i]));
  }
  return arr;
}


function $$ (css, single)
{
  if (single)
  {
    return document.querySelector(css);
  }
  return document.querySelectorAll(css);
}


function hide (elm)
{
  elm.style.display = "none";
}
function show (elm)
{
  elm.style.display = "block";
}


function add_style (css)
{
  var head = $$('head')[0];
  var style_elm = document.createElement("style");
  style_elm.type = "text/css";
  head.appendChild(style_elm);
  style_elm.innerHTML = css;
}
