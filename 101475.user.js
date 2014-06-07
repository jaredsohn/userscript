// ==UserScript==
// @name           tweetranslate
// @namespace      Developed by Murilo Prestes (@neuromancer_br)
// @description    Use this extension to your tweets translate quickly into twitter.
// @include        http://twitter.com/*
// @include        http://www.twitter.com/*
// ==/UserScript==

var divTag = document.createElement("div");
var selectlanguageIN = '<select id="source_language"><option value="en">English</option><option value="es">Español</option><option value="de">Deutsch</option><option value="fr">Française</option><option value="ja">日本</option><option value="pt">Português</option><option value="ru">Россию</option></select>';
var selectlanguageOUT = '<select id="target_language"><option value="en">English</option><option value="es">Español</option><option value="de">Deutsch</option><option value="fr">Française</option><option value="ja">日本</option><option value="pt">Português</option><option value="ru">Россию</option></select>';

divTag.id = "translate";
divTag.style.margin = "0px auto";
divTag.innerHTML = '<script src="http://yester.com.br/tweetranslate.js"></script><br>' + selectlanguageIN + '<br> ' + selectlanguageOUT + '<br><input style="margin-top: 10px;" type="button" value="Translate" onClick="startranslate()" />';
document.getElementById("tweeting_controls").appendChild(divTag);