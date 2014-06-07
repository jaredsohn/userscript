// ==UserScript==
// @name           YahooCalToGoogleCal
// @namespace      http://userscripts.org/users/31721
// @include        http://groups.yahoo.com/*
// @version        $Revision: 1.4 $
// @date           $Date: 2008/09/01 18:46:26 $
// @description    Creates an "Add to Google Calendar" link from Yahoo! calendar link.
// @author         Bill Skellenger
// @email          skellenger.net@williamj
// ==/UserScript==

// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details:
// <http://www.gnu.org/licenses/gpl.txt>

// TODO:  Handle multiple events on one page.  Should not be too difficult to 
//        process all event links.  Convert most of main() into a new function
//        and call that function for each event link found.

/* ---- Define helper functions ---- */

// $x() function thanks to:
//http://wiki.greasespot.net/Code_snippets#XPath_helper
function $x(p, context) {
   if (!context) context = document;
   var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
   return arr;
}

// insertAfter() function thanks to:
//http://wiki.greasespot.net/Code_snippets#Insert_node_after_node
function insertAfter(newNode, node) {
   return node.parentNode.insertBefore(newNode, node.nextSibling);
}


//gup() function thanks to:
//http://www.netlobo.com/url_query_string_javascript.html
function gup( name, href )
{
   if (!href) href=window.location.href;
   name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
   var regexS = "[\\?&]"+name+"=([^&#]*)";
   var regex = new RegExp( regexS );
   var results = regex.exec( href );
   if( results == null )
      return "";
   else
      return results[1];
}

// setISO8601() function from 
// Google hCalendar Greasemonkey script
// http://greasemonkey.makedatamakesense.com/googlehcalendar/
Date.prototype.setISO8601 = function ( string )
{
    var regexp = "([0-9]{4})(-?([0-9]{2})(-?([0-9]{2})" +
        "([T ]([0-9]{2}):?([0-9]{2})(:?([0-9]{2})(\.([0-9]+))?)?" +
        "(Z|(([-+])([0-9]{2}):?([0-9]{2})))?)?)?)?";

    var d = string.match( new RegExp( regexp ) );

    if (!d) {
      //TODO:  Need to exit script completely here
      GM_log('Event found, but it has no start date?');
    }

    var offset = 0;
    var date = new Date( d[1] , 0 , 1 );

    if ( d[3] ) date.setMonth( d[3] - 1 );
    if ( d[5] ) date.setDate( d[5] );
    // Skellenger delete, Yahoo's time IS local time.
    //if ( d[7] ) date.setUTCHours( d[7] );
    //if ( d[8] ) date.setUTCMinutes( d[8]);
    //if ( d[10] ) date.setUTCSeconds( d[10]);
    // Skellenger insert
    if ( d[7] ) date.setHours( d[7] );
    if ( d[8] ) date.setMinutes( d[8]);
    if ( d[10] ) date.setSeconds( d[10]);
    if ( d[12] ) date.setMilliseconds( Number( '0.' + d[12] ) * 1000 );
    if ( d[14] ) 
    {
        offset = ( Number( d[16] ) * 60 ) + Number( d[17] );
        offset*= ( ( d[15] == '-' ) ? 1 : -1 );
    } // if

    // offset-= date.getTimezoneOffset();
    time = ( Number( date ) + ( offset * 60 * 1000 ) );
    this.setTime( Number( time ) );
} // Date.prototype.setISO8601


// GoogleDate function from:
// Google hCalendar Greasemonkey script
// http://greasemonkey.makedatamakesense.com/googlehcalendar/
function strGoogleDate( date ) {
   var year = date.getUTCFullYear();
   var month = date.getUTCMonth() + 1;
   if ( month < 10 ) month = '0' + month;
   var day = date.getUTCDate();
   if ( day < 10 ) day = '0' + day;
   var hours = date.getUTCHours();
   if ( hours < 10 ) hours = '0' + hours;
   var minutes = date.getUTCMinutes();
   if ( minutes < 10 ) minutes = '0' + minutes;
   var seconds = date.getUTCSeconds();
   if ( seconds < 10 ) seconds = '0' + seconds;
   return '' + year + month + day + 'T' + hours + minutes + seconds + 'Z';
}


// strip() was written by me.  :)
// It is inspired by Python's strip() function.
// It will clean up whitespace in a string.
function strip(str) {
   if (str == null)
      return null;
   str = String(str);
   //replace 2 or more spaces with one
   str = str.replace(/(\s{2,})/g, " ");
   //delete all other whitespace
   str = str.replace(/(^\s+)|(\s+$)|(\n)|(\t)|(\r)/g, ""); 
   return str;
}

/* ---- End helper functions ---- */

function main() {
   var DEBUG = 0;
   var CRLF = '%0d%0a';

   var dStart = new Date();
   var dEnd = new Date();

   // http://www.google.com/googlecalendar/event_publisher_guide_detail.html

   // Find links on the page to 'calendar.address.yahoo.com'
   var xpathquery  = './/a[starts-with(@href, "http://calendar.address.yahoo.com")] | '
       xpathquery += './/a[starts-with(@href, "http://calendar.yahoo.com")]'
   // TODO:  Now look at inner text of the link for "add to" or something
   var yCalLinks = $x(xpathquery);
   DEBUG ? console.log(yCalLinks) : {};

   if (yCalLinks[0]) {
      yCalHref = yCalLinks[0].href;
      DEBUG ? console.log(yCalHref) : {};
   }
   else {
      //TODO: Error of some kind.
      GM_log('Yahoo calendar link not found.');
      return;
   }

   // Extract URI Params
   var txtTitle = gup('TITLE', yCalHref);

   var txtLocation = gup('in_loc', yCalHref);
   var txtStreet = gup('in_st', yCalHref);
   var txtCityStateZip = gup('in_csz', yCalHref);

   var txtDesc = gup('DESC', yCalHref);
   var txtPhone = gup('in_ph', yCalHref);

   var txtStart = gup('ST', yCalHref);
   var txtDuration = gup('DUR', yCalHref);

   // create a location string
   var txtFinalLocation;
   txtFinalLocation = txtLocation;
   if (txtStreet) {
      txtFinalLocation += ', ' + txtStreet;
   }
   if (txtCityStateZip) {
      txtFinalLocation += ', ' + txtCityStateZip;
   }

   // create the description string
   var txtFinalDesc;
   txtFinalDesc = txtDesc;
   if (txtPhone) {
      txtFinalDesc += CRLF + CRLF + txtPhone;
   }

   if (DEBUG) {
      console.log(txtFinalDesc);
      console.log(txtCityStateZip);
      console.log(txtStreet);
      console.log(txtPhone);
      console.log(txtStart);
      console.log(txtTitle);
      console.log(txtFinalLocation);
      console.log(txtDuration);
   }

   // default duration is one hour
   if (!txtDuration) txtDuration = '0100';

   // convert duration to int
   intDurationHours = Number(txtDuration.substr(0,2));
   intDurationMins  = Number(txtDuration.substr(2,2));

   // init start/end date objects
   dStart.setISO8601(decodeURI(txtStart));
   dEnd.setTime(dStart.getTime());  //make copy of start time
   dEnd.setHours(dEnd.getHours()+intDurationHours);
   dEnd.setMinutes(dEnd.getMinutes()+intDurationMins);
   if (DEBUG) {
      console.log(dStart);
      console.log(dEnd);
      console.log(strGoogleDate(dStart));
      console.log(strGoogleDate(dEnd));
   }

   // This code inspired by google_hcalendar Greasemonkey script
   var googleLink = document.createElement('a');
   var googleImg = document.createElement('img');
   var simpleTR = document.createElement('tr');
   var simpleTD = document.createElement('td');

   googleLink.href  = 'http://www.google.com/calendar/event?action=TEMPLATE';
   googleLink.href += '&dates=' + strGoogleDate( dStart ) + '/' + strGoogleDate( dEnd );
   googleLink.href += '&location=' + strip( txtFinalLocation );
   googleLink.href += '&text=' + strip( txtTitle );
   googleLink.href += '&details=' + strip( txtFinalDesc );

   googleImg.src = 'http://www.google.com/calendar/images/ext/gc_button6.gif';
   googleImg.style.border = '0px';
   googleLink.appendChild(googleImg);

   simpleTD.appendChild(googleLink);
   simpleTR.appendChild(simpleTD); 

   // insert new row into table:
   //  table
   //     tr
   //       td
   //          a href  <--yCalLinks[0]
   //      /td
   //    /tr
   //     tr  <-- here we are
   //    /tr  <-- end
   // /table

   // XXX: I understand that the creation of a new row containing a single cell
   //      may not work well in all situations.

   insertAfter(simpleTR, yCalLinks[0].parentNode.parentNode);
}

main();
