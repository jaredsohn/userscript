// ==UserScript==
// @name          Select Range
// @namespace     http://moeffju.net/dA/hack/js/selectRange
// @description   Toggle a range of checkboxes by clicking the first and shift-clicking the last (think selectboxes behaviour)
// @include       *
// ==/UserScript==

var cur;

var checkEvent = function (e) {
  if (e.target.tagName == 'INPUT' && e.target.type == 'checkbox' && (e.button==0 || e.keyCode==32)) {
    // already have a starting point, and shift is pressed?
    if (cur && e.shiftKey) selectRange(cur, e.target);
    cur = e.target;
  }
}

var selectRange = function (from,to) {
  var inputs = document.getElementsByTagName('input');
  var checkboxes = [];
  var last;
  var i;
  
  // this might be better with xpath, but I'm lazy
  for (i = 0; i < inputs.length; i++)
    if (inputs[i].getAttribute('type') == 'checkbox')
      checkboxes.push(inputs[i]);
  
  for (i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i] == to) {
      last = from;
      break;
    }
    if (checkboxes[i] == from) {
      last = to;
      break;
    }
  }
  
  for (; i < checkboxes.length; i++) {
    if (checkboxes[i] != from && checkboxes[i] != to) { // from and to have been clicked by the user
      if (checkboxes[i].checked != from.checked) { // state change?
        // fire onclick (magic)
        var e = document.createEvent('MouseEvents');
        e.initEvent('click', true, false);
        checkboxes[i].dispatchEvent(e);
      }
    }
    if (checkboxes[i] == last) break;
  }
}

var init = function () {
  // mouse clicks (event.button == 0)
  document.documentElement.addEventListener('click', checkEvent, true);
  // keyboard selection (event.keyCode == 32 / space)
  document.documentElement.addEventListener('keyup', checkEvent, true);
}

init();
