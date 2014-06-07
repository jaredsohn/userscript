// ==UserScript==
// @name           msdn.lib.expand.descendant.toc.by.ctrl.click
// @namespace      http://hondams.jpn.org/
// @description    msdn.lib.expand.descendant.toc.by.ctrl.click
// @include        http://msdn.microsoft.com/*
// ==/UserScript==

unsafeWindow.TocClick=function(e){
  if(window.event)window.event.cancelBubble=true;
  else e.cancelBubble=true;
  var srcEl=window.event?window.event.srcElement:null;
  if(srcEl==null&&e.target!=null)srcEl=e.target;
  if(srcEl.tagName=="IMG"){
    if(srcEl.className==unsafeWindow.emptyImg)return;
    if(srcEl.className==unsafeWindow.closedImg)unsafeWindow.ExpandAll(e, srcEl);
    else unsafeWindow.Collapse(srcEl)
  }else if(srcEl.tagName=="A")unsafeWindow.WriteCookie(unsafeWindow.CreateHint(srcEl))
};

unsafeWindow.ExpandAll=function(e, srcEl){
  var r;
  if(window.event)r=window.event.ctrlKey;
  else r=e.ctrlKey;
  var ExpandSub=function(el){
    var p=unsafeWindow.FindSection(el);
    unsafeWindow.Expand(el);
    if(!r)return;
    setTimeout(function(){
      var els=p.getElementsByTagName("IMG");
      for(var i=0;i<els.length;i++){
        if(els[i].className==unsafeWindow.closedImg)ExpandSub(els[i]);
      }
      clearTimeout();
    }, 0);
  };
  ExpandSub(srcEl);
};

