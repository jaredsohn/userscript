// ==UserScript==
// @name        InkBunny Download Helper
// @namespace   http://userscripts.org/users/483358
// @include     https://inkbunny.net/submissionview.php*
// @grant       GM_getValue
// @version     1.1.1
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

var i, smallpic, imagelink;
var titrepage = document.title.replace(/(.*\s+by\s+)(.+?)(\s+\< Submission \| Inkbunny, the Furry Art Community)/g, "$2").toTitleCase() + " - " + document.title.replace(/(.*)(\s+by\s+.+?\s+\< Submission \| Inkbunny, the Furry Art Community)/g, "$1").toTitleCase();
titrepage = titrepage.replace(/\:/g, " - ").replace(/\"/g, "''").replace(/\'/g, "&quot;").replace(/\.\.\./g, "&hellip; ").replace(/^\s+/g,"").replace(/\s+$/g,"").replace(/\s+/g, " ");
// var tempel=document.createElement("div");
// tempel.innerHTML=titrepage;
// titrepage=tempel.textContent;
var elatester = document.getElementsByTagName("img");
for (i=0;i<elatester.length;i++) {
	if (elatester[i].src.match('inkbunny.net///files/screen/')) {
		elatester[i].title=titrepage;
		elatester[i].alt=titrepage;
		imagelink=elatester[i].src;
		break;
	}
}
elatester = document.getElementsByTagName("div");
for (i=0;i<elatester.length;i++) {
	if (elatester[i].title.match('Click to show max preview size')) {
		elatester[i].title=titrepage;
	}
}
smallpic = true;
elatester = document.getElementsByTagName("a");
for (i=0;i<elatester.length;i++) {
	if (elatester[i].href.match('inkbunny.net///files/full/')) {
		elatester[i].title=titrepage;
		smallpic=false;
	}
}
if (smallpic) {
	var downloadlink=document.createElement("span");
	downloadlink.innerHTML="<span> - <a target='_blank' href='" + imagelink + "' style='border: 0px; color: #888888;' alt='" + titrepage + "' title='" + titrepage + "'><img src='imagesbeta66/fullsize/fullsize.png' style='margin-left: 3px; border: 0px; vertical-align: text-bottom; _vertical-align: middle; padding: 0 !important; margin: 0 !important;' /> Download</a></span>";
	var aajouter=document.getElementById("size_container");
	aajouter.appendChild(downloadlink);
}