// ==UserScript==
// @name        Delete_McAnime_Boxs
// @namespace   http://userscripts.org/users/498682
// @description Delete Kronos and Crunchyroll Boxs
// @include     http://www.mcanime.net/*
// @include     http://mcanime.net/*
// @version     1
// ==/UserScript==

var elmDeleted = document.getElementById("kronos");
  elmDeleted.parentNode.removeChild(elmDeleted);

var elmDeleted = document.getElementById("subscriptionNotice");
  elmDeleted.parentNode.removeChild(elmDeleted);
