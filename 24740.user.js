// ==UserScript==
// @name           IE CSS Compatibility
// @namespace      http://riddle.pl/-/greasemonkey/ie-css-compatibility.user.js
// @include        http://msdn2.microsoft.com/en-us/library/cc351024(VS.85).aspx
// ==/UserScript==

var handle = document.getElementById('ctl00_rs1_altSelector');
if (handle) {
  // append styles
  var styles = 'td.yes,td.no,td.partial{text-align:center !important;outline:1px solid #fff !important}td.yes{background:#00882D !important;color:#fff !important}td.no{background:#CB000F !important;color:#fff !important}td.partial{border:1px solid #00882D !important;color:#00882D !important}';
  var link = document.createElement('link');

  link.rel = 'stylesheet';

  link.href = 'data:text/css,' + escape(styles);

  document.getElementsByTagName('head')[0].appendChild(link);
  // parse tables

  handle = handle.parentNode;
  if (handle) {
    var rows = handle.getElementsByTagName('td');
    for (var i = 0; i < rows.length; i++) {
      var item = rows[i];
      var text = item.firstChild;
      if (text.nodeType == 3) {
        var state = text.nodeValue.toLowerCase();
        var newclass = '';
        switch (state) {
          case 'yes': newclass = 'yes'; break;
          case 'partial': newclass = 'partial'; break;
          case 'no': newclass = 'no'; break;
        }
        item.className = newclass;
      }
    }
  }
}