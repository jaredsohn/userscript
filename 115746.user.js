// ==UserScript==
// @name           Show NuGet Package in Title
// @namespace      www.prism.gatech.edu/~mflaschen3/
// @description    Shows the name of NuGet packages in the title
// @include        http://*nuget.org/List/Packages/*

// ==/UserScript==

var path = window.location.pathname;
document.title = path.substring(path.lastIndexOf('/') + 1) + " NuGet Package";