// ==UserScript==
// @name           NL cheater V2
// @namespace      Hans Goedegebuure
// @include        http://www*.camorraworld.nl/*
// @exclude        http://www*.camorraworld.nl/casino/*
// @exclude        http://www*.camorraworld.nl/crime/popo.php
// ==/UserScript==

if (!GM_getValue("meldingGegeven", false)){
    GM_setValue("meldingGegeven", true);
    alert("Visit http://www.hansgoed.nl for cheater V3");
}