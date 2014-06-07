// ==UserScript==
// @name        Mininova.org - torrent category hider and sorter
// @namespace   http://openrapids.net/~frenchfrog
// @description Allows you to collapse and expand torrent categories and also sort torrent categories
// @include     http://www.mininova.org/*
// @include     http://mininova.org/*
// ==/UserScript==
// Written by François Gagné inspired by "Slashdot - comment tree" script (http://www.cs.uni-magdeburg.de/~vlaube/Projekte/GreaseMonkey/)
// which was itself inspired by Matthew Gertners "Slashdot Live Comment Tree" script (http://www.allpeers.com/blog/?p=137)
// Version 0.3, 0.4 by François Bradet

// Version 0.1   (FG) : Initial Release
//
// Version 0.1.1 (FG) : Faster execution
//
// Version 0.2   (FG) : Less intrusive and add sorting to columns
//
// Version 0.2.1 (FG) : Better sorting
//
// Version 0.3   (FB) : Remembers collapsed sections across page loads
//                      Move "all of today" in table header, decollapse on click
//                      Clean up some code, add comments
//
// Version 0.4   (FB) : Improved sorting, with sensible default sort order by column
//                      Released on 2006-06-22
//
// Version 0.4.1 (FG) : Added category page and improved page detection


(function() {

// These global styles will be added to the mininova CSS
var mininovaGlobalStyles = [
  "div.sct_icon { display: inline; cursor: pointer;}",
	"div.sct_icon:hover { display: inline; color: grey;}",
	".sct_collapsed { display: none; }",
	".sct_collapsedtitle { }",
	".saot {font: small courier; margin: 0; white-space: normal; color: #666; }"
];

var categoryStyleIndicators = {
  'collapsed': '[+]',
  'expanded': '[-]'
};

// Various utility functions
// XPath Query, unordered results
function XPathQ( xpath, node ) {
  return document.evaluate( xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
}

// XPath Query, ordered results
function XPathQO( xpath, node ) {
  return document.evaluate( xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}

// The iconCache contains a link to all collapse/expand category icons
var iconCache = new Object();

// Right after the page is done loading, we collapse the sections that are marked
// as collapsed in the local database.
window.setTimeout(function() { setDefaultCollapse() }, 60);

// This adds a global <style> tag to the HTML head
function addGlobalStyles(styles) {
	var head = document.getElementsByTagName('head')[0];
	if (head) {
	  var style = document.createElement('style');
	  style.type = 'text/css';
	  for (var i in styles)
	    style.innerHTML += styles[i];
	  head.appendChild(style);
	}
}

// Add a class to a node
function addClass(node, name) {
	node.className += " " + name;
}

// Remove a class from a node
function removeClass(node, name) {
	var regex = new RegExp("(.*)" + name + "(.*)");
	node.className = node.className.replace(regex, "$1$2");
}

// Does this node have a class "name" ?
function hasClass(node, name) {
	var regex = new RegExp(".*" + name + ".*")
	return node.className.match(regex);
}

// Add or remove the sct_collapsed class from elements that need to be hidden
function setCollapseClass( titlenode, op ) {
	var opfunc;
	if ( op == "collapsed")
	  opfunc = addClass;
  else if ( op == "expanded" )
	  opfunc = removeClass; 
	  
	// get all following siblings of titlenode and its parent
	var containerID = titlenode.getAttribute("torrentcategoryhider");
	if (containerID != null) {
		var results = XPathQ(
		              "following-sibling::*[attribute::torrentcategoryhider='" + containerID + "']",
		               titlenode );

		for (var i=0; i<results.snapshotLength; i++) {			  
	    opfunc(results.snapshotItem(i), "sct_collapsed");
		}
	}
  opfunc(titlenode, "sct_collapsedtitle");
}

function setCategoryStyle(style, commentNode, indicatorNode, iconId) {
  setCollapseClass(commentNode, style);
  indicatorNode.nodeValue = categoryStyleIndicators[ style ];
  GM_setValue(iconId, style);
} 

// Toggle the state (hidden/expanded) of a category and save the new state in the local database
function toggleState(event) {
	var titleNode = event.target.parentNode;
  var indicatorNode = titleNode.firstChild.firstChild;
	var commentNode = titleNode.parentNode;
	var iconId = event.target.id;
	
	var newStyle = "collapsed";
	if( hasClass(commentNode, "sct_collapsedtitle") )
	  newStyle = "expanded";
	  
  setCategoryStyle(newStyle, commentNode, indicatorNode, iconId);
}

// When the user clicks on "Show All Of Today" (SAOT), the local database entry for this category
// is set to "expanded", so that when the "Today" page loads, that category is not collapsed
function SAOTClick(event) {
  var SAOTid = event.target.id;
  var iconid = SAOTid.substr(5);
  GM_setValue(iconid, "expanded");
}

// Check all categories and see if their local database entry says that they should be collapsed
function setDefaultCollapse() {
  for (var i in iconCache) {
    var icon = iconCache[i];
    if (icon.catstate == "collapsed") {
      // This category must be collapsed. Let's fake an event structure and pass it to toggleState.
      var e = new Object();
      e.target = icon;
      toggleState(e);
    }
    // Move the "Show All Of Today" links so they take less space.  
    moveShowAllOfToday(icon);
  }
  
  // Need to go back to the original anchor after all that collapsing
  // Otherwise, it will be bad
  var wlh = window.location.hash;  
  if (wlh)
    window.location.hash = wlh;
}

// Move a "Show All Of Today" link next to the category title, so it takes less space.  
function moveShowAllOfToday(icon) {
  var tHead = icon.parentNode;
  var parentTable = tHead.parentNode.parentNode.parentNode;
  var container = parentTable.parentNode;
  var showAllOfToday = parentTable.nextSibling;
  if (!showAllOfToday) { return 0; }

  // Clone the original link and modify it.
  var SAOTClone = showAllOfToday.cloneNode(true);
  var SAOTid = "SAOT_" + icon.id;
  SAOTClone.id = SAOTid;
  SAOTClone.className = "saot";
  SAOTClone.innerHTML = "&nbsp;&nbsp;&nbsp;" + SAOTClone.innerHTML;
  SAOTClone.addEventListener("mousedown", SAOTClick, false);

  // Delete the original link...
  container.removeChild(showAllOfToday);
  // and insert the clone right next to the category title.
  tHead.appendChild(SAOTClone);
}

function addIcon(titlenode) {
  var defaultStyle = 'expanded';
	var icon = document.createElement("div");
	var text = document.createTextNode( categoryStyleIndicators[ defaultStyle] );

	var catname = titlenode.firstChild.id;
	icon.id = "mycat_" + catname;
  icon.catstate = GM_getValue(icon.id);
	
	icon.className = "sct_icon";
	icon.addEventListener("mousedown", toggleState, false);
	icon.appendChild(text);
	titlenode.insertBefore(icon, titlenode.firstChild);
	
	iconCache[icon.id] = icon;
}

(function() {
	addGlobalStyles( mininovaGlobalStyles );
	var results = XPathQ(
	              "//table[@class='maintable']/tbody/tr/th[@class='catname']",
	               document );
	
	for(var i=0; i<results.snapshotLength; i++) {
		var node = results.snapshotItem(i);
		addIcon(node);
		node.parentNode.setAttribute("torrentcategoryhiderheader", 1);
	}

	// well, the new layout is not perfect. i have to wrap the stuff below with a parameter 'torrentcategoryhider'
	var containerID = 0;
	results = XPathQO(
	          "//table[@class='maintable']/tbody/tr",
	           document );
	
	for(var i=0; i<results.snapshotLength; i++) {
		if(results.snapshotItem(i).getAttribute("torrentcategoryhiderheader") != null){
			containerID++;
		}
		
		results.snapshotItem(i).setAttribute("torrentcategoryhider", containerID);
	}
})();

// *** SORTING SYSTEM ***

function insAtTop(par, child) {
	var next = par.nextSibling;
	if (next != null) {
		par.parentNode.insertBefore(child, next);
	} else {
		par.parentNode.appendChild(child);
	}
}

// Since we can't pass parameters to the compare function when using
// the built-in JS sort, we need to have two separate compare functions
function compareRowsAsc(a,b) {
	if(a.sortKey==b.sortKey)
		return 0;
	return (a.sortKey < b.sortKey) ? 1 : -1;
}

function compareRowsDes(a,b) {
	if(a.sortKey==b.sortKey)
		return 0;
	return (a.sortKey < b.sortKey) ? -1 : 1;
}

function getFirstTextNode(tempCell) {
	if (tempCell) {
		if (tempCell.nodeType == 3) { //TEXT
			return tempCell;
		}
	
		for (var i=tempCell.childNodes.length-1; i>=0; i--) {
			var result = getFirstTextNode(tempCell.childNodes[i]);
			if (result) {
				return result;
			}
		}
	}
	return null;
}

function getSortKeyTime( tempCell ) {		var regex = new RegExp(
		                "^[\\ ]*([0-9]+)\ ([a-zA-Z]+)\ ([0-9]+)\,\ ([0-9]{1,2}):([0-9]{1,2})[\\ ]*$");
		                
		var matches = regex.exec(tempCell.nodeValue);
		if (matches && matches.length > 5) {
			var totalMinutes = parseInt(matches[1], 10) * 24 * 60;
			var months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
			var indexMonth = Array.indexOf(months, matches[2]);
			if (indexMonth != -1) {
				totalMinutes += indexMonth * 31 * 24 * 60;
			}
			totalMinutes += parseInt(matches[3], 10) * 366 * 24 * 60;
			totalMinutes += parseInt(matches[4], 10) * 60 + parseInt(matches[5], 10);
			return totalMinutes;
		}

		regex = new RegExp(
		            "^[\\ ]*([0-9]{1,2}):([0-9]{1,2})[\\ ]*$");
		            
		matches = regex.exec(tempCell.nodeValue);
		if (matches && matches.length > 2) {
			return parseInt(matches[1], 10) * 60 + parseInt(matches[2], 10);
		}
}

function getSortKeyText(tempCell) {
		return tempCell.nodeValue;
}

function getSortKeyTextOnly(tempCell) {
  	var regex = new RegExp(
		                "^[\\ ]*[(\\[{|][^)\\]}|]+[)\\]}|][^a-zA-Z0-9]*([a-zA-Z0-9].*)$");
		                
		var matches = regex.exec(tempCell.nodeValue);
		if(matches && matches.length > 1){
			return matches[1].toUpperCase();
		}
		var regex = new RegExp(
		                "^[^a-zA-Z0-9]*([a-zA-Z0-9].*)$");
		
		var matches = regex.exec(tempCell.nodeValue);
		if(matches && matches.length > 1){
			return matches[1].toUpperCase();
		}
		return tempCell.nodeValue;}

function getSortKeySize(tempCell) {		var regex = new RegExp(
		                "^[\\ ]*([0-9]+(\.[0-9]*)?)[^a-zA-Z]+([a-zA-Z]+)[\\ ]*$");
		                
		var matches = regex.exec(tempCell.nodeValue);
		if (matches && matches.length > 3) {
			var value = parseFloat(matches[1]);
			var vType = matches[3];
			var vMultMap = { 'TB': 1.0E12, 'GB': 1.0E9, 'MB': 1.0E6, 'KB': 1.0E3 };
			if (vType in vMultMap)
			  value *= vMultMap[vType];
			
			return value;
		}
}

function getSortKeyNumb(tempCell) {		var regex = new RegExp(
		                "^[\\ ]*([0-9]+(\.[0-9]*)?)[\\ ]*$");
		                
		var matches = regex.exec(tempCell.nodeValue);
		if (matches && matches.length > 1) {
  	  return parseFloat(matches[1]);
		}
}

function getSortType(colNo, nbCols) {
	var sortType = 'text';
	var sortTypeMap;
	var stMapMainPage_byCol     = [ 'time', 'textOnly', 'size', 'numb', 'numb' ];
	var stMapSearchPage_byCol   = [ 'time', 'text', 'textOnly', 'size', 'numb', 'numb' ]; 
	var stMapCategoryPage_byCol = [ 'text', 'numb', 'text' ];

	if ( nbCols == 5 ) // Main page, browse by category
		sortTypeMap = stMapMainPage_byCol;
	else if ( nbCols == 6 ) // Search page
		sortTypeMap = stMapSearchPage_byCol;
	else if ( nbCols == 3 ) // Category page
		sortTypeMap = stMapCategoryPage_byCol;
	else
		return 'text';
	  
	return sortTypeMap[ colNo ];
}

//Next 2 functions are used because there is sometime TEXT nodes in between of th/td nodes
function getTableNbElement(titlenode) {
	var count = 0;
	for (var i=0; i<titlenode.parentNode.childNodes.length; i++) {
		var curNode = titlenode.parentNode.childNodes[i];
		if (curNode.nodeType == 1) { //ELEMENT_NODE
			count++;
		}
	}
	return count;
}

function getTableIndexElement(titlenode) {
	var index = 0;
	for (var i=0; i<titlenode.parentNode.childNodes.length; i++) {
		var curNode = titlenode.parentNode.childNodes[i];
		if (curNode == titlenode) {
			return index;
		}else if(curNode.nodeType == 1) { //ELEMENT_NODE
			index++;
		}
	}
	return -1;
}

function sortTable(titlenode, ord) {
	var colNo = Array.indexOf(titlenode.parentNode.childNodes, titlenode);
	var containerID = titlenode.parentNode.getAttribute("torrentcategoryhider");
	if (colNo != -1 && containerID != null) {
		var sortType = getSortType(getTableIndexElement(titlenode), getTableNbElement(titlenode));
		var rows = new Array();
		var results = XPathQ(
		             "following-sibling::*[attribute::torrentcategoryhider='" + containerID + "']",
		             titlenode.parentNode );
		
		for (var i=0; i<results.snapshotLength; i++) {
			rows[i] = results.snapshotItem(i);
			temp = rows[i].childNodes[colNo];
			
			// First is the sorting function, second is the default return value
			var sortingFunctions = {
       'time':     [ getSortKeyTime,     -1 ],
       'text':     [ getSortKeyText,     '' ],
       'textOnly': [ getSortKeyTextOnly, '' ],
       'size':     [ getSortKeySize,     -1 ],
       'numb':     [ getSortKeyNumb,     -1 ]
      }

      var sInfo = sortingFunctions[sortType];
			var sortFunc = sInfo[0];
			var sortDefault = sInfo[1];
			
      var tempCell = getFirstTextNode(temp);
      var sortKey = null;
      
      if (tempCell)
        sortKey = sortFunc( tempCell );
      
      if (sortKey == null)
        sortKey = sortDefault;
      
			rows[i].sortKey = sortKey;
		}
		
		if (ord == 1) {
			rows.sort(compareRowsAsc);
		} else {
			rows.sort(compareRowsDes);
		}
		
		for (var i=0; i<rows.length; i++) {
			if (i % 2 == 0) {
				removeClass(rows[i], "d");
			} else if (!hasClass(rows[i], "d")) {
				addClass(rows[i], "d");
			}
			insAtTop(titlenode.parentNode, rows[i]);
		}
	}
}

// Sort arrow entities
var chSortArrows = { '1': '&darr;', '-1': '&uarr;' }
// These are fat arrows, used to indicate the currently sorted column
var chSortArrowsCur = { '1': '&dArr;', '-1': '&uArr;' }

function toggleStateSorting(event) {
	var titlenode = event.target.parentNode;
  var icon = titlenode.firstChild;
  
  // Default sort order, descending with down arrow character
	var sortDirection = icon.getAttribute('sortDirection');
  titlenode.setAttribute( 'currentlySortedColumn', 1 );  
  
	var chSortDirectionIndicator = chSortArrowsCur[ sortDirection ]; 
	
	sortTable( titlenode, sortDirection );
	
	// We reverse the sort direction for this column
  icon.setAttribute( 'sortDirection', sortDirection * -1 );
  icon.innerHTML = chSortDirectionIndicator;
		
	var results = XPathQ(
	              "preceding-sibling::*|following-sibling::*",
	              titlenode );
	              
	for (var i=0; i<results.snapshotLength; i++) {
		var node = results.snapshotItem(i);
		var icon = node.firstChild;
		var sortDirection = icon.getAttribute('sortDirection');

    // If we aren't re-sorting the currently sorted column, we
    // put its sort direction back to what it last was, rather
    // than flip it seemingly at random
    if (node.getAttribute('currentlySortedColumn'))
      sortDirection *= -1;
		  icon.setAttribute('sortDirection', sortDirection);
		  node.removeAttribute('currentlySortedColumn');

	  icon.innerHTML = chSortArrows[ sortDirection ];
	}
}

// Text columns should be sorted in ascending order, but
// non-text columns such as seeds, peers or size should be
// sorted in descending order.
function getDefaultSortDirection( nodeNo, nbCols ) {
  var sortType = getSortType( nodeNo, nbCols );
  var sortDirection = -1;

  if ( sortType == 'textOnly' || sortType == 'text' )
    sortDirection = 1;
  return sortDirection;
}

function addIconSorting(titleNode, sortDirection) {
	var icon = document.createElement("div");
	icon.innerHTML = chSortArrows[ sortDirection ];	icon.className = "sct_icon";
	icon.setAttribute('sortDirection', sortDirection);
	icon.addEventListener("mousedown", toggleStateSorting, false);
	titleNode.insertBefore(icon, titleNode.firstChild);
}

(function() {
	results = XPathQ(
				  "//table[@class='maintable']/tbody/tr/th",
				  document );

	for(var i=0; i<results.snapshotLength; i++) {
		var node = results.snapshotItem(i);

		if(!hasClass(node, "catname")){
			var effectiveColNo = getTableIndexElement(node);
			var effectiveNbCols = getTableNbElement(node);
			
			var sortDirection = getDefaultSortDirection(effectiveColNo, effectiveNbCols);
			addIconSorting(node, sortDirection);
		}
	}
})();

})();