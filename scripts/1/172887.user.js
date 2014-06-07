// ==UserScript==
// @name       Bojana shoots the air
// @namespace  http://cyberwanderlustblog.wordpress.com/
// @version    2.0
// @description  Bojana shoots the air
// @include    http://*/*
// @include    https://*/*
// @copyright  code TOBIAS LEINGRUBER (http://tobi-x.com/) 2009 -  artistic interpretation Cyber Wanderlust
// ==/UserScript==

javascript:
(function()
 {kanye_sunglasses="<a href='javascript:(function(){document.getElementById(\"glasses\").style.display=\"none\";return})();'><img src='http://img826.imageshack.us/img826/8496/o1gd.png' width='100%25' heigth='100%25'></a>";var div_popup;div_popup=document.createElement('div');div_popup.innerHTML=kanye_sunglasses;div_popup.id="glasses";div_popup.setAttribute("style","position:fixed;z-index:10000;top:auto;bottom:-5px;right:0px;width:100%25;height:100%25;");document.getElementsByTagName("body")[0].appendChild(div_popup);})();