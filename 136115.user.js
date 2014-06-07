// ==UserScript==
// @name            Chess.com - remove ads
// @icon            http://www.chess.com/favicon.ico
// @namespace       chess.com
// @include         http://www.chess.com*
// @include         https://www.chess.com*
// @run-at          document-end
// ==/UserScript==

(function() {
  if (window != top) return;
  
  var is_page = function(url) {
    return window.location.href.indexOf(url) != -1;
  }
  
  var noGM_addStyle = function(style) {
    var css = document.styleSheets[document.styleSheets.length - 1];
    css.insertRule(style, css.cssRules.length);
  }
  
  // remove ads & upgrade notices
  var apply_style = GM_addStyle || noGM_addStyle;
  var times = 0, meebo = null, topbanner = document.getElementById("tpb1");
  if (!is_page("/echess/conditions.html?id=") &&
      !is_page("/echess/analysis.html?id=")) {
    interval = setInterval(function() {
      apply_style("div[id*='ad_'], table#tpb1, *[id*='meebo'] {display:none !important}");
        
      if ((meebo = document.getElementById("meebo")))
        meebo.parentNode.removeChild(meebo);
      
      if (++times == 10) clearInterval(interval);
    }, 30);
  }
  
  // if setting conditional moves, allow unlimited conditional moves
  setTimeout(
    function() {
      if (is_page("/echess/conditions.html?id="))
        setInterval(
          function() {
            if (document.getElementById("c23") == null)
              document.getElementById("c23_ctl").innerHTML = "<button onclick=\"qc.pA('Conditions', 'c23', 'QClickEvent', '', 'c18'); return false;\" class=\"button-submit\" id=\"c23\" name=\"c23\">Add a New Line [+]</button>";
          }, 1000);
    }, 200);
  
})();
