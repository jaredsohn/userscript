// SkyscraperCity new threads opener
// version 0.1 BETA!
// 2014-02-17
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
// select "SkyscraperCity new threads opener", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          skyscrapercity unread threads opener
// @description   open unread threads in separates tab
// @include       http://www.skyscrapercity.com/tags.php*
// @include       http://www.skyscrapercity.com/subscription.php
// ==/UserScript==

(function() { 

	//GM_log ('script start');
	var threadTable = getTable();
    
    if (getAllUnread() > 0) {
       var openAllLinks = document.createElement('a');
       openAllLinks.href = '#';
       openAllLinks.addEventListener('click', openAllUnread, false);
       openAllLinks.appendChild(document.createTextNode(' Open All unread threads'));
       threadTable.rows[0].cells[0].appendChild(openAllLinks);
    }
 
})();

function getAllUnread() {
    return openAllUnread(1)
}
function openAllUnread(callType) {
    var toOpen = 0;
    var threadTable = getTable();
    var url = window.location.href;
    var expectedColumnNumber = -1
    if (url.contains('subscription.php')) {
       expectedColumnNumber = 6;
    } else if(url.contains('tags.php')) {
       expectedColumnNumber = 7; 
    }
    if (threadTable != null) {
       GM_log ('threadTable exist'); 
       var rowsCount = threadTable.rows.length;
       for(var i=0; i<threadTable.rows.length;i++){
          var row = threadTable.rows[i];
          cellCount = row.cells.length;
           if(cellCount == expectedColumnNumber) {
              var fCell = row.cells[0];
              var img = fCell.querySelector('IMG');
               if(img.src.substr(-8) == '_new.gif') {                   
                   //fCell.style.backgroundColor = '#f00'; 
                   links = row.cells[2].querySelectorAll('A');
                   links[links.length-1].style.color="magenta";
                   if(callType != 1) {
                      GM_openInTab(links[links.length-1].href);
                   }
                   toOpen++;
               }

           }
    
       }
    }
    if (callType == 1)
       return toOpen;
    else
       return false;

}

function getTable() {
	var threadTable = document.getElementById('threadslist');
    if (threadTable == null) {
        threadTable = document.querySelector('form[action*="dostuff"] table');        
    } 
    return threadTable;
}
