// ==UserScript==
// @name		PHI+ Beta 2
// @version		1.3 Beta 2
// @namespace		http://www.dvdmypictures.com
// @description		Go to Tools->User Script Commands-> - Added some cool stuff
// @include		http://ev5.neondragon.net/*
// @include		http://evo-dev.neondragon.net/*
// @author		~ravenlord~ (r4v3n10rd@gmail.com) - original 1.0x source
// @author		HETMAN (kanarinios@gmail.com) - upgrades
// @author		mindfox & Fire - upgrades
// @author		MadFrog (mbfrog@gmail.com)
// @author		Roland
// @author		WhyteWolf (whytewolf1@gmail.com)
// @author		Gavry
// @author		Ressol
// @author		Pinky
// @author		Toby-Jug
// @author		Chief Trajan
// @author		Pipes6969
// ==/UserScript==

/*
 * $Id: evoplus.user.js,v 1.19 2006/07/24 09:51:22 pinky Exp $
 * Encapsulated every part of PHI+ With //Matt 75 for ease of
 * updating in the future
 *
 *
 *
 *$Log: evoplus.user.js,v $
 * Revision 1.20  2006/07/24 09:51:22  pinky
 * Make it work with the new layout
 * Scan Amp:Land ratio on scans page
 * Max land possible to allocate on resources page
 * Highlighting added to new alliances system
 * Highlighting on rankings
 * Notepad feature (c/o Gavry)
 *
 * Revision 1.19  2006/07/01 20:55:50  madfrog
 * Added a quick "add to buddies" link to the alliance members pages
 *
 * Revision 1.18  2006/06/29 18:26:41  madfrog
 * Updated dEvo stats
 * The allocated % on the Sector Scan was not taking the food into account
 * Optimized parsing on the Sector Scan
 *
 * Revision 1.17  2006/06/22 23:57:46  madfrog
 * Saving the Efficient Breeding Center coefficient as float was breaking GM
 * Removed an unused configuration item (for the scan page)
 *
 * Revision 1.16  2006/06/22 23:14:53  madfrog
 * Implemented changes from Ressol:
 * Sector Scan: Max/min attacker score in scan result
 * Sector Scan: Allocated land ratio and estimated land defense
 * Sector Scan: Number formatting / fields colorful
 * Creature Scan: Estimated creatures launch cost
 * Battle Report: Add land loss ratio in defense side
 * Alliances Page: Add average member score
 *
 * Revision 1.15  2006/06/22 19:59:32  madfrog
 * Enabled the use of plugin scripts
 * Efficient Breeding Center setting is now saved in a GM_Variable (useful?)
 * Fixed a typo (Archological path)
 * Moved all utility functions at the bottom
 *
 * Revision 1.14  2006/06/21 22:39:17  madfrog
 * Fixed a problem with Efficient Breeding Center on the create page
 *
 * Revision 1.13  2006/03/17 17:12:38  madfrog
 * Fixed a problem with the land ratio calculator that caused an infinite loop
 *
 * Revision 1.12  2006/03/09 22:00:36  madfrog
 * removed a [NOD] tag from the script name :P
 *
 * Revision 1.11  2006/03/09 11:47:02  madfrog
 * added automatic handling ot the evo-dev.neondragon.net URL
 * forgot to credit Hemna for the evo-dev critter stats
 *
 * Revision 1.10  2006/03/09 01:55:06  madfrog
 * added support for evo-dev (5 mns ticks and creature stats - thanks to [BT]Hemna)
 * added support for the Efficient Breeding center on on the create page
 * fixed problems on the news page (NaNs on the BRs. /0 is innocent ;))
 * added average land per alliance member on the alliance ranking page (Gavry)
 *
 * Revision 1.9  2006/02/19 17:13:30  madfrog
 * Corrected a bug in the cost evaluation of losses (it broke with defenses like forts)
 * Removed a couple of NaNs caused by a div by zero (pun intended)
 *
 * Revision 1.8  2006/02/17 18:56:39  madfrog
 * Simplified land ratio on the resources page
 * Disabled land grab stats if defending
 * Added cost evaluation of losses on battle reports
 * Version bump
 *
 * Revision 1.7  2006/02/09 18:35:52  madfrog
 * Adapted to the new user interface
 *
 * Revision 1.6  2006/02/02 13:19:33  whytewolf
 * minor cost fix for OP and MP costs
 * also spelling correction
 *
 * Revision 1.5  2006/02/01 19:56:01  madfrog
 *
 * Implemented Maximum possible boosts (for scans, affected by previous change) separated from the players's boosts (for create and fleets)
 * Hooked the boost configuration to a menu command.
 * A bit of code cleanup in the land ratio display.
 * Better tooltip information in the scans att2/def2 evaluations.
 *
 * Revision 1.4  2006/01/31 22:56:12  whytewolf
 *
 * typo correction and version bump
 * and version change to include magor.minor.bug
 *
 * Revision 1.3  2006/01/31 22:42:36  whytewolf
 *
 * added land ratio function
 * and MaxBoost Configureation
 *
 * Revision 1.2  2006/01/30 16:19:18  madfrog
 * Added land grab stats on the news page (from Roland's)
 *
 * Revision 1.1  2006/01/30 13:21:09  madfrog
 * First 2.0 version. Almost complete rewrite of the 1.x series with some addtional features.
 *
*/


// ***************************************************************************
// ** Global Variables
// ***************************************************************************






function do_platypus_script() {
html_insert_it(window.document,document.getElementById('gametime'),'<iframe width="170" height="140" src="http://www.dvdmypictures.com/Phalanx/Phalanx_newstic.html" SCROLLING="no" FRAMEBORDER="0" border=0></iframe>',false,false);
}; // Ends do_platypus_script
window.addEventListener("load", function() { do_platypus_script() }, false);
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
























// Matt 75
const scriptversion = '1.3 Beta 2';
const scriptversionID = 'PHI+ ' + scriptversion;
const scriptTag = 'None';
GM_log(scriptversionID + " start");
// Matt 75


// xscript data sharing
unsafeWindow.evo_plus = new Array();

// page handlers
var pageHandlers = new Array();

var units = new Object(); // units :P
var contents = null; // pointer to the 'content' node in the page

// Matt 75
// boosts
const UT_NONE		= 0;
const UT_NATURAL	= 1;
const UT_ENG		= 2;
const UT_FLEET		= 3;
const UT_RATIO		= 4;
// Matt 75

// Matt 75
// max possible boosts
var maxBoosts = new Array();
maxBoosts[UT_NONE]	= 0;
maxBoosts[UT_NATURAL]	= 0.3946625;  //max boost for natural
maxBoosts[UT_ENG]	= 0.33126875; //max boost for eng
maxBoosts[UT_FLEET]	= 1;
maxBoosts[UT_RATIO]	= 1;
unsafeWindow.evo_plus['maxBoosts'] = maxBoosts;
// Matt 75

// defense multiplier
var defenseMultiplier = 1.4;

// defender's boost
var defendersBoost = 1.44;

// intrinsic land defense
var landDefense = 80;

// mimimum score ratio fo attacks
var minAttack = 0.35;

// Matt 75
// user current boosts
var boosts = new Array();
boosts[UT_NONE]		= 0;
boosts[UT_NATURAL]	= Number(GM_getValue('boostNat', maxBoosts[UT_NATURAL]));
boosts[UT_ENG]		= Number(GM_getValue('boostEng', maxBoosts[UT_ENG]));
boosts[UT_FLEET]	= Number(GM_getValue('boostFleet', maxBoosts[UT_FLEET]));
boosts[UT_RATIO]	= Number(GM_getValue('boostRatio', maxBoosts[UT_RATIO]));
unsafeWindow.evo_plus['boosts'] = boosts;
// Matt 75

var pMetal = 0, pMineral = 0, pFood = 0; //player's resources
var pRank = null, pScore = null; // player's ranking and score
var eeb = Number(GM_getValue('eeb', 1)); // efficient breeding center ratio

var dEvo = /^http:\/\/evo-dev\./.test(document.location.href);

//
// ***************************************************************************
// ** Page handlers
// ***************************************************************************
//
// Add stuff to the scans and create pages
regPageHandler(/^\/create/i, function () { evoCreate(1); evoCreate(2); evoCreate(3); });
regPageHandler(/^\/scans/i,  function () { evoCreate(1); });
// handle each creation table
function evoCreate(tableID) {
	//
	// event handlers
	//
	// refreshes the max numbers when click on "max" or form field change
	function evoUpdateAvailableUnits(table) {
		var tmpMetal = pMetal;
		var tmpMineral = pMineral;
		var rows = table.rows;
		var row, unit, unitsToOrder, maxUnitsAvailable, span;

		// keep data between the two passes
		var createDataArray = new Array();
		function createData(unit, unitsToOrder, isTooMuch) {
			this.unit = unit;
			this.unitsToOrder = unitsToOrder;
			this.isTooMuch = isTooMuch;
		}

		// first pass
		//	- gather all necessary data for second pass
		//	- adjust metal/mineral amount
		for(var i = 2; i < (rows.length - 1); i++) {
			row = rows[i];
			unit = row.cells[1].getElementsByTagName('SPAN')[0].textContent.toLowerCase();
			unit = units[unit];

			unitsToOrder = Number(row.cells[3].getElementsByTagName('INPUT')[0].value);
			if( isNaN(unitsToOrder) ) unitsToOrder = 0;
			createDataArray[i] = new createData(unit, unitsToOrder, unitsToOrder > unit.getMaxUnits(tmpMetal, tmpMineral));

			if(! createDataArray[i].isTooMuch ) {
				tmpMetal = Math.max(tmpMetal - unitsToOrder * unit.getMetal(), 0);
				tmpMineral = Math.max(tmpMineral - unitsToOrder * unit.getMineral(), 0);
			}
		}
		// second pass
		//	- ui logic
		for(var i = 2; i < (rows.length - 1); i++) {
			row = rows[i];
			maxUnitsAvailable = createDataArray[i].unit.getMaxUnits(tmpMetal, tmpMineral);
			span = row.cells[3].getElementsByTagName('SPAN')[0];
			// have to replace the data of the child text node
			// span.textContent = html would recreate the child text node and cancel the onclick event
			span.firstChild.data = 'max: ' + String(createDataArray[i].isTooMuch ? maxUnitsAvailable : (maxUnitsAvailable + createDataArray[i].unitsToOrder));
			span.style.color = createDataArray[i].isTooMuch ? 'coral' : 'palegoldenrod';
		}
	}
	var onBlur = function() { evoUpdateAvailableUnits(table); };
	var onClick = function(e) {
		if( e.target.tagName.toLowerCase() == 'input' ) return;
		this.getElementsByTagName('input')[0].value = /max: (\d+)/m.exec(this.textContent)[1];
		evoUpdateAvailableUnits(table);
	};

	//
	// Helper functions
	//
	function addHeader(cellIndex, label) {
		var cell = table.rows[0].insertCell(cellIndex);
		cell.innerHTML = label;
		cell.align = "center"; cell.vAlign = "bottom"; cell.width = "60px";
		cell = table.rows[1].insertCell(cellIndex); cell.className = "alt1";
	}
	function addStat(row, cellIndex, base, square, value, boost) {
		var cell = row.insertCell(cellIndex);
		cell.className = row.cells[1].className; cell.align = "center";
		cell.innerHTML = '<span title="Unboosted: ' + base + '">' + (base*boost).toFixed(1)
			+ '</span><br /><span class="t_enormous" title="Unboosted: ' + square + '">' + (square*boost*boost).toFixed(0)
			+ '</span><br /><span title="Unboosted: ' + evoNumber2String(value) + '">' + evoNumber2String((value*boost*boost).toFixed(0)) + '</span>';
	}
	//
	// main
	//
	var unit, cell, unitCost, row;
	var table = null;
	var isScanPage = document.location.pathname == '/scans';
	var xPathTerm = ".//div[@class='"+(dEvo?"separator title":"separator title")+"'";
	if( isScanPage) 
		xPathTerm = xPathTerm+ "][3]/following-sibling::table[1]";
	else 
		xPathTerm = xPathTerm + "]["+tableID+"]/following-sibling::table[1]";

	table = document.evaluate(xPathTerm, contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if(table == null) return;

	var showstats = !isScanPage && (tableID == 1 || tableID == 2);

	// Efficient breeding center?
	if( showstats && tableID == 1 ) {
		var monkey =  document.evaluate(".//tbody/tr/td[2][./a/span[@class='b' and text()='Monkey']]/text()",
							table, null, XPathResult.STRING_TYPE, null).stringValue;
		if( monkey ) {
			var match = /(\d+) metal, (\d+) mineral each\./.exec(monkey);
			if( match ) {
				eeb = parseInt(match[1]) / units['monkey'].metal;
				GM_setValue('eeb', String(eeb));
			}
		}
	}

	// add creatures/items stats
	if( showstats ) {
		// column headers
		addHeader(4, 'Attack/<br /><strong>Attack<sup>2</sup></strong>/<br /><span title="Att2 per 100,000 resources (metal + mineral)">per 100K</span>');
		addHeader(5, 'Defense/<br /><strong>Defense<sup>2</sup></strong>/<br /><span title="Def2 per 100,000 resources (metal + mineral)">per 100K</span>');
		addHeader(6, 'Total/<br /><strong>Total<sup>2</sup></strong>/<br /><span title="Att2+Def2 per 100,000 resources (metal + mineral)">per 100K</span>');
	}

	// display stats for each item
	for( var i = 2; i < (table.rows.length - 1); i++ ) {
		row = table.rows[i];
		if( showstats ) {
			unit = (row.cells[1].getElementsByTagName('SPAN'))[0].textContent.toLowerCase();
			unit = units[unit];
			unitCost = unit.getMetal() + unit.getMineral();
			var att2 = unit.getAttackScore(1);
			var def2 = unit.getDefenseScore(1);
			var average = att2 + def2;
			var boost = 1 + unit.getBoost();
			addStat(row, 4, unit.attack,  att2, Math.round(att2*100000/unitCost), boost);
			addStat(row, 5, unit.defense, def2, Math.round(def2*100000/unitCost), boost);
			addStat(row, 6, (unit.defense + unit.attack), average, Math.round(average*100000/unitCost), boost);
		}
		// new UI
		cell = document.createElement('SPAN');
		cell.style.display = "block";
		row.cells[3].style.cursor = "pointer";
		cell.textContent = ' '; // forces the creation of a text node
		row.cells[3].appendChild(cell);
		// update hook
		row.cells[3].getElementsByTagName('INPUT')[0].addEventListener('blur', onBlur, false);
		// order max amount hook
		row.cells[3].addEventListener('click', onClick, false);
	}

	// hook up a confirmation dialog on the form
	var youSure = function(e)
		{
			if(! confirm('Will this help you climb to the top of the ranks, or is this just an impulsive purchase?'))
				e.preventDefault();
		}
	var daForm = table.getElementsByTagName('FORM')[0];
	daForm.addEventListener('submit', youSure, false);

	evoUpdateAvailableUnits(table);
}

//
// changes to the overview page
//
regPageHandler(/^\/(overview)?$/i,  evoOverview);
function evoOverview() {
	var tick = dEvo ? 5 : 60;
	var i, ticks, total;
	var node, match;
	var now = new Date(document.lastModified);
	var searchKey = dEvo ? "separator title":"separator title";
	now.setUTCMinutes(now.getUTCMinutes() - now.getUTCMinutes() % tick);

	// let's try to grab the player's coords
	node = document.evaluate(".//span[@class='t_little'][preceding-sibling::span[@class='t_medium b']]", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if( node != null && (match = node.innerHTML.match(/(\d*?),(\d*?),(\d*?):\w/)) ) {
		GM_setValue(dEvo?'devoCoords':'evoCoords', match[0]);
		unsafeWindow.evo_plus.coords = match[0];
	} else
		GM_log("Unable to find your coordinates :(", 1);

	// look for the fleets status table and show the ETA
	node = document.evaluate('.//div[@class="'+searchKey+'"]/following-sibling::div[1]/table[contains(., "Heading")]', contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if( node ) {
		node.rows[0].cells[3].textContent = 'Ticks';
		node.rows[0].insertCell(4);
		node.rows[0].cells[4].textContent = 'ETA';
		// let's parse the ETAs...
		for(i = 1; i < node.rows.length; i++) {
			if( node.rows[i].cells.length == 4 ) {
				node.rows[i].insertCell(4);
				if(! isNaN(ticks = parseInt(node.rows[i].cells[3].textContent)) ) {
					var eta = new Date(now.valueOf() + (ticks * tick * 60000));
					node.rows[i].cells[4].textContent = evoFormatNumberZ(eta.getUTCHours(),2) + ":" + evoFormatNumberZ(eta.getUTCMinutes(),2) + " GMT";
				}
			}
		}
	}

	// Same for the R&D
	var nodes = document.evaluate(".//div[@id='cdev' or @id='cresearch']/div[2]", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if( !dEvo ) {
		for( i = 0; node = nodes.snapshotItem(i); i++ ) {
			node.innerHTML = node.innerHTML.replace(/(\d+)% \((\d+)\/(\d+)\) (\w+\W+)/,
					 function(str, p1, p2, p3, offset, s) {
						var minutes = (Number(p3) - Number(p2)) * tick;
						var eta = new Date(now.valueOf() + (minutes * 60000));
						return p1 + '% (' + p2 + '/' + p3 + ') complete - ETA: ' + evoFormatNumberZ(eta.getUTCHours(),2) + ":" + 
						       evoFormatNumberZ(eta.getUTCMinutes(),2) + " GMT" + 
						       (minutes > 1440 ? ' (+' + Math.floor(minutes/1440) + ' day' + ( minutes >= 2880 ? 's' : '' ) + ')' : '')+ "<";
					 });
		}
	} else {
		for( i = 0; node = nodes.snapshotItem(i); i++ ) {
			node.innerHTML = node.innerHTML.replace(/(\d+)% \((\d+)\/(\d+)\) [\w\W]+<table/,
					 function(str, p1, p2, p3, offset, s) {
						var minutes = (Number(p3) - Number(p2)) * tick;
						var eta = new Date(now.valueOf() + (minutes * 60000));
						return p1 + '% (' + p2 + '/' + p3 + ') complete - ETA: ' + evoFormatNumberZ(eta.getUTCHours(),2) + ":" + 
					               evoFormatNumberZ(eta.getUTCMinutes(),2) + " GMT" + 
						       (minutes > 1440 ? ' (+' + Math.floor(minutes/1440) + ' day' + ( minutes >= 2880 ? 's' : '' ) + ')' : '');
					 });
		}
	}

	// same for the creatures and stuff
	if( !dEvo)
			nodes = document.evaluate(".//div[@class='separator title']/following-sibling::div[@class='alt2 t_little']/table/tbody/tr[count(td)=3]",
			contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	else
		nodes = document.evaluate(".//div[@class='separator title']/following-sibling::div[@class='alt2 t_little']/table/tbody/tr[count(td)=3]",
			contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for( i = 0; node = nodes.snapshotItem(i); i++ ) {
		// add a column
		node.insertCell(3);
		if( match = /\d+% [\s\S]*,[\s\S]*(\d+)[\s\S]*/.exec(node.cells[2].textContent) ) {
			var eta = new Date(now.valueOf() + (Number(match[1]) * tick * 60000));
			node.cells[3].textContent = evoFormatNumberZ(eta.getUTCHours(),2) + ":" + evoFormatNumberZ(eta.getUTCMinutes(),2) + " GMT";
		}
	}

	// add a link to the continent/planet
	nodes = document.evaluate(".//td[child::span[@class='t_medium b']]", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for( i= 0; node = nodes.snapshotItem(i); i++ )
		node.innerHTML = node.innerHTML.replace(/<span class="t_little".*\((\d+,\d+,\d+)(:\w)?\)<\/span>/i, '<a href="/$1" style="text-decoration:none">$&</a>');

	// attackers - defenders
	if( node = document.evaluate(".//div[@class='alt2 t_little']/center/span[@class='t_little']", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue ) {
		attackers = new Array();
		defenders = new Array();
		var j, first = 24, last = 0;
		nodes = node.getElementsByTagName('font');
		for(i=0; i < 24; i++) attackers[i] = defenders[i] = 0;
		for(i = 0; i < nodes.length; i++ ) {
			if( match = /Incoming (\d+) creatures .* they will be here to (ATTACK|DEFEND) in (\d+) tick/.exec(nodes[i].innerHTML) ) {
				var num = parseInt(match[3]);
				if( match[2] == 'ATTACK' ) {
					for(j = num; j < num + 3; j++) attackers[j] += parseInt(match[1]);
				} else {
					for(j = num; j < num + 6; j++) defenders[j] += parseInt(match[1]);
				}
				if( j > last ) last = j;
				if( num < first ) first = num;
			} else if( match = /(\d+) creatures (DEFENDING|ATTACKING) .* - (\d+) tick/.exec(nodes[i].innerHTML) ) {
				var num = match[3];
				if( match[2] == 'ATTACKING' ) {
					for(j = 0; j < num; j++) attackers[j] += parseInt(match[1]);
				} else {
					for(j = 0; j < num; j++) defenders[j] += parseInt(match[1]);
				}
				if( num > last ) last = num;
				first = 0;
			}
		}
		var table = document.createElement('table');
		table.className = 't_little';
		table.cellSpacing = 1;
		var rowT = table.insertRow(table.rows.length);
		var rowA = table.insertRow(table.rows.length);
		var rowD = table.insertRow(table.rows.length);
		var cell;
		rowT.innerHTML = "<td class=\"row1 b\">Tick</td>";
		rowA.innerHTML = "<td class=\"row1 b\">Attackers</td>";
		rowD.innerHTML = "<td class=\"row1 b\">Defenders</td>";
		for( i = first; i < last; i++ ) {
			(cell = rowT.insertCell(rowT.cells.length)).textContent = i; cell.style.textAlign = "center"; cell.style.padding = "0 2px 0 2px";
			(cell = rowA.insertCell(rowA.cells.length)).textContent = attackers[i]; cell.style.textAlign = "center"; cell.style.padding = "0 2px 0 2px";
			(cell = rowD.insertCell(rowD.cells.length)).textContent = defenders[i]; cell.style.textAlign = "center"; cell.style.padding = "0 2px 0 2px";
		}
		node.parentNode.insertBefore(table, node.nextSibling);
	}

//
	// Unallocated land percentage
	//
	var landtable = document.evaluate(".//div[@id='cland']/div[@class='alt2']/table", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	
	var alloc = evoString2Number(landtable.rows[1].cells[1].textContent)+evoString2Number(landtable.rows[2].cells[0].textContent)+evoString2Number(landtable.rows[2].cells[1].textContent);
	var l_min = evoString2Number(landtable.rows[2].cells[1].textContent);
	var l_food = evoString2Number(landtable.rows[1].cells[1].textContent);
	var l_met = evoString2Number(landtable.rows[2].cells[0].textContent);
	var total = alloc+ evoString2Number(landtable.rows[1].cells[0].textContent);
	var metal_per_alloc = Math.round(l_met*100/alloc);
	var mineral_per_alloc = Math.round(l_min*100/alloc);
	var food_per_alloc = Math.round(l_food*100/alloc);
	
	var per = Math.round((total-alloc)*100/total);
	
	var stMet = "<td style=\"background: #1598FD; height: "+Math.round(50-per*0.5)+"px ;width: "+Math.round(metal_per_alloc*0.5)+"px;\"></td>";
	var stMin = "<td style=\"background: #29D900; height: "+Math.round(50-per*0.5)+"px ;width: "+Math.round(mineral_per_alloc*0.5)+"px;\"></td>";
	var stFood = "<td style=\"background: #FD9315; height: "+Math.round(50-per*0.5)+"px ;width: "+Math.round(food_per_alloc*0.5)+"px;\"></td>";
	landtable.rows[0].cells[1].innerHTML = "<center><div style=\"border: 1px solid rgb(201, 201, 201); float: top; width: 50px; height: 50px;\"><table style=\"background: #C9C9C9; height: "+per+"%; width: 50px;\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr style=\"height : "+Math.round(per*0.5)+"px;\"><td></td></tr><tr>"+stMet+stMin+stFood+"</tr></tbody></table></div></center>"



// Matt 75	
	var per = Math.round((total-alloc)*100/total);
	if ( per < 33 ) {
	per = '<font color=red>' +per+ '%</Font>';
	}
	if ( per < 33 ) {
	per = '<font color=lightgreen>' +per66+ '%</Font>';
	} 

	var per66 = Math.round((total-alloc)*100/total);
	if ( per < 69 ) {
	per = '<font color=Yellow>' +per66+ '%</Font>';
	}
	if ( per < 69 ) {
	per = '<font color=yellow>' +per100+ '%</Font>';
	}

	var per100 = Math.round((total-alloc)*100/total);
	if ( per < 100 ) {
	per = '<font color=lightGreen>' +per100+ '%</Font>';
	}

	// How many times you can launch

//	var whatwillitbe = 'You can launch<font color=lightgreen> '+matt+' </font>more times';
//	if ( matt < 0 ) {
//		whatwillitbe = '<font color=red>You can not launch.  You need more food</font>';
//	}
	//
// Matt 75	

	var elm = document.createElement('DIV');
	elm.className = 'separator title';
	elm.innerHTML = 'You currently have '+per+' Unallocated Land'; 
	landtable.parentNode.appendChild(elm);
	
	//
// Matt 75	
	// Fleet table
	//
	var cfleettable = document.evaluate(".//div[@id='ccreat']/div[@class='alt2']/table", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var lfcost = 0;
	for (i = 0; i < cfleettable.rows.length; i++) {
		unit = cfleettable.rows[i].cells[0].innerHTML.toLowerCase();
		if (unit != '') {
			lfcost = lfcost + evoString2Number(cfleettable.rows[i].cells[1].textContent) * ( (units[unit].metal + units[unit].mineral ) /100 );
		}
		if (cfleettable.rows[i].cells.length > 2) {
			unit = cfleettable.rows[i].cells[2].innerHTML.toLowerCase();
			if (unit != '') {
				lfcost = lfcost + evoString2Number(cfleettable.rows[i].cells[3].textContent) * ( (units[unit].metal + units[unit].mineral ) /100 );
			}
		}
	}
	if (GM_getValue('evo_SE',"no") == "yes") lfcost = lfcost * 0.95;
	var f1 = evoString2Number(cfleettable.rows[0].cells[1].textContent);
	var lastline = document.createElement('DIV');
	var cfp = 24*( 800 + l_food * 200 );
	var dif = Math.round((lfcost - cfp) / 4800 + 0.5);
	var matt = Math.round(pFood / lfcost);


	// How many times you can launch

	var whatwillitbe = 'You can launch<font color=lightgreen> '+matt+' </font>more times';
	if ( matt < 0 ) {
		whatwillitbe = '<font color=red>You can not launch.  You need more food</font>';
	}
	//



	var launchratio = 0.000;
	if (lfcost != 0) {
		launchratio = Math.round( (cfp / lfcost) * 100 )/100
	}
	var howmanytimes = 'You can launch all of your creatures<font color=lightgreen> '+launchratio+' </font>times per day';
	if ( launchratio < 1 ) {
		howmanytimes = 'You can only launch all of your creatures<font color=red> '+launchratio+' </font>times per day</font>';
	}


	var conc = 'Your food allocation is over your daily needs by <font color=lightgreen>'+dif+'</Font> land(s).';
	if ( dif < 1 ) {
		conc = '<font color=Cyan>Your food allocation / Launch Cost is perfect' +dif+ '</font>';
	}
	if ( dif > 0 ) {
		conc = '<font color=Orange>You should allocate <font color=Cyan>'+dif+'</font> more food land!</font>';
	}
	if ( dif < 0 ) {
		conc = '<font color=lightgreen>Your food allocation is over your daily needs</Font>';
	}

	lastline.className = 'separator title';
	lastline.innerHTML = 'Food Production / Launch Cost : '+evoNumber2String(Math.round(cfp))+' / ' + evoNumber2String(Math.round(lfcost)) + '<br /> '+howmanytimes+' <br /> ' +whatwillitbe+' !*!<br />' +conc;
	cfleettable.parentNode.appendChild(lastline);




// Matt 75 Start Again
	//
	// Defences
	//
	var staticDefense = document.evaluate(".//div[@id='cdef']/div[@class='alt2']/table", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var attack, defense, nDef, overallDefense = 0, overallAttack = 0;
	
	for( i = 0; i < staticDefense.rows.length; i++ ){
		for( j = 0; j < staticDefense.rows[i].cells.length; j += 2 ){
			defenseType = staticDefense.rows[i].cells[j].textContent.toLowerCase();
			nDef = parseInt(staticDefense.rows[i].cells[j+1].textContent);
			unit = units[defenseType];
			attack = unit.getAttackScore(nDef);
			defense = unit.getDefenseScore(nDef) * defendersBoost;
			staticDefense.rows[i].cells[j+1].title = 'Individual att2/def2 score: ' + evoNumber2String(attack.toFixed(0)) + ' / ' + evoNumber2String(defense.toFixed(0));
			overallAttack += attack;
			overallDefense += defense;
		}
	}
	var thecell = document.createElement('DIV');
	thecell.className = 'separator title';
	thecell.innerHTML = "Total Att&sup2;: " + evoNumber2String(overallAttack.toFixed(0)) + "<br /> Total Def&sup2;: " + evoNumber2String(overallDefense.toFixed(0));
	staticDefense.parentNode.appendChild(thecell);



}

//
// restores the land cost display on the resources page
//
regPageHandler(/^\/rd\/d/i,  evoRnD);
function evoRnD() {
	if (GM_getValue('evo_SE',"no") != "yes"){
		var rndtable = document.evaluate(".//div[@class='alt2 t_little' and preceding-sibling::div[@class='separator title']]", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if(rndtable.snapshotItem(1).innerHTML.indexOf("/rd/display/i11") != -1) GM_setValue('evo_SE',"yes");
	}
	
}

//
// restores the land cost display on the resources page
//
regPageHandler(/^\/resources\/overview/i,  evoResources);
function evoResources() {
	var resourcetable = document.evaluate(".//table[@class='t_little' and preceding-sibling::div[@class='separator title'and child::span[text()='Land']]]", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

	evoLandRatio();


	// Max land that can be allocated
	
	// get current amount of allocated
	// Layout check
	if( resourcetable.rows[0].cells[0].innerHTML == 'Unused Land' ) var z = 1; else var z = 0;
	var land = evoString2Number(resourcetable.rows[1+z].cells[1].textContent) + 
		   evoString2Number(resourcetable.rows[2+z].cells[1].textContent) + 
		   evoString2Number(resourcetable.rows[3+z].cells[1].textContent);

var totcost = 0;
var nbr =0; var qrty=0;

	while (totcost < pMetal) {
	qrty++;
	totcost += ( ( ( land -1 ) * 150) + 1000 + (qrty * 150) );
	if(totcost < pMetal) { nbr++; }
	}
	
	// We need to have unallocated land
	if (z == 1) {
	unallocland = resourcetable.rows[0].cells[1].textContent;
	if (unallocland < nbr) { nbr = unallocland; }
	}else{
	nbr = 0;
	}

	// Add the text
	var newRow = resourcetable.insertRow(resourcetable.rows.length);
	newCell = newRow.insertCell(0);
	newCell.colSpan = '5';
	newCell.className = 'alt1 b';
	newCell.textContent = (nbr == 0) ? 'You cannot currently allocate any land' :'You can currently allocate a maximum of '+nbr+' land';
	newCell.style.textAlign ='center';
	
	

	if( resourcetable ) {
		// do we have the graphic?
		if( resourcetable.rows[0].cells[0].innerHTML == 'Unused Land' ) return;

		// onclick function....
		showAllocCost = function(e) {
			var parent = this.parentNode;
			this.style.cursor = 'auto';
			this.style.textDecoration = "none";
			if( parent.nextSibling != null ) return;
			parent = parent.parentNode;
			var elm = document.createElement('IMG');
			elm.src = 'http://ev5.neondragon.net/graphs.land/'+land+'?width=799';
			parent.appendChild(elm);
			elm = document.createElement('BR');
			parent.appendChild(elm);
			elm = document.createElement('SPAN');
			elm.className = 't_little';
			elm.innerHTML = '<SPAN class="red">Red</SPAN> values are the costs in metal to initiate the number of land on the x axis.';
			parent.appendChild(elm);
		};

		var elm = document.createElement('DIV');
		var span = document.createElement('SPAN');
		elm.className = "title";
		span.innerHTML = 'Land Initiation Cost';
		span.style.textDecoration = "underline";
		span.style.cursor = "pointer";
		span.addEventListener('click',showAllocCost, false);
		elm.appendChild(span);
		resourcetable.parentNode.appendChild(elm);
	}
	function evoLandRatio() {
		var fields = resourcetable.rows.length;
		var food = Number(evoString2Number(resourcetable.rows[fields - 1].cells[1].textContent));
		var mineral = Number(evoString2Number(resourcetable.rows[fields - 2].cells[1].textContent));
		var metal = Number(evoString2Number(resourcetable.rows[fields - 3].cells[1].textContent));
		if( isNaN(food) || isNaN(mineral) || isNaN(metal) ) return;
		var gcd = gcf(gcf(metal,mineral),food);
		metal = metal / gcd;
		mineral = mineral / gcd;
		food = food / gcd;
		var row = resourcetable.insertRow(fields);
		row.className = 'row2';
		node = row.insertCell(0);
		node.innerHTML = 'Ratio';
		node.className = 'alt1 b';
		node.style.textAlign = 'right';
		node = row.insertCell(1);
		node.innerHTML = metal + ':' + mineral + ':' + food;
		node.style.textAlign = 'center';
		// give approx. ratio with: 1 <= food <= 2
		if( food > 2 && food < metal && food < mineral ) {
			gcd = Math.pow(2, Math.floor(Math.log(food) / Math.log(2))) // divider
			gcd = food / (food = Math.round(food / gcd)); // refine the divider
			metal = Math.round(metal / gcd);
			mineral = Math.round(mineral / gcd);
			gcd = gcf(gcf(metal,mineral),food);
			food /= gcd;
			mineral /= gcd;
			metal /= gcd;
			node = row.insertCell(2);
			node.innerHTML = '(~' + metal + ':' + mineral + ':' + food + ')';
			node.style.textAlign = 'center';
			node = row.insertCell(3);
			node.colSpan = 2;
		} else {
			node = row.insertCell(2);
			node.colSpan = 3;
		}
	}
}

//
// Alliances page
//
regPageHandler(/^\/alliances$/i,  evoAlliances);
function evoAlliances() {
	var row;
	var rows = document.evaluate(".//table/tbody[tr/td[text()='Alliance Name']]/tr[count(td)=5]", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 1; row = rows.snapshotItem(i); i++) {
		row.cells[3].innerHTML = evoNumber2String(row.cells[3].textContent) + '<br /><font color="dodgerblue">' + evoNumber2String(Math.ceil(evoString2Number(row.cells[3].textContent)/evoString2Number(row.cells[2].textContent))) + "</font>";
		row.cells[3].style.textAlign = "right";
		row.cells[3].style.padding = "0 2px 0 2px";
	}
}

//
// Alliance members
//
regPageHandler(/^\/alliances\/(.*)\/members/i, evoAllianceMembers);
function evoAllianceMembers() {
	var smin = Math.ceil(pScore * minAttack);
	var tmax = Math.floor(pScore / minAttack);
	
	var memberTables = document.evaluate(".//div[@id='alliancememberlist']/div/table", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	// if we have rank edit powers.. we need another snapshot
	if (memberTables.snapshotItem(0) == null) var memberTables = document.evaluate(".//div[@id='alliancememberlist']/form/div/table", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var nbr = 0, snbr = 0, totscore = 0, stotscore = 0;

	var primeTag = unescape( window.location.href.match(/\/alliances\/(.*)\/members$/)[1] ); // get the alliance's tag

	for( var i = 0; memberTable = memberTables.snapshotItem(i); i++ ) {
		// Add some formatting
		memberTable.style.width = '100%';
		memberTable.rows[0].cells[0].style.width = '500px';
		memberTable.rows[0].cells[3].style.textAlign = 'right';
		memberTable.rows[0].style.fontWeight = 'right';
		memberTable.rows[0].style.fontWeight = 'bold';

		for (var j = 1; j < memberTable.rows.length; j++) {
			score = memberTable.rows[j].cells[2];		
			target = evoString2Number(score.textContent);
			if( target < smin ) {
				score.style.color = 'chocolate';
			}else{
				if( target > tmax ) score.style.color ='dodgerblue';
				else score.style.color = 'lime';
				thisTag = ( memberTable.rows[j].cells[0].textContent.match(/\[(.*)\]/) != null ) ? memberTable.rows[j].cells[0].textContent.match(/\[(.*)\]/)[1] : '';
				if ( thisTag == primeTag ) {
					totscore += target;
					nbr += 1;
				}else{
					stotscore += target;
					snbr += 1;
				} 
			}
			memberTable.rows[j].cells[2].textContent = evoNumber2String(memberTable.rows[j].cells[2].textContent);
			memberTable.rows[j].cells[3].style.textAlign = 'right';
		}
	}
	// Show the info at the top
	var div = document.evaluate(".//div[@id='alliancememberlist']", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

	div.innerHTML = '<div class="separator title">You currently have <span style="color: lime">' + nbr + '</span> Primary targets in this alliance (' + evoNumber2String(totscore) + ')</div><div class="separator title">You currently have <span style="color: dodgerblue">' + snbr + '</span> Secondary targets in this alliance (' + evoNumber2String(stotscore) + ')</div><div class="separator title">Total of ' + evoNumber2String(nbr + snbr) + ' Targets (' + evoNumber2String(totscore + stotscore) + ')</div>' + div.innerHTML;

	// quick buddy
	// This feature makes a direct request to the server which is deemed illegal
	// neon has however kindly accepted to allow it only for this particular feature
	// since it puts less strain on the server than doing it the regular way
	// AGAIN, THIS IS AN EXCEPTION. DON't USE XmlHttpRequest!!! IT IS ILLEGAL!
	function onBuddy(e) {
		var postData;
		e.preventDefault();
		try {
			postData = e.target.href.match(/\/buddies\/add\?(.*)$/)[1];
		} catch ( e ) {
			return;
		}
		if( count++ ) {
			alert("Wow... take it easy! One buddy at a time, will you?");
			--count;
			return;
		}
		e.target.textContent = "Please wait...";
		e.target.href = '#';
		GM_xmlhttpRequest({
			method: 'POST',
			url: 'http://'+document.location.hostname+'/buddies/add',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: postData,
			onreadystatechange: function(responseDetails) {
				if( responseDetails.readyState == 4 && responseDetails.status == 200 ) {
					e.target.parentNode.removeChild(e.target);
					--count;
				}
			},
			onerror: function(responseDetails) {
				e.target.href = "/buddies/add?" + postData;
				e.target.textContent = ' Add to buddies';
				--count;
			}
		});
	}

	var i, match;
	var re = /javascript:return continentBox\(\d+,(\d+),(\d+),(\d+),(\d+),'(\w)','([^']+)','([^']+)','([^']+)','([^']+)','([^']*)',\s*'([^']*)'/;
	var users = document.evaluate(".//a[@class='cleanlink continfo']", contents, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


	for(i = 0; node = users.snapshotItem(i); i++) {
		if( match = re.exec(node.getAttribute('onclick')) ) {
			if( match[11] == '' ) {
				var br, td = node.parentNode.parentNode;
				var a = document.createElement('a');
				a.href = '/buddies/add?x=' + match[2] + '&y=' + match[3] + '&z=' + match[4] + '&c=' + match[5] + '&nickname=' + encodeURIComponent(match[6]) + '&label=' + encodeURIComponent(node.textContent.match(/\[([^\]]+)\]/)[1]);
				a.appendChild(document.createTextNode(' Add to buddies'));
				a.addEventListener('click', onBuddy, false);
				if(! (br = node.parentNode.nextSibling) ) td.appendChild(document.createElement('br'));
				else br.nextSibling.textContent += ' ';
				td.appendChild(a);
			}
		}
	}
}

//
// Add some color to the scores on the universe pages
//
regPageHandler(/^\/(universe\/(home|search)|(\d+(,\d+)*))$/i,  evoUniverse);
function evoUniverse() {
	var smin = Math.ceil(pScore * minAttack);
	var tmax = Math.floor(pScore / minAttack);
	
	

	var table = document.getElementById('cont_list');
	if( table != null ) {
	table.rows[0].insertCell(4);
	table.rows[0].cells[4].textContent = 'Last Seen';
	// New heading
		// let's add some color and look for potential targets ;)
		for(var i=2; i < table.rows.length; i++) {
			if( table.rows[i].cells.length < 4 ) continue;

			var cell1 = table.rows[i].cells[1];
			var cell3 = table.rows[i].cells[3];
			
			var matchr = /Last Seen: (?:(\d+) days )?(\d+) hours ago/.exec(cell1.getElementsByTagName("a")[0].getAttribute('onclick'));
				table.rows[i].insertCell(4);
				table.rows[i].cells[4].style.textAlign="Right";
				if( matchr ) {
					// player is not online	
					table.rows[i].cells[4].textContent = matchr[0].split(":")[1];
				} else {
					table.rows[i].cells[4].innerHTML = '<span style="color:LightGreen">Online</a>';
				}
			
			
			var target = evoString2Number(cell3.innerHTML);

			if( target < smin ) cell3.style.color = 'chocolate';
			else if( target > tmax ) cell3.style.color ='dodgerblue';
			else cell3.style.color = 'lime';
		}
		var git = document.evaluate(".//table[tbody/tr[1]/td[1][text() = 'Key']]", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if( git != null ) {
			var d = git.insertRow(4);
			d.className = "lightblue_bg_row2";
			d.innerHTML = '<td>Text colours:</td><td colspan="3" align="center"><font color="white"><strong>White</strong></font> name of continent shows that this person is online<br /><font color="silver"><strong>Silver</strong></font> name of continent shows that this person is offline<br /><font color="dimgray"><strong>Dim gray</strong></font> name shows that person is offline from more than week</td>';
			var c = git.insertRow(5);
			c.className = "lightblue_bg_row1";
			c.innerHTML = '<td>Score colours:</td><td colspan="3" align="center">Player with this <font color="chocolate">score</font> can attack you, but you can\'t<br />Player with this <font color="lime">score</font> can attack you, and you can also attack him<br />Player with this <font color="dodgerblue">score</font> can\'t attack you, but you can :D</td>';
		}
	}
}

//
// Evaluation of att/def on scans
//
regPageHandler(/^\/scans/i, evoScans );
regPageHandler(/^\/scans/i, evoAmpRatio );

function evoAmpRatio() {

var scantable = document.evaluate(".//table[@class='t_little' and preceding-sibling::div[@class='separator title'and child::span[text()='Order Scans']]]", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

var land = document.getElementById('panelinfo').textContent.match(/Land:\s([,?\d]+)/);

var curAmps = evoString2Number(scantable.rows[3].cells[2].textContent);
var curLand = evoString2Number(land[1]);
var ratio = Math.round((curAmps / curLand)*1000)/1000;
scantable.rows[3].cells[2].innerHTML = scantable.rows[3].cells[2].innerHTML + '<br /><span style="text-size: 0.8em;color: greenyellow">'+ratio+'</span>';
}

function evoScans() {
	var scan = document.evaluate(".//div[@class='helpmessage']/strong", contents, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (!scan) return;
	var table = document.evaluate("./following-sibling::table", scan, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	scan = scan.textContent;
	if (scan.indexOf("Sector Scan") != -1) {
		var defenseData = new Array(
			new Array(7, 'fort'),
			new Array(8, 'satellite mark 2'),
			new Array(9, 'nanowire wall')
		);
		var attack, defense, overallAttack = 0, overallDefense = 0;
		var row, cells, nDef, unit, newCell;
		var landAmt = 0, nLands = 0, unused = 0;
		var rows = table.rows;
		for (var i = 0; i < defenseData.length; i++) {
			cells = rows[defenseData[i][0]].cells;
			if( cells.length == 4) {
				// land defense
				nLands = parseInt(cells[1].innerHTML);
				if (!isNaN(nLands)) landAmt += nLands;
				// static defenses
				nDef = parseInt(cells[3].innerHTML);
				if (isNaN(nDef)) continue;
				unit = units[defenseData[i][1]];
				attack = unit.getAttackScore(nDef);
				defense = unit.getDefenseScore(nDef) * defendersBoost;
				overallAttack += attack;
				overallDefense += defense;
				cells[3].title = 'Individual att2/def2 score: ' + evoNumber2String(attack.toFixed(0)) + ' / ' + evoNumber2String(defense.toFixed(0));
			}
		}

	    // formatting score number / add attacker's score range
		 // formatting score number / add attacker's score range
		var resPics = new Array ('metal.png','mineral.png','food.png');
		for (var i = 2; i < 5; i++) {
			rows[i].cells[2].innerHTML = '<img src="http://images.neondragon.net/ev5/resources/' + resPics[i-2] + '" border="0" /> ' + rows[i].cells[2].innerHTML;
			rows[i].cells[3].innerHTML = '<font color="lightblue">' + evoNumber2String(parseInt(rows[i].cells[3].innerHTML)) + "</font>";
		}
		resPics = null;
	    var score = parseInt(rows[2].cells[1].innerHTML);
	    rows[2].cells[1].innerHTML = '<font color="greenyellow">' + evoNumber2String(score) + "</font>";
	    rows[3].cells[0].innerHTML = "Max. Attacker Score";
	    rows[3].cells[0].className = "alt1 b";
	    rows[3].cells[1].innerHTML = '<font color="dodgerblue">' + evoNumber2String(Math.ceil(score/minAttack)) + "</font>";
	    rows[4].cells[0].innerHTML = "Min. Attacker Score";
	    rows[4].cells[0].className = "alt1 b";
	    rows[4].cells[1].innerHTML = '<font color="chocolate">' + evoNumber2String(Math.ceil(score*minAttack)) + "</font>";
	    unused = parseInt(rows[6].cells[1].innerHTML);
		row = table.insertRow(10);
		row.title = "This does NOT include the creature stats";
		newCell = row.insertCell(0);
		newCell.className = "alt1 b";
		newCell.innerHTML = 'Land ratio/def&sup2;<font color="greenyellow"><sup>*</sup></font>';
		newCell = row.insertCell(1);
		newCell.innerHTML = '<font color="gold">' + evoNumber2String((landAmt/(landAmt+unused)*100).toFixed(2)) + "%</font> / " + 
				    '<font color="tomato">' + evoNumber2String(((landAmt+unused)*(landDefense*landDefense)*defenseMultiplier).toFixed(0)) + "</font>";
		newCell = row.insertCell(2);
		newCell.className = "alt1 b";
		newCell.innerHTML = 'Overall att&sup2;/def&sup2;<font color="greenyellow"><sup>*</sup></font>';
		newCell = row.insertCell(3);
		newCell.innerHTML = '<font color="coral">' + evoNumber2String(overallAttack.toFixed(0)) + "</font> / " + 
				    '<font color="palegreen">' + evoNumber2String(overallDefense.toFixed(0)) + "</font>";

	    for( var i=6; i<=9; i++) {
	        if(rows[i].cells[1]) rows[i].cells[1].innerHTML = evoNumber2String(parseInt(rows[i].cells[1].innerHTML));
	        if(rows[i].cells[3]) rows[i].cells[3].innerHTML = evoNumber2String(parseInt(rows[i].cells[3].innerHTML));
	    }
	} else if (scan.indexOf("Creature Scan") != -1) {
		var rows = table.rows;
		var row, cells, cell, unit, quantity, boost;
		var attack, defense, defendersDefense, overallAttack = 0, overallDefenseAttacking = 0, overallDefenseDefending = 0;
		var foodCost = 0;
		for (var i = 2; i < rows.length; i++) {
			row = rows[i];
			cells = row.cells;
			for (var j = 0; j < cells.length; j += 2) {
				unit = units[cells[j].textContent.toLowerCase()];
				cell = cells[j + 1];
				quantity = parseInt(cell.innerHTML);
				boost = 1 + unit.getMaxBoost();
				attack = unit.getAttackScore(quantity) * boost * boost;
				defense = unit.getDefenseScore(quantity) * boost * boost;
				defendersDefense = defense * defendersBoost;
				foodCost += unit.getFoodCost(quantity);
				overallAttack += attack;
				overallDefenseAttacking += defense;
				overallDefenseDefending += defendersDefense;
				cell.title = "Individual att2/def2 with max. boost: " + evoNumber2String(attack.toFixed(0)) + " / " + 
					     evoNumber2String(defense.toFixed(0)) + " (" + evoNumber2String(defendersDefense.toFixed(0)) + ")";
			}
		}
		var newRow = table.insertRow(rows.length);
		newRow.title = "Total att2 & def2 with max. boost";
		var newCell = newRow.insertCell(0);
		newCell.className = "alt1 b";
		newCell.innerHTML = 'Overall att&sup2;/def&sup2;<font color="greenyellow"><sup>*</sup></font>';
		newCell = newRow.insertCell(1);
		newCell.innerHTML = '<font color="coral">' + evoNumber2String(overallAttack.toFixed(0)) + "</font> / " + 
				    '<font color="palegreen">' + evoNumber2String(overallDefenseAttacking.toFixed(0)) + "</font> (" + 
				    '<font color="turquoise">' + evoNumber2String(overallDefenseDefending.toFixed(0)) + "</font> )"; // modified by Toby-Jug
		newCell.colSpan = 5;
		newRow = table.insertRow(rows.length);
		newCell = newRow.insertCell(0);
		newCell.className = "alt1 b";
		newCell.innerHTML = "Launch cost";
		newCell = newRow.insertCell(1);
		newCell.innerHTML = '<font color="pink">' + evoNumber2String(foodCost.toFixed(0)) + "</font>"; // modified by Toby-Jug
		newCell.colSpan = 5;
	}
}

//
// Fleets page
//
regPageHandler(/^\/fleets/i,  evoFleets );
function evoFleets() {
	function updateFleetsAddCell(row, cellIndex, className, scores) {
		var cell = row.insertCell(cellIndex);
		cell.className = className;
		cell.style.textAlign = 'center';
		cell.colSpan = 2;
		if (cellIndex > 0) {
			cell.style.fontSize = "12px";
			cell.innerHTML = evoNumber2String(scores[1]);
			cell.title = 'Unboosted: ' + evoNumber2String(scores[0]);
		} else {
			cell.innerHTML = scores; // cell title actually
		}
	}
	function updateFleetsAddRow(fleetsTable, isAttack) {
		var row = fleetsTable.insertRow(fleetsTable.rows.length - 2);
		updateFleetsAddCell(row, 0, "alt1 b", (isAttack ? "Attack" : "Defense") + 
				    '<br /><span style="font-size:smaller; font-weight: normal">(estimation with max boost)</span>');
		updateFleetsAddCell(row, 1, "red_bg", getFleetScore(1, fleetsTable, isAttack));
		updateFleetsAddCell(row, 2, "yellow_bg", getFleetScore(2, fleetsTable, isAttack));
		updateFleetsAddCell(row, 3, "green_bg", getFleetScore(3, fleetsTable, isAttack));
	}
	function getFleetScore(fleetNo, table, isAttack) {
		var rows, row;
		var unit, quantity, total = 0;
		var i, j, baseScore, boost, noBoostScore = 0, maxBoostScore = 0;
		rows = document.evaluate(".//tr[td[1]/a]", table, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for( i = 0; row = rows.snapshotItem(i); i++ ) {
			if( row.cells[0].rowSpan > 1 ) break;
			unit = units[row.cells[0].textContent.toLowerCase()];
			quantity = Number(row.cells[fleetNo * 2 + 1].textContent);
			total += quantity;
			baseScore = isAttack ? unit.getAttackScore(quantity) : unit.getDefenseScore(quantity);
			noBoostScore += baseScore;
			boost = unit.getBoost() + 1;
			maxBoostScore += baseScore * boost * boost;
		}
		row.cells[0].rowSpan = 12;
		var cell = sumRow.cells[1 + fleetNo];
		cell.textContent = total;
		cell.style.textAlign = 'center';
		cell.style.fontSize = '12px';
		return new Array(Math.round(noBoostScore), Math.round(maxBoostScore));
	}
	
	var fleetsTable = null;
	if( dEvo ) fleetsTable = document.evaluate(".//table[preceding-sibling::h1[@class='title' and text()='Fleet Organisation']][1]", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	else fleetsTable = document.evaluate(".//table[preceding-sibling::h1[@class='title' and text()='Fleet Organisation']][1]", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	
	// Balancing act
	// This is a huge hack... but oh well, it works :P

	var FleetOne = 0; var FleetTwo = 0; var FleetThree= 0;
	
	for (q=1; q <= fleetsTable.rows.length-13; q++) {
	FleetOne += Number(fleetsTable.rows[q].cells[3].textContent);
	}
	
	for (q=1; q <= fleetsTable.rows.length-13; q++) {
	FleetTwo += Number(fleetsTable.rows[q].cells[5].textContent);
	}
	
	for (q=1; q <= fleetsTable.rows.length-13; q++) {
	FleetThree += Number(fleetsTable.rows[q].cells[7].textContent);
	}
	
	if (FleetOne > FleetTwo) {
		if (FleetOne > FleetThree) maxSize = FleetOne;
		else maxSize = FleetThree;
	}
	else {
		if (FleetTwo > FleetThree) maxSize = FleetTwo;
		else maxSize = FleetThree;
	}
	
	

	
	// Add the function to add monkeys to the correct box when clicking
	fleetsTable = document.evaluate(".//table[preceding-sibling::h1[@class='title' and text()='Fleet Organisation']][1]", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var theRow = 0;
	for( var i = 1; i < (fleetsTable.rows.length); i++ ) {
		if (fleetsTable.rows[i].cells.length != 9) continue;
		if (fleetsTable.rows[i].cells[0].textContent.toLowerCase() == "monkey") theRow = i;
	}	
	var MonkeyClick = function(e){
    	fleetsTable.rows[theRow].cells[2].getElementsByTagName('INPUT')[0].value = this.textContent.split(" More")[0];
	};		
	
	if (FleetOne == maxSize) { cellToGo = 3; }
	else if (FleetTwo == maxSize) { cellToGo = 5; }
	else if (FleetThree == maxSize) { cellToGo = 7; }
	rawr = fleetsTable.insertRow(fleetsTable.rows.length-12);
	rawr.className = "alt1 b";
	rawr.style.textAlign = "center";
	
	heh = rawr.insertCell(0);
	heh.textContent = "Difference";
	heh.style.textAlign = "left";
	heh.addEventListener("click", MonkeyClick, false);
	
	heh = rawr.insertCell(1);
	heh.className = "alt2 row2";
	heh.colSpan = 2;
	heh.addEventListener("click", MonkeyClick, false);
		
	heh = rawr.insertCell(2);
	heh.className = "red_bg";
	heh.colSpan = 2;
	heh.textContent = maxSize-FleetOne + ' More';
	heh.addEventListener("click", MonkeyClick, false);
		
	heh = rawr.insertCell(3);
	heh.className = "yellow_bg";
	heh.colSpan = 2;
	heh.textContent = maxSize-FleetTwo + ' More';
	heh.addEventListener("click", MonkeyClick, false);
		
	heh = rawr.insertCell(4);
	heh.className = "green_bg";
	heh.colSpan = 2;
	heh.textContent = maxSize-FleetThree + ' More';
	heh.addEventListener("click", MonkeyClick, false);
		
	// End the hack 
	
	// How many times can we launch?
	for (z=1; z <= 3; z++) {	
	var LaunchCell = fleetsTable.rows[fleetsTable.rows.length -2].cells[z];
	var LaunchCost = evoString2Number(fleetsTable.rows[fleetsTable.rows.length -2].cells[z].textContent);
		if ((LaunchCost * 5) < pFood) { cellCol = "lightgreen"; }
		else if (LaunchCost < pFood ) { cellCol = "orange"; }
		else { cellCol = "red"; }
	LaunchCell.innerHTML = '<span style="color:' + cellCol + '">' + LaunchCell.innerHTML + '</span>';
	}

	//add row for fleet counts
	var sumRow = document.evaluate(".//tr[td[position()=1 and text()='Move to']]", fleetsTable, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	sumRow = fleetsTable.insertRow(sumRow.rowIndex);
	sumRow.innerHTML = '<td class="alt1 b">Total</td><td class="alt2" colspan="2"></td><td class="red_bg" colspan="2"></td><td class="yellow_bg" colspan="2"></td><td class="green_bg" colspan="2"></td>';
	updateFleetsAddRow(fleetsTable, true);
	updateFleetsAddRow(fleetsTable, false);
	

// Add the function to add numbers to the correct box when clicking
	var AddByClick = function(e) {
                 	fleetsTable.rows[this.parentNode.rowIndex].cells[this.cellIndex+1].getElementsByTagName('INPUT')[0].value = this.textContent;
	        };	
	for( var i = 1; i < (fleetsTable.rows.length); i++ ) {
		for( var j = 1; j <= 7; j+=2 ) {
		if (fleetsTable.rows[i].cells.length != 9) continue;
		row = fleetsTable.rows[i].cells[j];
		// Add the listener to the cell
		row.addEventListener("click", AddByClick, false); 
		}
	}

}

//
// News page
//
regPageHandler( /^\/news/i, evoNews );
function evoNews() {
	function addCell( row, cellIndex, attributes, html ) {
		var cell = row.insertCell(cellIndex);
		if( attributes ) for( var i = 0; i < attributes.length; i++) cell.setAttribute(attributes[i][0], attributes[i][1] );
		if( html ) cell.innerHTML = html;
		return cell;
	}

	var RegExpTerm = (".//table[@class='t_little']");
	var battleReports = document.evaluate(RegExpTerm, contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var battleReport;
	var rows, html, attDefRow, isAttacker, att, myAtt, def, myDef, idx, idx2,  unit, quantity, boost, landType, land, myLand, summaryRow, cell, j;
	var ruler = document.evaluate("//p[@id='openpanel']/strong[1]/text()", document, null, XPathResult.STRING_TYPE, null).stringValue;
	var attPrefixRegex = /.*att<sup>2<\/sup>:\s*/;
	var attSuffixRegex = /<br.*/;
	var defPrefixRegex = /.*def<sup>2<\/sup>:\s*/;

	for( var i = 0; battleReport = battleReports.snapshotItem(i); i++ ) {
		rows = battleReport.rows;
		attDefRow = rows[0];
		isAttacker = attDefRow.cells[1].textContent.toLowerCase().indexOf(ruler.toLowerCase()) != -1;
		idx = isAttacker ? 1 : 2;
		att = attDefRow.cells[idx].innerHTML.replace(attPrefixRegex, "").replace(attSuffixRegex, "");
		att = parseInt(att ? att : 0);
		def = attDefRow.cells[idx].innerHTML.replace(defPrefixRegex, "");
		def = parseInt(def ? def : 0);
		myAtt = 0;
		myDef = 0;
		idx2 = isAttacker ? 1 : 6;

		for (j = 3; j < rows.length; j++) {
			unit = units[rows[j].cells[0].innerHTML.toLowerCase()];
			if (!unit) break;
			idx = rows[j].cells[idx2].innerHTML.indexOf("<br>");
			quantity = parseInt(rows[j].cells[idx2].innerHTML.substring(idx + 4));
			boost = 1+unit.getBoost();
			myAtt += unit.getAttackScore(quantity) * boost * boost;
			myDef += unit.getDefenseScore(quantity)  * boost * boost;
		}
		summaryRow = battleReport.insertRow(rows.length);
		cell = addCell(summaryRow, 0, new Array(new Array("colSpan", "11"), new Array("height", "3")));

		summaryRow = battleReport.insertRow(rows.length);
		cell = addCell(summaryRow, 0, new Array(new Array("class", "alt1 b")), "Summary");

		html = "Att: " + evoNumber2String(myAtt.toFixed(0)) + " / <b>" + evoNumber2String(att) + "</b> (" + (att != 0 ? parseInt(100 * myAtt / att) : 0) + "%)<br/>" + 
		       "Def: " + evoNumber2String(myDef.toFixed(0)) + " / <b>" + evoNumber2String(def) + "</b> (" + (def != 0 ? parseInt(100 * myDef / def) : 0) + "%)";
		if (isAttacker) {
			cell = addCell(summaryRow, 1, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "2")), html);
			html = "";
			for (; j < rows.length - 2; j++) {
				if (rows[j].cells[0].innerHTML.indexOf("Land Capture") != -1) {
					j++;
					break;
				}
			}
			for (; j < rows.length - 2; j++) {
				landType = rows[j].cells[0].innerHTML;
				land = rows[j].cells[2].firstChild.innerHTML;
				myLand = rows[j].cells[2].innerHTML.replace(/.*<br>/, "");
				idx = landType.length + (11 - landType.length) * 6;
				landType = (landType + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;").substring(0, idx);
				html += landType + ": " + myLand + " / <b>" + land + "</b> (" + parseInt(100 * myLand / land) + "%)<br/>";
			}
			cell = addCell(summaryRow, 2, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "3")), html);
			cell = addCell(summaryRow, 3, new Array(new Array("class", "green_bg_row2"), new Array("colSpan", "5")));
		} else {
			cell = addCell(summaryRow, 1, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "5")));
			cell = addCell(summaryRow, 2, new Array(new Array("class", "green_bg_row2"), new Array("colSpan", "5")), html);
		}

        	// calcul land loss ratio
		for( j=rows.length-3;j>rows.length-8; j--) {
			if (rows[j].cells[0].innerHTML.indexOf("Land Capture") != -1) {
			j++;
			for(; j < rows.length -2; j++) {
				landBefo = parseInt(rows[j].cells[4].innerHTML);
				landLoss = parseInt(rows[j].cells[6].innerHTML);
				rows[j].cells[6].className=rows[j].cells[6].className.substring(0,13)+" red";
				rows[j].cells[6].innerHTML = "<B>"+rows[j].cells[6].innerHTML+"</B>"+(isAttacker?"<br />":"&nbsp;")+"("+(100*landLoss/landBefo).toFixed(2)+"%)";
			}
			break;
		}
	}
		//
		// losses evaluation
		//
		var total = new Array(), losses = new Array();
		total[0] = total[1] = losses[0] = losses[1] = 0;
		function updateLosses(unit, cells, idx, isAtt) {
            var a = cells[idx].firstChild;
            if(! a ) return; // no figures in the BR for defenses on the attacker's side
			a = Number(a.textContent);
			var l = Number(cells[idx+1].firstChild.textContent);
			if( a == 0 ) return;
			cells[idx+1].title = Math.round(100*l/a) + '% (' + evoNumber2String(Math.abs(l) * (unit.metal + unit.mineral)) + ')';
			// take captures into account for the global stats
			total[isAtt] += (a + Number(cells[idx+3].firstChild.textContent)) * (unit.metal + unit.mineral);
			losses[isAtt] += (l + Number(cells[idx+2].firstChild.textContent)) * (unit.metal + unit.mineral);
		}

		for (j = 3; j < rows.length; j++) {
			unit = rows[j].cells[0].innerHTML.toLowerCase();
			if (unit == '') break;
			unit = units[unit];
			if (!unit) continue; // unknown unit?
			updateLosses(unit, rows[j].cells, 1, 0);
			updateLosses(unit, rows[j].cells, 6, 1);
		}
		battleReport.insertRow(j+2).innerHTML = '<TD class="row1 b"></TD><TD class="red_bg_row1 b">' + evoNumber2String(total[0]) + 
							'</TD><TD class="red_bg_row1 b red" colspan="4">' + evoNumber2String(losses[0]) + 
							' (' + (losses[0]==0?0:Math.round(100*losses[0]/total[0])) + '%)</TD>' + 
							'<TD class="green_bg_row1 b">' + evoNumber2String(total[1]) + 
							'</TD><TD class="green_bg_row1 b red" colspan="4">' + i
							evoNumber2String(losses[1]) + ' (' + (losses[1]==0?0:Math.round(100*losses[1]/total[1])) + '%)</TD>';
	}
}

//
// Rankings page
//
regPageHandler(/^\/rankings\/continent$/i, evoContRankings);

function evoContRankings() {
	var smin = Math.ceil(pScore * minAttack);
	var tmax = Math.floor(pScore / minAttack);
	var rankTable = document.evaluate(".//table[@class='t_little grey_bg']", contents, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	for (var j = 1; j < rankTable.rows.length; j++) {
		if (rankTable.rows[j].cells.length != 4) continue;
		score = rankTable.rows[j].cells[3];		
		target = evoString2Number(score.textContent);
		if( target < smin ) score.style.color = 'chocolate';
		else if( target > tmax ) score.style.color ='dodgerblue';
		else score.style.color = 'lime';
	}
}

//
// Quick link to alliance memberlist
//
regPageHandler(null, evoAllianceMemList);
function evoAllianceMemList() {
	var players = document.evaluate(".//span[a[@class='cleanlink continfo']]", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	if (players != null ) {
		for (var i = 0; node = players.snapshotItem(i); i++) {
		
			// Do the planet link
			var newLink = /(.*)(\((\d+,\d+,\d+):\w\))(.*)/.exec(node.innerHTML);
									
			if (newLink != null) {
				node.innerHTML = '<a class="exp cleanlink continfo" href="http://ev5.neondragon.net/' + newLink[3] + '">' + newLink[2] + '</a>' + newLink[1] + newLink[4];
			}	
			
		}
	}
}


//
// Notepad, for evo!
//
regPageHandler(null, evoNotepad);

function evoNotepad() {
	function toggleNotepad() {
		var np = document.getElementById("hide_notepad");
		if (np.style.visibility == 'hidden') np.style.visibility = 'visible';
		else np.style.visibility = 'hidden';
	}
	
	function saveNotepad() {
		GM_setValue('notepad', this.value);
	}
	
	function clearNotepad() {
		var np = this.nextSibling;
		if (confirm('Clear Scratch Pad?')) {
			np.value = '';
			GM_setValue('notepad', '');
		}
	}
	
	var helpMenu = document.evaluate(".//a[@id='openhelppanel']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var nImg = document.createElement('IMG');
	nImg.src = "http://img91.imageshack.us/img91/3329/notepadpi6.png"
	nImg.style.marginLeft = '10px';
	nImg.style.cursor = 'pointer';
	
	nImg.addEventListener('click', toggleNotepad, false);
	
	helpMenu.parentNode.insertBefore(nImg, helpMenu.nextSibling);

	var nDiv = document.createElement('DIV');
	nDiv.id = 'hide_notepad';
	nDiv.style.width = '177px';
	nDiv.style.height = '580px';
	nDiv.style.position = 'absolute';
	nDiv.style.visibility = 'hidden';
	nDiv.style.top = '30px';
	nDiv.style.left = '820px';

	
	var hDiv = document.createElement('DIV');
	hDiv.style.textAlign = 'left';
	hDiv.style.fontSize = '12px';
	hDiv.style.fontFamily = 'Verdana';
	hDiv.style.fontWeight = 'bold';
	hDiv.style.padding = '2px 0px 2px 10px';
	hDiv.style.backgroundColor = 'limegreen';
	hDiv.style.color = 'white';
	hDiv.style.cursor = 'pointer';
	hDiv.innerHTML = 'Scratch Pad';
	
	hDiv.addEventListener('click', clearNotepad, false);
	
	nDiv.appendChild(hDiv);

	var ele = document.createElement('TEXTAREA');
	ele.style.backgroundColor = 'pink';
	ele.style.fontSize = '10px';
	ele.style.fontFamily = 'Verdana';
	ele.style.color = 'black';
	ele.cols = 29;
	ele.rows = 10;
	ele.id = 'notepad';
	ele.wrap = 'virtual';
	ele.value = GM_getValue('notepad', '');

	ele.addEventListener('blur', saveNotepad, false);

	nDiv.appendChild(ele);

	var tb = document.getElementById("userinfocontents");

	tb.appendChild(nDiv);
}

//
// ***************************************************************************
// ** CONFIG
// ***************************************************************************
//

GM_registerMenuCommand( "Configure boosts...", evoConfigBoosts, null, null, 'b' );
function evoConfigBoosts() {
	var n;
	if( (n = prompt("Boost for Natural Creatures? (e.g. 39.46625)", boosts[UT_NATURAL]*100)) != null && !isNaN(n = Number(n)) )
		GM_setValue('boostNat', String(n/100));
	if( (n = prompt("Boost for Archeoligocal Creatures? (e.g. 33.126875)", boosts[UT_ENG]*100)) != null && !isNaN(n = Number(n)) )
		GM_setValue('boostEng', String(n/100));
	alert("Please reload the page for the changes to take effect.");
}

//
// ***************************************************************************
// ** MAIN
// ***************************************************************************
//
(function () {
	var totalPlayers = null;
	var match;
	var node;
	var panel;

	var profiler = Date.now();

	// Initialization
	// -----------------------------------------------------------------------
	// contents node
	contents = document.getElementById("content");

	// get out of the bloody forums message editor
	if( contents == null ) return;

	// initialize the units table
	evoUnitsInitialize();

	// grab player's available resources
	panel = document.getElementById("openpanel");
	if( panel != null ) {
	match = panel.innerHTML.match(/metal\.png[\s\S]*<strong>([\d,]+)[\s\S]*mineral\.png[\s\S]*<strong>([\d,]+)[\s\S]*food\.png[\s\S]*<strong>([\d,]+)[\s\S]*gold\.png[\s\S]*<strong>([\d,]+)[\s\S]*<strong>([\d,]+)/);
				unsafeWindow.evo_plus['pMetal'] = pMetal = evoString2Number(match[1]);
		unsafeWindow.evo_plus['pMineral'] = pMineral = evoString2Number(match[2]);
		unsafeWindow.evo_plus['pFood'] = pFood = evoString2Number(match[3]);
		unsafeWindow.evo_plus['pScore'] = pScore = evoString2Number(match[5]);
	}
	// ranking
	panel = document.evaluate("//div[@id='panelinfo']/table/tbody/tr/td[2]/p", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if( panel != null ) {
		match = panel.innerHTML.match(/<strong>[\s\S]*<\/strong>[\s\S]*<br><strong>[\s\S]*<\/strong>[\s]+([\d,]+)\s\S*\s([\d,]+)/);
		if( match != null ) {
			pRank = match[1];
			totalPlayers = match[2];
		}
	}
	// coords
	unsafeWindow.evo_plus.coords = GM_getValue(dEvo?'devoCoords':'evoCoords');

	// Dispatch
	// -----------------------------------------------------------------------
	for(var i = 0; i < pageHandlers.length; i++ ) {
		if( pageHandlers[i].urlRegEx == null || pageHandlers[i].urlRegEx.test(document.location.pathname) )
			pageHandlers[i].handler();
	}

	// THE evo+ bar
	// -----------------------------------------------------------------------
	node = document.createElement('DIV');
	node.style.textAlign="right";
	node.style.marginRight="5px";
	node.style.marginTop="3px";
	node.style.marginBottom="3px";

	function addItemToContent(c, text, className, html, isLastItem) {
		c.appendChild(document.createTextNode(text));
		var span = document.createElement('SPAN');
		span.className = className;
		if (isLastItem)
			html += "&nbsp;|&nbsp;";
		span.innerHTML = html;
		c.appendChild(span);
	}

	addItemToContent(node, 'Rank: ', 't_normal b', pRank + "/" + totalPlayers, true);
	addItemToContent(node, 'Min. TargetScore: ', 't_normal b', evoNumber2String(Math.ceil(pScore * minAttack)), true);
	addItemToContent(node, 'Max. AttackerScore: ', 't_normal b', evoNumber2String(Math.floor(pScore / minAttack)), false);

	contents.parentNode.insertBefore(node, contents);

	node = document.createElement('DIV');
	node.style.color = "lawngreen";
	node.style.fontSize = "8pt"; node.style.fontWeight = "bold";
	node.style.paddingLeft = "3px"; node.style.paddingTop = "3px";
	node.style.position = "absolute";
	node.innerHTML = scriptversionID;
	node.title = scriptTag;
	node.id = "evomagik";
	panel = document.getElementById('userinfo');
	panel.parentNode.insertBefore(node, panel);

	profiler = Date.now() - profiler;
//	GM_log('evo+ exec time: ' + profiler + ' ms');
}) ();

//
// ***************************************************************************
// ** Helper functions
// ***************************************************************************
//
function gcf(a,b) {
	while( b != 0 ) {
		t = a%b;
		a = b;
		b = t;
	}
	return a;
}

function evoLayoutChanged() {
	alert('Oops.. Page layout was not recognized, Neon probably changed the page :(');
}

function evoNumber2String(num) {
	var re = /(\d+)(\d{3})/g;
	num = String(num);
	var decimalIdx = num.indexOf('.');
	var part1 = '1', part2="";
	if( decimalIdx != -1 ) {
		part1 = num.substring(0, decimalIdx);
		part2 = num.substring(decimalIdx + 1, num.length);
	} else {
		part1 = num;
	}
	while( re.test(part1) ) part1 = part1.replace(re, '$1,$2');
	return part2 == "" ? part1 : part1 + "." + part2;
}

function evoString2Number(num) {
	return Number(num.replace(/,/g,''));
}

function evoFormatNumberZ(num, zeros) {
	var str = "0000" + Math.floor(Math.abs(num));
	return str.substr(-zeros);
}

//
// ***************************************************************************
// ** Objects
// ***************************************************************************

// evoUnit
function evoUnit(unitName, unitType, ticks, metal, mineral, attack, defense, intel, weight, defenseBoost, eats) {
	this.unitName = unitName;
	this.unitType = unitType;
	this.defense = defense;
	this.attack = attack;
	this.metal = metal;
	this.ticks = ticks;
	this.intel = intel;
	this.weight = weight;
	this.mineral = mineral;
	this.eats = eats;
	this.defenseBoost = defenseBoost/100 + 1;
	return this;
}

//
// Page Handler hooks
function pageHandler(urlRegEx, handler) {
	this.urlRegEx = urlRegEx;
	this.handler = handler;
}
function regPageHandler(urlRegEx, handler) {
	pageHandlers.push(new pageHandler(urlRegEx,  handler));
}

//
// ***************************************************************************
// ** MISC
// ***************************************************************************

// GM implementation of cookies :)
function evoSetCookie(name, value, hours) {
	GM_setValue('cv_' + name, value);
	var expire = new Date();
	expire.setUTCHours(expire.getUTCHours() + hours);
	GM_setValue('cx_' + name, expire.toGMTString());
}

function evoGetCookie(name) {
	var value = GM_getValue('cv_' + name);
	var expire = GM_getValue('cx_' + name);
	if( value != null && expire != null ) {
		expire = new Date(expire);
		if( expire.valueOf() >= Date.now() ) return value;
	}
	return null;
}

//
// ***************************************************************************
// ** Evo units stats
// ***************************************************************************
function evoUnitsInitialize() {
	evoUnit.prototype.getFoodCost = function(count) {
		return this.eats?count * (this.mineral+this.metal)/100:0;
	}

	evoUnit.prototype.getAttackScore = function(count) {
		return count * this.attack * this.attack;
	}

	evoUnit.prototype.getDefenseScore = function(count) {
		//Changed to reflect correct formula, Thanks to Mefisto of Alexandria
		return count * this.defense * this.defense * this.defenseBoost;
	}

	evoUnit.prototype.getMaxUnits = function (metal, mineral) {
		if( this.unitType == UT_NATURAL )
			return Math.min(Math.floor(metal / (this.metal * eeb)), Math.floor(mineral / (this.mineral * eeb)));
		else
			return Math.min(Math.floor(metal / this.metal), Math.floor(mineral / this.mineral));
	}

	evoUnit.prototype.getMetal = function() {
		return this.unitType == UT_NATURAL ? (this.metal * eeb) : this.metal;
	}

	evoUnit.prototype.getMineral = function() {
		return this.unitType == UT_NATURAL ? (this.mineral * eeb) : this.mineral;
	}

	evoUnit.prototype.getMaxBoost = function() {
		return maxBoosts[this.unitType];
	}

	evoUnit.prototype.getBoost = function() {
		return boosts[this.unitType];
	}

	evoUnit.prototype.getWeight = function() {
		return this.weight;
	}

	if(! dEvo ) {
		units['monkey']           = new evoUnit('Monkey'           ,UT_NATURAL ,3   ,500    ,250    ,4   ,4   ,3   ,0  ,40 ,true);

		units['sheep']            = new evoUnit('Sheep'            ,UT_NATURAL ,4   ,1500   ,750    ,11  ,11  ,6   ,0  ,40 ,true);
		units['wolf']             = new evoUnit('Wolf'             ,UT_NATURAL ,10  ,8000   ,4000   ,27  ,25  ,14  ,0  ,40 ,true);
		units['python']           = new evoUnit('Python'           ,UT_NATURAL ,12  ,12500  ,5000   ,36  ,30  ,7   ,1  ,40 ,true);
		units['kangaroo']         = new evoUnit('Kangaroo'         ,UT_NATURAL ,15  ,15000  ,8000   ,36  ,40  ,5   ,1  ,40 ,true);
		units['walrus']           = new evoUnit('Walrus'           ,UT_NATURAL ,18  ,26000  ,13000  ,52  ,51  ,4   ,2  ,40 ,true);

		units['cow']              = new evoUnit('Cow'              ,UT_NATURAL ,6   ,2500   ,1250   ,16  ,13  ,3   ,1  ,40 ,true);
		units['hyena']            = new evoUnit('Hyena'            ,UT_NATURAL ,9   ,8800   ,3300   ,28  ,27  ,9   ,1  ,40 ,true);
		units['ostrich']          = new evoUnit('Ostrich'          ,UT_NATURAL ,12  ,18000  ,8000   ,42  ,44  ,6   ,2  ,40 ,true);
		units['bear']             = new evoUnit('Bear'             ,UT_NATURAL ,15  ,30000  ,15000  ,60  ,57  ,12  ,3  ,40 ,true);
		units['elephant']         = new evoUnit('Elephant'         ,UT_NATURAL ,19  ,42000  ,21000  ,72  ,75  ,22  ,4  ,40 ,true);

		units['horse']            = new evoUnit('Horse'            ,UT_NATURAL ,5   ,2000   ,1000   ,13  ,13  ,4   ,1  ,40 ,true);
		units['fox']              = new evoUnit('Fox'              ,UT_NATURAL ,9   ,7200   ,3200   ,24  ,25  ,8   ,0  ,40 ,true);
		units['puma']             = new evoUnit('Puma'             ,UT_NATURAL ,13  ,11000  ,5000   ,32  ,32  ,5   ,1  ,40 ,true);
		units['lynx']             = new evoUnit('Lynx'             ,UT_NATURAL ,15  ,12000  ,5500   ,35  ,31  ,8   ,1  ,40 ,true);
		units['lion']             = new evoUnit('Lion'             ,UT_NATURAL ,15  ,12000  ,5000   ,31  ,35  ,8   ,1  ,40 ,true);
		units['cheetah']          = new evoUnit('Cheetah'          ,UT_NATURAL ,16  ,14000  ,7000   ,41  ,29  ,5   ,1  ,40 ,true);
		units['panther']          = new evoUnit('Panther'          ,UT_NATURAL ,16  ,14000  ,8000   ,32  ,41  ,6   ,1  ,40 ,true);
		units['tiger']            = new evoUnit('Tiger'            ,UT_NATURAL ,20  ,18000  ,9000   ,44  ,43  ,11  ,2  ,40 ,true);
		units['rhino']            = new evoUnit('Rhino'            ,UT_NATURAL ,24  ,28000  ,17000  ,66  ,51  ,3   ,3  ,40 ,true);
        
		units['centaur']          = new evoUnit('Centaur'          ,UT_ENG     ,5   ,4800   ,2400   ,22  ,23  ,10  ,1  ,40 ,true);
		units['unicorn']          = new evoUnit('Unicorn'          ,UT_ENG     ,8   ,7500   ,3750   ,31  ,26  ,6   ,1  ,40 ,true);
		units['gryphon']          = new evoUnit('Gryphon'          ,UT_ENG     ,12  ,10500  ,5250   ,36  ,36  ,8   ,2  ,40 ,true);
		units['minotaur']         = new evoUnit('Minotaur'         ,UT_ENG     ,18  ,19000  ,9500   ,54  ,43  ,13  ,2  ,40 ,true);
		units['dragon']           = new evoUnit('Dragon'           ,UT_ENG     ,24  ,30000  ,15000  ,76  ,67  ,9   ,3  ,40 ,true);

		units['fire sprite']      = new evoUnit('Fire Sprite'      ,UT_ENG     ,4   ,5000   ,2500   ,25  ,18  ,4   ,0  ,40 ,true);
		units['salamander']       = new evoUnit('Salamander'       ,UT_ENG     ,7   ,9000   ,4500   ,36  ,26  ,10  ,1  ,40 ,true);
		units['phoenix']          = new evoUnit('Phoenix'          ,UT_ENG     ,10  ,14600  ,7300   ,44  ,37  ,6   ,1  ,40 ,true);
		units['wyvern']           = new evoUnit('Wyvern'           ,UT_ENG     ,15  ,25000  ,12500  ,64  ,43  ,7   ,2  ,40 ,true);
		units['demon']            = new evoUnit('Demon'            ,UT_ENG     ,20  ,34000  ,17000  ,93  ,58  ,5   ,3  ,40 ,true);

		units['dryad']            = new evoUnit('Dyrad'            ,UT_ENG     ,7   ,3600   ,2700   ,21  ,21  ,13  ,1  ,40 ,true);
		units['basilisk']         = new evoUnit('Baskilisk'        ,UT_ENG     ,10  ,5800   ,4350   ,29  ,24  ,21  ,1  ,40 ,true);
		units['medusa']           = new evoUnit('Medusa'           ,UT_ENG     ,15  ,10000  ,7500   ,37  ,34  ,15  ,1  ,40 ,true);
		units['cockatrice']       = new evoUnit('Cockatrice'       ,UT_ENG     ,21  ,18000  ,13500  ,54  ,45  ,23  ,2  ,40 ,true);
		units['werewolf']         = new evoUnit('Werewolf'         ,UT_ENG     ,28  ,26000  ,19500  ,70  ,64  ,30  ,2  ,40 ,true);

		units['avimimus']         = new evoUnit('Avimimus'         ,UT_ENG     ,4   ,3600   ,1800   ,22  ,17  ,2   ,1  ,40 ,true);
		units['therizinosaurus']  = new evoUnit('Therizinosaurus'  ,UT_ENG     ,6   ,5300   ,2650   ,26  ,22  ,3   ,1  ,40 ,true);
		units['styracosaurus']    = new evoUnit('Styracosaurus'    ,UT_ENG     ,8   ,9400   ,4700   ,33  ,35  ,8   ,2  ,40 ,true);
		units['carnotaurus']      = new evoUnit('Carnotaurus'      ,UT_ENG     ,11  ,15200  ,7600   ,51  ,41  ,5   ,3  ,40 ,true);
		units['giganotosaurus']   = new evoUnit('Giganotosaurus'   ,UT_ENG     ,14  ,24000  ,12000  ,75  ,56  ,4   ,4  ,40 ,true);

		units['scarab beetle']    = new evoUnit('Scarab Beetle'    ,UT_ENG     ,8   ,6000   ,3000   ,25  ,25  ,7   ,0  ,40 ,true);
		units['mummy']            = new evoUnit('Mummy'            ,UT_ENG     ,12  ,12000  ,6000   ,38  ,35  ,1   ,1  ,40 ,true);
		units['sta']              = new evoUnit('Sta'              ,UT_ENG     ,18  ,19000  ,9500   ,46  ,44  ,12  ,1  ,40 ,true);
		units['sphinx']           = new evoUnit('Sphinx'           ,UT_ENG     ,24  ,28000  ,14000  ,67  ,57  ,14  ,3  ,40 ,true);
		units['anubis incarnate'] = new evoUnit('Anubis Incarnate' ,UT_ENG     ,32  ,42000  ,21000  ,93  ,78  ,7   ,3  ,40 ,true);

      		units['fort']             = new evoUnit('Fort'             ,UT_NONE    ,4   ,2000   ,1000   ,24  ,42  ,0   ,0  ,40 ,false);
      		units['satellite']        = new evoUnit('Satellite'        ,UT_NONE    ,6   ,7000   ,3500   ,57  ,49  ,0   ,0  ,40 ,false);
      		units['satellite mark 2'] = new evoUnit('Satellite Mark 2' ,UT_NONE    ,6   ,8000   ,4000   ,57  ,65  ,0   ,0  ,40 ,false);
      		units['nanowire wall']    = new evoUnit('Nanowire wall'    ,UT_NONE    ,9   ,10000  ,4000   ,66  ,61  ,0   ,0  ,40 ,false);

		units['wave reflector']   = new evoUnit('Wave Reflector'   ,UT_NONE    ,4   ,2000   ,2000   ,0   ,0   ,0   ,0  ,0  ,false);

		units['biochemical missile']     = new evoUnit('Biochemical Missile' ,UT_NONE ,12  ,10000  ,20000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['nanovirus missile']       = new evoUnit('Nanovirus Missile' ,UT_NONE    ,12  ,30000  ,15000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['bombs']                   = new evoUnit('Bombs'            ,UT_NONE    ,12  ,11000  ,7000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['neural reorganiser bomb'] = new evoUnit('Neural Reorganiser Bomb' ,UT_NONE ,24,50000 ,32000 ,0  ,0   ,0   ,0  ,0  ,false);
		units['poison bombs']            = new evoUnit('Poison Bombs'     ,UT_NONE    ,16  ,16000  ,12000  ,0   ,0   ,0   ,0  ,0  ,false);

		units['land scan']        = new evoUnit('Land Scan'        ,UT_NONE    ,4   ,1000   ,2000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['scan amplifier']   = new evoUnit('Scan Amplifier'   ,UT_NONE    ,4   ,1000   ,1000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['sector scan']      = new evoUnit('Sector Scan'      ,UT_NONE    ,8   ,2000   ,4000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['creature scan']    = new evoUnit('Creature Scan'    ,UT_NONE    ,8   ,3000   ,6000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['r&d scan']         = new evoUnit('R&D Scan'         ,UT_NONE    ,6   ,2000   ,3000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['news scan']        = new evoUnit('News Scan'        ,UT_NONE    ,18  ,10000  ,20000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['military scan']    = new evoUnit('Military Scan'    ,UT_NONE    ,12  ,6000   ,12000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['microwave pulse']  = new evoUnit('Microwave Pulse'  ,UT_NONE    ,20  ,520000  ,1040000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['overload pulse']   = new evoUnit('Overload Pulse'   ,UT_NONE    ,24  ,1600000  ,3200000  ,0   ,0   ,0   ,0  ,0  ,false);
	} else {
		// DEVO Stats
		units['monkey']           = new evoUnit('Monkey'           ,UT_NATURAL ,4   ,500    ,250    ,5   ,5   ,4   ,0  ,40 ,true);

		units['sheep']            = new evoUnit('Sheep'            ,UT_NATURAL ,4   ,1500   ,750    ,11  ,11  ,5   ,0  ,40 ,true);
		units['wolf']             = new evoUnit('Wolf'             ,UT_NATURAL ,10  ,8000   ,3500   ,27  ,25  ,14  ,0  ,40 ,true);
		units['python']           = new evoUnit('Python'           ,UT_NATURAL ,12  ,12500  ,5000   ,36  ,31  ,7   ,1  ,40 ,true);
		units['kangaroo']         = new evoUnit('Kangaroo'         ,UT_NATURAL ,15  ,17000  ,8000   ,37  ,42  ,5   ,1  ,40 ,true);
		units['walrus']           = new evoUnit('Walrus'           ,UT_NATURAL ,18  ,28000  ,14000  ,53  ,54  ,4   ,2  ,40 ,true);

		units['horse']            = new evoUnit('Horse'            ,UT_NATURAL ,5   ,2000   ,1000   ,13  ,13  ,6   ,1  ,40 ,true);
		units['fox']              = new evoUnit('Fox'              ,UT_NATURAL ,9   ,7200   ,3200   ,24  ,25  ,8   ,0  ,40 ,true);
		units['puma']             = new evoUnit('Puma'             ,UT_NATURAL ,13  ,11000  ,5000   ,32  ,32  ,6   ,1  ,40 ,true);
		units['lynx']             = new evoUnit('Lynx'             ,UT_NATURAL ,15  ,12000  ,5500   ,35  ,31  ,10  ,1  ,40 ,true);
		units['lion']             = new evoUnit('Lion'             ,UT_NATURAL ,15  ,12000  ,5000   ,31  ,35  ,10  ,1  ,40 ,true);
		units['cheetah']          = new evoUnit('Cheetah'          ,UT_NATURAL ,16  ,14000  ,7000   ,41  ,29  ,5   ,1  ,40 ,true);
		units['panther']          = new evoUnit('Panther'          ,UT_NATURAL ,16  ,14000  ,7000   ,30  ,40  ,6   ,1  ,40 ,true);
		units['tiger']            = new evoUnit('Tiger'            ,UT_NATURAL ,20  ,18000  ,9000   ,43  ,43  ,11  ,2  ,40 ,true);
		units['rhino']            = new evoUnit('Rhino'            ,UT_NATURAL ,24  ,28000  ,17000  ,66  ,53  ,3   ,3  ,40 ,true);

		units['cow']              = new evoUnit('Cow'              ,UT_NATURAL ,6   ,4500   ,2500   ,16  ,8   ,7   ,1  ,40 ,true);
		units['hyena']            = new evoUnit('Hyena'            ,UT_NATURAL ,10  ,8800   ,3600   ,28  ,27  ,8   ,1  ,40 ,true);
		units['ostrich']          = new evoUnit('Ostrich'          ,UT_NATURAL ,13  ,18000  ,8000   ,43  ,41  ,6   ,2  ,40 ,true);
		units['bear']             = new evoUnit('Bear'             ,UT_NATURAL ,16  ,26000  ,13000  ,57  ,50  ,12  ,3  ,40 ,true);
		units['elephant']         = new evoUnit('Elephant'         ,UT_NATURAL ,22  ,40000  ,20000  ,65  ,69  ,21  ,4  ,40 ,true);

		units['centaur']          = new evoUnit('Centaur'          ,UT_ENG     ,5   ,4000   ,2400   ,22  ,23  ,10  ,1  ,40 ,true);
		units['unicorn']          = new evoUnit('Unicorn'          ,UT_ENG     ,8   ,7200   ,3600   ,30  ,25  ,6   ,1  ,40 ,true);
		units['minotaur']         = new evoUnit('Minotaur'         ,UT_ENG     ,12  ,10800  ,5400   ,36  ,35  ,8   ,2  ,40 ,true);
		units['gryphon']          = new evoUnit('Gryphon'          ,UT_ENG     ,18  ,19000  ,9500   ,54  ,43  ,14  ,2  ,40 ,true);
		units['dragon']           = new evoUnit('Dragon'           ,UT_ENG     ,24  ,30000  ,10500  ,76  ,67  ,8   ,3  ,40 ,true);

		units['fire sprite']      = new evoUnit('Fire Sprite'      ,UT_ENG     ,5   ,5000   ,2500   ,25  ,18  ,4   ,0  ,40 ,true);
		units['salamander']       = new evoUnit('Salamander'       ,UT_ENG     ,7   ,9000   ,4500   ,36  ,26  ,10  ,1  ,40 ,true);
		units['phoenix']          = new evoUnit('Phoenix'          ,UT_ENG     ,12  ,14600  ,7300   ,44  ,35  ,6   ,1  ,40 ,true);
		units['wyvern']           = new evoUnit('Wyvern'           ,UT_ENG     ,14  ,25000  ,17500  ,69  ,45  ,7   ,2  ,40 ,true);
		units['demon']            = new evoUnit('Demon'            ,UT_ENG     ,21  ,36000  ,18000  ,96  ,60  ,5   ,3  ,40 ,true);

		units['dryad']            = new evoUnit('Dryad'            ,UT_ENG     ,6   ,3600   ,2700   ,21  ,21  ,13  ,1  ,40 ,true);
		units['basilisk']         = new evoUnit('Basilisk'         ,UT_ENG     ,9   ,6000   ,4500   ,29  ,24  ,21  ,1  ,40 ,true);
		units['medusa']           = new evoUnit('Medusa'           ,UT_ENG     ,15  ,10000  ,7500   ,37  ,34  ,15  ,1  ,40 ,true);
		units['cockatrice']       = new evoUnit('Cockatrice'       ,UT_ENG     ,20  ,18000  ,13500  ,54  ,45  ,23  ,2  ,40 ,true);
		units['werewolf']         = new evoUnit('Werewolf'         ,UT_ENG     ,26  ,28000  ,18500  ,71  ,65  ,30  ,2  ,40 ,true);

		units['avimimus']         = new evoUnit('Avimimus'         ,UT_ENG     ,5   ,3700   ,1850   ,22  ,17  ,2   ,1  ,40 ,true);
		units['therizinosaurus']  = new evoUnit('Therizinosaurus'  ,UT_ENG     ,7   ,5000   ,2500   ,23  ,22  ,3   ,1  ,40 ,true);
		units['styracosaurus']    = new evoUnit('Styracosaurus'    ,UT_ENG     ,13  ,9000   ,4500   ,32  ,41  ,8   ,2  ,40 ,true);
		units['carnotaurus']      = new evoUnit('Carnotaurus'      ,UT_ENG     ,15  ,15000  ,7500   ,48  ,55  ,5   ,3  ,40 ,true);
		units['giganotosaurus']   = new evoUnit('Giganotosaurus'   ,UT_ENG     ,20  ,24000  ,12000  ,74  ,58  ,4   ,4  ,40 ,true);

		units['scarab beetle']    = new evoUnit('Scarab Beetle'    ,UT_ENG     ,8   ,6000   ,3000   ,26  ,23  ,7   ,0  ,40 ,true);
		units['mummy']            = new evoUnit('Mummy'            ,UT_ENG     ,12  ,11000  ,5500   ,36  ,34  ,1   ,0  ,40 ,true);
		units['sta']              = new evoUnit('Sta'              ,UT_ENG     ,18  ,18000  ,9000   ,45  ,42  ,12  ,1  ,40 ,true);
		units['sphinx']           = new evoUnit('Sphinx'           ,UT_ENG     ,22  ,28000  ,14000  ,67  ,56  ,4   ,3  ,40 ,true);
		units['anubis incarnate'] = new evoUnit('Anubis Incarnate' ,UT_ENG     ,32  ,42000  ,21000  ,93  ,78  ,8   ,3  ,40 ,true);

		units['fort']             = new evoUnit('Fort'             ,UT_NONE    ,4   ,2000   ,1000   ,25  ,40  ,0   ,0  ,215 ,false);
		units['satellite']        = new evoUnit('Satellite'        ,UT_NONE    ,6   ,8000   ,4000   ,30  ,35  ,0   ,0  ,215 ,false);
		units['nanowire wall']    = new evoUnit('Nanowire wall'    ,UT_NONE    ,10  ,12000  ,4500   ,65  ,65  ,0   ,0  ,215 ,false);
		units['satellite mark 2'] = new evoUnit('Satellite Mark 2' ,UT_NONE    ,6   ,8000   ,4000   ,35  ,45  ,0   ,0  ,215 ,false);

		units['wave reflector']   = new evoUnit('Wave Reflector'   ,UT_NONE    ,4   ,2000   ,2000   ,0   ,0   ,0   ,0  ,0  ,false);

		units['biochemical missile']     = new evoUnit('Biochemical Missile' ,UT_NONE ,12  ,10000  ,20000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['nanovirus missile']       = new evoUnit('Nanovirus Missile' ,UT_NONE    ,12  ,30000  ,15000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['bombs']                   = new evoUnit('Bombs'            ,UT_NONE    ,12  ,11000  ,7000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['neural reorganiser bomb'] = new evoUnit('Neural Reorganiser Bomb' ,UT_NONE ,24,50000 ,32000 ,0  ,0   ,0   ,0  ,0  ,false);
		units['poison bombs']            = new evoUnit('Poison Bombs'     ,UT_NONE    ,16  ,16000  ,12000  ,0   ,0   ,0   ,0  ,0  ,false);

		units['land scan']        = new evoUnit('Land Scan'        ,UT_NONE    ,4   ,1000   ,2000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['scan amplifier']   = new evoUnit('Scan Amplifier'   ,UT_NONE    ,4   ,1000   ,1000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['sector scan']      = new evoUnit('Sector Scan'      ,UT_NONE    ,8   ,2000   ,4000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['creature scan']    = new evoUnit('Creature Scan'    ,UT_NONE    ,8   ,3000   ,6000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['r&d scan']         = new evoUnit('R&D Scan'         ,UT_NONE    ,6   ,2000   ,3000   ,0   ,0   ,0   ,0  ,0  ,false);
		units['news scan']        = new evoUnit('News Scan'        ,UT_NONE    ,18  ,10000  ,20000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['military scan']    = new evoUnit('Military Scan'    ,UT_NONE    ,12  ,6000   ,12000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['microwave pulse']  = new evoUnit('Microwave Pulse'  ,UT_NONE    ,20  ,520000  ,1040000  ,0   ,0   ,0   ,0  ,0  ,false);
		units['overload pulse']   = new evoUnit('Overload Pulse'   ,UT_NONE    ,24  ,1600000  ,3200000  ,0   ,0   ,0   ,0  ,0  ,false);
	}
	unsafeWindow.evo_plus['units'] = units;
}

GM_log("evo+ Finished");

