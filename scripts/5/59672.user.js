// ==UserScript==
// @name           MafiaWarsAcceptGifts
// @namespace      Facebook
// @description    Accepts Mafia Wars Gifts & Requests to join mafias
// @version        0.2.0
// @include        http://www.facebook.com/reqs.php#confirm_10979261223_0
// @include        http://apps.facebook.com/inthemafia/index.php?query_params=eHdfY29udHJvbGxlcj1pbnRlcnN0aXRpYWwmeHdfYWN0aW9uPWFjY2VwdF9naWZ0JmZyb21fdXNlcj0*
// @include        http://apps.facebook.com/inthemafia/index.php?query_params=eHdfY29udHJvbGxlcj1yZWNydWl0Jnh3X2FjdGlvbj12aWV3
// ==/UserScript==

var refreshPageTimer = null;

// Register Start Sequence
GM_registerMenuCommand('Mafia Wars - Autoreceive', function() { document.location = 'http://www.facebook.com/reqs.php#confirm_10979261223_0'; });

//
// Mafia Wars: Searching for mafia invitations and gifts
//
if (document.location.href == 'http://www.facebook.com/reqs.php#confirm_10979261223_0') {
  GM_log('Mafia Wars: Searching for Mafia invitations and gifts.');
  var requestsDiv = null;
  var button = null;

  var requestsSearch = document.getElementById('confirm_10979261223_0');
  if (requestsSearch == null) {
    refreshPageTimer = window.setInterval(refreshPage, 30 * 1000);
  }
  var parentElement = requestsSearch.parentNode;

  for (var divIndex = 0; divIndex < parentElement.childNodes.length; divIndex++) {
    var requestsContainer = parentElement.childNodes[divIndex];
    if (requestsContainer.tagName == 'DIV' && requestsContainer.id.indexOf('confirm_10979261223_') >= 0) {
      requestsDiv = requestsContainer;
      var requests = 0;
      for (var childIndex = 0; childIndex < requestsDiv.childNodes.length; childIndex++) {
        var reqElement = requestsDiv.childNodes[childIndex];
        if (reqElement.tagName == 'DIV' && reqElement.id.indexOf('app_10979261223_') >= 0) {
          requests++;
          var buttons = reqElement.getElementsByTagName('input');
          if (buttons.length == 2) {
            button = buttons[0];
          }
        }
      }

      //GM_log('Requests remaining: ' + (requests-1));
      if (button != null) {
        button.click();
        break;
      }
    }
  }
}

//
// Mafia Wars: Just received a gift
//
if (document.location.href.indexOf('http://apps.facebook.com/inthemafia/index.php?query_params=eHdfY29udHJvbGxlcj1pbnRlcnN0aXRpYWwmeHdfYWN0aW9uPWFjY2VwdF9naWZ0JmZyb21fdXNlcj0') == 0) {
  GM_log('Mafia Wars: Accepting mafias gifts.');
  var giftDialog = document.getElementById('app10979261223_inner_page');
  if (giftDialog != null) {
    //var buttonContainer = giftDialog.childNodes[1].childNodes[1].childNodes[9];
    //var buttons = buttonContainer.getElementsByTagName('a');    
    //var returnButton = buttons[0];
    
    //clickElement(returnButton);
    document.location = 'http://www.facebook.com/reqs.php#confirm_10979261223_0';
  }
  else {
    document.location = 'http://www.facebook.com/reqs.php#confirm_10979261223_0';
  }
}

//
// Mafia Wars: Just added a new mafia member
//
if (document.location.href.indexOf('http://apps.facebook.com/inthemafia/index.php?query_params=eHdfY29udHJvbGxlcj1yZWNydWl0Jnh3X2FjdGlvbj12aWV3') == 0) {
  GM_log('Mafia Wars: Accepting mafias invitations.');
  document.location = 'http://www.facebook.com/reqs.php#confirm_10979261223_0';
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