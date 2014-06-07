// ==UserScript==
// @name          Shows the Password on MouseOver by www.orkutplaza.com
// @namespace     http://www.orkutplaza.com
// @description	  shows password when mouse is moved over password field | More UserScripts at www.orkutplaza.com
// @author        Various Coders
// @homepage      http://www.orkutplaza.com
// @include       *
// ==/UserScript==

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


