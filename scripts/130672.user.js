// ==UserScript==
// @name       G+ Centre layout
// @namespace  http://ohector.com
// @version    0.3
// @description  Centre the layout in Google Plus
// @include    https://plus.google.com*
// @copyright  2012+, Oliver Hector
// ==/UserScript==

function addcss(css){
    var head = document.getElementsByTagName('head')[0];
    var styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    if (styleElement.styleSheet) {   // IE
        styleElement.styleSheet.cssText = css;
    } else {                // the world
        styleElement.appendChild(document.createTextNode(css));
    }
    head.appendChild(styleElement);
}
document.getElementsByClassName('k-B-yd-nb')[0].style.position = "relative";
document.getElementsByClassName('k-B-yd-nb')[0].style.left = "50%";
if (window.innerWidth < 1440)
{
    document.getElementsByClassName('k-B-yd-nb')[0].style.width = "870px";
    document.getElementsByClassName('k-B-yd-nb')[0].style.marginLeft = "-425px";
}
else
{
    document.getElementsByClassName('k-B-yd-nb')[0].style.width = "1070px";
    document.getElementsByClassName('k-B-yd-nb')[0].style.marginLeft = "-535px";
    document.getElementsByClassName('RazREb ZI35oe c-wa-Da ncGWdc')[0].style.width = "800px";
    document.getElementsByClassName('Cw4PGf SG')[0].style.width = "750px";
    document.getElementsByClassName('lzqA1d')[0].style.width = "750px";
    addcss(".Wbhcze Te{width:700px}");
    addcss(".CPLjOe{width:700px}");
    addcss(".YE{width:700px}");
}