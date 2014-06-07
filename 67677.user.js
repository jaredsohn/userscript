// ==UserScript==
// @name CSM Multiple 2D windows
// @namespace atarinternet.com
// @version 1.0
// @source cs-manager.com/
// @description Extension that lets you open how many 2D windows you want.
// @include http://www.cs-manager.com/*
// @include http://www.cs-manager.com/csm/*
// @run-at document-start
// ==/UserScript==

for (var i = 0; (scriptObjects = document.getElementsByTagName("script")[i]); i++)
var srcLink = scriptObjects.getAttribute('src');
if (scrLink == "/js/global.js?37")
{
scriptObjects.setAttribute('src', 'http://atarinternet.com/csm/global.js');
}