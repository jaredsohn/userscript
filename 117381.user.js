// ==UserScript==
// @name           Battlelog History Link
// @namespace      http://immersedcode.org/
// @description    Adds a history link to battlelog
// @include        http://battlelog.battlefield.com/bf3/servers/*
// ==/UserScript==

(function() {

  var script = document.createElement('script');
  script.setAttribute('type', 'application/javascript');
  script.textContent = '(' + (function() {

    /* creates a menu button for the main menu bar submenus */
    function makeMenuButton(target, text) {
      return $('<li class=base-dropdown-menu-item>')
        .append($('<div></div>').append($('<a></a>').text(text).attr('href', target)));
    }

    /* called each time the page changes or on initial load */
    function pageHook() {
      var ref = $('#base-section-nav-bf3 li.base-dropdown-menu-item ' +
          'a[href="/bf3/servers/"]').parent().parent();
      makeMenuButton('/bf3/servers/favourites/', 'Favourites').insertAfter(ref);
    }

    function init() {
      var normalAfterCallback = Surface.ajaxNavigation.afterCallback;
      Surface.ajaxNavigation.afterCallback = function(url, data) {
        var rv = normalAfterCallback.apply(this, arguments);
        pageHook();
        return rv;
      };
      pageHook();
    };

    init();
  }) + ')();';
  document.body.appendChild(script);
})();