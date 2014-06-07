// ==UserScript==
// @name           NicoVideo::RankingFilter
// @namespace      http://www.nicovideo.jp/ranking/*
// @include        http://www.nicovideo.jp/ranking/*
// ==/UserScript==

//AutoPagerizeには対応してません（自動ロード分にはフィルターがかかりません）
(function(){
 function getTitle(trElem) {
   try {
     return ((trElem.getElementsByTagName('h3'))[0].getElementsByTagName('a'))[0].childNodes[0].nodeValue;
   } catch (e) {
     return null;
   }
 }
 function filterWords(words) {
  if (words.length == 0) {
    return;
  }
  var trElems = document.evaluate('//table[@class="mb16auto"]//tr', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  var trElemsToBeRemoved = [];
  try {
   var trElem = trElems.iterateNext();
   while (trElem) {
     var title = getTitle(trElem);
     if (title) {
       var doRemove = false;
       for (var i = 0; i < words.length; i++) {
         if (title.indexOf(words[i]) != -1) {
           doRemove = true;
           break;
         }
       }
       if (doRemove) {
         trElem.originalTitle = title;
         trElemsToBeRemoved[trElemsToBeRemoved.length] = trElem;
       }
     }
     trElem = trElems.iterateNext();
   }
  }
  catch (e) {
   dump('Error: Document tree modified during iteration ' + e); 
  }
  var trElemsToBeRemovedLength = trElemsToBeRemoved.length;
  for (var i = 0; i < trElemsToBeRemovedLength; i++) {
    var tdTags = trElemsToBeRemoved[i].getElementsByTagName('td');
    for (var j = 0; j < tdTags.length; j++) {
      tdTags[j].style.backgroundColor = '#eeeeee';
    }
    trElemsToBeRemoved[i].originalInnerHTML = trElemsToBeRemoved[i].innerHTML;
    originalHTML[i] = trElemsToBeRemoved[i].innerHTML;
    var switchTR = document.createElement('tr');
    var switchTD = document.createElement('td');
    var switchA = document.createElement('a');
    switchTD.setAttribute('colspan', '3');
    switchTD.setAttribute('align', 'left');
 //   switchTD.setAttribute('style', 'padding-left:190px');
    switchA.setAttribute('style', 'color:gray;font-size:small;text-decoration:none');
    switchA.setAttribute('href', 'javascript:void(0)');
    switchA.setAttribute('_rank_id', i);
    switchA.addEventListener('click', function(e){toggleDisplay("_rank_"+this.getAttribute('_rank_id'))}, false);
    switchA.innerHTML = trElemsToBeRemoved[i].originalTitle + ' <span id="_collapse_status_'+i+'">▼</span>';
    trElemsToBeRemoved[i].parentNode.insertBefore(switchTR, trElemsToBeRemoved[i]);
    switchTR.appendChild(switchTD);
    switchTD.appendChild(switchA);
    trElemsToBeRemoved[i].innerHTML = '<td colspan="3"></td>';
    trElemsToBeRemoved[i].setAttribute('id', '_rank_' + i);
    trElemsToBeRemoved[i].setAttribute('_is_collapsed', 'true');
  }
 }
 // 各動画の表示／非表示を切り替える
 function toggleDisplay(elemId) {
   var trElem = document.getElementById(elemId);
   var id = trElem.getAttribute('id').replace('_rank_', '');
   // たたまれている状態なので広げる
   if (trElem.getAttribute('_is_collapsed') == 'true') {
     trElem.innerHTML = originalHTML[id];
     trElem.setAttribute('_is_collapsed', 'false');
     document.getElementById('_collapse_status_' + id).innerHTML = '▲';
   // 広げられている状態なのでたたむ
   } else {
     trElem.innerHTML = '<td colspan="3"></td>';
     trElem.setAttribute('_is_collapsed', 'true');
     document.getElementById('_collapse_status_' + id).innerHTML = '▼';
   }
 }
 // 現在のフィルタ設定を保存する
 function saveConfig() {
   var query = document.getElementById('_filter_query').value;
   GM_setValue('filter_query', encodeURIComponent(query));
   location.reload();
 }
 // 「フィルタ設定」ボタンをページに追加する
 function addConfigButton() {
   var div = document.createElement('div');
   var form = document.createElement('form');
   var field = document.createElement('input');
   var button = document.createElement('input');
   var targetElem = (document.getElementsByTagName('form'))[1];
   div.setAttribute('align', 'center');
   form.addEventListener('submit', function(e) { saveConfig(); return false; }, false);
   button.setAttribute('type', 'submit');
   button.setAttribute('class', 'submit');
   button.setAttribute('value', 'フィルタ設定');
   button.setAttribute('id', '_filter_button');
   field.setAttribute('type', 'text');
   field.setAttribute('id', '_filter_query');
   field.setAttribute('value', query);
   field.setAttribute('class', 'search');
   field.setAttribute('style', 'margin-right:.5em');
   targetElem.parentNode.insertBefore(div, targetElem);
   div.appendChild(form);
   form.appendChild(field);
   form.appendChild(button);
 }
 // 文字列をトークン分割する
 // thanks to http://d.hatena.ne.jp/Gimite/20070515/1179243704
 function splitToken(str) {
   var a = str.split(/([^ "]+|"(?:[^\\"]|\\.)*")/);
   var ret = [];
   for (var i = 1; i < a.length; i+=2) {
     if (a[i].match(/^"(.*)"$/)) {
       a[i] = RegExp.$1;
     }
     ret[ret.length] = a[i];
   }
   return ret;
 }
 var query = decodeURIComponent(GM_getValue('filter_query', ''));
 var originalHTML = [];
 var words = splitToken(query);
 var params = query.split(/\s+/);
 addConfigButton();
// for (var i = 0; i < words.length; i++) {
//  console.log(words[i]);
// }
 filterWords(words);
})();
