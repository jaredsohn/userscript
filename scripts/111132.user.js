// ==UserScript==
// @name           Anti-Disabler for Naver
// @namespace      http://userscripts.org/users/dyhan81
// @description    The script allows users to call the context menu or select the texts in Naver, and when you copy text, script will get rid of a annoying source indication.
// @include        http://blog.naver.com/*
// @include        http://cafe.naver.com/*
// @copyright      2009+, Dong-yoon Han (http://cb-dyhan81.blogspot.com)
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/2.0/kr/
// @version        1258306524556; Mon Nov 16 2009 02:35:24 GMT+0900
// @injectframes   1
// ==/UserScript==
// This may be an old version, because this was uploaded by arqr33 to let codes permanently fixed for safety.

(function(){

var intervalID;
var domain = window.location.host;

// For Blog
if (domain.toLowerCase().indexOf("blog.")>-1)
{
  intervalID = setInterval("                                               \
    if(window.AutoSourcing != null)                                        \
    {                                                                      \
      AutoSourcing.setEnable(false);                                       \
    }                                                                      \
                                                                           \
    if(window.utility != null)                                             \
    {                                                                      \
      utility.detachSelectPrevent();                                       \
    }                                                                      \
  ", 500);
  setTimeout("clearInterval("+intervalID+");", 3000);
}

/* For Cafe */
if (domain.toLowerCase().indexOf("cafe.")>-1)
{
  intervalID = setInterval("                                               \
    if(window.AutoSourcing != null)                                        \
      AutoSourcing.setEnable(false);                                       \
                                                                           \
    var alternativeCancelBlockMouseRight = function(theElement)            \
    {                                                                      \
      var trueFunc = function()                                            \
      {                                                                    \
        return true;                                                       \
      };                                                                   \
                                                                           \
      theElement.oncontextmenu = trueFunc;                                 \
      theElement.onselectstart = trueFunc;                                 \
      theElement.ondragstart = trueFunc;                                   \
    };                                                                     \
                                                                           \
    if(window.CancelBlockMouseRight != null)                               \
    {                                                                      \
      CancelBlockMouseRight();                                             \
      cancelBlockDragInFF();                                               \
    }                                                                      \
                                                                           \
    if(window.mlayoutPhoto != null)                                        \
    {                                                                      \
      alternativeCancelBlockMouseRight(parent.document);                   \
      alternativeCancelBlockMouseRight(window.mlayoutPhoto.oView);         \
      window.mlayoutPhoto.opt.allowRightMouseClick = true;                 \
    }                                                                      \
  ",500);
  setTimeout("clearInterval("+intervalID+");", 3000);

  intervalID = setInterval("                                               \
    if(    document.getElementById('content-area')                         \
        && (document.getElementById('content-area').oncontextmenu != null))\
    {                                                                      \
      document.getElementById('content-area').oncontextmenu = null;        \
      document.getElementById('content-area').onselectstart = null;        \
      document.getElementById('content-area').ondragstart = null;          \
    }                                                                      \
  ", 500);
  setTimeout("clearInterval("+intervalID+");", 3000);
}

})();