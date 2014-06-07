// ==UserScript==
// @name        DebugPrice
// @namespace   DebugPrice
// @description 
// @version     1
// ==/UserScript==

function KeyCheck(e)
{
    if (e.ctrlKey && e.keyCode === 13){
      	FED.Util.addJsFile('http://staging.ch4.intra.sears.com/ue/home/priceDebug.js');
    }
}

window.addEventListener('keydown', KeyCheck, true);