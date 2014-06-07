// ==UserScript==
// @name           HD video tool 1.5
// @author         t0ma
// @include        
// @include        
// @version        1.5
// ==/UserScript==

var transition = "-webkit-transition: opacity 0.2s ease-in-out;" +
                 "-moz-transition: opacity 0.2s ease-in-out;" +
                 "-o-transition: opacity 0.2s ease-in-out;" +
                 "-ms-transition: opacity 0.2s ease-in-out;" +
                 "transition: opacity 0.2s ease-in-out";
location.pathname === "/details"?(function() {
  var $ = new Image, $$ = document.querySelector(".doc-banner-icon"), $$$ = document.createElement("style");
      $.src = "http://qrcode.kaywa.com/img.php?s=3&d=" + encodeURIComponent(location);
      $.id = "barCode"; $$$.appendChild(document.createTextNode(
    "#barCode {opacity: 0; width: 126px; position: absolute; left: -1px;" + 
      "-webkit-border-radius: 5px;" + 
      "-moz-border-radius: 5px;" + 
      "-o-border-radius: 5px;" + 
      "-ms-border-radius: 5px;" + 
      "border-radius: 5px;" + transition +
    "} .doc-banner-container:hover #barCode {opacity: 1}"
  )); $$$.type = "text/css"; document.body.appendChild($$$);
  $$.style.position = "relative"; $$.appendChild($);
})():(function() {
  var $ = document.createElement("style");
      $.appendChild(document.createTextNode(
      "#barCode {opacity: 0; position: absolute; left: 0px;" + transition +
      "} .search-results-item:hover #barCode {opacity: 1}"
    )); $.type = "text/css"; document.body.appendChild($);

  Array.prototype.forEach.call(document.querySelectorAll("a.thumbnail"), function($$) {
    var $ = new Image;
        $.src = "http://qrcode.kaywa.com/img.php?s=1&d=" + encodeURIComponent($$.href);
        $.id = "barCode";
    $$.style.position = "relative"; $$.appendChild($);
  });
})();

