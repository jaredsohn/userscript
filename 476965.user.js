// ==UserScript==
// @name        Remove style
// @namespace   tukkek
// @include     *
// @version     1
// ==/UserScript==
function remove(){
  var queries=['link[rel=stylesheet][href]','style'];
  for (var i=0;i<queries.length;i++){
      var remove=document.querySelectorAll(queries[i]);
      for (var j=0;j<remove.length;j++){
          remove[j].outerHTML='';
      }
  }
  var inline=document.querySelectorAll('*[style]');
  for (var i=0;i<inline.length;i++){
      inline[i].removeAttribute('style');
  }
}
GM_registerMenuCommand('Remove style',remove,'r');
if(!window.onkeyup){
  window.onkeyup=function(e){
    if(e.altKey&&((e.key||e.char)=='c'||e.keyCode==67)){
      remove();
    }
  }
}