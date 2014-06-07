// ==UserScript==
// @name          Cleaner Neptune's Pride
// @namespace     http://np.ironhelmet.com/game
// @description   Removes the ads from the bottom of Neptune's Pride
// @include       http://np.ironhelmet.com/game*
// ==/UserScript==
window.setTimeout(function() {
  try {
    var table = document.body.getElementsByTagName("table")[0],
      rows = table.getElementsByTagName("tr"),
      titleRow = rows[0],
      adRow = rows[2];
    adRow.parentNode.removeChild(adRow);
    titleRow.style.height = "0px";
    titleRow.style.fontSize = "10px";
    var titleDivs = titleRow.getElementsByTagName("div");
    for (var i in titleDivs) {
      var titleDiv = titleDivs[i];
      if (titleDiv && titleDiv.style && titleDiv.style.margin) {
        titleDiv.style.margin = "0px";
      }
    }
  }
  catch (ex) {
    //alert("Exception: " + ex);
  }
}, 0);
