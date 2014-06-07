// ==UserScript==
// @name           Read Later
// @namespace      http://phiffer.org/
// @description    An alternative to the Instapaper 'Read Later' bookmarklet
// @include        *
// @resource       readlater  http://www.instapaper.com/images/readlater.png
// ==/UserScript==

// Don't run in iframes
if (window.top != window.self) {
  return;
}

var shift = false;
var top = false;
var hidden = false;
var button = false;

var styles = {
  font: '11px/0 verdana, sans-serif',
  display: 'none',
  position: 'fixed',
  top: '13px',
  right: '20px',
  color: '#333',
  padding: '0',
  margin: '0',
  textIndent: '0',
  border: 'none',
  cursor: 'pointer',
  zIndex: 10000000
};

function click() {
  var bookmarklet = GM_getValue('bookmarklet', false);
  if (!bookmarklet) {
    bookmarklet = setBookmarklet();
  }
  if (bookmarklet) {
    unsafeWindow.location = bookmarklet;
  }
}

function setBookmarklet() {
  var bookmarklet = prompt('Please enter your Instapaper bookmarklet');
  if (!bookmarklet) {
    return false;
  } else {
    GM_setValue('bookmarklet', bookmarklet);
  }
  return bookmarklet;
}

function build() {
  button = document.createElement('img');
  button.setAttribute('src', GM_getResourceURL('readlater'));
  button.setAttribute('title', 'Save to Instapaper (ESC to hide)');
  for (var id in styles) {
    button.style[id] = styles[id];
  }
  button.addEventListener('click', click, false);
  document.body.appendChild(button);
}

function show() {
  if (!button) {
    build();
  }
  if (shift && top) {
    button.style.display = 'block';
  }
}

function hide() {
  if (button) {
    button.style.display = 'none';
  }
}

window.addEventListener('mousemove', function(e) {
  if (e.clientY < 100 && !hidden) {
    top = true;
    show();
  } else if (e.clientY >= 100) {
    top = false;
    hidden = false;
    hide();
  }
}, false);

window.addEventListener('keydown', function(e) {
  if (e.keyCode == 27 && button.style.display == 'block') {
    hidden = true;
    hide();
  } else if (e.keyCode == 16) {
    shift = true;
    show();
  }
}, false);

window.addEventListener('keyup', function(e) {
  if (e.keyCode == 16) {
    shift = false;
  }
}, false);

GM_registerMenuCommand('Set Instapaper bookmarklet', setBookmarklet);