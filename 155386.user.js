// ==UserScript==
// @name           500px Grabber
// @description    This script will add a button to 500px image pages that will allow you to download a low-res version of the image.
// @namespace      http://unicornsandcola.com/page/_500px_grabber
// @author         Ariel Goldblatt (http://unicornsandcola.com/)
// @license        MIT License (http://opensource.org/licenses/MIT)
// @homepage       http://unicornsandcola.com/page/_500px_grabber
// @version        0.4.1
// @include        http://500px.com/photo/*

// @history        0.4.1 Bugfix: Made it get the "src" attribute instead of the "href" attribute
// @history        0.4 Bugfix: Checks if store section child is element
// @history        0.3 Pure JavaScript (compatible with chrome)
// @history        0.2 Public release
// @history        0.1 Initial version
// ==/UserScript==

if (window.location.href.substring(0, 23) == 'http://500px.com/photo/') {
  var photo_url = document.getElementById('mainphoto').getAttribute('src');
  var store_sections = document.getElementById('store').childNodes;
  var store_left;

  for (var i = 0; i < store_sections.length; i++) {
    if (store_sections[i] instanceof Element) {
      if (store_sections[i].getAttribute('class') == 'left') {
        store_left = store_sections[i];
        break;
      }
    }
  }

  store_left.innerHTML = store_left.innerHTML + '<a href="' + photo_url + '" class="button small" id="userscript-download">Download Low-Res (Free)</a>';
}