// ==UserScript==
// @name        Redfin Foreclosure
// @author      patrick@feedface.com
// @version     2010-01-27
// @namespace   http://www.feedface.com/userscript/redfin_foreclosre
// @description Adds a notification to foreclosure properties.
// @include     http://www.redfin.com/*
// ==/UserScript==
// Compatible w/ GreaseKit (Safari)

if (window.location.pathname.search(/^\/[A-Z]{2}\//) == 0) {
  var apanel = document.getElementById('amenities_panel');
  var items  = apanel.getElementsByTagName('li');

  for (var i = 0; i < items.length; i++) {
    if (items[i].innerText == 'Foreclosure') {
      var tbadge = document.getElementById('property_listing_type_badge');

      var mdiv = document.createElement('div');
      mdiv.style.background = '#FF5050';
      mdiv.style.padding = '1em';
      mdiv.innerHTML = 'Foreclosure!';

      tbadge.parentNode.insertBefore(mdiv, tbadge.nextSibling);
      break;
    }
  }
}


