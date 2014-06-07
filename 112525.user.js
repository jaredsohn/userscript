// ==UserScript==
// @name         Rouming keyboard shortcuts
// @description  Adds keyboard shortcuts for faster image traversing.
// @author       community
// @include      http://kecy.roumen.cz/*
// @include      http://www.roumenovomaso.cz/*
// ==/UserScript==

function getElementsByTitle(titulek)  {
  node = document.getElementsByTagName("body")[0];
  var re = new RegExp('\\b' + titulek + '\\b');
  var el = node.getElementsByTagName("*");
  for(var i=0,j=el.length; i<j; i++)
    if(re.test(el[i].title))
      return el[i];
  return false;
}

var keyboardAction = function(e) {
  if (e == null) { // ie
    keycode = event.keyCode;
  } else { // mozilla
    keycode = e.which;
  }
  if (keycode == 37) {    // <-
    window.location.href=getElementsByTitle('Novější obrázek');
  } else if (keycode == 39) {    // ->
    window.location.href=getElementsByTitle('Starší obrázek');
  }
}

var addr = new RegExp('Show.php');
if (addr.test(window.location.href)) {
    if (window.document.addEventListener) {
        window.document.addEventListener('keydown', keyboardAction, false);
    } else if (window.document.attachEvent) {
        window.document.attachEvent('onkeydown', keyboardAction);
    } else {
        document.onkeydown = keyboardAction;
    }
}
