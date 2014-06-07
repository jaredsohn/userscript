// ==UserScript==
// @name        Vine Video Fix
// @namespace   https://vine.co
// @description adds controls to video tag
// @include     https://vine.co/*
// @version     1
// ==/UserScript==

metaData = document.getElementsByTagName("meta");
videoLocation = metaData[8].content;
videoElement = document.getElementById("post");
videoElement.src = videoLocation;