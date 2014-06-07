// ==UserScript==
// @name    Feedly Scroll Marker
// @description    Display the marker of page scroll in Feedly. / Feedlyでページスクロールしたときにマーカーを表示します。
// @id    FeedlyScrollMarker
// @namespace    http://userscripts.org/scripts/show/174679
// @homepage    https://userscripts.org/scripts/show/174679
// @updateURL    https://userscripts.org/scripts/source/174679.meta.js
// @include    http://feedly.com/*
// @include    https://feedly.com/*
// @version    1.02
// @grant    GM_addStyle
// ==/UserScript==

(function() {

try { if (typeof localStorage !== 'object') return alert('FSM Error: DOM Storage'); }
catch(er) { return alert('FSM Error: DOM Storage'); }
var $id = function(id) { return document.getElementById(id); }, iInit;

var init = function() {
  var nScrPos = 0, nTime = 750, shift = false, iMarker, st;
  var ism = document.createElement('div');
  ism.id = 'fsm_scroll_marker';
  document.body.appendChild(ism);
  var CSS = [
    '#fsm_settings { display: none; color: black; position: absolute; top: 68px; left: 68px; z-index: 90200; background: rgba(255, 255, 255, 0.98); border: 1px solid #999999; border-radius: 4px; min-width: 35em; box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); }',
    '#fsm_s_titlebar { background-color: #666666; border-radius: 4px 4px 0 0; padding: 2px 0 0 4px; height: 2em; }',
    '#fsm_s_title a { font-size: 110%; font-weight: bold; color: white; text-decoration: none; }',
    '#fsm_s_title a:hover { color: #FFFF99; }',
    '#fsm_s_btn { position: absolute; top: 2px; right: 4px; }',
    '#fsm_s_ok { margin-right: 0.5em; padding: 0 2em; }',
    '#fsm_s_cancel { padding: 0 1ex; }',
    '#fsm_s_ok, #fsm_s_cancel { font-size: 80%; }',
    '#fsm_s_body { padding: 0.5em 1em; }',
    '#fsm_s_body fieldset { margin: 4px 2px; background: rgba(255, 255, 255, 0); }',
    '#fsm_s_body input { margin-left: 0.5em; text-align: center; width: 6ex; }',
    '#fsm_s_body input[type="checkbox"] { vertical-align: middle; width: auto; }',
    '#fsm_s_time { vertical-align: inherit; }',
    '#fsm_scroll_marker { position: absolute; width: 100%; height: 4px; margin-top: -2px; background: rgba(255,0,0,0.25); display: none; z-index: 88800; }'
  ].join('');
  GM_addStyle(CSS);
  
  var locale_ja = [
    '設定',
    'キャンセル',
    'マーカーを表示する時間 (ミリ秒):',
    'マーカーを表示するショートカットキー'
  ];
  var locale_en = [
    'Settings',
    'Cancel',
    'Time to display the marker (msec):',
    'Keyboard shortcut to display the marker'
  ];
  var loc = (window.navigator.language === 'ja') ? locale_ja : locale_en;
  
  var currentEntry = function() {
    var t1 = 'pageActionLayout', t2 = 'pageLayoutAction selected';
    var fo = ($id(t1 + '0').className === t2) ? 'T'
            : ($id(t1 + '4').className === t2) ? 'M'
            : ($id(t1 + '6').className === t2) ? 'C'
            : ($id(t1 + '100').className === t2) ? 'F' : '';
    switch (fo) {
      case 'T': case 'M': case 'C':
        return document.evaluate('id("timeline")//div[contains(concat(" ", @class, " "), " inlineFrame ")]', document, null, 9, null).singleNodeValue;
      case 'F':
        return document.evaluate('id("timeline")//div[contains(concat(" ", @class, " "), " selectedEntry ")]', document, null, 9, null).singleNodeValue;
      default:
        return document.evaluate('id("mainArea")//div[contains(concat(" ", @class, " "), " inlineFrame ")]', document, null, 9, null).singleNodeValue;
    }
  };
  
  var viewSettings = function() {
    if ($id('fsm_settings').style.display === 'block') {
      $id('fsm_settings').style.display = 'none';
      return;
    }
    $id('fsm_s_time').value = st.time;
    $id('fsm_s_key_page').checked = (st.key_page) ? true : false;
    $id('fsm_s_key_space').checked = (st.key_space) ? true : false;
    $id('fsm_settings').style.display = 'block';
  };
  
  var loadSettings = function() {
    st = {};
    try {
      st = JSON.parse(localStorage.getItem('FeedlyScrollMarker_settings')) || {};
    } catch(er) { alert('FSM Error: Load Settings'); }
    var notB = function(a) {
      return (typeof a !== 'boolean') ? true : false;
    };
    var notN = function(a) {
      return (typeof a !== 'number') ? true : false;
    };
    if (notN(st.time)) st.time = nTime;
    if (notB(st.key_page)) st.key_page = true;
    if (notB(st.key_space)) st.key_space = true;
  };
  
  var saveSettings = function() {
    try {
      localStorage.setItem('FeedlyScrollMarker_settings', JSON.stringify(st));
    } catch(er) { alert('FSM Error: Save Settings'); }
  };
  
  var div = document.createElement('div');
  div.id = 'fsm_settings';
  document.body.appendChild(div);
  $id('fsm_settings').innerHTML = '<div id="fsm_s_titlebar"><div id="fsm_s_title"><a href="https://userscripts.org/scripts/show/174679" target="_blank">Feedly Scroll Marker ' + loc[0] + '</a></div><div id="fsm_s_btn"><input type="button" id="fsm_s_ok" value="OK"><input type="button" id="fsm_s_cancel" value="' + loc[1] + '"></div></div><div id="fsm_s_body"><label>' + loc[2] + '<input id="fsm_s_time" type="text" maxlength="4"></label><fieldset><legend>' + loc[3] + ' : </legend><label><input id="fsm_s_key_page" type="checkbox">PageUp / PageDown</label><br><label><input id="fsm_s_key_space" type="checkbox">Space / Shift+Space</label></fieldset></div>';
  
  if ($id('feedlyTabs')) {
    var div1 = document.evaluate('id("feedlyTabs")/div[2]/div[@style="margin-top:32px; margin-bottom:32px"]', document, null, 9, null).singleNodeValue;
    if (div1) {
      var div2 = document.createElement('div');
      div2.className = 'tab';
      div2.innerHTML = '<div class="header target"><div id="fsm_settings-menu" style="color:inherit; padding-left:32px;" target="new" class="label">Scroll Marker ' + loc[0] + '</div></div>';
      window.setTimeout(function() {
        div1.appendChild(div2);
      }, 1500);
    }
  }
  
  document.addEventListener('keydown', function(e) {
    if (!/^input|^textarea/i.test(e.target.tagName) && st.time !== 0) {
        if (
        (st.key_page && e.keyCode === 33) ||
        (st.key_page && e.keyCode === 34) ||
        (st.key_space && e.keyCode === 32)
      ) {
        ism.style.display = 'none';
        nScrPos = document.body.scrollTop;
        if (e.shiftKey) shift = true;
      } else if (e.keyCode === 13) {
        if (currentEntry()) {
          window.clearTimeout(iMarker);
          ism.style.display = 'none';
        }
      } else if (ism.style.display !== 'none') {
        window.clearTimeout(iMarker);
        ism.style.display = 'none';
      }
    }
  }, true);
  
  document.addEventListener('keyup', function(e) {
    if (!/^input|^textarea/i.test(e.target.tagName) && st.time !== 0) {
      var sch = document.body.clientHeight;
      var sst = document.body.scrollTop;
      if (
        (st.key_page && e.keyCode === 33) ||
        (st.key_space && e.keyCode === 32 && e.shiftKey)
      ) {
        if (nScrPos !== sst) {
          ism.style.display = 'block';
          ism.style.top = (nScrPos - (ism.scrollHeight / 2)) + 'px';
          window.clearTimeout(iMarker);
          if (st.time > 0) {
            iMarker = window.setTimeout(function() {
              window.clearTimeout(iMarker);
              ism.style.display = 'none';
            }, st.time);
          }
        }
        shift = false;
      } else if (
        (st.key_page && e.keyCode === 34) ||
        (st.key_space && e.keyCode === 32 && !e.shiftKey)
      ) {
        if (nScrPos !== sst) {
          ism.style.display = 'block';
          ism.style.top = (nScrPos + sch + (ism.scrollHeight / 2)) + 'px';
          window.clearTimeout(iMarker);
          if (st.time > 0) {
            iMarker = window.setTimeout(function() {
              window.clearTimeout(iMarker);
              ism.style.display = 'none';
            }, st.time);
          }
        }
        shift = false;
      }
    }
  }, true);
  
  document.addEventListener('click', function(e) {
    if (e.button >= 2) return;
    if (e.target.id === 'fsm_settings-menu') {
      viewSettings();
    } else if (e.target.id === 'fsm_s_ok') {
      var time = $id('fsm_s_time').value, problem = false;
      if (time === '' || /^\s+$/.test(time)) st.time = nTime;
      else if (time && !isNaN(time)) st.time = Number(time);
      else problem = true;
      if (!problem) {
        st.key_page = $id('fsm_s_key_page').checked;
        st.key_space = $id('fsm_s_key_space').checked;
        $id('fsm_s_ok').blur();
        $id('fsm_settings').style.display = 'none';
        saveSettings();
      }
    } else if (e.target.id === 'fsm_s_cancel') {
      $id('fsm_s_cancel').blur();
      $id('fsm_settings').style.display = 'none';
    } else if (ism.style.display !== 'none') {
      window.clearTimeout(iMarker);
      ism.style.display = 'none';
    }
  }, false);
  loadSettings();
};

iInit = window.setInterval(function() {
  if ($id('feedlyPage') && $id('pageActionRefresh')) {
    window.clearInterval(iInit);
    window.setTimeout(function() {
      init();
    }, 1000);
  }
}, 500);

})();
