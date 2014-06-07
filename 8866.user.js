// ==UserScript==
// @name           2ch.ru enhancements
// @namespace      urn:uuid:ec9e3abf-72c1-45f1-ae32-d683f9a8a92a
// @description    2ch.ru enhancements v1.084
// @include        http://2ch.ru/*
// @include        http://iichan.ru/*
// @encoding       utf-8
// ==/UserScript==

/*
  FORCED ANONYMITY LICENSE v1.0
  =============================
  This program is free software. Redistribution and use, with or without
  modification, are permitted provided that the following conditions are met:

    * Any redistributions must retain this notice.
    * The author and all contributors of this program must remain anonymous.

  As an exception, non-anonymous code modifications (contributions) to this
  program are allowed if the modification:

    * Fixes some secirity threat, the program poses (security fixes).
    * Fixes some misbehavior which is generally considered extremly annoying.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*/

// Version history:
//  * 1.084: Fixed compatibility with CAPTCHA fixup userscript.
//  * 1.083: Added iichan.ru support (incomplete/buggy).
//  * 1.082: Yet another bugfix (non-ASCII characters in hiding reason).
//           added limits.
//  * 1.081: Minor bugfix with "=" and ";" chars in thread hiding reason.
//  * 1.08: Hiding and showing threads. Greasemonkey only.
//  * 1.07: Added support for CAPTCHA.
//  * 1.06: Minor update to reflect site changes. Also added some code for
//          hiding threads (has a bug with scrolling on refresh and commented out)
//  * 1.05: Clicking on reply link with shift key just appends
//          post number (for replying to 2 or more posts)
//  * 1.04: Opera support. Presently as hacks, sometimes without much
//          understanding of the underlying detials. Should be fixed.
//  * 1.03: Minor CSS modifications to reflect site changes;
//          Sage checkbox instead of Email input;
//          Loading unfold link animation;
//          All non-7bit-safe characters are encoded as escape sequences.
//  * 1.02: Implemented folding the thread back after unfolding;
//          Added quick reply form.
//  * 1.00: Initial version.
//
// TODO:
//  * Rewrite XPath stuff using SNAPSHOT_TYPE instead of ITERATOR_TYPE to
//    get rid of ugly .push() hacks. Should learn XPath better.
//  * Move shared code into functions (do some refactoring).

if ((location.hostname.indexOf('2ch.ru') != -1) ||
    (location.hostname.indexOf('iichan.ru') != -1)) {
var f_main = function() {
  var strBoard, iInThread, strHost;
  strHost = window.location.hostname;
  if (strBoard = window.location.href.match(/\/([a-z0-9]{1,3})\/((res\/)?((\d+)|wakaba)\.html)?([\?#].*)?$/)) {
    iInThread = strBoard[5];
    strBoard = strBoard[1];
  } else {
    return;
  }

  function addGlobalStyle(strCSS) {
    var objHead = document.getElementsByTagName('head')[0];
    if (!objHead) { return; }
    var objStyle = document.createElement('style');
    objStyle.type = 'text/css';
    objStyle.appendChild(document.createTextNode(strCSS));
    objHead.appendChild(objStyle);
  }

  function removeAllChilds(objParent) {
    while (objParent.firstChild) {
      objParent.removeChild(objParent.firstChild);
    }
  }

  function normalizeURL(strURL) {
    if (strURL.match(/^[a-z0-9]+:/)) {
      return strURL;
    } else if (strURL.match(/^\//)) {
      return 'http://' + strHost + strURL;
    } else {
      return window.location.href + strURL; // Total crap.
    }
  }

  // Helper function to aid debugging
  function dumpObject(objSomething, bShowFunctions) {
    var strResult = typeof(objSomething) + " {\n";
    for (mIndex in objSomething) {
      try {
        if (typeof objSomething[mIndex] == 'function') {
          if (bShowFunctions) { strResult += "\u3000\u3000" + mIndex + ": (function)\n"; }
        } else {
          strResult += "\u3000\u3000" + mIndex + ": " + objSomething[mIndex] + "\n";
        }
      } catch(e) {
        strResult += "\u3000\u3000" + mIndex + ": (Error: " + e.message + ")\n";
      }
    }
    strResult += "}";
    return strResult;
  }

  function doExpandThread(objLink, objEvent) {
    var strURL = normalizeURL(objLink.getAttribute('href'));
    var iThreadId = strURL.match(/\/(\d+)\.html/);
    if (!iThreadId || !iThreadId[1]) { return; }
    iThreadId = iThreadId[1];
    var objOP = objLink.parentNode;
    if (objOP.tagName.toLowerCase() != 'span' || objOP.className != 'omittedposts') { return; }
    var objRequest = new XMLHttpRequest();
    if (!objRequest) { return false; }
    objLink.className += ' loading';
    objRequest.onreadystatechange = function(objREvent) {
      if (objRequest.readyState == 4 && objRequest.status == 200) {
        var objParser = null;
        if (typeof(XPCNativeWrapper) == "function") {
          // Firefox XPCNativeWrapper workaround
          var objDP = new XPCNativeWrapper(window, "DOMParser()");
          objParser = new objDP.DOMParser();
        } else {
          objParser = new DOMParser();
        }
        var objDoc = objParser.parseFromString(objRequest.responseText, 'application/xhtml+xml');
        var objPosts = objDoc.evaluate(
          "//xhtml:form[@id='delform']//xhtml:table//xhtml:td[@class='reply']", objDoc,
          {
            normalResolver: objDoc.createNSResolver(objDoc.documentElement),
            lookupNamespaceURI : function (strPrefix) {
              switch (strPrefix) {
                case "xhtml": return "http://www.w3.org/1999/xhtml";
                default: return this.normalResolver.lookupNamespaceURI(strPrefix);
              }
            }
          },
          XPathResult.ORDERED_NODE_ITERATOR_TYPE, null
        );
        var objPost, arrPosts = [];
        while (objPost = objPosts.iterateNext()) {
          arrPosts.push(objPost);
        }
        arrPosts.reverse();
        for (iIndex in arrPosts) {
          objPost = arrPosts[iIndex];
          if (!document.getElementById(objPost.id)) {
            var objParent = objPost.parentNode;
            while (objParent.tagName.toLowerCase() != 'table') {
              objParent = objParent.parentNode;
            }
            objOP.parentNode.insertBefore(objParent, objOP.nextSibling);
            objParent.className += (objParent.className != '' ? ' ' : '') + 'x_unfoldreply x_unfoldthread' + iThreadId;
            try {
              if (window.opera) { objDoc = document; }
              var objReplyLink = objDoc.evaluate(
                "//xhtml:span[@class='reflink']/xhtml:a", objParent,
                {
                  normalResolver: objDoc.createNSResolver(objDoc.documentElement),
                  lookupNamespaceURI : function (strPrefix) {
                    switch (strPrefix) {
                      case "xhtml": return "http://www.w3.org/1999/xhtml";
                      default: return this.normalResolver.lookupNamespaceURI(strPrefix);
                    }
                  }
                },
                XPathResult.FIRST_ORDERED_NODE_TYPE, null
              ).singleNodeValue;
              var arrLinkID;
              if (arrLinkID = objReplyLink.getAttribute('href').match(/'>>(\d+)'/)) {
                objReplyLink.setAttribute('href', strURL + '#i' + arrLinkID[1]);
                objReplyLink.addEventListener('click', doQuickReplyForm, true);
                if (window.opera) { objReplyLink.onclick = doQuickReplyForm; }
                objReplyLink.className += ' x_qrattached';
              }
            } catch(e) { ; }
          }
        }
        objLink.className = 'x_foldlink';
        objLink.firstChild.nodeValue = '\u0441\u0432\u0435\u0440\u043d\u0443\u0442\u044c';
        objLink.nextSibling.nodeValue = '\xbb \u0447\u0442\u043e\u0431\u044b \u0441\u043a\u0440\u044b\u0442\u044c \u0442\u0440\u0435\u0434 \u043e\u0431\u0440\u0430\u0442\u043d\u043e.';
      }
    }
    objRequest.open('GET', strURL, true);
    objRequest.setRequestHeader('User-Agent', navigator.userAgent);
    objRequest.setRequestHeader('Referer', strURL);
    objRequest.setRequestHeader('Accept', 'application/xhtml+xml,application/xml,text/xml');
    objRequest.setRequestHeader('X-Extension-UUID', 'ec9e3abf-72c1-45f1-ae32-d683f9a8a92a');
    objRequest.send(null);
    objEvent.preventDefault();
  }

  function doCollapseThread(objLink, objEvent) {
    objLink.className = 'x_unfoldlink';
    var strURL = normalizeURL(objLink.getAttribute('href'));
    var iThreadId = strURL.match(/\/(\d+)\.html/);
    if (!iThreadId || !iThreadId[1]) { return; }
    iThreadId = iThreadId[1];
    try {
      var arrReplies = [];
      var objReply;
      var objOP = document.evaluate("//*[starts-with(@class, 'x_unfoldreply')]", document, null, XPathResult.ANY_TYPE, null);
      while (objReply = objOP.iterateNext()) {
        arrReplies.push(objReply);
      }
      for (iIndex in arrReplies) {
        objReply = arrReplies[iIndex];
        objReply.parentNode.removeChild(arrReplies[iIndex]);
      }
      objLink.className = 'x_unfoldlink';
      objLink.firstChild.nodeValue = '\u0440\u0430\u0437\u0432\u0435\u0440\u043d\u0443\u0442\u044c';
      objLink.nextSibling.nodeValue = '\xbb \u0447\u0442\u043e\u0431\u044b \u0443\u0432\u0438\u0434\u0435\u0442\u044c \u0442\u0440\u0435\u0434 \u0446\u0435\u043b\u0438\u043a\u043e\u043c.';
      objEvent.preventDefault();
    } catch(e) { ; }
  }

  function doExpandOrCollapse(objEvent) {
    if (this.className == 'x_unfoldlink') {
      doExpandThread(this, objEvent);
    } else {
      doCollapseThread(this, objEvent);
    }
  }

  function createElementEx(strTagName, arrAttrs, arrChildren) {
    var objElement = document.createElement(strTagName);
    for (strIndex in arrAttrs) {
      objElement.setAttribute(strIndex, arrAttrs[strIndex]);
    }
    for (strIndex in arrChildren) {
      objElement.appendChild(arrChildren[strIndex]);
    }
    return objElement;
  }

  var objReplyForm = null; // "Global" variable
  function getReplyForm(iThreadId) {
    if (!strBoard) { return null; } // Should not happen
    if (!objReplyForm) {
      objReplyForm = createElementEx('form', {
        'action': ('/cgi-bin/wakaba.pl/' + strBoard),
        'method': 'post',
        'enctype': 'multipart/form-data'
      });
      objReplyForm.id = 'x_replyform';
      objReplyForm.appendChild(createElementEx('input', {'name': 'task', 'value': 'post', 'type': 'hidden'}));
      objReplyForm.appendChild(createElementEx('input', {'name': 'parent', 'value': iThreadId, 'type': 'hidden', 'id': 'x_replyform_iparent'}));
      objReplyForm.appendChild(createElementEx('input', {'name': 'gb2', 'value': 'board', 'type': 'hidden'}));
      objReplyForm.appendChild(createElementEx('textarea', {'id': 'x_replyform_text', 'name': strHost == 'iichan.ru' ? 'nya4' : 'shampoo', 'rows': '5', 'cols': '40'}));
      var objBottomDiv = document.createElement('div');
      var objPassLabel = createElementEx('label', {'for': 'x_replyform_pass', 'title': '\u041f\u0430\u0440\u043e\u043b\u044c \u043d\u0430 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u043f\u043e\u0441\u0442\u0430'});
      objPassLabel.appendChild(document.createTextNode('\u043f\u0430\u0440\u043e\u043b\u044c: '));
      objPassLabel.appendChild(createElementEx('input', {'id': 'x_replyform_pass', 'name': 'password', 'size': '8', 'type': 'password'}));
      var objFileLabel = createElementEx('label', {'for': 'x_replyform_file', 'title': '\u0424\u0430\u0439\u043b'});
      objFileLabel.appendChild(document.createTextNode('\u0444\u0430\u0439\u043b: '));
      objFileLabel.appendChild(createElementEx('input', {'id': 'x_replyform_file', 'name': 'file', 'size': '20', 'type': 'file'}));
      var objSageLabel = createElementEx('label', {'for': 'x_replyform_sage', 'title': '\u0421\u0430\u0433\u0435 aka DO NOT WANT'});
      objSageLabel.appendChild(createElementEx('input', {'id': 'x_replyform_sage', 'type': 'checkbox', 'name': strHost == 'iichan.ru' ? 'nya2' : 'nabiki', 'value': 'sage'}));
      objSageLabel.appendChild(document.createTextNode('sage'));
      var objCaptcha = createElementEx('span', {'id': 'x_replyform_captcha'});
      var iNeedCaptcha = qrNeedCaptcha();
      objCaptcha.style.display = iNeedCaptcha ? 'inline' : 'none';
      objCaptcha.appendChild(document.createTextNode('CAPTCHA: '));
      objCaptcha.appendChild(createElementEx('input', {'id': 'x_replyform_captcha_input', 'name': 'captcha', 'size': '10', 'value': '', 'type': 'text'}));
      objCaptcha.appendChild(document.createTextNode('<='));
      objCaptcha.appendChild(createElementEx('img', {'id': 'x_replyform_captcha_img',
        'src': iNeedCaptcha ? '/cgi-bin/captcha.pl/' + strBoard + (strHost == 'iichan.ru' ? '/' : '') + '?key=res' + iThreadId + '&dummy=quickreply' : 'about:blank', 'alt': 'CAPTCHA',
	'style': 'vertical-align: middle;'}));
      objBottomDiv.appendChild(objFileLabel);
      objBottomDiv.appendChild(objSageLabel);
      objBottomDiv.appendChild(objPassLabel);
      objBottomDiv.appendChild(objCaptcha);
      objBottomDiv.appendChild(createElementEx('input', {'type': 'submit', 'value': '\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c'}));
      var objCloseBtn = document.createElement('button');
      objCloseBtn.addEventListener('click', hideQuickReplyForm, true);
      if (window.opera) { objCloseBtn.onclick = hideQuickReplyForm; }
      objCloseBtn.appendChild(document.createTextNode('\u2716'));
      objBottomDiv.appendChild(objCloseBtn);
      objReplyForm.appendChild(objBottomDiv);
    } else {
      var objInputParent = document.getElementById('x_replyform_iparent');
      if (!objInputParent) { return null; } // Someone touched our document. Bail out.
      objInputParent.value = iThreadId;
      qrReAddCaptcha(iThreadId);
    }
    return objReplyForm;
  }

  function qrNeedCaptcha() {
    var objCaptchaTop = document.evaluate("//img[contains(@src,'/captcha.pl/') or (@id = 'x_captcha')]", document,
					  null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var objCaptchaTop2 = document.evaluate("//input[@name = 'captcha']", document,
					  null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    return objCaptchaTop ? 1 : objCaptchaTop2 ? 1 : 0;
  }

  function qrReAddCaptcha(iThreadId) {
    var objCaptcha = document.getElementById('x_replyform_captcha');
    if (objCaptcha) {
      if (qrNeedCaptcha()) {
        objCaptcha.style.display = 'inline';
        var objCaptchaImg = document.getElementById('x_replyform_captcha_img');
        objCaptchaImg.src = '/cgi-bin/captcha.pl/' + strBoard + '?key=res' + iThreadId + '&amp;dummy=quickreply';
        var objCaptchaInput = document.getElementById('x_replyform_captcha_input');
        objCaptchaInput.value = '';
      } else {
        objCaptcha.style.display = 'none';
      }
    } else {
      window.alert('Internal code error: no x_replyform_captcha');
    }
  }

  function doQuickReplyForm(objEvent) {
    var strURL = normalizeURL(this.getAttribute('href'));
    var iThreadId = strURL.match(/\/(\d+)\.html(#i?(\d+)|\?.*)?$/);
    if (!iThreadId || !iThreadId[1]) { return; }
    var iPostId = iThreadId[3] ? iThreadId[3] : 0;
    iThreadId = iThreadId[1];
    var objRText = document.getElementById('x_replyform_text');
    if (!objRText || !objEvent.shiftKey) {
      var objPost = this.parentNode;
      while (objPost && objPost.tagName.toLowerCase() != 'table') {
        objPost = objPost.parentNode;
      }
      var objReplyForm = getReplyForm(iThreadId);
      objReplyForm.style.display = 'block';
      objPost.parentNode.insertBefore(objReplyForm, objPost.nextSibling);
      var objRPass = document.getElementById('x_replyform_pass');
      if (objRPass) {
        try {
          var objRealPass = document.evaluate("//tr[@id='trpassword']/td/input[@name='password']", document,
                                              null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          if (objRealPass) {
            if (objRPass.value == '') {
              objRPass.value = objRealPass.value;
            } /* else if (objRealPass.value != objRPass.value) {
              objRealPass.value = objRPass.value; // Should we?
            } */
          }
        } catch(e) { window.alert(e); }
      }
    }
    if (!objRText) { objRText = document.getElementById('x_replyform_text'); }
    if (objRText && iPostId) {
      if (objRText.value.match(/^>>\d+\s*$/) && !objEvent.shiftKey) { objRText.value = ''; }
      objRText.value += '>>' + iPostId + ' ';
    }
    objEvent.preventDefault();
  }

  function hideQuickReplyForm(objEvent) {
    try {
      if (!objReplyForm) { return; }
      var objTemp = document.getElementById('x_replyform_pass');
      if (objTemp) { objTemp.value = ''; }
      var objTemp = document.getElementById('x_replyform_text');
      if (objTemp) { objTemp.value = ''; }
      objReplyForm.style.display = 'none';
    } catch(e) { ; }
    objEvent.preventDefault();
  }

  var arrHideThreads = {};

  function loadHiddenThreads() {
    var strData = GM_getValue('2ch_hide_t.' + strBoard, '');
    if (strData != '') {
      var arrPairs = strData.split(';');
      if (arrPairs.shift() == 'Hide.v2') {
        for (var iIndex in arrPairs) {
	  try {
            var arrPair = arrPairs[iIndex].split('=');
            arrHideThreads[arrPair[0]] = decodeURIComponent(arrPair[1]);
            hideThread(arrPair[0], arrHideThreads[arrPair[0]]);
          } catch(e) { ; }
        }
      }
    }
  }

  function saveHiddenThreads() {
    var strData = 'Hide.v2';
    var arrTIDs = [];
    for (var iTID in arrHideThreads) { arrTIDs.push(iTID); }
    arrTIDs.sort(); arrTIDs.reverse();
    for (var iTIdx in arrTIDs) {
      var iTID = arrTIDs[iTIdx];
      if (strData.length < 10240) { // Should be reasonable limit
        strData += ';' + iTID + '=' + encodeURIComponent(arrHideThreads[iTID]).replace(/[=;]/g, '_');
      }
    }
    GM_setValue('2ch_hide_t.' + strBoard, strData);
  }

  function hideThread(iNumber, strReason) {
    var objThread = document.getElementById('thread-' + iNumber);
    if (objThread) {
      objThread.style.display = 'none';
      objThread.parentNode.insertBefore(
	createElementEx('div', {'id': 'thread-' + iNumber + '-hidden', 'class': 'hidden-thread'}, [
          createElementEx('a', {'href': normalizeURL('/' + strBoard + '/res/' + iNumber + '.html')}, [
            document.createTextNode('\u0422\u0440\u0435\u0434 \u2116' + iNumber)
          ]),
          document.createTextNode(' \u0441\u043a\u0440\u044b\u0442' +
            (strReason ? ' \u043f\u043e \u043f\u0440\u0438\u0447\u0438\u043d\u0435: \xab' + strReason + '\xbb ' : '. ')),
        ]),
        objThread
      );
    }
  }

  function unhideThread(iNumber) {
    if (arrHideThreads[iNumber]) {
      delete arrHideThreads[iNumber];
      saveHiddenThreads();
    }
  }

  function hideThreadClick(objEvent) {
    if (this && this.parentNode && this.parentNode.id) {
      var iNumber = this.parentNode.id.replace('thread-', '');
      var strReason =  window.prompt('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0440\u0438\u0447\u0438\u043d\u0443 \u0441\u043a\u0440\u044b\u0442\u0438\u044f \u0442\u0440\u0435\u0434\u0430 \u2116' + iNumber + ':');
      if (strReason) {
        arrHideThreads[iNumber] = strReason;
        saveHiddenThreads();
        hideThread(iNumber, strReason);
      }
    }
    objEvent.preventDefault();
  }

  function unhideThreadClick(objEvent) {
    if (this && this.parentNode && this.parentNode.id) {
      var iNumber = this.parentNode.id.replace('thread-', '').replace('-hidden', '');
      if (window.confirm('\u0412\u0435\u0440\u043d\u0443\u0442\u044c \u0442\u0440\u0435\u0434 \u2116' + iNumber + '?')) {
        unhideThread(iNumber);
        window.location.reload();
      }
    }
    objEvent.preventDefault();
  }

  addGlobalStyle(
    '.postername, .postertrip, .commentpostername { display: inline; visibility: visible; font-weight: bold; color: #339; } \
    .postertrip { color: #993; } \
    .hidden-thread { color: #666; padding: 5px 0 0 28px; min-height: 24px; vertical-align: middle; background: url(' +
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAC5VBMVEUAAIlvDBBzDQ6ZAACNCQuXBgaQCguSDQ6OEhKdDAw4O' +
      'EZ%2FHSOaExOcFRWbFxebGBhAQECbGRmcHx%2BgHx9HRkalHh5IR0elICBISEijISFvOTqlIyKlJCOWKiymJCSnJCSnJSU%2FT2CmJiWnJiaoJiZOTU2oJy' +
      'enKCdvP0WnKChHTmSoKCipKCieLS2oKSmpKSmpKipTT0%2BpKyuqKyuqLCyrLS1cUFCZNjaeNjatNjaeQUCfQUFeXV2MSkmvQD9jY2OxQkGgTEyzRERVaX6' +
      '0RUVqZWVnZ2dpZW%2B1Rka1R0e0TEuJYGB5aWm1UlC5UVG1U1K3VlW4VlSiYGB9cnK7WFiiY2O8WFiaZmq8WVm8Wlq9WlqkZWW9XFt8eHi%2BXV2%2BXl6%' +
      '2FX1%2BpaWmjbGu%2FYGB%2BfHzAYmLAY2OEf36DgoKEhIO%2BbGm%2FbWuFjpeOjIzHdXXIdnbId3enhoaRkZHJeXnGe3rIfn2VlZaZlJKmj462iIinkZD' +
      'Lg4KampqmlpXKiYfKionKi4menp68kpGpmpqnnZyonp2poKCloqKqoaGpo6PSkpHSk5KmpqXTk5POlpPAnJyop6aqpqbUlJSop6eoqKepqamqqanPmpfVl5' +
      'eqqqmqqqrVmJirq6qrq6vQnJmsrKzKoJ2tra21qqqurq6nsLqvr66xsLDYoaGysrKzs7Pao6O1tLO6sbbZpqW3t7bbqKjcqamzusHdqqrdq6vLtLLZr6%2F' +
      'cubfExMTFxcXjurrevrrKx8nNzc3hxcPOzs3Q0M%2Fgysfa0M%2FhzczpysrlzMzk0M3X19ft1tbf3dvv2Njg39zf39%2Fg393n3Nru2dnv2dnh4N%2Fw2t' +
      'rp3trh4eDi4d%2Fw3Nzl5eXp5eHq5eDr5uLr5%2BPo6Ojs6OTt6Ojt6ubx6Oft7Ojs7Oz06%2Bru7u707Ozw8PD47u7z8vH39PT39vX49%2Fb69vb79%2Ff' +
      '6%2BPf5%2Bff5%2Bfj7%2BPj8%2BPj6%2Bfn8%2Bfn7%2Bvr8%2B%2FsqJSU76%2FbaAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMA' +
      'AAsTAQCanBgAAAAHdElNRQfXBQcQAg8od%2B2dAAABbUlEQVQoz2NgoCfYXBwVVbwJQ3i2p6majo6asccMFOHzaSoGCb07d06KN1BJOw8V3L%2B4p9aKzyK' +
      'poqWzs7UqSJDHunnWwttAiZmn7jRIe207e%2BLMhcuXD1kyyyt0v3i4ECjR8%2BCAnVLfwdUZqgISPrrMetX6Tue%2BTAVKTLg1XdN%2FS65NWY4ilywzR%' +
      '2F%2BRSKO1n%2BYCJaZcz5JMDBbZsdHZnZGZtzJlUb1K3of5IIkbvsLe32oeL9FiYmYJv9to2KQQ8hoqIbOgXOzaGm5mdo3d2%2B1dtyqHvQFL3MyWq7u0z' +
      '8ycmU0qtshtz6MulfzPIInJ9%2BZpBu7dFcDMapueue752%2BMx%2Buu%2FgixfeuWog3qJNjNn6f2Xr969f7Jc2%2BXq05VAiWPL2kP5hJiZHdtmzZozra' +
      'PQgj964orT0GBJFTVNO%2Fzs48dnF1f5iScjBeLJVHn9OFAgxunLp55EC3YTNSAwQQt2ENhUEBFRsIGCmAYAfnmQEILCdB4AAAAASUVORK5CYII%3D' +
    ') no-repeat left center; } \
    form > div + br[clear="left"] { display: block; height: 1px; } \
    .reply label { font-size: 80%; color: #666; } .reply label span { font-size: 125%; } \
    .reply label a[href="mailto:sage"] { color: #f33; padding-left: 16px; background: url(' + 
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYm' + 
      'UgSW1hZ2VSZWFkeXHJZTwAAAClUExURcA%2FP5APD5wcHJgXF40MDMJBQZMTE%2Fr6%2BqEgIOjo6PHx8aw5ObZDQ79MTLU0NN7e3qYlJbk4OKsqKrAvL%' +
      '2BPj4%2B3t7fb29sxgYKA5OdXV1d%2Bfn708PKU6OrxUVKc0NJ4qKshcXOCgoLJKSqhAQPns7PPm5tDQ0LE%2BPsVdXdnZ2caFhbtHR6A0NMeHh9qXl81w' +
      'cM6EhMNPT8VoaMV7e798fK5HR7tfX0Qr1q0AAADCSURBVHjaYlBRFGeFAnFFFYAAYpBiQAJSAAHEoCCtxw4B%2BobSCgABxCAoKKbBy8sLxGJigoIAAcTA' +
      'x8cFBAZG2tpcXHx8AAHEICwsKsvDwwPEoqLCwgABxCAkxAkExmbq6pycQkIAAcQgICCixM3NDcQiIgICAAHEwMFhws%2FPbyonx88BBAABxMAEBprKypog' +
      'GiCAGJjBQFJeXhJEAwQQgwwbCEioqUkAKRmAAGLQZUQCugABxKCqpcMCBTpaqgABBgA0Xgxlx6wWOwAAAABJRU5ErkJggg%3D%3D) no-repeat left center; } \
    label, label input { vertical-align: middle; } \
    a.loading { padding-left: 16px; \
      background: url(data:image/gif;base64,R0lGODlhEAAQAOYAAP%2F%2F%2F9TU1JSUlGBgYEBAQERERG5ubqKiotzc3KSkpCQkJCgoK' +
      'DAwMDY2Nj4%2BPmpqarq6uhwcHHJycuzs7O7u7sLCwoqKilBQUF5eXr6%2BvtDQ0Do6OhYWFoyMjKqqqlxcXHx8fOLi4oaGhg4ODmhoaJycnGZmZra2tkZ' +
      'GRgoKCrCwsJaWlhgYGAYGBujo6PT09Hh4eISEhPb29oKCgqioqPr6%2Bvz8%2FMDAwMrKyvj4%2BNbW1q6urvDw8NLS0uTk5N7e3s7OzsbGxry8vODg4Nj' +
      'Y2PLy8tra2np6erS0tLKyskxMTFJSUlpaWmJiYkJCQjw8PMTExHZ2djIyMurq6ioqKo6OjlhYWCwsLB4eHqCgoE5OThISEoiIiGRkZDQ0NMjIyMzMzObm5' +
      'ri4uH5%2BfpKSkp6enlZWVpCQkEpKSkhISCIiIqamphAQEAwMDKysrAQEBJqamiYmJhQUFDg4OHR0dC4uLggICHBwcCAgIFRUVGxsbICAgAAAAAAAAAAAA' +
      'AAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQFAAAAACwAAAAAEAAQAAAHjYAAgoOEhYUaIigshoUHGyMpLYI1OTaFCQocJCougjYvPDWDAQURHYY1ExO' +
      'WAAIKEowAPD48ggMLELEyPz6CBAwTsQA6RIIFDRSxNkA9ggYOFbETQTqCBwUWsT1CQ4IIDxcehjoqFUWDEBgfJRovMgg3BzvdhBkgJgYwMx0rOwiMIU6si' +
      'NGBBo5gwhIGAgAh%2BQQFCgAAACwBAAEADgAOAAAHg4AAgjoCVlcLWlwagow7F1QKWCxbI14ljElOUkcQE1NJXSlbgkYDT5eMgjGMCQUiqbA2AEdKULCpO' +
      'TUDSzy3jEVFJkxFvoITFBZNQMU5YRRIDwfFUz88PhZRGbcuAUM1ADgxM0gIOTkuRF8aFIxAJVUrWR5JQmBTsFM4SDQqQQgvjAIBACH5BAUKAAAALAEAAQA' +
      'OAA4AAAeDgACCCAkSaAVdKwGCjEIGSgUODQwLaWuMN11mZ1AUFEJRagsHACFjTTuMjGcsTxpiD2Wqqg9sXCsSPbOMSW1pMUcvu4JTLSwdMzLDqjQWRsuMX' +
      '2RCyzU5ABMeZbqzOTzKAEY0HkBTNjYvEy4UNYw%2FQidCQUA6Py7XqkUIGjg9Q%2ByMAgEAIfkEBQoAAAAsAQABAA4ADgAAB4WAAII%2BJx0PTSBrRoKMO' +
      'BYGJhhmWmlNSYxAIkdrGkU8QVwOTjsAUyUxN4yMZV5LOjhVJ6qqRwsCSSsIs4wQalZrZTm7ghMRVG5rwsNTHHEVO2HDAElsSkYnPdJNKSJFXzchw28MQAA' +
      'uXzghL4I27QBwjBNEAQghUzwyNbs5E2FhEy%2F0MQoEACH5BAUKAAAALAEAAQAOAA4AAAeEgACCE2BuZB0lED6CjAgqcGQWM0cSMRWMQzsJFT8yMgEJJA8' +
      'ZAEU3OzqMjEkfEj8%2FYhqqqmRaaz03U7OMQWl0YEE2u4IUDko9QMLDFA0FPwEvwwBCdV0UCLrDdHECNWE%2B0bMdWCgBADJTEzKMKiZyCgmMNUUvOYItb' +
      'XMHuzbKBSKyBAUCACH5BAUKAAAALAEAAQAOAA4AAAeDgACCLz84JyoQQBOCjFNAN2JJHgdwCT2MFBpfRlM1OSEZVVVAADU%2FPS6MjEEzZGE8CKmqjG5RE' +
      'FNDMrOMPQZnU2G7jEVdBhSLwgBFTCYvRTbJQUtjNTLQwlxpawA217MlDk1GqgMqU1NiMFJOSap1dm1bLFhxFzuzQCJoCgtmZDqMAgEAIfkEBQoAAAAsAQA' +
      'BAA4ADgAAB4CAAII2PD46PTohL4KMOVNDCAFAQTdQIYw1FC4UMgA2FDonSD%2BCLzw5jIxGHkkUNjKoqYxQZUA2NbKpQys7ubIyHWS%2BqTIzHQUtvb4BM' +
      'CUxKV3DWQYQGg1bFrk7TXuXWWosd2ITFBVVeV03jAdOeHF1DQ5pekKyAWQYDgUGBwiMgQAh%2BQQFCgAAACwBAAEADgAOAAAHf4AAggA2OUUUFEU1g4w1M' +
      'kUTYUNDPIMljII5E0Q6EwBADC2YglNAPTIiKU2jgggVQ0ojKqwAE0I4CltTtDVJYgssu6w5HipmWCe0Q1kQZAp0tBArQAFKV3CjFRYHu25PczFQPEVAayA' +
      'WGoMqH05pS0xdBh1gmEYHMBgmFic%2Bg4EAOw%3D%3D) no-repeat left center; } \
    .x_unfoldreply td { border-color: #999; } \
    .x_qrattached:hover { border-bottom: 1px #ccc dotted; } \
    div a.show-hide-thread { display: block; float: right; font-size: 70%; text-decoration: none; } \
    div a.show-hide-thread:hover { text-decoration: underline; color: #f33; } \
    #x_replyform { display: block; border: 1px #ccc solid; margin: 0 2px 2px 2px; padding: 5px; \
                   background-color: #ddd; -moz-border-radius: 5px; } \
    #x_replyform textarea { width: 100%; border: 1px #888 solid; } \
    #x_replyform div { overflow: hidden; margin-top: 5px; } \
    #x_replyform label { float: left; margin-right: 10px; } \
    #x_replyform input[type="text"], #x_replyform input[type="password"] { border: 1px #888 solid; } \
    #x_replyform input[type="file"] > input[type="text"] { border: 1px #888 solid; } /* doesn`t work, however... */ \
    #x_replyform input[type="submit"] { /* float: right; */ border: 1px #666 solid; margin-left: 10px; } \
    #x_replyform button { /* float: right; */ border: 1px #666 solid; margin-left: 10px; }'
  );
  // Add thread unfolding stuff
  var arrSpans = [];
  var objSpan, iIndex;
  //var objOP = document.evaluate("//span[@class='omittedposts']", document, null, XPathResult.ANY_TYPE, null);
  var objOP = document.evaluate('//span[@class="omittedposts"]', document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );
  while (objSpan = objOP.iterateNext()) {
    arrSpans.push(objSpan);
  }
  for (iIndex in arrSpans) {
    objSpan = arrSpans[iIndex];
    try {
      var strText = objSpan.childNodes[0].nodeValue;
      var arrMatches;
      if (arrMatches = strText.match(/^([^\.]+\s+\d+\s+[^\.]+\.).*/)) {
        var objSibling = objSpan.previousSibling;
        var strURL = null;
        while (objSibling && !strURL) {
          if (objSibling.tagName && objSibling.tagName.toLowerCase() == 'span') {
            if (objSibling.className.toLowerCase() == 'replytothread') {
              objSibling = objSibling.firstChild;
              while (objSibling && !strURL) {
                if (objSibling.tagName && objSibling.tagName.toLowerCase() == 'a') {
                  strURL = objSibling.getAttribute('href');
                }
                objSibling = objSibling.nextSibling;
              }
            }
          } else if (objSibling.tagName && objSibling.tagName.toLowerCase() == 'a') {
	    if (objSibling.getAttribute('href').match(/\/res\/\d+\.html/)) {
	      strURL = objSibling.href;
	    }
          }
          objSibling = objSibling.previousSibling;
        }
        if (strURL) {
          removeAllChilds(objSpan);
          objSpan.appendChild(document.createTextNode(arrMatches[1] + ' \u041d\u0430\u0436\u043c\u0438\u0442\u0435 \xab'));
          var objExpandLink = document.createElement('a');
          objExpandLink.appendChild(document.createTextNode('\u0440\u0430\u0437\u0432\u0435\u0440\u043d\u0443\u0442\u044c'));
          objExpandLink.setAttribute('href', strURL);
          objExpandLink.className = 'x_unfoldlink'
          objExpandLink.addEventListener('click', doExpandOrCollapse, true);
          if (window.opera) {
            objExpandLink.onclick = doExpandOrCollapse;
          }
          objSpan.appendChild(objExpandLink);
          objSpan.appendChild(document.createTextNode('\xbb \u0447\u0442\u043e\u0431\u044b \u0443\u0432\u0438\u0434\u0435\u0442\u044c \u0442\u0440\u0435\u0434 \u0446\u0435\u043b\u0438\u043a\u043e\u043c.'));
        }
      } else {
        window.alert(strText);
      }
    } catch(e) { ; }
  }
  // Attach quick reply code to links
  var arrLinks = [];
  var objLink, iIndex;
  var objRL = document.evaluate("//td[@class='reply']/span[@class='reflink']/a", document, null, XPathResult.ANY_TYPE, null);
  while (objLink = objRL.iterateNext()) {
    arrLinks.push(objLink);
  }
  for (iIndex in arrLinks) {
    objLink = arrLinks[iIndex];
    objLink.addEventListener('click', doQuickReplyForm, true);
    if (window.opera) { objLink.onclick = doQuickReplyForm; }
    objLink.className += ' x_qrattached';
  }
  // Replace email input with "sage" checkbox
  var objEmail = document.evaluate(strHost == 'iichan.ru' ? "//input[@name='nya2']" : "//input[@name='nabiki']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (objEmail) {
    var objEmailCell = objEmail.parentNode;
    removeAllChilds(objEmailCell); objEmail = 0;
    var objSageLabel = createElementEx('label', {'title': 'DO NOT WANT'});
    objSageLabel.appendChild(createElementEx('input', {'name': strHost == 'iichan.ru' ? 'nya2' : 'nabiki', 'value': 'sage', 'type': 'checkbox', 'style': 'margin-left: 0; padding-left: 0;'}));
    objSageLabel.appendChild(document.createTextNode(' sage'));
    objEmailCell.appendChild(objSageLabel);
  }

  // Hiding threads
  if (typeof GM_getValue == 'function') { // Greasemonkey only
    try { loadHiddenThreads(); } catch(e) { ; }
    var objThreads = document.evaluate("//div[starts-with(@id, 'thread-')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < objThreads.snapshotLength; i++) {
      try {
        var objThread = objThreads.snapshotItem(i);
        var bIsHidden = objThread.id.toString().match(/thread-\d+-hidden/i);
        var objHideLink = createElementEx('a', {'href': '#', 'class': 'show-hide-thread'});
        objHideLink.appendChild(document.createTextNode((bIsHidden ? '\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c' : '\u0421\u043a\u0440\u044b\u0442\u044c') + ' \u0442\u0440\u0435\u0434'));
        objHideLink.addEventListener('click', bIsHidden ? unhideThreadClick : hideThreadClick, true);
        objThread.insertBefore(objHideLink, objThread.firstChild);
      } catch(e) { ; }
    }
  }
};
  if (window.opera) {
    document.addEventListener('load', f_main, false);
  } else {
    f_main();
  }
}
