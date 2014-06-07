// ==UserScript==
// @name           Google Homepage show/hide header
// @namespace      http://www.screencast-o-matic.com
// @description    Show/Hide the header 
// @include        http://www.google.com/ig?hl=en
// ==/UserScript==

// Function to get headerdiv that we are hiding showing
function getHeaderDiv() {
  return document.getElementById('nhdrwrapsizer');
}

// Load if we should show or hide the div
var show = GM_getValue('show', 1);

// Show or hide header based on value
if (show==0) {
    getHeaderDiv().style.display = 'none';
}

// Find "tab addtab" 
var LIs = document.evaluate(
  "//li[@id='addstuff']",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

if (LIs.snapshotLength==0) {
  alert('Didn\'t find li with id="addstuff"');
  return;
}

// Add link to show or hide header
var addstuff = LIs.snapshotItem(0);

var newLi = document.createElement("li");
newLi.setAttribute('class','tab addtab');
newLi.style.paddingLeft = '10px';

var newA = document.createElement("a");
newA.id = 'showSearchLink';
newA.innerHTML = (show==0) ? 'Show Header' : 'Hide Header';
newA.href = '#';
newA.addEventListener('click', showHideSearch, false);

newLi.appendChild(newA);

addstuff.parentNode.insertBefore(newLi, addstuff);

// Add listener function which does the show/hiding
function showHideSearch() {
  var headerDiv = getHeaderDiv();
  if (headerDiv.style.display == 'none') {
    headerDiv.style.display = 'block';
    document.getElementById('showSearchLink').innerHTML = 'Hide Header';
    GM_setValue('show', 1);
  }
  else {
    headerDiv.style.display = 'none';
    document.getElementById('showSearchLink').innerHTML = 'Show Header';
    GM_setValue('show', 0);
  }
  return false;
}