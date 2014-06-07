// ==UserScript==
// @name        sort_as
// @namespace   3100
// @description ASのルームを更新順序順に変更する
// @include     http://as.iplwiki.info/
// @version     1.0.2
// ==/UserScript==
(function (){
  var changeTextForSort = function(text) {
    var date_str_arr = text.split(' '); //cf. ["2013-01-28","12:58","pm"]
    var time = date_str_arr[1].split(':');
    if (time[0] == '12'){
      date_str_arr[1] = "00:" + date_str_arr[1];
    }
    return date_str_arr[0] + date_str_arr[2] + date_str_arr[1];
  };
  var getUpdateText = function(elem) {
    var text = elem.getElementsByClassName('update').item(0).textContent;
    return changeTextForSort(text);
  };
  var toArrayWithoutHeader = function(origin) {
    return Array.prototype.slice.call(origin, 1);
  };

  var origin = document.getElementsByTagName('tr');
  var items = toArrayWithoutHeader(origin);
  items.sort(function(a, b) {
    return getUpdateText(a) <= getUpdateText(b) ? 1 : -1;
  });
  var insertTarget = document.getElementsByClassName('room-list').item(0);
  var insert = origin.item(0).outerHTML;
  for(var i = 0; i < items.length; ++i) {
    insert += items[i].outerHTML;
  }
  console.log(insert);
  insertTarget.innerHTML = insert;
})();