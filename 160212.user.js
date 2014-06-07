// ==UserScript==
// @name        NicoWheelVolume
// @namespace   https://github.com/segabito/
// @description マウスのボタン＋ホイールで、どこでも音量調整 for ニコニコ動画とYouTube
// @include     http://www.nicovideo.jp/watch/*
// @include     http://www.youtube.com/watch*
// @include     https://www.youtube.com/watch*
// @version     1.1.1
// @grant       none
// ==/UserScript==

// * ver 1.1.1
// - https://～ 追加

// * ver 1.1.0
// - 便利だったのでYouTubeにも対応した

// TODO: Chrome対応

(function(window) {
  var document = window.document;

  var monkey = function() {
    var player = null;
    function getPlayer() {
      if (player) return player;

      if (window.WatchApp) {
        return player = document.getElementById('external_nicoplayer');
      } else
      if (window.yt) {
        return player = document.getElementById('movie_player');
      } else {
        return player = document.getElementById('flvplayer');
      }
    }
    function getSiteType() {
      if (location.host.indexOf('nicovideo') >= 0) {
        return 'niconico';
      } else {
        return 'youtube';
      }
    }
    function volume(v) {
      var site = getSiteType(), player = getPlayer();

      if (!player) return;

      if (site === 'niconico') {
        if (typeof v === 'number') {
          player.ext_setVolume(Math.max(0, Math.min(v * 1, 100)));
        }
        return player.ext_getVolume();
      } else {
        if (typeof v === 'number') {
          player.setVolume(Math.max(0, Math.min(v * 1, 100)));
        }
        return player.getVolume();
      }
    }

    var isChanged = false;
    document.body.addEventListener('wheel', function(e) {
      if (typeof e.buttons === 'number') {
        if (e.buttons < 1) return;
      } else {
        return;
      }
      // なんで固定値じゃなくて比率で増減するの？について
      //
      // 投稿動画は動画ごとの音量が統一されていないため、
      // 音量最大付近でもよく聞こえない動画もあれば、音量最小付近でもうるさい動画もある。
      // 固定値による増減だと、後者の音量を調節しづらいので、現在値からの比率で増減させる。
      //
      //
      // なんで音量アップと音量ダウンの比率が異なるの？について
      //
      // 音量を下げる時は「うわっ音でけぇ！」
      // 音量を上げる時は「ちょっと上げようかな？」
      // という場面が多いので、下げる速度のほうが速い。
      // (とはいえ、これが最適だ！という比率を計算したわけではない。適当)
      //
      var v = volume(), delta = e.deltaY * -1;
      isChanged = true;
      if (delta > 0) {
        v = Math.max(v, 1);
        r = (v < 5) ? 1.3 : 1.1;
        v = volume(v * r);
      } else {
        v = volume(Math.floor(v / 1.2));
      }
      e.preventDefault();
    }, false);
    document.body.addEventListener('contextmenu', function (e) {
      if (isChanged) {
        e.preventDefault();
      }
      isChanged = false;
    }, false);
  };

  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.appendChild(document.createTextNode("(" + monkey + ")()"));
  document.body.appendChild(script);
})(unsafeWindow || window);