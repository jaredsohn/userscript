// ==UserScript==
// @name          Gmail no Ads
// @namespace     Gmail no Ads
// @description   Hide Gmail Ads, Increase workspaces
// @version       1.0.8
// @gant          GM_addStyle
// @gant          GM_getValue
// @gant          GM_setValue
// @gant          GM_deleteValue
// @include       https://mail.google.com/*
// @exclude       https://mail.google.com/*view=btop*
// @exclude       https://accounts.google.com/*
// @updateURL     http://userscripts.org/scripts/source/135483.meta.js
// @downloadURL	  https://userscripts.org/scripts/source/135483.user.js
// Thank you Lee  http://userscripts.org/topics/86458
// ==/UserScript==

if (window.top != window.self)  //don't run on frames or iframes
  return;

// hiding right col altogether
GM_addStyle(".Bu { display:none; }");
GM_addStyle(".Bu:first-child { display:table-cell; }");
GM_addStyle(".Bu .hx { padding-right:0; }");

// hiding bottom ads
GM_addStyle(".nH .PS { display:none; }");

// hiding web clips
GM_addStyle(".mq { display:none; }");
GM_addStyle(".AT { display:none; }");
GM_addStyle(".nH .UJ { border-top:0px solid #000000;}");

// Increase auto-complete email address panel width on composing page
GM_addStyle(".ah.aiv {max-width:600px; width:92%;}");
GM_addStyle(".aq .ah {width:600px;}");
GM_addStyle(".aq .am {max-width:90%;}");

// Increase auto-complete email address panel width on invite to chat
GM_addStyle(".uR.ah {min-width:800px;}");
GM_addStyle(".u1 {width:65%;}");

// Reduce blank space at bottom of page
GM_addStyle(".l2.ov {padding-bottom:10px;}");

// For hide header icon
GM_addStyle("#myContainer {right: 0px; top:0px; position: absolute; z-index:999; padding:0px; }");
GM_addStyle("#myButton { padding-bottom: 10px; padding-left: 10px; padding-right: 5px; padding-top: 0px; cursor:row-resize; }");

var newDiv       = document.createElement ('div');
newDiv.innerHTML = '<img id="myButton" alt="" border="0">';
newDiv.setAttribute ('id', 'myContainer');
document.body.appendChild (newDiv);
document.getElementById ("myButton").addEventListener ("click", ButtonHide, false);

if (GM_getValue("is_hide")){
    ButtonHide();
}

function ButtonHide ()
{
    GM_addStyle(".w-asV.aiw { display:none ; }");
    document.getElementById ("myButton").removeEventListener ("click", ButtonHide, false);
    document.getElementById ("myButton").addEventListener ("click", ButtonShow, false);
    GM_setValue("is_hide", "yes");
}

function ButtonShow ()
{
    GM_addStyle(".w-asV.aiw { display:inline-block ; }");
    document.getElementById ("myButton").removeEventListener ("click", ButtonShow, false);
    document.getElementById ("myButton").addEventListener ("click", ButtonHide, false);
    GM_deleteValue("is_hide");
}
