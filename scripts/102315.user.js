// ==UserScript==
// @name          Utilities for livedoor Reader (modified)
// @description   Make livedoor Reader more convenient.
// @namespace     http://blog.livedoor.jp/hakin/
// @include       http://reader.livedoor.com/reader/*
// ==/UserScript==
// based on http://d.hatena.ne.jp/antipop/20060430/1146343265
// based on http://d.hatena.ne.jp/gan2/20080225/1203943256

(function(){
  var w = unsafeWindow;
  var _onload = w.onload;
  var onload  = function() {
    with (w) {
      // (最後|最初)の記事で(j|k)を押したときに(次|前)のフィードに移動する
      Keybind.add('j', Control.go_next);
      Keybind.add('k', Control.go_prev);

      // hide ads
      //       ['ads_top', 'ads_bottom'].forEach(function(v){DOM.hide(v);});
      ['ads_bottom'].forEach(function(v){DOM.hide(v);});

      // move total-unread-count into the control box
      var total_unread_count = $('total_unread_count');
      setStyle(total_unread_count, {
        'position' : 'absolute',
        'right'  : '120px',
        'top'    : '5px',
        'font-size': '12px'
      });
      DOM.insert($('control'), total_unread_count, $('fontpad'));

      // move message_box into the control box
      var message_box = $('message_box');
      setStyle(message_box, {
        'position' : 'absolute',
        'left' : '500px',
        'margin-top' : '1px',
        'z-index' : '10'
      });
      DOM.insert($('control'), message_box, $('fontpad'));

      // replace Control.toggle_fullscreen with custom function
      var toggle_fullscreen_with_control = function() {
        var fs = [];
        var elements = ['header', 'menu', 'control', 'footer'];
        fs[0] = ['header', 'menu', 'control', 'footer'];
        fs[1] = ['menu', 'control'];
        fs[2] = ['control'];
        fs[3] = [];
        if (!State.fullscreen) {
          State.fullscreen = 1;
        } else if (State.fullscreen == fs.length-1) {
          State.fullscreen = 0;
        } else {
          State.fullscreen++
        }
        Element.hide(elements);
        Element.show(fs[State.fullscreen]);
        fit_screen()
      };
      Keybind.add("Z", toggle_fullscreen_with_control);

      // make the view-area wide on the page loaded
      var i = 2;
      while (i) {
        toggle_fullscreen_with_control();
        i--;
      }
      
      // Ctrl+Shiftなどのショートカットキーを無効にする from(http://userscripts.org/scripts/review/53670)
      ["shift+ctrl",
        "shift+down",
        "ctrl+shift",
        "shift+up",
        "shift+home",
        "shift+end",
        "ctrl+enter",
        "enter",
        "shift+enter"
      ].forEach(function (k) {
        delete Keybind._keyfunc[k];
      });
    }
  };

  w.onload = function(){
    _onload();
    onload();
  };
})();