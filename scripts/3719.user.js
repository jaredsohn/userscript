// ==UserScript==
// @name          Myspace Ad Remover 2.0
// @include       *myspace.com*
// @description   Cleanly removes ads from Myspace.com, without leaving large whitespace
// ==/UserScript==

//
// globals
//
var allElements, thisElement;

//
// addGlobalStyle() function from "aintitreadable.user.js"
// at http://diveintogreasemonkey.org/casestudy/aintitreadable.html
//
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//
// override fixed height header box (default is 125px)
// which keeps whitespace even after we delete the ad
//
addGlobalStyle( '#header{background-color:#039;color:#FFF;' +
    'height:auto; padding:5px; padding-top:8px;}' );

//
// this is necessary, but not sufficient, to disable oas_ad()
// which fills the DOM with IFRAME ads
//
unsafeWindow.oas_ad = function oas_ad() { return; };

//
// eliminate reference to ASJS031.js which contains the definition of oas_ad()
// as well as SCRIPT blocks containing calls to oas_ad()
// (the previous redefinition of oas_ad() is also required)
//
allElements = document.getElementsByTagName('SCRIPT');
for (var i = 0; i < allElements.length; i++)
{
    thisElement = allElements[i];
    if ( /ASJS031/.test( thisElement.src ) || /oas_ad/.test( thisElement.text ) || /yieldmanager/.test( thisElement.text ) )
    {
        thisElement.parentNode.removeChild(thisElement);
    }
}

//
// resize all IFRAMES to 0x0
// (deleting them from the DOM simply results in their being regenerated)
//
allElements = document.getElementsByTagName('IFRAME');
for (var i = 0; i < allElements.length; i++)
{
    thisElement = allElements[i];
    thisElement.src    = 'about:blank';
    thisElement.height = 0;
    thisElement.width  = 0;
    //thisElement.parentNode.removeChild(thisElement);
}

//
// remove top header TD's (fixed height)
//
allElements = document.getElementsByTagName('TD')
for (var i = 0; i < allElements.length; i++)
{
    var TD = allElements[i];
    if ( TD.height == 96 )
    {
        TD.parentNode.removeChild(TD);
        break;						// only one of these per page
    }
}

//
// remove all offending ad-containing DIV's
//
allElements = document.getElementsByTagName('DIV');
for (var i = 0; i < allElements.length; i++)
{
    thisElement = allElements[i];
    switch ( thisElement.id )
    {
        case "ad300x100":
        case "ad440x160":
        case "advert":
        case "squareAd":
            thisElement.parentNode.removeChild(thisElement);
            break;
    }
}

