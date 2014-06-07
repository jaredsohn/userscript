// ==UserScript==
// @name CupidSieve
// @namespace http://userscripts.org/users/438460
// @description Banish the New Yorkers!
// @include http://www.okcupid.com/match*
// ==/UserScript==

var $$ = unsafeWindow.$$;
var Ajax = unsafeWindow.Ajax;
var Element = unsafeWindow.Element;

var Geocodings = {};

function geocode(loc, fn) {
  // Use cached results
  var coord = Geocodings[loc];
  if(coord) {
    fn(coord.lat, coord.lng);
    return;
  }

  setTimeout(function() {
    GM_xmlhttpRequest({
      method: "GET",
      url: "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=" + encodeURIComponent(loc),
      onload: function(resp) {
        try {
          var coord = JSON.parse(resp.responseText).results[0].geometry.location;
          Geocodings[loc] = coord;
          fn(coord.lat, coord.lng);
        }
        catch(err) {
          //GM_log("error! " + err);
        }
      }
    });
  }, 0);
}

function below(y1, x1, y2, x2, yc, xc) {
  var slope = (y2 - y1) / (x2 - x1);
  return yc < (y1 + (xc - x1) * slope);
}

function filtered(lat, lng) {
  // south of long island sound
  if(below(40.9301, -73.611, 41.261, -72.080, lat, lng))
    return true;
  // south of mt vernon
  if(below(40.9179, -73.919, 40.8728, -73.764, lat, lng))
    return true;
  return false;
}

function filterResults() {
  $$(".match_row").each(function(e) {
    var loc = Element.select(e, "p.location").first().textContent;
    geocode(loc, function(lat, lng) {
      //GM_log("geocoded " + loc + " to " + lat + ", " + lng);
      if(filtered(lat, lng)) {
        //GM_log("filtered " + loc);
        Element.hide(e);
      }
      else {
        //GM_log("didn't filter " + loc);
      }
    });
  });
}

unsafeWindow.Ajax.Responders.register({
  onComplete: function(resp) {
    if(resp.url.indexOf("/match") == 0)
      filterResults();
  }
});

filterResults();

