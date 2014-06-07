// ==UserScript==
// @name           bccks.jp keybind fixer
// @namespace      http://d.hatena.ne.jp/koyachi/
// @description    Fixing bccks.jp keybind to enable "shift+space".
// @include        http://bccks.jp/viewer/*
// ==/UserScript==
//
// 2007-08-26 t.koyachi
//

(function() {
  var KEY_SPACE = 32;
  keyboardController = function(e) {
    with (unsafeWindow) {
      if (!isInit){ return true; }
      var event = e || window.event;
      var key = event.keyCode;
      if (key == 75 || key == 80 || (event.shiftKey && key == KEY_SPACE)){
        prevSpread();
        window.location = $('prevButton').href;
        return false;
      }else if (key == 74 || key == 78 || key == KEY_SPACE){
        nextSpread();
        window.location = $('nextButton').href;
        return false;
      }
      return true;
    }
  }
  unsafeWindow.document.onkeydown = keyboardController;
})()

