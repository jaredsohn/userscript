/**
 * Lib.ru popup
 * Adds a useful popup box allowing you to choose formatting of openning text 
 * without downloading it first 
 *
 *
 * version 0.1
 * 10/24/2005 20:39:28
 */ 

// ==UserScript==
// @name      Lib.ru links
// @namespace   http://darklaw.ru
// @description   You can choose formatting of openning text before downloading it
// @include     http://*.lib.ru/*
// @include     http://lib.ru/*
// ==/UserScript==

  // Read the name 0-)
  const optionPopupDelay = GM_getValue('options.PopupDelay', 600);

  // Opacity for popup menu
  const optionOpacity = GM_getValue('options.PopupOpacity', '0.95');

  // Kinda slow, need to think about. Should  I add it only after popup is shown?
  document.addEventListener('mousemove', checkPopup, false);

  //Fcuking ugly, but XPath 1.0 does not have ends-with()
  var nodes = xpath("//a[substring-after(@href, '.tx')='t']");
  for (var n = 0; n < nodes.length; ++n) {
         nodes[n].addEventListener('mouseover', mouseover, false);
  }

  function mouseover(ev) {

    var pos = findPos(this);

    var bookName = this.innerHTML;
    var baseURL = this.href;

    // We show popup after delay
    timer = window.setTimeout(function(){
        var oldDiv = document.getElementById('libru_popup');
        if (oldDiv){
           oldDiv.parentNode.removeChild(oldDiv);
        }
        
        
        var div = document.createElement('div');
        div.id = 'libru_popup';
        div.style.cssText = 'border: 1px black solid; padding: 10px; background: Cornsilk; color: Black; position: absolute; z-index: 2001; left: '+(pos[0]-11)+'px; top: '+(pos[1]-11)+'px; text-align: left;-moz-opacity:'+optionOpacity+';';

        var firstPart = '&raquo; <a href="'+ baseURL;
        // We need this for speed and for avoiding auto-closing tags
        var popupText = '';
        popupText += '<a href="'+ baseURL + '"><b>' + bookName + '</b></a><br/>';
        popupText += firstPart + '">Lib.ru html</a><br/>';
        popupText += firstPart + '_Contents">ÃÂ¡ÃÂ¾ÃÂ´ÃÂµÃÂÃÂ¶ÃÂ°ÃÂ½ÃÂ¸ÃÂµ</a><br/>';
        popupText += firstPart + '_with-big-pictures.html">Fine HTML</a><br/>';
        popupText += firstPart + '_with-big-pictures.html">Print version</a><br/>';
        popupText += firstPart + '_Ascii.txt">txt(Word,ÃÂÃÂÃÂ)</a><br/>';
        div.innerHTML = popupText;
        document.body.appendChild(div);
        clearTimer();
   }, optionPopupDelay);
  }

  function checkPopup(ev) {
    // Think about caching this div - should improve speed
    var div = document.getElementById('libru_popup');
    if (div) {
      pos = findPos(div);
      var thisWidth = pos[0] + div.offsetWidth;
      var thisHeight = pos[1] + div.offsetHeight;
      if ( ((ev.pageX <= pos[0] + 1) || (ev.pageX >= thisWidth - 1)) || ((ev.pageY <= pos[1] + 1) || (ev.pageY >= thisHeight - 1)) ) {
          clearTimer();
          div.parentNode.removeChild(div);
      }
    }
    return true;
  }

  function clearTimer()
  {
    if(timer != null)
    {
        clearTimeout(timer);
        timer = null;
    }
  }

  function xpath(expr, doc) {
    if (!doc) {
      doc = document;
    }
    var nodes = document.evaluate(expr, doc, null,
                             XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                             null);
    var ret = [];
    for (var n = 0; n < nodes.snapshotLength; ++n) {
      ret.push(nodes.snapshotItem(n));
    }
    return ret;
  }


  function findPos(obj) {
    var x = 0, y = 0;
    while (obj.offsetParent) {
      x += obj.offsetLeft;
      y += obj.offsetTop;
      obj = obj.offsetParent;
    }
    return [x,y];
  }

