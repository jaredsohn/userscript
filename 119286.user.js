// ==UserScript==
// @name           Top Idiot
// @namespace      topIdiot
// @description    Top Idiot
// @include        http://www.erepublik.com/en/citizen/profile/*
// ==/UserScript==

(function(){

  var p = unsafeWindow;
  
  // chrome 
  if(window.navigator.vendor.match(/Google/)) {
      var div = document.createElement("div");
      div.setAttribute("onclick", "return window;");
      p = div.onclick();
  };
  var jQuery = p.jQuery;
  
  createUI();
  
  function createUI(){
    var idiot = jQuery("strong:contains('Top Fighter')");
    jQuery(idiot).html('Top Idiot');
    jQuery(idiot).parent().next().html("Pay the highest money daily in eRepublik for 30 different days. <br /><br />0/30 days in <a href=\"http://www.erepublik.com/en/rankings/damage/1\" title=\"\">Top Fighters</a>");
  }
  
})();