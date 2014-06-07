// ==UserScript==
// @name           rebuild pic link
// @version        0.2
// @author         wenbob@gmail.com
// @namespace      http://userscripts.org/users/wenbob
// @description    rebuild pic link
// @include        http://www.imagefap.com/gallery*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
var jqscript = document.createElement("script");
jqscript.type = "application/javascript";
jqscript.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js";
document.body.appendChild(jqscript);

var script = document.createElement("script");
script.type = "application/javascript";
script.innerHTML = "$('#gallery img').each(function(i) {$(this).parent().attr('href', $(this).attr('src').replace(/thumb/g, 'full'));});";
document.body.appendChild(script);