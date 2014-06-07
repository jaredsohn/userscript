// ==UserScript==
// @name           Pardus Quick-List Auto-filler
// @namespace      pardus.at
// @description    Automatically fills in a quicklist from an external webpage
// @author         Rhindon
// @version        0.9
// @include        http://orion.pardus.at/ambush.php
// ==/UserScript==

  var url = "http://your.url.here.com/path/to/quicklist.html";
  var starttext = "[quicklist]";
  var endtext = "[/quicklist]";

(function() {

  GM_xmlhttpRequest({
    method:"GET",
    url:url,
    onload:function(details) {
      text = details.responseText;

	  alert(text);
      
      text = text.substring(text.indexOf(starttext) + starttext.length);
      text = text.substring(0, text.indexOf(endtext));
      
      text = text.replace(/\n/g, "");
      
      document.getElementsByName("readlist")[0].value = text;
    }
  })
})();