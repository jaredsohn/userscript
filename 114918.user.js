// ==UserScript==
// @name sigg
// @description sigg
// ==/UserScript==

jquery = document.createElement('script');
jquery.setAttribute("type", "text/javascript");
jquery.setAttribute("src", "http://code.jquery.com/jquery-1.6.4.min.js");
document.getElementsByTagName("head")[0].appendChild(jquery);

alert("chuj");
$('#site').hide();

