// ==UserScript==
// @name           Helloacy.ru hotkeys
// @namespace      http://scripts.uadev.net
// @description    Add Ctrl+arrows hotkeys for Helloacy.ru
// @include        http://helloacy.ru/*
// ==/UserScript==

// Add jQuery

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; attachHotkeys(); }
}
GM_wait();

function attachHotkeys(){
  $(window).keydown(function(event){
    if (event.ctrlKey)
    {
      switch(event.keyCode)
      {
        case 37:
          window.location.href = $('div.go_back a').attr('href')
        break;
        case 39:
          window.location.href = $('div.go_ford a').attr('href')
        break;
        case 38:
          $('#comment').hide();
        break;
        case 40:
          window.location.href="#comments";
          $('#comment').show();
        break;
      }    
    }
  });
}