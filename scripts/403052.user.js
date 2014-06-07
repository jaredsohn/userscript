// ==UserScript==
// @name        LibraryThing blurber author pages
// @namespace   http://userscripts.org/users/maxstarkenburg
// @description For each of the blurbers listed on a work, this script creates a link to their author page (assuming it exists)
// @include     http*://*.librarything.tld/work/*
// @include     http*://*.librarything.com/work/*
// @version     1
// @grant       none
// ==/UserScript==

var blurbers = document.querySelector("[fieldname=blurbers]").getElementsByClassName("fwikiItemText");

if (blurbers.length) {
  for (var i=0; i<blurbers.length; i++) {
    var blurber = blurbers[i];
    var string = blurber.textContent.trim();
    if (string != "") {
      var parens = new RegExp("\\(.*\\)","g");
      if (string.replace(parens,"") != "") { // Remove any parenthetical text, unless the string is entirely parenthetical (probably unnecessary for blurbers, but who knows)
        string = string.replace(parens,"");
      }
      if (string.indexOf(",") == -1) { // Since sometimes people have written them as "First Last" instead of "Last, First" (though these should really just be fixed)
        var lastspace = string.lastIndexOf(" ");
        string = string.substring(lastspace) + string.substring(0,lastspace);
      }
      string = string.replace(/[^a-zA-Z]/g,"").toLowerCase().substring(0,20); // Remove non-alpha character, lower-case it, and limit it to 20 characters
      if (string.length) { // Just in case it was all non-Latin characters, whose number generation is a mystery to me
        var aLink = document.createElement("span");
        aLink.style.cssFloat = "right";
        aLink.style.fontSize = ".9em";
        aLink.innerHTML = '(<a href="/author/' + string + '">author page</a>)';
        blurber.insertBefore(aLink, blurber.firstChild); // Attach it somewhere that won't get in the way while editing
      }
    }
  }
}