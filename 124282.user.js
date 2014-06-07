// ==UserScript==
// @name        RallyDev-enhancements
// @namespace   http://userscripts.org/scripts/show/107207
// @include     https://*rallydev*timesheet
// @include     http://*rallydev*timesheet
// @include     https://rally1.rallydev.com*
// @description Fix some annoyances with the RallyDev site
// @copyright   2014+, Mark Young
// @version     1.3
// @licence     MIT
// ==/UserScript==

// Simple snippet to add a style element in the document <head> from the yui blog. http://yuiblog.com/blog/2007/06/07/style/
function addCss(cssCode) {
  var styleElement = document.createElement("style");
    styleElement.type = "text/css";
    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText = cssCode;
    } else {
      styleElement.appendChild(document.createTextNode(cssCode));
    }
    document.getElementsByTagName("head")[0].appendChild(styleElement);
}

try {
  var css = ".x-combo-list, .x-combo-list .x-combo-list-inner{min-width:250px; width:auto !important;} ";
  //css += ".x-combo-list, .x-combo-list .x-combo-list-inner{overflow:auto !important;} ";
  //css += ".x-combo-list-item {overflow:visible !important;}";
  addCss(css);
} catch(e){};