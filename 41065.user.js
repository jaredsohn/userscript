// ==UserScript==
// @name           facebook/lil apps
// @namespace      tsgreer.com
// @description    Make the theme the right width, and eliminate extra vspace
// @include        http://apps.facebook.com/lilbluecove/home.php*
// @include        http://apps.facebook.com/greentrees/home.php*
// ==/UserScript==

GM_addStyle(".patchTbl { margin-top: -4px }");
document.evaluate('/HTML[1]/BODY[1]/DIV[3]/DIV[1]/DIV[3]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/FORM[1]/TABLE[4]/TBODY[1]/TR[1]/TD[2]/A[1]/IMG[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.setAttribute('style', "width: 628px;");
