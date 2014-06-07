// ==UserScript==
// @name                        Hebrew ToolTip Translation
// @namespace eyal0
// @description         Translate words on a webpage from Hebrew to English and vice-versa in little tooltips
// @include                     *
// ==/UserScript==

(function() {
  var HTTtooltipDelay = 1000; //milliseconds
  var HTTtimeoutID;
  var HTTparent;
  var HTToffset;
  var HTTcurX;
  var HTTcurY;
  var HTTtooltip;
  var HTTdefinitions = ""; //translation output

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
      ttX = HTTcurX + 10;
      ttY = HTTcurY + 10;
      minX = document.documentElement.scrollLeft;
      minY = document.documentElement.scrollTop;
      maxX = minX + document.documentElement.clientWidth - HTTtooltip.scrollWidth;
      maxY = minY + document.documentElement.clientHeight - HTTtooltip.scrollHeight;
      //GM_log(document.documentElement.clientWidth + "," + HTTtooltip.scrollWidth + "," + minX + "," + minY + "," + maxX + "," + maxY);

      if(ttX < minX)
        ttX = minX;
      else if(ttX > maxX)
        ttX = maxX;
      if(ttY < minY)
        ttY = minY;
      else if(ttY > maxY)
        ttY = maxY;

      HTTtooltip.style.left = ttX + "px";
      HTTtooltip.style.top = ttY + "px";

      HTTtooltip.style.visibility="visible";
    }
  }

  function HTTparseResponse(responseDetails) {
    /*var bodyStart = responseDetails.responseText.indexOf("<body");
    var bodyEnd = responseDetails.responseText.indexOf("body>")+5;
    responseDetails.responseText = responseDetails.responseText.substring(bodyStart,bodyEnd);
    GM_log(responseDetails.responseText);
    var dom = new XML(responseDetails.responseText);
    var definition;
    HTToutput = "";*/
    var i;
    var startText;
    var endPos;
    var rtl;

    /*for(i=0; i<responseDetails.responseText.length; i+=40){
      GM_log(responseDetails.responseText.substring(i,i+40));
    }*/
    //GM_log(responseDetails.responseText);
    i=1;
    startText = responseDetails.responseText.indexOf("imgWord" + i);
    //GM_log("here1:" + startText);
    if(startText != -1) {
      //we've got something
      startText = responseDetails.responseText.indexOf("TableTranslation");
      startText = responseDetails.responseText.indexOf("style=", startText);
      endText = responseDetails.responseText.indexOf(";", startText) + 2;
      HTTdefinitions += "<table dir=\"\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" background-color=white ";
      HTTdefinitions += responseDetails.responseText.substring(startText, endText) + ">";
      //GM_log("here2");
      if(responseDetails.responseText.substring(startText, endText).indexOf("rtl") != -1)
        rtl = true; //search of a Hebrew word
      else
        rtl = false; //search of an English word
      startText = responseDetails.responseText.indexOf("imgWord" + i);
      //GM_log(HTTdefinitions);
      while(startText != -1) {
        //first the original word
        startText = responseDetails.responseText.indexOf("<span", startText);
        endText = responseDetails.responseText.indexOf(">", startText);
        endText += 1;
        endText = responseDetails.responseText.indexOf("<", endText);
        endText += 7;
        HTTdefinitions += "<tr><td align=" + (rtl?"right":"left") + " style=\"direction: " + (rtl?"rtl":"ltr") + "\">" + responseDetails.responseText.substring(startText, endText) + "</td>";
        //GM_log(responseDetails.responseText.substring(startText, endText));
        startText = endText;

        //now the part of speech
        startText = responseDetails.responseText.indexOf("<span", startText);
        endText = responseDetails.responseText.indexOf(">", startText);
        endText += 1;
        endText = responseDetails.responseText.indexOf("<", endText);
        endText += 7;
        HTTdefinitions += "<td align=" + (rtl?"right":"left") + " style=\"direction: " + (rtl?"rtl":"ltr") + "\">" + responseDetails.responseText.substring(startText, endText) + "</td>";
        //GM_log(responseDetails.responseText.substring(startText, endText));
        startText = endText;

        //finally the definition
        startText = responseDetails.responseText.indexOf("<span", startText);
        endText = responseDetails.responseText.indexOf(">", startText);
        endText += 1;
        endText = responseDetails.responseText.indexOf("<", endText);
        endText += 7;
        HTTdefinitions += "<td align=" + (rtl?"left":"right") + " style=\"direction: " + (rtl?"ltr":"rtl") + "\">" + responseDetails.responseText.substring(startText, endText) + "</td></tr>";
        //GM_log(responseDetails.responseText.substring(startText, endText));
        startText = endText;

        i++; //next
        startText = responseDetails.responseText.indexOf("imgWord" + i);
        //if(startText != -1)
          //HTTdefinitions += "<br>";
      }
    }
    //GM_log(HTTdefinitions);
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

  function HTThide() {
    if(HTTtimeoutID) {
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

    HTTtimeoutID = window.setTimeout(HTTgetWord, HTTtooltipDelay);
    //variables for use in displaying the translation:
    HTTparent = event.rangeParent;
    HTToffset = event.rangeOffset;
    HTTcurX=e.pageX;
    HTTcurY=e.pageY;
    return;
  }

  // Initialize the script
  function HTTinit () {
    var element;

    //GM_log("load!");
    window.addEventListener("mousemove", HTTmousemove, false);
    window.addEventListener("DOMMouseScroll", HTTmousescroll, false);
    HTTtooltip = document.createElement("div");
    element = document.lastChild;

    HTTtooltip = element.insertBefore(HTTtooltip, element.lastChild.nextSibling);
    HTTtooltip.className = "tooltip";
    HTTtooltip.style.visibility = "hidden";
    HTTtooltip.style.top = 0;
    HTTtooltip.style.left = 0;
    HTTtooltip.style.position = "absolute";
    //HTTtooltip.style.width = "150px";
    HTTtooltip.style.border = "1px solid black";
    HTTtooltip.style.padding = "1px";
    HTTtooltip.style.backgroundColor = "lightyellow";
    HTTtooltip.style.zIndex = "10000";
    //HTTtooltip.innerHTML = "hello!";

    //GM_log("insertbefore done!");
  }

  window.addEventListener("load", HTTinit, false);
})();
