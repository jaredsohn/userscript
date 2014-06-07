// ==UserScript==
// @name Github select lines
// @match http://github.com/*
// @match https://github.com/*
// ==/UserScript==


document.onmouseup = function() {
  var s = getSelection();
  var getL = function(node) {
    while(!node.id) {
      node = node.parentElement;
    }
    return node.id.substr(2);
  }

  var lines = [getL(s.focusNode), getL(s.baseNode)];
  if (lines[0] == lines[1]) {
    lines = [lines[0]];
  } else {
    if(parseInt(lines[0]) > parseInt(lines[1])) {
      lines = [lines[1],lines[0]];
    }
   lines[1] = parseInt(lines[1]--);
  }
  if(parseInt(lines[0]) > 0) location.hash = 'L' + lines.join('-L');
}