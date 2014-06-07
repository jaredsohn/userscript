// ==UserScript==
// @name           NicoCommunity New Res Checker
// @namespace      http://d.hatena.ne.jp/gifnksm/
// @description    Check Recent Writings
// @include        http://ch.nicovideo.jp/community*
// ==/UserScript==

if(new RegExp('^http://ch\\.nicovideo\\.jp/community/[^?]+').test(location.href))
  return;

var com_data = eval(GM_getValue('com_data', '({})'));

function getData(com_id) {
  return com_data[com_id] || 0;
}
function setData(com_id, val) {
  com_data[com_id] = val;
  GM_setValue('com_data', com_data.toSource());
}

var show_new_res_only = GM_getValue('show_new_res_only', show_new_res_only);
var not_updated = [];
function showNode(node) { node.style.display = ''; }
function hideNode(node) { node.style.display = 'none'; }
function setNotUpdated(node) {
  not_updated.push(node);
  if(show_new_res_only)
    hideNode(node);
  else
    showNode(node);
}
function setVisiblity(visibility) {
  show_new_res_only = visibility;
  GM_setValue('show_new_res_only', show_new_res_only);
  if(show_new_res_only)
    not_updated.forEach(hideNode);
  else
    not_updated.forEach(showNode);
}


var getUniqueID = new function() {
  var i = 0;
  return function() {
    return i++;
  };
};

function getURL(url, callback) {
  GM_xmlhttpRequest(
    {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 Greasemonkey; NicoCommunity New Res Checker' },
      url: url,
      onload: function(response) {
        callback(response);
      },
      onerror: function() {
        callback(undefined);
      }
    });
}

const json_url_regexp = /Nico\.Community\.BBS\("bbs_summary", "bbs_template", "(co\d+)", (\d+), "([^"]+)"\);/;

function getResIdx(com_id, callback) {
  getURL(
    'http://com.nicovideo.jp/community/' + com_id,
    function(response) {
      if(typeof(response) == 'undefined') {
        GM_log(com_id + ': "http://com.nicovideo.jp/community/'
               + com_id + '"の取得に失敗。');
        callback(undefined);
        return;
      }
      var r = response.responseText.match(json_url_regexp);
      if(r == null) {
        GM_log(com_id + ': 最新書き込み取得APIのURL取得に失敗。');
        callback(undefined);
        return;
      }
      getURL(
        'http://dic.nicovideo.jp/b/c/'
          + r[1] + '/api/res/l'
          + r[2] + '/NicoCommunityBBS_update_community_BBS/?hash_key=' + r[3],
        function(response) {
          if(typeof(response) == 'undefined') {
            GM_log(com_id + ': "' + r[1] + '"の取得に失敗。');
            callback(undefined);
            return;
          }
          try {
            var array = eval(
              response.responseText.replace(
                  /^NicoCommunityBBS_update_community_BBS/, ''),
              this);
            if(!(array instanceof Array) || array.length == 0)
              callback(0);
            else
              callback(array[array.length-1].n);
          } catch(e) {
            GM_log(com_id + ': JSONのパースに失敗。' + e.message);
            callback(undefined);
          }
        });
    });
}

function getResURL(com_id, res_idx) {
  var page_str = Math.floor((res_idx - 1) / 30) * 30 + 1;
  return 'http://dic.nicovideo.jp/b/c/' + com_id + '/' + page_str + '-#' + res_idx;
}

const id_prefix = 'GM_nicocom_new_res_check_';

function createResIdx(com_id, time, parent, callback) {
  var p = document.createElement('p');
  p.textContent = 'Waiting...';
  var p_id = id_prefix + 'p_' + getUniqueID();
  p.id = p_id;
  p.className = 'TXT12';
  parent.appendChild(p);
  setTimeout(
    function() {
      var p = document.getElementById(p_id);
      p.textContent = 'Loading...';
      getResIdx(
        com_id,
        function(res_idx) {
          try {
            if(typeof res_idx == 'undefined') {
              GM_log(com_id + ': getResIdxからundefinedが返ってきた。');
              p.textContent = '取得失敗';
              return;
            }
            var first_idx = getData(com_id) + 1;
            var incr_num = res_idx - first_idx + 1;
            var container = p.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            if(incr_num > 0) {
              var bbs_link = document.createElement('a');
              bbs_link.href = getResURL(com_id, first_idx);
              bbs_link.textContent = '[読]';

              var finish_link = document.createElement('a');
              finish_link.href = 'javascript: void();';
              finish_link.textContent = '[了]';
              finish_link.addEventListener(
                'click',
                function() {
                  setData(com_id, res_idx);
                  p.textContent = res_idx;
                  setNotUpdated(container);
                },
                false);

              var f = document.createDocumentFragment();
              f.appendChild(bbs_link);
              f.appendChild(document.createTextNode(' '));
              f.appendChild(finish_link);

              p.textContent = ' ' + res_idx + ' (' + incr_num + ')';
              p.insertBefore(f, p.firstChild);
            }
            else {
              p.textContent = res_idx;
              setNotUpdated(container);
            }
          } finally {
            if(typeof callback == 'function')
              setTimeout(callback, 500);
          }
        });
    }, time);
}

var com_url_regex = new RegExp('(?:http://com\\.nicovideo\\.jp)?/community/(.+)$');

function checkUpdate(doc) {
  var cookie = document.cookie;
  var callback = function() {};
  // eval 第二引数廃止により以下は動かない
//   if (typeof window.AutoPagerize != 'undefined') {
//     var ap = null;
//     callback = function() {
//       if(ap != null)
//         return ap.request();
//       try {
//         document.cookie = cookie;
//         var _ap = eval('ap', window.AutoPagerize.addFilter);
//         if(typeof _ap == 'object' && _ap != null && typeof _ap.request == 'function') {
//           ap = _ap;
//           return ap.request();
//         }
//       } catch(e) {
//         ap = null;
//       }
//     };
//   }
  var result = doc.evaluate(
    '//div[contains(concat(" ", @class, " "), " community_frm ")]/descendant::td[1]',
    doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  if(result != null) {
    for(var i = 0, len = result.snapshotLength; i < len; i++)
    {
      var parent = result.snapshotItem(i);
      var com_link = parent.getElementsByTagName('a')[0];
      var r;
      if(com_link && (r = com_url_regex.exec(com_link.href)))
        createResIdx(r[1], i*500, parent,
                     i == (result.snapshotLength - 1)
                     ? callback
                     : undefined);
    }
  }
}

var button = document.createElement('button');
button.textContent = '更新チェック';

var update_checked = false;
button.addEventListener(
  'click',
  function() {
    if(update_checked)
      return;
    update_checked = true;
    button.disabled = true;
    checkUpdate(document);
    if (typeof window.AutoPagerize != 'undefined')
      window.AutoPagerize.addDocumentFilter(checkUpdate);
  }, false);

var h1 = document.evaluate(
  '//h1/div/div',
  document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
h1.appendChild(document.createTextNode(' '));
h1.appendChild(button);

var label = document.createElement('label');
var input = document.createElement('input');
input.type = 'checkbox';
input.checked = show_new_res_only;
input.addEventListener('click', function() { setVisiblity(input.checked);},  false);
label.appendChild(input);
label.appendChild(document.createTextNode('新着のみ表示'));
h1.appendChild(document.createTextNode(' '));
h1.appendChild(label);
