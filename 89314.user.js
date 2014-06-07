// ==UserScript==
// @name           Ikariam Customized Script for Capeguy
// @namespace      Name this space!
// @include        http://*.ikariam.*/*
// @author         Capeguy
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require    http://userscripts.org/scripts/source/57377.user.js
// ==/UserScript==

IkaTools.init();
var myContent = document.createElement('div');
myContent.innerHTML = "<p> </p>";
IkaTools.addInfoBox("CU5T0M1S3D 4R34", myContent);
alert("Debug0");


alert(IkaTools.buildingGetResourceMissingTotal("Dump"));
alert("Debug2");

