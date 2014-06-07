// ==UserScript==
// @name          GMail Address Swapper
// @namespace     http://swaroop.in
// @description   This script will swap the 'To' and 'CC in the email compose pages
// @include       https://mail.google.com/*
// ==/UserScript==

var CANVAS = null;

function swapAddresses() {
  var composeIFrame=document.getElementById('canvas_frame');
  var iFrameDocument=(composeIFrame.contentWindow || composeIFrame.contentDocument);
  if(iFrameDocument.document){
    iFrameDocument=iFrameDocument.document;
  }
  var to=iFrameDocument.getElementsByName('to')[0];
  var cc=iFrameDocument.getElementsByName('cc')[0];
  var temp=to.value;
  to.value=cc.value;
  cc.value=temp;
}

function addSwapButton() {

    // If already added the Swap button, don't add it again
    if(CANVAS.contentDocument.getElementById('GmailAddressSwapperDiv')) {
      return;
    }
    
    // Get the iFrame's Document
    var CANVAS_DOCUMENT = CANVAS.contentDocument;
    
    // The 'To' Element
    var to=CANVAS_DOCUMENT.getElementsByName('to');
    
    if(to.length > 0) {
      to = to[0];
      // to.parentNode == td, td.parentNode = tr, tr.parentNode = table
      var tbodyRef = to.parentNode.parentNode.parentNode;
      
      // TR->TD->Span
      var firstTRsTD = tbodyRef.childNodes[0].childNodes[0].childNodes[0];
      
      var firstTRsTDInnerHTML = firstTRsTD.innerHTML;

      firstTRsTDInnerHTML = "<div style='text-align:right'>" + firstTRsTDInnerHTML + "</div>";
      // Inject the button dynamically

      firstTRsTD.innerHTML = firstTRsTDInnerHTML + '<div id="GmailAddressSwapperDiv" style="float:right; width: 18px; height: 18px; overflow: hidden; position: relative;">'
                + '<img style="position: absolute; left: -18px; top: 0px; -moz-user-select: none; border: 0px none; padding: 0px; '
                + 'margin: 0px;" src="http://maps.gstatic.com/intl/en_ALL/mapfiles/dir/dl2.png"></div>';

      var gmailAddressSwapperDiv = CANVAS_DOCUMENT.getElementById('GmailAddressSwapperDiv');
      gmailAddressSwapperDiv.addEventListener('click', swapAddresses, false);

    } else {
      GM_log("To text element not found - you must not be on the Compose page, All is fine");
    } 
}

// Calls the addSwapButton() after the page has completed loading the "Compose" iFrame
if (!window.top || top.location.href == window.location.href) {
  setInterval(function() {
    CANVAS = document.getElementById("canvas_frame");
    if (CANVAS && CANVAS.contentDocument && CANVAS.contentDocument.readyState === "complete") {
      addSwapButton();
    }
  }, 1000);
}