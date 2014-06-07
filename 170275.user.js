// ==UserScript==
// @name Useful Yad2 
// @match http://www.yad2.co.il/Nadlan/*.php*
// @version 0.4
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
// localStorage[id] : {'h': <IS_HIDDEN>,
//                     'c': <COMMENT>,
//                     'p': {'o': <ORIGINAL_PRICE>,
//                           'c': <CURRENT_PRICE>,
//                           'l': [{'t': <CHANGE_TIMESTAMP>, 'v': <VALUE>}+],
//                          },
//                     'fs': <FIRST_SEEN>,
//                     'ph': <PHONE_HTML>,
//                    }

var ROW_CLASSES = ['tr.ActiveLink', 'tr.ActiveLinkHiPriority', 'tr.ActiveLinkHiPriority3'];

var exclude = null;

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function upgradeJavascript() {
  // Using Objects with localStorage
  if (typeof Storage.prototype.setObject != 'function') {
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
  if (!row) return null;
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
  if (!html_price) return;
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
    change_list.push(new_change);
    price['l'] = change_list;
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
  var result = ' Original price: [' + price['o'] + '].';
  for (var i = 0; i < price['l'].length; i++) {
    var change = price['l'][i];
    var date = new Date(change['t']);
    result = result + ' On ' + date.toDateString() + ' changed to [' + change['v'] + '].';
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

function getFirstSeenColor(id) {
  var first_seen = getVariable(id, 'fs');
  if (!first_seen) {
    return null;
  }
  var now = Date.now();
  if (now - first_seen < 24 * 3600 * 1000) {
    return 'green';
  }
  if (now - first_seen < 7 * 24 * 3600 * 1000) {
    return 'yellow';
  }
  return null;
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
  var excludedRow = (exclude && (row.parentElement.innerHTML.search(exclude) >= 0));
  if (isHiddenSetting() && (excludedRow || isHidden(row.dataId))) {
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
  var headers = document.querySelectorAll('td:first-child.TableTileNew');
  for (var i = 0; i < headers.length; i++) {
    var header = headers[i];
    var ntd = document.createElement('td');
    ntd.width = '10px';
    ntd.className = 'dira_header';
    ntd.innerHTML = isHiddenSetting() ? '+' : '-';
    ntd.title = 'Click to hide/show marked listings.'
    ntd.onclick = headerClick;
    header.parentElement.insertBefore(ntd, header);
  }
}

function createListing(id) {
  var ntd = document.createElement('td');
  ntd.width = '10px';
  ntd.style.textAlign = 'center';
  ntd.className = 'dira';
  ntd.dataId = id;
  ntd.onclick = function() { rowClick(this); }
  ntd.oncontextmenu = function() { rightClick(this); return false; }
  ntd.dir = "ltr";
  updateFirstSeen(id);
  updatePrice(id);
  if (hasRecentPriceChange(id)) {
    ntd.style.color = 'red';
    clearHidden(id);
  }
  var color = getFirstSeenColor(id);
  if (color) {
    ntd.style.backgroundColor = color;
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

function handleSingleListing(id) {
  var phone_html = getVariable(id, 'ph');
  if (phone_html) {
    document.querySelector('#p_img').innerHTML = phone_html;
  } else {
    var link = document.querySelector('#toShowPhone a');
    function waitFunc(timeout) {
      var link = document.querySelector('#toShowPhone a');
      if (link) {
        console.log('Waiting...');
        setTimeout(function(){waitFunc(timeout * 1.1)}, timeout);
        return;
      }
      var elem = document.querySelector('#p_img');
      if (elem) setVariable(id, 'ph', elem.innerHTML);
    }
    setTimeout(waitFunc, 5000);
  }
}
/*
function addSearchOptions() {
  var ntd = document.createElement('td');
  ntd.appendChild(document.createTextNode('חוץ מ: '));
  var inp = document.createElement('input');
  inp.name = 'Exclude';
  ntd.appendChild(inp);
  var parent = document.querySelector('#tr_sharing tr');
  if (parent) {
    parent.appendChild(ntd);
  } else {
    console.log('Adding "Exclude" field failed');
  }
}

function wrap(subfunction) {
  var script = document.createElement('script');
  script.appendChild(document.createTextNode('('+ subfunction +')();'));
  (document.body || document.head || document.documentElement).appendChild(script);
}
*/
function main() {
  upgradeJavascript();
  if (location.toString().search("NadlanID=") >= 0) {
    var id = location.toString().match(/NadlanID=[a-f0-9]*/)[0].substr('NadlanID='.length);
    id = 'tr_' + id;
    var ntd = createListing(id);
    var sibl = document.querySelector('#p_img');
    sibl.parentElement.insertBefore(ntd, sibl);
    updateSign(ntd);
    handleSingleListing(id);
  } else {
    checkVersion();
    checkTimestamp();
    cleanAds();
    //addSearchOptions();
    createHeaders();
    createListings();
  }
}

main();