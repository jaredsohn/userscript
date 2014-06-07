// ==UserScript==
// @id             orl.ec-5170295c-8362-4e0b-96c0-8e2af80f3ef6@scriptish
// @name           Orlec design fix
// @version        3.0 beta
// @namespace      inoyakaigor.ru
// @license        GNU GPL
// @author         Игорь InoY Звягинцев
// @description    Фикс дизайна плюс несколько полезных функций
// @updateURL      http://inoyakaigor.ru/progs/orlec/orlecdf.user.js
// @include        http://orl.ec/*
// @include        http://www.orl.ec/*
// @run-at         document-end
// @icon data:image/png;base64,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
// ==/UserScript==

var script = document.createElement('script');
script.src = "http://inoyakaigor.ru/progs/orlec/orlecdf.js";

(function(){
    function main(){
        try{
          document.body.appendChild(script);
          //console.log("Orlec design fix user script added");
        }catch(e){
          console.log("Orlec design fix user script NOT added");
        }
    }
    window.addEventListener('DOMContentLoaded', function(){main();}, false);
})();