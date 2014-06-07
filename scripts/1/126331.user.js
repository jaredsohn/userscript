// ==UserScript==
// @name           WordPress Idiot filter
// @namespace      wpif
// @description    Filters useless comments out, by looking at the names.
// @include        http://*.wordpress.com/*
// ==/UserScript==
(function wpif() {
  var idioten = ["knallbonbon"] // Namen hier kommagetrennt und in Anführungszeichen eintragen.
  var kommentarNamen = document.evaluate("/html/body/div/div[2]/div[3]/div/div[2]/ol//div/div/cite/span", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
  for (var k = 0; k < kommentarNamen.snapshotLength; ++k) {
    var kommentarName = kommentarNamen.snapshotItem(k)
    if (idioten.indexOf(kommentarName.firstChild.data) != -1) {
      var muell = kommentarName.parentNode.parentNode.parentNode.parentNode
      muell.parentNode.removeChild(muell)
    }
  }
})()