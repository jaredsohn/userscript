// ==UserScript==
// @name           CooleSpiele.com | [Werbe-Blocker]
// @namespace      CooleSpiele.com
// @description    Die Spiele starten sofort und die Werbung wird geblockt.
// @include        http://*coolespiele.com/*
// ==/UserScript==

document.getElementById("loading").style.display = "none";

document.getElementById("spiele_container").style.width = "640px";

document.getElementById("spiele_container").style.height = "480px";

document.getElementById("slidercontainer").style.display = "inline";

document.getElementById("td_content_oben_li").style.visibility = "hidden";

document.getElementById("td_content_oben_re").style.visibility = "hidden";

document.getElementById("ad_center").style.visibility = "hidden";

document.getElementById("ad_center").style.height = "0px";

document.getElementById("content_ad_2").style.visibility = "hidden";

document.getElementById("content_ad_2").style.height = "0px";