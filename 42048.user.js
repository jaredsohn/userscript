// ==UserScript==
// @name           msdn.lib.expand.descendant.toc
// @namespace      http://hondams.jpn.org/
// @description    msdn.lib.expand.descendant.toc
// @include        http://msdn.microsoft.com/*
// ==/UserScript==

unsafeWindow.TocClick=function(e){
  if(window.event)window.event.cancelBubble=true;
  else e.cancelBubble=true;
  var srcEl=window.event?window.event.srcElement:null;
  if(srcEl==null&&e.target!=null)srcEl=e.target;
  if(srcEl.tagName=="IMG"){
    if(srcEl.className==unsafeWindow.emptyImg)return;
    if(srcEl.className==unsafeWindow.closedImg)unsafeWindow.ExpandAll(srcEl);
    else unsafeWindow.Collapse(srcEl)
  }else if(srcEl.tagName=="A")unsafeWindow.WriteCookie(unsafeWindow.CreateHint(srcEl))
};

unsafeWindow.ExpandAll=function(e){
  var r=true;
  var ExpandSub=function(el){
    if(!r)return;
    var p=unsafeWindow.FindSection(el);
    unsafeWindow.Expand(el);
    r=confirm("continue opening toc?");
    if(!r)return;
    var els=p.getElementsByTagName("IMG");
    for(var i=0;i<els.length;i++){
      if(els[i].className==unsafeWindow.closedImg)ExpandSub(els[i]);
    }
  };
  ExpandSub(e);
};
