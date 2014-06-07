(function() {

// ==UserScript==
// @name           jQuery AJAX Latency Display
// @description    Shows the time between ajaxStart() and ajaxStop(), jQuery is Required
// @author         Johannes Hoppe
// ==/UserScript==

  var insertScriptContent = "\
    var stopwatch;\
    \
    $(\"#latencyDisplay\").ajaxStart(function () {\
      stopwatch = new Date();\
      $(this).html(\"\");\
    });\
    \
    $(\"#latencyDisplay\").ajaxStop(function () {\
      elapsedTimeInSeconds = (new Date() - stopwatch) / 1000;\
      $(this).html(\"AJAX Timer: \" + elapsedTimeInSeconds + \"s\");\
    });"

  var insertDiv = document.createElement("div");
  insertDiv.id = "latencyDisplay";
  document.body.appendChild(insertDiv);
      
   
  var insertScript = document.createElement("script");
  insertScript.type = "text/javascript";
  insertScript.text = insertScriptContent;
  document.getElementsByTagName("head")[0].appendChild(insertScript);

})();



