// ==UserScript==
// @name           AO3 Lazier
// @namespace      ao3lazier
// @description    Adds a latest chapter button to the top navigation.
// @include        http://archiveofourown.org/*
// @match          http://archiveofourown.org/*
// ==/UserScript==

var match = location.pathname.match(/^(\/works\/\d+\/chapters\/)\d+/);

if (match) {
  var chapEls = document.getElementById('selected_id').children;
  var lastChapEl = chapEls[chapEls.length-1];
  if (!lastChapEl.selected) {
    var lastChap = lastChapEl.value;
    var button = document.createElement('a');
    button.href = match[1] + lastChap;
    button.appendChild(document.createTextNode('Latest Chapter ' + String.fromCharCode(0x2192) + '|'));
    var buttonParent = document.createElement('li');
    buttonParent.className = 'chapter';
    buttonParent.appendChild(button);
    var chapsParent = document.getElementById('chapter_index').parentElement;
    chapsParent.parentElement.insertBefore(buttonParent, chapsParent);
  }
}