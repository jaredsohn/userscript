// ==UserScript==
// @name           Gmail Delete Consistency
// @namespace      http://blog.interlinked.org/
// @description    Aligns the Delete button on the rightmost position in every screen.
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

function getNode(id) {
  return unsafeWindow.document.getElementById(id);
}

function alignButtons(container) {
  if(container) {
    // weird, google assigns the same ID to more than one element
    var element = container.getElementsByTagName('button');
    if(element.length > 0) { // only if there is a button
      var delButton = element[0]; // take the first one
      if(delButton.id == 'ac_dl') { // make sure it's the delete button
        var parent = delButton.parentNode;
        parent.removeChild(delButton);
        parent.appendChild(delButton);
      }
    }
  }  
}

alignButtons(getNode('tct'));
alignButtons(getNode('tcb'));
