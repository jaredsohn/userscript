// ==UserScript==
// @name           Google Homepage Resizeable Column
// @namespace      www.screencast-o-matic.com
// @description    Resize the columns on your google home page
// @include        http://google.*/ig*
// @include        http://www.google.*/ig*
// ==/UserScript==
//just made it easier for my mom to use by adding updated  @includes for igoogle
// Find out current tab
var DIVs = document.evaluate(
  "//DIV[@class='section_title selected_section_title']",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

if (DIVs.snapshotLength==0) {
  //alert('Column resize won\'t work since didn\'t find current tab by looking for DIV with class="section_title selected_section_title"');
  return;
}

var selectedTab = DIVs.snapshotItem(0).id;

// Load previous column widths
var numColumns = 3;
for (var i=1; i<=numColumns; i++) {
  var e = getColumnElement(i);
  if (!e) {
    alert('Expected 1-' + numColumns + ' but couldn\'t find one for i=' + i);
    return;
  }

  var val = GM_getValue(selectedTab + e.id, 32);
  e.style.width = val + "%"; 
}

// place resizing bars inbetween columns
var lastleft = 0;
var columnW = 2;
var parent = document.getElementById('t_1');

for (var i=1; i<=numColumns-1; i++) {
  var left = getColumnElement(i);
  var right = getColumnElement(i+1);

  lastleft += parsePercent(left.style.width);

  var e = document.createElement("div");

  e.setAttribute('resizerNum', i);
  e.setAttribute("style","height:10px; width:5px; background:grey; float:left; margin-left:10px;");

  e.addEventListener('mousedown', dragStart, true);
  e.addEventListener('mouseover', showCursor, true);
  e.addEventListener('mouseout', hideCursor, true);

  parent.insertBefore(e,right);  
}

function parsePercent(x) {
  x = x.substr(0,x.length-1);
  return parseFloat(x);
}

function getColumnElement(n) {
  return document.getElementById('c_' + n);
}

function showCursor(event) {
  document.body.style.cursor='e-resize';
}

function hideCursor(event) {
  document.body.style.cursor='auto';
}

function dragStart(event) {
  event.preventDefault();

  var x = event.clientX + window.scrollX;

  document.draggingX = x;
  document.draggingColumn = this;
  document.addEventListener('mousemove', dragGo,   true);
  document.addEventListener('mouseup',   dragStop, true);
}

function dragGo(event) {
  var totalW = 1000;

  var x = event.clientX + window.scrollX;

  var diffW = x - document.draggingX;

  var percentDiff = (diffW / (totalW)) * 100;

  document.draggingX = x;

  var resizer = document.draggingColumn;

  var resizerNum = parseInt(resizer.getAttribute('resizerNum'));

  var left   = getColumnElement(resizerNum);
  var right  = getColumnElement(resizerNum+1);

  var leftW = parsePercent(left.style.width);
  var rightW = parsePercent(right.style.width);

  leftW += percentDiff;
  rightW -= percentDiff;

  if (rightW <= 10 || leftW <= 10)
     return;

  left.style.width = leftW + '%';
  right.style.width = rightW + '%';

  var currentleft = parsePercent(resizer.style.left);
  currentleft += percentDiff;
  resizer.style.left = currentleft + '%';
}

function dragStop(event) {
  var resizer = document.draggingColumn;

  var resizerNum = parseInt(resizer.getAttribute('resizerNum'));

  var left   = getColumnElement(resizerNum);
  var right  = getColumnElement(resizerNum+1);

  GM_setValue(selectedTab + left.id, "" + parsePercent(left.style.width));
  GM_setValue(selectedTab + right.id, "" + parsePercent(right.style.width));

  document.removeEventListener("mousemove", dragGo,   true);
  document.removeEventListener("mouseup",   dragStop, true);
}