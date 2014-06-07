// ==UserScript==
// @name           circvsfix
// @namespace      octoberblu3
// @include        http://www.circvsmaximvs.com/*
// ==/UserScript==

function removeContent(id, up) {
  var node = document.getElementById(id);
  if (node) {
    for (i = 0; i < up; i++)
      node = node.parentNode;

    node.parentNode.removeChild(node);
    node = null;
  }
}

removeContent('collapseobj_module_36', 3);
removeContent('notices', 0);

badTDs = document.getElementsByTagName('td');

for (var i = 0; i < badTDs.length; i++) {
  thisTD = badTDs[i];
  if (thisTD.className == 'Left' || thisTD.className == 'Right') {
    thisTD.innerHTML="";
  }
}
