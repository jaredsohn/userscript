// ==UserScript==
// @name           fr.sh.reddit
// @description    Hilights fresh stories.
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// @exclude        http://reddit.com/user/*
// @exclude        http://*.reddit.com/user/*
// @exclude        http://reddit.com/info/*
// @exclude        http://*.reddit.com/info/*
// ==/UserScript==

(function() {
  //GM_log("got here 2");

  /* 
   * filter_site: hide reddit elements that match filters.
   * 
   * (note: chunks of this function were shamelessly borrowed from the
   * reddit block xkcd script)
   */
  filter_site = function(cfg) {
    var tbl = document.getElementById('siteTable');
    if (!tbl) {
      GM_log("Couldn't find siteTable");
      return 0;
    }

    var outerdivs = tbl.getElementsByTagName('div');
    for (var i = 0; i < outerdivs.length; i++) {
      var outerdiv = outerdivs[i];

      if (/^thingrow/.test(outerdiv.id)) {

        var ary = outerdiv.getElementsByTagName('span');
        var bgcolor = "";
        for (var j = 0; j < ary.length; j++) {
          var span = ary[j];
          if (/^comment_/.test(span.id)) {
            var posted = span.previousSibling.previousSibling.nodeValue;
            //GM_log(posted);
            if (/posted\xA0\d+ minute/.test(posted))
              bgcolor = "rgb(191,255,63)";		// 25%
            if (/posted\xA0[12] hour/.test(posted))
              bgcolor = "rgb(127,255,127)";		// 50%
            if (/posted\xA0[345] hour/.test(posted))
              bgcolor = "rgb(204,255,204)";		// 80%

          }
        }

        if (bgcolor) {
          outerdiv.style.backgroundColor = bgcolor;
          ary = outerdiv.getElementsByTagName('a');
          for (var j = 0; j < ary.length; j++) {
            ary[j].style.backgroundColor = bgcolor;
          }
        }
      }
    }
    //GM_log("got here");
  }

  // run everything
  filter_site();

})();