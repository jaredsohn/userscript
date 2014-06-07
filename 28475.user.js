// ==UserScript==
// @name           compact LDR
// @namespace      http://d.hatena.ne.jp/javascripter/
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==

with(unsafeWindow||window){
  window.addEventListener('load',function(){
    Keybind.remove('ctrl+shift');
    Keybind.remove('shift+ctrl');
    Keybind.add('j', Control.go_next);
    Keybind.add('k', Control.go_prev);
    window.removeEventListener('load',arguments.callee,false);
  },false);
  var style=document.getElementsByTagName('head')[0].appendChild($N('style',{type:'text/css'}));
  State.watch('fullscreen',
    function(id,before,after){
      style.textContent=after==1?'.full-box,.grayline,#footer{display:none!important}#menu{margin-top:-50px}#message_box{margin-top:50px!important;margin-left:210px!important}':'';
    return after;
    });
  State.fullscreen=1;
}

