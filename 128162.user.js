// ==UserScript==
// @name       Internet Yarning 
// @namespace  http://internetjockey.posterous.com/
// @version    1.0
// @description  Yarn the websites when it's boring and cold!
// @include    http://*/*
// @include    https://*/*
// @copyright  code TOBIAS LEINGRUBER (http://tobi-x.com/) 2009 -  artistic interpretation Cyber Wanderlust
// ==/UserScript==

javascript:
(function()
 {kanye_sunglasses="<a href='javascript:(function(){document.getElementById(\"glasses\").style.display=\"none\";return})();'><img src='http://img16.imageshack.us/img16/5595/yarng.png' width='100%25' heigth='100%25'></a>";var div_popup;div_popup=document.createElement('div');div_popup.innerHTML=kanye_sunglasses;div_popup.id="glasses";div_popup.setAttribute("style","position:fixed;z-index:10000;top:auto;bottom:2px;right:0px;width:100%25;height:100%25;");document.getElementsByTagName("body")[0].appendChild(div_popup);})();