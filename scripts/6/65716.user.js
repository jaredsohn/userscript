// ==UserScript==
// @name           Clean SparkNotes
// @description    Removes the distracting sidebar and news ticker, and changes the background to a solid color.  In short, makes it possible to actually study on SparkNotes.
// @include        http://*.sparknotes.com/*
// ==/UserScript==

var targetElement = document.getElementById('sidebar2');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}

var targetElement = document.getElementById('HeaderBreadcrumb');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}

var targetElement = document.getElementById('news_ticker');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}

var targetElement = document.getElementById('container_topBar');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}

var targetElement = document.getElementById('container_header');
if (targetElement) {
    targetElement.parentNode.style.backgroundImage = 'none';
}