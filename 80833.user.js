// ==UserScript==
// @name            Bigger otobusim.co.il map 
// @namespace       http://otobusim.co.il
// @description     Enlarges the maps displayed by "otobusim.co.il" to a more usable size
// @include         http://otobusim.co.il/*/PlacesMap.asp*
// @include         http://www.bus.co.il/*/PlacesMap.asp*
// ==/UserScript==

function addStyle(css)
{
    var style = document.createElement('style');
    style.innerHTML = css;
    style.type='text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
}

function replaceText(original,replacement)
{
    document.body.innerHTML = document.body.innerHTML.replace(new RegExp(original,'gi'),replacement);
}

var W = screen.width-70;
var H = screen.height-380;

addStyle(".MainTable { width: " +  W.toString() + "px;  ! important; }");
replaceText("height: *300px;","height: " + H.toString() + "px;");
replaceText("width: *500px;","width: " + (W-260).toString() + "px;");
