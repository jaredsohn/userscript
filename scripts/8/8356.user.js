// ==UserScript==
// @name          findhash
// @namespace     http://eldar.cz/myf/pub/firefox/
// @description   tries to find(url#hash) if no matching ID or anchor is present
// @include       *
// ==/UserScript==

(function()
{ if
  (  !window.find
  || !window.location.hash
  || 2 > window.location.hash.length
  ) return // unable to search or nothing to look for
; var hsh = window.location.hash.substring(1)
  , a , ai = -1
; if ( document.getElementById(hsh) ) return // ID present
; while
  ( a = document.anchors[++ai]
  ) if ( a.name == hsh ) return // anchor present
; hsh = decodeURIComponent(hsh)
; if ( !window.addEventListener )
  { window.find(hsh)
  } else
  { window.addEventListener
    ( 'load' // type
    , function() // listener
      { window.find
        ( hsh // aString
        , false // aCaseSensitive
        , false // aBackwards
        , false // aWrapAround
        , false // aWholeWord
        , false // aSearchInFrames
        , false // aShowDialog
          //  must be also true if aSearchInFrames is enabled
          //  otherwise it will cause 'Error: Access to restricted URI denied'
        )
      }
    , false // useCapture
    )
  }
}
)();