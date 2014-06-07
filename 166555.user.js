// ==UserScript==
// @name Save Your Eyes
// @version 1.0
// @author Mikha (based on bookmarklet "Nite Mode" )
// @namespace
// @description Save you Eyes by changing Background to black & Text to Gray
// @include http://www.IsaveMyEyes.comz
// ==/UserScript==

javascript: (function () {
    var newSS, styles =
            '* {background:black !important; color:grey !important;} :link, :link * {color:#ddddff !important;} :visited, :visited * {color:#ddffdd !important;}';
    if (document.createStyleSheet) {
        document.createStyleSheet(
            "javascript:'" + styles +
            "' ");
    } else {
        newSS = document.createElement(
            'link');
        newSS.rel = 'stylesheet';
        newSS.href = 'data:text/css,' +
            escape(styles);
        document.getElementsByTagName(
            "head")[0].appendChild(
            newSS);
    }
})();
//.user.js