//
//
// Snipestreet Express user script
// version TGB 1.1
// 2011-10-05
// Copyright (c) 2011
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// Based on the "Add to SnipeStreet" script by escargot
// at http://userscripts.org/scripts/review/11120
// Which is:
// Based on the AuctionSniper script by Scott Winder
// at http://userscripts.org/scripts/show/3410
//
// Testing support of new ebay format June 2009.
// Moved from alpha to beta status, no code changes. 2009/08/22.
// 
// Fixed by The_Great_Beast on 2011-08-31
// Fixed again by SnipeStreet on 2011-10-05
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          SnipeStreet TGB v1.1
// @description   Adds a quick-entry SS form to eBay auction pages.
// @include       http://*.ebay.com/*
// ==/UserScript==

var popup=1;

//alert("foobar5")

//var idLoc = location.pathname.indexOf("QQitemZ");
// http://ebay.com/itm/NOKIA-N900-UNLOCKED-3-5-TOUCHSCREEN-5MP-CAM-CELL-PHONE-/170475376977?cmd=ViewItem&pt=Cell_Phones&hash=item27b11fd151
// location.pathname is "/itm/NOKIA-N900-UNLOCKED-3-5-TOUCHSCREEN-5MP-CAM-CELL-PHONE-/170475376977"
var idLoc = location.pathname.indexOf("FOOBAR");
var itemId, endLoc, btnHTML;
//var itemId = "INIT";

//alert("tt idLoc is " + idLoc);
//alert("path: " + location.pathname);

// Quit if this is not an item page. Don't want to have a snipe button on other ebay pages.
var isItemPage = location.pathname.indexOf("/itm/");
if (isItemPage == -1) {
  exit;
}

// Test if this is a good url/path.
var isBadUrl = location.pathname.indexOf("ViewItemDesc");
var slashLoc = 0;

// If not bad url, then it's a good url.
if (isBadUrl == -1) {
  // Find the position of the last slash in the pathname.
  slashLoc = location.pathname.lastIndexOf("/");
  itemId = location.pathname.substring(slashLoc + 1);
  //alert("itemId: " + itemId);
  //alert("pathname: " + location.pathname + " " + slashLoc + " " + itemId);
} else {
  // When loading an item's page, sometimes this script will run for pathname containing 'ViewItemDesc'. Skip these.
  exit();
}

//alert("After if-block, itemId: " + itemId);

//if (idLoc != -1) {
//     window.alert("foo: " + idLoc)
//     idLoc += 7;
//     endLoc = location.pathname.indexOf( "QQ", idLoc );
//     itemId = location.pathname.substring( idLoc, endLoc );
//    window.alert("SS: code 4");
//} else {
//     //window.alert("SS: code 11");
//     idLoc = location.search.indexOf("&item=");
//     if ( idLoc != -1 ) {
//         idLoc += 6;
//         var endLoc = location.search.indexOf( "&", idLoc );
//         if ( endLoc <= idLoc ) {
//             endLoc = location.search.length;
//         }
//         itemId = location.search.substring( idLoc, endLoc );
//     }
//}

//alert(itemId)

//window.alert("SS: code 99, item=" + itemId);

if (idLoc != "INIT") {
     //window.alert("SS: code 21");
     //var watchCell = document.getElementById("watchItemMiddleRow");
     // Elementid browsecategoriesitem stopped working 4/15/2010.
     //var watchCell = document.getElementById("browsecategoriesitem");
     // 'MyEbay' id worked fine, but it meant SS box was too high on the page.
     //var watchCell = document.getElementById("MyEbay");
     // Find the DIV we want to insert our code before.
     var watchCell = document.getElementById("gnheader");

     //var watchLink = 0;
     //for ( var i = 0; i < document.links.length; i++ ) {
     //   if ( document.links.item(i).href.indexOf( "&print=all&" ) != -1 ) {
     //           watchLink = document.links.item(i);
     //           break;
     //   }
     //}


     if (watchCell) {
         //alert("SS: code 42");
         //var snipeCell = document.createElement("td");
         // 4/18/2010: Changed from TD to DIV. More flexible, can put DIV almost anywhere.
         // 10/05/2011: Fixed bug: variable 'onsubmit' was not declared with 'var' keyword.
         // snipeCell will be inserted before the watchCell.
         var snipeCell = document.createElement("div");
         var snipeBtn = document.createElement("div");
         snipeCell.id = "sniping";
         //snipeCell.setAttribute("valign", "top");
         //snipeCell.setAttribute("nowrap", "");
         //snipeCell.setAttribute("align", "right");
         // Insert our empty DIV before watchCell.
         watchCell.parentNode.insertBefore(snipeCell, watchCell);

         // Build the contents of our snipeCell.
         var onsubmit='window.open("",this.target,"height=500,width=500,resizable=yes,scrollbars=yes,status=no");return true;'
         btnHTML= '<form name="form1" method="post" action="http://snipestreet.com/" ';
            if(popup==1) {
               btnHTML=btnHTML+'target="newpopup" onsubmit='+ onsubmit;
            }
            btnHTML=btnHTML+ '>'+
            '<input type="hidden" name="itemnum" value="' + itemId + '">'+
            'Bid: <input type="text" name="bidinfo" maxlength="20" size="10">'+
            '<input type="submit" name="Submit" value="SnipeStreet" class="navigation"><br>'+
            '<input type="hidden" name="signal" value="gm">'+
            '</form></div>';
         snipeBtn.innerHTML = btnHTML;

         // Stuff the html form inside our snipeCell.
         snipeCell.appendChild(snipeBtn);
     }
 }
