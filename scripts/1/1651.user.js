// ==UserScript==
// @name           MSN Search results numbering
// @namespace      http://mywebsite.com/myscripts
// @description    MSN Search results numbering
// @include        http://search.msn.*/results.aspx?*
// ==/UserScript==


(function() {
  var resultsNode = document.getElementById('results');
  var ulNode = resultsNode.firstChild.nextSibling;

  ulNode.style.listStyleType = "decimal";  
  if (location.href.match(/first=(\d+)/)) {
    ulNode.firstChild.value = RegExp.$1;
  }  
})();
