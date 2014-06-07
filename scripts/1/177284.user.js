// ==UserScript==
// @name          Always on focus
// @namespace     http://www.webmonkey.com
// @description   Some pages check the document.hidden property and won't render content unless the page is in focus. This script will trick them to think they are in focus so you can preload them in a tab and visit them when they have finished loading.
// ==/UserScript==

Object.defineProperty(document, "hidden", { value : false});