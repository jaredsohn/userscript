// ==UserScript==
// @name        SoFurry Download Helper
// @namespace   http://userscripts.org/users/483358
// @description   Adds a "title" attribute to the download button on SoFurry to facilitate quick renaming of the downloaded file.
// @include     *sofurry.com/view/*
// @grant       GM_getValue
// @version     1.2
// ==/UserScript==

String.prototype.toTitleCase = function () {
  var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|vs|is?\.?|via)$/i;

  return this.replace(/([^\W_]+[^\s-]*) */g, function (match, p1, index, title) {
    if (index > 0 && index + p1.length !== title.length &&
      p1.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
      title.charAt(index - 1).search(/[^\s-]/) < 0) {
      return match.toLowerCase();
    }

    if (p1.substr(1).search(/[A-Z]|\../) > -1) {
      return match;
    }

    return match.charAt(0).toUpperCase() + match.substr(1);
  });
};

var title  = document.getElementById('sfContentTitle').textContent.toTitleCase();
var allsearch = document.getElementsByClassName("sf-username sfTextMedium");
var artist = allsearch[0].textContent.toTitleCase();
var combi = artist + " - " + title
var tempel=document.createElement("div");
tempel.innerHTML=combi.replace(/\:/g, " - ").replace(/\.\.\./g, "&hellip; ").replace(/^\s+/g,"").replace(/\s+$/g,"").replace(/\s+/g, " ");
combi=tempel.textContent;
document.getElementById('sfDownload').title = combi;