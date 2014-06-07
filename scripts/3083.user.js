// ==UserScript==
// @name          Show Character Count onMouseOver
// @namespace     http://www.protopage.com/thealanberman/
// @include       *
// @description	  Show character count when mouseover on textarea
// ==/UserScript==

(function() {
  var inputs, input;
  inputs = document.evaluate(
    '//textarea',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
  if(!inputs.snapshotLength) return;
  for(var i = 0; i < inputs.snapshotLength; i++) {
    input = inputs.snapshotItem(i);
    input.addEventListener('mouseover', function(event) {
      this.title = this.value.length;
    }, false);
  }
})();