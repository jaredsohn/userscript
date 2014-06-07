// ==UserScript==
// @name           test
// ==/UserScript==

javascript:(function(){
  var h = window.location.href.toString();
  var h1;
  if (h.search('isDebug=1') != -1) {
    h1 = h.replace('isDebug=1', 'isDebug=0');
  } else if (h.search('isDebug=0') != -1) {
    h1 = h.replace('isDebug=0','isDebug=1');
  } else {
    var split = h.split('#');
    h1 = split[0] + (split[0].indexOf('?') == -1 ? '?' : '&') + 'isDebug=1';
    if (split.length > 1) h1 += '#' + split[1];
  }
  window.location.href = h1;
}())
