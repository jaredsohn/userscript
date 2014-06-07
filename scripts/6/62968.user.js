// JavaScript Document
// ==UserScript==
// @name Premiumuebersicht fuer pennergame 4.0 hh & b edit by kingfr3sh & das_bazie
// @namespace kingfr3sh & das_bazie
// @version 1.7
// @description Erweiterte Premiumuebersicht.auf der uebersichtsseite siehst du nun das was deer premium account auch kann
// @include http://*pennergame.de/overview/*
// ==/UserScript==

var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")>=0) {var link = "http://berlin.pennergame.de"}
if (url.indexOf("http://www.pennergame")>=0) {var link = "http://www.pennergame.de"}

var table1 = document.getElementsByClassName('clearcontext')[0];
var table = table1.getElementsByTagName('ul')[0];
var kurs1 = document.getElementById('tabnav');
var kurs11 = kurs1.innerHTML.split('/profil/id:')[1];
var id = kurs11.split('/"')[0];

