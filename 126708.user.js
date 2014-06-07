// ==UserScript==
// @name    Google Reader Scroll Marker
// @description    Display the marker of page scroll in Google Reader. / Googleリーダーでページスクロールしたとき目印を表示します。
// @id    GoogleReaderScrollMarker
// @namespace    http://userscripts.org/scripts/show/126708
// @homepage    https://userscripts.org/scripts/show/126708
// @updateURL    https://userscripts.org/scripts/source/126708.meta.js
// @include    http://www.google.*/reader/view/*
// @include    https://www.google.*/reader/view/*
// @version    1.2
// ==/UserScript==

(function() {

try { if (typeof localStorage !== 'object') return alert('GRSM Error: DOM Storage'); }
catch(er) { return alert('GRSM Error: DOM Storage'); }
var $id = function(id) { return document.getElementById(id); };
var vec = $id('viewer-entries-container');
if (!vec) return;
var nScrPos = 0, nCheck = 0, nTime = 750, shift = false, iGsp, iCheck, st;
var exUpKey, exUpCode, exUpShift, exDownKey, exDownCode, exDownShift, exOpenKey, exOpenCode, exOpenShift;
var gsp = document.createElement('div');
gsp.id = 'grsm_scroll_marker';
$id('viewer-entries-container').appendChild(gsp);

var CSS = [
  '#grsm_settings { display: none; color: black; position: absolute; top: 30px; left: 30px; z-index: 90200; background: rgba(255, 255, 255, 0.95); border: 1px solid #999999; border-radius: 4px; min-width: 35em; box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); }',
  '#grsm_s_titlebar { background-color: #666666; border-radius: 4px 4px 0 0; padding: 2px 0 0 4px; height: 2em; }',
  '#grsm_s_title a { font-size: 110%; font-weight: bold; color: white; text-decoration: none; }',
  '#grsm_s_title a:hover { color: #FFFF99; }',
  '#grsm_s_btn { position: absolute; top: 2px; right: 4px; }',
  '#grsm_s_ok { margin-right: 0.5em; padding: 0 2em; }',
  '#grsm_s_cancel { padding: 0 1ex; }',
  '#grsm_s_ok, #grsm_s_cancel { font-size: 80%; }',
  '#grsm_s_body { padding: 0.5em 1em; }',
  '#grsm_s_body input { margin-left: 0.5em; text-align: center; width: 6ex; }',
  '#grsm_scroll_marker { position: absolute; width: 100%; height: 4px; margin-top: -2px; background: rgba(255,0,0,0.3); display: none; }'
].join('');
GM_addStyle(CSS);

var locale_ja = [
  '設定',
  'キャンセル',
  '目印を表示する時間 (ミリ秒):'
];
var locale_en = [
  'Settings',
  'Cancel',
  'Time to display the marker (msec):'
];
var loc = (/リーダー/.test(document.title)) ? locale_ja : locale_en;

var exKey = function() {
  if($id('grkc_key-pUp')) {
    exUpKey = $id('grkc_key-pUp').value;
    if (exUpKey) {
      exUpCode = exUpKey.toUpperCase().charCodeAt(0);
      exUpShift = (isNaN(exUpKey) && exUpKey === exUpKey.toUpperCase()) ? true : false;
    }
  }
  if($id('grkc_key-pDown')) {
    exDownKey = $id('grkc_key-pDown').value;
    if (exDownKey) {
      exDownCode = exDownKey.toUpperCase().charCodeAt(0);
      exDownShift = (isNaN(exDownKey) && exDownKey === exDownKey.toUpperCase()) ? true : false;
    }
  }
  if($id('grkc_key-o')) {
    exOpenKey = $id('grkc_key-o').value;
    if (exOpenKey) {
      exOpenCode = exOpenKey.toUpperCase().charCodeAt(0);
      exOpenShift = (isNaN(exOpenKey) && exOpenKey === exOpenKey.toUpperCase()) ? true : false;
    }
  }
};

var checkGrkc = function() {
  if ($id('grkc_ok')) {
    window.clearInterval(iCheck);
    $id('grkc_ok').addEventListener('click', function() {
      exKey();
    }, false);
    exKey();
  } else if (nCheck < 12) nCheck ++;
  else window.clearInterval(iCheck);
};

var viewSettings = function() {
  if ($id('grsm_settings').style.display === 'block') {
    $id('grsm_settings').style.display = 'none';
    return;
  }
  $id('grsm_s_time').value = st.time;
  $id('grsm_settings').style.display = 'block';
};

var loadSettings = function() {
  st = {};
  try {
    if (localStorage.getItem('grsm_settings'))
      st = JSON.parse(localStorage.getItem('grsm_settings'));
  } catch(er) { alert('GRSM Error: Load Settings'); }
  var notN = function(a) {
    return (typeof a !== 'number') ? true : false;
  };
  if (notN(st.time)) st.time = nTime;
};

var saveSettings = function() {
  try {
    localStorage.setItem('grsm_settings', JSON.stringify(st));
  } catch(er) { alert('GRSM Error: Save Settings'); }
};

var div = document.createElement('div');
div.id = 'grsm_settings';
document.body.appendChild(div);
$id('grsm_settings').innerHTML = '<div id="grsm_s_titlebar"><div id="grsm_s_title"><a href="https://userscripts.org/scripts/show/126708" target="_blank">Google Reader Scroll Marker ' + loc[0] + '</a></div><div id="grsm_s_btn"><input type="button" id="grsm_s_ok" value="OK"><input type="button" id="grsm_s_cancel" value="' + loc[1] + '"></div></div><div id="grsm_s_body"><label>' + loc[2] + '<input id="grsm_s_time" type="text" maxlength="4"></label></div>';

if ($id('gbd5')) {
  var ol = document.evaluate('id("gbd5")/div/ol', document, null, 9, null).singleNodeValue;
  if (ol) {
    var li = document.createElement('li');
    li.className = 'gbkc gbmtc';
    li.innerHTML = '<a href="javascript:void(0);" id="grsm_settings-menu" class="gbmt">Scroll Marker ' + loc[0] + '</a>';
    ol.appendChild(li);
  }
}
if ($id('settings-button-menu')) {
  var d1 = $id('settings-button-menu');
  var d2 = document.createElement('div');
  d2.id = 'grsm_s_menu2';
  d2.className = 'goog-menuitem';
  d2.setAttribute('role', 'menuitem');
  d2.setAttribute('style', '-moz-user-select: none;');
  d2.innerHTML = '<div id="grsm_s_menu2c" class="goog-menuitem-content">Scroll Marker ' + loc[0] + '</div>';
  d1.appendChild(d2);
  $id('grsm_s_menu2').addEventListener('mouseover', function() {
    $id('grsm_s_menu2').className = 'goog-menuitem goog-menuitem-highlight';
  }, false);
  $id('grsm_s_menu2').addEventListener('mouseout', function() {
    $id('grsm_s_menu2').className = 'goog-menuitem';
  }, false);
}

document.addEventListener('keydown', function(e) {
  if (vec && !/^input|^textarea/i.test(e.target.tagName) && st.time !== 0) {
    if (e.keyCode === 33 || e.keyCode === 34 || (exUpKey && e.keyCode === exUpCode) || (exDownKey && e.keyCode === exDownCode)) {
      if (exUpCode !== exDownCode && ((e.keyCode === exUpCode && e.shiftKey !== exUpShift) || (e.keyCode === exDownCode && e.shiftKey !== exDownShift))) return;
      gsp.style.display = 'none';
      nScrPos = vec.scrollTop;
      if (e.shiftKey) shift = true;
    } else if (e.keyCode === 13 || (!exOpenKey && e.keyCode === 79) || (exOpenKey && e.keyCode === exOpenCode && e.shiftKey === exOpenShift)) {
      var ce = $id('current-entry');
      if (ce) {
        window.clearTimeout(iGsp);
        gsp.style.display = 'none';
      }
    } else if (gsp.style.display !== 'none') {
      window.clearTimeout(iGsp);
      gsp.style.display = 'none';
    }
  }
}, true);

document.addEventListener('keyup', function(e) {
  if (vec && !/^input|^textarea/i.test(e.target.tagName) && st.time !== 0) {
    var soh = vec.offsetHeight;
    var sst = vec.scrollTop;
    if (e.keyCode === 33 || (exUpKey && e.keyCode === exUpCode && (e.shiftKey === exUpShift || shift))) {
      if (nScrPos !== sst) {
        gsp.style.display = 'block';
        gsp.style.top = nScrPos + 'px';
        window.clearTimeout(iGsp);
        if (st.time > 0) {
          iGsp = window.setTimeout(function() {
            window.clearTimeout(iGsp);
            gsp.style.display = 'none';
          }, st.time);
        }
      }
      shift = false;
    } else if (e.keyCode === 34 || (exDownKey && e.keyCode === exDownCode && (e.shiftKey === exDownShift || shift))) {
      if (nScrPos !== sst) {
        gsp.style.display = 'block';
        gsp.style.top = (nScrPos + soh - gsp.scrollHeight) + 'px';
        window.clearTimeout(iGsp);
        if (st.time > 0) {
          iGsp = window.setTimeout(function() {
            window.clearTimeout(iGsp);
            gsp.style.display = 'none';
          }, st.time);
        }
      }
      shift = false;
    }
  }
}, true);

document.addEventListener('click', function(e) {
  if (e.button >= 2) return;
  if (e.target.id === 'grsm_settings-menu') {
    viewSettings();
  } else if (e.target.id === 'grsm_s_menu2' || e.target.id === 'grsm_s_menu2c') {
    $id('settings-button').blur();
    viewSettings();
  } else if (e.target.id === 'grsm_s_ok') {
    var time = $id('grsm_s_time').value, problem = false;
    if (time === '' || /^\s+$/.test(time)) st.time = nTime;
    else if (time && !isNaN(time)) st.time = Number(time);
    else problem = true;
    if (!problem) {
      $id('grsm_settings').style.display = 'none';
      saveSettings();
    }
  } else if (e.target.id === 'grsm_s_cancel') {
    $id('grsm_settings').style.display = 'none';
  } else if (gsp.style.display !== 'none') {
    window.clearTimeout(iGsp);
    gsp.style.display = 'none';
  }
}, false);

loadSettings();
iCheck = window.setInterval(function() {
  checkGrkc();
}, 250);

})();
