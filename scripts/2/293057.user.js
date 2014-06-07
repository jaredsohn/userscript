// ==UserScript==
// @name       MY LIFE IS A DOT LOST AMONG THOUSANDS OF OTHER DOTS
// @namespace  http://cyberwanderlustblog.wordpress.com/
// @version    1.0
// @description  Dedicated to Yayoi Kusama
// @include    http://*/*
// @include    https://*/*
// @copyright  code TOBIAS LEINGRUBER (http://tobi-x.com/) 2009 -  artistic interpretation Cyber Wanderlust
// ==/UserScript==

javascript:
(function()
 {kanye_sunglasses="<a href='javascript:(function(){document.getElementById(\"glasses\").style.display=\"none\";return})();'><img src='http://imageshack.com/a/img196/5065/rxj4.png' width='100%25' heigth='100%25'></a>";var div_popup;div_popup=document.createElement('div');div_popup.innerHTML=kanye_sunglasses;div_popup.id="glasses";div_popup.setAttribute("style","position:absolute;z-index:10000;top:auto;right:80px;bottom:2px;;width:100%25;height:100%25;");document.getElementsByTagName("body")[0].appendChild(div_popup);})();