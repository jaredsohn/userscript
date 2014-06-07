// ==UserScript==
// @name          Yellow unread posts for groupie
// @author        XtremeDetails
// @description	  Changes the color of unread Groupie posts to ugly yellow instead of barely visible light blue. 
// @include       http://groupie.co/*
// @include       https://groupie.co/*
// @include       http://www.groupie.co/*
// @include       https://www.groupie.co/*
// ==/UserScript==
document.getElementsByTagName("head")[0].appendChild(window.document.createElement("style")).innerHTML = '.unread{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAABmJLR0QAQwCdAOJd3zERAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAFElEQVQI12P4/4chkImBgYFhMBEAZfACh66FARMAAAAASUVORK5CYII=) !important;}}';
