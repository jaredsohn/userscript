// ==UserScript==
// @name           Kurier.at BIG Pictures
// @namespace      http://kurier.at
// @include        http://kurier.at/*
// @include        http://*.kurier.at/*
// @include        https://*.kurier.at/*
// @description    Shows a (mostly) bigger version of pictures in articles by clicking on them.
// @version        1.0
// @author         Christian Aysner
// @homepage       http://aysner.at/stuff/KBP
// ==/UserScript==

var jscript = document.createElement("script");
jscript.type = "text/javascript";

if ( !unsafeWindow.jQuery ) {

  jscript.src  = "/includes/js/jquery.js";
  document.getElementsByTagName("head")[0].appendChild(jscript);

  jscript = document.createElement("script");
  jscript.type = "text/javascript";
};

jscript.innerHTML = 
'var imgs = jQuery(".imgborder > img"); \r\n'+
'var src  = 0; \r\n'+
'if ( imgs ) src = imgs[0].src; \r\n'+
' '+ 
'if ( src.indexOf("_5") ) { //only article pages \r\n'+
' for (count=0; count < imgs.length; count++ ) { \r\n'+
'    imgs[count].style.cursor = "pointer";\r\n'+
'    src = imgs[count].src.replace("_5", "").replace("_2", "");\r\n'+
'    imgs[count].onclick = function () { window.open( this.src.replace("_5", "").replace("_2", ""), "fenster1", "width=700,height=530,status=no,scrollbars=no,resizable=yes,left=0"); };\r\n'+
'  }\r\n'+
'}\r\n';

document.getElementsByTagName("head")[0].appendChild(jscript);