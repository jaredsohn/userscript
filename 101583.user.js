// ==UserScript==
// @name           D2JSP_CoreTabs
// @namespace      http://dknightstudios.org/LS
// @include        http://forums.d2jsp.org/forum.php?f=273*
// @include        http://forums.d2jsp.org/forum.php?f=35*

// @version        1.0.0
// @require        http://userscripts.org/scripts/source/74144.user.js
// ==/UserScript==

try {
	ScriptUpdater.check(101583, "1.0.0");
} catch(e) { };

var theDL, firstDT, f, urlVars, hasVars;
var SCTab = document.createElement("dt");
var HCTab = document.createElement("dt");
HCTab.style.marginRight = "15px";

urlVars = document.URL.substring(document.URL.indexOf('?')+1, document.URL.length);
urlVars = urlVars.replace('&', ';');
eval(urlVars);


if(f == 35){
    SCTab.setAttribute("class", "ust");
}
else{
    HCTab.setAttribute("class", "ust");
}

SCTab.innerHTML = '<a href="?f=273">Softcore</a>';
HCTab.innerHTML = '<a href="?f=35">Hardcore</a>';

theDL = document.getElementsByTagName("dl")[0];
firstDT = theDL.getElementsByTagName("dt")[0];

theDL.insertBefore(SCTab, firstDT);
theDL.insertBefore(HCTab, firstDT);