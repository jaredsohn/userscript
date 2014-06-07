// ==UserScript==
// @id             Youtube_floating_player
// @name           Youtube floating player
// @description    Youtube floating player.
// @version        1.0.1
// @author         REVerdi
// @namespace      http://userscripts.org/users/67570
// @copyright      2014+, REVerdi (http://userscripts.org/users/67570)
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// Por causa do SPF, não posso usar // @include            http*://www.youtube.com/watch?*
// porque se o 1º link no YouTube não for do tipo acima, esse script nunca será executado.
// @include        http*://www.youtube.com/*
// @run-at         document-end
// ==/UserScript==



// Based on the ideia of drhouse (http://userscripts.org/scripts/show/186872)
// and contains source code written by tforbus:
// https://chrome.google.com/webstore/detail/video-pinner/egfhbaheiflmihggjcfmnmchkijkcdpl
// https://github.com/tforbus/youtube-fixed-video-bookmarklet
// http://www.whattheforbus.com/youtube-bookmarklet
// http://www.tristinforbus.com/



(function(){


var _window;
if (typeof unsafeWindow != undefined){
  _window = unsafeWindow;
}
else {
  _window = window;
}


// start of source code written by tforbus
var player;
var content;
var sideWatch;
var footer;
var playerRect;
// end of source code written by tforbus


function scrollPlayer(evt) {
  // start of source code written by tforbus
  if( _window.pageYOffset >= playerRect.top && _window.pageYOffset > 0 ) {
    player.style.position = 'fixed';
    player.style.top = '0px';
    player.style.zIndex = 999;

    sideWatch.style.position = 'absolute';
    sideWatch.style.zIndex = 998;
    sideWatch.style.top = player.clientHeight+'px';

    content.style.position = 'relative';
    content.style.zIndex = 997;
    content.style.top = player.clientHeight+'px';

  } else {
    player.style.position = '';
    player.style.top = '';

    sideWatch.style.position = '';
    sideWatch.style.top = '';

    content.style.position = '';
    content.style.top = '';
  }
  // end of source code written by tforbus
}




var isScrollListenerAdded = 0;

function addScrollListener() {
  if( !isScrollListenerAdded ) {
    //alert('scrollListener adicionado');
    // start of source code written by tforbus
    player = document.getElementById('player');
    content = document.getElementById('watch7-content');
    sideWatch = document.getElementById('watch7-sidebar');
    footer = document.getElementById('footer-container');
    playerRect = player.getBoundingClientRect();
    footer.style.visibility = 'hidden';
    // end of source code written by tforbus
    document.addEventListener('scroll', scrollPlayer, false);
    isScrollListenerAdded = 1;
  }
}

function removeScrollListener() {
  if( isScrollListenerAdded ) {
    //alert('scrollListener removido');
    document.removeEventListener('scroll', scrollPlayer, false);
    isScrollListenerAdded = 0;
  }
}



if ( /https?:\/\/www\.youtube\.com\/watch\?/.test(document.location) == true ) {
  addScrollListener();
}




var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if ( /https?:\/\/www\.youtube\.com\/watch\?/.test(document.location) == true ) {
      addScrollListener();
    } else {
      removeScrollListener();
    }
  });
});
var config = { attributes: true, characterData: true, childList: true};
var target = document.getElementById('content');
if( target != null ) observer.observe(target, config);


})();