// ==UserScript==
// @name           FFFFOUND FFFFH*ck! KEYBIND FIXER FOR AutoPagerize
// @namespace      http://d.hatena.ne.jp/koyachi/
// @include        http://ffffound.com*
// ==/UserScript==
//
// 2007-06-07 t.koyachi
//

(function() {
  with (unsafeWindow) {
    move_asset = function(delta) {
      var is_moved = 0;
      if (!g_asset_loaded) {
        return is_moved;
      }
      var p = get_current_asset(delta);
      if (p) {
        var e = $(p.id + '-link');
        var x = 0, y = 0;
        if (e) {
          e.focus();
          // x = 150;
          y = p.y;
          is_moved = 1;
        }
        else {
            y = p.y;
        }
        window.scrollTo(x, y);
      }
      return is_moved;
    }
    g_kb.add('j', function() {
      var is_moved = move_asset(1);
      if (!is_moved) {
        calc_scroll_map();
      }
    });
  }
})()
