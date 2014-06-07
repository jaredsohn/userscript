// ==UserScript==
// @name           PiratesAcceptGifts
// @namespace      Facebook
// @description    Accepts Pirates Gifts & Requests to join crew
// @version        0.2.0
// @include        http://www.facebook.com/reqs.php#confirm_16421175101_0
// @include        http://apps.facebook.com/piratesrule/index.php?recruited_id=*
// @include        http://apps.facebook.com/piratesrule/recruit.php?st=gift_all&action=accept*
// ==/UserScript==

var refreshPageTimer = null;

// Register Start Sequence
GM_registerMenuCommand('Pirates - Autoreceive', function() { document.location = 'http://www.facebook.com/reqs.php#confirm_16421175101_0'; });

//
// Pirates: Searching for crew invitations and gifts
//
if (document.location.href == 'http://www.facebook.com/reqs.php#confirm_16421175101_0') {
  GM_log('Pirates: Searching for Pirates invitations and gifts.');
  var requestsDiv = null;
  var button = null;

  var requestsSearch  = document.evaluate("//div[@id='confirm_16421175101_0']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  if (requestsSearch.snapshotLength == 0) {
    refreshPageTimer = window.setInterval(refreshPage, 30 * 1000);
  }
  else {
    var requestsDiv = requestsSearch.snapshotItem(0);

    var requests = 0;
    for (var childIndex = 0; childIndex < requestsDiv.childNodes.length; childIndex++) {
      var reqElement = requestsDiv.childNodes[childIndex];
      if (reqElement.tagName == 'DIV' && reqElement.id.indexOf('app_16421175101_') >= 0) {
        requests++;
        var buttons = reqElement.getElementsByTagName('input');
        if (buttons.length == 2) {
          button = buttons[0];
        }
      }
    }

    GM_log('Requests found: ' + requests);
    if (button != null) {
      button.click();
    }

  }
}

//
// Pirates: Just received a gift
//
if (document.location.href.indexOf('http://apps.facebook.com/piratesrule/recruit.php?st=gift_all&action=accept') == 0) {
  GM_log('Pirates: Accepting crew gifts.');
  var giftDialog = document.getElementById('app16421175101_content_row');
  if (giftDialog != null) {
    //var buttonContainer = giftDialog.childNodes[1].childNodes[1].childNodes[9];
    //var buttons = buttonContainer.getElementsByTagName('a');    
    //var returnButton = buttons[0];
    
    //clickElement(returnButton);
    document.location = 'http://www.facebook.com/reqs.php#confirm_16421175101_0';
  }
  else {
    document.location = 'http://www.facebook.com/reqs.php#confirm_16421175101_0';
  }
}

//
// Pirates: Just added a new crew member
//
if (document.location.href.indexOf('http://apps.facebook.com/piratesrule/index.php?recruited_id=') == 0) {
  GM_log('Pirates: Accepting crew invitations.');
  document.location = 'http://www.facebook.com/reqs.php#confirm_16421175101_0';
}



//
// Support Routines
//
function clickElement(elt) {
  if (!elt) {
    GM_log('BUG DETECTED: Null element passed to clickElement().');
    return;
  }
  
  // Simulate a mouse click on the element.
  var evt = document.createEvent('MouseEvents');
  evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  elt.dispatchEvent(evt);
}

function refreshPage() {
  document.location.reload();
}