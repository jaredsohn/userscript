// ==UserScript==
// @name          Tab Tab
// @namespace     http://jeffpalm.com/tabtab
// @description   Double click tab takes you to the search input
// @include       *
// ==/UserScript==

(function() {

  const KEY_CODE_TAB = 9;
  const KEY_CODE_0 = 48;
  const KEY_CODE_Z = 90;
  const MAX_DIFF_MILLIS = 200;
  var lastKeyCode = 0;
  var lastTime = 0;

  function changeFocus(keyCode) {
    var inputs = document.getElementsByTagName('INPUT');
    for (var i=0; i<inputs.length; i++) {
      var input = inputs[i];
      if (!!input.type && input.type != 'text') continue;
      input.focus();
      break;
    }
  }

  function keyPress(e) {
    var keyCode = e.keyCode;
    var now = new Date().getTime();
    if (keyCode == KEY_CODE_TAB) {
      lastTime = now;
    } else if (lastKeyCode == KEY_CODE_TAB) {
      var diff = now - lastTime;
      if (diff < MAX_DIFF_MILLIS) {
	if (KEY_CODE_0 <= keyCode && keyCode <= KEY_CODE_Z) {
	  changeFocus(keyCode);
	}
      }
    }
    lastKeyCode = keyCode;
  }

  function main() {
    window.addEventListener('keydown',keyPress);
  }

  main();
  
})();