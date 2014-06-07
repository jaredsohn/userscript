// ==UserScript==
// @name           Facebook logouter
// @namespace      Bohocmasni
// @include        http://www.facebook.com/*
// ==/UserScript==

document.body.setAttribute("onbeforeunload","document.location = 'logout.php?h=' + document.getElementById('logout_form').h.value; alert('logout');");
