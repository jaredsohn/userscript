// ==UserScript==
// @name        NinjaWebCoder
// @namespace   NinjaWebCoder
// @description Pres Ctrl-E to copy code from stackoverflow like a ninja.
// @include     *
// @version     1.2.5
// @grant       GM_setClipboard
// ==/UserScript==

// NinjaWebCoder.js --- manipulate code from internet like a ninja

// Copyright (C) 2014 Chen Bin <chenbin.sh@gmail.com>

// Author: Chen Bin <chenbin.sh@gmail.com>

// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 3
// of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

/*global KeyEvent, XPathResult, GM_setClipboard, clearTimeout, AccessifyHTML5, log, nwcoder_onGeneralKeypress, nwcoder_onKeyPressFilterHint */
/*jslint browser:true, devel:true, indent:2, plusplus:true, continue:true, white:true, newcap:true, regexp:true */

(function () {
  "use strict";
  var nwcoder_triggerKey = 'C-e', //"C" means Ctrl, "M" means Alt.
      // any text in <pre> or text rendered by <div> with class name "syntaxhighlighter"
      nwcoder_xpathSelector = "//pre|//div[contains(concat(' ', @class, ' '), ' syntaxhighlighter ')]|//div[contains(concat(' ', @class, ' '), ' codecolorer ')]|//dl[contains(concat(' ', @class, ' '), ' codebox ')]|//div[contains(concat(' ', @class, ' '), ' fragment ')]",
      nwcoder_selectHintMode = false,
      nwcoder_hintElements = {}, // format, { "hotkey": <span> }
      nwcoder_inputKey = '', // what user typed to select hint
      nwcoder_hintColorForm = 'yellow',
      nwcoder_hintColorCandidates = 'blue',
      nwcoder_hintColorFocused = 'green',
      nwcoder_lastMatchHint; // the matched hint, the one stand last

  function nwcoder_hintKeys() {
    // in keysnail:
    // 'g' is goto top line
    // 'i' is the insert mode
    // 'h', 'j', 'k', 'l' for vim keybinding
    return 'asdzxcv';
  }

  function nwcoder_preventEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function nwcoder_removeHints() {

    var hintContainer = document.getElementById('nwcoder_hintContainer');

    if (document.body && hintContainer) {
      try {
        document.body.removeChild(hintContainer);
      } catch (x) {
        if(console){
          console.log(x);
        }
      }
    }
  }

  function nwcoder_destruction() {

    nwcoder_inputKey = '';
    nwcoder_selectHintMode = false;
    nwcoder_removeHints();

    // //@see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.removeEventListener
    // document.removeEventListener('keydown', nwcoder_preventEvent, true);
    // document.removeEventListener('keyup', nwcoder_preventEvent, true);
  }

  function nwcoder_findCodeSnippets(xpathSelector) {
    var arr = [],
        xpathResult = document.evaluate(xpathSelector, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null),
        i,
        len;
    for (i = 0, len = xpathResult.snapshotLength; i < len; i++) {
      arr.push(xpathResult.snapshotItem(i));
    }
    return arr;
  }

  function nwcoder_getClipText(lines) {
    var txt='';
    for (var i=0, len=lines.length; i<len; i++) {
      txt+=lines[i].textContent+'\n';
    }
    return txt;
  }

  function nwcoder_doIt(elem) {
    var clipText,
        lines=elem.getElementsByClassName('line');
    if(lines.length>0){
      // syntaxhighlighter or gist.github.com screw up the code format, so we need hack it
      clipText=nwcoder_getClipText(lines);
    } else if (elem.className.indexOf('ng-scope')!==-1) {
      // angular code snippet
      clipText=nwcoder_getClipText(elem.getElementsByTagName('li'));
    } else if (elem.className.indexOf('codebox')!==-1) {
       // Use a copy because stuff gets changed
      var node = elem.getElementsByTagName('code')[0].cloneNode(true);
      // Line breaks aren't picked up by textContent
      node.innerHTML = node.innerHTML.replace(/<br>/g, '\n');
      clipText=node.textContent;
    } else {
      clipText=elem.textContent;
    }

    // replace non-break space character whose character code is 160
    clipText=clipText.replace(new RegExp(String.fromCharCode(160),"g")," ");

    // more general or smarter algorithm is too slow
    if(document.URL.indexOf('localhost')!==-1||document.URL.indexOf('127.0.0.1')!==-1){
      // OK, it's local test case
      console.log("clipText=",clipText);
    } else {
      // it's GreaseMonkey user script
      GM_setClipboard(clipText);
    }
    nwcoder_destruction();
    return;
  }


  function nwcoder_getAliveLastMatchHint() {
    try {
      if (nwcoder_lastMatchHint && nwcoder_lastMatchHint.style) {
        return nwcoder_lastMatchHint;
      }
    } catch (x) {
      nwcoder_lastMatchHint = null;
    }
    return null;
  }

  function nwcoder_getStyle(elem) {
    var style, win = window.content;
    if (win.getComputedStyle) {
      //getComputedStyle is supported in ie9
      style = win.getComputedStyle(elem, null);
    } else {
      style = elem.currentStyle;
    }
    return style;
  }

  function nwcoder_getBodyOffsets() {
    // http://d.hatena.ne.jp/edvakf/20100830/1283199419
    var rect,
        style = window.content.getComputedStyle(document.body,null),
        x,
        y;

    if (style && style.position === 'relative') {
      rect = document.body.getBoundingClientRect();
      x = -rect.left - parseFloat(style.borderLeftWidth);
      y = -rect.top - parseFloat(style.borderTopWidth);
    } else {
      rect = document.documentElement.getBoundingClientRect();
      x = -rect.left;
      y = -rect.top;
    }
    return [x, y];
  }

  function nwcoder_createHintsSeed() {
    var hintStyle = {"position": 'absolute',
                     "z-index": '2147483647',
                     "color": '#000',
                     "font-family": 'monospace',
                     "font-size": '10pt',
                     "font-weight": 'bold',
                     "line-height": '10pt',
                     "padding": '2px',
                     "margin": '0px',
                     "text-transform": 'uppercase'
                    },
        sp = document.createElement('span'),
        st = sp.style,
        k;

    //copy the style
    for (k in hintStyle) {
      if (hintStyle.hasOwnProperty(k)) {
        st[k] = hintStyle[k];
      }
    }
    st.backgroundcolor = 'red';
    return sp;
  }

  // Patches from victor.vde@gmail.com
  function nwcoder_createTextHints(amount) {
    /* Explanation of the algorithm:
     * Case study 1:
     * suppose hintKeys is "0123", and need find the next("23")
     * step 1: prefix(p) of "23" is "2", remaining part is "3"
     * step 2: there is no "4" in hintKeys, so we use "0"
     * step 3: now next(23) is "20", wrong! should be next("2")+3
     * step 4: so it's 33
     *
     * Case study 2:
     * what's next("3")? we already have 4 candidates: '0', '1', '2', '3'
     * step 1: '3' => '0' ?
     * step 2: conflict, => '00', so 5 candidates: '0', '1', '2', '3', '00'
     *         this is not optimized, when you press '0', either '0' should be
     *         immediately selected or wait '00'?
     * step 3: delete '0' from candidates, so 4 candidate: '1', '2', '3', '00'
     * step 4: next('00') is 01, so 5 canidates '1', '2', '3', '00', '01'
     *
     * p means prefix; np means next prefix; n means next
     */
    var reverseHints = {},
        numHints = 0,
        hintKeys = nwcoder_hintKeys(),
        l,
        p,
        n,
        np,
        hint,
        hints,
        k;

    function next(hint) {
      l = hint.length;
      if (l === 0) {
        return hintKeys.charAt(0);
      }
      p = hint.substr(0, l - 1);
      // if hint is "ha", l is 2, hint.charAt(2-1) is 'a'
      // so the n := "asdfghijkl".indexOf('a')+1, n is 1
      n = hintKeys.indexOf(hint.charAt(l - 1)) + 1;
      if (n === hintKeys.length) {
        np = next(p);

        //unique only
        delete reverseHints[np];
        numHints--;

        return np + hintKeys.charAt(0);

      }
      return p + hintKeys.charAt(n);
    }

    hint = '';
    while (numHints < amount) {
      hint = next(hint);
      reverseHints[hint] = true;
      numHints++;
    }

    hints = [];
    for (k in reverseHints) {
      if (reverseHints.hasOwnProperty(k)) {
        hints.push(k);
      }
    }

    // Note: kind of relies on insertion order
    return hints;
  }

  function nwcoder_drawHints(arr) {
    // draw hints
    var docFragment = document.createDocumentFragment(),
        hintSpanSeed = nwcoder_createHintsSeed(),
        hintContainer = document.createElement('div'),
        hintSpans = [],
        span,
        style,
        elem,
        offset,
        elemRect,
        hintCount = 0,
        i,
        len,
        textHints;

    //prepare hint container
    hintContainer.style.position = 'static';
    hintContainer.id = 'nwcoder_hintContainer';
    docFragment.appendChild(hintContainer);

    for (i = 0, len = arr.length; i < len; i++) {
      elem = arr[i];
      elemRect = elem.getClientRects()[0];
      if (!elemRect) {
        // display:none will goto here on firefox 20+
        continue;
      }
      //make sure the elem visible
      // var r = elem.getBoundingClientRect();
      // if (!r || r.top > window.content.innerHeight ||
      //     r.bottom < 0 || r.left > window.content.innerWidth ||
      //     r.right < 0)
      // {


      //   continue;
      // }

      style = nwcoder_getStyle(elem);
      if (!style || style.visibility !== "visible" || style.display === "none") {
        continue;
      }


      //cloneNode is supported by all the browsers
      span = hintSpanSeed.cloneNode(false);

      offset = nwcoder_getBodyOffsets();

      span.style.left = (elemRect.left > 0 ? elemRect.left + offset[0] : +offset[0]) + 'px';
      span.style.top = (elemRect.top > 0 ? elemRect.top + offset[1] : +offset[1]) + 'px';
      span.style.backgroundColor = nwcoder_hintColorForm;

      //link to original element
      span.element = elem;

      hintContainer.appendChild(span);
      hintSpans.push(span);
      hintCount++;
    }


    // add text hints
    textHints = nwcoder_createTextHints(hintCount);
    for (i = 0; i < hintCount; i++) {
      span = hintSpans[i];
      span.appendChild(span.ownerDocument.createTextNode(textHints[i]));
      nwcoder_hintElements[textHints[i]] = span;
    }

    // actually insert items into body from cache
    document.body.appendChild(docFragment);
    return hintCount;
  }

  function nwcoder_keyEventToString(aEvent) {
    var keyStr,
        isDisplayableKey = function (aEvent) {
          return aEvent.charCode >= 0x20 && aEvent.charCode <= 0x7e;
        },
        isControlKey = function (aEvent) {
          return aEvent.ctrlKey || aEvent.commandKey;
        },
        isMetaKey = function (aEvent) {
          return aEvent.altKey || aEvent.metaKey;
        };

    if (isDisplayableKey(aEvent)) {
      // ASCII displayable characters (0x20 : SPC)
      keyStr = String.fromCharCode(aEvent.charCode);
      if (aEvent.charCode === 0x20) {
        keyStr = "SPC";
      }
    } else if (aEvent.keyCode >= KeyEvent.DOM_VK_F1 &&
               aEvent.keyCode <= KeyEvent.DOM_VK_F24) {
      // function keys
      keyStr = "<f" + (aEvent.keyCode - KeyEvent.DOM_VK_F1 + 1) + ">";
    } else {
      // special charactors
      switch (aEvent.keyCode) {
      case KeyEvent.DOM_VK_ESCAPE:
        keyStr = "ESC";
        break;
      case KeyEvent.DOM_VK_RETURN:
      case KeyEvent.DOM_VK_ENTER:
        keyStr = "RET";
        break;
      case KeyEvent.DOM_VK_RIGHT:
        keyStr = "<right>";
        break;
      case KeyEvent.DOM_VK_LEFT:
        keyStr = "<left>";
        break;
      case KeyEvent.DOM_VK_UP:
        keyStr = "<up>";
        break;
      case KeyEvent.DOM_VK_DOWN:
        keyStr = "<down>";
        break;
      case KeyEvent.DOM_VK_PAGE_UP:
        keyStr = "<prior>";
        break;
      case KeyEvent.DOM_VK_PAGE_DOWN:
        keyStr = "<next>";
        break;
      case KeyEvent.DOM_VK_END:
        keyStr = "<end>";
        break;
      case KeyEvent.DOM_VK_HOME:
        keyStr = "<home>";
        break;
      case KeyEvent.DOM_VK_TAB:
        keyStr = "<tab>";
        break;
      case KeyEvent.DOM_VK_BACK_SPACE:
        keyStr = "<backspace>";
        break;
      case KeyEvent.DOM_VK_PRINTSCREEN:
        keyStr = "<print>";
        break;
      case KeyEvent.DOM_VK_INSERT:
        keyStr = "<insert>";
        break;
      case KeyEvent.DOM_VK_PAUSE:
        keyStr = "<pause>";
        break;
      case KeyEvent.DOM_VK_DELETE:
        keyStr = "<delete>";
        break;
      case 0xE2:
        /**
         * windows specific bug
         * When Ctrl + _ is pressed, the char code becomes 0, not the 95
         * and the key code becomes 242 (0xE2)
         */
        if (aEvent.ctrlKey) {
          keyStr = "_";
        }
        break;
      default:
        break;
      }
    }

    if (!keyStr) {
      return null;
    }

    // append modifier
    if (isMetaKey(aEvent)) {
      keyStr = "M-" + keyStr;
    }
    if (isControlKey(aEvent)) {
      keyStr = "C-" + keyStr;
    }
    if (aEvent.shiftKey && (!isDisplayableKey(aEvent) || aEvent.charCode === 0x20)) {
      keyStr = "S-" + keyStr;
    }

    return keyStr;
  }

  function nwcoder_resetHintsColor() {
    var span,
        k;
    for (k in nwcoder_hintElements) {
      if (nwcoder_hintElements.hasOwnProperty(k)) {
        span = nwcoder_hintElements[k];
        span.style.backgroundColor = nwcoder_hintColorForm;
        span.style.display = "inline";
      }
    }
  }

  function nwcoder_updateHeaderMatchHints() {
    var hideUnmatchedHint = true,
        foundCount = 0,
        hintStr,
        hintElem;

    for (hintStr in nwcoder_hintElements) {
      if (nwcoder_hintElements.hasOwnProperty(hintStr)) {
        hintElem = nwcoder_hintElements[hintStr];
        if (hintStr.indexOf(nwcoder_inputKey) === 0) {
          if (hintStr !== nwcoder_inputKey) {
            hintElem.style.backgroundColor = nwcoder_hintColorCandidates;
          }
          foundCount++;
        } else {
          if (hideUnmatchedHint) {
            hintElem.style.display = "none";
          }
          hintElem.style.backgroundColor = nwcoder_hintColorForm;
        }
      }
    }
    return foundCount;
  }

  function nwcoder_onKeyPressFilterHint(event,keyStr) {

    var keyMap = {'<delete>': 'Delete',
                  '<backspace>': 'Backspace',
                  'RET': 'Enter'
                 },
        keys = nwcoder_hintKeys().split(''),
        i,
        len,
        role,
        foundCount;

    for (i = 0, len = keys.length; i < len; i++) {
      keyMap[keys[i]] = keys[i];
    }

    if (!keyMap.hasOwnProperty(keyStr)) {
      nwcoder_destruction();
      return;
    }

    role = keyMap[keyStr];
    if (role === 'Delete') {
      nwcoder_destruction();
      return;
    }

    if (role === 'Backspace') {
      //delete
      if (!nwcoder_inputKey) {
        nwcoder_destruction();
        return;
      }

      nwcoder_inputKey = nwcoder_inputKey.slice(0, nwcoder_inputKey.length - 1);

      // reset but not exit
      nwcoder_resetHintsColor();

      if (nwcoder_inputKey.length !== 0) {
        //show the matched hints
        nwcoder_updateHeaderMatchHints();
      }
    }

    if (role === 'Enter') {
      if (nwcoder_getAliveLastMatchHint()) {
        //do the real stuff
        nwcoder_doIt(nwcoder_lastMatchHint.element);
      } else {
        nwcoder_destruction();
      }
      return;
    }

    nwcoder_inputKey += role;

    nwcoder_preventEvent(event);

    // look up <pre> by the nwcoder_inputKey
    if (nwcoder_hintElements.hasOwnProperty(nwcoder_inputKey)) {
      //lastMatchHint is the item which focus on
      //for one key there is only one match
      nwcoder_lastMatchHint = nwcoder_hintElements[nwcoder_inputKey];
      nwcoder_lastMatchHint.style.backgroundColor = nwcoder_hintColorFocused;
    } else {
      nwcoder_lastMatchHint = null;
    }
    foundCount = nwcoder_updateHeaderMatchHints();
    if (foundCount === 1 && nwcoder_getAliveLastMatchHint()) {
      nwcoder_lastMatchHint.style.display = 'none';
      nwcoder_doIt(nwcoder_lastMatchHint.element);
    }
    return;
  }

  function nwcoder_start() {

    nwcoder_selectHintMode = true;

    //find items from the root document
    var hintCount = nwcoder_drawHints(nwcoder_findCodeSnippets(nwcoder_xpathSelector));

    // if (hintCount > 1) {
    //   //don't know why, but below code will hang firefox v26.0
    //   document.addEventListener('keydown', nwcoder_preventEvent, true);
    //   document.addEventListener('keyup', nwcoder_preventEvent, true);
    //   return;
    // }

    // nwcoder_lastMatchHint could be null if there is only one code snippet
    if (hintCount === 1 && nwcoder_lastMatchHint) {
      nwcoder_doIt(nwcoder_lastMatchHint.element);
      return;
    }

    if (hintCount <= 0) {
      //recover focus
      // remove hints, recover key press handlers
      nwcoder_destruction();
      return;
    }
    return;
  }

  function nwcoder_onGeneralKeypress(evt) {
    var keyStr = nwcoder_keyEventToString(evt);

    if (keyStr === nwcoder_triggerKey && nwcoder_selectHintMode === false) {
      nwcoder_start();
      nwcoder_preventEvent(evt);
      return false;
    }

    if (keyStr === 'ESC') {
      nwcoder_destruction();
      return false;
    }

    if (nwcoder_selectHintMode === true) {
      nwcoder_onKeyPressFilterHint(evt,keyStr);
    }

    return true;
  }

  //init
  document.addEventListener('keypress', nwcoder_onGeneralKeypress, true);

}());

// Local Variables:
// coding: utf-8
// indent-tabs-mode: nil
// mode: js2-mode
// tab-width: 2
// js2-basic-offset: 2
// End:
// vim: set fs=javascript fenc=utf-8 et ts=2 sts=2 sw=2
