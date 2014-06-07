// ==UserScript==
// @name        FurAffinity Download Helper
// @namespace   http://userscripts.org/users/483358
// @include     *.furaffinity.net/view/*
// @include     *.furaffinity.net/full/*
// @grant       none
// @version     1.1.1
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

var i;
var elatester = document.getElementsByTagName("a");
var tempel = document.createElement('div');
tempel.innerHTML = document.title;
document.title=tempel.textContent;
var titrepage = document.title.substr(0,document.title.length-26).replace(/(^.*) by (.*?$)/g, "$2").toTitleCase() + " - " + document.title.substr(0,document.title.length-26).replace(/(^.*) by (.*?$)/g, "$1").toTitleCase();
tempel.innerHTML = titrepage.replace(/\.\.\./g, "&hellip; ").replace(/\:/g, " - ").replace(/^\s+/g, "").replace(/\s+$/g, "").replace(/\s+/g, " ");
for (i=0;i<elatester.length;i++) {
	if (elatester[i].textContent.replace(/^\s+/g, "").replace(/\s+$/g, "").match("Download")) {
		elatester[i].title=tempel.textContent;
	}
}
tempel.innerHTML = document.title;
document.title=tempel.textContent;