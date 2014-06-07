// NIH GEO thingamajig
// version 0.2 BETA!
// 2007-09-21
// Copyright (c) 2007, Asheesh Laroia <asheesh@creativecommons.org> and others
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Select samples on NIH GEO
// @namespace     http://asheesh.org/
// @description   Lets you pick samples on NIH GEO
// @include       http://www.ncbi.nlm.nih.gov/sites/entrez?*db=gds*
// ==/UserScript==

function array_contains(needle, haystack) {
    for (var i = 0 ; i < haystack.length; i++) {
	var elt = haystack[i];
	if (elt.nodeValue == needle.nodeValue) {
	    return true;
	}
    }
    return false;
}

var added_to_a = [];
var added_to_b = [];

function first_parent_of_type(base_tag, tag_name) {
    // Yay for infinite loops!
    while (base_tag.nodeName.toLowerCase() != "body") {
	if (base_tag.parentNode.nodeName.toLowerCase() == tag_name.toLowerCase()) {
	    return base_tag.parentNode;
	}
	base_tag = base_tag.parentNode;
    }
}

function form2urlparts() {
    var me_tabble = document.getElementById('compare_me'); // lol evil - looking for a table
    var parts = [[], []];

    // for each row in the table
    // Start at row 1 because row 0 has the header
    for (var i = 1 ; i < me_tabble.childNodes.length; i++) {
	var me_row = me_tabble.childNodes[i];

	// for each column in the row
	for (var j = 0; j < me_row.childNodes.length; j++) {
	    var me_td = me_row.childNodes[j];

	    if (j < 2) {
		if (me_td.childNodes.length > 0) {
		    // a TD can be empty if it is empty
		    // but the TD in the other column is not
		    parts[j].push(me_td.firstChild.data);
		}
	    }
	}
    }

    var ret = "a=";
    for (var i = 0 ; i < parts[0].length ; i++) {
	var subthing = "" + parts[0][i];
	ret += subthing + ",";
    }
    ret += "&b=";

    for (var i = 0 ; i < parts[1].length ; i++) {
	var subthing = "" + parts[1][i];
	ret += subthing + ",";
    }
    
    return ret;
}

var a_color='#FFFF84';
var b_color='#99C7FF';

function find_first_empty_row_td(table_id, offset) {
    var tab = document.getElementById(table_id);   
    for (var i = 0 ; i < tab.childNodes.length ; i++) {
	row = tab.childNodes[i];
	if (row.tagName == 'TR') {
	    td = row.childNodes[offset];
	    if (td.childNodes.length == 0) {
		return td;
	    }
	}
    }
    return null;
}

function add_to_table(table_id, offset_from_left, total_table_width, dom_obj) {
    var tab = document.getElementById(table_id);
    var first_empty_row_td = find_first_empty_row_td(table_id, offset_from_left);
    if (first_empty_row_td == null) {
	// create an empty row of size total_table_width
	// that make a TR filled with empty TDs except at offset_from_left
	var new_row = document.createElement('tr');

	for (var i = 0; i < total_table_width; i++) {
	    new_row.appendChild(document.createElement('td'));
	}

	// now, in the position of offset_from_left, put in dom_obj
	new_row.childNodes[offset_from_left].appendChild(dom_obj)

	// now stick that in the table
	tab.appendChild(new_row);
    } else { 
	// we can just jam what we want into first empty TD
	first_empty_row_td.appendChild(dom_obj);
    }
}


//*****************************************************************************
// Do not remove this notice.
//
// Copyright 2001 by Mike Hall.
// See http://www.brainjar.com for terms of use.
// I read it, and re-use is allowed under the terms of the GPL.
//*****************************************************************************

// Determine browser and version.

function Browser() {
    
    var ua, s, i;
    
    this.isIE = false;
    this.isNS = false;
    this.version = null;
    
    ua = navigator.userAgent;
    
    s = "MSIE";
    if ((i = ua.indexOf(s)) >= 0) {
	this.isIE = true;
	this.version = parseFloat(ua.substr(i + s.length));
	return;
    }
    
    s = "Netscape6/";
    if ((i = ua.indexOf(s)) >= 0) {
	this.isNS = true;
	this.version = parseFloat(ua.substr(i + s.length));
	return;
    }
    
    // Treat any other "Gecko" browser as NS 6.1.
    
    s = "Gecko";
    if ((i = ua.indexOf(s)) >= 0) {
	this.isNS = true;
	this.version = 6.1;
	return;
    }
}

var browser = new Browser();

// Global object to hold drag information.

var dragObj = new Object();
dragObj.zIndex = 0;

function dragStart(event, id) {
    
    var el;
    var x, y;
    
    // If an element id was given, find it. Otherwise use the element being
    // clicked on.
    
    if (id)
	dragObj.elNode = document.getElementById(id);
    else {
	if (browser.isIE)
	    dragObj.elNode = window.event.srcElement;
	if (browser.isNS)
	    dragObj.elNode = event.target;
	
	// If this is a text node, use its parent element.
	
	if (dragObj.elNode.nodeType == 3)
	    dragObj.elNode = dragObj.elNode.parentNode;
    }
    
    // Get cursor position with respect to the page.
    
    if (browser.isIE) {
	x = window.event.clientX + document.documentElement.scrollLeft
	    + document.body.scrollLeft;
	y = window.event.clientY + document.documentElement.scrollTop
	    + document.body.scrollTop;
    }
    if (browser.isNS) {
	x = event.clientX + window.scrollX;
	y = event.clientY + window.scrollY;
    }
    
    // Save starting positions of cursor and element.
    
    dragObj.cursorStartX = x;
    dragObj.cursorStartY = y;
    dragObj.elStartLeft = parseInt(dragObj.elNode.style.left, 10);
    dragObj.elStartTop = parseInt(dragObj.elNode.style.top, 10);
    
    if (isNaN(dragObj.elStartLeft)) dragObj.elStartLeft = 0;
    if (isNaN(dragObj.elStartTop)) dragObj.elStartTop = 0;
    
    // Update element's z-index.

    dragObj.elNode.style.zIndex = ++dragObj.zIndex;
    
    // Capture mousemove and mouseup events on the page.
    
    if (browser.isIE) {
	document.attachEvent("onmousemove", dragGo);
	document.attachEvent("onmouseup", dragStop);
	window.event.cancelBubble = true;
	window.event.returnValue = false;
    }
    if (browser.isNS) {
	document.addEventListener("mousemove", dragGo, true);
	document.addEventListener("mouseup", dragStop, true);
	event.preventDefault();
    }
}

function dragGo(event) {
    
    var x, y;
    
    // Get cursor position with respect to the page.
    
    if (browser.isIE) {
	x = window.event.clientX + document.documentElement.scrollLeft
	    + document.body.scrollLeft;
	y = window.event.clientY + document.documentElement.scrollTop
	    + document.body.scrollTop;
    }
    if (browser.isNS) {
	x = event.clientX + window.scrollX;
	y = event.clientY + window.scrollY;
    }
    
    // Move drag element by the same amount the cursor has moved.
    
    dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
    dragObj.elNode.style.top = (dragObj.elStartTop + y - dragObj.cursorStartY) + "px";
    
    if (browser.isIE) {
	window.event.cancelBubble = true;
	window.event.returnValue = false;
    }
    if (browser.isNS)
	event.preventDefault();
}

function dragStop(event) {
    
    // Stop capturing mousemove and mouseup events.
    
    if (browser.isIE) {
	document.detachEvent("onmousemove", dragGo);
	document.detachEvent("onmouseup", dragStop);
    }
    if (browser.isNS) {
	document.removeEventListener("mousemove", dragGo, true);
	document.removeEventListener("mouseup", dragStop, true);
    }
}


var div_boxA = document.createElement('div');
var div_box_a_onmousedown = function(event){
    dragStart(event, 'boxA');
    event.preventDefault();
   };
div_boxA.addEventListener('mousedown', div_box_a_onmousedown, true);
   div_boxA.style.left = "645px";
   div_boxA.style.top = "10px";
   div_boxA.style.width = "12em";
   div_boxA.style.zIndex = 2;
   div_boxA.style.position = "fixed";
   div_boxA.id = "boxA";

   var table_compare_me = document.createElement('table');
      table_compare_me.id = "compare_me";

      var tr_0 = document.createElement('tr');

         var td_0 = document.createElement('td');
            td_0.className = "a";
            td_0.style.backgroundColor=a_color;

            td_0.appendChild( document.createTextNode("Column A") );
         tr_0.appendChild( td_0 );


         var td_1 = document.createElement('td');
            td_1.className = "b";
            td_1.appendChild( document.createTextNode("Column B") );
            td_1.style.backgroundColor = b_color;
         tr_0.appendChild( td_1 );

      table_compare_me.appendChild( tr_0 );

   div_boxA.appendChild( table_compare_me );

var input_0 = document.createElement('input');
   input_0.value = "Compare!";
   input_0.type = "submit";

var input_0_onclick = function(event) { 
    url_parts = form2urlparts();
    document.location = 'http://sw.neurocommons.org/2007/activity-center?' + url_parts;
    event.preventDefault();
    return false;
};

input_0.addEventListener('click', input_0_onclick, true);

document.body.appendChild( input_0 );

div_boxA.appendChild(input_0);

document.body.appendChild( div_boxA );

// <link +a>

function a_0() {
    var a_0 = document.createElement('a');
    a_0.href = "#";
    var a_0_onclick = function(event){
	var text = target2textnode(event.target);

	// if it's not already there, then add it
	if (! array_contains(text, added_to_a)) {
	    add_to_table('compare_me', 0, 2, target2textnode(event.target));
	    added_to_a.push(text);
	}

	// no matter what, don't let the clicking do real linking
	event.preventDefault();
	return false;
    };
    a_0.addEventListener('click', a_0_onclick, true);
    a_0.appendChild( document.createTextNode("+A") );
    a_0.style.backgroundColor = a_color;
    return a_0;
// </link>
}


// <link +b>
function a_1() {
    
    var a_1 = document.createElement('a');
    a_1.href = "#";
    var a_1_onclick = function(event){
	var text = target2textnode(event.target);

	if (! array_contains(text, added_to_b)) {
	    add_to_table('compare_me', 1, 2, text);
	    added_to_b.push(text);
	}
	event.preventDefault();
	return false;
    };
    a_1.addEventListener('click', a_1_onclick, true);
    a_1.appendChild( document.createTextNode("+B") );
    a_1.style.backgroundColor = b_color;
    return a_1;
}
// </link>

// Links to click

function table2reference_series(table) {
    var links = table.getElementsByTagName('a');
    for (var i = 0 ; i < links.length ; i++) {
	var link = links[i];
	if (link.previousSibling && link.previousSibling.data == "Reference Series: ") {
	    var gse = link.firstChild.data;
	}
    }
    return gse;
}

function target2textnode(elt) {
    var my_td = elt.parentNode;
    var my_td_links = document.evaluate('a', my_td, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var my_td_link = my_td_links.snapshotItem(0);
    var my_td_link_text = my_td_link.childNodes[0].data;
    var my_td_gsm_thing = my_td_link_text.split(":")[0];

    // grab the reference series, too
    var my_reference_series = table2reference_series(first_parent_of_type(first_parent_of_type(my_td, 'table'), 'table'));

    return document.createTextNode(my_reference_series + '/' + my_td_gsm_thing);
}


var result_boxes = document.evaluate('//table[@width="99%"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// grab each set of rows
if (result_boxes.snapshotLength > 0) {
    for (var i = 0 ; i < result_boxes.snapshotLength; i++) {
	var result_box = result_boxes.snapshotItem(i);

	// for each set of rows
	var my_trs = result_box.childNodes[0].childNodes;

	// for each row
	for (var j = 0 ; j < my_trs.length ; j++) {
	    // grab the row
	    var my_tr = my_trs[j];
	    var my_td = my_tr.childNodes[0];

	    // add two links
	    my_td.appendChild(document.createTextNode(' '));
	    my_td.appendChild(a_0());
	    my_td.appendChild(document.createTextNode(' '));
	    my_td.appendChild(a_1());
	}
    }
}



