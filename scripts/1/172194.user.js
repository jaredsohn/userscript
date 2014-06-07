// ==UserScript==
// @name A Bit More Useful Yad2
// @match http://www.yad2.co.il/Nadlan/*.php*
// @version 0.3
// ==/UserScript==

// Unversioned format:
// localStorage['hide'] == 1
//   Means to hide listings marked as 'hidden'.
// localStorage[id] == 1
//   Means listing with this id is marked as 'hidden'.
// localStorage[id + '_comment'] not empty
//   Means the listing has a comment. 
//
// V1 format:
// localStoragie['meta'] : { 'hide' : <HIDE_LISTINGS>,
//                          'version': <DATABASE_VERSION>,
//                          'last_update': <TIMESTAMP>,
//                        }
// localStorage[id] : {'h' : <IS_HIDDEN>,
//                     'c': <COMMENT>,
//                     'p': {'o': <ORIGINAL_PRICE>,
//                           'c': <CURRENT_PRICE>,
//                           'l': [{'t': <CHANGE_TIMESTAMP>, 'v': <VALUE>}+],
//                          },
//                     'fs': <FIRST_SEEN>,
//                    }

/*
 * Based on "Useful Yad2" - http://userscripts.org/scripts/show/170275
 */

var ROW_CLASSES = ['tr.ActiveLink', 'tr.ActiveLinkHiPriority', 'tr.ActiveLinkHiPriority3'];

function upgradeJavascript() {
  // Using Objects with localStorage
  Storage.prototype.setObject = function(key, value) {
    if (Object.keys(value) == 0) {
      this.removeItem(key);
    } else {
      this.setItem(key, JSON.stringify(value));
    }
  }
  Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
  }

  // startsWith & endsWith
  if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
      return this.slice(0, str.length) == str;
    };
  }
  if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (str){
      return this.slice(-str.length) == str;
    };
  }
}

// Convert V0/Unversioned database into V1 database format.
function convertV0() {
  var made_changes = false;
  do {
    var length = localStorage.length;
    made_changes = false;
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var obj = localStorage[key];    
      if (key.startsWith('tr_')) {
        if (!key.endsWith('_comment') && obj == '1') {
          // 'hidden' marker.
          var converted = {};
          converted['h'] = 1;
          localStorage.setObject(key, converted);
          made_changes = true;
          break;
        } else if (key.endsWith('_comment')) {
          var main_key = key.substr(0, key.length - '_comment'.length);
          if (localStorage[main_key] != '1') {
            var converted = localStorage.getObject(main_key) || {};
            converted['c'] = obj;
            localStorage.setObject(main_key, converted);
            localStorage.removeItem(key);
            made_changes = true;
            break;
          }
        }
      }
    }
  } while (made_changes);
  setVariable('meta', 'version', '1');
  console.log('Database updated to V1.'); 
}

function makeCleanup() {
  //console.log('Cleaning up.');
}

function checkTimestamp() {
  var now = Date.now();
  var prev_time = getVariable('meta', 'last_update') || 1;
  if (now - prev_time > 1000 * 3600 * 24 * 7) {
    makeCleanup();
  }
}

function checkVersion() {
  var version = getVariable('meta', 'version') || '0';
  switch (version) {
    case '0':
      convertV0();
    default:
      console.log('Database up to date.');
  }
}

function setVariable(id, variable, value) {
  var obj = localStorage.getObject(id) || {};
  if (value) {
    obj[variable] = value;
  } else {
    delete obj[variable];
  }
  localStorage.setObject(id, obj);  
}

function getVariable(id, variable) {
  var obj = localStorage.getObject(id);
  if (obj && obj[variable]) {
    return obj[variable];
  }
  return null;
}

function getRows() {
  return document.querySelectorAll(ROW_CLASSES.join());
}

function isHidden(id) {
  return getVariable(id, 'h');
}

function setHidden(id) {
  setVariable(id, 'h', 1);
}

function clearHidden(id) {
  setVariable(id, 'h', null);
}

function hasComment(id) {
  var obj = localStorage.getObject(id);
  return obj && obj['c'];
}

function getComment(id) {
  return getVariable(id, 'c');
}

function setComment(id, comment) {
  setVariable(id, 'c', comment);
}

function clearComment(id) {
  setVariable(id, 'c', null);
}

function isHiddenSetting() {
  return getVariable('meta', 'hide');
}

function setHiddenSetting() {
  return setVariable('meta', 'hide', 1);
}

function clearHiddenSetting() {
  return setVariable('meta', 'hide', null);
}

function headerClick() {
  if (isHiddenSetting()) {
    clearHiddenSetting();
  } else {
    setHiddenSetting();
  }
  var headers = document.querySelectorAll('.dira_header');
  for (var i = 0; i < headers.length; i++) {
    headers[i].innerHTML = isHiddenSetting() ? '+' : '-';
  }
  var tables = getRows();
  for (var i = 0; i<tables.length; i++) {
    var table = tables[i];
    if (isHiddenSetting() && isHidden(table.id)) {
      table.style.display = 'none';
      if (table.nextElementSibling) table.nextElementSibling.style.display = 'none';
    } else {
      table.style.display = '';
      if (table.nextElementSibling) table.nextElementSibling.style.display = '';
    }
  }
}

function getCurrentPrice(id) {
  var row = document.querySelector('#' + id);
  var tds = row.getElementsByTagName('td');
  for (var i = 0; i < tds.length; i++) {
    if (tds[i].dir != "ltr") continue;
    return tds[i].innerHTML;
  }
  return 'Error'; 
}

function updatePrice(id) {
  var price = getVariable(id, 'p') || {};
  var html_price = getCurrentPrice(id);
  if (!price['o'] || !price['c']) {
    // No original/current price. Update.
    price['o'] = html_price;
    price['c'] = html_price;
  } else if (price['c'] != html_price) {
    // Price changed. Add change to the list.
    var change_list = price['l'] || [];
    var new_change = {};
    new_change['t'] = Date.now();
    new_change['v'] = html_price;
    price['l'] = change_list.push(new_change);
    price['c'] = html_price;
  }
  setVariable(id, 'p', price);
}

function hasRecentPriceChange(id) {
  var price = getVariable(id, 'p') || {};
  if (price['o'] && price['c'] && price['l']) {
    var change_list = price['l'];
    var last_change = change_list[change_list.length - 1];
    if (Date.now() - last_change['t'] < 1000 * 3600 * 24 * 7) {
      return true;
    }
  }
  return false;
}

function printPrice(id) {
  var price = getVariable(id, 'p') || {};
  if (price['o'] == price['c']) return '';
  var result = 'Original price: [' + price['o'] + '].';
  for (var i = 0; i < price['l'].length; i++) {
    var change = price['l'][i];
    var date = new Date(change['t']);
    result = result + ' On ' + date.toDateString() + ' changed to ' + change['v'] + '.';
  }
  return result;
}

function updateFirstSeen(id) {
  var first_seen = getVariable(id, 'fs');
  if (!first_seen) {
    first_seen = Date.now();
    setVariable(id, 'fs', first_seen);
  }
}

function printFirstSeen(id) {
  var first_seen = getVariable(id, 'fs') || 1;
  var date = new Date(first_seen);
  return date.toDateString();
}

function buildTitle(id) {
  var title = getComment(id) ||
              ('Click to ' + (isHidden(id) ? 'show.' : 'hide.') +
               ' Right-click to comment.');

  title = title + ' First seen on ' + printFirstSeen(id) + '.';
  title = title + printPrice(id);
  return title;
}

function updateSign(row) {
  if (isHidden(row.dataId)) {
    row.innerHTML = '+';
  } else if (hasComment(row.dataId)) {
    row.innerHTML = '!';
  } else {
    row.innerHTML = '-';
  }
  row.title = buildTitle(row.dataId);
  if (isHiddenSetting() && isHidden(row.dataId)) {
    row.parentElement.style.display = 'none';
    if (row.parentElement.nextElementSibling) {
      row.parentElement.nextElementSibling.style.display = 'none';
    }
  }
}

function rowClick(row) {
  if (isHidden(row.dataId)) {
    clearHidden(row.dataId);
  } else {
    setHidden(row.dataId);
  }
  updateSign(row);
}

function rightClick(row) {
  var defaultComment = getComment(row.dataId);
  if (!defaultComment || defaultComment == "") {defaultComment = '!';}  
  var comment = prompt('Enter comment, empty to clear', defaultComment);
  if (!comment || comment == "") {
    clearComment(row.dataId);
  } else {
    setComment(row.dataId, comment);
  }
  updateSign(row);
}

function cleanAds() {
  // Remove highlighting of sponsored ads.
  var style = document.createElement('style');
  style.innerHTML = ".ActiveLinkHiPriority3, .ActiveLinkHiPriority {background-color: #e2e3e8}";
  document.head.appendChild(style);

  // Clean ad-in-between and Platinum Ads.
  var junk = document.querySelectorAll('#tr\\.MidStrip\\.2, tr[bgcolor="#FFFFFF"], tr.ActiveLinkPlatinum')
  for (var i = 0; i < junk.length; i++) {
    junk[i].parentNode.removeChild(junk[i]);
  }
}

function createHeaders() {
  var header = document.querySelector('.TableTileNew');
//  var header = headers[0];
  var ntd = document.createElement('td');
  ntd.width = '10px';
  ntd.className = 'dira_header';
  ntd.innerHTML = isHiddenSetting() ? '+' : '-';
  ntd.title = 'Click to hide/show marked listings.'
  ntd.onclick = headerClick;
  header.parentElement.insertBefore(ntd, header);
}

function createListing(id) {
  var ntd = document.createElement('td');
  ntd.width = '10px';
  ntd.style.textAlign = 'center';
  ntd.className = 'dira';
  ntd.dataId = id;
  ntd.onclick = function() { rowClick(this); }
  ntd.oncontextmenu = function() { rightClick(this); return false; }
  updateFirstSeen(id);
  updatePrice(id);
  if (hasRecentPriceChange(id)) {
    ntd.style.color = 'red';
  }
  return ntd;
}

function createListings() {
  var tables = getRows();
  for (var i = 0; i<tables.length; i++) {
    var table = tables[i];
    var ntd = createListing(table.id);
    table.insertBefore(ntd, table.firstChild);
    updateSign(ntd);
  }
}

function main() {
  upgradeJavascript();
  checkVersion();
  checkTimestamp();
  cleanAds();
  createHeaders();
  createListings();
}

main();
