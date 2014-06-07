// ==UserScript==
// @name        Outlook no Ads
// @namespace   Outlook no Ads
// @description Hide ads on Outlook (Hotmail new UI)
// @include     http*://*.live.com/*
// @exclude     https://login.live.com/*
// @updateURL   http://userscripts.org/scripts/source/139836.meta.js
// @downloadURL	https://userscripts.org/scripts/source/139836.user.js
// @version     1.0.4
// ==/UserScript==

if (window.top != window.self)  //don't run on frames or iframes
  return;

//GM_addStyle("#SkyscraperContent { display:none; }");
//GM_addStyle(".App.Unmanaged .ContentRight.WithSkyscraper #ManagedContentWrapper { padding-right:10px;}");
GM_addStyle("#RightRailContainer { display:none; }");
GM_addStyle(".App.Unmanaged .ContentRight.WithRightRail #ManagedContentWrapper { padding-right:10px;}");
GM_addStyle(".App.Managed .RPOn .WithRightRail .FooterContainer, .App.Managed .RPOff .WithRightRail #ManagedContentWrapper .FooterContainer { right:0px; }");

// Hide when Reading pane activated
GM_addStyle(".Managed #MainContent { width:100%; }");

// For hide header icon
GM_addStyle("#myContainer {right: 0px; top:0px; position: absolute; z-index:999999999; padding:0px; }");
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
    GM_addStyle("#RightRailContainer { display:none; }");
    GM_addStyle("#msgListMainContainer { right:0px;}");
    GM_addStyle(".App.Managed .RPOn .WithRightRail .FooterContainer, .App.Managed .RPOff .WithRightRail #ManagedContentWrapper .FooterContainer { right:0px; }");

    document.getElementById ("myButton").removeEventListener ("click", ButtonHide, false);
    document.getElementById ("myButton").addEventListener ("click", ButtonShow, false);
    GM_setValue("is_hide", "yes");
}

function ButtonShow ()
{
    GM_addStyle("#RightRailContainer { display:inline-block; }");
    GM_addStyle("#msgListMainContainer { right:160px;}");
    GM_addStyle(".App.Managed .RPOn .WithRightRail .FooterContainer, .App.Managed .RPOff .WithRightRail #ManagedContentWrapper .FooterContainer { right:160px; }");

    document.getElementById ("myButton").removeEventListener ("click", ButtonShow, false);
    document.getElementById ("myButton").addEventListener ("click", ButtonHide, false);
    GM_deleteValue("is_hide");
}
