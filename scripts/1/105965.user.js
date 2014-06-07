// ==UserScript==
// @name          Hide Extension Methods
// @namespace     http://svick.org/download/
// @description   Hides Extension Methods section on MSDN documentation pages.
// @include       http://msdn.microsoft.com/*/library/*
// ==/UserScript==

document.getElementById('extensionMethodTableToggle').parentNode.previousSibling.firstChild.firstChild.click()