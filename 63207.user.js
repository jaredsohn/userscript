// ==UserScript==
// @name           QuickenOnline - display Note text in transaction area
// @namespace      http://www.quickenonline.intuit.com
// @description    Quicken Online's latest update hides notes in a "Details" panel. This script displays notes on the main screen.
// @include        https://www.quickenonline.intuit.com/quickenweb/pages/main/transactions.jsf
// @include        https://www.quickenonline.intuit.com/quickenweb/pages/main/account-activity.jsf
// @include        https://www.quickenonline.intuit.com/quickenweb/pages/main/trends.jsf
// ==/UserScript==

window.addEventListener(
  'load', 
  function () {
// ===== begin event listener =====
// code goes here

      var setTimeoutID;
			var aryNotes = new Array();
      var aryTransactionsID = new Array();
			aryTransactionsID['trends.jsf'] = 'grid-panel-anchor';
			aryTransactionsID['transactions.jsf'] = 'transactions-grid-anchor';

      function RecreateVisibleNotes() {
        aryNotes.length = 0;
        
        var aryURLParts, allImages, thisImage, classArray, noteIcon, noteText;

				// Define ID of transaction-area element, depending on page displayed
        aryURLParts = document.URL.split("/");
				// Abort if not on a page that has a transaction area
				if(typeof(aryTransactionsID[aryURLParts[aryURLParts.length-1]]) == "undefined"){return;}
				var transactionArea = document.getElementById(aryTransactionsID[aryURLParts[aryURLParts.length-1]]);
				if (!transactionArea) {
					// If transactions haven't finished loading, wait 3 seconds and retry
					setTimeoutID = setTimeout(RecreateVisibleNotes,3000);
					return;
				}
        // Scan all images in transaction area to locate note icons
        allImages = transactionArea.getElementsByTagName('img');
        for (var i = 0; i < allImages.length; i++) {
          thisImage = allImages[i];
          classArray = thisImage.className.split(" ");
          for (var j = 0; j < allImages.length; j++) {
            // If an image bears the 'note-icon' class, store it
            if (classArray[j] == 'note-icon') {
              aryNotes[aryNotes.length] = thisImage;
            }
          }
        }

//document.getElementById("link-settings").textContent = aryNotes.length + " note icons found";
        // Add a text-note sibling to all note icons
        for ( var i = 0; i < aryNotes.length; i++ ) {
          noteIcon = aryNotes[i];
         
          // Create a new text note
           noteText=document.createElement('span');
           noteText.setAttribute('class','note-text');
           noteText.textContent = noteIcon.getAttribute('ext:qtip');
           
           // Add the new text note to the parent of the note icon img
           noteIcon.parentNode.appendChild(noteText);
           
           // Note's table cell should not be right-aligned
           noteIcon.parentNode.parentNode.style.textAlign = 'left';

        }

        // Add styles
        document.styleSheets[0].insertRule(".x-grid3-col-6 { text-align: left; }", 0); 
        document.styleSheets[0].insertRule(".note-icon {position: absolute; padding-left: 0 !important; opacity: 0.33;}", 0); 
        document.styleSheets[0].insertRule(".note-text {font-size: 11px;}", 0); 

				// Done - clear Timeout so function is no longer 
      }

      RecreateVisibleNotes();

// ===== end event listener =====
  },
    true);

