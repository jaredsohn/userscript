// ==UserScript==
// @name			Douban Timeline Marker
// @description		You can place a marker on the last newsfeed you have read, so it can be found easily next time. Ctrl-Click on an item to mark it, again to remove the mark.
// @author			henix
// @version			0.4
// @include			http://www.douban.com/*
// @updateURL		http://userscripts.org/scripts/source/125728.user.js
// @license			MIT License
// ==/UserScript==

/**
 * ChangeLog:
 *
 * 2012-2-29	henix
 * 		don't listen on load event
 *
 * 2012-2-27	henix
 * 		change trigger action from "click" to "Ctrl-click"
 *
 * 2012-2-14	henix
 * 		add another yellow marker on the previous position, and it can't be removed
 *
 * 2012-2-14	henix
 * 		Version 0.1
 */

var curMark;

var markerDiv;
var csser = {
 insertSheet: function(ruleString) {
  var head = document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  var rules = document.createTextNode(ruleString);
  style.type = 'text/css';
  if(style.styleSheet) {
   style.styleSheet.cssText = rules.nodeValue;
  } else {
   style.appendChild(rules);
  }
  head.appendChild(style);
 },
 addClass: function(e, name) {
  e.className += (' ' + name);
 },
 removeClass: function(e, name) {
  e.className = e.className.replace(new RegExp('(^|\\s)' + name + '(?=\\s|$)', 'gm'), ''); // zero-width assertion
 }
};
/**
 * see http://www.quirksmode.org/js/findpos.html
 */
function findPos(obj) {
 var curleft = 0;
 var curtop = 0;
 if (obj.offsetParent) {
  do {
   curleft += obj.offsetLeft;
   curtop += obj.offsetTop;
   obj = obj.offsetParent;
  } while(obj);
 }
 return {'left':curleft,'top':curtop};
}
function markItem(e) {
 if (curMark) {
  demarkItem(curMark);
 }
 csser.addClass(e, 'feedmarker');
 markerDiv.style.height = e.offsetHeight + 'px';
 var pos = findPos(e);
 markerDiv.style.top = pos.top + 'px';
 markerDiv.style.left = (pos.left - 46) + 'px';
 curMark = e;
}
function demarkItem(e) {
 csser.removeClass(e, 'feedmarker');
 markerDiv.style.top = '-1000px'; // hide the marker
 curMark = null;
}
function clickHandler(e) {
 if (!e) e = window.event;
 if (!e.ctrlKey) {
  return;
 }
 var tg = window.event ? e.srcElement : e.target;
 if (tg.nodeName === 'A') {
  return; // ignore clicks on <a>
 }
 if (curMark !== this) {
  markItem(this);
  localStorage.setItem('feedmarkid', this.getAttribute('data-sid'));
 } else {
  demarkItem(this);
  localStorage.removeItem('feedmarkid');
 }
 // e.cancelBubble = true;
 // if (e.stopPropagation) e.stopPropagation();
}
var markId = localStorage.getItem('feedmarkid');
var stitems = document.querySelectorAll('div.status-item'); // IE8+
csser.insertSheet('.feedmarker, .feedmarker-old {border: 1px dashed black}');
markerDiv = document.createElement('div');
markerDiv.style.cssText = 'background-color: #ccc; position: absolute; width: 46px';
document.body.appendChild(markerDiv);
for (var i = stitems.length - 1; i >= 0; i--) {
 var item = stitems[i];
 if (markId && item.getAttribute('data-sid') === markId) {
  // create a marker for previous position
  csser.addClass(item, 'feedmarker-old');
  var preMarkerDiv = document.createElement('div');
  preMarkerDiv.style.cssText = 'background-color: #ff6; position: absolute; width: 46px';
  var pos = findPos(item);
  preMarkerDiv.style.height = item.offsetHeight + 'px';
  preMarkerDiv.style.top = pos.top + 'px';
  preMarkerDiv.style.left = (pos.left - 46) + 'px';
  document.body.appendChild(preMarkerDiv);
 }
 item.addEventListener('click', clickHandler, true); // register for capturing
}
