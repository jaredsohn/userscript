// ==UserScript==
// @author          Marc Fauser
// @name            Domain in title (KeePass Helper)
// @namespace       http://userscripts.org/scripts/show/178843
// @description     Put the domain into the title.
// @include         http://*
// @include         https://*
// @version         0.5
// ==/UserScript==

// SETTINGS -------------------------------------
var sDelimiter       = " | ";  // delimiter when domain is added to title

// CODE -----------------------------------------

setTitle();

/**
 * Display hostname in title bar with subdomains.
 */
function setTitle()
{
  var sHostName = window.location.hostname;
  var oTitle = document.title;
  var sFull  = prepURL(sHostName);

  if ( oTitle.indexOf( sFull ) === -1 )
  {
    oTitle += sDelimiter + sFull;
    document.title = oTitle;
  }
}

/**
 * Strip protocol and www. from an URL
 */
function prepURL(url) {
  // if a complete URL is passed, get the hostname
  if (url.indexOf("//") > 0) { url = url.split("/")[2]; }
  // remove www. (ww2, ww18, etc.) if there to save some space and return value
  // Thank you D. S. Kinney for pointing out the numbers
  return url.replace(/^ww[a-zA-Z0-9]*\./i, "");
}
