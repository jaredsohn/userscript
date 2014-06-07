// ==UserScript==
// @name           EOL colors
// @namespace      www.juniper.net
// @include        http://www.juniper.net/support/eol/*
// ==/UserScript==
//
// EOL colors v1.5 April 2012
// G. Vujovic
// First release March 2012
//
// http://userscripts.org/scripts/show/129540
//
// The script adds colors to Juniper software EOL pages.
// This should make it easier to differentiate which software is still supported.
//
// Change log:
// v1.5 - added support for page http://www.juniper.net/support/eol/cs_ais.html
// v1.4 - added support for a 7-column page http://www.juniper.net/support/eol/mseries_hw.html
// v1.3 - fixed colors on http://www.juniper.net/support/eol/ive.html


var counter=0;
var isover=0;

var thcells = document.getElementsByTagName('th');
maxcells=4;
if (thcells.length==7){
  maxcells=7;
}

var cells = document.getElementsByTagName('td');
for (var i=0; i<cells.length; i++) {
  var elm = cells[i];
  if (elm.textContent.match(/Junos|JUNOSe|NSM|IDP|ScreenOS|WX|DXOS|UAC|JW/)){
    var subelm = elm.getElementsByTagName('a');
    if ((subelm.length>0) && (subelm[0].textContent.match(/1/))){
      subelm[0].textContent = subelm[0].textContent + " EEOL";
    }
  }

  // Fix short years in dates
  if (elm.textContent.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{2}$/)){
    elm.textContent = elm.textContent.replace(/([0-9]{2}\/[0-9]{2})\/([0-9]{2})$/, "$1/20$2");
  }

  // Skip first two columns
  counter++;
  if (counter<=2) continue;

  var sups = elm.getElementsByTagName('sup');
  if(sups[0]){
    addlater = 1;
    addtext = sups[0].textContent;
    sups[0].textContent = "";
  } else addlater = 0;

  var celldate = new Date(elm.textContent);
  var today = new Date();
  if (celldate<today){
    colorSupported(elm);
    isover++;
  }
  else colorEOL(elm);

  if (counter==maxcells){
    counter=0;
    colorFirstCell(cells,isover,maxcells,i);
    isover=0;
  }
  if (addlater==1){
    sups[0].textContent = addtext;
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

function colorFirstCell(cells,isomer,maxcells,i){
  firstindex = i-maxcells+1;
  if (maxcells==4){
    if (isover==0) cells[firstindex].style.backgroundColor = '#B8FF94';
    if (isover==1) cells[firstindex].style.backgroundColor = '#FFC266';
    if (isover==2) cells[firstindex].style.backgroundColor = '#FFB6A3';
  }
  if (maxcells==7){
    if (isover==0) cells[firstindex].style.backgroundColor = '#B8FF94';
    else if (isover<=4) cells[firstindex].style.backgroundColor = '#FFC266';
    else if (isover==5) cells[firstindex].style.backgroundColor = '#FFB6A3';
  }
}
