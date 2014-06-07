// ==UserScript==
// @name        Delete LaSilla Box
// @namespace   http://userscripts.org/users/498682
// @include     http://www.lasillavacia.com/*
// @include     http://lasillavacia.com/*
// @version     1
// ==/UserScript==


var elmDeleted = document.getElementById("box");
  elmDeleted.parentNode.removeChild(elmDeleted);
