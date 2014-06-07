// ==UserScript==
// @name        AutoRedirect
// @namespace   http://pg-logout.auskunft.de/*
// @description Automatische Weiterleitung
// @version	0.0.1
// @include     http://pg-logout.auskunft.de/*
// ==/UserScript==
// oldPage: http://pg-logout.auskunft.de/
// newPage: http://berlin.pennergame.de/
var oldPage = "http://pg-logout.auskunft.de/";
var newPage = "http://berlin.pennergame.de/";

if (document.location.href.indexOf(oldPage) == 0)
{
	document.location.href=newPage;
}