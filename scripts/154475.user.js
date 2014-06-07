// ==UserScript==
// @name       Kounta Formatting
// @namespace  http://www.franchisegarage.com
// @version    0.1
// @description To tweak the formatting for the Kounta KDS to be easier to read
// @match      http://staging.kounta.com/index.php/pos/bumpscreen
// @copyright  2012+, You
// ==/UserScript==

GM_addStyle("ul#receipt .productModifier { font-size: 25px !important; color: red !important; }");
GM_addStyle("ul#receipt .productTitle { font-size: 30px !important; }");


GM_addStyle("ul#receipt li.inactive .productPrice, .bumpscreen { font-size: 40px !important; color: red !important; }");


GM_addStyle(".columnBumpScreen .orderHeader .orderDescription {font-size: 30px !important; color: #0077B2 !important; }");