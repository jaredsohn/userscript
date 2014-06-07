// ==UserScript==
// @name           Wykop - ominięcie komentarzy dla niezalogowanych
// @description    Przeskakuje ze strony z komentarzami do ramki (oszczędza jedno kliknięcie niezalogowanym użytkownikom) - wymagany Firefox >= 4.0   
// @namespace      http://userscripts.org/scripts/show/108358
// @version        0.4
// @include        http://www.wykop.pl/link/*
// @include        http://*.wykop.pl/link/*
// ==/UserScript==

(function() {

    if (history.state) {
      state = history.state    
      if (!('followLink' in state)) {
	state.followLink = true;
      }
    } else {
      state = new Object();
      state.followLink = true;
    }
    
    //link
    var e = document.getElementsByClassName("link")[0];
    
    //sprawdz, czy nie osadzone wideo
    var v = (document.getElementsByClassName("videoembed").length > 0)?true:false;
   
    if (!v && e.tagName == "A" && window.location != e.href && 	state.followLink)
    {
      state.followLink = false;
      history.replaceState(state,'');
      window.location = e.href;
    } 
})();