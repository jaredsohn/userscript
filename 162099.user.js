// ==UserScript==
// @name          YMP force download
// @description	  It forces YMP files (suse one click installers) to be downloaded instead of opened as text files in Google Chrome
// @author	  Daniel Skowroński <d.skowronski@ds.lublin.pl>
// @version       1.0
// @include       http://software.opensuse.org/*
//

// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
  jQ('a').each(function( index ) {
    if (jQ(this).attr("href").indexOf(".ymp") != -1){/*only on links with .ymp*/
      var n = jQ(this).attr("href");
      var beg = n.lastIndexOf("/");
      var end = n.indexOf("?");
      n = n.substring(beg+1, end);
      jQ(this).attr("download", n );/*attribute download is from html; it's tricky and very useful*/
    }
  });
}

addJQuery(main);
