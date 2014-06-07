// ==UserScript==
// @name           D2JSP_StylePreview
// @namespace      http://dknightstudios.org/
// @description    Adds a live preview of the forum styles to the settings page.
// @include        http://forums.d2jsp.org/settings.php

// @version        1.0.0
// @require        http://userscripts.org/scripts/source/74144.user.js
// ==/UserScript==

try {
	ScriptUpdater.check(101622, "1.0.0");
} catch(e) { };

var changeStyle = unsafeWindow.changeStyle;
var datStyleOption;

datStyleOption = document.forms[0].elements.namedItem("boardStyle");
datStyleOption.setAttribute("onClick", "changeStyle(document.forms[0].boardStyle.value);");

unsafeWindow.changeStyle = function(styleNum){
    var datStyle;
    
    datStyle = document.getElementsByTagName("style")[0];
    datStyle.innerHTML = "@import url(css/main" + styleNum + ".css);";
}