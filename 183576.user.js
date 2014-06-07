// ==UserScript==
// @name        IMDb Roger Ebert Reviews
// @namespace   somini
// @description Adds a link to a search for Roger Ebert's review of the title
// @include     http://www.imdb.com/title/*
// @icon https://s3.amazonaws.com/uso_ss/icon/183576/large.png?1384876680
// @downloadURL http://userscripts.org/scripts/source/183576.user.js
// @updateURL http://userscripts.org/scripts/source/183576.meta.js
// @version     1.0
// @grant       none
// ==/UserScript==

SEARCHENGINE = "https://duckduckgo.com/?q=site%3Arogerebert.com/reviews "

var tt = document.getElementsByTagName("h1")[0].getElementsByClassName("itemprop")[0].innerHTML;

var div = document.getElementsByClassName("star-box-rating-widget")[0];

var link = document.createElement("a");
var icon =  document.createElement("img");
link.appendChild(icon);
link.href = SEARCHENGINE + tt;
icon.src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABBElEQVQ4jZ3QsUrEQBDG8cBhI7YiWOqZzBw2cgjnQ9h4TGZSXGM287ViL4LVdfY+hU8hVmJhoYKdjcV1thKL47TZJMaBrXb/P5hNksiwhJIN90PBKHbfOaxhwoaazZ8SkUFvYOy+xuoLNtQkOOoNbIpssPknG2rKUfQGUq0OlyugJgnj3kCW+9UPoFXarxYZsOH1F8Ajq1+T4SbLq3k6Pd1p7Ulxsopjh9RfWgE23LUBbHhojFOrZh1xTYa3aLxfhC0yfHQBrHhu2v28M14Ct3Egr6Z/AswvosD2sa+T4r0L2NPA//pEMnxlhnljvBpWP2PFgswv08JpZOUBa5jsSjmMvf8GGtvJCPK75F0AAAAASUVORK5CYII="

div.insertBefore(link,div.firstChild);