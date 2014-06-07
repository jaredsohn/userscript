// ==UserScript==
// @name           Sanskrit Tools
// @namespace      sanskritTools
// @description    Look up selected text in spokensanskrit.de dictionary
// @include        *
// @version        0.5
// ==/UserScript==

// Generic GM-/DOM-related functions. Don't change
// unless you have to.
(function() {
  function init() {
    if (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0) {
      GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
      };
      GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
          case 'b':
            return value == 'true';
          case 'n':
            return Number(value);
          default:
            return value;
        }
      }
    }
  }

  function getEnabled(key) {
    v = GM_getValue(key, true);
    return v;
  }

  function setEnabled(key, v) {
    GM_setValue(key, v);
  }

  function getSelectedText(trim) {
    var text =
      (window.getSelection) ? window.getSelection().toString() :
      (document.getSelection) ? document.getSelection().toString() :
      (document.selection) ? document.selection.createRange().text : null;
    if (trim && text != null)
      text = text.trim();
    return text;
  }

  function style(el, css) {
    for (var k in css)
      el.style[k] = css[k];
    return el;
  }

  //-----------------------------------------------------------------------
  // Begin Sanskrit Tools.

  var body;
  var vframe;
  var vdiv;
  var vwidth = 250;
  var sw = screen.width;
  var sh = screen.height;
  var enableButton;
  var numClicks = 0;
  var oldSelectedText;
  var dictEnabled = 1;

  const DICT_ENABLED_KEY = 'ss.dict.enabled';

  // Handle dictionary lookup.
  // Return true if we showed the sidebar,
  // false otherwise.
  function dictionaryLookup() {
    var selectedText = getSelectedText(true);
    if (selectedText != null && selectedText.length > 0) {
      if (dictEnabled) {
        if (selectedText == oldSelectedText ||
          selectedText.indexOf(' ') != -1)
          return;
        showDictBar(selectedText);
      }
      oldSelectedText = selectedText;
    } else {
      if (oldSelectedText != null) {
        oldSelectedText = null;
      }
      hideDictBar();
    }
  }

  function showDictBar(text) {
    if (vdiv) {
      hideDictBar();
    }
    vdiv = window.open('http://m.spokensanskrit.de/index.php?tinput=' +
      text + '&trans=Translate', '',
      'left=' + (screen.width-vwidth) +
      ', width=' + vwidth +
      ', top=' + 0 +
      ', height=' + screen.height +
      ', location=0menubar=0,status=0,scrollbars=1,toolbar=0');
  }
  
  function hideDictBar() {
    if (vdiv) {
      vdiv.close();
      vdiv = null;
    }
  }

  function handleClick(e) {
    var node = (e.target || e.srcElement);
    if (e.button != 0)
      return;
    if (node.nodeName == 'A')
      return;
    var n = node;
    while (n) {
      if (n == enableButton)
        return;
      if (n.getAttribute) {
        var ce = n.getAttribute('contenteditable');
        if (ce) 
          return;
      }
      n = n.parentNode;
    }
    if (++numClicks == 1) {
      window.setTimeout(function() {
        dictionaryLookup();
        numClicks = 0;
      }, 300);
    }
  }

  function createButton() {
    if (enableButton = document.getElementById('enable_b'))
      return;
    enableButton = document.createElement('input');
    enableButton.type = 'button';
    enableButton.id = 'enable_b';
    enableButton.value = "\u0938";
    style(enableButton, {
      verticalAlign: 'text-bottom',
      height: '20px',
      width: '20px',
      position: 'fixed',
      backgroundColor: 'white',
      fontSize: '15px',
      fontWeight: 'bold',
      padding : '0px 0px 30px 0px',
      margin : '0px 0px 0px 0px',
      border: '0px 0px 0px 0px',
      visibility: 'visible',
      zIndex : '9999',
      right : '0px',
      bottom: '0px',
    });
    enableButton.addEventListener('click', function(e) {
      dictEnabled = !dictEnabled;
      setEnabled(DICT_ENABLED_KEY, dictEnabled);
      setButtonColor();
    }, false);
    body.appendChild(enableButton);
    setButtonColor();
  }

  function setButtonColor() {
    enableButton.style.color = dictEnabled ? 'green' : 'red';
  }

  if (document.URL.indexOf('spokensanskrit.de') == -1) {
    init();
    body = document.getElementsByTagName('body')[0];
    dictEnabled = getEnabled(DICT_ENABLED_KEY);
    document.addEventListener('mouseup', handleClick, false);
    if (window.top == window.self)
      createButton();
  }
})();
