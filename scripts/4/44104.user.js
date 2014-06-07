// ==UserScript==
// @name           FogBugz Pretty Print
// @namespace      Webnick.UI
// @description    Only shows the article or case for printing. Removes the header and footer of FogBugz
// @include        http://www.yourFogBugzWebSite/*
// ==/UserScript==

setTimeout(function(){var o=document.createElement("style");o.setAttribute("media", "print");o.setAttribute("type", "text/css");o.innerHTML ="#idFooter,.articleBar,#tbFull,.wikiSearch,#idMeta{display:none;visibility: hidden;}#idContainer{margin:20px}";document.body.appendChild(o);},0);