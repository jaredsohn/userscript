// ==UserScript==
// @name          Google Search Results In Double Or Multi Column in Single Page 
// @include        http://www.google.com/search*
// @include        http*://www.google.co*/*
// ==/UserScript==

var gLastUsedNumOfColumns = "mcv.google.lastUsedNumOfCols";
var gMinWidthForTwoColumns = 950;
var gMinWidthForThreeColumns = 1100;
var gDefaultNumOfColumns = 2;
var gResTableWidth = '98%';
var gCellPadding = 5;
var gCellSpacing = 2;

// utility function, taken from web
function getElementsByClass(searchClass,node,tag) {
  var classElements = new Array();
  if ( node == null )
    node = document;
  if ( tag == null )
    tag = '*';
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
  for (i = 0, j = 0; i < elsLen; i++) {
    if ( pattern.test(els[i].className) ) {
      classElements[j] = els[i];
      j++;
    }
  }
  return classElements;
}

function getResDivContainer(theRes) {
  var nodes = theRes.childNodes;
  for (var i = 0; i < nodes.length; i++)
    if (nodes[i].tagName == 'DIV') {
      if (nodes[i].getAttribute('id') == null)
        return nodes[i];
    }
}

function removeElem(elem) {
  if (elem) elem.parentNode.removeChild(elem);
}

function removeAds() {
  removeElem(document.getElementById('tads'));
  removeElem(document.getElementById('leqr'));
  removeElem(document.getElementById('leoi'));
  removeElem(document.getElementById('tpa1'));
  removeElem(document.getElementById('tpa2'));
  removeElem(document.getElementById('tpa3'));
  removeElem(document.getElementById('mbEnd'));
}

function displaySearchResultsInColumns(inNumOfColumns) {
  var theRes = document.getElementById('res');

  var numOfColumns = inNumOfColumns;
  if (inNumOfColumns == 0) {
    var v = GM_getValue(gLastUsedNumOfColumns);
    numOfColumns = v ? v : gDefaultNumOfColumns;
  } else {
    GM_setValue(gLastUsedNumOfColumns, numOfColumns);
  }

  if (document.body.clientWidth < gMinWidthForTwoColumns)
    numOfColumns = 1;
  else if ((document.body.clientWidth < gMinWidthForThreeColumns) && (numOfColumns >= 3))
    numOfColumns = 2;
      
  var theResDivContainer = document.getElementById('multi_column_view');
  if (theResDivContainer) {
    if (numOfColumns == theResDivContainer.firstChild.getElementsByTagName('td').length)
      return;
  } else {
    if (numOfColumns == 1)
      return;
    theResDivContainer = getResDivContainer(theRes);
  }

  var theResDivArray = getElementsByClass('g', theRes, 'li');
  var numOfResults = theResDivArray.length;
  var totalHeight = 0;
  var theResDivHeight = new Array();
  for (var i = 0; i < numOfResults; i++) {
    theResDivHeight[i] = theResDivArray[i].clientHeight;
    totalHeight += theResDivHeight[i];
  }
  var avgHeight = totalHeight / numOfColumns;

  var theNewResDiv = document.createElement('div');
  theNewResDiv.setAttribute('id', 'multi_column_view');
  theNewResDiv.setAttribute('align', 'center');
  theNewResDiv.setAttribute('style', 'list-style:none;');

  theResDivContainer.parentNode.replaceChild(theNewResDiv, theResDivContainer);

  var theNewResTable = document.createElement('table');
  theNewResTable.setAttribute('width', gResTableWidth);
  theNewResTable.setAttribute('cellspacing', gCellSpacing);
  theNewResTable.setAttribute('cellpadding', gCellPadding);
  var theOnlyRow = document.createElement('tr');
  theOnlyRow.setAttribute('valign', 'top');

  var columns = new Array();

  var columnWidth = '' + parseInt(100 / numOfColumns) + '%';
  var idxResDiv = 0;
  for (var i = 0; i < numOfColumns; i++) {
    columns[i] = document.createElement('td');
    columns[i].setAttribute('width', columnWidth);
    theOnlyRow.appendChild(columns[i]);
  }

  var columnHeight = 0;
  var idxColumn = 0;
  for (var i = 0; i < numOfResults; i++) {
    columns[idxColumn].appendChild(theResDivArray[i]);
    
    columnHeight += theResDivHeight[i];
    // alert('columnHeight: ' + columnHeight + ', avgHeight: ' + avgHeight);
    if ((columnHeight > avgHeight - 30) && (idxColumn < numOfColumns - 1)) {
      idxColumn++;
      columnHeight = 0;
    }
  }

  theNewResTable.appendChild(theOnlyRow);
  theNewResDiv.appendChild(theNewResTable);
}

function pressedKey(e) {
  if (!e.altKey) return;
    
  var code = e.charCode;
  if (code == 49) { // 1 pressed
    displaySearchResultsInColumns(1);
  } else if (code == 50) { // 2 pressed
    displaySearchResultsInColumns(2);
  } else if (code == 51) { // 3 pressed
    displaySearchResultsInColumns(3);
  }
}

function onWinResize(e) {
  displaySearchResultsInColumns(0);
}

(function() {
  removeAds();

  displaySearchResultsInColumns(0);
  
  window.addEventListener('keypress', pressedKey, false);
  window.addEventListener('keydown', pressedKey, false);
  window.addEventListener('resize', onWinResize, false);
})();