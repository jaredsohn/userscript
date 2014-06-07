// ==UserScript==
// @name         Plicto
// @include      blank
// @description  replace epidural
// ==/UserScript==


if (*epidural/template*(document.location.href)) 
    document.location.replace(document.location.href.replace("epidural/template","www.lantmateriet.se/template"));


