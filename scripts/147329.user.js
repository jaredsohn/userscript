// ==UserScript==
// @name        LoL Tribunal to LogIn Redirect
// @namespace   JackZR
// @description If you are not logged in it redirects you from LoL Tribunal to LogIn Page.
// @include     *.leagueoflegends.com/tribunal/*
// @version     2
// @grant       none
// ==/UserScript==

var MSG = document.getElementById("finished_info_title").innerHTML

var LogURL = window.location.protocol + "//" + window.location.host + "/user/login";

if (MSG == "\n            Whoops! There's a Problem!\n        "){
	window.location = LogURL;
	}