// ==UserScript==
// @name           gmailCoordinates
// @namespace      http://www.geekyneighbor.com/
// @description    Adds "Get Coordinates" link to Google Maps
// @include        http://maps.google.com/*
// ==/UserScript==

//window.addEventListener("load", function(){setTimeout(Main,200);}, false) ;
window.addEventListener("load", function () {
  var bar = document.getElementById("topbar-startcol");
  bar = bar.getElementsByTagName("ul");
  bar = bar[0];

  // Create and insert Spacer
  var spacerText = document.createElement("li");
  spacerText.innerHTML = '&nbsp;<img src="http://maps.gstatic.com/intl/en_us/mapfiles/transparent.png" class="panel-bar-divider bar-divider">&nbsp;';
  bar.insertBefore(spacerText, bar.firstChild);

  var showLinkContainer = document.createElement("li");
  var showLink = document.createElement("a");
  // Embed javascript functionality (rather than bookmarklet)
  showLink.setAttribute("href", "javascript:void(prompt('Center Coordinates',gApplication.getMap().getCenter()));");
  showLink.setAttribute("id",   "c_launch");

  var showLinkTextSpan = document.createElement("span");
  var showLinkText = document.createTextNode("Get Coordinates");

  showLinkTextSpan.appendChild(showLinkText);
  showLinkTextSpan.setAttribute("class", "link-text");
  showLink.appendChild(showLinkTextSpan);
  showLinkContainer.appendChild(showLink);

  bar.insertBefore(showLinkContainer, bar.firstChild);

}, false) ;
