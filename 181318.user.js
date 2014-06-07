// ==UserScript==
// @name        Disqus ad removal
// @namespace   http://griffeltavla.wordpress.com/
// @description Removes ad related discovery and footer content from site embedded disqus threads
// @include     http://disqus.com/embed/comments/*
// @include     https://disqus.com/embed/comments/*
// @version     1.0
// @grant       none
// ==/UserScript==

window.addEventListener('load',function(){
  window.removeEventListener('load',arguments.callee);
  
  function $() { 
    var ret = [], i, el;
    for(i=0;i<arguments.length;i++){
      el = document.getElementById(arguments[i]);
      if(el) ret.push(el);
    }
    return ret
  }
  
  function remove(els){
    if(!Array.isArray(els)) els = [els];
    els.forEach(function(el){
      el.parentNode.removeChild(el);
    });
  }
  
  document.body.addEventListener('DOMSubtreeModified', function() {
    var els = $('discovery','footer');
    if( els.length != 2 ) return;
    document.body.removeEventListener('DOMSubtreeModified',arguments.callee, false);
    remove(els);
  },false);

},false);
