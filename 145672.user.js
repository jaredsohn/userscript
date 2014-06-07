// ==UserScript==
// @id             oW.request.log.indamail.hu-013bf4ca-7b15-4644-942a-0a92dcdfdbb5@52349.userscripts.org
// @name           Indamail oW.request logger
// @version        0.1
// @namespace      
// @author         xabolcs
// @description    
// @include        http://inda16.indamail.hu/*
// @updateURL      https://userscripts.org/scripts/source/145672.meta.js
// @run-at         document-end
// ==/UserScript==


(function() {
  function IndaMailOWRequest(aIMail) {

    function oWrequest(sAction, fnCallback, sId, tomb_adat, tOut) {
      log("sAction: " + (sAction ? sAction : "undefined"));
      log("fnCallback: " + typeof(fnCallback) );
      log("sId: " + sId);
      log("tomb_adat: " + (tomb_adat ? tomb_adat.toSource() : "undefined"));
      log("tOut: " + tOut);
    }

    var oldRequest = unsafeWindow.oW.request;
    if (oldRequest) {
      unsafeWindow.oW.request = function (sAction, fnCallback, sId, tomb_adat, tOut) {
        try {
          with (unsafeWindow) {
            oldRequest.call(oW, sAction, fnCallback, sId, tomb_adat, tOut);
          }
          oWrequest(sAction, fnCallback, sId, tomb_adat, tOut);
        } catch (e) {
          log("err! " + e);
        }
      }
      log("patched!");
    }
  }

  var initialized = false;
  var tries = 10;

  function log(aMsg) {
    setTimeout(function() { throw new Error("[im.oW.request log] " + aMsg); }, 0);
  }

  function initialize(aArgs) {
    if (!initialized && tries > 0) {
        setTimeout(function() {
            initialize(aArgs);
            initialized = unsafeWindow.oW && typeof(unsafeWindow.oW) == "object";
            tries--;
            log("init: again!");
        }, 100, aArgs);
    } else if (initialized) {
      initialized = new IndaMailOWRequest(); 
    }
  }

  window.addEventListener("load", function() {
    window.removeEventListener("load", arguments.callee, true);
    if (window.location.toString().search("indamail.hu/blank.html") < 0) {
      initialize();
    }
  }, true);

})();
