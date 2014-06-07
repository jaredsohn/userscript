// ==UserScript==
// @name        LDR SHIFT+CTRL key is invalidated. 
// @namespace   http://www.hide10.com/
// @description livedoor Reader SHIFT+CTRL key is invalidated. 
// @include     http://reader.livedoor.com/reader/*
// ==/UserScript==
// based on     http://blog.livedoor.jp/hakin/archives/50674506.html
// Referred     http://d.hatena.ne.jp/reinyannyan/20060511/p1

(function(){
     var w = unsafeWindow;
     var _onload = w.onload;
     var onload  = function(){
         with (w) {
            [ "shift+ctrl",
              "shift+down",
              "ctrl+shift",
              "shift+up",
              "shift+home",
              "shift+end",
              "ctrl+enter",
              "enter",
              "shift+enter" ].forEach(function (k) {
                delete Keybind._keyfunc[k];
              });
         }
     };

     w.onload = function(){
         _onload();
         onload();
     };
})();
