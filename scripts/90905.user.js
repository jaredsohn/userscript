

// ==UserScript==
// @name    SwitchToSite
// @version 1.1
// @description Quickly Switch To Any Website At A Moments Notice (Version 1.1)
// @author Nareshkumar Rao
// @include  *
// ==/UserScript==


var iframe = document.createElement('iframe');
if(GM_getValue("firstRun")!=false)
{
GM_setValue("switchURL","http://www.google.com/");
GM_setValue("firstRun",false);
}

window.addEventListener('load', function(e)
{
var frameCSS = document.createElement('style');
frameCSS.innerHTML="#switchToGoog{position:absolute;top:0;left:0;border-width:0;width:"+window.innerWidth+";height:"+window.innerHeight+";visibility:hidden;}";
document.body.appendChild(frameCSS);

iframe.setAttribute('src', GM_getValue("switchURL"));
iframe.setAttribute('id', 'switchToGoog');
iframe.setAttribute('width', window.innerWidth);
iframe.setAttribute('height', window.innerHeight);
document.body.appendChild(iframe); 
}, false);


var isShown = false;

function showHideGoog()
{
iframe.width=window.innerWidth;
iframe.height=window.innerHeight;
window.scrollTo(0,0);

switch(isShown)
{
    case true:
    iframe.style.visibility="hidden";
    isShown = false;
    break;

    case false:
    iframe.style.visibility="visible";
    isShown = true;
    break;
}
}

function changeURL()
{
GM_setValue("switchURL",prompt("Please Enter The Switch To URL","http://"));
}

GM_registerMenuCommand( "Show/Hide To Specified Site" , showHideGoog);
GM_registerMenuCommand( "Change Switch-to URL", changeURL);

document.addEventListener('click', function(e)
{

if(e.metaKey && e.altKey)
{
showHideGoog();
}

},false);