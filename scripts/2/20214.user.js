// Copyright 2008 by N-Dream.com (Andrin von Rechenberg)
//
// ==UserScript==
// @name          Gmail2 Saved Searches
// @namespace     http://mail.google.com/
// @description   Adds a Saved Search nav box to Gmail
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

window.addEventListener('load', function() {
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', init)
  }
}, true);

function hostId() {
  var id = "s";
  var l = top.location.href;
  var n = l.indexOf("mail.google.com/a/");
  if (n != -1) {
    l = l.substr(n + 18);
    l = l.substr(0, l.indexOf("/"));
    id += l;
  }
  return id;
}

function getData() {
  return GM_getValue(hostId(), "to me directly|#search/to%3Ame\n");
}

function addSearchElement(gmail, module, text, search) {
  var div = gmail.getNavPaneElement().ownerDocument.createElement('div');
  with(div.style) {
    background = 'white';
    color = 'rgb(125,108,58)';
    padding = '4px';
  }

  // Creating delete button
  var del = document.createElement('span');
  with(del.style) {
    cursor = 'pointer';
  }
  del.appendChild(document.createTextNode('x'));
  var newStyle = del.style.cssText + 'float:right;'
  del.setAttribute('style', newStyle);

  var h = hostId();
  del.addEventListener('click', function(evt) {
    window.setTimeout(function() {
      var parts = getData();
      parts = parts.split("\n");
      newparts = "";
      for (var i = 0; i < parts.length; ++i) {
        if (parts[i].indexOf(text + "|") != 0) {
          newparts += parts[i] + "\n";
        }
      }
      GM_setValue(h, newparts);
      redraw(gmail, module);
    }, 0);
  }, false);

  
  // Creating label
  var label = document.createElement('span');
  label.appendChild(document.createTextNode(text));
  with(label.style) {
    cursor = 'pointer';
    textDecoration = 'underline';
  }

  label.addEventListener('click', function(evt) {
    top.location.hash = search;
  }, false);

  // Appending children
  div.appendChild(del);
  div.appendChild(label);
  module.getContentElement().appendChild(div);
}

function addFooterElement(gmail, module) {
  var div = gmail.getNavPaneElement().ownerDocument.createElement('div');
  with(div.style) {
    background = 'white';
    color = 'rgb(125,108,58)';
    padding = '4px';
    fontSize = '80%';
  }

  // Creating help button
  var help = document.createElement('span');
  with(help.style) {
    cursor = 'pointer';
  }
  help.appendChild(document.createTextNode('?'));
  var newStyle = help.style.cssText + 'float:right;'
  help.setAttribute('style', newStyle);
  help.addEventListener('click', function(evt) {
    window.location.href = "http://userscripts.org/scripts/show/20214";
  }, false);

  // Creating Save Button
  var save = document.createElement('span');
  save.appendChild(document.createTextNode("Save this search..."));
  with(save.style) {
    cursor = 'pointer';
    textDecoration = 'underline';
  }
  var h = hostId();
  save.addEventListener('click', function(evt) {
    window.setTimeout(function() {
      var name = "";
      var current = getData();
      while (name == "" || 
            name.indexOf("|") != -1 ||
            current.indexOf(name + "|") != -1) {
        name = prompt("Please enter a name for this search", name);
        if (name == null) {
          return;
        }
        if (name.indexOf("|") != -1) {
          alert("| is not allowed.")
        }
        if (current.indexOf(name + "|") != -1) {
          alert("'" + name + "' is already taken.")
        }
      }
      GM_setValue(h, current + name + "|" + top.location.hash + "\n");
      redraw(gmail, module);
    }, 0);
  }, false);

  // Appending children
  div.appendChild(help);
  div.appendChild(save);
  module.getContentElement().appendChild(div);
}

function redraw(gmail, module) {
  var m = module.getContentElement();
  while (m.childNodes.length) {
    m.removeChild(m.firstChild);
  }
  window.setTimeout(function() {
    var parts = getData();
    parts = parts.split("\n").sort();
    for (var i = 0; i < parts.length; ++i) {
      var n = parts[i].indexOf("|");
      if (n != -1) {
        addSearchElement(gmail, module, parts[i].substr(0, n),
          parts[i].substr(n + 1));
      }
    }
    addFooterElement(gmail, module);
  }, 0);
}

function init(gmail) {
  var module = gmail.addNavModule('Searches', '', 'rgb(251,216,117)');
  redraw(gmail, module);
}