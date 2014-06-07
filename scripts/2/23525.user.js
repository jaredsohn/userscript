// ==UserScript==
// @name          DOM Outliner
// @author        Raffles
// @namespace     http://ratherodd.com/
// @description   When active, outlines in red the current DOM element being hovered. The trail of ancestors is shown in a box at the top left.
// @include       *
// ==/UserScript==
var trail, els, lastitem;
var active = function () {
  trail  = document.createElement('p');
  trail.style.position = 'fixed';
  trail.style.zIndex = '400';
  trail.style.top = '1px';
  trail.style.margin = '0';
  trail.style.padding = '3px 4px';
  trail.style.left = '1px';
  trail.style.border = '1px solid #222';
  trail.style.backgroundColor = '#EEE';
  trail.style.color = '#222';
  trail.style.textAlign = 'left';
  trail.style.font = '14px "Lucida Grande", Verdana, sans-serif';
  trail.setAttribute('id', 'trail');
  document.body.appendChild(trail);
  trail.addEventListener('dblclick', toggleTrail, false);
  
  Array.forEach(els = document.getElementsByTagName('*'), function(el) {
    if (el.id == 'trail' || el.parentNode.id === 'trail') return;
    el.addEventListener('mouseover', toggleOutline, false);
    el.addEventListener('mouseout', toggleOutline, false);
  });
}

var toggleOutline = function(e) {
  e.stopPropagation();
  this.style.outline = this.style.outline.length ? '' : '1px solid red';
  updateTrail(this);
  lastitem = this;
}
  
var updateTrail = function(node) {
  var n = i = trail.innerHTML = '';
  while (node != document) {
    if (node.hasAttribute('id')) {
      i = node.getAttribute('id');
      if (i.length) n += ' #' + i;
    }
    if (node.hasAttribute('class')) {
      i = node.getAttribute('class');
      if (i.length) n += ' .' + i;
    }
    if (trail.innerHTML.length) trail.innerHTML = node.nodeName.toLowerCase() + n + ' &gt; ' +  trail.innerHTML;
    else  trail.innerHTML = '<strong>' + node.nodeName.toLowerCase() + n + '</strong>';
    node = node.parentNode;
    n = i = '';
  }
}

var toggleTrail = function() {
  if (trail && els) {
    document.body.removeChild(trail);
    Array.forEach(els, function(el) {
      if (el.id == 'trail' || el.parentNode.id === 'trail') return;
      el.removeEventListener('mouseover', toggleOutline, false);
      el.removeEventListener('mouseout', toggleOutline, false);
    });
    els = trail = false;
    lastitem.style.outline = '';
  }
  else active();
}

GM_registerMenuCommand('Toggle DOM Outliner ', toggleTrail);