// ==UserScript==
// @name           dA Extended Message Counts
// @namespace      http://agorf.gr/
// @include        http://*.deviantart.com/*
// @exclude        http://my.deviantart.com/messages/*
// ==/UserScript==

var types = {
// code      singular     plural        fragment
  'AD'   : ['Admin',     'Admin',      'admin'],
  'D'    : ['Deviation', 'Deviations', 'deviations'],
  'J'    : ['Journal',   'Journals',   'journals'],
  'N'    : ['Notice',    'Notices',    'notices'],
  'NW'   : ['News',      'News',       'news'],
  'P'    : ['Poll',      'Polls',      'polls'],
  'A'    : ['Activity',  'Activities', 'activity'],
  'C'    : ['Comment',   'Comments',   'comments'],
  'R'    : ['Reply',     'Replies',    'replies'],
  'Notes': ['Note',      'Notes',      'notes']
};

var span = document.getElementById('rockdock-message-count');

if (!span) {
  return;
}

var counts = {};
var links = span.getElementsByTagName('a');
var title;

switch (links.length) {
  case 3:
    counts['Notes'] = links[2].innerHTML.split(' ')[0];
    /* fallthru */
  case 2:
    counts['D'] = links[0].innerHTML.split(' ')[0];
    title = links[1].getAttribute('title');
    break;
  case 1:
    title = links[0].getAttribute('title');
    break;
}

if (!title) {
  return;
}

var node;

while (span.childNodes.length > 0) {
  node = span.childNodes[0];
  node.parentNode.removeChild(node);
}

var parts = title.split(', ');
var code, count;

for (var i = 0; i < parts.length; i++) {
  count = parseInt(parts[i]);
  code = parts[i].substr(count.toString().length);
  counts[code] = count;
}

var i = 0;
var a, text;
var comma = document.createTextNode(', ');

for (var code in types) {
  if (!counts[code]) {
    continue;
  }

  if (i++ > 0) {
    span.appendChild(comma.cloneNode(false));
  }

  a = document.createElement('a');
  a.href = 'http://my.deviantart.com/messages/#view=' + types[code][2];
  text = document.createTextNode(counts[code] + ' ' + (counts[code] == 1 ? types[code][0] : types[code][1]));
  a.appendChild(text);
  span.appendChild(a);
}
