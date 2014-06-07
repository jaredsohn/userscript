// ==UserScript==
// @name           Wiley InterScience / onlinelibrary PDF full-screen viewer
// @namespace      geological-supplies.com/scripts
// @description    Sets PDF articles viewed through Wiley OnlineLibrary to use the full browser screen
// @include        http://onlinelibrary.wiley.com*/*/pdf
// @exclude      	*/accessdenied?*
// @version        2.0 Compatibility with onlinelibrary reformat
// ==/UserScript==

document.getElementById("pdfHeader").style.display = "none";
document.getElementById("pdfDocument").style.height = "";