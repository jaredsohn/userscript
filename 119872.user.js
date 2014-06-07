// ==UserScript==
// @name           TinEye HTTPS search fix
// @namespace      https://alexanderschroeder.net/
// @description    Fixes the action on the search form on TinEye so searches also happen through HTTPS
// @include        https://www.tineye.com/
// ==/UserScript==

var form = document.getElementById("upload_form");
form.action="/search";

var form = document.getElementById("url_form");
form.action="/search";