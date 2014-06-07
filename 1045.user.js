// ==UserScript==
// @name          Don't Click It
// @namespace     http://www.slightlyremarkable.com/
// @description	  Inspired by DONTCLICK.IT, this Greasemonkey script permits user-interface navigation without mouse clicking.
// @include       *
// ==/UserScript==
window.addEventListener ("load", function (e){
 var $_globTimer, $_tempObj;
 var l, fClick, k = 0;
 while(l = document.links[k++]){
      fClick = l.onclick;
      l.addEventListener('mouseover', function(e){
        if(!e.shiftKey){
          (this.onclick)();
        }
      }, false);
      l.addEventListener('mouseover', function(e){
       if(e.ctrlKey){
          window.open(this.href, this.target);
          return false;
       }
       if(!e.shiftKey){
        if(!this.target){
           location.href = this.href;
        } else {
           window.open(this.href, this.target);
        }
       }
      }, false);
  fClick = null;
 }
 var f, e, i = 0, j = 0;
 while(f = document.forms[i++]){
  j = 0;
  while(e = f.elements[j++]){
   if(e.type){
    if(e.type == 'text' || e.type == 'textarea' || e.type == 'password'){
       e.addEventListener('mouseover', function(){this.select()}, false);
    } else if(e.type == 'select-one'){
       e.addEventListener('mouseover', function(){this.focus()}, false);
    } else {
       e.addEventListener('mouseover', function(e){
        if(!e.shiftKey){
           this.click();
        }
       }, false);
    }
   }
  }
 }
}, false);