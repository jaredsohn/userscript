// ==UserScript==
// @name           HKReporter Hidelight
// @namespace      http://ellab.org
// @description    Hide the abused always-on-top posts in hkreporter.com
// @include        http://*.hkreporter.com/talks/forumdisplay.php?fid=*
// ==/UserScript==

var table = document.evaluate("//form[contains(@action, 'topicadmin.php?action=moderate')]/table", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (table && !table.getAttribute('id')) {
  // traverse upward to table
  var parentTable = table.parentNode;
  while (parentTable && parentTable.tagName != 'TABLE') parentTable = parentTable.parentNode;
  if (parentTable) {
    var h1 = parentTable.previousSibling;
    while (h1 && h1.tagName != 'H1') h1 = h1.previousSibling;
    if (h1) {
      var a1 = document.createElement('a');
      a1.innerHTML = '\u986f\u793a\u7f6e\u9802';
      a1.href = 'javascript:void(0)';
      a1.style.marginLeft = '30px';

      var a2 = document.createElement('a');
      a2.innerHTML = '\u96b1\u85cf\u7f6e\u9802';
      a2.href = 'javascript:void(0)';
      a2.style.display = 'none';
      a2.style.marginLeft = '30px';

      a1.addEventListener('click', function(e) {
        a1.style.display = 'none';
        a2.style.display = '';
        table.style.display = '';
      }, false);

      a2.addEventListener('click', function(e) {
        a1.style.display = '';
        a2.style.display = 'none';
        table.style.display = 'none';
      }, false);

      h1.appendChild(a1);
      h1.appendChild(a2);
    }
  }
  table.style.display = 'none';
}