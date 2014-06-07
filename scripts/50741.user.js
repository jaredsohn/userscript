// Snipestreet Express user script
// version 0.1
// 2008-06-30
// Copyright (c) 2008
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
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          SS testing script
// @description   Testing alert box.
// @include       http://cgi.ebay.tld/*
// ==/UserScript==

 var popup=1;

 var idLoc = location.pathname.indexOf("QQitemZ");
 var itemId, endLoc, btnHTML;

 if (idLoc != -1) {
     idLoc += 7;
     endLoc = location.pathname.indexOf( "QQ", idLoc );
     itemId = location.pathname.substring( idLoc, endLoc );
     window.alert("SS: code 4");
 } else {
     window.alert("SS: code 11");
     idLoc = location.search.indexOf("&item=");
     if ( idLoc != -1 ) {
         idLoc += 6;
         var endLoc = location.search.indexOf( "&", idLoc );
         if ( endLoc <= idLoc ) {
             endLoc = location.search.length;
         }
         itemId = location.search.substring( idLoc, endLoc );
     }
 }

 window.alert("SS: code 99, location=" + idLoc + ", item=" + itemId);

 if (idLoc != -1) {
     window.alert("SS: code 21");
     var watchCell = document.getElementById("watching");
     //var watchCell = document.getElementById("watchItemMiddleRow");
     if (watchCell) {
         window.alert("SS: code 42");
         var snipeCell = document.createElement("td");
         snipeCell.id = "sniping";
         // next line matches new page format class.
         //snipeCell.setAttribute("class", "vi-is1-solid");
         snipeCell.setAttribute("valign", "top");
         snipeCell.setAttribute("nowrap", "");
         snipeCell.setAttribute("align", "right");
         watchCell.parentNode.insertBefore(snipeCell, watchCell);
         // NOTE: There is no "insertAfter" fn, unless you make a custom fn!
         //watchCell.parentNode.insertAfter(snipeCell, watchCell);
         onsubmit='window.open("",this.target,"height=500,width=500,resizable=yes,scrollbars=yes,status=no");return true;'
         var snipeBtn = document.createElement("div");
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
         snipeCell.appendChild(snipeBtn);
     } else {
          window.alert("SS: code 55");
     }
 } else {
         window.alert("SS: code 38");

 }