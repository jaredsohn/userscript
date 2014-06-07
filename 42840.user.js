// JavaScript Document
// ==UserScript==
// @name Dereferrer
// @namespace 11235813[Bande:K?stenpenner]
// @description Ueberspringt Pennergame-Weiterleitung
// @include http://www.pennergame.de/redirect/*
// @exclude
// ==/UserScript==
var url = window.location.href;
var ref = url.substring(40);
document.location.href = ref;

