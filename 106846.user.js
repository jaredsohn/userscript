// ==UserScript==
// @name           Nokia code fixer
// @namespace      nokia
// @description    fixes the ugly look of the C++ code sections
// @include        http://www.developer.nokia.com/Community/Discussion/showthread.php*
// ==/UserScript==


var styleSheets = document.styleSheets;
for (var i= 0; i < styleSheets.length; i++)
{
    var styleSheet = styleSheets[i];
    for (var j = 0; j < styleSheet.cssRules.length; ++j)
    {
        var rule = styleSheet.cssRules[j]
        if ( rule.selectorText == "pre, code") 
        {
            rule.style.removeProperty("background-color");
            rule.style.removeProperty("border");
            rule.style.removeProperty("padding");
        }
    }
}
