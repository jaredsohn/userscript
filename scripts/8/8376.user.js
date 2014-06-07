// ==UserScript==
// @name           accesskeys-reveal
// @namespace      http://eldar.cz/myf/pub/firefox/
// @description    Displays accesskeys aside form elements that have any; intended for usage with certain userstyle.
// @include        *
// ==/UserScript==

if( document.querySelectorAll )
{ var els = document.querySelectorAll('textarea[accesskey],input[accesskey],select[accesskey]');
}
else 
{ var fi = -1, ei = -1 , f , e, els = [] 
; while ( f = document.forms[++fi] )
  { ei = -1
  ; while ( e = f.elements[++ei] )
    { if ( e.tagName == 'BUTTON') continue
    ; if ( e.getAttribute('accesskey') ) els.push( el )
    }
  }
}
if( !els.length ) return;
var i = -1, e;
while( e = els[++i] ) 
{ var label = document.createElement('span')
; label.innerHTML = e.getAttribute('accesskey')
; label.className = 'my_accesskey'
; if( e.nextSibling ) e.parentNode.insertBefore( label , e.nextSibling )
  else e.parentNode.appendChild( label )
}