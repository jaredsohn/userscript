// ==UserScript==
// @name          CHIP.ro forum adbot remover
// @namespace     http://userscripts.org/
// @include       http://forum.chip.ro/showthread.php?*
// @description	  Remove bot ads from the CHIP.ro topics
// ==/UserScript==

(function() {
  var i=0;
  var d=null;
  var e=document.getElementById('posts');
  if(!e)return;
  var es=e.childNodes;
  if(!es)return;
  var rem=null;
  checkdivs:
  for(i=es.length-1;i>=0;i--) {
    d=es[i];
    if(d.nodeName=='DIV') {
      d.style.display='none';
      break checkdivs;
    }
  }
})();
