// ==UserScript==
// @name           txt scrambler
// @namespace      http://userscripts.org/scripts/show/23540
// @include        *
// ==/UserScript==

var tags = ['sup', 'sub', 'i', 's', 'big', 'small', 'u', 'tt', 'span'];

// Node.TEXT_NODE is undefined on Greasemonkey script
nodeWalker(document.body, 3, scramble);

if (window.AutoPagerize) {
  window.AutoPagerize.addFilter(function (pages) {
    pages.forEach(function (page) {
      nodeWalker(page, 3, scramble);
    });
  });
}

function nodeWalker(node, nodeType, fun) {
  var f = arguments.callee;
  Array.forEach(node.childNodes, function(n) {
    if(n.nodeType == nodeType) {
      fun(n);
    } else if(n.childNodes && n.childNodes.length > 0) {
      f(n, nodeType, fun);
    }
  });
}

function scramble(node) {
  var f = function(str) {
    var offset = Math.floor(Math.random() * str.length)
    var tag = tags[Math.floor(Math.random() * tags.length)];
    var b = document.createElement(tag);
    
    if(offset > 0) {
      b.appendChild(f(str.slice(0, offset)));
      b.appendChild(f(str.slice(offset)));
    } else {
      b.innerHTML = str;
    }
    
    return b;
  };
  
  node.parentNode && node.parentNode.replaceChild(f(node.nodeValue), node);
}
