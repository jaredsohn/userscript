// ==UserScript==
// @name			Renren Readall
// @description		Mark all your newfeeds on the page as read.
// @author			henix
// @version			0.1
// @include			http://www.renren.com/*
// @updateURL		http://userscripts.org/scripts/source/130833.user.js
// @license			MIT License
// ==/UserScript==
/**
 * ChangeLog
 *
 * 2012-4-13	henix
 * 		Version 0.1
 */
var eventer = {
 preventDefault: function(e) {
  if (typeof e.preventDefault === 'function') {
   e.preventDefault();
   e.stopPropagation();
  } else {
   e.returnValue = false;
   e.cancelBubble = true;
  }
 }
};
if (document.body.addEventListener) {
 eventer.addEventListener = function(target, eventType, handler) {
  target.addEventListener(eventType, handler, false);
 };
 eventer.removeEventListener = function(target, eventType, handler) {
  target.removeEventListener(eventType, handler);
 };
} else {
 eventer.addEventListener = function(target, eventType, handler) {
  target.attachEvent('on' + eventType, handler);
 };
 eventer.removeEventListener = function(target, eventType, handler) {
  target.detachEvent('on' + eventType, handler);
 };
}
if (document.createEvent) {
 eventer.fireEvent = function(element, eventType) {
  var evt = document.createEvent("HTMLEvents");
  evt.initEvent(eventType, true, true); // type, bubbling, cancelable
  return !element.dispatchEvent(evt);
 };
} else {
 eventer.fireEvent = function(element, eventType) {
  var evt = document.createEventObject();
  return element.fireEvent('on' + eventType, evt);
 };
}
var toolbar = document.querySelector('div.feed-tools').children[0];
var settingli = toolbar.children[1];
var mybutton = document.createElement('a');
mybutton.innerHTML = '全部已读';
mybutton.href = '#';
mybutton.onclick = function(e) {
 e = e || window.event;
 var goon = confirm('确定？');
 if (!goon) {
  return;
 }
 var feedlist = document.querySelector('div.feed-list');
 var deletes = feedlist.querySelectorAll('a.delete');
 var len = deletes.length;
 for (var i = 0; i < len; i++) {
  eventer.fireEvent(deletes[i], 'click');
 }
 alert('已清除 ' + len + ' 条新鲜事');
 eventer.preventDefault(e);
};
settingli.insertBefore(mybutton, settingli.children[0]);
