// ==UserScript==
// @name        Bugs Music Player Tweaks
// @namespace   http://userscripts.org/users/494426
// @include     http://music.bugs.co.kr/newPlayer*
// @updateURL   http://userscripts.org/scripts/source/187104.meta.js
// @version     1
// @grant       none
// ==/UserScript==

var _gm_bmpt_script_func = function() {
  var _gm_bmpt_style = document.createElement('style');
  _gm_bmpt_style.type = 'text/css';
  (document.head||document.documentElement).appendChild(_gm_bmpt_style);

  function gm_bmpt_add_style(cssString) {
    _gm_bmpt_style.innerHTML = _gm_bmpt_style.innerHTML + "\n" + cssString;
  }

  function gm_bmpt_clear_styles() {
    _gm_bmpt_style.innerHTML = '';
  }

  function gm_bmpt_update_styles() {

    gm_bmpt_clear_styles();

    var docH = window.innerHeight;
    var docW = document.body.clientWidth;

    var playlistW = docW - 2;
    var playlistWrapperH = docH - 299;
    var playlistH = docH - 312;
    var trackW = docW - 16;

    gm_bmpt_add_style('#container, #pgBasicPlayer { width: ' + docW + 'px !important; }');
    gm_bmpt_add_style('#container, #pgBasicPlayer { height: ' + docH + 'px !important; }');
    gm_bmpt_add_style('#container, #pgBasicPlayer { overflow: hidden !important; }');
    gm_bmpt_add_style('#pgBasicPlayer{ width:auto; }');
    gm_bmpt_add_style('.ctl .trackInfo { float: left !important; margin-left: 1em !important; width: auto !important;}');
    gm_bmpt_add_style('.ctl .playCtl { float: left !important; margin-left: 1em; margin-top: 78px; position: absolute; left: 110px; }');
    gm_bmpt_add_style('.progress { float: left; margin-left: 12px !important; }');
    gm_bmpt_add_style('.progress .time { padding-right: 2px; margin-top: -4px; }');
    gm_bmpt_add_style('.tabPlayer { background: rgb(84, 87, 90) !important; }');
    gm_bmpt_add_style('.skinBlack .tabPlayer { background: #000000 !important; }');
    gm_bmpt_add_style('.listRow { width: ' + trackW + 'px !important; }');
    gm_bmpt_add_style('.listRow .scrollTrackWrap { width: auto !important; }');
    gm_bmpt_add_style('.myList { width: ' + trackW + 'px !important; }');
    gm_bmpt_add_style('.myListRow { width: ' + trackW + 'px !important; }');
    gm_bmpt_add_style('.myalbumtitle { width: auto !important; }');
    gm_bmpt_add_style('.listWrap { height: ' + playlistWrapperH + 'px !important;}');    
    gm_bmpt_add_style('.scrollArea { height: ' + playlistH + 'px !important; }');
    gm_bmpt_add_style('.scrollArea > .list { width: ' + playlistW + 'px !important; }');
    gm_bmpt_add_style('.scrollArea > .list { height: ' + playlistH + 'px !important; overflow: auto !important; }');
    gm_bmpt_add_style('.scrollArea .jScrollPaneContainer { width: ' + playlistW + 'px !important; }');
    gm_bmpt_add_style('.scrollArea .jScrollPaneContainer, .scrollArea .jScrollPaneTrack { height: ' + playlistH + 'px !important;}');
    gm_bmpt_add_style('.scrollArea .jScrollPaneDrag { height: ' + playlistH/3 + 'px !important;}');

  }

  window.addEventListener("resize", gm_bmpt_update_styles, false);

  gm_bmpt_update_styles();
}

var _gm_bmpt_script = document.createElement("script");
_gm_bmpt_script.type = "text/javascript";
_gm_bmpt_script.textContent = '(' + _gm_bmpt_script_func + ')()';
(document.head||document.documentElement).appendChild(_gm_bmpt_script);
