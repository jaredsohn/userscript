// ==UserScript==
// @name           Outlook.com Ad Remover
// @description  Removes Ads from Outlook.com
// @author         William Lewis
// @include        http://*.mail.live.com
// @include        https://*.mail.live.com
// @include        http://*.outlook.com
// @include        https://*.outlook.com
// @version        1.0
// ==/UserScript==

// Create a variable that holds the width of the screen minus the width of the sidebar.
var overflowWidth = screen.width-180;
// Tells the Ad Bar to go away.
document.getElementById('SkyscraperContent').style.width = '0px'; 
// Tells the important stuff to get bigger.
document.getElementById('mainContentContainer').style.width = overflowWidth + 'px'; 
