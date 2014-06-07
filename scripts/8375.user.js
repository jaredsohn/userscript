// ==UserScript==
// @name           password2text
// @namespace      http://eldar.cz/myf/pub/firefox/
// @description    switches password inputs to text while focused. also toggles readonly elments on double click
// @include        *
// ==/UserScript==

(function()
{ var fi = -1 , f
; while ( f = document.forms[++fi] )
  { var ei = -1 , e
  ; while ( e = f.elements[++ei] )
    { if ( e.getAttribute('type') == 'password' )
      { e.addEventListener
        ( 'focus'
        , function(){ this.setAttribute('type','text') }
        , true
        )
      ; e.addEventListener
        ( 'blur'
        , function(){ this.setAttribute('type','password') }
        , true
        )
      ; continue
      }
    ; if ( e.getAttribute('readonly') )
      { e.addEventListener
        ( 'dblclick'
        , function()
          { if ( this.getAttribute('readonly') )
            { this.removeAttribute('readonly')
            } else
            { this.setAttribute('readonly','readonly')
            }
          }
        , true
        )
      }
    }
  }
}
)();