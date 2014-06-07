// ==UserScript==
// @name          Rent-Direct Maps
// @namespace     http://propertycircus.blogspot.com/
// @description   Create links to google maps for properties listed on rent-direct.com
// @include       http://www.rent-direct.com/dynamic/*
// ==/UserScript==
//
// --------------------------------------------------------------------
//  Copyright Adam Fleming 2005
//  Use of this script is free.
//  Distribution of this script requires credit given to 
//  myself in the form of a link to my blog:  
// 
//    http://propertycircus.blogspot.com/
//
// --------------------------------------------------------------------


// This function creates a link to the google map that is 
// associated with a specific street address
function createGoogleMapsLink(street, city, state){
  return ('<a href="foo.com">foobie doo</a>');
}


// This function trims strings and replaces inner ' ' with '+'
function trim(stringy) {
  stringy = stringy.replace( /^\s+/g, "" );// strip leading
  stringy = stringy.replace( /\s+$/g, "" );// strip trailing
  stringy = stringy.replace (/\s+/g, "+" );// replace inner with '+'
  return stringy;
}


// Dig through the tables, find the table we're intersted in, and 
// find the cells that we want to append stuff to.
// We want the table that is the first-child of the form element, 
// and then all the TD's for the THIRD column, then all the A elements.
var allLinks = document.evaluate(
  '//form/*[position()=1][self::table]//td[position()=3]//a', 
  document, 
  null, 
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
  null);

var newElement;
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    // insert an element after the link.
    newElement = document.createElement('a');
    newElement.innerHTML='Google Map';
    newElement.href='http://maps.google.com/maps?f=q&hl=en&q='+trim(thisLink.text)+',+New+York+NY';
    thisLink.parentNode.appendChild(document.createElement('BR'));
    thisLink.parentNode.appendChild(newElement);
}