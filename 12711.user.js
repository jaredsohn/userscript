// ==UserScript==
// @name           Germanize Google
// @namespace      http://userscripts.org/users/33515;scripts
// @description    Auf google.com einfacher nach deutschen Ergebnissen suchen
// @include        http://www.google.com/search*
// @exclude        http://google.de/*
// @exclude        http://google.com/*&hl=de
// ==/UserScript==

var id=document.getElementById("sd");
var hr=(window.location.href+"&hl=de");
var flag=document.createElement("img");
    flag.src="data:image/gif,GIF89a%12%00%0C%00U%00%00%2C%00%00%00%00%12%00%0C%00%A5%00%00%00%C9%05%03%13%0B%0B%F6%C5L%B4%89%25%C7%91%04%C5%96%2F%E3DD%F6VT%C8%89%02VTT666QJJ%FAVM%D366%F9hf2**%C786!%18%18hff%E9%B01%BE3%2C%F8II%E9PH%F3G%3E%F9%BFJ%DC%A4%1D%CE%A44%DB%A5(%D3%9B%16%EE%B9P%E7%B6F%CD%9C%18%B7%13%13%AD%02%01%CB%15%0B%D9%22%18%D0%0D%0D*''%17%17%17G%3E%3E%60YYFFF%C9''%E55%2B%DE%B18%D6%A59%93!!%E188%F155%D5B%3A%D9PP%D9LL%B2%07%07%D30'%CA%8C%12%E7gh%D6%17%17%E6((%A4%7C%1B%E3QQ%BEFF%D1%97%0D%00%00%00%06%8E%40%80pH%2C%1AO%8B%89bq%1A%0AL%0B%95%C2%99L%A1%24%02%A1%40%02Q1%A6%00%01%245a%98%B2a.%EA%CB%10%BEz%B8Y%25%24%12%D5B%2B%C7%81G%8B%08%23%0F%0809%01%85%25%3A1%16%0D%16%07%0EB%81%07%2B%85%01%25%24%2C%18%0D%08%8D%15%8F%176%23%85%23%96%98%08%172%11%9C%00%1E%1C7%09%AE%1D%1C%14%19%03%1E.%06%06%04B-%20%05%BD%1D%1A%14%03%C2%1F%1B%B8%B9%00%BC%09%05%3E%C0%B3%03%C4%C6%3BF%D3FA%00%3B";
    flag.setAttribute("onclick", "window.location.href='"+hr+"';");
    flag.setAttribute("style", "padding: 1px 0 0 3px; cursor:pointer;");
    flag.setAttribute("title", "Nach deutschen Ergebnissen suchen");
id.parentNode.insertBefore(flag, id.nextSibling);