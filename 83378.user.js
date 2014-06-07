// ==UserScript==
// @name           LoL Splash Skipper
// @description    Skips the redirect splash screen and takes you straight to the link.
// @include        http://*.leagueoflegends.com/playnow*
// ==/UserScript==
window.location.replace(window.location.href.substr(window.location.href.indexOf('=') + 1));
