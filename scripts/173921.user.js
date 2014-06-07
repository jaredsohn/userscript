// ==UserScript==
// @name    InoReader Scroll Marker
// @description    Display the marker of page scroll in InoReader. / InoReaderでページスクロールしたときにマーカーを表示します。
// @id    InoReaderScrollMarker
// @namespace    http://userscripts.org/scripts/show/173921
// @homepage    https://userscripts.org/scripts/show/173921
// @updateURL    https://userscripts.org/scripts/source/173921.meta.js
// @include    http://inoreader.com/*
// @include    https://inoreader.com/*
// @include    http://www.inoreader.com/*
// @include    https://www.inoreader.com/*
// @include    http://beta.inoreader.com/*
// @include    https://beta.inoreader.com/*
// @include    http://us.inoreader.com/*
// @include    https://us.inoreader.com/*
// @exclude    *inoreader.com/stream/*
// @exclude    *inoreader.com/m/*
// @version    1.10
// @grant    GM_addStyle
// ==/UserScript==

(function() {
'use strict';

if (!/InoReader/.test(document.title)) return;
try {
  if (typeof localStorage !== 'object') return window.alert('IRSM Error: DOM Storage');
} catch (er) {
  return window.alert('IRSM Error: DOM Storage');
}
var $id = function(id) {
  return document.getElementById(id);
}, iInit;

var init = function() {
  var nScrPos = 0,
    nCheck = 0,
    nTime = 750,
    shift = false,
    exUpKey, exUpCode, exUpShift, exDownKey, exDownCode, exDownShift,
    exOpenKey, exOpenCode, exOpenShift, exSpaceKey, exSpaceCode, exSpaceShift,
    exSSpaceKey, exSSpaceCode, exSSpaceShift, articleID, iMarker, iIrkc, st;
  var ism = document.createElement('div');
  ism.id = 'irsm_scroll_marker';
  $id('reader_pane').insertBefore(ism, $id('reader_pane').firstChild);
  new MutationObserver(function() {
    var rp = $id('reader_pane');
    if (!$id('irsm_scroll_marker') && rp.childNodes.length) {
      rp.insertBefore(ism, rp.firstChild);
    }
  }).observe($id('reader_pane'), {
    childList: true
  });
  var CSS = '#irsm_settings { display: none; color: black; position: absolute; top: 68px; left: 68px; z-index: 90200; background: rgba(255, 255, 255, 0.98); border: 1px solid #999999; border-radius: 4px; box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); }' +
    '#irsm_s_titlebar { background-color: #666666; border-radius: 4px 4px 0 0; padding: 2px 0 0 4px; height: 2em; min-width: 20em; -moz-user-select: none; -webkit-user-select: none; }' +
    '#irsm_s_title a { font-size: 110%; font-weight: bold; color: white; text-decoration: none; }' +
    '#irsm_s_title a:hover { color: #FFFF99; }' +
    '#irsm_s_btn { position: absolute; top: 2px; right: 4px; }' +
    '#irsm_s_ok { margin-right: 0.5em; padding: 0 2em; }' +
    '#irsm_s_cancel { padding: 0 1ex; }' +
    '#irsm_s_ok, #irsm_s_cancel { font-size: 80%; }' +
    '#irsm_s_body { padding: 0.5em 1em; min-width: 30em; }' +
    '#irsm_s_body fieldset { margin: 4px 2px; background: rgba(255, 255, 255, 0); }' +
    '#irsm_s_body input { margin-left: 0.5em; text-align: center; width: 6ex; }' +
    '#irsm_s_body input[type="checkbox"] { vertical-align: middle; width: auto; }' +
    '#irsm_s_time { vertical-align: inherit; }' +
    '#irsm_scroll_marker { position: absolute; width: 100%; height: 4px; margin-top: -2px; background: rgba(255,0,0,0.25); display: none; z-index: 9000; }' +
    '.irsm_s_hide { display: none; }';
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
    if ($id('article_dialog')) {
      return document.evaluate('id("article_dialog")/div[@class="article_full_contents"]', document, null, 9, null).singleNodeValue;
    }
    if ($id('three_way_contents') && $id('three_way_contents').style.display !== 'none' && $id('reader_pane').getElementsByClassName('article_current article_current_3way')[0]) {
      return document.evaluate('id("three_way_contents")/div[@class="article_full_contents"][last()]', document, null, 9, null).singleNodeValue;
    }
    if ($id('subscriptions_articles')) {
      return document.evaluate('id("subscriptions_articles")/div[contains(concat(" ", normalize-space(@class), " "), " article_current ")]', document, null, 9, null).singleNodeValue;
    }
    return document.evaluate('id("reader_pane")//div[contains(concat(" ", normalize-space(@class), " "), " article_current ")]', document, null, 9, null).singleNodeValue;
  };

  var checkArticle = function(e, key) {
    var btn = $id('view_style_img'),
      rp = $id('reader_pane');
    if (((rp && rp.classList.contains('reader_pane_view_style_1')) || (btn && btn.hasAttribute('src') && btn.getAttribute('src') !== 'images/application-image.png')) && (e.keyCode === 32 || e.keyCode === exSpaceCode || e.keyCode === exSSpaceCode)) {
      var ce = currentEntry();
      if (key === 'down') {
        if (ce && ce.id) return ce.id;
        else if (articleID) return articleID;
        else return '';
      } else if (key === 'up') {
        if (ce && ce.id && ce.id !== articleID) {
          return true;
        } else return false;
      } else return false;
    } else return false;
  };

  var exKey = function() {
    if ($id('irkc_key-PageUp')) {
      exUpKey = $id('irkc_key-PageUp').value;
      if (exUpKey) {
        exUpCode = (/^[%&]$/.test(exUpKey)) ? 32 : exUpKey.toUpperCase().charCodeAt(0);
        exUpShift = (isNaN(exUpKey) && exUpKey === exUpKey.toUpperCase() && exUpKey !== '&') ? true : false;
      }
    }
    if ($id('irkc_key-PageDown')) {
      exDownKey = $id('irkc_key-PageDown').value;
      if (exDownKey) {
        exDownCode = (/^[%&]$/.test(exDownKey)) ? 32 : exDownKey.toUpperCase().charCodeAt(0);
        exDownShift = (isNaN(exDownKey) && exDownKey === exDownKey.toUpperCase() && exDownKey !== '&') ? true : false;
      }
    }
    if ($id('irkc_key-space')) {
      exSpaceKey = $id('irkc_key-space').value;
      if (exSpaceKey) {
        exSpaceCode = (/^[%&]$/.test(exSpaceKey)) ? 32 : exSpaceKey.toUpperCase().charCodeAt(0);
        exSpaceShift = (isNaN(exSpaceKey) && exSpaceKey === exSpaceKey.toUpperCase() && exSpaceKey !== '&') ? true : false;
      }
    }
    if ($id('irkc_key-SPACE')) {
      exSSpaceKey = $id('irkc_key-SPACE').value;
      if (exSSpaceKey) {
        exSSpaceCode = (/^[%&]$/.test(exSSpaceKey)) ? 32 : exSSpaceKey.toUpperCase().charCodeAt(0);
        exSSpaceShift = (isNaN(exSSpaceKey) && exSSpaceKey === exSSpaceKey.toUpperCase() && exSSpaceKey !== '&') ? true : false;
      }
    }
    if ($id('irkc_key-o')) {
      exOpenKey = $id('irkc_key-o').value;
      if (exOpenKey) {
        exOpenCode = (/^[%&]$/.test(exOpenKey)) ? 32 : exOpenKey.toUpperCase().charCodeAt(0);
        exOpenShift = (isNaN(exOpenKey) && exOpenKey === exOpenKey.toUpperCase() && exOpenKey !== '&') ? true : false;
      }
    }
  };

  var checkIrkc = function() {
    if ($id('irkc_ok')) {
      window.clearInterval(iIrkc);
      $id('irkc_ok').addEventListener('click', function() {
        exKey();
      }, false);
      exKey();
    } else if (nCheck < 99) nCheck++;
    else window.clearInterval(iIrkc);
  };

  var viewSettings = function() {
    if ($id('irsm_settings').style.display === 'block') {
      $id('irsm_settings').style.display = 'none';
      return;
    }
    $id('irsm_s_time').value = st.time;
    $id('irsm_s_key_page').checked = (st.key_page) ? true : false;
    $id('irsm_s_key_space').checked = (st.key_space) ? true : false;
    $id('irsm_settings').style.display = 'block';
  };

  var loadSettings = function() {
    st = {};
    try {
      st = JSON.parse(localStorage.getItem('InoReaderScrollMarker_settings')) || {};
    } catch (er) {
      window.alert('IRSM Error: Load Settings');
    }
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
      localStorage.setItem('InoReaderScrollMarker_settings', JSON.stringify(st));
    } catch (er) {
      window.alert('IRSM Error: Save Settings');
    }
  };

  var div = document.createElement('div');
  div.id = 'irsm_settings';
  document.body.appendChild(div);
  $id('irsm_settings').innerHTML = '<div id="irsm_s_titlebar"><div id="irsm_s_title"><a href="https://userscripts.org/scripts/show/173921" target="_blank">InoReader Scroll Marker ' + loc[0] + '</a></div><div id="irsm_s_btn"><input type="button" id="irsm_s_ok" value="OK"><input type="button" id="irsm_s_cancel" value="' + loc[1] + '"></div></div><div id="irsm_s_body"><label>' + loc[2] + '<input id="irsm_s_time" type="text" maxlength="4"></label><fieldset><legend>' + loc[3] + ' : </legend><label><input id="irsm_s_key_page" type="checkbox">PageUp / PageDown</label><br><label><input id="irsm_s_key_space" type="checkbox">Space / Shift+Space</label></fieldset></div>';

  var menu = $id('sb_rp_settings_menu'),
    pqm = $id('preferences_quick_main'),
    item = document.createElement('div');
  item.id = 'irsm_settings-menu';
  item.innerHTML = 'Scroll Marker ' + loc[0];
  if (menu) {
    item.className = 'inno_toolbar_button_menu_item';
    var menuList = menu.children;
    if (!menuList[menuList.length - 1].id) {
      var line = document.createElement('div');
      line.className = 'inno_toolbar_button_menu_line';
      menu.insertBefore(line, menu.lastChild.nextSibling);
    }
    menu.insertBefore(item, menu.lastChild.nextSibling);
  } else if ($id('quick_options') && pqm) {
    item.className = 'quick_options_link';
    pqm.insertBefore(item, pqm.lastChild.nextSibling);
  }

  document.addEventListener('keydown', function(e) {
    var eRp = $id('reader_pane');
    if (eRp && !/^input|^textarea/i.test(e.target.tagName) && st.time !== 0) {
      if (
        (st.key_page && e.keyCode === 33) ||
        (st.key_page && e.keyCode === 34) ||
        (st.key_page && exUpKey && e.keyCode === exUpCode) ||
        (st.key_page && exDownKey && e.keyCode === exDownCode) ||
        (st.key_space && e.keyCode === 32 && exSpaceKey !== '&') ||
        (st.key_space && e.keyCode === 32 && e.shiftKey && exSSpaceKey !== '%') ||
        (st.key_space && exSpaceKey && e.keyCode === exSpaceCode) ||
        (st.key_space && exSSpaceKey && e.keyCode === exSSpaceCode)
      ) {
        if (
          (exUpCode !== exDownCode && (
            (e.keyCode === exUpCode && e.shiftKey !== exUpShift) ||
            (e.keyCode === exDownCode && e.shiftKey !== exDownShift)
          )) ||
          (exSpaceCode !== exSSpaceCode && (
            (e.keyCode === exSpaceCode && e.shiftKey !== exSpaceShift) ||
            (e.keyCode === exSSpaceCode && e.shiftKey !== exSSpaceShift)
          ))
        ) return;
        articleID = checkArticle(e, 'down');
        ism.style.display = 'none';
        nScrPos = eRp.scrollTop;
        if (e.shiftKey) shift = true;
      } else if (e.keyCode === 13 || (!exOpenKey && e.keyCode === 79) || (exOpenKey && e.keyCode === exOpenCode && e.shiftKey === exOpenShift)) {
        var ac = currentEntry();
        if (ac) {
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
    var eRp = $id('reader_pane'),
      soh = 0,
      sst = 0;
    if (eRp && !/^input|^textarea/i.test(e.target.tagName) && st.time !== 0) {
      soh = eRp.offsetHeight;
      sst = eRp.scrollTop;
      if (
        (st.key_page && e.keyCode === 33) ||
        (st.key_page && exUpKey && e.keyCode === exUpCode && (e.shiftKey === exUpShift || shift)) ||
        (st.key_space && e.keyCode === 32 && e.shiftKey && exSSpaceKey !== '%') ||
        (st.key_space && exSSpaceKey && e.keyCode === exSSpaceCode && (e.shiftKey === exSSpaceShift || shift))
      ) {
        if (nScrPos !== sst) {
          if (checkArticle(e, 'up')) {
            articleID = '';
            return;
          }
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
        (st.key_page && exDownKey && e.keyCode === exDownCode && (e.shiftKey === exDownShift || shift)) ||
        (st.key_space && e.keyCode === 32 && !e.shiftKey && exSpaceKey !== '&') ||
        (st.key_space && exSpaceKey && e.keyCode === exSpaceCode && (e.shiftKey === exSpaceShift || shift))
      ) {
        if (nScrPos !== sst) {
          if (checkArticle(e, 'up')) {
            articleID = '';
            return;
          }
          ism.style.display = 'block';
          ism.style.top = (nScrPos + soh - (ism.scrollHeight / 2)) + 'px';
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
    if (e.target.id === 'irsm_settings-menu') {
      viewSettings();
    } else if (e.target.id === 'irsm_s_ok') {
      var time = $id('irsm_s_time').value,
        problem = false;
      if (time === '' || /^\s+$/.test(time)) st.time = nTime;
      else if (time && !isNaN(time)) st.time = Number(time);
      else problem = true;
      if (!problem) {
        st.key_page = $id('irsm_s_key_page').checked;
        st.key_space = $id('irsm_s_key_space').checked;
        $id('irsm_s_ok').blur();
        $id('irsm_settings').style.display = 'none';
        saveSettings();
      }
    } else if (e.target.id === 'irsm_s_cancel') {
      $id('irsm_s_cancel').blur();
      $id('irsm_settings').style.display = 'none';
    } else if (ism.style.display !== 'none') {
      window.clearTimeout(iMarker);
      ism.style.display = 'none';
    }
  }, false);

  loadSettings();
  iIrkc = window.setInterval(function() {
    checkIrkc();
  }, 250);

  $id('irsm_s_titlebar').addEventListener('dblclick', function(e) {
    if (e.target.nodeName === 'DIV') {
      $id('irsm_s_body').classList.toggle('irsm_s_hide');
      $id('irsm_s_btn').classList.toggle('irsm_s_hide');
    }
  }, false);
};

iInit = window.setInterval(function() {
  if ($id('tree') && $id('tree').innerHTML && $id('unread_cnt_top')) {
    window.clearInterval(iInit);
    window.setTimeout(function() {
      init();
    }, 1000);
  }
}, 500);

})();
