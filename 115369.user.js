// ==UserScript==
// @name           new tab instapaper
// @namespace      new_tab_instapaper
// @include        http://www.instapaper.com/*
// ==/UserScript==
(function(){
  function toInstapaper(){
    var el=document.getElementsByTagName('a');
    for (var i=0;i<el.length;i++){
      if(el[i].className=='tableViewCellTitleLink'){
        el[i].target='_blank';
      }
    }	
  }
  window.addEventListener("load", toInstapaper, false);
})();

