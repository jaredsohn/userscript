// ==UserScript==
// @name            CFA Fire Watch
// @author          TrickiDicki
// @namespace       http://headtothehills.blogspot.com/
// @description     Modifies the data shown on Victorias CFA incident website to only show incidents in your region. Also adds auto-reload functionality.
// @include         http://www.cfa.vic.gov.au/incidents/incident_summary.htm
// ==/UserScript==

// Version 0.5
// 26-Feb-09
// Copyright (c) 2007-2009 TrickiDicki
// 

var DEFAULT_INTERVAL = 600;	// Default update period = 600 seconds, 10 minutes
var DEFAULT_REGION = 0; // Display all data by default
var VAR_SHOWFALSEALARMS = "showfalsealarms";
var VAR_OPTIONSSTYLES = "font-size: 8pt; background-color: #eeeeee;";

function do_script() {
    isolate(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[2]/DIV[1]/DIV[2]/TABLE[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
    
    // Add a region-selector drop-down box
    var availableregions = [0, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 23, 24];
    var region = GM_getValue( "region", DEFAULT_REGION);
    var banner = document.createElement("div");
    var divcontent = '<a href="http://www.cfa.vic.gov.au/incidents/incident_updates.htm">CFA Current incidents and advice page</a>&nbsp;&nbsp;&nbsp;&nbsp;';

    // Show when the data was last updated
    divcontent += '&nbsp;&nbsp;&nbsp;&nbsp;<label for="pagerenderedtime">Data last refreshed:&nbsp;</label><input type=text readonly id="pagerenderedtime"></input> ';

    // Create the 'refresh now' link
    divcontent += '&nbsp;&nbsp;&nbsp;<a href="" onclick="window.location.reload(); return false;">Refresh now</a>';

    divcontent += '<br>';
    
    banner.innerHTML = divcontent;
    document.body.insertBefore(banner, document.body.firstChild);

    // Now create the footer div
    var footnote = document.createElement("div");
    document.body.appendChild(footnote);
    divcontent = "";

    divcontent += '<br><table id="optionstable" style="' + VAR_OPTIONSSTYLES + '">';
    divcontent += '<style type="text/css">td.option {padding-left:10px; padding-right: 30px;}</style>';
    divcontent += '<caption id="optionscaption" style="caption-side:left;">Options:</caption>';
    divcontent += '<tr><td class="option">';
    // Create and populate the region-selection dropdown    
    divcontent += '<label for="regiondropdown"><a href="http://www.cfa.vic.gov.au/incidents/definitions/region.htm">Choose your CFA region: </a></label>' +
        '<select id="regiondropdown">\r\n';
    for( var n = 0; n < availableregions.length; n++ ) {
        divcontent += '<option value ="' + availableregions[n] + '"';
        if( availableregions[n] == region ) {
            divcontent += ' selected="selected" ';
        }
        divcontent += '>' 
        divcontent += ( availableregions[n] == 0 ? 'All' : availableregions[n] );
        divcontent += '</option>\r\n';
    }
    divcontent += '</select>';

    divcontent += '</td><td class="option">';

    // Now display the last time the page was updated and let the user select an update period
    var updateperiods = [0, 60, 120, 180, 240, 300, 600, 1800, 3600];
    var interval = GM_getValue( "interval", DEFAULT_INTERVAL);
    divcontent += '<label for="updateinterval">Update every:&nbsp;</label><select id="updateinterval">\r\n';
    for( n = 0; n < updateperiods.length; n++ ) {
        divcontent += '<option value ="' + updateperiods[n] + '"';
        if( updateperiods[n] == interval ) {
            divcontent += ' selected="selected" ';
        }
        divcontent += '>' 
        divcontent += ( updateperiods[n] == 0 ? 'Never' : ( updateperiods[n]/60 + ' min(s)' ) );
        divcontent += '</option>\r\n';
    }
    divcontent += '</select>';
    
    divcontent += '</td><td class="option">';

    // Create the 'Show false alarms' checkbox'
    divcontent += '<input type="checkbox" id="showfalsealarms"'
    if( GM_getValue( VAR_SHOWFALSEALARMS, 1 ) ) { divcontent += ' checked'; }
    divcontent += '><label for="showfalsealarms">Show false alarms</label>';

    divcontent += '</td></tr></table>';

    //divcontent += '<iframe id="gmap_frame" width="100%" height ="100%"></iframe>';
	
    divcontent += "<br><small><strong>Disclaimer:</strong> This information is extracted from CFA's "+
        "Incident Management System (IMS). This information is not necessarily 'real time' "+
        "information, but is provided as a general indication of current activity.</small>";
    
    divcontent += '<style type="text/css">body {background-color: #ffffff;}</style>';

    footnote.innerHTML = divcontent;

    // Now register the callbacks
    document.getElementById("regiondropdown").addEventListener("change", function() { setregion() }, false)
    document.getElementById("updateinterval").addEventListener("change", function() { setinterval() }, false)
    document.getElementById("showfalsealarms").addEventListener("change", function() { setShowFalseAlarms() }, false)
    //document.getElementById("optionscaption").addEventListener("click", function() { showHideOptions(true) }, false)
    
    //showHideOptions(false);
    displayContent();        
}; // Ends do_platypus_script

function updateContent() {
    window.location.reload();
}

function displayContent() {
    settime( document.getElementById("pagerenderedtime") );
    window.setTimeout( function() { updateContent() ; }, GM_getValue( "interval", DEFAULT_INTERVAL) * 1000 ) ;
    var tbody = document.getElementsByTagName( 'tbody' );
    var tbl = tbody[0].parentNode.setAttribute( "cellspacing", "0" );
    var rows = tbody[0].getElementsByTagName( 'tr' );
    var altrow = false;
    var region = GM_getValue( "region", DEFAULT_REGION );
    var showFalseAlarms = GM_getValue( VAR_SHOWFALSEALARMS, 1 );

    for (var i = 0; i < rows.length; i++ ) {
        var thisrow = rows[i];
        var CFAData = ExtractRowData( thisrow );
        if( CFAData.region != null ) {
            if( (region == 0 || CFAData.region == region) 
             && (showFalseAlarms || CFAData.type.toUpperCase() != "FALSE ALARM") ) {
                var style = "visibility: visible";
                rows[i].setAttribute( "style", style );
                rows[i].setAttribute( "class", altrow ? "row" : "altRow" );
                altrow = !altrow;
				GooglifyRow( rows[i], CFAData );
            } else {
                rows[i].setAttribute( "style", "visibility: collapse" );
            }
        }
    }
}

function URLWrapText( item, url ) {
	var itemText = item.innerHTML;
	
	//item.innerHTML = "<a href='#' onClick='window.document.getElementById(\"gmap_frame\").src=\"" + url + "\"; return false;';>" + itemText + "</a>";
	item.innerHTML = "<a target='GMapWindow' href='" + url + "'>" + itemText + "</a>";
}

function GooglifyRow( row, CFAData ){
    var DataSet = row.getElementsByTagName( 'td' );

	var url;
	url = "http://maps.google.com.au/maps?f=q";
	url += "&q="+ escape( CFAData.location + ", VIC" );
	url += "&hl=en&t=p";	// Type = m, map; h, hybrid; p, terrain
	url += "&z=15";		// Zoom level = 15
	URLWrapText( DataSet[1], url );

	url = "http://maps.google.com.au/maps?f=q";
	url += "&q="+ escape( CFAData.name + ", " + CFAData.location + ", VIC" );
	url += "&hl=en&t=p";	// Type = m, map; h, hybrid; p, terrain
	url += "&z=15";		// Zoom level = 15
	URLWrapText( DataSet[2], url );
	
}

function setregion() {
  var region = GM_getValue( "region", DEFAULT_REGION );
  var newRegion = document.getElementById("regiondropdown").value;
  if( newRegion != region ) {
      GM_setValue( "region", newRegion)
      displayContent();
  }
}

function setinterval() {
  var interval = GM_getValue( "interval", DEFAULT_INTERVAL );
  var newInterval = document.getElementById("updateinterval").value;
  if( newInterval != interval ) {
      GM_setValue( "interval", newInterval)
      updateContent();
  }
}

function setShowFalseAlarms() {
  var showAlarms = document.getElementById("showfalsealarms").checked ? 1 : 0;
  GM_setValue( VAR_SHOWFALSEALARMS, showAlarms );
  displayContent();
}

function showHideOptions(toggle) {
    // First, toggle the 'show options' variable and stash it away again
    var showOptions = GM_getValue( "showoptions", 0 );
    if( toggle ) {
        showOptions = showOptions == 1 ? 0 : 1;
        GM_setValue( "showoptions", showOptions );
    }
    
    // Next, update the caption
    var optionsCaption = document.getElementById("optionscaption");
    if( showOptions == 1 ) {
        optionsCaption.innerHTML = "Hide&nbsp;options:";
    } else {
        optionsCaption.innerHTML = "Show&nbsp;options:";
    }

    // and set the option table visibility
    document.getElementById("optionstable").setAttribute("style" ,
        showOptions == 1 ? VAR_OPTIONSSTYLES + "visibility: visible;" : VAR_OPTIONSSTYLES + "visibility: hidden;" );
}

function settime (item) {
  var curtime = new Date();
  var curhour = curtime.getHours();
  var curmin = curtime.getMinutes();
  var cursec = curtime.getSeconds();
  var time = "";

  if(curhour == 0) curhour = 12;
  time += (curhour > 12 ? curhour - 12 : curhour) + ":" +
         (curmin < 10 ? "0" : "") + curmin + ":" +
         (cursec < 10 ? "0" : "") + cursec + " " +
         (curhour > 12 ? "pm" : "am");

  item.value = time;
}

function ExtractRowData( RowData ) {
    var DataSet = RowData.getElementsByTagName( 'td' );
    var FireData = {
        region:DataSet[0].innerHTML,
        location:DataSet[1].innerHTML,
        name:CleanupString(DataSet[2].innerHTML),
        datetime:DataSet[3].innerHTML,
        type:DataSet[4].innerHTML,
        status:DataSet[5].innerHTML,
        size:DataSet[6].innerHTML,
        engines:DataSet[7].innerHTML,
        point:null }

    FireData.key = FireData.region + FireData.location + FireData.name + FireData.datetime;    // Although this isn't guarenteed unique, it's as good as we can do        
    
    return FireData;
}

function CleanupString( s ) {
    s = s.replace( /&nbsp\;/g, ' ' );
    return s.replace(/^\s+|\s+$/g,"");
}

window.addEventListener("load", function() { do_script() }, false);



/* ====================================================== */

//
//  Mon Dec 19 15:59:37 2005 -- Scott R. Turner
//  Short, uncommented file containing all the code to implement Platypus
//  actions.  Can be "included" into the Platypus script.
//
// 
// 
function walk_down(node, func) {
  if (node.nodeType == 1) {
    if (node.tagName != "IMG") func(node);
    if (node.childNodes.length != 0)
      for (var i=0; i<node.childNodes.length; i++)
walk_down(node.childNodes.item(i),func);
  }
}
function make_bw(doc, node) {
  walk_down(node,
            function (node) {
      if (node.tagName != 'A') {
  node.bgcolor = "white";
  node.color = "black";
  node.style.backgroundColor = "white";
  node.style.color = "black";
  node.style.backgroundImage = "";
      }});
}
function center_it(doc, node) {
  var center_node = doc.createElement ("CENTER");
  node.parentNode.insertBefore(center_node, node);
  node.parentNode.removeChild(node);  
  center_node.appendChild(node);
  return center_node;
};
function erase_it(doc, node) {
  var offset_height = node.offsetHeight;
  var offset_width = node.offsetWidth;
  var replacement_div = doc.createElement ("DIV");
  replacement_div.setAttribute('style',
       "height: "+offset_height+"; width: "+offset_width+";");
  node.parentNode.insertBefore(replacement_div, node);
  node.style.display = "none";
  return replacement_div;
};
function smart_remove(doc, node) {
    if (node.parentNode.childNodes.length == 1) {
smart_remove(doc, node.parentNode);
    } else {
remove_it(doc, node);
    };
};
function remove_it(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};
function script_paste(doc, where, what) {
    var new_node = what.cloneNode(true);
    new_node.style.display = "";
    where.parentNode.insertBefore(new_node, where);
};
function isolate(doc, node) {
  if (!node.parentNode) return;
  node.parentNode.removeChild(node);
  while (doc.body.childNodes.length > 0) {
    doc.body.removeChild(doc.body.childNodes[0]);
  };
  var replacement_div = doc.createElement ("DIV");
  replacement_div.setAttribute('style',
       "margin: 0 2%; text-align: left");
  replacement_div.appendChild(node);
  doc.body.appendChild(replacement_div);
};
function set_style_script(doc, element, new_style) {
    element.setAttribute('style', new_style);
};
function modify_single_url(doc, match_re, replace_string, node) {
    if (node.href) {
node.href = node.href.replace(match_re, replace_string);
    };
};
function do_modify_url_it(doc, node, match_re, replace_string, global_flag) {
    match_re = new RegExp(match_re);
    if (global_flag) {
var allurls = doc.getElementsByTagName('A');
for(var i = 0, url; url = allurls[i]; i++)
  modify_single_url(doc, match_re, replace_string, url);
    } else {
modify_single_url(doc, match_re, replace_string, node);
    };
};
function do_modify_html_it(doc, element, match_re, replace_string) {
    match_re = new RegExp(match_re);
    if (element.innerHTML) {
element.innerHTML = element.innerHTML.replace(match_re, replace_string);
    };
};
function relax(doc, node) {
  walk_down(node, function (node) {
      node.style.width = 'auto';
      node.style.marginLeft = '0pt';
      node.style.marginRight = '0pt';
      if (node.width) node.width = null; });
}
function fix_page_it(doc, node) {
    doc.background = null;
    doc.bgColor = "white";
    if (doc.style) {
      doc.style.backgroundColor = "white";
      doc.style.backgroundImage = "none";
      if (doc.style.color == "white") {
doc.style.color = "black";
      };
      if (doc.text == "white") {
doc.text = "black";
      };
    };
    doc.body.background = null;
    doc.body.bgColor = "white";
    if (doc.body.style) {
      doc.body.style.backgroundColor = "white";
      doc.body.style.backgroundImage = "none";
      if (doc.body.style.color == "white") {
doc.body.style.color = "black";
      };
      if (doc.body.text == "white") {
doc.body.text = "black";
      };
    };
};
function insertAfter(newNode, target) {
    var parent = target.parentNode;
    var refChild = target.nextSibling;
    if(refChild != null)
parent.insertBefore(newNode, refChild);
    else
parent.appendChild(newNode);
};
function html_insert_it(doc, element, new_html, before, insert_as_block) {
  var new_element;
  if (insert_as_block) {
    new_element = doc.createElement ("DIV");
  } else {
    new_element = doc.createElement ("SPAN");
  };
  new_element.innerHTML = new_html;
  if (before) {
      element.parentNode.insertBefore(new_element, element);
  } else {
      insertAfter(new_element, element);
  };
};
function auto_repair_it(doc, node) {
  var biggest_elem = find_biggest_elem(doc);
  isolate(doc, biggest_elem);
  relax(doc, biggest_elem);
  make_bw(doc, biggest_elem);
  fix_page_it(doc, biggest_elem);
};
function find_biggest_elem(doc) {
  const big_element_limit = 0.25;
  var size_of_doc = doc.documentElement.offsetHeight *
      doc.documentElement.offsetWidth;
  var body = doc.body;
  var size_of_body = body.offsetHeight * body.offsetWidth;
  if (size_of_body < (0.80 * size_of_doc)) {
      size_of_body = size_of_doc;
  };
  var max_size = 0;
  var max_elem = doc;
  var allElems = document.evaluate("//*",
 doc.body, null,
 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
 null);
  for (var i = 0; i < allElems.snapshotLength; i++) {
    var thisElem = allElems.snapshotItem(i);
    var thisElem_size = thisElem.offsetHeight * thisElem.offsetWidth;

    if (thisElem_size < size_of_body &&
thisElem_size > max_size &&
!contains_big_element(thisElem, size_of_body * big_element_limit)) {
      max_size = thisElem_size;
      max_elem = thisElem;
    };
  };
  return max_elem;
};

function contains_big_element(node, limit) {
    if (node.childNodes.length != 0)
for (var i=0; i<node.childNodes.length; i++) {
    var child = node.childNodes.item(i);
    var child_size = child.offsetHeight * child.offsetWidth;
    if (child_size > limit) return true;
};
    return false;
};

function platypus_do(win, func_name, o, other, other2, other3) {
    var func = eval(func_name);
    var doc = null;
    if (func == null) return;
    if (!o) {
Warning("Platypus couldn't find a page element when executing the command "+
func_name+".  This usually happens when running a script -- maybe the"+
" web page the script is running on has changed.");
    };
    doc = win.document;
    func(doc, o, other, other2, other3);
};
//.user.js
