// ==UserScript==
// @name        Salty Bet Fighter Stats
// @namespace   saltybet
// @description Shows the stats for the current fighters while betting is open (for illuminati only)
// @include     http://www.saltybet.com/
// @grant       none
// @version     1
// ==/UserScript==
/*
 * object.watch polyfill
 *
 * 2012-04-03
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

// object.watch
if (!Object.prototype.watch) {
  Object.defineProperty(Object.prototype, "watch", {
      enumerable: false
    , configurable: true
    , writable: false
    , value: function (prop, handler) {
      var
        oldval = this[prop]
      , newval = oldval
      , getter = function () {
        return newval;
      }
      , setter = function (val) {
        oldval = newval;
        return newval = handler.call(this, prop, oldval, val);
      }
      ;
      
      if (delete this[prop]) { // can't watch constants
        Object.defineProperty(this, prop, {
            get: getter
          , set: setter
          , enumerable: true
          , configurable: true
        });
      }
    }
  });
}

// object.unwatch
if (!Object.prototype.unwatch) {
  Object.defineProperty(Object.prototype, "unwatch", {
      enumerable: false
    , configurable: true
    , writable: false
    , value: function (prop) {
      var val = this[prop];
      delete this[prop]; // remove accessors
      this[prop] = val;
    }
  });
}

window.watch("betstate", function (id, oldval, newBetState) {
  if ("open" == newBetState) {
    $.ajax({
        type: "get",
        url: "/ajax_get_stats.php",
        data: "",
        dataType: "json",
        cache: "false",
        timeout: 30000,
        success: function (data) {
           p1name = data.p1name;
           p1totalmatches = data.p1totalmatches;
           p1winrate= data.p1winrate;
           p1tier = data.p1tier;
           p1life = data.p1life;
           p1meter = data.p1meter;

           p2name = data.p2name;
           p2totalmatches = data.p2totalmatches;
           p2winrate = data.p2winrate;
           p2tier = data.p2tier;
           p2life = data.p2life;
           p2meter = data.p2meter;

           $("#bettors1").append("<p><strong>Total Matches:</strong> " + p1totalmatches + "</p>");
           $("#bettors1").append("<p><strong>Win Rate:</strong> " + p1winrate + "%</p>");
           $("#bettors1").append("<p><strong>Tier:</strong> " + p1tier + "</p>");
           $("#bettors1").append("<p><strong>Life:</strong> " + p1life + "</p>");
           $("#bettors1").append("<p><strong>Meter:</strong> " + p1meter + "</p>");

           $("#bettors2").append("<p><strong>Total Matches:</strong> " + p2totalmatches + "</p>");
           $("#bettors2").append("<p><strong>Win Rate:</strong> " + p2winrate + "%</p>");
           $("#bettors2").append("<p><strong>Tier:</strong> " + p2tier + "</p>");
           $("#bettors2").append("<p><strong>Life:</strong> " + p2life + "</p>");
           $("#bettors2").append("<p><strong>Meter:</strong> " + p2meter + "</p>");

        }
    });
  }
  return newBetState;
});