// ==UserScript==
// @name           Farm Town Auto-Neighbor
// @namespace      krohn.ky
// @description    Automatically add Farm Town playing friends as neighbors.
// @include        http://apps.facebook.com/farmtown/friends*
// @version 1.0.0
// @contributor StevenD
// @contributor Mayank Singhal
// ==/UserScript==


GM_log('Running FarmTown friends script.');

var sendTries = 0;
var friends = xpath('//input[@id="send"]');

GM_log('Found ' + friends.snapshotLength + ' potential friends.');

var friend = friends.snapshotItem(0);
if (!friend.value.match(/Neighbor Request/)) {
  GM_log('Clicking "' + friend.value + '"');
  friend.click();
  setTimeout(send, 5000);
}

return;


// xpath function courtesy of StevenD's excellent MafiaWars Autoplayer script
function xpath(query, element) {
  var element = (element == null) ? document : element;
  return document.evaluate(query, element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Modified version of send function courtesy of Myank Singhal's Farmville Auto Accept script
function send() {
  sendTries++;
  
  if (!(document.getElementById("pop_content"))) {
    if (sendTries < 3) {
      GM_log('Still waiting for send window.');
      setTimeout(send, 2000);
    } else {
      GM_log('Gave up waiting for send window.');
    }
  } else {
   
    var err = xpath('//div[@id="pop_content"]/h2/span');
    if (err && err.snapshotLength > 0) {
      if (err.snapshotItem(0).firstChild.nodeValue.match(/Out of requests/)) {
        GM_log('No more requests!');
        return;
      }
    }
  
    var arr = document.getElementById("pop_content").getElementsByTagName("input");
    var it = 0;
    for (i=0;i<arr.length;i++) {
      if (arr[i].value="Send") {
        arr[i].click();
        it = 1;
      }
    }

    if (it!=1) {
      if (sendTries < 3) {
        GM_log('Could not find send button.  Trying again.');
        setTimeout(send, 2000);
      } else {
        GM_log('Gave up looking for send button.');
      }
    } else {
      GM_log('Successfully sent request.');
    }
  }
}