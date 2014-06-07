// ==UserScript==

// @name          YouTube subscription view

// @mail          euda23@gmail.com

// @description   The YouTube logo now links directly to your subscriptions at the start page

// @include       http://www.youtube.com/*
// @include       https://www.youtube.com/*

// ==/UserScript==



document.getElementById("logo-container").href = "http://www.youtube.com/feed/subscriptions/u";

