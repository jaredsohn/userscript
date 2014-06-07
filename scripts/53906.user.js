// ==UserScript==
// @name           NicopediaIFrameInserter
// @namespace      http://kataho.net/
// @description    Supports inserting iframes.
// @include        http://dic.nicovideo.jp/p/*
// @license        New BSD License
// ==/UserScript==

var buttons = new Array(
 {
   'value':   '動画',
   'snippet': '<iframe width="312" height="176" src="http://www.nicovideo.jp/thumb/ITEM" scrolling="no" frameborder="0"></iframe>',
 },
 {
   'value':   '静画',
   'snippet': '<iframe width="312" height="176" src="http://ext.seiga.nicovideo.jp/thumb/ITEM" scrolling="no" frameborder="0"></iframe>',
 },
 {
   'value':   '描いてみた',
   'snippet': '<iframe class="nicovideo" frameborder="0" height="176" scrolling="no" src="http://ext.seiga.nicovideo.jp/thumb/ITEM" width="312"></iframe>',
 },
 {
   'value':   'マイリスト',
   'snippet': '<iframe class="nicovideo" frameborder="0" height="176" scrolling="no" src="http://www.nicovideo.jp/thumb_mylist/ITEM"></iframe>',
 },
 {
   'value':   'ユーザー',
   'snippet': '<iframe class="nicovideo" frameborder="0" height="176" scrolling="no" src="http://www.nicovideo.jp/thumb_user/ITEM"></iframe>',
 },
 {
   'value':   '商品',
   'snippet': '<iframe class="nicoichiba" frameborder="0" height="260" scrolling="no" src="http://ichiba.nicovideo.jp/parts/item/ITEM" width="155"></iframe>',
 },
 {
   'value':   '商品2',
   'snippet': '<iframe frameborder="0" height="210" scrolling="no" src="http://ext.ichiba.nicovideo.jp/thumb/ITEM" width="312" class="nicoichiba2"></iframe>',
 },
 {
   'value':   'コミュニティ',
   'snippet': '<iframe scrolling="no" class="nicovideo" src="http://ext.nicovideo.jp/thumb_community/ITEM" frameborder="0" height="176" width="312" style="border: solid 1px #CCC;"></iframe>',
 },
 {
   'value':   '生放送',
   'snippet': '<iframe class="nicovideo" frameborder="0" height="176" scrolling="no" src="http://live.nicovideo.jp/embed/ITEM" width="312"></iframe>',
 },
 {
   'value':   'チャンネル',
   'snippet': '<iframe class="nicovideo" frameborder="0" height="176" scrolling="no" src="http://ext.nicovideo.jp/thumb_channel/ITEM" width="312"></iframe>',
 }
);

function onclick(event)
{
  var item = prompt('挿入する' + event.target.value);
  if (item == null) {
    return;
  }

  var qi = item.indexOf('?');
  if (qi > 0) {
    item = item.substr(0, qi);
  }

  var li = item.lastIndexOf('/');
  if (li >= 0) {
    item = item.substr(li + 1);
  }

  var insertText = buttons[parseInt(event.target.id.replace('insertButton', ''))]['snippet'].replace('ITEM', item);
  var textarea = document.getElementById('nicopedia-article-textarea');
  var scrollTop = textarea.scrollTop;
  var selectionStart = textarea.selectionStart;
  var before = textarea.value.substring(0, selectionStart);
  var after = textarea.value.substring(textarea.selectionEnd, textarea.value.length);
  textarea.value = before + insertText + after;
  textarea.scrollTop = scrollTop;
  textarea.setSelectionRange(selectionStart, selectionStart + insertText.length);
  textarea.focus();
}

var textarea = document.getElementById('nicopedia-article-textarea');
if (textarea) {
  var parent = textarea.parentNode;
  for (var i = buttons.length - 1; i >= 0; --i) {
    var button = document.createElement('input');
    button.id = 'insertButton' + i;
    button.type = 'button';
    button.value = buttons[i]['value'];
    button.addEventListener('click', onclick, false);
    parent.insertBefore(button, textarea.nextSibling);
  }
  parent.insertBefore(document.createTextNode('挿入: '), textarea.nextSibling);
  parent.insertBefore(document.createElement('br'), textarea.nextSibling);
}
