// ==UserScript==
// @name            The West Tools Beta
// @version         0.2
// ==/UserScript==

document.getElementById("footer_menu_right").innerHTML = "<span id='toolz'><a href='#' onclick='if(this.innerHTML = \'<img src=\\'http://mxler.uw.hu/tw/tools.png\\' alt=\\'\\'>\'){this.innerHTML += \'<a onclick=\\\'jQuery.getScript(\\\\'http://mxler.uw.hu/tw/openCalc.js\\\\');\\\' \'>Menü</a>\'; } '><img src='http://mxler.uw.hu/tw/tools.png' alt=''></a></span>" + document.getElementById("footer_menu_right").innerHTML;