// ==UserScript==
// @name        Browsershots.org Autoextend (alternative)
// @description Extends the time periodically, until all screenshots are generated.
// @namespace   http://browsershots.org/http://
// @include     http://browsershots.org/http://*
// ==/UserScript==

function find_extend_button () {
  var inputs = document.getElementsByTagName ('input');
  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    if (input.name === 'extend' && input.type === 'submit') {
      return input;
    }
  }
  return null;
}

var match = document.body.innerHTML.match (/Expires in ([0-9]+) minutes/);
if (match) {
  var minutes = Number (match[1]);

  var extend_after = minutes - 10;

  var button = find_extend_button ();
  if (button) {
    if (button.disabled) {
      window.setTimeout (function () { window.location.reload (); }, 60000);
    } else {
      window.setTimeout (function () { button.click (); }, 60000*extend_after);
    }
  } else {
    alert ('Browsershots.org Autoextend: Unexpected error: ' +
           'Unable to find the Extend button');
  }
}

// vim:set et sw=2 sts=2:
