// ==UserScript==
// @name           New York Times Toolbar Remover
// @author         Philipp Weis <pweis@pweis.com>
// @namespace      http://userscripts.org/users/111324
// @description    Removes the toolbar from articles at nytimes.com.
// @include        http://*.nytimes.com/*
// @include        http://nytimes.com/*
// @include        https://*.nytimes.com/*
// @include        https://nytimes.com/*
// @version        0.2
// @license        Public Domain
// ==/UserScript==

document.body.addEventListener('DOMSubtreeModified', function(e) {
      var elem = document.getElementById('TP_fixed_toolbar');
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }, false);

