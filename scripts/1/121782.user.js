// ==UserScript==
// @name           Save after
// @description    Save after
// @include        https://secure.avaaz.org/en/save_the_internet/*
// ==/UserScript==


var elmDeleted = document.getElementById("page");
elmDeleted.parentNode.removeChild(elmDeleted);
