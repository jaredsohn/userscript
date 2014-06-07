// ==UserScript==
// @name           Google on blekko
// @version        1.31
// @author         ArpitNext
// @namespace      http://blog.arpitnext.com/
// @description    Adds links on blekko.com to search the same query on Google and Google Images.
// @include        http://blekko.com/*
// @include        https://blekko.com/*
// ==/UserScript==

(function () {
var sword = (document.getElementById('noslashq').value);
var targ = document.getElementById('toggleResults');
var googLink = targ.appendChild(document.createElement("a"));
googURI = "http://www.google.com/search?q="+sword;
googLink.setAttribute("href", googURI);
googLink.setAttribute("title", "See results on Google");
googLink.setAttribute("target", "_blank");
googLink.textContent = "/google";
var ImgLink = targ.appendChild(document.createElement("a"));
ImgURI = "http://www.google.com/images?q="+sword;
ImgLink.setAttribute("href", ImgURI);
ImgLink.setAttribute("title", "See image results on Google");
ImgLink.setAttribute("target", "_blank");
ImgLink.textContent = "/google-image";
})();