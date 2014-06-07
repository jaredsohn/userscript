// ==UserScript==
// @name           Penny Arcade Buttons
// @namespace      http://www.pennyarcade.com
// @description    This copies buttons from the bottom of the page to before the ads.
// @include        http://www.penny-arcade.com/comic/*
// ==/UserScript==

var adhoriz, buttons, newElement;
adhoriz = document.getElementById('adhoriz');
buttons = document.getElementById('buttons');
if (adhoriz && buttons) {
    newElement = document.createElement('div');
    newElement.setAttribute('id','staytopright');
    newElement.setAttribute('style','position:fixed;top:170px;left:10px;float:left;');
    newElement.innerHTML = "<span style='display:block;text-align:center;font-family:verdana,sans-serif;font-size:8pt;color:#111111;font-weight:bold;' align='center'><span style='background-color:#EEEEEE;'>Additional Buttons:</span><br/>" + buttons.innerHTML + "</center>";
    adhoriz.parentNode.insertBefore(newElement, adhoriz);
}
//adhoriz.style.display="none";