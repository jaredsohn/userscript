// ==UserScript==
// @name           Google Homepage Custom GTalk Widget Height
// @namespace      www.screencast-o-matic.com
// @description    Customize the height of your google talk widget on your google homepage and shrink it if not hovered over
// @include        http://www.google.com/ig?hl=en*
// ==/UserScript==

var minHeight = "200px";
var maxHeight = "375px";

// Function to get google talk frame that we are working with
function getGTalk() {
  // Find gtalk 
  var iframes = document.evaluate(
    "//iframe",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

  for(var i=0; i<iframes.snapshotLength; i++) {
    var iframe = iframes.snapshotItem(i);
    if (iframe.id.indexOf('gtalk')==0) {
        return iframe;
    }
  }

  return;
}

var gtalk = getGTalk();
if (!gtalk) return;

gtalk.style.width = "100%";
gtalk.style.height = minHeight;
gtalk.style.marginTop = "5px";

gtalk.parentNode.parentNode.parentNode.addEventListener('mouseover', OverGTalk, true);
gtalk.parentNode.parentNode.parentNode.addEventListener('mouseout', OutGTalk, true);

function OverGTalk() {
    getGTalk().style.height = maxHeight;
}

function OutGTalk() {
    getGTalk().style.height = minHeight;
}
