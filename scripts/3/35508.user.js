// ==UserScript==
// @name           best-movies.6x.to-Skip Enter
// @namespace      blackout 
// @description    Überspringt Enterpage bei best-movies.6x.to
// @include        http://*best-movies.6x.to/*
// @include	     http://*best-movies.us/*
// @exclude	    http://*best-movies.us/enter/*
// ==/UserScript==
frames[0].location.href = "http://best-movies.us/enter/index.php";
