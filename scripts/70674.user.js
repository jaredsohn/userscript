// ==UserScript==
// @name           Hushmail - Skip upgrade page
// @namespace      http://NxtGn.org
// @description    This script will simple skip the "upgrade" / "choose account type" page. 
// @include        https://*.hushmail.com/choose/
// ==/UserScript==
document.location="javascript:document.forms['hushmail_choose_free'].submit();";