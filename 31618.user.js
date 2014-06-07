// ==UserScript==
// @name GA Sorter
// @namespace http://andrescholten.nl/index.php/greasemonkey-script-voor-google-analytics/
// @description Google Analytics Sorter can sort the visible rows so you won't get all data sorted. Very nice add-on to sort only the top keywords on bounce rate in stead of all keywords.
// @include *.google.com/analytics/*
// ==/UserScript==
//
// Version 1.2
//

/* You can change these values */
var image_path = "";
var image_up = "http://andrescholten.nl/got/arrow-up.gif";
var image_down = "http://andrescholten.nl/got/arrow-down.gif";
var image_none = "http://andrescholten.nl/got/arrow-none.gif";
var europeandate = true;
var alternate_row_colors = true;

/* Don't change anything below this unless you know what you're doing */
addEvent(window, "load", check);

function check()
{
  if (document.getElementById("f_table_data"))
  {
    //if (document.getElementById("f_table_data").rows[0].cells[0].className.indexOf("unsortable") == -1)
    
    if (document.getElementById("f_table_data").className.indexOf("sortable") == -1)
    {
      var asas_tabel = document.getElementById("f_table_data");
      asas_tabel.className += " sortable";
      //var asas_rij1 = asas_tabel.rows[0]
      //var asas_cellen = asas_rij1.cells;
      //asas_cellen[0].colSpan = "1";

      //var asas_elm = document.createElement('th');
      //asas_elm.className = "unsortable";
      //asas_rij1.insertBefore(asas_elm, asas_rij1.getElementsByTagName('th')[0]);

      sortables_init()
    }
  }
  setTimeout(check, 500);
}

var SORT_COLUMN_INDEX;
var thead = false;

function sortables_init() {
  // Find all tables with class sortable and make them sortable
  if (!document.getElementsByTagName) return;
  tbls = document.getElementsByTagName("table");
  for (ti=0;ti<tbls.length;ti++) {
    thisTbl = tbls[ti];
    if (((' '+thisTbl.className+' ').indexOf("sortable") != -1) && (thisTbl.id)) {
      ts_makeSortable(thisTbl);
    }
  }
}

function ts_makeSortable(t) {
  if (t.rows && t.rows.length > 0) {
    if (t.tHead && t.tHead.rows.length > 0) {
      var firstRow = t.tHead.rows[t.tHead.rows.length-1];
      thead = true;
    } else {
      var firstRow = t.rows[0];
    }
  }
  if (!firstRow) return;

  // We have a first row: assume it's the header, and make its contents clickable links
  for (var i=0;i<firstRow.cells.length;i++) {
    var cell = firstRow.cells[i];
    var txt = ts_getInnerText(cell);
    if (cell.className != "unsortable" && cell.className.indexOf("unsortable") == -1) {
      var asas_obj = document.createElement("div");
      asas_obj.innerHTML = '<div style="text-align:center;"><a href="#" class="sortheader" id="colom' + i + '"><span class="sortarrow" style="background-color: #B5B5B5;"><img src="'+ image_path + image_none + '" alt="&darr;"/></span></a></div>';
      cell.appendChild(asas_obj);
      
      var elmLink = document.getElementById('colom' + i);
      elmLink.addEventListener("click", ts_resortTable, true);
      
      elmLink.addEventListener("mousedown", cancelEvent, true);
      
    }
  }
  if (alternate_row_colors) {
    alternate(t);
  }
}

function ts_getInnerText(el) {
  if (typeof el == "string") return el;
  if (typeof el == "undefined") { return el };
  if (el.innerText) return el.innerText;	//Not needed but it is faster
  var str = "";

  var cs = el.childNodes;
  var l = cs.length;
  for (var i = 0; i < l; i++) {
    switch (cs[i].nodeType) {
      case 1: //ELEMENT_NODE
        str += ts_getInnerText(cs[i]);
        break;
      case 3:	//TEXT_NODE
        str += cs[i].nodeValue;
        break;
    }
  }
  return str;
}

function cancelEvent(evt) {
  evt.stopPropagation();
}

function ts_resortTable(evt) {
  lnk = evt.target.parentNode.parentNode;
  clid = evt.target.parentNode.parentNode.id.substr(5);
  evt.stopPropagation();
  
  var span;
  for (var ci=0;ci<lnk.childNodes.length;ci++) {
    if (lnk.childNodes[ci].tagName && lnk.childNodes[ci].tagName.toLowerCase() == 'span') span = lnk.childNodes[ci];
  }
  var spantext = ts_getInnerText(span);
  var td = lnk.parentNode;
  var column = clid || td.cellIndex;
  var t = getParent(td,'TABLE');
  // Work out a type for the column
  if (t.rows.length <= 1) return;
  var itm = "";
  var i = 1;
  while (itm == "") {
    
    var itm = ts_getInnerText(t.rows[i].cells[column]);
    itm = trim(itm);
    if (itm.substr(0,4) == "<!--" || itm.length == 0) {
      itm = "";
    }
    i++;
  }
  sortfn = ts_sort_caseinsensitive;
  if (itm.match(/^\d\d[\/\.-][a-zA-z][a-zA-Z][a-zA-Z][\/\.-]\d\d\d\d$/)) sortfn = ts_sort_date;
  if (itm.match(/^\d\d[\/\.-]\d\d[\/\.-]\d\d\d{2}?$/)) sortfn = ts_sort_date;
  if (itm.match(/^-?[£$€Û¢´]\d/)) sortfn = ts_sort_numeric;
  if (itm.match(/^-?(\d+[,\.]?)+(E[-+][\d]+)?%?$/)) sortfn = ts_sort_numeric;
  
  SORT_COLUMN_INDEX = column;
  var firstRow = new Array();
  var newRows = new Array();

  for (i=0;i<t.rows[1].length;i++) {
    firstRow[i] = t.rows[0][i];
  }
  for (var j = 1; j<t.rows.length;j++) {
    newRows[j-1] = t.rows[j];
  }

  newRows.sort(sortfn);
  if (span.getAttribute("sortdir") == 'down') {
      ARROW = '<img src="'+ image_path + image_down + '" alt="&darr;"/>';
      newRows.reverse();
      span.setAttribute('sortdir','up');
  } else {
      ARROW = '<img src="'+ image_path + image_up + '" alt="&uarr;"/>';
      span.setAttribute('sortdir','down');
  }
    // We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
    // don't do sortbottom rows
    for (var i=0; i<newRows.length; i++) {
    if (!newRows[i].className || (newRows[i].className && (newRows[i].className.indexOf('sortbottom') == -1))) {
      t.tBodies[0].appendChild(newRows[i]);
    }
  }
    // do sortbottom rows only
    for (var i=0; i<newRows.length; i++) {
    if (newRows[i].className && (newRows[i].className.indexOf('sortbottom') != -1))
      t.tBodies[0].appendChild(newRows[i]);
  }
  // Delete any other arrows there may be showing
  var allspans = document.getElementsByTagName("span");
  for (var ci=0;ci<allspans.length;ci++) {
    if (allspans[ci].className == 'sortarrow') {
      if (getParent(allspans[ci],"table") == getParent(lnk,"table")) { // in the same table as us?
        allspans[ci].innerHTML = '<img src="'+ image_path + image_none + '" alt="&darr;"/>';
      }
    }
  }		
  span.innerHTML = ARROW;
  alternate(t);
}

function getParent(el, pTagName) {
  if (el == null) {
    return null;
  } else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase()) {
    return el;
  } else {
    return getParent(el.parentNode, pTagName);
  }
}

function sort_date(date) {	
  // y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
  dt = "00000000";
  if (date.length == 11) {
    mtstr = date.substr(3,3);
    mtstr = mtstr.toLowerCase();
    switch(mtstr) {
      case "jan": var mt = "01"; break;
      case "feb": var mt = "02"; break;
      case "mar": var mt = "03"; break;
      case "apr": var mt = "04"; break;
      case "may": var mt = "05"; break;
      case "jun": var mt = "06"; break;
      case "jul": var mt = "07"; break;
      case "aug": var mt = "08"; break;
      case "sep": var mt = "09"; break;
      case "oct": var mt = "10"; break;
      case "nov": var mt = "11"; break;
      case "dec": var mt = "12"; break;
      // default: var mt = "00";
    }
    dt = date.substr(7,4)+mt+date.substr(0,2);
    return dt;
  } else if (date.length == 10) {
    if (europeandate == false) {
      dt = date.substr(6,4)+date.substr(0,2)+date.substr(3,2);
      return dt;
    } else {
      dt = date.substr(6,4)+date.substr(3,2)+date.substr(0,2);
      return dt;
    }
  } else if (date.length == 8) {
    yr = date.substr(6,2);
    if (parseInt(yr) < 50) {
      yr = '20'+yr;
    } else {
      yr = '19'+yr;
    }
    if (europeandate == true) {
      dt = yr+date.substr(3,2)+date.substr(0,2);
      return dt;
    } else {
      dt = yr+date.substr(0,2)+date.substr(3,2);
      return dt;
    }
  }
  return dt;
}

function ts_sort_date(a,b) {
  dt1 = sort_date(ts_getInnerText(a.cells[SORT_COLUMN_INDEX]));
  dt2 = sort_date(ts_getInnerText(b.cells[SORT_COLUMN_INDEX]));

  if (dt1==dt2) {
    return 0;
  }
  if (dt1<dt2) {
    return -1;
  }
  return 1;
}
function ts_sort_numeric(a,b) {
  var aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
  aa = clean_num(aa);
  var bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
  bb = clean_num(bb);
  return compare_numeric(aa,bb);
}
function compare_numeric(a,b) {
  a = a.replace(".", "").replace(".", "").replace(".", "");
  b = b.replace(".", "").replace(".", "").replace(".", "");
  
  var a = parseFloat(a);
  a = (isNaN(a) ? 0 : a);
  var b = parseFloat(b);
  b = (isNaN(b) ? 0 : b);
  return a - b;
}
function ts_sort_caseinsensitive(a,b) {
  aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).toLowerCase();
  bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).toLowerCase();
  if (aa==bb) {
    return 0;
  }
  if (aa<bb) {
    return -1;
  }
  return 1;
}
function ts_sort_default(a,b) {
  aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
  bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
  if (aa==bb) {
    return 0;
  }
  if (aa<bb) {
    return -1;
  }
  return 1;
}
function addEvent(elm, evType, fn, useCapture)
// addEvent and removeEvent
// cross-browser event handling for IE5+,	NS6 and Mozilla
// By Scott Andrew
{
  if (elm.addEventListener){
    elm.addEventListener(evType, fn, useCapture);
    return true;
  } else if (elm.attachEvent){
    var r = elm.attachEvent("on"+evType, fn);
    return r;
  } else {
    alert("Handler could not be removed");
  }
}
function clean_num(str) {
  str = str.replace(new RegExp(/[^-?0-9.]/g),"");
  return str;
}
function trim(s) {
  while (s.substring(0,1) == ' ') {
    s = s.substring(1,s.length);
  }
  while (s.substring(s.length-1,s.length) == ' ') {
    s = s.substring(0,s.length-1);
  }
  return s;
}
function alternate(table) {
  // Take object table and get all it's tbodies.
  var tableBodies = table.getElementsByTagName("tbody");
  // Loop through these tbodies
  for (var i = 0; i < tableBodies.length; i++) {
    // Take the tbody, and get all it's rows
    var tableRows = tableBodies[i].getElementsByTagName("tr");
    // Loop through these rows
    // Start at 1 because we want to leave the heading row untouched
    for (var j = 0; j < tableRows.length; j++) {
      // Check if j is even, and apply classes for both possible results
      if ( (j % 2) == 0  ) {
        if ( !(tableRows[j].className.indexOf('odd') == -1) ) {
          tableRows[j].className = tableRows[j].className.replace('odd', 'even');
        } else {
          if ( tableRows[j].className.indexOf('even') == -1 ) {
            tableRows[j].className += " even";
          }
        }
      } else {
        if ( !(tableRows[j].className.indexOf('even') == -1) ) {
          tableRows[j].className = tableRows[j].className.replace('even', 'odd');
        } else {
          if ( tableRows[j].className.indexOf('odd') == -1 ) {
            tableRows[j].className += " odd";
          }
        }
      }
    }
  }
}