// ==UserScript==
// @name           full width ars technica
// @namespace      ars technica
// @include        http://arstechnica.com/*
// ==/UserScript==


var div = document.getElementById("page");
div.style.width = "100%";

div = document.getElementById("masthead");
div.style.width = "100%";

div = document.getElementById("main");
div.style.width = "100%";

div = document.getElementById("content");
div.style.width = "100%";

div = document.getElementById("sidebar");
//div.style.width = "30%";
div.style.display = "none";

div = document.getElementById("journal-promo-news-item");
div.style.width = "100%";

div = document.getElementById("promotional-zone");
div.style.width = "100%";
