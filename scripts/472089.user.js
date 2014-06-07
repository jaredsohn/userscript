// JavaScript Document
// ==UserScript==
// @name             Repeat Youtube
// @description     Script for repeating youtube
// @include         https://youtube.com/*
// ==/UserScript==
// ==Griever==
// ==============
// ==Icon==

document.querySelector('video').addEventListener('ended', function(){this.play()});