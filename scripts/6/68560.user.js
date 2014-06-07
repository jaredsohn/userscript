// ==UserScript==
// @name           Browsershots - keyboard shortcuts
// @namespace      http://1daylater.com/
// @description    Adds some very handy keyboard shortcuts for browsing and manipulating your browsershots
// @include        http://browsershots.org/screenshots/*
// ==/UserScript==

//
// I know browsershots uses jQuery, so I can use that to make clean code
//
with (unsafeWindow) {

  //
  // The on-screen helper
  //
  var style = $ ("<style type=\"text/css\">\
  #shortcuts     {position: fixed; left: 50%; top: 0; line-height: 24px; width: 500px; text-align: center; margin-left: -250px; background: #D47700; color: #FFFFFF; font-weight: bold; z-index: 100; cursor: pointer; -webkit-border-radius: 0 0 20px 20px; -khtml-border-radius: 0 0 20px 20px; -moz-border-radius: 0 0 20px 20px; border-radius: 0 0 20px 20px;}\
  #shortcuts div {display: none;}\
  #shortcuts pre {padding: 5px; margin: 0 10px; line-height: 18px; font-family: monospace; text-align: left; background: #FFFFFF; color: #000000; font-weight: normal; -webkit-border-radius: 0 0 10px 10px; -khtml-border-radius: 0 0 10px 10px; -moz-border-radius: 0 0 10px 10px; border-radius: 0 0 10px 10px;}\
  #shortcuts a   {color: #FFFFFF; text-decoration: underline;}\
</style>");
  $ ("head").append (style);
  // The element
  var el = $ ("<div id=\"shortcuts\">press &quot;k&quot; to see keyboard shortcuts<div><pre>\
        RIGHT / LEFT - NAVIGATE SCREENSHOT\
\nSHIFT + RIGHT / LEFT - NAVIGATE SCREENSHOT FOR THIS BROWSER\
\nCTRL  + RIGHT / LEFT - NAVIGATE SCREENSHOT FOR THIS OS\
</pre>script by david king of <a href=\"http://1daylater.com/\">1daylater.com</a></div></div>");
  // Mouse events
  el.click (function () {
    if ($ ("#shortcuts div").css ("display") == "none") {
      $ ("#shortcuts div").slideDown ("slow");
    } else {
      $ ("#shortcuts div").slideUp ("slow");
    }
  });
  // Add the whole thing
  $ ("body").append (el);

  //
  // The keyboard shortcuts
  //
  $ (document).keydown (function (e) {
    // Next or Previous?
    var attr = (e.which == 39) ? "alt=Next" : ((e.which == 37) ? "alt=Previous" : false);
    if (attr) {
      // Selector
      var selector = e.ctrlKey ? "last" : (e.shiftKey ? "eq(1)" : "first");
      // Find the element
      var el = $ ("[" + attr + "]:" + selector);
      if (el.length) {
        document.location.href = el.parent ().attr ("href")
      }
      return false;
    }
    // Show shortcuts?
    if (e.which == 75) {
      $ ("#shortcuts").click ();
      return false;
    }
  });

}