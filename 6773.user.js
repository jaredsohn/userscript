// ==UserScript==
// @name Hebrew ToolTip Translation
// @namespace eyal0
// @description Translate words on a webpage from Hebrew to English and vice-versa in little tooltips
// @include *
// ==/UserScript==

window.addEventListener("load",
  (function() {
    var HTTtooltipDelay; //milliseconds
    var HTTtimeoutID;
    var HTTparent;
    var HTToffset;
    var HTTcurX;
    var HTTcurY;
    var HTTtooltip;
    var HTTdefinitions = ""; //translation output
    var align_left;
    var align_top;
    var keep_on_screen;
    var trigger_hover;
    var trigger_click;
    var trigger_highlight;
    var trigger_keyboard;
    var HTTtooltipCharacter;
    
    function appendChild(child,parent){return(parent.insertBefore(child,parent.lastChild.nextSibling));}
    function $(id){return document.getElementById(id);}
    function onClick(id,func){$(id).addEventListener('click',func,false);}
    function onChange(id,func){$(id).addEventListener('change',func,false);}

    function showConfig() {
      showPopup(
        '<div id="HTTConfig" class="HTTPopup"><div style="text-align:center;"><span class="HTTImportant">Configure <a href="http://userscripts.org/scripts/show/6773">Hebrew Tooltip Translation</a></span></div><br />'+
        'All changes are saved immediately, but some changes might not take effect in tabs that are already open<br /><br />'+
        '<span class="HTTHeader">Tooltip Trigger</span><br />'+
        ' &nbsp; &nbsp; <input type="checkbox" id="HTTTriggerHover"/><label for="HTTTriggerHover">Show Tooltip after </label><input type="text" id="HTTTriggerHoverDelay"/><label for="HTTTriggerHover"> milliseconds</label><br />'+
        ' &nbsp; &nbsp; <input type="checkbox" id="HTTTriggerClick"/><label for="HTTTriggerClick">Show Tooltip after clicking on a word</label><br />'+
        ' &nbsp; &nbsp; <input type="checkbox" id="HTTTriggerHighlight"/><label for="HTTTriggerHighlight">Show Tooltip after selecting a word or phrase</label><br />'+
        ' &nbsp; &nbsp; <input type="checkbox" id="HTTTriggerKeyboard"/><label for="HTTTriggerKeyboard">Show Tooltip after pressing </label><input type="text" maxlength=1 id="HTTTriggerKeyboardCharacter"/><label for="HTTTriggerKeyboard"> on the keyboard</label><br />'+
        '<span class="HTTHeader">Tooltip Location</span><br />'+
        ' &nbsp; &nbsp; <input type="radio" name="HTTLocationX" id="HTTLocationX1" value="1" /><label for="HTTLocationX1">To the right</label>'+
                     '  <input type="radio" name="HTTLocationX" id="HTTLocationX0" value="0" /><label for="HTTLocationX0">To the left</label><br />'+
        ' &nbsp; &nbsp; <input type="radio" name="HTTLocationY" id="HTTLocationY1" value="1" /><label for="HTTLocationY1">Below</label>' +
                     '  <input type="radio" name="HTTLocationY" id="HTTLocationY0" value="0" /><label for="HTTLocationY0">Above</label><br />'+
        ' &nbsp; &nbsp; <input type="checkbox" id="HTTKeepOnScreen"/><label for="HTTKeepOnScreen">Keep Tooltips on screen</label><br />'+
        '<hr /><div style="text-align:right;"><input type="button" id="HTTCloseConfig" value="Close" /></div>'+
        '</div>', true
      );
      onClick('HTTCloseConfig', function() { hidePopup(); });
      if($('HTTLocationX' + align_left))
        $('HTTLocationX' + align_left).checked='checked';
      if($('HTTLocationY' + align_top))
        $('HTTLocationY' + align_top).checked='checked';
      $('HTTKeepOnScreen').checked=keep_on_screen;
      $('HTTTriggerHover').checked=trigger_hover;
      $('HTTTriggerHoverDelay').value=HTTtooltipDelay;
      $('HTTTriggerClick').checked=trigger_click;
      $('HTTTriggerHighlight').checked=trigger_highlight;
      $('HTTTriggerKeyboard').checked=trigger_keyboard;
      $('HTTTriggerKeyboardCharacter').value=HTTtooltipCharacter;
      for(var i = 0; i < 2; i++) {
        onClick('HTTLocationX' + i, (function(i) {return(function(e) { align_left = i; GM_setValue("align_left", i); e.target.blur(); })})(i));
        onClick('HTTLocationY' + i, (function(i) {return(function(e) { align_top = i;  GM_setValue("align_top", i);  e.target.blur(); })})(i));
      }
      onClick('HTTKeepOnScreen', function(e) { keep_on_screen = e.target.checked; GM_setValue("keep_on_screen", keep_on_screen); e.target.blur(); });
      onClick('HTTTriggerHover', function(e) {
        trigger_hover = e.target.checked;
        GM_setValue("trigger_hover", trigger_hover);
        if(trigger_hover) {
          window.addEventListener("mousemove", HTTmousemove, false);
          window.addEventListener("DOMMouseScroll", HTTmousescroll, false);
          window.addEventListener("click", HTTclick, false);
        } else {
          if(!trigger_hover && !trigger_keyboard)
            window.removeEventListener("mousemove", HTTmousemove, false);
          window.removeEventListener("DOMMouseScroll", HTTmousescroll, false);
          if(!trigger_hover && !trigger_click && !trigger_highlight && !trigger_keyboard)
            window.removeEventListener("click", HTTclick, false);
          HTThide(true); //true to force it
        }
        e.target.blur(); 
      });
      onChange('HTTTriggerHoverDelay', function(e) {
        HTTtooltipDelay = e.target.value;
        GM_setValue("HTTtooltipDelay", HTTtooltipDelay);
        return(1);
      });
      onClick('HTTTriggerClick', function(e) {
        trigger_click = e.target.checked;
        GM_setValue("trigger_click", trigger_click);
        if(trigger_click) {
          window.addEventListener("click", HTTclick, false);
        } else {
          if(!trigger_hover && !trigger_click && !trigger_highlight && !trigger_keyboard)
            window.removeEventListener("click", HTTclick, false);
          HTThide(true); //true to force it
        }
        e.target.blur(); 
      });
      onClick('HTTTriggerHighlight', function(e) {
        trigger_highlight = e.target.checked;
        GM_setValue("trigger_highlight", trigger_highlight);
        if(trigger_highlight) {
          window.addEventListener("mouseup", HTTmouseup, false);
          window.addEventListener("click", HTTclick, false);
        } else {
          window.removeEventListener("mouseup", HTTmouseup, false);
          if(!trigger_hover && !trigger_click && !trigger_highlight && !trigger_keyboard)
            window.removeEventListener("click", HTTclick, false);
          HTThide(true); //true to force it
        }
        e.target.blur(); 
      });
      onClick('HTTTriggerKeyboard', function(e) {
        trigger_keyboard = e.target.checked;
        GM_setValue("trigger_keyboard", trigger_keyboard);
        if(trigger_keyboard) {
          window.addEventListener("keypress", HTTkeypress, false);
          window.addEventListener("click", HTTclick, false);
          window.addEventListener("mousemove", HTTmousemove, false);
        } else {
          window.removeEventListener("keypress", HTTkeypress, false);
          if(!trigger_hover && !trigger_click && !trigger_highlight && !trigger_keyboard)
            window.removeEventListener("click", HTTclick, false);
          if(!trigger_hover && !trigger_keyboard)
            window.removeEventListener("mousemove", HTTmousemove, false);
          HTThide(true); //true to force it
        }
        e.target.blur(); 
      });
      onChange('HTTTriggerKeyboardCharacter', function(e) {
        HTTtooltipCharacter = e.target.value;
        GM_setValue("HTTtooltipCharacter", HTTtooltipCharacter);
        return(1);
      });
    };

    function showPopup(content,onTop) {
      $('HTTPopupContainer').innerHTML = content;
      if (onTop) {
        $('HTTShadow').style.zIndex = '1000';
        $('HTTPopupContainer').style.zIndex = '1001';
      } else {
        $('HTTShadow').style.zIndex = '1';
        $('HTTPopupContainer').style.zIndex = '2';
      }
      $('HTTShadow').style.display = 'block';
      $('HTTPopupContainer').style.display = 'block';
      window.scroll(0,0);
    }

  // Hide popups created with showPopup()
    function hidePopup() {
      if ($('HTTPopupContainer')) {
        $('HTTPopupContainer').style.display = 'none';
        $('HTTShadow').style.display = 'none';
      }
    }

    function HTTshowToolTip() {
      if(HTTdefinitions.length) {
        var minX, minY, maxX, maxY, ttX, ttY;

        HTTtooltip.style.width = "auto";
        HTTtooltip.style.height = "auto";
        HTTtooltip.innerHTML = HTTdefinitions;
        HTTtooltip.firstChild.style.marginTop = "0";
        HTTtooltip.firstChild.style.marginRight = "0";
        HTTtooltip.firstChild.style.marginBottom = "0";
        HTTtooltip.firstChild.style.marginLeft = "0";
        if(align_left) {
          ttX = HTTcurX + 10;
        } else {
          ttX = HTTcurX - HTTtooltip.scrollWidth - 10;
        }
	      if(align_top) {
          ttY = HTTcurY + 10;
        } else {
          ttY = HTTcurY - HTTtooltip.scrollHeight - 10;
        }
        minX = window.scrollX;
        minY = window.scrollY;
        maxX = minX + window.innerWidth - HTTtooltip.scrollWidth;
        maxY = minY + window.innerHeight - HTTtooltip.scrollHeight;
        //GM_log(document.documentElement.clientWidth + "," + HTTtooltip.scrollWidth + "," + minX + "," + minY + "," + maxX + "," + maxY);
        if(keep_on_screen) {
          if(ttX < minX)
            ttX = minX;
          else if(ttX > maxX)
            ttX = maxX;
          if(ttY < minY)
            ttY = minY;
          else if(ttY > maxY)
            ttY = maxY;
        }
        HTTtooltip.style.left = ttX + "px";
        HTTtooltip.style.top = ttY + "px";

        HTTtooltip.style.visibility="visible";
      }
    }

    function HTTparseResponse(responseDetails) {
      var startText;
      var endPos;
      var rtl;
      var responseText = responseDetails.responseText;
      if(responseText == null) return;
      startText = responseText.indexOf("word_ph");
      if(startText != -1) {
        //we've got something
        if(responseText.indexOf('word_ph translation_en') != -1)
          rtl = false; //search of an English word
        else
          rtl = true; //search of a Hebrew word
        HTTdefinitions = "";
        HTTdefinitions += "<table class='HTT " + (rtl?"HTTHebrew":"HTTEnglish") + "' dir=\"\"><tbody class='HTT " + (rtl?"HTTHebrew":"HTTEnglish") + "' dir=\"\">\n";
        startText = 0;
        while(responseText.indexOf("word_ph", startText) != -1) {
          //first the original word
          startText = responseText.indexOf('<span class="word"', startText);
          startText = responseText.indexOf(">", startText) + 1;
          endText = responseText.indexOf("</span>", startText);
          HTTdefinitions += "<tr class='HTT'><td class='HTT HTTWord " + (rtl?"HTTHebrew":"HTTEnglish") + "'>" + responseText.substring(startText, endText) + "</td>\n";

          //now the part of speech
          startText = responseText.indexOf('<span class="diber"', endText);
          startText = responseText.indexOf(">", startText) + 1;
          endText = responseText.indexOf("</span>", startText);
          HTTdefinitions += "<td class='HTT HTTPartOfSpeech " + (rtl?"HTTHebrew":"HTTEnglish") + "'>" + responseText.substring(startText, endText) + "</td>\n";

          //finally the definition
          startText = responseText.indexOf("<div", endText);
          HTTdefinitions += "<td class='HTT HTTDefinition " + (!rtl?"HTTHebrew":"HTTEnglish") + "'>";
          if(responseText.indexOf('default_trans', startText) != -1 && responseText.indexOf('default_trans', startText) < responseText.indexOf('</div>', startText)) {
            startText = responseText.indexOf('default_trans', startText);
          }
          startText = responseText.indexOf('>', startText) + 1;
          endText = responseText.indexOf('</div>', startText);
          HTTdefinitions += responseText.substring(startText, endText);
          HTTdefinitions += "</td></tr>\n";
        }
        HTTdefinitions += "</tbody></table>";
      }
      HTTshowToolTip();
    }

    function HTTtranslateWord(input) {
      var HTTreq;

      //GM_log("url: " + 'http://milon.morfix.co.il/default.aspx?q=' + escape(input));
      GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://milon.morfix.co.il/default.aspx?q=' + escape(input),
        headers: {
          'User-agent': 'Mozilla/4.0 (compatible)',
          'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: HTTparseResponse
      });
    }

    function HTTgetWord() {
      //GM_log("i am " + HTTparent);

      //GM_log("i am attributes " + HTTparent.className);
      //GM_log("tag name is " + HTTparent.tagName);
      var range = HTTparent.ownerDocument.createRange();
      range.selectNode(HTTparent);
      var str = range.toString();
      range.detach();

      if(HTToffset < 0 || HTToffset >= str.length)
        return null;
      var start = HTToffset;
      var end = HTToffset + 1;
      var valid_word = /^((\w)+|([\u0590-\u05ff\"\']+))$/;
      //GM_log(escape(str.substring(start, start + 1)));
      if(!valid_word.test(str.substring(start, end)))
        return null;
      while(start > 0 && valid_word.test(str.substring(start - 1, end)))
        start--;
      while(end < str.length && valid_word.test(str.substring(start, end+1)))
        end++;
      var text = str.substring(start, end);
      //GM_log("try to translate " + text);
      HTTtranslateWord(text);
    }

    function HTTmousescroll(event) {
      HTTmousemove(event);
    }

    function HTThide(force) {
      if(HTTtimeoutID || force) {
        HTTdefinitions = "";
        HTTtooltip.style.visibility = "hidden";
        HTTtooltip.innerHTML = HTTdefinitions;
        HTTtooltip.style.left = 0 + "px";
        HTTtooltip.style.top = 0 + "px";
        HTTtooltip.style.width = 0 + "px";
        HTTtooltip.style.height = 0 + "px";
        window.clearTimeout(HTTtimeoutID);
        HTTtimeoutID = 0;
      }
    }

    function HTTkeypress(event) {
      var e = event;
      
      //GM_log("got keypress");
      HTThide(true); //hide the old one if there is one

      var keynum;
      var keychar;
      var numcheck;
      var text;

      if(window.event) // IE
        keynum = e.keyCode;
      else if(e.which) // Netscape/Firefox/Opera
        keynum = e.which;

      keychar = String.fromCharCode(keynum);
      //GM_log("keychar is " + keychar);
      if(keychar == HTTtooltipCharacter) {
        //GM_log("match");
        if(window.getSelection() != '') {
          //GM_log("translating phrase " + window.getSelection());
          HTTtranslateWord(window.getSelection());
        } else {
          HTTgetWord(); //get the word under the cursor right now and translate it
        }
      }
      return;
    }

    function HTTmouseup(event) {
      var e = event;
      
      if(window.getSelection() == '')
        return; //nothing to do
      //GM_log("got mouseup " + window.getSelection());
      HTThide(true); //hide the old one if there is one

      //variables for use in displaying the translation
      HTTcurX=e.pageX;
      HTTcurY=e.pageY;
      //GM_log("try to translate " + window.getSelection());
      HTTtranslateWord(window.getSelection());
      return;
    }

    function HTTclick(event) {
      var e = event;
      
      //click is used by many handlers, mostly to hide the tooltip
      //variables for use in displaying the translation
      HTTcurX=e.pageX;
      HTTcurY=e.pageY;
      //GM_log("got click");
      HTThide(true); //hide the old one if there is one
      if(!trigger_click)
        return; //just hide and finished

      //don't bother trying if the location is no good.
      try {
        if(!e || !e.rangeParent || e.rangeParent.nodeType != e.rangeParent.TEXT_NODE
           || e.rangeParent.parentNode != e.target)
          return;
      }
      catch(e) {
        return; //I don't know how to handle the permission denied thing
      }
      //variables for use in finding the word
      HTTparent = event.rangeParent;
      HTToffset = event.rangeOffset;
      HTTgetWord(); //get the word under the cursor right now
      return;
    }
    
    function HTTmousemove(event) {
      //test out the tooltip
      var e = event;
      //every movement of the mouse restarts the timer and removes the tooltip
      HTThide();
      //don't bother starting a new timer if the location is no good.
      try {
        if(!e || !e.rangeParent || e.rangeParent.nodeType != e.rangeParent.TEXT_NODE
           || e.rangeParent.parentNode != e.target)
          return;
      }
      catch(e) {
        return; //I don't know how to handle the permission denied thing
      }

      //variables for use in finding the word
      HTTparent = event.rangeParent;
      HTToffset = event.rangeOffset;
      //variables for use in displaying the translation
      HTTcurX=e.pageX;
      HTTcurY=e.pageY;
      if(!trigger_hover)
        return; //only used this to get the last_mouse_event (location)
      HTTtimeoutID = window.setTimeout(HTTgetWord, HTTtooltipDelay);
      return;
    }

    // Initialize the script
    function HTTinit () {
      GM_addStyle(
      '.HTTPopup { background:#f6f6f6; border:3px double #666666; }'+
      '.HTTPopupContainer { display:none; position:absolute; top:0; right:0; bottom:0; left:0; }'+
      '#HTTConfig { width:700px; padding:10px; margin:20px auto 0; }'+
      '#HTTConfig label { color:#666666; font-weight:normal; } '+
      '#HTTConfig .HTTHeader { font-weight:bold; }'+
      '#HTTShadow { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:black; opacity:0.6; }'+
      '.HTT { background: none; border-spacing: 0; border:0; padding:0;}' +
      '.HTTImportant { font-weight:bold; }' +
      '.HTTHebrew { direction:rtl; text-align:right; font-family:David; }' +
      '.HTTEnglish { direction:ltr; text-align:left; font-family:Arial; }' +
      '.HTTWord { font-size:11pt; color:#000099; }' +
      '.HTTPartOfSpeech { font-size:7pt; color:black; font-family:Arial; }' + //always Arial, to keep it readable when small
      '.HTTDefinition { font-size:11pt; color:#000099; }' +
      '.HTTtooltip { border: 1px solid black; visibility: hidden; top: 0px; left: 0px; position: absolute; background-color: lightyellow; z-index: 10000; width: 0px; height: 0px; }'
      );

      var popupDiv = document.createElement('div');
      popupDiv.id = 'HTTPopupContainer';
      popupDiv.className = 'HTTPopupContainer';
      appendChild(popupDiv, document.body);
      var shadowDiv = document.createElement('div');
      shadowDiv.id = 'HTTShadow';
      appendChild(shadowDiv, document.body);

      //here is where we set the initial values that we read from the config
      if(GM_getValue) {
        align_top = GM_getValue("align_top", 1);
        align_left = GM_getValue("align_left", 1);
        keep_on_screen = GM_getValue("keep_on_screen", 1);
        trigger_hover = GM_getValue("trigger_hover", 1);
        HTTtooltipDelay = GM_getValue("HTTtooltipDelay", 1000);
        trigger_click = GM_getValue("trigger_click", 0);
        trigger_highlight = GM_getValue("trigger_highlight", 0);
        trigger_keyboard = GM_getValue("trigger_keyboard", 0);
        HTTtooltipCharacter = GM_getValue("HTTtooltipCharacter", 'T');
      } else {
        align_top = 1;
        align_left = 1;
        keep_on_screen = 1;
        trigger_hover = 1;
        HTTtooltipDelay = 1000;
        trigger_click = 0;
        trigger_highlight = 0;
        trigger_keyboard = 0;
        HTTtooltipCharacter = 'T';
      }
      if(GM_registerMenuCommand) {
        GM_registerMenuCommand("Configure Hebrew ToolTip Translation", showConfig);
      }

      var element;

      if(trigger_hover) {
        window.addEventListener("mousemove", HTTmousemove, false);
        window.addEventListener("DOMMouseScroll", HTTmousescroll, false);
        window.addEventListener("click", HTTclick, false);
      }
      if(trigger_click) {
        window.addEventListener("click", HTTclick, false);
      }
      if(trigger_highlight) {
        window.addEventListener("mouseup", HTTmouseup, false);
        window.addEventListener("click", HTTclick, false);
      }
      if(trigger_keyboard) {
        window.addEventListener("keypress", HTTkeypress, false);
        window.addEventListener("click", HTTclick, false);
        window.addEventListener("mousemove", HTTmousemove, false);
      }
      HTTtooltip = document.createElement("div");
      element = document.lastChild;

      HTTtooltip = appendChild(HTTtooltip, element);
      HTTtooltip.className = "HTT HTTtooltip"; //for use by users that might do things with stylish
      //window.addEventListener("mouseup", function(e) { alert(window.getSelection()); /*HTTtranslateWord(window.getSelection());*/ }, false);
    }
    HTTinit();
  }),false);
