// ==UserScript==
// @name Moderator AntiSocial
// @namespace shaldengeki
// @description Removes sub-boards from Moderator Social list.
// @include http://boards.endoftheinter.net/showtopics.php?board=-85*
// @include https://boards.endoftheinter.net/showtopics.php?board=-85*

// ==/UserScript==

var subboardheader = document.getElementsByClassName('infobar')[0];
subboardheader.parentNode.removeChild(subboardheader.nextSibling);
subboardheader.parentNode.removeChild(subboardheader);