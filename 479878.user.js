// ==UserScript==
// @name        Netflix Collapsed History
// @namespace   tburke
// @description Collapse Netflix's viewing activity when binge-watching
// @include     https://www.netflix.com/WiViewingActivity*
// @version     1
// ==/UserScript==

// ----- Revision History -----
//  1 Initial release.

var SEPARATE_SEASONS = false;

window.addEventListener('load', function(){
  // cede priority to Netflix's scripts
  setTimeout(main, 250);
});

function makeCollapsible(tbody) {
  var td = tbody.getElementsByTagName('td')[0];
  if (td.className != 'collapsible') {
    td.addEventListener('click', function(){
      var s = this.parentNode.parentNode.nextSibling;
      if (!s) return;
      if (s.style.display == 'none') {
        this.textContent = "– ";
        this.title = "";
        s.style.display = '';
      } else {
        this.textContent = "+ ";
        this.title = s.childNodes.length + " more";
        s.style.display = 'none';
      }
    });
    td.className = 'collapsible';
    td.style.cursor = 'pointer';
  }
}
function getTitle(node) {
  return node
      .getElementsByTagName('td')[1]
      .textContent
      .replace(/(: Season \d+):.*/, SEPARATE_SEASONS ? "$1" : "");
}
function needNewSection(row, last) {
  if (last && last.childNodes) {
    var oldTitle = getTitle(last);
    var newTitle = getTitle(row);
    if (last.previousSibling == null ||
        last.previousSibling.nodeName != 'TBODY') {
      if (oldTitle == newTitle) {
        makeCollapsible(last);
      }
      return true;
    }
    var oldOldTitle = getTitle(last.previousSibling);
    if (oldTitle != newTitle) {
      return true;
    } else {
      if (oldTitle == newTitle && oldOldTitle != oldTitle) {
        makeCollapsible(last);
      }
      return oldOldTitle != oldTitle;
    }
  } else {
    return true;
  }
}
function main(){
  var t = document.getElementsByClassName('videotable')[0];
  var tbody = t.getElementsByTagName('tbody')[0];
  var r = t.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0];
  r.insertBefore(document.createElement('th'), r.firstChild);

  var last;
  var rows = tbody.getElementsByTagName('tr');
  while (rows.length) {
    rows[0].insertBefore(document.createElement('td'), rows[0].firstChild);
    if (needNewSection(rows[0], last)) {
      last = document.createElement('tbody');
      t.insertBefore(last, tbody);
    }
    last.appendChild(rows[0]);
  }
  Array.forEach(document.getElementsByClassName('collapsible'), function(x){
    x.click();
  });
}
