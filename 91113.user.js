// ==UserScript==
// @name  GMail Sender's Picture
// @namespace  http://userscripts.org/delas/gmail
// @description  Conversion of the Chrome extension "GMail Sender's Picture Extension" for greasemonkey. The script was written Hedger Wang and only adapted by me. Original script: http://goo.gl/NeOX
// @include  http*://mail.google.com/*
// @exclude  
// ==/UserScript==

var SELECTOR_SENDER = 'h3.gD span[email]:not([x_x])';
var SELECTOR_THREAD_BODY = '.ii';
var SELECTOR_POPUP_IMG = 'img.tR';
var SELECTOR_POPUP = '.tq';
var CLASS_NAME_THREAD = 'gs';

var CSS = [
  '.hw-gmail-pix {float: right;margin: 0 0 10px 10px;text-align:right;',
  ' font-size: 10px;font-family:arial, sans-serif;max-width: 120px;}',
  '.hw-gmail-pix-info {background:#fff;color: #222;}',
  '.hw-gmail-pix-info a:link, .hw-gmail-pix-info a:visited {',
  ' color: #333;text-decoration:underline;}',
  '.hw-gmail-pix img {display: none;}',
  '.hw-gmail-pix h1 {font-size: 1em; margin: 0;font-weight:bold;}',
  '.hw-gmail-pix-photo {border: solid 3px #ccc;-webkit-border-radius:3px;}',
  '.hw-gmail-pix-photo,.hw-gmail-pix-photo-inner {display:inline-block;',
  ' background: transparent',
  ' url(//mail.google.com/mail/contacts/static/images/NoPicture.gif)',
  ' center center no-repeat;',
  ' width:86px;height:86px;background-size: 100%;}',
  '.hw-gmail-pix-photo:hover{border-color:#4153e0;}'
].join('');


var GOOGLE_APP_PATTERN = /mail\.google\.com\/a\//;

var onDomNodeChangeLocked = false;

function throttle(fn, delay, var_args) {
  var_args = Array.prototype.slice.call(arguments, 2) || [];
  var timer;
  var self;
  var fn2 = function() {
    timer = null;
    fn.apply(self, var_args);
  };

  var fn3 = function() {
    if (timer) {
      window.clearTimeout(timer);
    }
    self = this;
    timer = window.setTimeout(fn2, delay);
  };
  return fn3;
}

function endsWith(str, suffix) {
  return str.lastIndexOf(suffix) == (str.length - suffix.length);
}

function getNextId() {
  getNextId.seed = getNextId.seed || 0;
  return ['gmail_pix_id_', getNextId.seed++].join('');
}

function hasClass(obj, className) {
  if (typeof obj == 'undefined' || obj == null || !RegExp) {
    return false;
  }
  var re = new RegExp('(^|\\s)' + className + '(\\s|$)');
  if (typeof(obj) == 'string') {
    return re.test(obj);
  } else if (typeof(obj) == 'object' && obj.className) {
    return re.test(obj.className);
  }
  return false;
}

function getParentByClassName(child, className) {
  var el = child;
  while (el) {
    if (hasClass(el, className)) {
      return el;
    }
    el = el.parentNode;
  }
  return null;
}

function waitForContentFrame() {
  var frame = document.getElementById('canvas_frame');
  if (!frame || !frame.contentDocument) {
    window.setTimeout(arguments.callee, 500);
    return;
  }
  onContentReady(frame.contentDocument);
}

function onContentReady(doc) {
  var sEl = doc.createElement('style');
  sEl.appendChild(doc.createTextNode(CSS));

  var headEl = doc.querySelector('head') || doc.body;
  headEl.insertBefore(sEl, headEl.firstChild);

  var fn = throttle(onDomNodeChange, 0, doc);
  doc.addEventListener('DOMSubtreeModified', fn, false);
  doc.addEventListener('DOMAttrModified', fn, false);
  
  // var debugFn = function(evt) {
  //   evt.stopPropagation();
  //   evt.preventDefault();
  // };
  // doc.addEventListener('mouseout', debugFn, true);
  // doc.addEventListener('mousemove', debugFn, true);
}

function onDomNodeChange(doc) {
  if (onDomNodeChangeLocked) {
    return;
  }
  onDomNodeChangeLocked = true;
  var senders = doc.querySelectorAll(SELECTOR_SENDER);
  for (var i = 0, sender; sender = senders[i]; i++) {
    displayPix(doc, sender);
  }
  onDomNodeChangeLocked = false;
}

function getGmailSrc(email) {
  var photosPath = GOOGLE_APP_PATTERN.test(document.location.href) ?
                   'photos/' : '/mail/photos/';
  // TODO(hedger): I really don'yt know what the secret "37xhbopqvozd" means.
  // But I suspect that this may break this extension whenever this key is
  // updated
  return [photosPath, encodeURIComponent(email),
      '?37xhbopqvozd&rp=1&pld=1'].join(''); 
}

function getGAvatarSrc(email) {
  // Create a image src:
  // http://gravatar.com/avatar/82674b3eecff40b9037c72f92cb92029.jpg
  var src =  ['http://www.gravatar.com/avatar/', MD5(email), '.jpg'].join('');
  return src;
}

function displayPix(doc, senderEl) {
  if (senderEl.getAttribute('x_x')) {
    return;
  }
  // Mark as used.
  senderEl.setAttribute('x_x', 'y');

  var email = senderEl.getAttribute('email');
  var threadEl = getParentByClassName(senderEl, CLASS_NAME_THREAD);
  if (!threadEl) {
    return;
  }

  var bd = threadEl.querySelector(SELECTOR_THREAD_BODY);
  if (!bd) {
    return;
  }
  var email = senderEl.getAttribute('email');
  var pix = doc.createElement('div');
  var pixId = getNextId();
  pix.innerHTML = [
    '<div class="hw-gmail-pix">',
    '<div class="hw-gmail-pix-photo">',
    '<div class="hw-gmail-pix-photo-inner" ',
    ' id="', pixId, '"',
    ' style="background-image:url(', getGmailSrc(email), ');">',
    '</div>',
    '</div>',
    '<div class="hw-gmail-pix-info"></div>',
    '</div>'
  ].join('');

  bd.insertBefore(pix, bd.firstChild);
  // TODO(hedger): Will work on this GAvatarlater.
  // displayGAvatarPix(doc, email, doc.getElementById(pixId));
}

function displayGAvatarPix(doc, email, displayEl) {
  // http://gravatar.com/avatar/empty.jpg
  var src = getGAvatarSrc(email);
  var img = doc.createElement('img');
  var dispose = function (){
    img.onload = null; 
    img.onerror = null;
    img.parentNode.removeChild(img);
    img = null;
    dispose = null;
    doc = null;
  };
  img.onload = function (){
    var src1 = getBase64Image(doc, img); 
    alert(src1);
    dispose();
  };
  img.onerror = dispose;
  img.style.cssText = 'position:absolute;left:0;top:0;';
  img.src = src;
  doc.body.insertBefore(img, doc.body.firstChild);
}

waitForContentFrame();