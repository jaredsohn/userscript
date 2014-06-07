// ==UserScript==
// @name           HipHopDX
// @namespace      hiphopdx
// @include        http://www.hiphopdx.com/index/singles/*
// ==/UserScript==

// Add jQuery
  var GM_JQ = document.createElement('script');
  GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js';
  GM_JQ.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(GM_JQ);

  function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
  }

  GM_wait();

  function letsJQuery() {
    if(!HipHopDX) var HipHopDX = {}

    HipHopDX.addDownloadButtonForTrack = function(){
      var track_id = $("#playstripe > span > a:first").attr("id").split("-")[1];
      var url = "#download";

      $.post("http://www.hiphopdx.com/index/singles/" + 'ajax.track', { id: track_id }, function(data){ 
        url = data.file;
        $("#playstripe").attr({"style": "height: 85px;"});

        $("#playstripe > span").append(
          $("<span>").attr({"id": "gm-download"}).append(
            $("<a>").attr({"style": "margin-top: 10px;", "class": "downloadBtn left adjust red medium awesome", "id": "downloadBtn-" + track_id, "href": url}).html("Download")
          )
        );
      });
    };

    $(document).ready(function(){
      $("#fwbanner").remove();
      $("#fw_promo").remove();

      HipHopDX.addDownloadButtonForTrack();
    });
  };