// ==UserScript==
// @name           Anandtech VB - PM window on left
// @namespace      hg
// @include        http://forums.anandtech.com/*
// ==/UserScript==

// -- Find Left Side --
var navsearch = document.evaluate("//tbody[@id='collapseobj_leftsidebar_1']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(navsearch.snapshotLength > 0) 
{ 
    var nav = navsearch.snapshotItem(0);
    var navtable = nav.parentNode;
    var navparent = navtable.parentNode;
}
else { return; }
// !-- Find left side --


// -- Find PM element --
var pmwindow = document.evaluate("//div[@class='page']/div[@align='left']/table[@class='tborder']//td[@class='alt2']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(pmwindow.snapshotLength > 0)
{
    var pmcolumn = pmwindow.snapshotItem(0);
    pmcolumn.removeAttribute('nowrap');
}
else { return; }
// !-- Find PM element --


// -- Create PM table --
var pmtable = document.createElement('table'); 
pmtable.setAttribute('class','tborder');
pmtable.setAttribute('width','100%');
pmtable.setAttribute('cellspacing','1');
pmtable.setAttribute('cellpadding','6');
pmtable.setAttribute('border','0');

var pmtablebody = document.createElement('tbody'); 
var pmtablerow = document.createElement('tr'); 

pmtablerow.appendChild(pmcolumn);
pmtablebody.appendChild(pmtablerow);
pmtable.appendChild(pmtablebody);
// !-- Create PM table --


// -- Add to Nav Menu --
navparent.insertBefore(pmtable, navtable);
// !-- Add to Nav Menu --