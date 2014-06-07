// ==UserScript==
// @name          slimGR
// @namespace     slimGR
// @description	  Slim UI for Google Reader
// @include       http://reader.google.com/reader/*
// @include       https://reader.google.com/reader/*
// @include       http://www.google.com/reader/*
// @include       https://www.google.com/reader/*
// @include       http://reader.google.tld/reader/*
// @include       https://reader.google.tld/reader/*
// @version       1.1
// ==/UserScript==

// ------------------------------------------------------------------
// Options:

// 0 -> keep social bookmarking stuff in sidebar, 1 -> omit.
var NoSocialBookmarking = 1;
var singleHeaderLine = 0;

// Don't change anything below this line.
// ------------------------------------------------------------------

var header;
var container;
var content;
var entries;
var entriesStatus;
var viewframe;
var viewButton;
var footer;
var debug = 1;

function log(s) {
  if (debug)
    GM_log(s);
}

function eid(id, n) {
  return (n ? n : document).getElementById(id);
}

function etag(tag, n, f) {
  var x = n.getElementsByTagName(tag);
  if (f) {
    var y = new Array();
    for (var i in x) {
      y.push(f(x[i]));
    }
    return y;
  } else
    return x;
}

function hide(){
  for (var i = 0; i < arguments.length; ++i) {
    hideNode(eid(arguments[i]));
  }
}

function hideNode(n){
  if(n) {
    n.style.display = 'none';
    n.style.visibility = 'hidden';
  }
}

function move(p, id, dir, pad) {
  moveNode(p, eid(id), dir, pad);
}

function moveNode(p, c, dir, pad) {
  if (p && c) {
    c.style.margin = '0';
    c.style.position = 'relative';
    c.style.padding = '0';
    c.style.paddingRight = pad ? pad : '4px';
    c.style.display = 'inline';
    c.style.top = '0';
    c.style.float = c.style.cssFloat = dir;
    p.appendChild(c);
  }
}

function wrapNode(n) {
  var div = document.createElement('div');
  div.appendChild(n);
  return div;
}

function updateAnchorTarget(ev) {
  if (eid('no-entries-msg')) {
    viewframe.src = 'about:blank';
    return;
  }
  doUpdateAnchorTarget(ev.target);
}

function doUpdateAnchorTarget(n) {
  var singleSource = entries.className.indexOf('single-source') >= 0;
  etag('a', n, function(x) {
    if (x.target == '_blank') {
      x.target = 'viewer-content-frame';
    }
  });
  etag('span', n, function(x) {
    if (x.className == 'entry-secondary-snippet') {
      hideNode(x);
    }
  });
  etag('div', n, function(x) {
    var c = x.className;
    if (c == 'entry-date') {
      hideNode(x);
    } else if (c == 'entry-secondary') {
      x.style.margin = '0 0 0 0';
      x.style.top = singleSource ? '0px' : '2em';
      x.style.left = '0px';
      x.style.marginRight = singleSource ? '2em' : '0px';
    } else if (c == 'collapsed') {
      x.style.lineHeight = x.style.whiteSpace = 'normal';
      x.style.height = '4em';
    }
  });
}

function onKeyPress(ev) {
  var c = String.fromCharCode(ev.charCode);
  if (c == 'v') {
    ev.stopPropagation();
    ev.preventDefault();
    showCurrentEntry();
  }
}

function onClickButton(ev) {
  ev.stopPropagation();
  ev.preventDefault();
  showCurrentEntry();
}

function showCurrentEntry() {
  var n = eid('current-entry');
  if (n) {
    etag('a', n, function(a) {
      if (a.className == 'entry-title-link' || a.className == 'entry-original')
      {
        viewframe.src = a.href;
      }
    });
  }
}

function createButton(tnod, id, label, func) {
  var n = tnod.cloneNode(true);
  n.id = id;
  var child = n.firstChild;
  while (child) {
    if (child.className == 'goog-button-base-pos') {
      child.firstChild.nextSibling.firstChild.innerHTML = label;
      break;
    }
    child = child.firstChild;
  }
  n.addEventListener('click', func, false);
  return n;
}

function resizeSections(ev) {
  var w = (footer.parentNode.clientWidth - container.clientWidth) - 5;
  if (content) {
    content.style.width = w + 'px';
    content.style.height = (container.clientHeight) + 'px';
    viewframe.style.width = w + 'px';
    viewframe.style.height = content.style.height;
  }
}

function trimSideBar() {
  var subTree = eid('sub-tree');
  subTree.insertBefore(eid('reading-list-selector').parentNode,
    subTree.firstChild);
  hide(
    // Home, All items, Starred items, Your stuff, Trends,
    // Browse for stuff
    'lhn-selectors',
    // People you follow
    'lhn-friends',
    // Explore.
    'lhn-recommendations',
    // Your stuff.
    'your-items-tree-container',
    'trends-selector',
    'directory-selector',
    'star-selector',
    'lhn-section-footer'
  );
}

function trimHeaderBars() {
  // Hide search bar.
  hide('logo-container','search');
  var topbar = eid('main');
  topbar.style.position='absolute';
  topbar.style.top = '25px';

  // Merge header bars into a single bar.

  // left: nav, title, show N new items - all ietms.
  var left = document.createElement('div');
  header.appendChild(left);
  move(left, 'viewer-all-new-links', 'left', '1em');
  moveNode(left, wrapNode(eid('chrome-title')), 'left', '1em');
  left.style.float = left.style.cssFloat = 'left';

  // right show details, Show: Expanded - List
  var right = document.createElement('div');
  header.appendChild(right);
  move(right, 'viewer-details-toggle', 'right', '0px');
  move(right, 'chrome-view-links', 'right');
  right.style.float = right.style.cssFloat = 'right';
  right.style.paddingLeft = singleHeaderLine ? '10px' : '0px';
  
  // mid: buttons
  var mid = document.createElement('div');
  header.appendChild(mid);
  move(mid, 'entries-up', 'left', '1px');
  move(mid, 'entries-down', 'left', '1px');
  moveNode(mid, viewButton, 'left');
  move(mid, 'mark-all-as-read-split-button', 'left', '1px');
  move(mid, 'mark-all-as-read-options', 'left');
  var r = eid('viewer-refresh');
  moveNode(mid, r, 'left');
  move(mid, 'stream-prefs-menu', 'left', '1px');
  if (singleHeaderLine)
    mid.style.float = mid.style.cssFloat = 'left';
  else
    mid.style.clear = 'both';

  hide('viewer-top-controls');
  footer.style.height = footer.style.padding = footer.style.margin = '0px';
}

function init() {
  header = eid('chrome-header');
  footer = eid('viewer-footer');
  container = eid('viewer-container');
  entries = eid('entries');
  entriesStatus = eid('entries-status');
  nav = eid('nav');
  var x = entries.childNodes;
  for (var i in x) {
    var c = x[i].className;
    if (c && c.indexOf('entry ') != -1)
      doUpdateAnchorTarget(x[i]);
  }
  eid('viewer-details-toggle').addEventListener('click', resizeSections, true);
  header.addEventListener('DOMSubtreeModified', resizeSections, false);
  top.addEventListener('resize', resizeSections, false);
  eid('chrome-title').addEventListener('DOMSubtreeModified', updateAnchorTarget,
    false);
  entries.addEventListener('DOMNodeInserted', updateAnchorTarget, false);
  top.addEventListener('keypress', onKeyPress, true);
  viewButton = createButton(eid('entries-up'), 'view-entry', 'View Item',
    onClickButton);
}

// Add a view frame on the right.
function addContentFrame() {
  content = document.createElement('div');
  footer.parentNode.insertBefore(content, footer);
  content.id = 'viewer-content';
  content.innerHTML = "<iframe name='viewer-content-frame' id='viewer-content-frame'></iframe>";
  viewframe = eid('viewer-content-frame');
  container.style.cssFloat = 'left';
  container.style.float = 'left';
  container.style.width = '250px';
  container.style.fontSize = '90%';
  container.style.overflow = 'auto';
  content.style.margin = '0px';
  content.style.borderWidth = '0px 0px 0px 1px';
  content.style.borderStyle = 'solid';
  content.style.borderColor = '#6688EE';
  content.style.padding = '0px';
  content.style.cssFloat = 'left';
  content.style.float = 'left';
  footer.style.clear = 'both';
}

// ----------------- Main -----------------

var logoContainer = eid('logo-container');
if (logoContainer && logoContainer.style.visibility != 'hidden') {
  init();
  if (NoSocialBookmarking)
    trimSideBar();
  trimHeaderBars();
  addContentFrame();
  resizeSections();
}
