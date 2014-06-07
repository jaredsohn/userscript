// ==UserScript==
// @name        deviantArt Image Download Helper
// @namespace   http://userscripts.org/users/483358
// @include     http://*.deviantart.com/*
// @grant       GM_getValue
// @version     1.2.1
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

var fullpic=document.getElementsByClassName("dev-content-full");
if (fullpic) {
	var smallpic=fullpic[0];
	var imagelink, downloadbutton;
	var titrepage = document.title.substr(0,document.title.length-14).replace(/(^.*) by (.*?$)/g, "$2").toTitleCase() + " - " + document.title.substr(0,document.title.length-14).replace(/(^.*) by (.*?$)/g, "$1").toTitleCase();
	titrepage = titrepage.replace(/\:/g, " - ").replace(/\.\.\./g, "&hellip; ").replace(/^\s+/g,"").replace(/\s+$/g,"").replace(/\s+/g, " ");
	downloadbutton=document.getElementsByClassName("dev-page-download");
	if (!downloadbutton.length) {
		imagelink=smallpic.src;
		var typeimage=imagelink.replace(/^.*\.(.+?)$/g, "$1").toUpperCase();
		downloadbutton=document.createElement("a");
		downloadbutton.innerHTML='<a class="dev-page-button dev-page-button-with-text dev-page-download" title="' + titrepage + '" href="' + imagelink + '"><i>&nbsp;</i><span class="label">Download File</span><span class="text">' + typeimage + '</span></a>';
		var aajouter=document.getElementsByClassName("dev-meta-actions");
		aajouter[0].appendChild(downloadbutton);
	}
	else {
		var tempel=document.createElement("div");
		tempel.innerHTML=titrepage;
		titrepage=tempel.textContent;
		downloadbutton[0].alt=titrepage;
		downloadbutton[0].title=titrepage;
	}
}