// ==UserScript==
// @name           Youtube Mpeg4 player
// @namespace      http://ctrl-c.org
// @description    replace youtube embeds with h264 video player, i.e. Totem
// @include        *
// ==/UserScript==

(function() {
  if (document.location.href.substr(0, 28) == "http://www.youtube.com/watch") {

      function getFLAddress() {
          return document.getElementById("movie_player").getAttribute("flashvars");
      }

      function getAddressVariable(address, variable) {
          return address.toString().split(variable+"=")[1].split("&")[0];
      }

      flAddress = getFLAddress();
      video_id = getAddressVariable(flAddress, "video_id");
      t = getAddressVariable(flAddress, "t");
      flVideoH264v2 = "http://youtube.com/get_video?video_id="+video_id+"&t="+t+"&fmt=18";

      var e = document.getElementById('movie_player');
    var ne = document.createElement('embed');
    ne.src = flVideoH264v2;
    ne.type = 'video/mp4';
    ne.width = 640;
    ne.height = 388;
    ne.setAttribute('autoplay', 'true');
    ne.setAttribute('controls', 'true');
    e.parentNode.insertBefore(ne, e.nextSibling);
    e.parentNode.removeChild(e);
  }
  else {
    var embeds = document.getElementsByTagName('embed');
    for(i=0;i<embeds.length;i++) {
      var e = embeds[i];
      if(e.type=="application/x-shockwave-flash" && e.src.substr(0, 23) == "http://www.youtube.com/") {
        var r = new RegExp(/\/v\/(.*?)&/);
        var m = e.src.match(r);
        if(m) {
          var yid = m[1];
          var ne = document.createElement('embed');
          ne.src = 'http://ctrl-c.org/api/youtube/video/' + yid + '.mp4';
          ne.type = 'video/mp4';
          ne.width = e.width;
          ne.height = e.height;
          ne.setAttribute('autoplay', 'false');
                e.parentNode.insertBefore(ne, e.nextSibling);
                e.parentNode.removeChild(e);
        }
      }
    }
  }
})();