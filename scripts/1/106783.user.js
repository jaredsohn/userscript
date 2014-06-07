// ==UserScript==
// @name           LDS Directory Keep-Alive
// @namespace      Sapient Development, LLC
// @description    Keeps the site from signing me out because of inactivity
// @include        https://lds.org/directory*
// @include        https://lds.org/directory/
// ==/UserScript==

setTimeout(function() {
  try {
    // hit this URL so that it stays alive
    if(unsafeWindow.jQuery) {
      unsafeWindow.jQuery.ajax({
        url: "https://lds.org/directory/services/ludrs/mem/map/19228891588",
        dataType: "json",
        data: null,
        success: function(){
          GM_log((new Date()).toUTCString() + " :: Keep-Alive Succeeded.");
        }
      });
    } catch(e) {
      GM_log("Greasemonkey :: " + e.toString());
    }
  }
}, 60000);
