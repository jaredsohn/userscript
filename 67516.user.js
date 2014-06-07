// ==UserScript==
// @name           GC Remove the decryption Key table
// @namespace      Geocaching
// @description    V1.0.290110 - Remove the decryption Key table and free up the space
// @include        http://www.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==

document.getElementById('ctl00_ContentBody_EncryptionKey').style.display = 'none'; 