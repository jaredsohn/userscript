// ==UserScript==
// @name           Old Kongregate Icon
// @namespace      http://userscripts.org/users/306563
// @description    Changes Kongregate icon to old one
// @include        http://www.kongregate.com/*
// Just used stuff by Michael Mahemoff (http://ajaxify.com/run/favicon/scroll/favicon.js)
// ==/UserScript==

var favicon = {

// -- "PUBLIC" ----------------------------------------------------------------

change: function(optionalIconURL, optionalDocTitle) {
  if (optionalIconURL) {
    clearTimeout(this.animateTimer);
    this.addLink(optionalIconURL, true);
  }
  if (optionalDocTitle) {
    clearTimeout(this.scrollTimer);
    document.title = optionalDocTitle;
  }
},


// -- "PRIVATE" ---------------------------------------------------------------

scrollTimer: null,
animateTimer: null,

preloadIcons: function(iconSequence) {
  var dummyImageForPreloading = document.createElement("img");
  for (var i=0; i<iconSequence.length; i++) {
    dummyImageForPreloading.src = iconSequence[i];
  }
},

addLink: function(iconURL) {
  var link = document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = iconURL;
  this.removeLinkIfExists();
  this.docHead.appendChild(link);
},

removeLinkIfExists: function() {
  var links = this.docHead.getElementsByTagName("link");
  for (var i=0; i<links.length; i++) {
    var link = links[i];
    if (link.type=="image/x-icon" && link.rel=="shortcut icon") {
      this.docHead.removeChild(link);
      return; // Assuming only one match at most.
    }
  }
},

docHead:document.getElementsByTagName("head")[0]
}


favicon.change("http://www.iconj.com/ico/z/n/zn57qbqv05.ico");