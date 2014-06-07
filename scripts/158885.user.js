// ==UserScript==
// @name           Lepro Image NSFW+
// @version        0.5.15
// @namespace      LeproImg
// @description    Makes images in posts look transparent. CSS3 added by InoY.
// @include        *leprosorium.ru/*
// @author         Marilyn Omen, Igor «InoY» Zvyagintsev
// ==/UserScript==

var script = document.createElement('script');
script.src = "http://inoyakaigor.ru/progs/userscripts/lepra.js";

(function(){
    function main(){
        try{
          document.body.appendChild(script);
          //console.log("Lepra NSFW user script added");
        }catch(e){
          console.log("Lepra NSFW user script NOT added");
        }
    }
    window.addEventListener('DOMContentLoaded', function(){main();}, false);
})();
