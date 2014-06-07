// ==UserScript==
// @name           GSA journals redirect to GeoScienceWorld
// @namespace      gsajournals
// @include        http://www.gsajournals.org/perlserv/?request*
// ==/UserScript==

var vi = /Volume (\d*), Issue (\d*)/.exec(document.getElementById("pageTitle").getElementsByTagName("a")[0].innerHTML);
var p = /Article: pp\. (\d*).\d*/.exec(document.getElementsByTagName("h2")[0].parentNode.innerHTML);
window.location.href = "http://geology.geoscienceworld.org/cgi/reprint/" + vi[1] + "/" + vi[2] + "/" + p[1] + ".pdf";