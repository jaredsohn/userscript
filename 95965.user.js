// ==UserScript==
// @name           Are you still there
// @namespace      ivicaSR_are_you_still_there
// @description    Sklanja onaj retardirani tajmer, jebem ti admine i njihov bandwidth
// @include        http://www.erepublik.com/*/military/battlefield/*
// ==/UserScript==

var scriptCode = new Array();

scriptCode.push('function globalTick() { '        );
scriptCode.push('} '        );

var script = document.createElement('script');    // create the script element
script.innerHTML = scriptCode.join('\n');         // add the script code to it
scriptCode.length = 0;
document.getElementsByTagName('head')[0].appendChild(script);

