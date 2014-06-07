// ==UserScript==
// @name          Stop Socialcam
// @author        stopvideoads@gmail.com
// @description	  Allows you to watch Socialcam videos without installing the Facebook app
// @version       0.3
// @include       http://www.socialcam.com/*
// @include       http://socialcam.com/*
// @include       https://www.facebook.com/*
// ==/UserScript==

var USC = {
  modSocialcam: function() {
    var divs = document.getElementsByTagName("div");
    for(var i=0; i<divs.length;i++) {
      var div = divs[i];
      var url = div.getAttribute("url");
      if(url != null) {
        var new_url = "http://www.socialcam.com/v/";
        var id = url.split("/v/")[1].split("?")[0];
        div.setAttribute("url", new_url + id);
      }
    }
  },

  // For FB
  modFB: function() {
    var links = document.getElementsByTagName("a");
    for(var i=0; i<links.length; i++) {
      var link = links[i];
      var href = unescape(link.href);
      // Get the video link
      if(href.indexOf("connect/uiserver.php")>-1) {
        link.href = href.split("&redirect_uri=")[1].split("?")[0].split("&")[0];
        link.rel = "";
        link.target= "_blank";
      }
    }
  }
}

// For Socialcam
if(document.location.href.indexOf("http://socialcam.com") > -1) {
  USC.modSocialcam();
  window==top&&window.setInterval(USC.modSocialcam,3000);
}

// For FB
if(document.location.href.indexOf("https://www.facebook.com") > -1) {
  USC.modFB();
  window==top&&window.setInterval(USC.modFB,3000);
}