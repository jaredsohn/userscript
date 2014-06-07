// ==UserScript==
// @name        COE Login
// @namespace   coe_tool
// @include     http://dev-wued002/COE/Login.aspx*
// @version     0.0.3
// @updateUrl   https://userscripts.org/scripts/source/178234.meta.js
// @downloadUrl https://userscripts.org/scripts/source/178234.user.js
// @grant       none
// ==/UserScript==
window.addEventListener ("load", LocalMain, false);

function LocalMain ()
{
    document.evaluate("//input[@value='Login' and @type='submit' and contains(@class, 'yellowbutton-small')]", document, null, 9, null).singleNodeValue.click();
}