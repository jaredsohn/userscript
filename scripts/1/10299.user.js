// ==UserScript==
// @name           Multi-Column View of Google Search Results 
// @namespace      http://twitter.com/ziru
// @include        http://www.google.*/*
// @include        https://www.google.*/*
// ==/UserScript==

var gLastUsedNumOfColumns = "mcv.google.lastUsedNumOfCols";
var gMinWidthForTwoColumns = 950;
var gMinWidthForThreeColumns = 1100;
var gDefaultNumOfColumns = 2;
var gResTableWidth = '98%';
var gCellPadding = 5;
var gCellSpacing = 2;

// ==============  HACK for Google Chrome ============= 
if (!window.GM_setValue) {
  GM_setValue = function(name, value) {
    var date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));   // expires one-year later
    var expires = "; expires="+date.toGMTString();
    document.cookie = name + "=" + value + expires + "; path=/";
  };
}

if(!window.GM_getValue) {
  GM_getValue = function(name, defaultValue) { 
    var nameEQ = name + "=";
    var cookieArr = document.cookie.split(';');
    for(var i=0;i < cookieArr.length;i++) {
      var cookie = cookieArr[i];
      cookie = cookie.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      if (cookie.indexOf(nameEQ) == 0)
        return cookie.substring(nameEQ.length, cookie.length);
    }
    return defaultValue;
  };
}
// ==============  HACK for Google Chrome ============= 

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
  var liElems = getElementsByClass('g', theRes, 'li');
  if (liElems) return liElems[0].parentNode;
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
  theRes.parentNode.setAttribute('style', 'max-width: 200em !important');

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

function keyDownHandler(e) {
  if (!e.altKey) return;
    
  if (e.keyIdentifier == 'U+0031' || e.which == e.DOM_VK_1) { // 1 pressed
    displaySearchResultsInColumns(1);
  } else if (e.keyIdentifier == 'U+0032' || e.which == e.DOM_VK_2) { // 2 pressed
    displaySearchResultsInColumns(2);
  } else if (e.keyIdentifier == 'U+0033' || e.which == e.DOM_VK_3) { // 3 pressed
    displaySearchResultsInColumns(3);
  }
}

function onWinResize(e) {
  displaySearchResultsInColumns(0);
}

function checkURL() {
  var re = new RegExp("https?://www\.google\.[a-z\.]*/.*");
  return re.test(document.location.href) && document.getElementById('res');
}

var gLayoutChanged = false;
function changeLayout() {
  if (gLayoutChanged) return;
  if (!checkURL()) return;
  removeAds();

  displaySearchResultsInColumns(0);
  gLayoutChanged = true;
}

(function() {
  document.addEventListener('DOMAttrModified', function (event) {
    if (event.target.id == 'foot') {
      if (document.getElementById('foot').style.visibility == 'visible' ) {
        changeLayout();
      } else {
        gLayoutChanged = false;
      }
    }
  }, false);

  changeLayout();
  
  document.addEventListener('keydown', keyDownHandler, false);
  window.addEventListener('resize', onWinResize, false);
})();
