// ==UserScript==
// @name Netvibes – Remove: Useless Space / Edit / Share
// @namespace RealBase
// @include http://www.netvibes.com/*
// @description    Removes useless space and the edit & share link.
// @version 0.1
// @copyright 2009+, RealBase
// @license GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==


/*
Author: RealBase
Script initially based on:
# Netvibes - No share
# Netvibes - Toplink Remover
# Netvibes maximiser

Version: 19 jan 2009

Please report any bugs on:

http://userscripts.org/scripts/show/66761

*/



var topLinks = document.getElementById("topLinks");
topLinks.style.visibility = 'hidden' ;
topLinks.style.display = 'none';

var style = document.createElement("style");
style.setAttribute("type", "text/css");

var text = document.createTextNode("a.share { display: none !important; }           a.edit { display: none !important; }                                             a.actions-tab-options { display: none !important; }                                       .resizable .module, .resizable .moduleEdit { margin: 0px 0px 0px 0px !important; }  .messages {display: none !important;}                                                                             #columns{ padding-top: 0px !important; }                                              .moduleContent {padding: 0px !important; }                                            .moduleHeader {padding: 0px 0 !important; }                                     .carouselView .crop, .magazineView .crop, .scoopView .crop, .galleryView .crop {overflow: visible !important;} ");
style.appendChild(text);

document.getElementsByTagName("head")[0].appendChild(style);
//.user.js