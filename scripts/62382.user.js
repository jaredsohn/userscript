// ==UserScript==
// @name           ldR: Go prev/next feed with wheel
// @namespace      http://hail2u.net/
// @description    livedoor Readerでホイール・スクロールし切ると自動的に前後のフィードに移動する
// @include        http://reader.livedoor.com/reader/*
// ==/UserScript==

window.addEventListener("load", function (e) {
  var w = unsafeWindow;
  var asobi = 6; // ホイールを「asobi + 1」回回すと前後へ移動する
  var asobi_count = {};
  var reset_asobi = function () {
    asobi_count = {
      prev: 0,
      next: 0
    };
  };

  reset_asobi();

  var t = document.getElementById("right_container");

  t.addEventListener("DOMMouseScroll", function (e) {
    if (t.scrollTop === 0 && e.wheelDelta > 0) {
      asobi_count.prev++;
      asobi_count.next = 0;

      if (asobi_count.prev > asobi) {
        w.Control.read_prev_subs();
        e.preventDefault();
        e.stopPropagation();
        reset_asobi();
      }
    }

    var remain = t.scrollHeight - t.clientHeight - t.scrollTop;

    if (w.writing_complete() && remain === 0 && e.wheelDelta > 0) {
      asobi_count.prev = 0;
      asobi_count.next++;

      if (asobi_count.next > asobi) {
        w.Control.read_next_subs();
        e.preventDefault();
        e.stopPropagation();
        reset_asobi();
      }
    }
  }, false);
}, false);
