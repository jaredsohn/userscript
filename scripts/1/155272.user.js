// ==UserScript==
// @name           FEOS EOL colors
// @namespace      www.fireeye.com
// @include        http://www.fireeye.com/support/end-support-dates.html
// @version        1
// @grant          none
// ==/UserScript==
//
// By G. Vujovic
//
// The script adds colors to FireEye FEOS EOL pages.
// This should make it easier to differentiate which software is still supported.
//
// Change log:


var counter=0;
var isover=0;

maxcells=2;

var cells = document.getElementsByTagName('td');
var th_cells = document.getElementsByTagName('th');
row=1;

for (var i=0; i<cells.length; i++) {
  var elm = cells[i];
  if (elm.textContent.match('End of Support'))
    exit;

  // Skip first two columns
  counter++;
  if (counter<=1) continue;

  var celldate = new Date(elm.textContent);
  var today = new Date();
  if (celldate<today){
    colorSupported(elm);
    isover++;
  }
  else colorEOL(elm);

  if (counter==maxcells){
    counter=0;
    colorFirstCell(th_cells,isover,maxcells,row);
    isover=0;
    row++;
  }
}

function colorSupported(elm){
  elm.style.backgroundColor = '#FFB6A3';
  elm.style.color = 'black';
}

function colorEOL(a){
  elm.style.backgroundColor = '#B8FF94';
  elm.style.color = 'black';
}

function colorFirstCell(th_cells,isover,maxcells,row){
  firstindex = row+2;
  if (isover==0) th_cells[firstindex].style.backgroundColor = '#B8FF94';
    else th_cells[firstindex].style.backgroundColor = '#FFB6A3';
}
