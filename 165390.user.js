// ==UserScript==
// @name            index.hu teljes szélességű cikkek
// @namespace       matyas.mustoha/userscripts
// @description     Eltűnteti a jobb oldali reklámsávot és teljes szélességűre állítja a cikkeket az index.hu-n.
// @include         /^https?://(www\.)?index\.hu/.+$/
// @version         1.1
// @downloadURL     https://userscripts.org/scripts/source/165390.user.js
// @updateURL       https://userscripts.org/scripts/source/165390.meta.js
// ==/UserScript==

GM_addStyle(".content { width:976px; }");
GM_addStyle("#features { display:none; }");
