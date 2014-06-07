// ==UserScript==
// @name           Auto change stuff on hixie's datas uri kitchen
// @namespace      http://pile0nades.deviantart.com/
// @description    fills in forms on hixie's data uri kitchen with your options
// @include        http://software.hixie.ch/utilities/cgi/data/data
// ==/UserScript==

(function() {

  // get the stuff
  var mimetype = get("//input[@name='type']").snapshotItem(0);
  var base64 = get("//input[@name='base64']").snapshotItem(0);
  var textbox = get("//textarea[@name='content']").snapshotItem(0);

  // fill the values
  mimetype.value = "text/javascript;charset=utf-8";
  base64.checked = "checked";

  // blank textbox and focus it
  textbox.value = "";
  textbox.focus();

  //xpath function
  function get(query) {
    return document.evaluate(
      query,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
  }

})();