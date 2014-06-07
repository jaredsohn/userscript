// ==UserScript==

// @name           Remove the new Facebook right sidebar or Tikker
// @namespace      http://userscripts.org/users/406317
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://*.facebook.com/*
// @include        https://facebook.com/*
// @author            Gowtham (hacktohell)

// ==/UserScript==


GM_addStyle((<><![CDATA[
/* Hide Facebook live ticker */
.ticker_stream { display:none !important; }
]]></>).toString());