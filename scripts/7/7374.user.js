// ==UserScript==
// @name          Remove expertsexchange from google search results.
// @namespace     tag:rjhughes@umich.edu,2007-02-02:userscript
// @description   Black out expertsexchange from google search results, so you don't get frustrated.
// @version       0.0.1
// @include       http://www.google.com/search*
// ==/UserScript==

function blackOut(elt) {
  for (var g=elt; g && g.tagName!='DIV' && g.className!='g'; g=g.parentNode){}
  var children = g.getElementsByTagName('*');

  for (var i=0; i<children.length; i++) {
    var child = children[i];
    child.style.visibility = 'hidden';
  } // for all the children
  
  var warning = document.createElement('p');
  warning.style.float = 'left';
  warning.style.paddingTop = 'auto';
  warning.style.paddingBottom = 'auto';
  warning.style.fontWeight = 'bold';
  warning.appendChild(document.createTextNode('[Experts-exchange Result blocked.]'));
  g.insertBefore(warning, g.firstChild);
} // function blackOut

(function() {
  var searchresults = document.evaluate(
      '//div[@class=\'g\']//span[@class=\'a\']', 
      document, 
      null, 
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
      null);

  for (var i=0; i<searchresults.snapshotLength; i++) {
    var elt = searchresults.snapshotItem(i);
    if (/.experts-exchange.com/.test(elt.innerHTML)) {
      blackOut(elt);
    } // if it's an expertsexchange one
  } // for all the snapshot items
})();
