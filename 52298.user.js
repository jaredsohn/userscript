// ==UserScript==
// @name           Friendly B.net System.Web.HttpException Re-direct
// @namespace      http://www.bungie.net/
// @include        http://*.bungie.net/*
// @include        http://*.bungie.net
// ==/UserScript==

// Restricted areas. Special Security Settings Required.
if (document.body.textContent.match(/Unknown or Unexpected Exception of type : System.Web.HttpException/)) {
    location.reload(0);
}