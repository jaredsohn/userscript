// ==UserScript==
// @name       TFS Description Largerer
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Making Work Item description a little larger
// @match      http://tfs03wm:8080/*
// @include      http://tfs03wm:8080/*
// @grant       none
// @copyright  2012+, kulicz
// ==/UserScript==
// === DEFINING CONSTANTS ===
var HEIGHT = "450px";
var TIMEOUT = 500;


// === FUNCTION ===
function makedescriptionlarger() {
     var description = document.getElementById("witc_108");
      if (!description) {
        setTimeout(makedescriptionlarger, TIMEOUT);
     } else {

       
        var description2 = document.getElementById("witc_108_txt");
        description.style.height= HEIGHT; 
        //description.style.resize= "vertical"; 
     
         
     }
     
     
}
makedescriptionlarger();
