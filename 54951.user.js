// ==UserScript==
// @name           Wiki ETI redirect fixer
// @namespace      shoecream@luelinks.net
// @description    Fixes the redirects to eti on the wiki
// @include        http://wiki.endoftheinter.net*
// ==/UserScript==

var XHR = {};

XHR.createDoc = function (r, callback) {
  var doc = document.implementation.createDocument('','',null);
  var html = document.createElement('html');
  html.innerHTML = r.responseText;
  doc.appendChild(html);
  r.doc = doc;
  callback(r);
}

XHR.get = function (url, callback) {
  GM_xmlhttpRequest({
      method: 'GET',
      url: url,
      headers: {
        'User-Agent': navigator.userAgent,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      onload: function (r) { XHR.createDoc(r, callback) }
    });
}

String.prototype.format = function format () {
  var string = this;
  Array.prototype.forEach.call(arguments, function (e, i) {
      string = string.replace('{' + i + '}', e, 'g');
    });
  return string;
}

function find_parent (dom, callback) {
  // calls the callback for each parentNode of the dom element supplied. if the
  // callback evaluates true, then this function will return the dom parent 
  // that it evaluted true for. if it can't find the parent (haha suck it 
  // orphans!) then it'll return false or undefined or whatever
  if (typeof callback != 'function') throw new TypeError();
  do {
    if (callback(dom.parentNode)) {
      return dom.parentNode;
    }
  } while (dom = dom.parentNode);
  return;
}

function find_children (dom, callback) {
  if (typeof callback != 'function') throw new TypeError();
  var stack = [];
  var children = dom.childNodes;
  for (var i = 0; i < children.length; i++) {
    if (callback(children[i]))
      stack.push(children[i]);
    if (children[i].hasChildNodes()) {
      var newstack = find_children(children[i], callback);
      if (newstack.length) {
        // flatten the array
        for (var j = 0; j < newstack.length; j++) {
          stack.push(newstack[j]);
        }
      }
    }
  }
  return stack;
}

function qw (string) {
  return string.split(/\s+/);
}

function inject() {
  var toolbar = document.getElementsByClassName('mw-editTools');
  toolbar[0].innerHTML = '<input type="button" id="x-redirect" value="Update URLs"/>';
  var button = document.getElementById('x-redirect');
  button.addEventListener('click', process, false);
}

function process() {
  var disableID = qw('x-redirect wpTextbox1 wpSummary wpSave wpPreview');
  var enableID = qw('wpTextbox1 wpSummary');
  for (var e in disableID) {
    document.getElementById(disableID[e]).disabled = true;
  }
  var button = document.getElementById('x-redirect');
  button.value = 'Grabbing URLs...';

  var render = 'http://wiki.endoftheinter.net/index.php?title={0}&action=render'
    .format(/title=(.+)&/.exec(location.href)[1]);
  XHR.get(render, render_handler);

  function render_handler(r) {
    var exlinks = r.doc.getElementsByClassName('external');
    var counter = 0;
    var dictionary = {};
    Array.forEach(exlinks, cb);
    function cb (e) {
      if (/luelinks\.net/.test(e)) {
        counter++;
        XHR.get(e.href, oldlink_handler);
      }
      function oldlink_handler (response) {
        counter--;
        dictionary[e.href] = response.doc.getElementsByTagName('a')[0].href;
        if (counter < 1) { on_finish(dictionary); button.value = 'done'; }
      } 
    }
  }
  function on_finish(dictionary) {
    var textbox = document.getElementById('wpTextbox1');
    for (var key in dictionary) {
      if (/https?:\/\/i\d/.test(key)) continue;
      textbox.value = textbox.value.replace(key, dictionary[key], 'g');
    }
    for (var d in enableID) {
      document.getElementById(enableID[d]).disabled = false;
    }
  }
}


if (/action=(?:edit|submit)/.test(location.href)) {
  inject();
}
