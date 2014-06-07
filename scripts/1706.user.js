// Gmap Extras
// version 0.4 BETA!
// 2005-06-19
// Copyright (c) 2005, Matt King
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// updated for ff 1.5 and gm 6.1.4 by chris feldmann
// 12-15-05
//
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// IF YOU ARE UPGRADING FROM A PREVIOUS VERSION OF gmap_extras, go to
// Tools/Manage User Scripts and manually uninstall the previous
// version before installing this one.  Sorry, this is a limitation
// of Greasemonkey.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "gmap_extras", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:  Extra goodies for maps.googgle.com:
//
//   * Display curent lat/lon on title bar
//   * Bookmarks to save lat/lon locations (requires Greasemonkey 0.3+)
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            gmap_extras
// @namespace       http://www.gnik.com/gmaps/
// @description     Gmap Extras!
// @include         http://maps.google.com/*
// ==/UserScript==


window.addEventListener('load', function(){
   var allDivs, titleTD, center, x, y, frag, loc, titleTD, form, span, option, i, found;
  //alert("loaded.");
  
  function infectStyles(css){
   var h, s;
   h = document.getElementsByTagName('head')[0];
   if(!h) { return; }
   s = document.createElement('style');
   s.type = 'text/css';
   s.innerHTML = css;
   h.appendChild(s);
  }
  css = '#latlonform{'+
  'display: inline;'+
  'margin-left: 10px;'+
  '}'+
  '.xtrasButton{'+
  '-moz-border-radius: 3px;'+
  'display:inline;'+
  'border:1px solid rgb(140,140,140);'+
  'background: rgb(240,240,240);'+
  'font-size: 12px;'+
  'color: 140,140,140);'+
  'cursor: pointer;'+
  'padding: 2px 4px;'+
  'margin: 0 4px 4px 4px;'+
  'font-weight:400;'+
  '}'+
  '.xtrasButton:hover{'+
  'color: #000;'+
  'background: rgb(250,250,250);'+
  '}'+
  '.xtrasButton:active{'+
  'border:1px solid #000;'+
  '}'+
  '.xtrasText{'+
  'display:inline;'+
  'font-size: 12px;'+
  'color: rgb(80,80,80);'+
  'margin: 2px 4px 0 4px;'+
  'padding: 0 4px;'+
  'font-weight: 400;'+
  '}'+
  '#curlatlon{'+
  'margin:1px 4px 0 4px;'+
  '}'+
  '.latlon{'+
  'margin: 0 4px;'+
  'font-weight: 600;'+
  'color: rgb(20, 20, 200);'+
  '}'+
  '.latlondiv{'+
  'margin: 2px 4px 0 4px;'+
  'display: inline;'+
  'font-size: 12px;'+
  '}';
  
  infectStyles(css);
  //send this function a string xpath query and get an array back.
  function xpath(query)
  {
    var ret = new Array();
    var snap = document.evaluate(query, document, null,
         XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if( snap.snapshotLength > 0){
      for (i=0; i< snap.snapshotLength; i++){
        ret[i] = snap.snapshotItem(i);
      }
      return ret;
    }
    return null;
  }
  
  // is this dangerous? I think I trust google not to
  // change the gmaps api just to fuck with my userscripts.
  var _m = unsafeWindow._m;
  
  //minor tweaks
  var addBookmark = function() {
    var form = document.getElementById("latlonform");
    if (!form || !GM_setValue) { return; }
    var location = _m.permalink.href;
    GM_log("location: " + location);
    var name = prompt("Save this location as", _m.vpage.title);
    if (name == "") { alert("You must supply a name"); return; }
    var bCount = GM_getValue("b.count", 0);
    GM_setValue("b."+bCount, name + "|" + location);
    bCount += 1;
    GM_setValue("b.count", bCount);
    sel = document.getElementById('latlonsel');
    name = (name.length < 50 ? name : name.substring( 0, 50));
    var op = document.createElement('option');
    op.setAttribute('value', location);
    op.appendChild(document.createTextNode(name));
    sel.appendChild(op);
    sel.selectedIndex = sel.options.length-1;
  }
  
  //minor tweaks
  var goToBookmark =   function() {
     var sel = document.getElementById("latlonsel");
     if (sel.selectedIndex == 0) return;
     var location = sel.options[sel.selectedIndex].value;
     GM_setValue('flag', true);
     GM_setValue('selectedIndex', sel.selectedIndex);
     var name = sel.options[sel.selectedIndex].firstChild.nodeValue;
     document.location.href = location;
     sel.selectedIndex.setAttribute('selected', true);
  }
  
  //minor tweaks
  var deleteBookmark = function() {
    var sel = document.getElementById("latlonsel");
    if (sel.selectedIndex == 0) return;
    var bId = sel.selectedIndex-1;
    var bCount = GM_getValue("b.count", 0);
    for (var i = bId; i < bCount-1; i++) {
      var nexti = i+1;
      var nextloc = GM_getValue("b."+nexti);
      GM_setValue("b."+i, nextloc);
    }
    GM_setValue("b."+(bCount-1), "");
    GM_setValue("b.count", bCount-1);
    sel.options[sel.selectedIndex] = null;
  }
  
  //pulled this little tangle out into its own func
  createLatLonDiv = function(x, y)
  {
    frag = document.createDocumentFragment();
    span = document.createElement('span');
    span.setAttribute('class', 'latlon');
    span.appendChild( document.createTextNode("lat: "));
    frag.appendChild(span);
    frag.appendChild( document.createTextNode( y + " "));
    span = document.createElement('span');
    span.setAttribute('class', 'latlon');
    span.appendChild( document.createTextNode(" lon: "));
    frag.appendChild(span);
    frag.appendChild( document.createTextNode( x ));
    loc = document.createElement('div');
    loc.setAttribute('class', 'latlondiv');
    loc.appendChild(frag);
    return loc;
  }
  
  allDivs = xpath("//td[@class='title']");
  found = false;
  titleTD = allDivs[0];
    
  //rewrite to use DOM for element creation
  center = _m.map.getCenterLatLng();
  x = Math.round(center.x * 1000000) / 1000000.0;
  y = Math.round(center.y * 1000000) / 1000000.0;
  loc = createLatLonDiv(x,y);
  
  form = document.createElement('form');
  form.setAttribute('id', 'latlonform');
  if (GM_setValue) {
    div = document.createElement('div');
    div.setAttribute('class', 'xtrasButton');
    div.appendChild(document.createTextNode("Save"));
    div.addEventListener("click", addBookmark, false);
    select = document.createElement('select');
    select.setAttribute('name', 'bookmarks');
    select.setAttribute('id', 'latlonsel');
    select.addEventListener('change', goToBookmark, false);
    op = document.createElement('option');
    op.setAttribute('selected', true)
    op.appendChild( document.createTextNode('---bookmarks---'));
    select.appendChild(op);
    var bCount = GM_getValue('b.count', 0);
    for (var j = 0; j < bCount; j++) {
      var value = GM_getValue("b." + j);
      var values = value.split("|");
      var op = document.createElement('option');
      op.setAttribute('value', values[1]);
      op.appendChild( document.createTextNode(values[0]));
      select.appendChild(op);
    }
    if( GM_getValue('flag')){
      select.selectedIndex = GM_getValue('selectedIndex');
    }
    GM_setValue('selectedIndex', false);
  }
  form.appendChild( div );
  form.appendChild( select );
  div = document.createElement('div');
  div.setAttribute('class', 'xtrasButton');
  div.appendChild( document.createTextNode("Delete"));
  div.addEventListener( 'click', deleteBookmark, false);
  form.appendChild( div );
  div = document.createElement('div');
  div.setAttribute('id', 'curlatlon');
  div.className = 'xtrasText';
  div.appendChild( loc );
  form.appendChild( div );
  try{
    titleTD.appendChild(form);
  } catch(e){
    for (p in e){
      GM_log(e.p);
    }
  }
  found = true;
  if (found == false) { return; }
  
  //removed mysterious "control panel" code
  
  // Add a listener to update the lat/lon when the map is moved
  // changed _Event to GEvent and added unsafeWindow, DOMified
  unsafeWindow.GEvent.addListener(unsafeWindow._m.map, "moveend",
   function () {
    var center = _m.map.getCenterLatLng();
    var x = Math.round(center.x * 1000000) / 1000000.0;
    var y = Math.round(center.y * 1000000) / 1000000.0;
    var div = document.getElementById("curlatlon");
    loc = createLatLonDiv(x, y);
    div.replaceChild(loc, div.firstChild);
  });
  
}, false);
/*
TODO:
* Bookmarks of a location should remember that location (addr, company, etc)

* Make SAVE reference current lat-lon center point WITH zoom level AND view mode. -cwf

CHANGELOG:
0.5?  2005-12-15  Rewrote the HTML generation and tweaked for 1.5/0.6.4 compat,
                 commented code a bit. -chris feldmann
0.4 - 2005-06-19 - Bookmarks now save "link to this page" location,
                got rid of lat/lon input box (can do this from main search
                box).  Fixed bug with GM @include directive.
0.3 - 2005-06-18 - Make sure we're using a GM_setValue compat GM for bookmarks
0.2 - 2005-06-18 - Bookmarks
0.1 - 2005-06-17 - initial release
*/

// END FILE
