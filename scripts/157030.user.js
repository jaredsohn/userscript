// ==UserScript==
// @name        Weasyl Download Helper
// @namespace   http://userscripts.org/users/483358
// @include     https://www.weasyl.com/submission/*
// @include     https://www.weasyl.com/character/*
// @include     https://www.weasyl.com/view/*
// @grant       none
// @version     1.0.1
// ==/UserScript==

String.prototype.toTitleCase = function () {
  var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|vs?\.?|via)$/i;

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
var i;
var titrepage = document.getElementById("detail-title").innerHTML.replace(/(.*)\s+<i>by<\/i>\s+<a.+?>(.*?)<\/a>/g, "$2 - $1").replace(/\:/g, " - ").replace(/\.\.\./g, "&hellip; ").replace(/^\s+/g,"").replace(/\s+$/g,"").replace(/\s+/g, " ");
var tempel=document.createElement("div");
tempel.innerHTML=titrepage;
titrepage=tempel.textContent;
var elatester = document.getElementsByTagName("a");
for (i=0;i<elatester.length;i++) {
	if (elatester[i].href.match('/submission/') || elatester[i].href.match('/character/')) {
		elatester[i].title=titrepage.toTitleCase();
	}
}