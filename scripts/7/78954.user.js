// ==UserScript==
// @name          Show Password onMouseOver
// @namespace     http://luqmaansohail.com
// @include       *
// @description	  Show password when mouseover on password field
// ==/UserScript==
// Changelog:
// - 20051010: used XPath;

(function() {
  var inputs, input;
  inputs = document.evaluate(
    '//input[@type="password"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
  if(!inputs.snapshotLength) return;
  for(var i = 0; i < inputs.snapshotLength; i++) {
    input = inputs.snapshotItem(i);
    input.addEventListener('mouseover', function(event) {
      this.type = 'text';
    }, false);
    input.addEventListener('mouseout', function(event) {
      this.type = 'password';
    }, false);
  }
})();