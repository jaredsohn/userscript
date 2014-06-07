// ==UserScript==
// @name [Opera] Open links in background window on pressing Ctrl+Click
// @author Ziru
// @version 1.0
// ==/UserScript==

function onClicked(e) {
  if (!e.ctrlKey) return;  // ignore non ctrl-click events
  // find the proper url closet to the event source element
  var evtElem = e.srcElement;
  while (evtElem && evtElem.nodeName != 'A' && evtElem.nodeName != 'HTML') { evtElem = evtElem.parentNode };
  if (!evtElem) return;
  var url = evtElem.href;
  if (url) {
    e.stopPropagation(); e.preventDefault();
    window.open(url);   // create a new tab
    window.focus();     // focus the current tab (ie., put the new tab in background)
  }
};

// intercept the mouse click event
document.addEventListener('click', onClicked, false);