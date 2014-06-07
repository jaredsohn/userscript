// ==UserScript==
// @name friends_timeline B Gone
// @namespace http://benatkin.com/
// @description Hides tweets in friends_timeline on twitter.com
// @include http://twitter.com/
// ==/UserScript==

(function() {
  var css = "body.timeline li.status { visibility: hidden; }";

  get_css = function() {
    var new_css = "";
    if (/twitter\.com\/$/.test(window.location.href)) {
      new_css = css;
    }
    return new_css;
  };

  var update_style = function() {
    var new_css = get_css();
    style = document.getElementById('hideStatusStyle');
    if (style.innerHTML != new_css) {
      style.innerHTML = new_css;
    }
  }

  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.id = 'hideStatusStyle';
  style.type = 'text/css';
  style.innerHTML = get_css();
  head.appendChild(style);

  setInterval(update_style, 50);
})();

