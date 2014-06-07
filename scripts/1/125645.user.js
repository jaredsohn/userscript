// ==UserScript==
// @name            BuyMenu
// @author          HurPo
// @description     Moswar JS
// @namespace       *
// @version         1.1
// @include         http://www.moswar.ru/zakupka/
// @run-at          document-end
// ==/UserScript==

javascript:(function(){if($(".alert.buyItem-loaded").length>0){if($(".alert.buyItem-loaded").is(":visible")){return}else{$(".alert.buyItem-loaded").show()}}else{$("<script/>").attr({"type":"text/javascript","src":"http://www.kolumbus-muenchen.de/Miha/buyItem.js"}).appendTo("head");}})();