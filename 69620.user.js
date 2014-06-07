// ==UserScript==
// @name           LibraryThing Sort and Re-link on Combine/Separate Pages
// @namespace      http://userscripts.org/users/brightcopy
// @description    Adds the ability to alphabetically sort editions and changes "separate" links so you can open them in a new window/tab.
// @include        http://*.librarything.tld/combine.php?author=*
// @include        http://*.librarything.tld/work/*/editions*
// @license        Public Domain
// ==/UserScript==

var TEXT_ASCENDING = '(sort ascending)';
var TEXT_DESCENDING = '(sort descending)';

// add href to (separate) links
var elems = document.evaluate(
    // author combine page
    '//table[@class="combinetable"]/tbody/tr/td[count(@class)=0]/p/a',
    document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < elems.snapshotLength; i++) {
  var elem = elems.snapshotItem(i);
  var onclick = elem.getAttribute('onclick');
  var href = onclick.replace(
      /separateWork\((\d+), *(\d+)\)/, '/work_separate.php?book=$1&work=$2');

  if (href != onclick) { 
    elem.setAttribute('href', href); 
    elem.setAttribute('onclick', onclick + '; return false;');
  } 

  // this prevents the combination page from checking the checkbox
  // when we simply clicked on separate
  addEvent(elem, 'click', separateClick, false);
}

function separateClick(e) {
  stopBubbling(e);
  return false;
}

// add sort link
var elems = document.evaluate('//table[@class="combinetable"]/tbody/tr/td[count(@class)=0]/h2',
    document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < elems.snapshotLength; i++) {
  var elem = elems.snapshotItem(i);
  var parent = elem.parentNode;

  var span = document.createElement('span');
  span.setAttribute('style', 'float:right');
  span.className = 'smaller';
  var a = document.createElement('a');
  a.appendChild(document.createTextNode(TEXT_ASCENDING));
  a.setAttribute('href', 'javascript:return false;');
  addEvent(a, 'click', sortClick, false);
  span.appendChild(document.createTextNode('  '));
  span.appendChild(a);

  elem.appendChild(span)

  // this is for the editions page
  if (elem.nodeName == 'TD')
    break;
}

function sortClick(e) {
  stopBubbling(e);

  var a = getTarget(e);
  
  var node = 
    // this is editions
    a.parentNode.parentNode.nodeName == 'TD'
      ? document.getElementById('editions')
      : a.parentNode.parentNode.parentNode;  
    
  if (getTextContent(a) == TEXT_ASCENDING) {
    sortElems(node, compareNodesAscending);
    setTextContent(a, TEXT_DESCENDING);    
  }
  else {
    sortElems(node, compareNodesDescending);
    setTextContent(a, TEXT_ASCENDING);    
  }
}

function compareNodesAscending(node1, node2) {
  if (node1.istr < node2.istr)
    return -1
  else if (node1.istr > node2.istr)
    return 1
  else if (node1.str < node2.str)
    return -1
  else if (node1.str > node2.str)
    return 1
  else   
    return 0;
}

function compareNodesDescending(node1, node2) {
  return compareNodesAscending(node2, node1);
}

function sortElems(item, compare) {
  var ps = [];
  var step = item.nodeName == 'TD' ? 1 : 3;
    
  for (var i = 0; i < item.childNodes.length; i += step) {
    var node = item.childNodes[i];

    if (step == 1 && node.nodeName == 'P' && node.hasChildNodes()
        || step == 3 && node.nodeName == '#text') {
      var txt = node.textContent.replace(/ +/g, ' ')
          .replace(/[\s\/.,"'?!;:#$%&()*+<>=@\^_{}~`|[\]-]+/g, '');
      ps.push({
          node:node,
          str:txt,
          istr:txt.toLowerCase()
        });
    }
  }
  
  ps.sort(compare);

  for (i = 0; i < ps.length; i++) {
    var nodes = [ps[i].node];
    if (step == 3) {
      nodes.push(nodes[0].nextSibling);
      nodes.push(nodes[1].nextSibling);
    }
    
    var parent = nodes[0].parentNode;

    for (var j = 0; j < nodes.length; j++) {
      parent.removeChild(nodes[j]);
      parent.appendChild(nodes[j]);
    }
  }
}


function addEvent(node, eventType, callback, useCapture) {
  if (node.addEventListener) {
    node.addEventListener(eventType, callback, useCapture);
    return true;
  }
  else if (node.attachEvent)
    return node.attachEvent('on' + eventType, callback);
  else
    node['on' + eventType] = callback;
}

function getTarget(e) {
  if (!e)
    var e = window.event;
    
  var targ;

  if (e.target)
    targ = e.target;
  else if (e.srcElement)
    targ = e.srcElement;
  
  if (targ.nodeType == 3) // defeat Safari bug
    targ = targ.parentNode;
    
  return targ;
}

function stopBubbling(e) {
  if (!e) 
    e = window.event;
    
  e.cancelBubble = true;
  if (e.stopPropagation)
    e.stopPropagation();
}

function setTextContent(node, text) {
  if (node.innerText)
    node.innerText = text
  else if (node.textContent)
    node.textContent = text;
}

function getTextContent(node, text) {
  return node.innerText || node.textContent;
}

