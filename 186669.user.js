// ==UserScript==
// @name           Quake Live Overlapping Menu Fix
// @version        1.0
// @namespace      beham.biz
// @description    Enlarges the menu tab section to hold 2 rows and provide more space for other scripts.
// @author         PredatH0r
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// ==/UserScript==

(function (aWin) { // scope
  var quakelive = aWin.quakelive;
  var oldShowContent = quakelive.ShowContent;
  quakelive.ShowContent = function (v) {
    oldShowContent.call(quakelive, v);
    fixContent();
  };

  function fixContent() {
    try {
      console.log("fixing menu...");
      var $nav = $(".postlogin_nav");
      if ($nav.length == 0) return;
      var $ul = $nav.find("ul");
      if ($ul.length == 0) return;
      $nav.css({ "background-color": "#404040", "height": "80px" });
      $ul.css({ "position": "relative", "top": "7px", "bottom": "" });
      $("#qlv_postlogin_matches").css("height", (502 - 25) + "px");
    }
    catch (ex) { }
  };

  fixContent();
})(window);

			