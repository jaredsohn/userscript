// ==UserScript==
// @name        Naver Music Player Tweaks
// @namespace   http://userscripts.org/users/494426
// @include     http://player.music.naver.com/
// @include     http://player.music.naver.com/player.nhn
// @include     http://player.music.naver.com/flashPlayer.nhn
// @updateURL   http://userscripts.org/scripts/source/153003.meta.js
// @version     5
// @grant       none
// ==/UserScript==

var _gm_nmpt_script_func = function() {
  if (document.location == 'http://player.music.naver.com/flashPlayer.nhn') {
    location.href = 'http://player.music.naver.com/player.nhn';
    return;
  }

  var _gm_nmpt_style = document.createElement('style');
  _gm_nmpt_style.type = 'text/css';
  (document.head||document.documentElement).appendChild(_gm_nmpt_style);

  function gm_nmpt_add_style(cssString) {
    _gm_nmpt_style.innerHTML = _gm_nmpt_style.innerHTML + "\n" + cssString;
  }

  function gm_nmpt_clear_styles() {
    _gm_nmpt_style.innerHTML = '';
  }

  function gm_nmpt_update_styles() {

    gm_nmpt_clear_styles();

    var docH = window.innerHeight;
    var docW = document.body.clientWidth;

    var listW = docW - 166;
    var listH = docH - 56;

    gm_nmpt_add_style('body { overflow: hidden !important }');

    gm_nmpt_add_style('#wrap { width: 100% !important; height: ' + docH + 'px !important; overflow: visible !important; }');
    gm_nmpt_add_style('#_dim_layer { width: ' + docW + 'px !important }');
    gm_nmpt_add_style('#_dim_layer { height: ' + docH + 'px !important }');

    gm_nmpt_add_style('.player { height: ' + docH + 'px !important }');
    gm_nmpt_add_style('.player { background-repeat: no-repeat !important }');
    gm_nmpt_add_style('.player { background-color: #25252e !important }');

    gm_nmpt_add_style('.tabs, .panels, .panel, .tip { width: ' + listW + 'px !important }');
    gm_nmpt_add_style('.panels, .panel { height: ' + listH + 'px !important }');

    gm_nmpt_add_style('.play_list_w, .lyric_w, .no_result { width: ' + listW + 'px !important }');
    gm_nmpt_add_style('.play_list_w, .lyric_w { height: ' + (listH - 28) + 'px !important }');

    gm_nmpt_add_style('._item_origin { width: ' + (listW - 132) + 'px !important }');

    gm_nmpt_add_style('#_send_layer { top: ' + (docH - 123) + 'px !important }');
    gm_nmpt_add_style('#_send_layer { left: 401px !important }');

    gm_nmpt_add_style('#_option_layer { top: 27px !important }');
    gm_nmpt_add_style('#_option_layer { left: ' + (docW - 148) + 'px !important }');
  }

  window.addEventListener("resize", gm_nmpt_update_styles, false);

  gm_nmpt_update_styles();

  setInterval(function() {
    if (!document.defaultView) {
      return;
    }
    if (!document.defaultView.oMusicPlayer) {
      return;
    }

    // Fake interaction for uninterrupted continuous playback.
    var cnt = document.defaultView.oMusicPlayer.nNoneInteractionCount;
    if (cnt > 0) {
      console.log("Resetting nNoneInteractionCount(" + cnt + ')');
      document.defaultView.oMusicPlayer.nNoneInteractionCount = 0;
    }
  }, 60000);

  var _gm_nmpt_redirected = false;
  setInterval(function() {
    if (!document.defaultView) {
      return;
    }
    if (!document.defaultView.oMusicPlayer) {
      return;
    }
    if (!document.defaultView.oMusicPlayer.oAuthorization) {
      return;
    }
    if (document.defaultView.oMusicPlayer.oAuthorization.isLogin()) {
      return;
    }

    if (!_gm_nmpt_redirected) {
      _gm_nmpt_redirected = true;
      location.href = 'https://nid.naver.com/nidlogin.login?svctype=64&url=http%3A%2F%2Fplayer.music.naver.com%2Fplayer.nhn';
    }
  }, 1000);
}

var _gm_nmpt_script = document.createElement("script");
_gm_nmpt_script.type = "text/javascript";
_gm_nmpt_script.textContent = '(' + _gm_nmpt_script_func + ')()';
(document.head||document.documentElement).appendChild(_gm_nmpt_script);
