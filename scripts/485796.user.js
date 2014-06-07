// ==UserScript==
// @name      Select Link Text With AltKey
// @namespace  
// @version    0.1
// @description  按Alt复制链接上文字
// @match      http://*/*
// @copyright  2014+, You
// @updateURL  http://userscripts.org/scripts/source/485796.meta.js
// @downloadURL  http://userscripts.org/scripts/source/485796.user.js
// ==/UserScript==

//按住 Alt 时屏蔽链接, 方便选择
((function () {
  'use strict';

  var LINKTARGET = null; //记录链接
  var LINKHREF = null //记录原 href
  var TIMER = null;
  var COORD = {
    'x': null,
    'y': null
  }; //用于判断 HASMOVED
  var HASMOVED = false; //触发后鼠标是否移动过

  //是否只按住 Alt
  function isMatchCondition(evt) {
    if (evt.altKey && !evt.ctrlKey && !evt.shiftKey) { //只按住 Alt
      return true;
    }
    return false;
  }

  //鼠标按下时取消链接
  function cancelLinkDetector(evt) {
    if (isMatchCondition(evt) === false || LINKTARGET !== null) {
      return;
    }
    if (evt.stopPropagation) { //非 IE & IE9+
      if (evt.button !== 0) { //左键
        return;
      }
    } else { //IE 6-8
      if (evt.button !== 1) { //左键
        return;
      }
    }
    var target = evt.target || evt.srcElement;
    var nodeName;
    for (var i = 0; i < 3; i++) { //只往上找 3 层
      nodeName = target.nodeName;
      if (nodeName === 'IMG' || nodeName === 'OBJECT') { //不处理图片
        return;
      } else if (nodeName === 'A') {
        LINKTARGET = target;
        LINKHREF = target.getAttribute('href');
        if (LINKHREF === null) {
          return;
        }
        COORD.x = evt.clientX;
        COORD.y = evt.clientY;
        HASMOVED = false;
        target.removeAttribute('href');
        addEvent(document, 'mousemove', enableCancelLink, true); //只有移动过鼠标才取消链接
        addEvent(document, 'mouseup', restoreLinkDetector, true);
        addEvent(window, 'blur', restoreLinkDetector); //拖到外面
        return false;
      }
      target = target.parentNode;
      if (target === null) {
        return;
      }
    }
  }

  //只有移动过鼠标才取消链接
  function enableCancelLink(evt) {
    if (Math.sqrt(Math.pow(evt.clientX - COORD.x, 2) + Math.pow(evt.clientY - COORD.y, 2)) < 3) { //鼠标移动距离小于 3 则忽略
      return;
    }
    COORD.x = null;
    COORD.y = null;
    HASMOVED = true;
    delEvent(document, 'mousemove', enableCancelLink, true);
    stopBubble(evt);
  }

  //松开鼠标还原
  function restoreLinkDetector(evt) {
    if (LINKTARGET === null) {
      return;
    }
    if (event.type === 'blur') {
      if (document.hasFocus()) {  //IE 下可能会奇怪的触发 blur
        return;
      }
    } else { //mouseup
      if (evt.stopPropagation) { //非 IE & IE9+
        if (evt.button !== 0) { //左键
          return;
        }
      } else { //IE 6-8
        if (evt.button !== 1) { //左键
          return;
        }
      }
    }
    delEvent(document, 'mousemove', enableCancelLink, true);
    delEvent(document, 'mouseup', restoreLinkDetector, true);
    delEvent(window, 'blur', restoreLinkDetector);
    if (HASMOVED) {
      HASMOVED = false;
      addEvent(document, 'click', restoreLink, true);
      TIMER = setTimeout(restoreLink, 10);
      stopBubble(evt);
      preventDefault(evt);
      return;
    }
    restoreLink(); //没移动过则立即还原, 以触发标准行为
  }

  //还原链接
  function restoreLink(evt) {
    delEvent(document, 'click', restoreLink, true);
    if (evt) {
      var e;
      try {
        clearTimeout(TIMER);
      } catch (e) {}
      stopBubble(evt);
      preventDefault(evt);
    }
    TIMER = null;
    if (LINKHREF !== null) {
      LINKTARGET.setAttribute('href', LINKHREF);
      LINKTARGET = null;
      LINKHREF = null;
    }
  }

  function addEvent(elem, type, func, useCapture) {
    if (elem.addEventListener) {
      elem.addEventListener(type, func, useCapture || false);
    } else {
      elem.attachEvent('on' + type, func);
    }
  }

  function delEvent(elem, type, func, useCapture) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, func, useCapture || false);
    } else {
      elem.detachEvent('on' + type, func);
    }
  }

  //阻止冒泡
  function stopBubble(evt) {
    if (evt.stopImmediatePropagation) {
      evt.stopImmediatePropagation();
    } else if (evt.stopPropagation) {
      evt.stopPropagation();
    } else {
      evt.cancelBubble = true;
    }
  }

  //阻止默认行为
  function preventDefault(evt) {
    if (evt.preventDefault) {
      evt.preventDefault();
    } else {
      evt.returnValue = false;
    }
  }

  addEvent(document, 'mousedown', cancelLinkDetector);
})());