// ==UserScript==
// @name         Typeonline.co.uk Keyboard Shortcuts
// @author       Chris Bernard <cebernard@gmail.com>
// @description  Adds hotkeys Cntl-J, -K, and -N for Start/Stop/New typing test.  Why lower your WPM by mousing?
// @namespace    typeonline
// @include      http://www.typeonline.co.uk/typingspeed.php
// @version      0.1.0
// ==/UserScript==

(function (d) {
  var j_key = 74, k_key = 75, n_key = 78;
  var pressedControlAnd = function (key, e) {
    return (e.keyCode == key && e.ctrlKey &&
            !(e.shiftKey && e.altKey && e.metaKey)) ? true : false;
  };
  d.addEventListener('keydown', function (e) {
    if (!e.ctrlKey) return;
    if (pressedControlAnd(j_key, e)) { // Start test
      document.getElementById("startButton").click();
    }
    if (pressedControlAnd(k_key, e)) { // Stop test
      document.getElementById("stopButton").click();
    }
    if (pressedControlAnd(n_key, e)) { // Get new test
      document.getElementById("textDisplay").submit();
    }
  }, false);
})(document);
