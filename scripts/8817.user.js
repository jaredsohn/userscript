// ==UserScript==
// @name           Instant CSS
// @namespace      userscripts.org/alien_scum
// @description    lets you watch the affects of changing the CSS live as you type
// @include        *
// ==/UserScript==



window.addEventListener("keydown",function(e) {
	if(e.ctrlKey && e.altKey && e.keyCode==70 ) { // ctrl+alt+f
	  if('undefined' == typeof ta){
      ta=document.body.appendChild(document.createElement('textarea'));
      ta.setAttribute('style','position: fixed; left:0px; bottom:0px; width:100%; heigth:300px;-moz-opacity: 0.7; z-index:1337;');
      ta.setAttribute('rows',10);
      ta.setAttribute('wrap','off');
      ta.value=GM_getValue('css','');
      ta.focus();

      style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
      style.type = 'text/css';
      old='';
      inter=window.setInterval(function (){
        if(old!=ta.value) {
          GM_setValue('css',ta.value);
          style.innerHTML = ta.value.replace(/;/g,' !important;');
        }
        old=ta.value;
      },200);
    } else if(ta.style.display=='none')
        ta.style.display='inline'
      else
        ta.style.display='none' 
	}
	else 	if(e.ctrlKey && typeof ta != 'undefined' && (e.keyCode==38 || e.keyCode==40)) { // ctrl+ up/down
	  var v=ta.value; b=ta.selectionStart, f=ta.selectionEnd, s= ta.scrollTop;
    var p1=v.slice(0,b).replace(/[^\d-]+/g,' ').match(/-?\d*$/)[0],p2=v.slice(b).replace(/[^\d-]+/g,' ').match(/^-?\d*/)[0];    
    if((p1+p2).length) {
      f=b+p2.length;
      b=b-p1.length;
      n=parseInt(p1+p2)+(e.shiftKey?10:1)*(39-e.keyCode)+'';
      ta.value=v.slice(0,b)+n+v.slice(f);
      style.innerHTML = ta.value.replace(/;/g,' !important;');
      ta.setSelectionRange(b,b+n.length);
      ta.scrollTop = s;
    }
    ta.focus();
	}

}, false);