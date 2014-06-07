// ==UserScript==
// @name           Gmail - Hide Selected Label
// @namespace      http://www.jonnyelvis.com
// @description    Hides the labels for the currently viewed tag as a workaround to the fact that GMail now shows all labels in the thread pane.
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// ==/UserScript==
//
// **** History **************************************************************
//
// Version 1.0.0 - 2009-02-04:
//    - Initial version
//
// Version 1.0.1 - 2009-02-12:
//    - Update LABEL_XPATH based on new internal structure of GMail.
//
// Version 1.1.0 - 2009-02-18:
//    - Added a backup method for finding label elements that is slower, but
//    should work if/when Google changes the structure of the GMail page.
//    Updates will still be made to match the page so we can find and remove
//    labels as efficiently as possible, but this will keep things going in the
//    mean time.
//
// Version 1.2.0 - 2009-03-03:
//    - Update LABEL_XPATH based on new internal structure of GMail.
//    - Add delay before checking for unsafeWindow.gmonkey since it is not
//    always loaded by the time that the load event occurs.
//
// Version 1.3.0 - 2009-03-09:
//    - Modify the level at which labels are hidden to catch the little dot of
//    color that was still visible when using colored labels.
//    - Add hiding of GMail's "special" labels - "Sent Mail", "Drafts",
//    "All Mail", "Spam", "Trash".  This should work for non-English
//    localizations as well.
//
// Version 1.3.1 - 2009-03-13:
//    - Fixed bug causing slow/backup xpath expression to fail.
//    - Update LABEL_XPATH based on new internal structure of GMail.
//
// Version 1.3.2 - 2009-11-25:
//    - Replaced call to gmail.getNavPaneElement() with call to
//    getNavPaneElement() since the GMail API is broken as of 2009-11-17 (See:
//    http://www.google.com/support/forum/p/gmail/thread?tid=6986eb30d71ec31a&hl=en)
//    - Update LABEL_XPATH based on new internal structure of GMail.
//
// ***************************************************************************

//refresh is set only once, in the top frame
if(document.location == top.location){
(function(){

window.addEventListener('load', function() {
   window.setTimeout( function() {
      if (unsafeWindow.gmonkey) {
         unsafeWindow.gmonkey.load('1.0',

            function(gmail) {

               var canvasDoc = null;
               if( ! canvasDoc ) {
                  var canvasFrame = document.getElementById('canvas_frame');
                  if( canvasFrame ) {
                     canvasDoc = canvasFrame.contentDocument;
                  }
               }

               var navPane = null;
               // 2009-11-25: Backup XPaths since the GMail API is not working correctly
               var navPane_XPath      = '/html/body/div[1]/div[2]/div/div[2]/div[1]/div[2]'; // 2009-11-25
               function getNavPaneElement()
               {
                  if( ! navPane ) {
                     navPane = canvasDoc.evaluate(navPane_XPath, canvasDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                  }
                  return navPane;
               }

               // Utility Functions {{{
               /**
                * Determine if there is a special label for "Outbox" to see if
                * Offline GMail is in use.
                */
               function hasOutbox() {
                  var navPane = getNavPaneElement();
                  var OutboxXPath = SPECIAL_LABELS_XPATH_1 + "[" + OUTBOX_NUM + "]//a[@href='https://mail.google.com/mail/#outbox']";
                  var xpr = navPane.ownerDocument.evaluate(OutboxXPath, navPane, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                  return (xpr.singleNodeValue != null);
               }

               /**
                * Gets the special NavPane label indicated by the number <n>.
                */
               function getSpecialLabel(n) {
                  var label = null;
                  if( SPECIAL_LABELS[n] != null ) {
                     label = SPECIAL_LABELS[n];
                  } else {
                     var navPane = getNavPaneElement();
                     if( navPane != null ) {
                        var xpr = navPane.ownerDocument.evaluate(SPECIAL_LABELS_XPATH_1 + "[" + n + "]" + SPECIAL_LABELS_XPATH_2, navPane, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                        if( xpr != null ) {
                           SPECIAL_LABELS[n] = label = xpr.singleNodeValue.nodeValue.replace(/ \(\d+\)$/, '');
                        }
                     }
                  }
                  return label;
               }
               // }}} END Utility Functions

               // GMail XPaths {{{

               // XPath strings for the label DIVs:
               // Short, simple version, but takes a lot more time than the long one
               // var LABEL_XPATH_SLOW = "//div[@class='krEW7c']" // 2009-02-04
               //var LABEL_XPATH_SLOW = "//div[contains(@class, 'av')]" // 2009-03-03
               var LABEL_XPATH_SLOW = "//div[contains(@class, 'ar as')]" // 2009-03-09
               var labelXPathSlowExpression = null;

               // Long version, much faster than the short version:
               // var LABEL_XPATH = "./div/div[5]/div/table/tbody/tr/td/div/div/div/div[1]/div/div/div[@class='krEW7c']"     // 2009-02-04
               // var LABEL_XPATH = "./div/div[5]/div/div/table/tbody/tr/td/div/div/div/div[1]/div/div/div[@class='krEW7c']" // 2009-02-12
               // var LABEL_XPATH = "./div/div[5]/div/div/table/tbody/tr/td/div/div/div/div[1]/div/div/div[contains(@class, 'av')]" // 2009-03-03
               // var LABEL_XPATH = "./div/div[5]/div/div/table/tbody/tr/td/div/div/div/div[1][contains(@class, 'ar as')]" // 2009-03-09
               // var LABEL_XPATH = "./div/div[5]/div/div/div/div/table/tbody/tr/td/div/div/div/div[1][contains(@class, 'ar as')]" // 2009-03-13
               var LABEL_XPATH = "./div/div[5]/div/div/div/div[1]/table/tbody/tr/td[5]/div/div/div[1]/div[1][contains(@class, 'ar as')]" // 2009-11-25
               var labelXPathExpression = null;

               // Relative to the root of the Navigation Pane
               var SPECIAL_LABELS_XPATH_1 = "./div/div[2]/div/div/div/div[1]/div/div";                   // 2009-03-09
               var SPECIAL_LABELS_XPATH_2 = "/div/div/div[2]/div/div/div/div/div/span/div/div/a/text()"; // 2009-03-09

               // Boolean to set to true after logging the use of the slow
               // XPath once so we don't log it all the time.
               var DID_LOG_SLOW_METHOD = false;

               // }}} END GMail XPaths

               // Constants indicating where the "special" labels show up in the Nav Pane (Assume this is constant...)
               var i = 4;
               var SENT_MAIL_NUM = i++;
               var OUTBOX_NUM    = i;   // Only present if Offline GMail is being used
               if( hasOutbox() ) i++;
               var DRAFTS_NUM    = i++;
               var ALL_MAIL_NUM  = i++;
               var SPAM_NUM      = i++;
               var TRASH_NUM     = i++;

               var SPECIAL_LABELS = new Array();

               function updateViewEvent(e) {
                  updateView();
               }

               function updateView() {
                  if( gmail.getActiveViewType() == 'tl' ) {
                     var i = 0;
                     var currentLabel = null;
                     if( (i = top.location.href.indexOf('label/', 0) ) >= 0 ) {
                        currentLabel = unescape(top.location.href.substring(i+6).replace(/\+/g, ' '));
                     } else if ( (i = top.location.href.indexOf('#', 0) ) >= 0 ) {
                        switch (top.location.href.substring(i+1)) {
                           case "sent":
                              currentLabel = getSpecialLabel(SENT_MAIL_NUM);
                              break;
                           case "outbox":
                              currentLabel = getSpecialLabel(OUTBOX_NUM);
                              break;
                           case "drafts":
                              currentLabel = getSpecialLabel(DRAFTS_NUM);
                              break;
                           case "all":
                              currentLabel = getSpecialLabel(ALL_MAIL_NUM);
                              break;
                           case "spam":
                              currentLabel = getSpecialLabel(SPAM_NUM);
                              break;
                           case "trash":
                              currentLabel = getSpecialLabel(TRASH_NUM);
                              break;
                           default:
                              currentLabel = null;
                              break;
                        }
                     }

                     if( currentLabel != null ) {
                        var threadPane = gmail.getActiveViewElement();
                        threadPane.id = 'threadPane';
                        if( labelXPathExpression == null ) {
                           labelXPathExpression = threadPane.ownerDocument.createExpression(LABEL_XPATH, null);
                        }
                        var label_snapshot = labelXPathExpression.evaluate(threadPane, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                        //var label_snapshot = threadPane.ownerDocument.evaluate(LABEL_XPATH, threadPane, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

                        // If that query did not return any nodes, Assume that the
                        // GMail page structure has changed, try using the
                        // slow-but-sure XPath:
                        if( label_snapshot.snapshotLength < 1 ) {
                           if( labelXPathSlowExpression == null ) {
                              labelXPathSlowExpression = threadPane.ownerDocument.createExpression(LABEL_XPATH_SLOW, null);
                           }
                           //label_snapshot = threadPane.ownerDocument.evaluate(LABEL_XPATH_SLOW, threadPane, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                           label_snapshot = labelXPathSlowExpression.evaluate(threadPane, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                           if( !DID_LOG_SLOW_METHOD ) {
                           GM_log("Using slow-but-sure XPath to find label nodes.  GMail page structure may have changed...");
                              DID_LOG_SLOW_METHOD = true;
                           }
                        }

                        var node = null;
                        i = 0;
                        while( node = label_snapshot.snapshotItem(i++) ) {
                           if( node.textContent == currentLabel ) node.style.display = "none";
                        }
                        // https://developer.mozilla.org/en/DOM_Events
                        // http://www.w3.org/TR/DOM-Level-3-Events/events.html
                        //
                        // Watch for updates to the thread list that may reset the
                        // visibility of the currently displayed labels.  The
                        // first (commented out) version will definitely catch it,
                        // but it will also catch a lot of other stuff.  The
                        // second will hopefully be more narrowly focused, but it
                        // may be harder to maintain due to more frequent changes.
                        //   threadPane.addEventListener('DOMSubtreeModified', updateViewEvent, true);
                        threadPane.firstChild.childNodes[4].firstChild.addEventListener('DOMSubtreeModified', updateViewEvent, true);
                     }
                  }
               }

               gmail.registerViewChangeCallback(updateView);
               updateView();
            });
      }
   }, 500 ); // TODO: Make configurable option...
}, true);

})();
}
