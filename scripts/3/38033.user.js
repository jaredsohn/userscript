// ==UserScript==
// @name           Allow input autocomplete
// @namespace      nullisnull.blogspot.com
// @description    Changes inputs with autocomplete=off to 'on' to allow password autocomplete
// @include        *
// ==/UserScript==

(function(inputs){
  var input, i=0;
  while(input = inputs.snapshotItem(i++)){ input.setAttribute('autocomplete', 'on'); }
})(document.evaluate("//input[@autocomplete='off']", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)); 

