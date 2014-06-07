// ==UserScript==
// @name           Harvest Project Search
// @version        1.0
// @namespace      harvest_project_search
// @include        https://*.harvestapp.com/*
// ==/UserScript==

// var console = unsafeWindow.console;

var hp = {
  
  init: function(){

    select = document.getElementById('project_selector');
    
    if(select != undefined){
     
      new Chosen(select);

      var styleElement = document.createElement("style");
      styleElement.type = "text/css";
      styleElement.appendChild(document.createTextNode('.select_overflow{ overflow:visible !important; } #project_selector_chzn{ margin-bottom:10px; min-width:290px !important; } div.chzn-container ul.chzn-results li{ padding: 4px 7px; } .chzn-results li.group-option{ padding-left: 14px !important; } .chzn-drop { width: 288px !important; } .chzn-search input{ width: 270px !important; }'));
      document.getElementsByTagName("head")[0].appendChild(styleElement);
      
    }

  }

}

setTimeout(function(){
  
  var script = document.createElement('script');
  script.textContent = '(' + hp.init.toString() + ')();';
  document.body.appendChild(script);

}, 0);