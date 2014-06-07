// ==UserScript==
// @name       Better SchoolSoft
// @namespace  twitter.com/Phille97
// @version    0.1
// @description  Makes schoolsoft better
// @match      https://sms7.schoolsoft.se/portalensgymnasium/*
// @copyright  2014+, Philip Johansson
// ==/UserScript==

// This fetches all of the <img> tags and stores them in "tags".
var tags = document.getElementsByTagName('img');

// This loops over all of the <img> tags.
for (var i = 0; i < tags.length; i++) {

  // This replaces the src attribute of the tag with the modified one
  tags[i].src = tags[i].src.replace('https://sms7.schoolsoft.se/portalensgymnasium/grafics/logo.png', 'http://ath-btx.com/wp-content/uploads/btx-logo-imageonly.png');
}