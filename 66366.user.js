// ==UserScript==
// @name          HabrDirectCutter
// @description   режет Яндекс.Директ на Хабре
// @author		  Vizzy
// @include       http://*.habrahabr.ru/*
// @include       http://habrahabr.ru/*
// ==/UserScript==

var mainContent = document.getElementById('main-content');

mainContent.removeChild(document.getElementsByClassName('yandex-direct')[0]);

var sidebar = document.getElementById('sidebar');
sidebar.removeChild(document.getElementsByClassName('live new')[0]);
