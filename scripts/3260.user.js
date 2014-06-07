// SpamCop Held Mail Cleanup
// version 0.3
// 2007-03-11
// Copyright (c) 2007, Daniel Einspanjer
// Released under the MIT license
// http://www.opensource.org/licenses/mit-license.php
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "SpamCop Held Mail Cleanup" then click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          SpamCop Held Mail Cleanup
// @namespace     http://www.yipyip.com/greasemonkey/
// @description   Converts the SpamCop Held Mail <dl> list into a table with sortable columns
// @include       http://mailsc.spamcop.net/reportheld*
// ==/UserScript==

GM_addStyle("\
a.sortheader {\
    background-color:#eee;\
    color:#666666;\
    font-weight: bold;\
    text-decoration: none;\
    display: block;\
}\
span.sortarrow {\
    color: black;\
    text-decoration: none;\
}\
caption {\
    padding: 1em 0 .25em .5em;\
    text-align: left;\
}\
table {\
    font-family: monospace;\
    font-size: smaller !important;\
}\
th {\
    text-align: center;\
}\
td.X {\
    text-align: center;\
}\
td.ID {\
    text-align: center;\
}\
td.From {\
    text-align: right;\
    padding-right: 1em;\
}\
td.Subject {\
    padding: 0 1em;\
}\
td.Received {\
    padding: 0 1em;\
    white-space: nowrap;\
    text-align: right;\
}\
td.Filter {\
    padding: 0 1em;\
    white-space: nowrap;\
}");

// This regex captures the SpamCop time format and the blocking reason.
const ddRegex = /\s*(.+?(?: [-+]\d{4})?(?: \(?[A-Z]{3}(?: ?[-+]\d{2}:?\d{2})?\)?)*)? \((Blocked .*)\)\s*/;

// Captures the e-mail address from the trailing cruft
const fromRegex = /\s*([^ (]*)/;

// Captures the ID without the brackets
const idRegex = /\s*\[(\d+)\]/;

// This is very VBish, but I just have a bunch of variables that get reused a lot in loops and such.
var tr, td, tdX, tdID, tdFrom, tdSubject, tdReceived, tdFilter, stringNode, regexResult, nodes1, nodes2;

// The list of column headers and the sort function to use on them
var columnDefinitions = [
        ["X", ts_null_sort],
        ["ID", ts_sort_numeric],
        ["From", ts_sort_email],
        ["Subject", ts_sort_caseinsensitive],
        ["Received", ts_sort_parsed_date],
        ["Filter", ts_sort_blocked] ];

var table = document.createElement('table');
table.border = '1';

// cellSpacing gets bunched up at the top of the table when reordering rows. blech!
table.cellSpacing = '0';

// First, create the header row
tr = document.createElement('tr');
for (var i = 0; i < columnDefinitions.length; i++)
{
    var methodHolder = columnDefinitions[i][1];
    td = document.createElement('th');
    td.appendChild(document.createTextNode(columnDefinitions[i][0]));
    tr.appendChild(td);
}
table.appendChild(tr);

var dlElement = document.getElementsByTagName('dl')[0];

// Note that I assume paired dt/dd elements.
// The code in the loopwould break if they weren''t paired.
var dtElements = dlElement.getElementsByTagName('dt');
var ddElements = dlElement.getElementsByTagName('dd');

for (var i = 0; i < dtElements.length; i++)
{
    tr = document.createElement('tr');
    tdX = document.createElement('td');
    tdX.className = 'X';
    tdID = document.createElement('td');
    tdID.className = 'ID';
    tdFrom = document.createElement('td');
    tdFrom.className = 'From';
    tdSubject = document.createElement('td');
    tdSubject.className = 'Subject';
    tdReceived = document.createElement('td');
    tdReceived.className = 'Received';
    tdFilter = document.createElement('td');
    tdFilter.className = 'Filter';

    // Stuff all the input elements into the X field
    nodes1 = dtElements[i].getElementsByTagName('input');
    while (nodes1.length > 0)
    {
        tdX.appendChild(nodes1[0]);
    }

    // The ID and the Subject are both in <strong> elements.
    nodes1 = dtElements[i].getElementsByTagName('strong');

    // The ID
    stringNode = nodes1[0].childNodes[0];
    regexResult = stringNode.textContent.match(idRegex);
    if (regexResult != null)
    {
        tdID.appendChild(document.createTextNode(regexResult[1]));
    }

    // The subject and preview link
    nodes2 = nodes1[1].childNodes;
    while (nodes2.length > 0)
    {
        tdSubject.appendChild(nodes2[0]);
    }

    // Remove the two now-empty strong elements.
    dtElements[i].removeChild(nodes1[1]);
    dtElements[i].removeChild(nodes1[0]);

    // All the darn anonymous whitespace nodes.
    // I know the From address is the fifth element at this point.
    stringNode = dtElements[i].childNodes[4];
    regexResult = stringNode.textContent.match(fromRegex);
    if (regexResult != null)
    {
        tdFrom.appendChild(document.createTextNode(regexResult[1]));
    }


    // The date and blocked strings are first in the <dd>
    stringNode = ddElements[i].childNodes[0]
    regexResult = stringNode.textContent.match(ddRegex);
    if (regexResult != null)
    {
        // Rewrite the date as a local string so sorting makes visible sense.
        tdReceived.appendChild(document.createTextNode(new Date(Date.parse(regexResult[1])).toLocaleString()));

        tdFilter.appendChild(document.createTextNode(regexResult[2]));
        ddElements[i].removeChild(stringNode);
    }

    tr.appendChild(tdX);
    tr.appendChild(tdID);
    tr.appendChild(tdFrom);
    tr.appendChild(tdSubject);
    tr.appendChild(tdReceived);
    tr.appendChild(tdFilter);
    table.appendChild(tr);
}

var caption = document.createElement('caption');

// Now that we''ve gotten rid of all the other stuff, the only <a> elements in <dl> are the widgets.
var aElements = dlElement.getElementsByTagName('a');
while (aElements.length > 0)
{
    caption.appendChild(aElements[0]);
}
caption.insertBefore(document.createTextNode(' | '), caption.childNodes[1]);

// -1 for the header row
caption.appendChild(document.createTextNode(' ' + (table.childNodes.length-1) + ' items'));

table.appendChild(caption);

dlElement.parentNode.insertBefore(table, dlElement);

// Clean up the now defunct <dl>.
dlElement.parentNode.removeChild(dlElement);

String.prototype.trim=function(){
    return this.replace(/^\s*|\s*$/g,'');
}


// The code below was tweaked from:
// http://www.kryogenix.org/code/browser/sorttable/
// and falls under the MIT license:
// http://www.kryogenix.org/code/browser/licence.html
//
// My major changes were:
// To replace the use of table.rows and row.cells with .childNodes because the
// former methods didn''t work with my generated table.
// To replace the use of innerHTML for creating the sort links because I needed
// to use .addEventListener instead of the onclick attribute.

var SORT_COLUMN_INDEX;

ts_makeSortable(table);

function ts_makeSortable(theTable) {
    var firstRow = theTable.getElementsByTagName('tr')[0];
    if (!firstRow) return;
    
    // We have a first row: assume it''s the header, and make its contents clickable links
    for (var i=0;i<firstRow.childNodes.length;i++) {
        var cell = firstRow.childNodes[i];
        var aLink = document.createElement('a');
        aLink.href = '#';
        aLink.className = 'sortheader';
        aLink.addEventListener('click', function(event) { ts_resortTable(event.target); event.preventDefault(); }, true);
        aLink.appendChild(cell.childNodes[0]);
        var span = document.createElement('span');
        span.className = 'sortarrow';
        span.innerHTML = '&nbsp;&nbsp;&nbsp;';
        aLink.appendChild(span);
        cell.appendChild(aLink);
    }
}

function ts_getInnerText(el) {
	if (typeof el == "string") return el;
	if (typeof el == "undefined") { return el };
	if (el.innerText) return el.innerText.trim();	//Not needed but it is faster
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
	return str.trim();
}

function ts_resortTable(lnk) {
    // get the span
    var span;
    for (var ci=0;ci<lnk.childNodes.length;ci++) {
        if (lnk.childNodes[ci].tagName && lnk.childNodes[ci].tagName.toLowerCase() == 'span') span = lnk.childNodes[ci];
    }
    var spantext = ts_getInnerText(span);
    var td = lnk.parentNode;
    var column = td.cellIndex;
    var sortMethod = columnDefinitions[column][1];
    var theTable = getParent(td,'TABLE');
    
    var rows = theTable.getElementsByTagName('tr');
    if (rows.length <= 1) return;

    SORT_COLUMN_INDEX = column;
    var firstRow = new Array();
    var newRows = new Array();
    for (var i=0;i<rows[0].childNodes.length;i++) { firstRow[i] = rows[0].childNodes[i]; }
    for (var i=1;i<rows.length;i++) { newRows[i-1] = rows[i]; }

    newRows.sort(sortMethod);

    if (span.getAttribute("sortdir") == 'down') {
        ARROW = '&nbsp;&nbsp;&uarr;';
        newRows.reverse();
        span.setAttribute('sortdir','up');
    } else {
        ARROW = '&nbsp;&nbsp;&darr;';
        span.setAttribute('sortdir','down');
    }
    
    // Sortbottom isn''t used in my implementation.
    // We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
    // don''t do sortbottom rows
    for (i=0;i<newRows.length;i++) { if (!newRows[i].className || (newRows[i].className && (newRows[i].className.indexOf('sortbottom') == -1))) theTable.appendChild(newRows[i]);}
    // do sortbottom rows only
    for (i=0;i<newRows.length;i++) { if (newRows[i].className && (newRows[i].className.indexOf('sortbottom') != -1)) theTable.appendChild(newRows[i]);}
    
    // Delete any other arrows there may be showing
    var allspans = document.getElementsByTagName("span");
    for (var ci=0;ci<allspans.length;ci++) {
        if (allspans[ci].className == 'sortarrow') {
            if (getParent(allspans[ci],"table") == getParent(lnk,"table")) { // in the same table as us?
                allspans[ci].innerHTML = '&nbsp;&nbsp;&nbsp;';
            }
        }
    }
        
    span.innerHTML = ARROW;
}

function getParent(el, pTagName) {
	if (el == null) return null;
	else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase())	// Gecko bug, supposed to be uppercase
		return el;
	else
		return getParent(el.parentNode, pTagName);
}
function ts_sort_date(a,b) {
    // y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
    if (aa.length == 10) {
        dt1 = aa.substr(6,4)+aa.substr(3,2)+aa.substr(0,2);
    } else {
        yr = aa.substr(6,2);
        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
        dt1 = yr+aa.substr(3,2)+aa.substr(0,2);
    }
    if (bb.length == 10) {
        dt2 = bb.substr(6,4)+bb.substr(3,2)+bb.substr(0,2);
    } else {
        yr = bb.substr(6,2);
        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
        dt2 = yr+bb.substr(3,2)+bb.substr(0,2);
    }
    if (dt1==dt2) return 0;
    if (dt1<dt2) return -1;
    return 1;
}
function ts_sort_currency(a,b) { 
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,'');
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,'');
    return parseFloat(aa) - parseFloat(bb);
}
function ts_sort_numeric(a,b) { 
    aa = parseFloat(ts_getInnerText(a.childNodes[SORT_COLUMN_INDEX]));
    if (isNaN(aa)) aa = 0;
    bb = parseFloat(ts_getInnerText(b.childNodes[SORT_COLUMN_INDEX])); 
    if (isNaN(bb)) bb = 0;
    return aa-bb;
}
function ts_sort_caseinsensitive(a,b) {
    aa = ts_getInnerText(a.childNodes[SORT_COLUMN_INDEX]).toLowerCase();
    bb = ts_getInnerText(b.childNodes[SORT_COLUMN_INDEX]).toLowerCase();
    if (aa==bb) return 0;
    if (aa<bb) return -1;
    return 1;
}
function ts_sort_default(a,b) {
    aa = ts_getInnerText(a.childNodes[SORT_COLUMN_INDEX]);
    bb = ts_getInnerText(b.childNodes[SORT_COLUMN_INDEX]);
    if (aa==bb) return 0;
    if (aa<bb) return -1;
    return 1;
}


// My own sort date function takes advantage of Date.parse.
function ts_sort_parsed_date(a,b) {
    aa = Date.parse(ts_getInnerText(a.childNodes[SORT_COLUMN_INDEX]));
    bb = Date.parse(ts_getInnerText(b.childNodes[SORT_COLUMN_INDEX]));

    if (aa==bb) return 0;
    if (aa<bb) return -1;
    return 1;
}

// I try to compare the blocked column as numbers because I want to order
// The Blocked SpamAssassin = 5 etc.
function ts_sort_blocked(a,b) { 
    aa = ts_getInnerText(a.childNodes[SORT_COLUMN_INDEX]).replace(/[^0-9]/g,'');
    bb = ts_getInnerText(b.childNodes[SORT_COLUMN_INDEX]).replace(/[^0-9]/g,'');

    aaa = parseInt(aa);
    bbb = parseInt(bb);
    if (!isNaN(aaa) && !isNaN(bbb))
        return aaa - bbb;
    else if (isNaN(aaa) && !isNaN(bbb))
        return -1;
    else if (!isNaN(aaa) && isNaN(bbb))
        return 1;
    else
        return ts_sort_default(a,b);
        
}

function ts_sort_email(a,b) {
    aa = ts_getInnerText(a.childNodes[SORT_COLUMN_INDEX]).toLowerCase();
    bb = ts_getInnerText(b.childNodes[SORT_COLUMN_INDEX]).toLowerCase();

    var order = 0;

    aaa = aa.split('@', 2)[1];
    bbb = bb.split('@', 2)[1];
    if (aaa==bbb) order = 0;
    else if (aaa<bbb) order = -1;
    else order = 1;

    if (order == 0)
    {
        aaa = aa.split('@', 2)[0];
        bbb = bb.split('@', 2)[0];
        if (aaa==bbb) order = 0;
        else if (aaa<bbb) order = -1;
        else order = 1;
    }
    //var debug = ['<', '=', '>'];
    //GM_log(aaa + ' ' + debug[order+1] + ' ' + bbb);
    return order;
}

// Just to formally declare that you can''t really sort the X column.
function ts_null_sort(a,b) {
    return 0;
}

function displayArray()
{
    var a = displayArray.array;
    var str = '';
    for (var i = 0; i < a.length; i++)
    {
        str += ts_getInnerText(a[i].childNodes[SORT_COLUMN_INDEX]) + '\n';
    }
    alert(str);
}
